import AIChatWidget from "@/components/AIChatWidget";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Lock,
  Users,
  MessagesSquare,
  MessageCircle,
  FileText,
  Download,
  Send,
  CheckCircle,
  Sparkles,
  Siren,
  Phone,
  X,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import { useBookingState } from "@/hooks/useBookingState";
import { toast } from "sonner";

const travelers = [
  { name: "Aanya Kapoor", age: 26, city: "Mumbai" },
  { name: "Rohan Verma", age: 31, city: "Bengaluru" },
  { name: "Ishita Roy", age: 28, city: "Kolkata" },
  { name: "Karan Singh", age: 34, city: "Delhi" },
];

const initialGroupMessages = [
  { from: "Aanya", text: "So excited! Anyone bringing a tripod?", time: "10:21" },
  { from: "Rohan", text: "I've got one. Also packing power banks.", time: "10:24" },
];

const documents = [
  { name: "Itinerary.pdf", size: "1.2 MB" },
  { name: "Flight Tickets.pdf", size: "248 KB" },
  { name: "Hotel Vouchers.pdf", size: "560 KB" },
];

type Tab = "travelers" | "group" | "planner" | "docs";

const TripHub = () => {
  const { hasBooked, setBooked } = useBookingState();
  const [tab, setTab] = useState<Tab>("travelers");
  const [groupMessages, setGroupMessages] = useState(initialGroupMessages);
  const [groupInput, setGroupInput] = useState("");
  const [plannerMessages, setPlannerMessages] = useState([
    { from: "planner", text: "Hi! Welcome aboard. Let me know if you have any questions 🙌", time: "09:00" },
  ]);
  const [plannerInput, setPlannerInput] = useState("");
  const [sosOpen, setSosOpen] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [sosSent, setSosSent] = useState(false);

  useEffect(() => {
    if (!sosOpen || sosSent) return;
    if (countdown <= 0) {
      setSosSent(true);
      toast.success("SOS alert sent", {
        description: "Your trip leader and emergency contacts have been notified with your live location.",
      });
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [sosOpen, countdown, sosSent]);

  const openSos = () => {
    setCountdown(5);
    setSosSent(false);
    setSosOpen(true);
  };

  const cancelSos = () => {
    setSosOpen(false);
    setSosSent(false);
    setCountdown(5);
  };

  const sendGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupInput.trim()) return;
    setGroupMessages([...groupMessages, { from: "You", text: groupInput, time: "now" }]);
    setGroupInput("");
  };

  const sendPlanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plannerInput.trim()) return;
    setPlannerMessages([...plannerMessages, { from: "you", text: plannerInput, time: "now" }]);
    setPlannerInput("");
  };

  if (!hasBooked) {
    return (
      <div className="min-h-screen pb-20 md:pb-0">
        <Navbar />
        <div className="container py-10 max-w-5xl">
          <div className="relative">
            {/* Blurred preview (decorative, non-interactive) */}
            <div
              aria-hidden
              className="pointer-events-none select-none"
              style={{ filter: "blur(8px)", opacity: 0.6 }}
            >
              <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
                <div>
                  <h1 className="text-3xl font-extrabold font-display flex items-center gap-2">
                    Trip Hub <CheckCircle className="w-6 h-6 text-success" />
                  </h1>
                  <p className="text-sm text-muted-foreground">Magical Manali & Solang Valley · Apr 15 – Apr 19</p>
                </div>
              </div>

              <div className="flex bg-muted p-1 rounded-xl mb-6">
                {[
                  { label: "Travelers", icon: Users },
                  { label: "Group Chat", icon: MessagesSquare },
                  { label: "Planner Chat", icon: MessageCircle },
                  { label: "Documents", icon: FileText },
                ].map((t, i) => (
                  <div
                    key={t.label}
                    className={`flex-1 h-11 rounded-lg text-sm font-medium inline-flex items-center justify-center gap-2 ${
                      i === 0 ? "bg-background shadow-soft" : "text-muted-foreground"
                    }`}
                  >
                    <t.icon className="w-4 h-4" /> {t.label}
                  </div>
                ))}
              </div>

              <div className="bg-card border rounded-2xl shadow-soft p-6 space-y-6">
                {/* Travelers preview */}
                <div className="grid sm:grid-cols-2 gap-3">
                  {travelers.map((t) => (
                    <div key={t.name} className="flex items-center gap-3 p-3 rounded-xl bg-muted/40">
                      <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                        {t.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold">{t.name}</p>
                        <p className="text-xs text-muted-foreground">Age {t.age} · {t.city}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat preview */}
                <div className="space-y-2">
                  {initialGroupMessages.map((m, i) => (
                    <div key={i} className="flex justify-start">
                      <div className="max-w-[75%] p-3 rounded-2xl text-sm bg-muted rounded-bl-sm">
                        <p className="text-[11px] font-semibold mb-0.5 opacity-80">{m.from}</p>
                        <p>{m.text}</p>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-end">
                    <div className="max-w-[75%] p-3 rounded-2xl text-sm bg-primary text-primary-foreground rounded-br-sm">
                      <p>Can&apos;t wait, booking my flight today!</p>
                    </div>
                  </div>
                </div>

                {/* Documents preview */}
                <div className="space-y-2">
                  {documents.map((d) => (
                    <div key={d.name} className="flex items-center justify-between p-4 rounded-xl bg-muted/40">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{d.name}</p>
                          <p className="text-xs text-muted-foreground">{d.size}</p>
                        </div>
                      </div>
                      <div className="h-9 px-4 rounded-lg bg-background border text-sm font-medium inline-flex items-center gap-1">
                        <Download className="w-4 h-4" /> Download
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Centered locked overlay */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-card/95 backdrop-blur-md border rounded-2xl shadow-elevated p-8 text-center animate-fade-in">
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-5">
                  <Lock className="w-9 h-9 text-muted-foreground" />
                  <Sparkles className="w-5 h-5 text-secondary absolute top-1.5 right-1.5" />
                </div>
                <h1 className="text-2xl font-extrabold font-display">🔒 Trip Hub Locked</h1>
                <p className="text-sm text-muted-foreground mt-2">
                  Unlock group chat, travelers, and trip documents after booking.
                </p>
                <div className="flex flex-col gap-2 mt-6">
                  <Link
                    to="/explore"
                    className="h-12 px-6 inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors shadow-elevated"
                  >
                    Book a Trip to Unlock
                  </Link>
                  <button
                    onClick={() => setBooked(true)}
                    className="h-10 px-6 inline-flex items-center justify-center rounded-xl text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    ▶ Demo: simulate a booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navbar />
      <div className="container py-8 max-w-5xl">
        {/* Trip identity hero strip */}
        <div className="relative rounded-2xl overflow-hidden mb-6 h-36 sm:h-44">
          <img
            src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80"
            alt="Trip cover"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
            <div className="flex items-end justify-between gap-3 flex-wrap">
              <div className="min-w-0">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-500/20 border border-green-400/30 text-green-300 text-[10px] font-bold uppercase tracking-wider mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Live trip
                </span>
                <h1 className="text-xl sm:text-2xl font-extrabold font-display text-white leading-tight break-words">
                  Magical Manali &amp; Solang Valley
                </h1>
                <p className="text-white/70 text-sm mt-0.5">Apr 15 to Apr 19 · Himalayan Trails Co.</p>
              </div>
              <button
                onClick={openSos}
                className="shrink-0 h-10 px-4 rounded-xl bg-red-500 text-white font-extrabold text-sm inline-flex items-center gap-1.5 shadow-elevated hover:bg-red-600 transition-colors"
              >
                <Siren className="w-4 h-4" /> SOS
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end mb-4">
          <button onClick={() => setBooked(false)} className="text-xs text-muted-foreground hover:text-destructive underline underline-offset-2">
            Reset demo (lock again)
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border mb-6 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {[
            { id: "travelers", label: "Crew", icon: Users },
            { id: "group", label: "Chat", icon: MessagesSquare },
            { id: "planner", label: "Leader", icon: MessageCircle },
            { id: "docs", label: "Docs", icon: FileText },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as Tab)}
              className={`flex items-center justify-center gap-2 min-w-[44px] px-4 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                tab === t.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              }`}
            >
              <t.icon className="w-4 h-4 shrink-0" />
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        <div className="bg-card border rounded-2xl shadow-soft p-4 sm:p-6 animate-fade-in">
          {tab === "travelers" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2 flex-wrap mb-4">
                <p className="text-sm font-bold">{travelers.length + 1} travelers going</p>
                <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                  {travelers.length + 1} / 12 seats filled
                </span>
              </div>

              <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-5">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
                  style={{ width: `${((travelers.length + 1) / 12) * 100}%` }}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-4 rounded-2xl border-2 border-primary/20 bg-primary/5">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-extrabold text-lg shrink-0">
                    Y
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm">You</p>
                    <p className="text-xs text-muted-foreground">Primary traveler</p>
                  </div>
                  <span className="ml-auto text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-full shrink-0">You</span>
                </div>

                {travelers.map((t, i) => {
                  const colors = ["bg-violet-500", "bg-teal-500", "bg-amber-500", "bg-rose-500"];
                  return (
                    <div key={t.name} className="flex items-center gap-3 p-4 rounded-2xl border bg-card hover:border-primary/30 transition-colors">
                      <div className={`w-12 h-12 rounded-full ${colors[i % colors.length]} text-white flex items-center justify-center font-extrabold text-lg shrink-0`}>
                        {t.name[0]}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-sm truncate">{t.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{t.city} · {t.age} yrs</p>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-green-400 shrink-0 ml-auto" title="Ready to go" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {tab === "group" && (
            <div className="flex flex-col h-[480px]">
              <div className="flex items-center gap-3 pb-3 border-b mb-3">
                <div className="flex -space-x-2">
                  {["V", "R", "I", "K"].map((l, i) => (
                    <div key={l} className={`w-7 h-7 rounded-full border-2 border-card flex items-center justify-center text-[11px] font-bold text-white ${["bg-violet-500","bg-teal-500","bg-amber-500","bg-rose-500"][i]}`}>{l}</div>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-bold">5 members</p>
                  <p className="text-[10px] text-green-500 font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" /> 3 online</p>
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/10 border border-primary/15 mb-3 text-xs text-primary font-medium">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span className="break-words">
                  Welcome to your group chat! Your trip is in {Math.ceil((new Date("2026-04-15").getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days.
                </span>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto pr-2">
                {groupMessages.map((m, i) => {
                  const isYou = m.from === "You";
                  return (
                    <div key={i} className={`flex ${isYou ? "justify-end" : "justify-start"} gap-2`}>
                      {!isYou && (
                        <div className="w-7 h-7 rounded-full bg-violet-500 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-auto">
                          {m.from[0]}
                        </div>
                      )}
                      <div className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm break-words ${
                        isYou ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-muted rounded-bl-sm"
                      }`}>
                        {!isYou && <p className="text-[10px] font-bold mb-0.5 opacity-70">{m.from}</p>}
                        <p className="leading-relaxed break-words">{m.text}</p>
                        <p className="text-[10px] opacity-60 mt-1 text-right">{m.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <form onSubmit={sendGroup} className="flex gap-2 mt-3 pt-3 border-t">
                <input
                  value={groupInput}
                  onChange={(e) => setGroupInput(e.target.value)}
                  placeholder="Say something to your crew..."
                  className="flex-1 h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button type="submit" className="w-11 h-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors shrink-0">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {tab === "planner" && (
            <div className="flex flex-col h-[480px]">
              <div className="flex items-center gap-3 pb-4 border-b mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center font-bold">A</div>
                <div>
                  <p className="font-semibold">Arjun Mehta</p>
                  <p className="text-xs text-success flex items-center gap-1">● Online · Himalayan Trails Co.</p>
                </div>
              </div>
              <div className="flex-1 space-y-3 overflow-y-auto pr-2">
                {plannerMessages.map((m, i) => {
                  const isYou = m.from === "you";
                  return (
                    <div key={i} className={`flex ${isYou ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[75%] p-3 rounded-2xl text-sm break-words ${
                        isYou ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-muted rounded-bl-sm"
                      }`}>
                        <p className="break-words">{m.text}</p>
                        <p className="text-[10px] opacity-70 mt-1">{m.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <form onSubmit={sendPlanner} className="mt-4 flex gap-2">
                <input
                  value={plannerInput}
                  onChange={(e) => setPlannerInput(e.target.value)}
                  placeholder="Message your planner..."
                  className="flex-1 h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button type="submit" className="h-11 px-4 rounded-xl bg-primary text-primary-foreground inline-flex items-center gap-1 font-medium hover:bg-primary/90 transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {tab === "docs" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200/60 text-xs text-amber-700 font-medium">
                <FileText className="w-4 h-4 shrink-0" />
                All documents are shared by your trip leader. Download and save before departure.
              </div>
              {documents.map((d) => {
                const ext = d.name.split(".").pop()?.toUpperCase();
                const extColors: Record<string, string> = { PDF: "bg-red-100 text-red-600", JPG: "bg-blue-100 text-blue-600", DOCX: "bg-blue-100 text-blue-700" };
                return (
                  <div key={d.name} className="flex items-center gap-4 p-4 rounded-2xl border bg-card hover:border-primary/30 hover:shadow-soft transition-all group">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${extColors[ext ?? ""] ?? "bg-muted text-muted-foreground"}`}>
                      {ext}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{d.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{d.size}</p>
                    </div>
                    <button className="h-9 px-4 rounded-xl border font-semibold text-xs flex items-center gap-1.5 hover:bg-primary hover:text-white hover:border-primary transition-all group-hover:border-primary/40 shrink-0">
                      <Download className="w-3.5 h-3.5" /> Save
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
      {sosOpen && (
        <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center bg-foreground/60 backdrop-blur-sm p-0 sm:p-4">
          <div className="w-full sm:max-w-md bg-card rounded-t-3xl sm:rounded-3xl border shadow-elevated p-6 text-center space-y-4">
            {!sosSent ? (
              <>
                <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
                  <span className="text-3xl font-extrabold text-destructive">{countdown}</span>
                </div>
                <h3 className="text-xl font-extrabold font-display">Sending SOS alert</h3>
                <p className="text-sm text-muted-foreground">
                  Your trip leader, group members and emergency contacts will receive your live location in {countdown} second{countdown === 1 ? "" : "s"}.
                </p>
                <button
                  onClick={() => { setCountdown(0); }}
                  className="w-full h-12 rounded-xl bg-destructive text-destructive-foreground font-bold text-sm inline-flex items-center justify-center gap-2 hover:bg-destructive/90 transition-colors"
                >
                  <Siren className="w-4 h-4" /> Send SOS Alert Now
                </button>
                <button
                  onClick={cancelSos}
                  className="w-full h-11 rounded-xl border-2 font-bold text-sm inline-flex items-center justify-center gap-2 hover:bg-muted transition-colors"
                >
                  <X className="w-4 h-4" /> Cancel
                </button>
              </>
            ) : (
              <>
                <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-9 h-9 text-success" />
                </div>
                <h3 className="text-xl font-extrabold font-display">Help is on the way</h3>
                <p className="text-sm text-muted-foreground">
                  Your trip leader has been alerted with your live location. Stay where you are if it is safe to do so.
                </p>
                <a
                  href="tel:112"
                  className="w-full h-12 rounded-xl bg-destructive text-destructive-foreground font-bold text-sm inline-flex items-center justify-center gap-2 hover:bg-destructive/90 transition-colors"
                >
                  <Phone className="w-4 h-4" /> Call emergency services (112)
                </a>
                <button onClick={cancelSos} className="w-full h-11 rounded-xl border-2 font-bold text-sm hover:bg-muted transition-colors">
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
      <BottomNav />
      <AIChatWidget />

    </div>
  );
};

export default TripHub;
