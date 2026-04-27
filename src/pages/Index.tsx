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

      {/* PROBLEM ↔ SOLUTION — side-by-side visual contrast */}
      <section className="py-16">
        <div className="container mb-8 text-center max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-muted text-xs font-bold uppercase tracking-wider mb-3">Why Trippinity</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight">
            From DM chaos <span className="text-muted-foreground">→</span> <span className="text-primary">to one tap.</span>
          </h2>
        </div>

        <div className="container grid md:grid-cols-2 gap-5 lg:gap-6 items-stretch">
          {/* LEFT — messy DM UI */}
          <div className="relative rounded-3xl border border-destructive/20 bg-gradient-to-br from-destructive/5 via-background to-background p-5 sm:p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-destructive/10 text-destructive text-[10px] font-bold uppercase tracking-wider">
                <MessageSquareX className="w-3 h-3" /> Before
              </span>
              <span className="text-xs text-muted-foreground">Instagram DMs</span>
            </div>

            {/* DM phone mock */}
            <div className="rounded-2xl bg-card border shadow-card overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/40">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-destructive to-secondary" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold truncate">@trips_byrandomguy</p>
                  <p className="text-[10px] text-destructive font-semibold">last seen 3 days ago</p>
                </div>
                <AlertTriangle className="w-4 h-4 text-destructive" />
              </div>
              <div className="p-4 space-y-2 bg-gradient-to-b from-background to-muted/30 min-h-[260px]">
                <div className="max-w-[80%] ml-auto p-3 rounded-2xl rounded-br-sm text-sm bg-primary/15">
                  Hi, is the Manali trip available in April?
                </div>
                <p className="text-[10px] text-right text-muted-foreground">2:14 PM · Seen</p>
                <div className="max-w-[80%] ml-auto p-3 rounded-2xl rounded-br-sm text-sm bg-primary/15">
                  Hello? Price for 4 ppl?
                </div>
                <p className="text-[10px] text-right text-destructive font-semibold">Yesterday · No reply</p>
                <div className="max-w-[80%] ml-auto p-3 rounded-2xl rounded-br-sm text-sm bg-primary/15">
                  Anyone there?? 😩
                </div>
                <p className="text-[10px] text-right text-destructive font-semibold">Today · Delivered</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {["No price shared", "No trust signals", "Slow replies", "Scam risk"].map((t) => (
                <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-destructive/10 text-destructive font-semibold">
                  ✕ {t}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT — clean trip UI */}
          <div className="relative rounded-3xl border border-success/30 bg-gradient-to-br from-success/5 via-primary/5 to-background p-5 sm:p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/15 text-success text-[10px] font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-3 h-3" /> After
              </span>
              <span className="text-xs text-muted-foreground">Trippinity</span>
            </div>

            {/* clean trip card stack */}
            <div className="space-y-3">
              <div className="rounded-2xl border bg-card shadow-card overflow-hidden">
                <div className="relative aspect-[16/8]">
                  <img src={mockTrips[0].image} alt="Trip preview" className="w-full h-full object-cover" loading="lazy" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-secondary text-secondary-foreground text-[10px] font-bold inline-flex items-center gap-1">
                    <Flame className="w-3 h-3" /> Popular
                  </span>
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-success text-success-foreground text-[10px] font-bold inline-flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Verified
                  </span>
                </div>
                <div className="p-3 flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-bold truncate">Magical Manali · 4N/5D</p>
                    <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <Star className="w-3 h-3 fill-secondary stroke-secondary" /> 4.8 · 47 booked this month
                    </p>
                  </div>
                  <span className="text-base font-extrabold text-primary shrink-0">₹12,999</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border bg-card p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1">Pay 50% now</p>
                  <p className="text-lg font-extrabold">₹6,500</p>
                  <p className="text-[10px] text-success font-semibold mt-0.5">✓ Instant confirm</p>
                </div>
                <div className="rounded-2xl border bg-card p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-accent mb-1">Sold by</p>
                  <p className="text-xs font-bold flex items-center gap-1 truncate">
                    🏔️ Himalayan Trails <ShieldCheck className="w-3 h-3 text-accent shrink-0" />
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">1,200+ travelers hosted</p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {["Transparent price", "Verified planner", "Compare options", "Instant booking"].map((t) => (
                <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-success/15 text-success font-semibold">
                  ✓ {t}
                </span>
              ))}
            </div>
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

      {/* TRIP HUB — full-width premium teaser */}
      <section className="relative my-16 overflow-hidden">
        <div className="relative w-full min-h-[460px] bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground overflow-hidden">
          {/* decorative blurred UI background */}
          <div aria-hidden className="absolute inset-0 grid grid-cols-3 gap-4 p-8 opacity-20 pointer-events-none" style={{ filter: "blur(8px)" }}>
            {/* travelers list mock */}
            <div className="space-y-2">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-primary-foreground/15">
                  <div className="w-9 h-9 rounded-full bg-primary-foreground/40" />
                  <div className="flex-1">
                    <div className="h-2 w-20 bg-primary-foreground/50 rounded mb-1" />
                    <div className="h-1.5 w-12 bg-primary-foreground/30 rounded" />
                  </div>
                </div>
              ))}
            </div>
            {/* chat mock */}
            <div className="space-y-2">
              {[0,1,0,1,0].map((side, i) => (
                <div key={i} className={`flex ${side ? "justify-start" : "justify-end"}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl ${side ? "bg-primary-foreground/15" : "bg-secondary/40"}`}>
                    <div className="h-2 w-24 bg-primary-foreground/50 rounded mb-1" />
                    <div className="h-2 w-16 bg-primary-foreground/30 rounded" />
                  </div>
                </div>
              ))}
            </div>
            {/* documents mock */}
            <div className="space-y-2">
              {["Itinerary","Hotel voucher","Flight ticket","Insurance","Group rules"].map(d => (
                <div key={d} className="flex items-center gap-2 p-2.5 rounded-xl bg-primary-foreground/15">
                  <div className="w-8 h-10 rounded bg-primary-foreground/40" />
                  <div className="flex-1">
                    <div className="h-2 w-24 bg-primary-foreground/50 rounded mb-1" />
                    <div className="h-1.5 w-10 bg-primary-foreground/30 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* dark wash for legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-transparent" />

          <div className="relative container py-16 md:py-20 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Trip Hub
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold font-display leading-[1.05]">
              Meet your travel group<br />before the trip.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-primary-foreground/85 max-w-lg">
              Group chat with co-travelers. Direct line to your planner. Tickets, vouchers and itineraries — all in one private space.
            </p>
            <div className="flex flex-wrap gap-2 mt-5">
              {[
                { icon: Users, label: "Travelers list" },
                { icon: MessagesSquare, label: "Group chat" },
                { icon: ShieldCheck, label: "Planner DMs" },
              ].map(p => (
                <span key={p.label} className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-primary-foreground/15 backdrop-blur border border-primary-foreground/25 font-medium">
                  <p.icon className="w-3.5 h-3.5" /> {p.label}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-7">
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-secondary text-secondary-foreground font-bold hover:bg-secondary/90 transition-colors shadow-elevated"
              >
                <Lock className="w-4 h-4" /> Unlock after booking
              </Link>
              <Link
                to="/trip-hub"
                className="inline-flex items-center gap-2 h-12 px-5 rounded-xl bg-primary-foreground/10 backdrop-blur border border-primary-foreground/30 font-medium hover:bg-primary-foreground/20 transition-colors"
              >
                Preview <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* VERIFIED PLANNERS — trust strip */}
      <section className="py-12 overflow-hidden">
        <div className="container mb-6">
          <span className="inline-block px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-bold uppercase tracking-wider mb-2">Trusted partners</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display">Trusted by top travel planners</h2>
          <p className="text-sm text-muted-foreground">Hand-picked, KYC-verified companies behind every trip.</p>
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide px-[max(1rem,calc((100vw-1280px)/2))] pb-4 snap-x">
          {Object.values(companies).map((c) => (
            <Link
              key={c.id}
              to={`/planner/${c.id}`}
              className="snap-start shrink-0 w-[240px] rounded-2xl border bg-card p-5 hover:shadow-card hover-lift transition-all group"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/15 flex items-center justify-center text-3xl mb-3 group-hover:scale-110 transition-transform">
                {c.logo}
              </div>
              <p className="font-bold text-sm flex items-center gap-1">
                {c.name}
                {c.verified && <ShieldCheck className="w-3.5 h-3.5 text-accent" />}
              </p>
              <p className="text-[11px] text-muted-foreground line-clamp-2 mt-1 mb-3">{c.about}</p>
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
