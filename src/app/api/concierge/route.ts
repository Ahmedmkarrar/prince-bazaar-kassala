import Anthropic from "@anthropic-ai/sdk";
import { CONCIERGE_SYSTEM, CONCIERGE_TOOLS } from "@/lib/concierge-system";
import { whatsappLink } from "@/lib/whatsapp";
import { rateLimit, rateLimitResponse } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// The request body is attacker-controlled. Without these caps a single caller
// could post a megabyte of text per message and run up the API bill within the
// rate limit's 20-request allowance.
const MAX_MESSAGES = 24;
const MAX_MESSAGE_CHARS = 4_000;
const MAX_TOTAL_CHARS = 24_000;

function parseConversation(body: unknown): ChatMessage[] | null {
  if (typeof body !== "object" || body === null) return null;
  const { messages } = body as { messages?: unknown };
  if (!Array.isArray(messages) || messages.length === 0) return null;
  if (messages.length > MAX_MESSAGES) return null;

  let total = 0;
  const parsed: ChatMessage[] = [];

  for (const entry of messages) {
    if (typeof entry !== "object" || entry === null) return null;
    const { role, content } = entry as { role?: unknown; content?: unknown };
    if (role !== "user" && role !== "assistant") return null;
    if (typeof content !== "string") return null;

    const trimmed = content.trim();
    if (!trimmed || trimmed.length > MAX_MESSAGE_CHARS) return null;

    total += trimmed.length;
    if (total > MAX_TOTAL_CHARS) return null;

    parsed.push({ role, content: trimmed });
  }

  // The Messages API requires the conversation to open with a user turn.
  if (parsed[0].role !== "user") return null;
  return parsed;
}

function badRequest(message: string): Response {
  return new Response(JSON.stringify({ error: "invalid_request", message }), {
    status: 400,
    headers: { "content-type": "application/json" },
  });
}

// Every entry must map to a complex that actually exists on the property.
// There is no spa, pool, or rooftop lounge — do not reintroduce them here.
// The nature and culture entries were removed with the tourism sections: they
// described a guided 4x4 expedition and an Old Kassala walking tour, neither of
// which the property offers any more. Leaving them here would have let the
// concierge keep selling them after they came off the site.
const EXPERIENCE_LIBRARY: Record<string, string> = {
  business:
    "A working day at the Business Center — a private meeting room with Wi-Fi and full AV, coffee service throughout, and the Conference Room available for larger sessions of up to sixty.",
  dining:
    "An evening at the Culinary Hub — Sudanese flavours prepared to order, served in the restaurant or brought to your suite by room service.",
  shopping:
    "A guided afternoon across the Bazaar and Commercial Plaza — artisan stalls, custom-tailored garments, and complimentary delivery to your suite.",
  family:
    "A family day across the complex — an early dinner at the Culinary Hub, an afternoon through the Bazaar, and a Three Bed Suite that sleeps up to six.",
};

interface RecommendInput {
  interest?: string;
  duration?: string;
}

interface HandoffInput {
  summary?: string;
}

async function runTool(name: string, input: unknown): Promise<string> {
  if (name === "recommend_experience") {
    const i = input as RecommendInput;
    const key = i.interest ?? "dining";
    const body = EXPERIENCE_LIBRARY[key] ?? EXPERIENCE_LIBRARY.dining;
    return JSON.stringify({ recommendation: body, duration: i.duration ?? "half_day" });
  }

  // The only "booking" path now: hand the guest to the front office on
  // WhatsApp with their request pre-filled into the first message.
  if (name === "whatsapp_handoff") {
    const i = input as HandoffInput;
    const summary =
      i.summary?.trim() ||
      "Marhaba — I'd like to enquire about a stay at Prince Plaza Kassala.";
    return JSON.stringify({ whatsapp_url: whatsappLink(summary), prefilled: summary });
  }

  return JSON.stringify({ error: `Unknown tool: ${name}` });
}

export async function POST(req: Request) {
  // Anti-abuse: max 20 messages per 10 min per IP. Stops cost-runaway.
  const ip = req.headers.get("x-pb-ip") ?? "unknown";
  const limit = rateLimit(`concierge:${ip}`, 20, 10 * 60_000);
  if (!limit.ok) return rateLimitResponse(limit);

  // Validate before looking at the API key, so a malformed request is always a
  // 400 whether or not the concierge happens to be configured.
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return badRequest("Body must be valid JSON.");
  }

  const messages = parseConversation(raw);
  if (!messages) return badRequest("Malformed or oversized conversation.");

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: "missing_api_key",
        fallback:
          "Welcome — I'm Taka AI, your concierge at Prince Plaza Kassala. The AI assistant is connecting; in the meantime please use the inquiry form below or call our reservations team. We'll be with you in moments.",
      }),
      { status: 200, headers: { "content-type": "application/json" } },
    );
  }

  const client = new Anthropic({ apiKey });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: string, data: unknown) => {
        controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
      };

      try {
        const conversation: Anthropic.Messages.MessageParam[] = messages.map((m) => ({
          role: m.role,
          content: m.content,
        }));

        for (let round = 0; round < 3; round++) {
          // Streamed, so the guest sees the reply build word by word instead of
          // waiting for the whole turn. `max_tokens` covers thinking + text:
          // Sonnet 5 thinks by default, so the old 1024 would truncate replies.
          const stream = client.messages.stream({
            model: "claude-sonnet-5",
            max_tokens: 2048,
            thinking: { type: "adaptive" },
            output_config: { effort: "low" },
            system: CONCIERGE_SYSTEM,
            tools: CONCIERGE_TOOLS,
            messages: conversation,
          });

          stream.on("text", (delta) => send("delta", { text: delta }));

          const response = await stream.finalMessage();

          if (response.stop_reason === "refusal") {
            send("error", { message: "That request can't be answered here." });
            break;
          }

          const toolUses: Anthropic.Messages.ToolUseBlock[] = [];
          let textOut = "";

          for (const block of response.content) {
            if (block.type === "text") {
              textOut += block.text;
            } else if (block.type === "tool_use") {
              toolUses.push(block);
              send("tool", { name: block.name, input: block.input });
            }
          }

          if (response.stop_reason === "tool_use" && toolUses.length > 0) {
            conversation.push({ role: "assistant", content: response.content });

            const toolResults: Anthropic.Messages.ToolResultBlockParam[] = await Promise.all(
              toolUses.map(async (t) => {
                const raw = await runTool(t.name, t.input);
                try {
                  send("tool_result", { name: t.name, result: JSON.parse(raw) });
                } catch {
                  send("tool_result", { name: t.name, result: { raw } });
                }
                return {
                  type: "tool_result" as const,
                  tool_use_id: t.id,
                  content: raw,
                };
              }),
            );

            conversation.push({ role: "user", content: toolResults });
            continue;
          }

          conversation.push({ role: "assistant", content: textOut });
          break;
        }

        send("done", { ok: true });
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        send("error", { message });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/event-stream",
      "cache-control": "no-cache, no-transform",
      "x-accel-buffering": "no",
    },
  });
}
