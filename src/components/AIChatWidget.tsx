import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Find me a beach trip under ₹15k",
  "Best trips for a group of friends",
  "How does booking work?",
  "Weekend trips from Delhi",
];

const AIChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hey! I'm Trippy ✈️ — your AI travel concierge. Tell me your vibe (mountains, beach, adventure?) and I'll point you to the right trip.",
    },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

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
          // we already inserted an assistant placeholder
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

      if (resp.status === 429) {
        toast.error("Too many requests — please try again in a moment.");
        setStreaming(false);
        return;
      }
      if (resp.status === 402) {
        toast.error("AI credits exhausted. Add credits in Lovable Cloud → Workspace → Usage.");
        setStreaming(false);
        return;
      }
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
          if (json === "[DONE]") {
            done = true;
            break;
          }
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
      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open AI travel assistant"
        className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-[60] h-14 w-14 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-elevated flex items-center justify-center hover:scale-110 transition-transform"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-secondary text-secondary-foreground text-[10px] font-bold flex items-center justify-center animate-pulse">
            AI
          </span>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-36 md:bottom-24 right-2 md:right-6 z-[60] w-[calc(100vw-1rem)] max-w-[380px] h-[560px] max-h-[80vh] bg-card border rounded-2xl shadow-elevated flex flex-col overflow-hidden animate-scale-in">
          <div className="p-4 border-b bg-gradient-to-r from-primary to-accent text-primary-foreground flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm">Trippy · AI Travel Concierge</p>
              <p className="text-[11px] opacity-90 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-success" /> Online
              </p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted rounded-bl-sm"
                  }`}
                >
                  {m.content || (streaming && i === messages.length - 1 ? "…" : "")}
                </div>
              </div>
            ))}
            {streaming && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl rounded-bl-sm p-3">
                  <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
          </div>

          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-muted hover:bg-muted/70 transition-colors text-foreground/80"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
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
