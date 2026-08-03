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
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <div>
            <h1 className="text-3xl font-extrabold font-display flex items-center gap-2">
              Trip Hub <CheckCircle className="w-6 h-6 text-success" />
            </h1>
            <p className="text-sm text-muted-foreground">Magical Manali & Solang Valley · Apr 15 – Apr 19</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={openSos}
              className="h-11 px-5 rounded-xl bg-destructive text-destructive-foreground font-extrabold text-sm inline-flex items-center gap-2 shadow-elevated hover:bg-destructive/90 transition-colors animate-pulse"
            >
              <Siren className="w-4 h-4" /> SOS
            </button>
            <button onClick={() => setBooked(false)} className="text-xs text-muted-foreground hover:text-destructive underline underline-offset-2">
              Reset demo (lock again)
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-muted p-1 rounded-xl mb-6 overflow-x-auto scrollbar-hide">
          {[
            { id: "travelers", label: "Travelers", icon: Users },
            { id: "group", label: "Group Chat", icon: MessagesSquare },
            { id: "planner", label: "Planner Chat", icon: MessageCircle },
            { id: "docs", label: "Documents", icon: FileText },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as Tab)}
              className={`flex-1 min-w-[120px] h-11 rounded-lg text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors ${
                tab === t.id ? "bg-background shadow-soft" : "text-muted-foreground"
              }`}
            >
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>

        <div className="bg-card border rounded-2xl shadow-soft p-6 animate-fade-in">
          {tab === "travelers" && (
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
          )}

          {tab === "group" && (
            <div className="flex flex-col h-[480px]">
              <div className="flex-1 space-y-3 overflow-y-auto pr-2">
                {groupMessages.map((m, i) => {
                  const isYou = m.from === "You";
                  return (
                    <div key={i} className={`flex ${isYou ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                        isYou ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-muted rounded-bl-sm"
                      }`}>
                        {!isYou && <p className="text-[11px] font-semibold mb-0.5 opacity-80">{m.from}</p>}
                        <p>{m.text}</p>
                        <p className="text-[10px] opacity-70 mt-1">{m.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <form onSubmit={sendGroup} className="mt-4 flex gap-2">
                <input
                  value={groupInput}
                  onChange={(e) => setGroupInput(e.target.value)}
                  placeholder="Message the group..."
                  className="flex-1 h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button type="submit" className="h-11 px-4 rounded-xl bg-primary text-primary-foreground inline-flex items-center gap-1 font-medium hover:bg-primary/90 transition-colors">
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
                      <div className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                        isYou ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-muted rounded-bl-sm"
                      }`}>
                        <p>{m.text}</p>
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
            <div className="space-y-2">
              {documents.map((d) => (
                <div key={d.name} className="flex items-center justify-between p-4 rounded-xl bg-muted/40 hover:bg-muted/70 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{d.name}</p>
                      <p className="text-xs text-muted-foreground">{d.size}</p>
                    </div>
                  </div>
                  <button className="h-9 px-4 rounded-lg bg-background border text-sm font-medium hover:bg-muted inline-flex items-center gap-1">
                    <Download className="w-4 h-4" /> Download
                  </button>
                </div>
              ))}
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
