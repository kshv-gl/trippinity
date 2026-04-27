import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ShieldCheck,
  Sparkles,
  Map,
  MessagesSquare,
  MessageSquareX,
  AlertTriangle,
  CreditCard,
  Lock,
  ArrowRight,
  Quote,
  Star,
  Users,
  Flame,
  CheckCircle2,
  Store,
  Compass,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import Hero from "@/components/Hero";
import TripCard from "@/components/TripCard";
import Footer from "@/components/Footer";
import AIChatWidget from "@/components/AIChatWidget";
import { mockTrips, destinations, companies } from "@/data/mockTrips";
import { reviews } from "@/data/reviews";

const Index = () => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return mockTrips;
    const q = query.toLowerCase();
    return mockTrips.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.location.toLowerCase().includes(q) ||
        t.destination.toLowerCase().includes(q)
    );
  }, [query]);

  const popular = mockTrips.filter((t) => t.popular);
  const featuredCompanies = Object.values(companies).slice(0, 4);
  const featuredReviews = reviews.slice(0, 3);

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navbar />
      <Hero />

      {/* Floating search */}
      <section className="container -mt-10 relative z-20">
        <div className="bg-card rounded-2xl shadow-card p-3 sm:p-4 flex items-center gap-2 border">
          <Search className="w-5 h-5 text-muted-foreground ml-2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Where do you want to go? Try 'Goa' or 'Manali'..."
            className="flex-1 h-12 bg-transparent text-base focus:outline-none"
          />
          <Link
            to="/explore"
            className="hidden sm:inline-flex h-12 px-6 rounded-xl bg-primary text-primary-foreground font-semibold items-center hover:bg-primary/90 transition-colors"
          >
            Search
          </Link>
        </div>
      </section>

      {/* Gen Z hook strip */}
      <section className="container pt-10">
        <div className="rounded-2xl bg-gradient-to-r from-secondary/20 via-primary/10 to-accent/15 border border-secondary/30 p-5 sm:p-6 flex items-center gap-4 animate-fade-in">
          <div className="w-12 h-12 rounded-2xl bg-secondary text-secondary-foreground flex items-center justify-center shrink-0 shadow-soft">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <p className="text-base sm:text-xl font-extrabold font-display leading-tight">
              "Group trips are the ultimate way to <span className="text-primary">get socialise</span>." 🚌✨
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Meet your travel tribe before you even land. Same vibe, same dates, zero awkward.
            </p>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="container py-10 grid sm:grid-cols-3 gap-4">
        {[
          { icon: ShieldCheck, title: "Verified planners", desc: "Every company is vetted & rated" },
          { icon: Store, title: "Real marketplace", desc: "Multiple planners, your choice" },
          { icon: MessagesSquare, title: "Trip Hub after booking", desc: "Chat with planner & travelers" },
        ].map((item) => (
          <div key={item.title} className="flex items-start gap-3 p-4 rounded-2xl bg-muted/40">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <item.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-sm">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* VISUAL PROBLEM — Instagram DM chaos */}
      <section className="py-12 overflow-hidden">
        <div className="container mb-6 flex items-end justify-between gap-4">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-bold uppercase tracking-wider mb-2">Before Trippinity</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display">DM chaos. Zero clarity.</h2>
          </div>
          <span className="hidden sm:inline text-xs text-muted-foreground">← swipe</span>
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide px-[max(1rem,calc((100vw-1280px)/2))] pb-4 snap-x snap-mandatory">
          {[
            { from: "you", text: "Hi, is the Manali trip available in April?", time: "2:14 PM", read: true },
            { from: "them", text: "Seen ✓✓", time: "2 days ago", muted: true },
            { from: "you", text: "Hello? What's the price for 4 ppl?", time: "Yesterday", read: false },
            { from: "you", text: "Anyone there??", time: "Today", read: false },
            { from: "them", text: "Bhai DM kar do, price discuss karenge 🙏", time: "Just now", muted: true },
          ].map((m, i) => (
            <div key={i} className="snap-start shrink-0 w-[260px] sm:w-[300px] rounded-2xl border bg-card shadow-soft overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/40">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-destructive to-secondary" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold truncate">@trips_byrandomguy</p>
                  <p className="text-[10px] text-muted-foreground">last seen 3 days ago</p>
                </div>
                <MessageSquareX className="w-4 h-4 text-destructive" />
              </div>
              <div className="p-4 min-h-[140px] bg-gradient-to-b from-background to-muted/30">
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${m.from === "you" ? "ml-auto bg-primary/15 rounded-br-sm" : "bg-muted rounded-bl-sm"}`}>
                  {m.text}
                </div>
                <p className={`text-[10px] mt-1.5 ${m.from === "you" ? "text-right" : ""} ${m.muted ? "text-destructive font-semibold" : "text-muted-foreground"}`}>
                  {m.time} {m.from === "you" && (m.read ? "· Seen" : "· Delivered")}
                </p>
              </div>
            </div>
          ))}
          <div className="snap-start shrink-0 w-[200px] rounded-2xl border-2 border-dashed border-destructive/40 bg-destructive/5 flex flex-col items-center justify-center p-6 text-center">
            <AlertTriangle className="w-8 h-8 text-destructive mb-2" />
            <p className="text-sm font-bold text-destructive">No price.<br />No trust.<br />No reply.</p>
          </div>
        </div>
      </section>

      {/* VISUAL SOLUTION — clean marketplace UI */}
      <section className="py-14 bg-gradient-to-b from-primary/5 via-accent/5 to-transparent overflow-hidden">
        <div className="container mb-6 flex items-end justify-between gap-4">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-success/15 text-success text-xs font-bold uppercase tracking-wider mb-2">With Trippinity</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display">Clear. Compared. Confirmed.</h2>
          </div>
          <span className="hidden sm:inline text-xs text-muted-foreground">← swipe</span>
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide px-[max(1rem,calc((100vw-1280px)/2))] pb-4 snap-x snap-mandatory">
          {/* Card 1 — clean trip card */}
          <div className="snap-start shrink-0 w-[280px] rounded-2xl border bg-card shadow-card overflow-hidden">
            <div className="relative aspect-[4/3]">
              <img src={mockTrips[0].image} alt="Trip preview" className="w-full h-full object-cover" loading="lazy" />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-secondary text-secondary-foreground text-[10px] font-bold inline-flex items-center gap-1">
                <Flame className="w-3 h-3" /> Popular
              </span>
              <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-primary text-primary-foreground text-xs font-bold">₹12,999</span>
            </div>
            <div className="p-3">
              <p className="text-sm font-bold truncate">Magical Manali · 4N/5D</p>
              <p className="text-[11px] text-muted-foreground flex items-center gap-1"><Star className="w-3 h-3 fill-secondary stroke-secondary" /> 4.8 · 47 booked</p>
            </div>
          </div>
          {/* Card 2 — verified badge */}
          <div className="snap-start shrink-0 w-[260px] rounded-2xl border bg-card shadow-card p-5 flex flex-col">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-primary text-primary-foreground flex items-center justify-center mb-3 shadow-soft">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <p className="text-sm font-bold">Verified planner</p>
            <p className="text-xs text-muted-foreground mt-1 mb-3">KYC, GST & past traveler reviews — all checked.</p>
            <div className="mt-auto flex items-center gap-2 pt-3 border-t">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span className="text-[11px] font-semibold">Himalayan Trails Co.</span>
            </div>
          </div>
          {/* Card 3 — pricing breakdown */}
          <div className="snap-start shrink-0 w-[280px] rounded-2xl border bg-card shadow-card p-5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-2">Transparent pricing</p>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Trip total</span><span className="font-semibold">₹12,999</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Stays + meals</span><span>Included</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Transport</span><span>Included</span></div>
              <div className="flex justify-between text-success"><span>No hidden fees</span><CheckCircle2 className="w-4 h-4" /></div>
            </div>
            <div className="mt-3 pt-3 border-t flex items-baseline justify-between">
              <span className="text-xs font-semibold">Pay now (50%)</span>
              <span className="text-lg font-extrabold text-primary">₹6,500</span>
            </div>
          </div>
          {/* Card 4 — comparison */}
          <div className="snap-start shrink-0 w-[280px] rounded-2xl border bg-card shadow-card p-5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-accent mb-2">Compare planners</p>
            {[
              { name: "Himalayan Trails", rating: 4.8, price: "₹12.9k" },
              { name: "Mountain Mavericks", rating: 4.6, price: "₹13.5k" },
              { name: "Peak Co.", rating: 4.4, price: "₹11.8k" },
            ].map((p) => (
              <div key={p.name} className="flex items-center justify-between py-2 border-b last:border-0 text-xs">
                <span className="font-semibold truncate">{p.name}</span>
                <span className="flex items-center gap-2">
                  <span className="flex items-center gap-0.5 text-muted-foreground"><Star className="w-3 h-3 fill-secondary stroke-secondary" />{p.rating}</span>
                  <span className="font-bold text-primary">{p.price}</span>
                </span>
              </div>
            ))}
          </div>
          {/* Card 5 — instant confirmation */}
          <div className="snap-start shrink-0 w-[260px] rounded-2xl bg-gradient-to-br from-success/15 to-success/5 border border-success/30 p-5 flex flex-col">
            <div className="w-14 h-14 rounded-full bg-success/20 text-success flex items-center justify-center mb-3">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <p className="text-sm font-bold">Booking confirmed ✅</p>
            <p className="text-xs text-muted-foreground mt-1">Pay 50%. Get your Trip Hub. Done in 60 seconds.</p>
          </div>
        </div>
      </section>

      {/* MARKETPLACE CLARITY — featured planners */}
      <section className="container py-12">
        <div className="flex items-end justify-between mb-5">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-bold uppercase tracking-wider mb-2">Marketplace</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display">Trips sold by real, verified planners</h2>
            <p className="text-sm text-muted-foreground">A real marketplace — not one company pretending to do everything.</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredCompanies.map((c) => (
            <Link
              key={c.id}
              to={`/planner/${c.id}`}
              className="p-5 rounded-2xl border bg-card hover:shadow-card transition-shadow group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 flex items-center justify-center text-2xl">
                  {c.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Sold by</p>
                  <p className="font-bold text-sm flex items-center gap-1 truncate">
                    {c.name}
                    {c.verified && <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0" />}
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{c.about}</p>
              <div className="flex items-center justify-between text-xs pt-3 border-t">
                <span className="flex items-center gap-1 font-semibold">
                  <Star className="w-3 h-3 fill-secondary stroke-secondary" /> {c.rating}
                </span>
                <span className="text-muted-foreground">{c.trips} trips</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Destinations */}
      <section className="container py-6">
        <div className="flex items-end justify-between mb-5">
          <div>
            <h2 className="text-2xl font-extrabold font-display">Explore by destination</h2>
            <p className="text-sm text-muted-foreground">Hand-picked spots loved by our travelers</p>
          </div>
          <Link to="/destinations" className="text-sm font-medium text-primary hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {destinations.map((d) => (
            <Link
              key={d.name}
              to={`/destinations?to=${d.name}`}
              className="relative aspect-square rounded-2xl overflow-hidden group hover-lift"
            >
              <img src={d.image} alt={d.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 text-white text-xs font-semibold">
                <span className="mr-1">{d.emoji}</span>{d.name}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular trips */}
      <section className="container py-10">
        <div className="flex items-end justify-between mb-5">
          <div>
            <h2 className="text-2xl font-extrabold font-display flex items-center gap-2">
              <Map className="w-6 h-6 text-accent" /> {query ? `Results for "${query}"` : "Popular this season"}
            </h2>
            <p className="text-sm text-muted-foreground">{filtered.length} trips · curated by verified planners</p>
          </div>
          <Link to="/explore" className="text-sm font-medium text-primary hover:underline">See all →</Link>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">No trips found. Try a different search.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(query ? filtered : popular).map((trip, i) => (
              <div key={trip.id} style={{ animationDelay: `${i * 60}ms` }}>
                <TripCard trip={trip} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* TRIP HUB TEASER */}
      <section className="container py-12">
        <div className="rounded-3xl border bg-gradient-to-br from-primary/8 to-accent/8 p-8 sm:p-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-secondary/20 text-secondary-foreground text-xs font-bold uppercase tracking-wider mb-3">Trip Hub</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight">
              Your private trip community,<br />
              <span className="text-primary">unlocked the moment you book.</span>
            </h2>
            <p className="text-muted-foreground mt-3 text-sm sm:text-base">
              Group chat with co-travelers. Direct line to your planner. Tickets, vouchers and itineraries — all in one place.
            </p>
            <div className="flex flex-wrap gap-2 mt-5">
              {["Travelers list", "Group chat", "Planner DMs", "Trip docs"].map((t) => (
                <span key={t} className="text-xs px-3 py-1.5 rounded-full bg-background border font-medium">{t}</span>
              ))}
            </div>
            <Link
              to="/trip-hub"
              className="inline-flex h-11 px-5 mt-6 rounded-xl bg-primary text-primary-foreground font-semibold items-center gap-2 hover:bg-primary/90 transition-colors shadow-elevated"
            >
              Preview Trip Hub <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="relative rounded-2xl overflow-hidden border bg-card shadow-card aspect-[4/3] md:aspect-auto md:h-72">
            <div aria-hidden className="absolute inset-0 p-5 space-y-3" style={{ filter: "blur(5px)", opacity: 0.55 }}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/30" />
                <div className="h-2.5 w-24 bg-foreground/30 rounded" />
              </div>
              {[1, 2, 3].map((i) => (
                <div key={i} className={`flex ${i % 2 ? "justify-start" : "justify-end"}`}>
                  <div className={`max-w-[70%] p-2.5 rounded-xl ${i % 2 ? "bg-muted" : "bg-primary/40"}`}>
                    <div className="h-2 w-32 bg-foreground/30 rounded mb-1" />
                    <div className="h-2 w-20 bg-foreground/20 rounded" />
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute inset-0 bg-background/30 backdrop-blur-[1px] flex items-center justify-center">
              <div className="bg-card/95 border rounded-xl shadow-elevated p-5 text-center max-w-xs">
                <div className="w-12 h-12 rounded-full bg-muted mx-auto flex items-center justify-center mb-2">
                  <Lock className="w-5 h-5 text-muted-foreground" />
                </div>
                <p className="font-bold text-sm">🔒 Unlock your trip community after booking</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS PREVIEW */}
      <section className="container py-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-secondary/20 text-secondary-foreground text-xs font-bold uppercase tracking-wider mb-2">Loved by travelers</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display">Real stories, not stock reviews.</h2>
          </div>
          <Link to="/testimonials" className="text-sm font-medium text-primary hover:underline hidden sm:inline">Read all →</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {featuredReviews.map((r) => (
            <article key={r.id} className="p-5 rounded-2xl border bg-card hover:shadow-card transition-shadow">
              <Quote className="w-6 h-6 text-primary/30 mb-2" />
              <p className="text-sm text-foreground/85 leading-relaxed line-clamp-4">"{r.text}"</p>
              <div className="flex items-center gap-3 mt-4 pt-4 border-t">
                <img src={r.avatar} alt={r.user} className="w-10 h-10 rounded-full object-cover" loading="lazy" />
                <div className="flex-1">
                  <p className="font-semibold text-sm">{r.user}</p>
                  <p className="text-xs text-muted-foreground">{r.tripTitle}</p>
                </div>
                <span className="flex items-center gap-1 text-xs font-bold">
                  <Star className="w-3 h-3 fill-secondary stroke-secondary" />{r.rating}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="container py-16">
        <div className="rounded-3xl bg-gradient-to-br from-primary to-accent text-primary-foreground p-10 sm:p-14 text-center">
          <Sparkles className="w-10 h-10 mx-auto opacity-80 mb-3" />
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight">
            Your next trip is one click away.
          </h2>
          <p className="opacity-90 mt-3 max-w-xl mx-auto">
            Discover curated trips from verified planners. Book in seconds. Make memories with your new travel tribe.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <Link
              to="/explore"
              className="inline-flex h-12 px-6 rounded-xl bg-white text-primary font-semibold items-center gap-2 hover:scale-105 transition-transform shadow-elevated"
            >
              Explore Trips <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/destinations"
              className="inline-flex h-12 px-6 rounded-xl bg-white/15 backdrop-blur border border-white/30 text-white font-medium hover:bg-white/25 transition-colors"
            >
              Browse destinations
            </Link>
          </div>
          <p className="text-xs opacity-80 mt-5 flex items-center justify-center gap-4 flex-wrap">
            <span className="inline-flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Trusted by 500+ travelers</span>
            <span className="inline-flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> 100% verified planners</span>
            <span className="inline-flex items-center gap-1"><Users className="w-3.5 h-3.5" /> 4.8 ★ average rating</span>
          </p>
        </div>
      </section>

      <Footer />
      <BottomNav />
      <AIChatWidget />
    </div>
  );
};

export default Index;
