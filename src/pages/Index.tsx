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

      {/* PROBLEM */}
      <section className="container py-12">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="inline-block px-3 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-bold uppercase tracking-wider mb-3">The Problem</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display">Booking trips today is a mess.</h2>
          <p className="text-muted-foreground mt-2">Random Instagram pages. Endless DMs. Pricing that changes when you ask twice.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: MessageSquareX, title: "Instagram DM chaos", desc: "Hundreds of pages, slow replies, lost messages." },
            { icon: AlertTriangle, title: "No pricing clarity", desc: "Hidden charges, last-minute upsells, no comparisons." },
            { icon: Lock, title: "Zero trust", desc: "Who's the planner? Where do bookings actually go?" },
          ].map((item) => (
            <div key={item.title} className="p-6 rounded-2xl border bg-card hover:border-destructive/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center mb-3">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold mb-1.5">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SOLUTION */}
      <section className="container py-12 bg-gradient-to-b from-transparent via-primary/5 to-transparent rounded-3xl">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="inline-block px-3 py-1 rounded-full bg-success/15 text-success text-xs font-bold uppercase tracking-wider mb-3">The Solution</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display">One marketplace. All the trips.</h2>
          <p className="text-muted-foreground mt-2">Discover, compare, and book curated trips from verified planners — all in one place.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: Compass, title: "Discover trips", desc: "Curated by region, vibe and group size." },
            { icon: ShieldCheck, title: "Compare planners", desc: "See ratings, reviews, past trips at a glance." },
            { icon: CreditCard, title: "Book securely", desc: "Pay 50% online. Booking is confirmed instantly." },
          ].map((item, i) => (
            <div key={item.title} className="p-6 rounded-2xl border bg-card hover:shadow-card transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground flex items-center justify-center mb-3 shadow-soft">
                <item.icon className="w-6 h-6" />
              </div>
              <p className="text-xs font-semibold text-primary mb-1">Step {i + 1}</p>
              <h3 className="font-bold mb-1.5">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
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
