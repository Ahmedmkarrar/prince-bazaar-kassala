"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { WHATSAPP_URL } from "@/lib/whatsapp";

type ToolCall = { name: string; input: Record<string, unknown>; result?: Record<string, unknown> };

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  toolCalls?: ToolCall[];
}

const SUGGESTIONS = [
  "Plan a 3-day stay in October",
  "Sunrise tour of the Taka Mountains",
  "Wedding for 250 guests",
  "Best time for a business retreat",
];

// Bilingual language prompt appended to the opening greeting. We're in Sudan —
// guests choose Arabic or English before anything else.
const LANG_PROMPT =
  "\n\nWould you prefer to continue in English or Arabic?\nهل تفضّل المتابعة بالعربية أم الإنجليزية؟";

const DEFAULT_GREETING =
  "Welcome — I'm Taka AI, your concierge at Prince Plaza Kassala." + LANG_PROMPT;

function timeAwareGreeting(): string {
  if (typeof window === "undefined") return DEFAULT_GREETING;
  const hour = new Date().toLocaleString("en-GB", { hour: "2-digit", hour12: false, timeZone: "Africa/Khartoum" });
  const h = parseInt(hour, 10);
  let g: string;
  if (h >= 5 && h < 12) g = "Good morning — I'm Taka AI, your concierge at Prince Plaza Kassala. The Taka spires are catching first light.";
  else if (h >= 12 && h < 17) g = "Good afternoon — I'm Taka AI, your concierge at Prince Plaza Kassala. The courtyard fountains are running and tea is on.";
  else if (h >= 17 && h < 21) g = "Good evening — I'm Taka AI, your concierge at Prince Plaza Kassala. The rooftop is opening for service.";
  else g = "A quiet welcome — I'm Taka AI, your concierge at Prince Plaza Kassala. The lounge is still lit.";
  return g + LANG_PROMPT;
}

interface ConciergeProps {
  embedded?: boolean;
}

const STORAGE_KEY = "pb_concierge_v2";

export function Concierge({ embedded = false }: ConciergeProps) {
  const [open, setOpen] = useState(embedded);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: DEFAULT_GREETING },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Hydration-safe: swap to time-aware greeting + load persisted convo on client
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ChatMessage[];
        if (Array.isArray(parsed) && parsed.length > 1) {
          setMessages(parsed);
          return;
        }
      }
    } catch {
      // ignore
    }
    setMessages([{ role: "assistant", content: timeAwareGreeting() }]);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isStreaming, activeTool]);

  useEffect(() => {
    if (open && inputRef.current && !embedded) {
      const t = setTimeout(() => inputRef.current?.focus(), 220);
      return () => clearTimeout(t);
    }
  }, [open, embedded]);

  function clearConversation() {
    setMessages([{ role: "assistant", content: timeAwareGreeting() }]);
    setInput("");
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isStreaming) return;

    const userMsg: ChatMessage = { role: "user", content: trimmed };
    const nextHistory = [...messages, userMsg];
    setMessages([...nextHistory, { role: "assistant", content: "", toolCalls: [] }]);
    setInput("");
    setIsStreaming(true);
    setActiveTool(null);

    try {
      const res = await fetch("/api/concierge", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: nextHistory.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        const fallback =
          data?.fallback ??
          "I'm momentarily unavailable. Our reservations team will be in touch — leave us a note below.";
        setMessages((prev) => {
          const out = [...prev];
          out[out.length - 1] = { role: "assistant", content: fallback };
          return out;
        });
        setIsStreaming(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const events = buffer.split("\n\n");
        buffer = events.pop() ?? "";

        for (const evt of events) {
          const lines = evt.split("\n");
          let eventName = "message";
          let dataStr = "";
          for (const line of lines) {
            if (line.startsWith("event:")) eventName = line.slice(6).trim();
            else if (line.startsWith("data:")) dataStr = line.slice(5).trim();
          }
          if (!dataStr) continue;
          try {
            const data = JSON.parse(dataStr);
            if (eventName === "delta" && typeof data.text === "string") {
              setMessages((prev) => {
                const out = [...prev];
                const last = out[out.length - 1];
                if (last.role === "assistant") {
                  out[out.length - 1] = { ...last, content: last.content + data.text };
                }
                return out;
              });
            } else if (eventName === "tool") {
              setActiveTool(data.name);
              setMessages((prev) => {
                const out = [...prev];
                const last = out[out.length - 1];
                if (last.role === "assistant") {
                  const calls = last.toolCalls ?? [];
                  out[out.length - 1] = {
                    ...last,
                    toolCalls: [...calls, { name: data.name, input: data.input }],
                  };
                }
                return out;
              });
            } else if (eventName === "tool_result") {
              setMessages((prev) => {
                const out = [...prev];
                const last = out[out.length - 1];
                if (last.role === "assistant" && last.toolCalls) {
                  const calls = [...last.toolCalls];
                  const idx = calls.findIndex((c) => c.name === data.name && !c.result);
                  if (idx >= 0) calls[idx] = { ...calls[idx], result: data.result };
                  out[out.length - 1] = { ...last, toolCalls: calls };
                }
                return out;
              });
            } else if (eventName === "error") {
              setMessages((prev) => {
                const out = [...prev];
                out[out.length - 1] = {
                  role: "assistant",
                  content:
                    "Forgive me — a momentary issue. Please try again, or leave us a note below and we'll respond personally.",
                };
                return out;
              });
            }
          } catch {
            // ignore
          }
        }
      }
    } catch {
      setMessages((prev) => {
        const out = [...prev];
        out[out.length - 1] = {
          role: "assistant",
          content: "Forgive me — I couldn't connect. Please try again in a moment.",
        };
        return out;
      });
    } finally {
      setIsStreaming(false);
      setActiveTool(null);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void send(input);
  }

  if (!embedded) {
    return (
      <>
        <ConciergeBubble open={open} onClick={() => setOpen((v) => !v)} streaming={isStreaming} />
        <ConciergePanel
          open={open}
          onClose={() => setOpen(false)}
          messages={messages}
          input={input}
          setInput={setInput}
          inputRef={inputRef}
          scrollRef={scrollRef}
          onSubmit={onSubmit}
          onSuggestion={send}
          isStreaming={isStreaming}
          activeTool={activeTool}
          clearConversation={clearConversation}
        />
      </>
    );
  }

  return (
    <ConciergeInline
      messages={messages}
      input={input}
      setInput={setInput}
      inputRef={inputRef}
      scrollRef={scrollRef}
      onSubmit={onSubmit}
      onSuggestion={send}
      isStreaming={isStreaming}
      activeTool={activeTool}
      clearConversation={clearConversation}
    />
  );
}

function ConciergeBubble({ open, onClick, streaming }: { open: boolean; onClick: () => void; streaming: boolean }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full pl-2 pr-5 py-2 transition-all duration-300 hover:scale-[1.02]"
      style={{
        background: "var(--color-emerald-deep)",
        color: "var(--color-gold-pale)",
        boxShadow: "0 24px 60px -12px rgba(14, 59, 46, 0.55)",
      }}
      aria-label="Open AI Concierge"
    >
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-full ${streaming ? "" : "concierge-pulse"}`}
        style={{ background: "var(--color-gold)", color: "var(--color-emerald-deep)" }}
      >
        {streaming ? (
          <span className="flex">
            <span className="typing-dot" />
            <span className="typing-dot" />
            <span className="typing-dot" />
          </span>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M12 3 L21 12 L12 21 L3 12 Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="3" fill="currentColor" />
          </svg>
        )}
      </span>
      <span className="text-left">
        <span
          className="block text-[9px] font-medium uppercase tracking-[0.32em]"
          style={{ color: "rgba(239,224,191,0.7)" }}
        >
          {open ? "Close" : streaming ? "Taka AI thinking…" : "Ask Taka AI"}
        </span>
        <span className="block text-[13px]" style={{ fontFamily: "var(--font-display)" }}>
          AI Concierge
        </span>
      </span>
    </button>
  );
}

interface PanelProps {
  open: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  input: string;
  setInput: (v: string) => void;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  onSubmit: (e: FormEvent) => void;
  onSuggestion: (text: string) => void;
  isStreaming: boolean;
  activeTool: string | null;
  clearConversation: () => void;
}

function ConciergePanel(props: PanelProps) {
  const { open, onClose } = props;
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        style={{ background: "rgba(14, 59, 46, 0.32)", backdropFilter: "blur(4px)" }}
      />
      <div
        className={`fixed bottom-0 right-0 z-50 flex h-[88svh] w-full max-w-[480px] flex-col transition-all duration-500 sm:bottom-6 sm:right-6 sm:h-[700px] sm:rounded-2xl ${
          open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 pointer-events-none"
        }`}
        style={{
          background: "var(--color-ivory)",
          border: "1px solid var(--color-line)",
          boxShadow: "0 30px 80px -20px rgba(14, 59, 46, 0.4)",
        }}
      >
        <ConciergeHeader onClose={onClose} clearConversation={props.clearConversation} />
        <ConciergeBody {...props} />
        <ConciergeInput {...props} />
      </div>
    </>
  );
}

function ConciergeInline(props: Omit<PanelProps, "open" | "onClose">) {
  return (
    <div
      className="flex h-[700px] w-full flex-col overflow-hidden rounded-sm"
      style={{
        background: "var(--color-ivory)",
        border: "1px solid var(--color-line)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <ConciergeHeader clearConversation={props.clearConversation} />
      <ConciergeBody {...props} />
      <ConciergeInput {...props} />
    </div>
  );
}

function ConciergeHeader({ onClose, clearConversation }: { onClose?: () => void; clearConversation: () => void }) {
  return (
    <div
      className="flex items-center justify-between px-5 py-4"
      style={{ background: "var(--color-emerald-deep)", color: "var(--color-gold-pale)" }}
    >
      <div className="flex items-center gap-3">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-full"
          style={{ background: "var(--color-gold)", color: "var(--color-emerald-deep)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M12 3 L21 12 L12 21 L3 12 Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="3" fill="currentColor" />
          </svg>
        </span>
        <div>
          <div
            className="text-[10px] font-medium uppercase tracking-[0.32em]"
            style={{ color: "rgba(239,224,191,0.65)" }}
          >
            AI Concierge
          </div>
          <div
            className="text-[15px]"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em" }}
          >
            Taka AI · Always at service
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span
          className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.28em]"
          style={{ color: "rgba(239,224,191,0.6)" }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#5FCB8B" }} />
          Online
        </span>
        <button
          onClick={clearConversation}
          aria-label="Clear conversation"
          className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/10"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 7 L19 7 M9 7 L9 4 L15 4 L15 7 M7 7 L7 20 L17 20 L17 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {onClose ? (
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/10"
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M6 6 L18 18 M18 6 L6 18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        ) : null}
      </div>
    </div>
  );
}

function ConciergeBody(props: PanelProps | Omit<PanelProps, "open" | "onClose">) {
  const { messages, scrollRef, isStreaming, onSuggestion, activeTool } = props;
  return (
    <div ref={scrollRef} data-no-smooth className="flex-1 overflow-y-auto px-5 py-6" style={{ background: "var(--color-bone-soft)" }}>
      <div className="space-y-5">
        {messages.map((m, i) => (
          <Bubble
            key={i}
            message={m}
            streaming={isStreaming && i === messages.length - 1 && m.role === "assistant"}
          />
        ))}
        {activeTool && isStreaming ? <ToolBadge name={activeTool} /> : null}
      </div>

      {messages.length <= 1 ? (
        <div className="mt-8">
          <div
            className="text-[10px] font-medium uppercase tracking-[0.32em]"
            style={{ color: "var(--color-mist)" }}
          >
            Choose a language · اختر لغتك
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={() => onSuggestion("Let's continue in English, please.")}
              className="rounded-full px-5 py-2 text-[13px] font-medium transition-all"
              style={{
                background: "var(--color-emerald-deep)",
                color: "var(--color-gold-pale)",
                border: "1px solid var(--color-emerald-deep)",
              }}
            >
              English
            </button>
            <button
              onClick={() => onSuggestion("لنواصل بالعربية من فضلك.")}
              dir="rtl"
              lang="ar"
              className="font-arabic rounded-full px-5 py-2 text-[14px] font-medium transition-all"
              style={{
                background: "var(--color-emerald-deep)",
                color: "var(--color-gold-pale)",
                border: "1px solid var(--color-emerald-deep)",
              }}
            >
              العربية
            </button>
          </div>

          <div
            className="mt-6 text-[10px] font-medium uppercase tracking-[0.32em]"
            style={{ color: "var(--color-mist)" }}
          >
            Try asking
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => onSuggestion(s)}
                className="rounded-full px-4 py-2 text-[12px] transition-all hover:border-[var(--color-gold)]"
                style={{
                  background: "var(--color-ivory)",
                  border: "1px solid var(--color-line)",
                  color: "var(--color-charcoal)",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ToolBadge({ name }: { name: string }) {
  const label =
    name === "whatsapp_handoff"
      ? "Connecting you to our team"
      : name === "recommend_experience"
      ? "Curating your recommendation"
      : "Working";
  return (
    <div
      className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em]"
      style={{ color: "var(--color-gold)" }}
    >
      <span className="flex h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: "var(--color-gold)" }} />
      <span>{label}</span>
      <span>
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </span>
    </div>
  );
}

function Bubble({ message, streaming }: { message: ChatMessage; streaming?: boolean }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
      <div
        className="max-w-[88%] rounded-2xl px-4 py-3 text-[14px] leading-[1.6]"
        style={
          isUser
            ? {
                background: "var(--color-emerald-deep)",
                color: "var(--color-gold-pale)",
                borderBottomRightRadius: "4px",
              }
            : {
                background: "var(--color-ivory)",
                color: "var(--color-charcoal)",
                border: "1px solid var(--color-line)",
                borderBottomLeftRadius: "4px",
              }
        }
      >
        <div className="whitespace-pre-wrap">
          {message.content}
          {streaming && message.content.length === 0 ? (
            <span style={{ color: "var(--color-mist)" }}>
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </span>
          ) : null}
        </div>
      </div>
      {message.toolCalls && message.toolCalls.length > 0 ? (
        <div className="mt-2 w-full max-w-[88%] space-y-2">
          {message.toolCalls.map((tc, i) => (
            <ToolCard key={i} call={tc} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ToolCard({ call }: { call: ToolCall }) {
  if (call.name === "whatsapp_handoff") {
    const url = (call.result?.whatsapp_url as string) ?? WHATSAPP_URL;
    return (
      <GenCard
        eyebrow="Ready on WhatsApp"
        title="Continue with our team"
        accent="I've prepared your request. Tap below to open WhatsApp — our front office confirms dates, rates and everything else there."
        cta={{ href: url, label: "Open WhatsApp" }}
      />
    );
  }
  if (call.name === "recommend_experience") {
    return (
      <GenCard
        eyebrow="Curated For You"
        title="Experience Pairing"
        accent="Tap below to have our concierge prepare this for the day of your arrival."
      />
    );
  }
  return null;
}

function GenCard({
  eyebrow,
  title,
  accent,
  rows,
  cta,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  rows?: { label: string; caption: string }[];
  cta?: { href: string; label: string };
}) {
  return (
    <div
      className="rounded-2xl border p-4"
      style={{ background: "var(--color-ivory)", borderColor: "var(--color-gold)" }}
    >
      <div className="text-[10px] font-medium uppercase tracking-[0.32em]" style={{ color: "var(--color-gold)" }}>
        {eyebrow}
      </div>
      <div className="mt-2 font-display text-[20px] leading-tight" style={{ color: "var(--color-emerald-deep)" }}>
        {title}
      </div>
      {rows ? (
        <ul className="mt-3 space-y-2">
          {rows.map((r) => (
            <li key={r.label} className="flex items-baseline justify-between gap-3 text-[12px]">
              <span style={{ color: "var(--color-charcoal)", fontWeight: 500 }}>{r.label}</span>
              <span style={{ color: "var(--color-mist)" }}>{r.caption}</span>
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mt-3 text-[12px] leading-[1.6]" style={{ color: "var(--color-stone)" }}>
        {accent}
      </div>
      {cta ? (
        <a
          href={cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em]"
          style={{ background: "var(--color-emerald-deep)", color: "var(--color-gold-pale)" }}
        >
          {cta.label}
          <span aria-hidden>→</span>
        </a>
      ) : null}
    </div>
  );
}

function ConciergeInput(props: PanelProps | Omit<PanelProps, "open" | "onClose">) {
  const { input, setInput, inputRef, onSubmit, isStreaming } = props;
  return (
    <form
      onSubmit={onSubmit}
      className="border-t px-4 py-3"
      style={{ borderColor: "var(--color-line)", background: "var(--color-ivory)" }}
    >
      <div className="flex items-end gap-2">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSubmit(e as unknown as FormEvent);
            }
          }}
          rows={1}
          placeholder="Ask about a stay, a tour, an event…"
          disabled={isStreaming}
          className="flex-1 resize-none bg-transparent px-2 py-2 text-[14px] outline-none"
          style={{ color: "var(--color-charcoal)", minHeight: "40px", maxHeight: "120px" }}
        />
        <button
          type="submit"
          disabled={isStreaming || input.trim().length === 0}
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-all disabled:opacity-40"
          style={{ background: "var(--color-emerald-deep)", color: "var(--color-gold-pale)" }}
          aria-label="Send"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 12 L19 12 M13 6 L19 12 L13 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div
        className="mt-2 flex items-center justify-between text-[10px]"
        style={{ color: "var(--color-mist)" }}
      >
        <span className="font-medium uppercase tracking-[0.28em]">
          End-to-end private
        </span>
        <span>↵ to send</span>
      </div>
    </form>
  );
}
