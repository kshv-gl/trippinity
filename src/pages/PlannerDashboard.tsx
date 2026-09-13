import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard, Map, Users, MessageSquare, Settings,
  TrendingUp, Calendar, IndianRupee, Star, Bell, LogOut,
  ChevronRight, Eye, CheckCircle2, Clock, XCircle, Flame,
  Download, Phone, ShieldCheck, Plus, BarChart2, Zap,
  MapPin, ArrowUpRight, ArrowDownRight, Target, Award,
  RefreshCw, Send, FileText, AlertCircle,
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
  thisMonthRevenue: 386000,
  lastMonthRevenue: 327000,
  thisMonthBookings: 18,
  lastMonthBookings: 14,
};

const BOOKINGS = [
  { id: "B001", traveler: "Aanya Kapoor", trip: "Magical Manali & Solang Valley", date: "Apr 15, 2026", amount: 12999, status: "confirmed", phone: "+91 98765 43210", avatar: "AK" },
  { id: "B002", traveler: "Rohan Verma", trip: "Leh Ladakh Bike Expedition", date: "Jul 1, 2026", amount: 25999, status: "confirmed", phone: "+91 87654 32109", avatar: "RV" },
  { id: "B003", traveler: "Ishita Roy", trip: "Magical Manali & Solang Valley", date: "Apr 15, 2026", amount: 12999, status: "pending", phone: "+91 76543 21098", avatar: "IR" },
  { id: "B004", traveler: "Karan Singh", trip: "Leh Ladakh Bike Expedition", date: "Jul 1, 2026", amount: 25999, status: "confirmed", phone: "+91 65432 10987", avatar: "KS" },
  { id: "B005", traveler: "Priya Sharma", trip: "Magical Manali & Solang Valley", date: "Apr 15, 2026", amount: 12999, status: "cancelled", phone: "+91 54321 09876", avatar: "PS" },
];

const MESSAGES = [
  { from: "Aanya Kapoor", msg: "Hi! Is the trip still on for April?", time: "2h ago", unread: true, avatar: "AK" },
  { from: "Rohan Verma", msg: "Can we get a discount for 3 people?", time: "5h ago", unread: true, avatar: "RV" },
  { from: "Karan Singh", msg: "What is the assembly point exactly?", time: "Yesterday", unread: false, avatar: "KS" },
  { from: "Priya Sharma", msg: "I need to cancel my booking. Please help.", time: "2 days ago", unread: false, avatar: "PS" },
];

const TIMELINE = [
  { event: "New booking from Aanya Kapoor", trip: "Manali", time: "2h ago", type: "booking" },
  { event: "Review posted, 5 stars", trip: "Ladakh", time: "5h ago", type: "review" },
  { event: "Message from Rohan Verma", trip: "Ladakh", time: "6h ago", type: "message" },
  { event: "Trip published, Coorg Retreat", trip: "Coorg", time: "Yesterday", type: "trip" },
  { event: "Payment released for Apr batch", trip: "Manali", time: "2 days ago", type: "payment" },
];

const MONTHS = [
  { m: "Nov", v: 214000 },
  { m: "Dec", v: 298000 },
  { m: "Jan", v: 261000 },
  { m: "Feb", v: 305000 },
  { m: "Mar", v: 327000 },
  { m: "Apr", v: 386000 },
];

type Tab = "overview" | "trips" | "bookings" | "messages" | "analytics" | "settings";

const NAV: { id: Tab; label: string; icon: typeof Map; badge?: number }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "trips", label: "My Trips", icon: Map },
  { id: "bookings", label: "Bookings", icon: Users },
  { id: "messages", label: "Messages", icon: MessageSquare, badge: 2 },
  { id: "analytics", label: "Analytics", icon: BarChart2 },
  { id: "settings", label: "Settings", icon: Settings },
];

const PlannerDashboard = () => {
  const [tab, setTab] = useState<Tab>("overview");
  const [bookingFilter, setBookingFilter] = useState("All");
  const plannerTrips = mockTrips.filter((t) => t.companyId === "himalayan-trails");

  const revenueGrowth = (((PLANNER.thisMonthRevenue - PLANNER.lastMonthRevenue) / PLANNER.lastMonthRevenue) * 100).toFixed(1);
  const bookingGrowth = (((PLANNER.thisMonthBookings - PLANNER.lastMonthBookings) / PLANNER.lastMonthBookings) * 100).toFixed(1);

  const statusBadge = (s: string) => {
    if (s === "confirmed") return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-green-50 text-green-700 text-[10px] font-bold border border-green-200">
        <CheckCircle2 className="w-3 h-3" /> Confirmed
      </span>
    );
    if (s === "pending") return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200">
        <Clock className="w-3 h-3" /> Pending
      </span>
    );
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-50 text-red-600 text-[10px] font-bold border border-red-200">
        <XCircle className="w-3 h-3" /> Cancelled
      </span>
    );
  };

  const timelineIcon = (type: string) => {
    if (type === "booking") return <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0"><CheckCircle2 className="w-4 h-4 text-green-600" /></div>;
    if (type === "review") return <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0"><Star className="w-4 h-4 text-amber-500" /></div>;
    if (type === "message") return <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0"><MessageSquare className="w-4 h-4 text-blue-600" /></div>;
    if (type === "trip") return <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0"><Map className="w-4 h-4 text-primary" /></div>;
    return <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0"><IndianRupee className="w-4 h-4 text-purple-600" /></div>;
  };

  const filteredBookings = bookingFilter === "All"
    ? BOOKINGS
    : BOOKINGS.filter((b) => b.status.toLowerCase() === bookingFilter.toLowerCase());

  const maxMonth = Math.max(...MONTHS.map((m) => m.v));

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
            <button className="hidden sm:inline-flex h-9 px-3 rounded-xl border text-xs font-semibold items-center gap-1.5 hover:bg-muted transition-colors">
              <RefreshCw className="w-3.5 h-3.5" /> Synced just now
            </button>
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
          <div className="rounded-2xl border bg-card p-4 text-center mb-3 overflow-hidden">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-primary to-amber-500 text-white font-extrabold flex items-center justify-center mb-2 text-lg">{PLANNER.avatar}</div>
            <p className="text-sm font-bold font-display truncate">{PLANNER.name}</p>
            <p className="text-xs text-muted-foreground truncate">{PLANNER.owner}</p>
            {PLANNER.verified && (
              <span className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-green-50 text-green-700 text-[10px] font-bold">
                <ShieldCheck className="w-3 h-3" /> Verified planner
              </span>
            )}
            <div className="mt-3 pt-3 border-t grid grid-cols-2 gap-2 text-center">
              <div>
                <p className="text-sm font-extrabold">{PLANNER.rating}</p>
                <p className="text-[10px] text-muted-foreground">Rating</p>
              </div>
              <div>
                <p className="text-sm font-extrabold">{PLANNER.tripsListed}</p>
                <p className="text-[10px] text-muted-foreground">Trips live</p>
              </div>
            </div>
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
              {/* Hero strip */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1b1b1f] via-[#26201c] to-[#3a2418] text-white p-6 sm:p-8">
                <div className="absolute -top-16 -right-10 w-56 h-56 rounded-full bg-primary/30 blur-3xl" />
                <div className="relative">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 text-[11px] font-bold">
                    <Zap className="w-3 h-3 text-primary" /> Live on Trippinity
                  </span>
                  <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold font-display">
                    Good morning, {PLANNER.owner.split(" ")[0]}
                  </h1>
                  <p className="text-sm text-white/70 mt-1 max-w-md">
                    You earned ₹{(PLANNER.thisMonthRevenue / 1000).toFixed(0)}K this month across {PLANNER.thisMonthBookings} bookings.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-5">
                    <button className="h-11 px-5 rounded-xl bg-primary text-white text-sm font-bold inline-flex items-center gap-2 hover:bg-primary/90 transition-colors">
                      <Plus className="w-4 h-4" /> Add new trip
                    </button>
                    <button onClick={() => setTab("bookings")} className="h-11 px-5 rounded-xl bg-white/10 text-white text-sm font-bold inline-flex items-center gap-2 hover:bg-white/20 transition-colors">
                      <Users className="w-4 h-4" /> View bookings
                    </button>
                  </div>
                </div>
              </div>

              {/* KPI grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { icon: IndianRupee, label: "Total revenue", value: `₹${(PLANNER.totalRevenue / 100000).toFixed(1)}L`, sub: `${revenueGrowth}% vs last month`, up: true, color: "text-green-600", bg: "bg-green-50" },
                  { icon: Users, label: "Total bookings", value: PLANNER.totalBookings, sub: `${bookingGrowth}% vs last month`, up: true, color: "text-blue-600", bg: "bg-blue-50" },
                  { icon: Star, label: "Avg rating", value: `${PLANNER.rating}`, sub: "From 164 reviews", up: true, color: "text-amber-600", bg: "bg-amber-50" },
                  { icon: TrendingUp, label: "Response rate", value: `${PLANNER.responseRate}%`, sub: "Top 5% of planners", up: true, color: "text-primary", bg: "bg-primary/10" },
                ].map((k) => (
                  <div key={k.label} className="rounded-2xl border bg-card p-4 hover:shadow-soft transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className={`w-9 h-9 rounded-xl ${k.bg} flex items-center justify-center mb-3`}>
                        <k.icon className={`w-4 h-4 ${k.color}`} />
                      </div>
                      {k.up
                        ? <ArrowUpRight className="w-4 h-4 text-green-600" />
                        : <ArrowDownRight className="w-4 h-4 text-destructive" />}
                    </div>
                    <p className="text-xl font-extrabold font-display">{k.value}</p>
                    <p className="text-xs text-muted-foreground">{k.label}</p>
                    <p className={`text-[11px] font-semibold mt-1 ${k.color}`}>{k.sub}</p>
                  </div>
                ))}
              </div>

              {/* Action needed */}
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-amber-900">1 booking is waiting for your confirmation</p>
                  <p className="text-xs text-amber-800/80">Ishita Roy booked Magical Manali. Confirm within 24 hours to keep your response score.</p>
                </div>
                <button onClick={() => setTab("bookings")} className="shrink-0 h-9 px-3 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-700 transition-colors">
                  Review
                </button>
              </div>

              <div className="grid lg:grid-cols-3 gap-4">
                {/* Recent bookings */}
                <div className="lg:col-span-2 rounded-2xl border bg-card p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold font-display">Recent bookings</h2>
                    <button onClick={() => setTab("bookings")} className="text-xs text-primary font-semibold hover:underline flex items-center gap-1">View all <ChevronRight className="w-3 h-3" /></button>
                  </div>
                  <div className="space-y-2">
                    {BOOKINGS.slice(0, 4).map((b) => (
                      <div key={b.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/40">
                        <span className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0">{b.avatar}</span>
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

                {/* Activity timeline */}
                <div className="rounded-2xl border bg-card p-5">
                  <h2 className="font-bold font-display mb-4">Activity</h2>
                  <div className="space-y-4">
                    {TIMELINE.map((t) => (
                      <div key={t.event} className="flex gap-3">
                        {timelineIcon(t.type)}
                        <div className="min-w-0">
                          <p className="text-sm font-semibold leading-snug break-words">{t.event}</p>
                          <p className="text-[11px] text-muted-foreground">{t.trip} · {t.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Active trips */}
              <div className="rounded-2xl border bg-card p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold font-display">Your active trips</h2>
                  <button onClick={() => setTab("trips")} className="text-xs text-primary font-semibold hover:underline flex items-center gap-1">Manage <ChevronRight className="w-3 h-3" /></button>
                </div>
                <div className="space-y-3">
                  {plannerTrips.slice(0, 2).map((t) => {
                    const total = t.totalSeats ?? 20;
                    const filled = t.currentBatchBooked ?? t.booked;
                    const pct = Math.min(100, (filled / total) * 100);
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
                            <span className="text-[11px] text-muted-foreground">{filled}/{total} seats</span>
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
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <h1 className="text-2xl font-extrabold font-display">My trips</h1>
                  <p className="text-sm text-muted-foreground">{plannerTrips.length} trips live on the marketplace</p>
                </div>
                <button className="h-11 px-5 rounded-xl bg-primary text-white text-sm font-bold inline-flex items-center gap-2 hover:bg-primary/90 transition-colors">
                  <Plus className="w-4 h-4" /> Add trip
                </button>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {plannerTrips.map((t) => {
                  const total = t.totalSeats ?? 20;
                  const filled = t.currentBatchBooked ?? t.booked;
                  const left = Math.max(0, total - filled);
                  const pct = Math.min(100, (filled / total) * 100);
                  return (
                    <div key={t.id} className="rounded-2xl border bg-card overflow-hidden hover:shadow-soft transition-shadow">
                      <div className="relative h-32">
                        <img src={t.image} alt={t.title} className="w-full h-full object-cover" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                        <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-green-500 text-white text-[10px] font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-white" /> Live
                        </span>
                        {left <= Math.ceil(total * 0.3) && (
                          <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-destructive text-white text-[10px] font-bold">
                            <Flame className="w-3 h-3" /> Filling fast
                          </span>
                        )}
                        <div className="absolute bottom-3 left-3 right-3">
                          <p className="text-sm font-bold text-white truncate">{t.title}</p>
                          <span className="text-xs text-white/80 inline-flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {t.location} · ₹{t.price.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1 min-w-0 truncate"><Calendar className="w-3.5 h-3.5 shrink-0" /> {t.dates}</span>
                          <span className="inline-flex items-center gap-1 shrink-0"><Star className="w-3.5 h-3.5 fill-secondary stroke-secondary" /> {t.rating}</span>
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-[11px] font-semibold mb-1">
                            <span>{filled} booked of {total}</span>
                            <span className={left <= Math.ceil(total * 0.3) ? "text-destructive" : "text-muted-foreground"}>{left} seats left</span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                            <div className={`h-full rounded-full ${pct > 80 ? "bg-destructive" : "bg-primary"}`} style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Link to={`/trip/${t.id}`} className="flex-1 h-9 rounded-xl border text-xs font-semibold inline-flex items-center justify-center gap-1 hover:bg-muted transition-colors">
                            <Eye className="w-3.5 h-3.5" /> Preview
                          </Link>
                          <button onClick={() => setTab("analytics")} className="flex-1 h-9 rounded-xl border text-xs font-semibold inline-flex items-center justify-center gap-1 hover:bg-muted transition-colors">
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
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <h1 className="text-2xl font-extrabold font-display">All bookings</h1>
                  <p className="text-sm text-muted-foreground">{filteredBookings.length} of {BOOKINGS.length} shown</p>
                </div>
                <button className="h-11 px-4 rounded-xl border text-sm font-semibold inline-flex items-center gap-2 hover:bg-muted transition-colors">
                  <Download className="w-4 h-4" /> Export CSV
                </button>
              </div>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                {["All", "Confirmed", "Pending", "Cancelled"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setBookingFilter(f)}
                    className={`px-3 h-8 rounded-xl text-xs font-semibold shrink-0 transition-colors ${bookingFilter === f ? "bg-primary text-white" : "bg-muted hover:bg-muted/70"}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <div className="rounded-2xl border bg-card overflow-hidden">
                {filteredBookings.length === 0 && (
                  <p className="p-8 text-center text-sm text-muted-foreground">No {bookingFilter.toLowerCase()} bookings yet.</p>
                )}
                {filteredBookings.map((b, i) => (
                  <div key={b.id} className={`flex items-center gap-3 p-4 hover:bg-muted/30 transition-colors ${i > 0 ? "border-t" : ""}`}>
                    <span className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0">{b.avatar}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold truncate">{b.traveler}</p>
                      <p className="text-xs text-muted-foreground truncate">{b.trip}</p>
                      <p className="text-[11px] text-muted-foreground">{b.id} · {b.date}</p>
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
              <div>
                <h1 className="text-2xl font-extrabold font-display">Messages</h1>
                <p className="text-sm text-muted-foreground">{MESSAGES.filter((m) => m.unread).length} unread · avg reply time 22 min</p>
              </div>
              <div className="rounded-2xl border bg-card overflow-hidden">
                {MESSAGES.map((m, i) => (
                  <div key={m.from} className={`flex items-center gap-3 p-4 hover:bg-muted/30 transition-colors ${i > 0 ? "border-t" : ""} ${m.unread ? "bg-primary/5" : ""}`}>
                    <span className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0">{m.avatar}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold truncate">{m.from}</p>
                        {m.unread && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                        <span className="ml-auto text-[11px] text-muted-foreground shrink-0">{m.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{m.msg}</p>
                    </div>
                    <button aria-label={`Reply to ${m.from}`} className="w-9 h-9 rounded-xl border flex items-center justify-center hover:bg-muted transition-colors shrink-0">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ANALYTICS */}
          {tab === "analytics" && (
            <div className="space-y-5">
              <div>
                <h1 className="text-2xl font-extrabold font-display">Analytics</h1>
                <p className="text-sm text-muted-foreground">How your listings performed over the last 6 months</p>
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { icon: IndianRupee, label: "This month revenue", value: `₹${(PLANNER.thisMonthRevenue / 1000).toFixed(0)}K`, sub: `${revenueGrowth}% growth` },
                  { icon: Target, label: "This month bookings", value: PLANNER.thisMonthBookings, sub: `${bookingGrowth}% growth` },
                  { icon: Award, label: "Repeat travelers", value: "31%", sub: "Above marketplace average" },
                ].map((k) => (
                  <div key={k.label} className="rounded-2xl border bg-card p-4">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                      <k.icon className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-xl font-extrabold font-display">{k.value}</p>
                    <p className="text-xs text-muted-foreground">{k.label}</p>
                    <p className="text-[11px] font-semibold text-green-600 mt-1">{k.sub}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border bg-card p-5">
                <h2 className="font-bold font-display mb-5">Monthly revenue</h2>
                <div className="flex items-end gap-3 h-44">
                  {MONTHS.map((m) => (
                    <div key={m.m} className="flex-1 flex flex-col items-center gap-2 min-w-0">
                      <span className="text-[10px] font-bold text-muted-foreground">₹{(m.v / 1000).toFixed(0)}K</span>
                      <div
                        className="w-full rounded-t-xl bg-gradient-to-t from-primary/60 to-primary"
                        style={{ height: `${(m.v / maxMonth) * 100}%` }}
                      />
                      <span className="text-[11px] font-semibold">{m.m}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border bg-card p-5">
                <h2 className="font-bold font-display mb-4">Trip performance</h2>
                <div className="space-y-3">
                  {plannerTrips.map((t) => {
                    const total = t.totalSeats ?? 20;
                    const filled = t.currentBatchBooked ?? t.booked;
                    const pct = Math.min(100, (filled / total) * 100);
                    return (
                      <div key={t.id} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs gap-2">
                          <span className="font-semibold truncate">{t.title}</span>
                          <span className="text-muted-foreground shrink-0">{pct.toFixed(0)}% full</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* SETTINGS */}
          {tab === "settings" && (
            <div className="space-y-5">
              <h1 className="text-2xl font-extrabold font-display">Settings</h1>
              <div className="rounded-2xl border bg-card p-5 space-y-4">
                <h2 className="font-bold font-display">Company profile</h2>
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
                <h2 className="font-bold font-display">Verification documents</h2>
                {["GST certificate", "PAN card", "Company registration"].map((d) => (
                  <div key={d} className="flex items-center gap-3 p-3 rounded-xl bg-muted/40">
                    <FileText className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm font-semibold flex-1 min-w-0 truncate">{d}</span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-green-700 shrink-0">
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </span>
                  </div>
                ))}
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
            className={`flex-1 py-3 flex flex-col items-center gap-1 text-[9px] font-bold transition-colors ${tab === item.id ? "text-primary" : "text-muted-foreground"}`}
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
