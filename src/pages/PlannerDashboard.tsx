import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard, Map, Users, MessageSquare, Settings,
  TrendingUp, Calendar, IndianRupee, Star, Bell, LogOut,
  ChevronRight, Eye, CheckCircle2, Clock, XCircle,
  Download, Phone, ShieldCheck, Plus, BarChart2,
} from "lucide-react";
import { mockTrips } from "@/data/mockTrips";
import SEO from "@/components/SEO";

const PLANNER = {
  name: "Himalayan Trails Co.",
  owner: "Arjun Mehta",
  verified: true,
  avatar: "HT",
  rating: 4.8,
  tripsListed: 3,
  totalBookings: 164,
  totalRevenue: 2136000,
  responseRate: 97,
};

const BOOKINGS = [
  { id: "B001", traveler: "Aanya Kapoor", trip: "Magical Manali & Solang Valley", date: "Apr 15, 2026", amount: 12999, status: "confirmed", phone: "+91 98765 43210" },
  { id: "B002", traveler: "Rohan Verma", trip: "Leh Ladakh Bike Expedition", date: "Jul 1, 2026", amount: 25999, status: "confirmed", phone: "+91 87654 32109" },
  { id: "B003", traveler: "Ishita Roy", trip: "Magical Manali & Solang Valley", date: "Apr 15, 2026", amount: 12999, status: "pending", phone: "+91 76543 21098" },
  { id: "B004", traveler: "Karan Singh", trip: "Leh Ladakh Bike Expedition", date: "Jul 1, 2026", amount: 25999, status: "confirmed", phone: "+91 65432 10987" },
  { id: "B005", traveler: "Priya Sharma", trip: "Magical Manali & Solang Valley", date: "Apr 15, 2026", amount: 12999, status: "cancelled", phone: "+91 54321 09876" },
];

const MESSAGES = [
  { from: "Aanya Kapoor", msg: "Hi! Is the trip still on for April?", time: "2h ago", unread: true },
  { from: "Rohan Verma", msg: "Can we get a discount for 3 people?", time: "5h ago", unread: true },
  { from: "Karan Singh", msg: "What is the assembly point exactly?", time: "Yesterday", unread: false },
];

type Tab = "overview" | "trips" | "bookings" | "messages" | "settings";

const NAV: { id: Tab; label: string; icon: typeof Map; badge?: number }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "trips", label: "My Trips", icon: Map },
  { id: "bookings", label: "Bookings", icon: Users },
  { id: "messages", label: "Messages", icon: MessageSquare, badge: 2 },
  { id: "settings", label: "Settings", icon: Settings },
];

const PlannerDashboard = () => {
  const [tab, setTab] = useState<Tab>("overview");
  const plannerTrips = mockTrips.filter((t) => t.companyId === "himalayan-trails");

  const statusBadge = (s: string) => {
    if (s === "confirmed") return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-green-50 text-green-700 text-[10px] font-bold"><CheckCircle2 className="w-3 h-3" /> Confirmed</span>;
    if (s === "pending") return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 text-[10px] font-bold"><Clock className="w-3 h-3" /> Pending</span>;
    return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-destructive/10 text-destructive text-[10px] font-bold"><XCircle className="w-3 h-3" /> Cancelled</span>;
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <SEO
        title="Planner Dashboard | Trippinity"
        description="Manage your trips, bookings, travelers, and messages from the Trippinity planner dashboard."
        path="/planner-dashboard"
      />

      {/* Top navbar */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
        <div className="container h-16 flex items-center gap-3">
          <Link to="/" className="font-display text-xl font-extrabold">
            Tripp<span className="text-primary">inity</span>
          </Link>
          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-[11px] font-bold">
            <LayoutDashboard className="w-3 h-3" /> Planner Dashboard
          </span>
          <div className="ml-auto flex items-center gap-3">
            <button aria-label="Notifications" className="relative w-9 h-9 rounded-xl border flex items-center justify-center hover:bg-muted transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
            </button>
            <span className="w-9 h-9 rounded-xl bg-primary text-white text-xs font-extrabold flex items-center justify-center">{PLANNER.avatar}</span>
          </div>
        </div>
      </header>

      <div className="container py-6 flex gap-6">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col gap-1 w-60 shrink-0">
          <div className="rounded-2xl border bg-card p-4 text-center mb-3">
            <div className="w-12 h-12 mx-auto rounded-xl bg-primary text-white font-extrabold flex items-center justify-center mb-2">{PLANNER.avatar}</div>
            <p className="text-sm font-bold font-display truncate">{PLANNER.name}</p>
            <p className="text-xs text-muted-foreground">{PLANNER.owner}</p>
            {PLANNER.verified && (
              <span className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-green-50 text-green-700 text-[10px] font-bold">
                <ShieldCheck className="w-3 h-3" /> Verified
              </span>
            )}
          </div>
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors relative ${
                tab === item.id ? "bg-primary text-white" : "hover:bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
              {item.badge && (
                <span className="ml-auto px-1.5 py-0.5 rounded-full bg-destructive text-white text-[10px] font-bold">{item.badge}</span>
              )}
            </button>
          ))}
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-muted-foreground hover:text-destructive transition-colors mt-2">
            <LogOut className="w-4 h-4" /> Sign out
          </Link>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 pb-24 md:pb-0">
          {/* OVERVIEW */}
          {tab === "overview" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-extrabold font-display">Good morning, {PLANNER.owner.split(" ")[0]}!</h1>
                  <p className="text-sm text-muted-foreground">Here&apos;s your business snapshot for today.</p>
                </div>
                <button className="h-11 px-5 rounded-xl bg-primary text-white text-sm font-bold inline-flex items-center gap-2 hover:bg-primary/90 transition-colors">
                  <Plus className="w-4 h-4" /> Add new trip
                </button>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { icon: IndianRupee, label: "Total revenue", value: `₹${(PLANNER.totalRevenue / 100000).toFixed(1)}L`, sub: "+18% this month", color: "text-green-600", bg: "bg-green-50" },
                  { icon: Users, label: "Total bookings", value: PLANNER.totalBookings, sub: "5 this week", color: "text-blue-600", bg: "bg-blue-50" },
                  { icon: Star, label: "Avg rating", value: `${PLANNER.rating} ★`, sub: "From 164 reviews", color: "text-amber-600", bg: "bg-amber-50" },
                  { icon: TrendingUp, label: "Response rate", value: `${PLANNER.responseRate}%`, sub: "Top 5% planners", color: "text-primary", bg: "bg-primary/10" },
                ].map((k) => (
                  <div key={k.label} className="rounded-2xl border bg-card p-4">
                    <div className={`w-9 h-9 rounded-xl ${k.bg} flex items-center justify-center mb-3`}>
                      <k.icon className={`w-4 h-4 ${k.color}`} />
                    </div>
                    <p className="text-xl font-extrabold font-display">{k.value}</p>
                    <p className="text-xs text-muted-foreground">{k.label}</p>
                    <p className={`text-[11px] font-semibold mt-1 ${k.color}`}>{k.sub}</p>
                  </div>
                ))}
              </div>

              {/* Recent bookings */}
              <div className="rounded-2xl border bg-card p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold font-display">Recent Bookings</h2>
                  <button onClick={() => setTab("bookings")} className="text-xs text-primary font-semibold hover:underline flex items-center gap-1">View all <ChevronRight className="w-3 h-3" /></button>
                </div>
                <div className="space-y-2">
                  {BOOKINGS.slice(0, 3).map((b) => (
                    <div key={b.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/40">
                      <span className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center shrink-0">{b.traveler[0]}</span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold truncate">{b.traveler}</p>
                        <p className="text-xs text-muted-foreground truncate">{b.trip}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold">₹{b.amount.toLocaleString("en-IN")}</p>
                        {statusBadge(b.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active trips */}
              <div className="rounded-2xl border bg-card p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold font-display">Your Active Trips</h2>
                  <button onClick={() => setTab("trips")} className="text-xs text-primary font-semibold hover:underline flex items-center gap-1">Manage <ChevronRight className="w-3 h-3" /></button>
                </div>
                <div className="space-y-3">
                  {plannerTrips.slice(0, 2).map((t) => {
                    const total = t.totalSeats ?? 20;
                    const pct = Math.min(100, (t.booked / total) * 100);
                    return (
                      <div key={t.id} className="flex items-center gap-3 p-3 rounded-xl border">
                        <img src={t.image} alt={t.title} className="w-16 h-16 rounded-xl object-cover shrink-0" loading="lazy" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold truncate">{t.title}</p>
                          <p className="text-xs text-muted-foreground">{t.dates}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="h-1.5 w-24 rounded-full bg-muted overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                            </div>
                            <span className="text-[11px] text-muted-foreground">{t.booked}/{total} seats</span>
                          </div>
                        </div>
                        <Link to={`/trip/${t.id}`} className="shrink-0 h-9 px-3 rounded-xl border text-xs font-semibold inline-flex items-center gap-1 hover:bg-muted transition-colors">
                          <Eye className="w-3.5 h-3.5" /> View
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TRIPS */}
          {tab === "trips" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-3">
                <h1 className="text-2xl font-extrabold font-display">My Trips</h1>
                <button className="h-11 px-5 rounded-xl bg-primary text-white text-sm font-bold inline-flex items-center gap-2 hover:bg-primary/90 transition-colors">
                  <Plus className="w-4 h-4" /> Add trip
                </button>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {plannerTrips.map((t) => {
                  const total = t.totalSeats ?? 20;
                  const left = Math.max(0, total - t.booked);
                  const pct = Math.min(100, (t.booked / total) * 100);
                  return (
                    <div key={t.id} className="rounded-2xl border bg-card overflow-hidden">
                      <div className="relative h-32">
                        <img src={t.image} alt={t.title} className="w-full h-full object-cover" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3">
                          <p className="text-sm font-bold text-white truncate">{t.title}</p>
                          <span className="text-xs text-white/80">₹{t.price.toLocaleString("en-IN")}</span>
                        </div>
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {t.dates}</span>
                          <span className="inline-flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-secondary stroke-secondary" /> {t.rating}</span>
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-[11px] font-semibold mb-1">
                            <span>{t.booked} booked</span>
                            <span className="text-muted-foreground">{left} seats left</span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                            <div className={`h-full rounded-full ${pct > 80 ? "bg-destructive" : "bg-primary"}`} style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Link to={`/trip/${t.id}`} className="flex-1 h-9 rounded-xl border text-xs font-semibold inline-flex items-center justify-center gap-1 hover:bg-muted transition-colors">
                            <Eye className="w-3.5 h-3.5" /> Preview
                          </Link>
                          <button className="flex-1 h-9 rounded-xl border text-xs font-semibold inline-flex items-center justify-center gap-1 hover:bg-muted transition-colors">
                            <BarChart2 className="w-3.5 h-3.5" /> Analytics
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* BOOKINGS */}
          {tab === "bookings" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-3">
                <h1 className="text-2xl font-extrabold font-display">All Bookings</h1>
                <button className="h-11 px-4 rounded-xl border text-sm font-semibold inline-flex items-center gap-2 hover:bg-muted transition-colors">
                  <Download className="w-4 h-4" /> Export CSV
                </button>
              </div>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                {["All", "Confirmed", "Pending", "Cancelled"].map((f, i) => (
                  <button key={f} className={`px-3 h-8 rounded-xl text-xs font-semibold shrink-0 transition-colors ${i === 0 ? "bg-primary text-white" : "bg-muted hover:bg-muted/70"}`}>
                    {f}
                  </button>
                ))}
              </div>
              <div className="rounded-2xl border bg-card overflow-hidden">
                {BOOKINGS.map((b, i) => (
                  <div key={b.id} className={`flex items-center gap-3 p-4 ${i > 0 ? "border-t" : ""}`}>
                    <span className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center shrink-0">{b.traveler[0]}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold truncate">{b.traveler}</p>
                      <p className="text-xs text-muted-foreground truncate">{b.trip}</p>
                      <p className="text-[11px] text-muted-foreground">{b.date}</p>
                    </div>
                    <a href={`tel:${b.phone.replace(/\s/g, "")}`} aria-label={`Call ${b.traveler}`} className="hidden sm:flex w-9 h-9 rounded-xl border items-center justify-center hover:bg-muted transition-colors shrink-0">
                      <Phone className="w-4 h-4" />
                    </a>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold">₹{b.amount.toLocaleString("en-IN")}</p>
                      {statusBadge(b.status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MESSAGES */}
          {tab === "messages" && (
            <div className="space-y-5">
              <h1 className="text-2xl font-extrabold font-display">Messages</h1>
              <div className="rounded-2xl border bg-card overflow-hidden">
                {MESSAGES.map((m, i) => (
                  <div key={m.from} className={`flex items-center gap-3 p-4 ${i > 0 ? "border-t" : ""} ${m.unread ? "bg-primary/5" : ""}`}>
                    <span className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center shrink-0">{m.from[0]}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold truncate">{m.from}</p>
                        {m.unread && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                        <span className="ml-auto text-[11px] text-muted-foreground shrink-0">{m.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{m.msg}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SETTINGS */}
          {tab === "settings" && (
            <div className="space-y-5">
              <h1 className="text-2xl font-extrabold font-display">Settings</h1>
              <div className="rounded-2xl border bg-card p-5 space-y-4">
                <h2 className="font-bold font-display">Company Profile</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { l: "Company name", v: PLANNER.name },
                    { l: "Owner name", v: PLANNER.owner },
                    { l: "Email", v: "hello@himalayantrails.in" },
                    { l: "Phone", v: "+91 98765 43210" },
                  ].map((f) => (
                    <div key={f.l}>
                      <label className="text-sm font-semibold block mb-1.5">{f.l}</label>
                      <input defaultValue={f.v} className="w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                  ))}
                </div>
                <button className="h-11 px-5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors">
                  Save changes
                </button>
              </div>
              <div className="rounded-2xl border bg-card p-5 space-y-3">
                <h2 className="font-bold font-display">Notifications</h2>
                {["New booking email", "New booking SMS", "Message notifications", "Weekly performance report"].map((n) => (
                  <div key={n} className="flex items-center justify-between gap-3 py-1">
                    <span className="text-sm">{n}</span>
                    <span className="relative w-10 h-6 rounded-full bg-primary/80">
                      <span className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-white shadow-sm" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile tab bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-t flex">
        {NAV.map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            aria-label={item.label}
            className={`flex-1 py-3 flex flex-col items-center gap-1 text-[10px] font-bold transition-colors ${tab === item.id ? "text-primary" : "text-muted-foreground"}`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default PlannerDashboard;
