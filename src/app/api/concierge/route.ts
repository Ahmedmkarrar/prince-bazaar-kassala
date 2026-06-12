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

interface ConciergeRequest {
  messages: ChatMessage[];
}

const EXPERIENCE_LIBRARY: Record<string, string> = {
  nature:
    "The Taka Mountains at sunrise — a private 4×4 expedition with a local guide, traditional breakfast at the foot of the spires, and a return via the rural villages along the Gash river.",
  culture:
    "Old Kassala walking tour — the cultural quarter, the central bazaar, a coffee jebana ceremony with a Beja host, and a private viewing at the regional textile collection.",
  wellness:
    "A half-day at the Wellness & Spa — traditional hammam, signature dukhan smoke ritual, deep-tissue massage, and a closing tea ceremony in the courtyard.",
  dining:
    "An evening at the rooftop lounge with a five-course tasting menu — Sudanese flavours reinterpreted by our executive chef, paired with mocktails from regional botanicals.",
  shopping:
    "A guided bazaar afternoon — handpicked artisan stalls, custom-tailored garments, a private spice masterclass, and complimentary delivery to your suite.",
  family:
    "A family day across the complex — children's activities at the courtyard, a private cooking class, an early dinner at the casual café, and an evening cinema screening at the pavilion.",
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
    const key = i.interest ?? "culture";
    const body = EXPERIENCE_LIBRARY[key] ?? EXPERIENCE_LIBRARY.culture;
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

  const body = (await req.json()) as ConciergeRequest;
  const messages = body.messages ?? [];

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
          const response = await client.messages.create({
            model: "claude-sonnet-4-5",
            max_tokens: 1024,
            system: CONCIERGE_SYSTEM,
            tools: CONCIERGE_TOOLS,
            messages: conversation,
          });

          const toolUses: Anthropic.Messages.ToolUseBlock[] = [];
          let textOut = "";

          for (const block of response.content) {
            if (block.type === "text") {
              textOut += block.text;
              send("delta", { text: block.text });
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
