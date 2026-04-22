import { useState } from "react";
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
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import { useBookingState } from "@/hooks/useBookingState";

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
        <div className="container py-16 max-w-2xl text-center">
          <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-muted mb-6">
            <Lock className="w-10 h-10 text-muted-foreground" />
            <Sparkles className="w-5 h-5 text-secondary absolute top-2 right-2" />
          </div>
          <h1 className="text-3xl font-extrabold font-display">Trip Hub is locked</h1>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">
            The Trip Hub unlocks after you book a trip — your space to chat with co-travelers, message your planner, and access trip documents.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-3 text-left">
            {[
              { icon: Users, title: "Travelers list", desc: "See who else is on the trip" },
              { icon: MessagesSquare, title: "Group chat", desc: "Message all travelers" },
              { icon: MessageCircle, title: "Planner chat", desc: "Direct line to your planner" },
              { icon: FileText, title: "Documents", desc: "Tickets, vouchers, PDFs" },
            ].map((item) => (
              <div key={item.title} className="p-4 rounded-xl bg-muted/50 border border-dashed">
                <item.icon className="w-5 h-5 text-muted-foreground mb-2" />
                <p className="font-semibold text-sm">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
            <Link to="/explore" className="h-12 px-6 inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
              Browse trips to book
            </Link>
            <button
              onClick={() => setBooked(true)}
              className="h-12 px-6 inline-flex items-center justify-center rounded-xl bg-muted text-foreground font-medium hover:bg-muted/70 transition-colors"
            >
              ▶ Demo: simulate a booking
            </button>
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
          <button onClick={() => setBooked(false)} className="text-xs text-muted-foreground hover:text-destructive underline underline-offset-2">
            Reset demo (lock again)
          </button>
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
      <Footer />
      <BottomNav />
    </div>
  );
};

export default TripHub;
