import { useEffect, useRef, useState } from "react";
import { X, Send, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING =
  "Hey, I'm Trippy! Your Trippinity travel assistant. Tell me where you want to go, your budget, or ask anything about our trips.";

const PERMANENT_SUGGESTIONS = [
  "Help me book a Kashmir trip",
  "What's included in the price?",
];

const PAGE_SUGGESTIONS: Record<string, string[]> = {
  "/": [
    "What is Trippinity?",
    "How does booking work?",
    "Show me popular trips",
  ],
  "/explore": [
    "Filter trips under ₹10,000",
    "Best group trips available",
    "Weekend getaways from Delhi",
  ],
  "/destinations": [
    "Which destination is best in summer?",
    "Hidden gems in India",
    "Ladakh vs Spiti: which to pick?",
  ],
  "/about": [
    "Who built Trippinity?",
    "How are planners verified?",
    "What makes Trippinity different?",
  ],
  "/trip-hub": [
    "What is Trip Hub?",
    "How do I unlock Trip Hub?",
    "Can I chat with my travel group?",
  ],
  "/favourites": [
    "Show me trips like my saved ones",
    "How do I book a saved trip?",
  ],
  "/profile": [
    "How do I view my bookings?",
    "Can I cancel my booking?",
  ],
  "/contact": [
    "What is your support email?",
    "I have an issue with my booking",
  ],
  "/testimonials": [
    "Show me reviews for Ladakh trips",
    "Are these reviews real?",
  ],
};

const getPageSuggestions = (pathname: string): string[] => {
  if (pathname.startsWith("/trip/")) {
    return [
      "Is this trip suitable for beginners?",
      "What should I pack for this trip?",
      "What is the cancellation policy?",
    ];
  }
  if (pathname.startsWith("/planner/")) {
    return [
      "Is this operator verified?",
      "What other trips does this planner offer?",
      "How do I contact this planner?",
    ];
  }
  return PAGE_SUGGESTIONS[pathname] ?? PAGE_SUGGESTIONS["/"];
};

const AIChatWidget = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content: GREETING,
    },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const pageSuggestions = getPageSuggestions(location.pathname);
  const allSuggestions = [...PERMANENT_SUGGESTIONS, ...pageSuggestions].slice(0, 5);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || streaming) return;
    const userMsg: Msg = { role: "user", content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setStreaming(true);

    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && last.content !== messages[messages.length - 1]?.content) {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: next }),
      });

      if (resp.status === 429) { toast.error("Too many requests. Please try again in a moment."); setStreaming(false); return; }
      if (resp.status === 402) { toast.error("AI credits exhausted."); setStreaming(false); return; }
      if (!resp.ok || !resp.body) throw new Error("Failed to start stream");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let done = false;

      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buffer += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, nl);
          buffer = buffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(json);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsert(content);
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Couldn't reach the AI right now. Please try again.");
    } finally {
      setStreaming(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open AI travel assistant"
        className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-[60] h-14 w-14 rounded-full text-white shadow-elevated flex items-center justify-center hover:scale-110 transition-transform"
        style={{
          background: "linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)",
          backgroundSize: "200% 200%",
          animation: "gradientShift 4s ease infinite",
        }}
      >
        {open ? <X className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
        {!open && (
          <span className="absolute -top-1 -right-1 text-[9px] font-extrabold bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded-full">
            AI
          </span>
        )}
      </button>

      {open && (
        <div className="fixed bottom-36 md:bottom-24 right-4 md:right-6 z-[60] w-[min(92vw,380px)] h-[480px] bg-card rounded-3xl shadow-elevated border flex flex-col overflow-hidden animate-scale-pop">
          <div className="bg-foreground text-background p-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)",
              }}
            >
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm">Trippy · AI Travel Concierge</p>
              <p className="text-[11px] opacity-70 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" /> Online · Powered by Claude
              </p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted text-foreground rounded-tl-sm leading-relaxed text-sm whitespace-pre-wrap"
                  }`}
                >
                  {m.content || (streaming && i === messages.length - 1 ? "…" : "")}
                </div>
              </div>
            ))}
            {streaming && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="flex gap-1 items-center px-3.5 py-3 bg-muted rounded-2xl rounded-tl-sm w-16">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {messages.length <= 1 && (
            <div className="px-3 pb-2 flex flex-wrap gap-1.5">
              {allSuggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-[11px] pl-2.5 pr-2.5 py-1 rounded-full bg-muted hover:bg-muted/70 transition-colors text-foreground/80 border-l-2 border-l-primary"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {messages.length > 4 && (
            <div className="px-3 pb-1 flex justify-center">
              <button
                onClick={() => setMessages([{ role: "assistant", content: GREETING }])}
                className="text-[11px] text-muted-foreground hover:text-foreground border rounded-full px-3 py-1 transition-colors"
              >
                Start new topic
              </button>
            </div>
          )}

          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="p-3 border-t flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a trip…"
              disabled={streaming}
              className="flex-1 h-10 px-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={streaming || !input.trim()}
              className="h-10 w-10 rounded-xl bg-primary text-primary-foreground inline-flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AIChatWidget;
