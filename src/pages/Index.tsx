import SEO from "@/components/SEO";
import { useEffect, useMemo, useState } from "react";
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
  ChevronDown,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import Hero from "@/components/Hero";
import TripCard from "@/components/TripCard";
import Footer from "@/components/Footer";
import AIChatWidget from "@/components/AIChatWidget";
import { mockTrips, destinations, companies } from "@/data/mockTrips";
import { reviews } from "@/data/reviews";
import { useUserState } from "@/hooks/useUserState";

const RotatingBanner = () => {
  const [active, setActive] = useState(0);
  const total = 4;

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % total), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="container pt-10">
      <div className="relative rounded-3xl overflow-hidden h-[340px] sm:h-[380px]">

        {/* SLIDE 0 — Community: Split photo layout */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${active === 0 ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
          <div className="absolute inset-0 grid grid-cols-2">
            <img
              src="https://images.pexels.com/photos/5329316/pexels-photo-5329316.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="grid grid-rows-2">
              <img
                src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80"
                alt=""
                className="w-full h-full object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center p-8 sm:p-12 max-w-lg">
            <span className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-[11px] font-bold uppercase tracking-wider mb-4">
              <Users className="w-3 h-3" /> Community travel
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white leading-tight">
              Travel with strangers.<br />
              <span className="text-secondary">Return as friends.</span>
            </h2>
            <p className="mt-3 text-sm text-white/80 max-w-xs">
              Every Trippinity trip is a group experience. Meet your people before you even pack.
            </p>
            <Link to="/explore" className="mt-5 self-start inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-white text-foreground font-bold text-sm hover:scale-105 transition-transform shadow-elevated">
              Browse group trips <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="absolute top-4 right-4 grid grid-cols-3 gap-2">
            {[{ v: "12K+", l: "Travelers" }, { v: "4.8", l: "Rating" }, { v: "200+", l: "Trips" }].map((s) => (
              <div key={s.l} className="rounded-xl bg-white/15 backdrop-blur border border-white/20 p-2 text-center text-white">
                <p className="text-sm font-extrabold">{s.v}</p>
                <p className="text-[9px] opacity-75 uppercase tracking-wide">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SLIDE 1 — Early Bird Offer */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${active === 1 ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
          <img
            src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600/90 via-yellow-500/70 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-between p-8 sm:p-12">
            <div className="flex items-start justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur text-white text-[11px] font-bold uppercase tracking-wider">
                Limited offer
              </span>
              <div className="bg-white rounded-2xl p-3 text-center shadow-elevated">
                <p className="text-[10px] font-bold text-orange-600 uppercase">Offer ends</p>
                <p className="text-xl font-extrabold text-foreground">May 31</p>
              </div>
            </div>
            <div>
              <p className="text-white/80 text-sm font-semibold mb-1">Himachal Pradesh trips</p>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white font-display leading-none">
                Save <span className="text-yellow-300">₹2,000</span>
              </h2>
              <p className="text-white/85 text-sm mt-2 max-w-xs">
                Book any Manali or Himachal trip before May 31. Early bird discount auto-applied at checkout.
              </p>
              <div className="flex items-center gap-3 mt-5">
                <Link to="/trip/1" className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-white text-foreground font-bold text-sm hover:scale-105 transition-transform shadow-elevated">
                  Claim this deal <ArrowRight className="w-4 h-4" />
                </Link>
                <span className="text-white/70 text-xs">3 trips eligible</span>
              </div>
            </div>
          </div>
        </div>

        {/* SLIDE 2 — Featured partner */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${active === 2 ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
          <img
            src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/40 to-foreground/10" />
          <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12">
            <div className="flex items-end justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/30 border border-blue-400/40 text-blue-200 text-[10px] font-bold uppercase tracking-wider mb-3">
                  Featured partner
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display leading-tight">
                  Himalayan Trails Co.
                </h2>
                <p className="text-white/75 text-sm mt-1">8 years. 1,200+ travelers. India's most trusted mountain operator.</p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-white text-sm font-bold flex items-center gap-1">
                    <Star className="w-4 h-4 fill-secondary stroke-secondary" /> 4.8
                  </span>
                  <span className="text-white/60 text-xs">24 trips listed on Trippinity</span>
                </div>
              </div>
              <Link to="/planner/himalayan-trails" className="shrink-0 inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-white text-foreground font-bold text-sm hover:scale-105 transition-transform shadow-elevated whitespace-nowrap">
                View trips <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="absolute top-5 right-5 flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-xl px-3 py-2">
            <ShieldCheck className="w-4 h-4 text-blue-300" />
            <span className="text-white text-[11px] font-bold">Verified partner</span>
          </div>
        </div>

        {/* SLIDE 3 — Weekend Goa */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${active === 3 ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
          <img
            src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/85 via-teal-800/50 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center p-8 sm:p-12 max-w-xl">
            <span className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-teal-400/25 border border-teal-400/40 text-teal-200 text-[11px] font-bold uppercase tracking-wider mb-4">
              Weekend special
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white font-display leading-tight">
              Goa.<br />
              <span className="text-teal-300">This weekend.</span>
            </h2>
            <div className="flex items-center gap-3 mt-4">
              <div className="rounded-xl bg-white/15 backdrop-blur border border-white/20 px-4 py-2 text-center">
                <p className="text-lg font-extrabold text-white">₹8,499</p>
                <p className="text-[10px] text-white/70">per person</p>
              </div>
              <div className="rounded-xl bg-white/15 backdrop-blur border border-white/20 px-4 py-2 text-center">
                <p className="text-lg font-extrabold text-white">3N / 4D</p>
                <p className="text-[10px] text-white/70">duration</p>
              </div>
              <div className="rounded-xl bg-white/15 backdrop-blur border border-white/20 px-4 py-2 text-center">
                <p className="text-lg font-extrabold text-white">May 1</p>
                <p className="text-[10px] text-white/70">departure</p>
              </div>
            </div>
            <p className="text-white/80 text-sm mt-3">Beach resort, water sports, curated sunset boat ride. Seats still open.</p>
            <Link to="/trip/2" className="mt-5 self-start inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-teal-400 text-teal-900 font-bold text-sm hover:scale-105 transition-transform shadow-elevated">
              Book Goa now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === active ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setActive((p) => (p - 1 + total) % total)}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center text-white hover:bg-white/35 transition-colors"
        >
          <ChevronDown className="w-4 h-4 rotate-90" />
        </button>
        <button
          onClick={() => setActive((p) => (p + 1) % total)}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center text-white hover:bg-white/35 transition-colors"
        >
          <ChevronDown className="w-4 h-4 -rotate-90" />
        </button>
      </div>
    </section>
  );
};

const Index = () => {

  const [query, setQuery] = useState("");

  const { userState } = useUserState();

  const matchesQuery = (t: (typeof mockTrips)[number], q: string) => {
    const companyName = companies[t.companyId]?.name?.toLowerCase() ?? "";
    return (
      t.title.toLowerCase().includes(q) ||
      t.location.toLowerCase().includes(q) ||
      t.destination.toLowerCase().includes(q) ||
      t.plannerName.toLowerCase().includes(q) ||
      t.companyId.toLowerCase().includes(q) ||
      companyName.includes(q) ||
      t.duration.toLowerCase().includes(q) ||
      t.dates.toLowerCase().includes(q) ||
      t.itinerary.some((item) => item.toLowerCase().includes(q))
    );
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return mockTrips.filter((t) => {
      if (q && !matchesQuery(t, q)) return false;
      // If userState is set, only show trips departing from that state
      if (userState && t.departureState !== userState) return false;
      return true;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, userState]);

  const popular = mockTrips.filter((t) => t.popular);
  const featuredCompanies = Object.values(companies).slice(0, 4);
  const featuredReviews = reviews.slice(0, 3);

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <SEO
        title="Trippinity – Curated Group Trips & Local Planners in India"
        description="Discover curated group trips from verified local planners across India. Transparent pricing, day-wise itineraries, and 25% upfront booking."
        path="/"
      />
      <Navbar />
      <Hero />


      {/* Floating search */}
      <section className="container -mt-10 relative z-20">
        <div className="bg-card rounded-2xl shadow-card p-3 sm:p-4 border">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-muted-foreground ml-2" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && query.trim()) {
                  window.location.href = `/explore?q=${encodeURIComponent(query.trim())}`;
                }
              }}
              placeholder="Search destinations, trip names, planners, companies..."
              className="flex-1 h-12 bg-transparent text-base focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-muted-foreground hover:text-foreground transition-colors text-lg leading-none mr-1"
                aria-label="Clear"
              >
                ×
              </button>
            )}
            <button
              onClick={() => {
                window.location.href = query.trim() ? `/explore?q=${encodeURIComponent(query.trim())}` : "/explore";
              }}
              className="hidden sm:inline-flex h-12 px-6 rounded-xl bg-primary text-primary-foreground font-semibold items-center hover:bg-primary/90 transition-colors"
            >
              Search
            </button>
          </div>

          {/* Suggestions dropdown */}
          {(() => {
            const popularSuggestions = ["Manali", "Goa", "Ladakh", "Kerala", "Rajasthan", "Andaman"];
            if (!query.trim()) {
              return (
                <div className="flex items-center gap-2 mt-3 pt-3 border-t flex-wrap">
                  <span className="text-xs text-muted-foreground font-semibold">Popular:</span>
                  {popularSuggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => setQuery(s)}
                      className="text-xs px-2.5 py-1 rounded-full bg-muted hover:bg-muted/70 transition-colors font-medium"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              );
            }
            const suggestions = mockTrips
              .filter((t) => matchesQuery(t, query.toLowerCase()))
              .slice(0, 5);
            return (
              <div className="mt-3 pt-3 border-t">
                {suggestions.length > 0 ? (
                  <>
                    <p className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground mb-2">
                      Trips matching "{query}"
                    </p>
                    <div className="space-y-1">
                      {suggestions.map((t) => (
                        <Link
                          key={t.id}
                          to={`/trip/${t.id}`}
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/60 transition-colors"
                        >
                          <img src={t.image} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" loading="lazy" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate">{t.title}</p>
                            <p className="text-xs text-muted-foreground truncate">
                              {t.location} · ₹{t.price.toLocaleString("en-IN")}
                            </p>
                          </div>
                          <span className="text-xs text-primary font-semibold shrink-0">View →</span>
                        </Link>
                      ))}
                    </div>
                    <Link
                      to={`/explore?q=${encodeURIComponent(query.trim())}`}
                      className="block mt-2 text-center text-sm font-semibold text-primary hover:underline"
                    >
                      See all results for "{query}" →
                    </Link>
                  </>
                ) : (
                  <div>
                    <p className="text-sm font-semibold">No trips found for "{query}"</p>
                    <p className="text-xs text-muted-foreground mt-1 mb-2">
                      Try: "Himalayan Trails", "Coastal Escapes", "Kerala Trails", "Priya", "Arjun"
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Try searching for a destination or browse popular ones:</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {popularSuggestions.map((s) => (
                        <button
                          key={s}
                          onClick={() => setQuery(s)}
                          className="px-3 py-1.5 rounded-xl bg-muted text-sm font-medium hover:bg-muted/70 transition-colors"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    <div className="mt-4">
                      <p className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground mb-2">Recommended trips</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {mockTrips.filter((t) => t.popular).slice(0, 4).map((t) => (
                          <Link key={t.id} to={`/trip/${t.id}`} className="rounded-xl overflow-hidden border hover:shadow-soft transition-shadow">
                            <img src={t.image} alt="" className="w-full aspect-[4/3] object-cover" loading="lazy" />
                            <div className="p-2">
                              <p className="text-xs font-semibold truncate">{t.title}</p>
                              <p className="text-[11px] text-primary font-bold">₹{t.price.toLocaleString("en-IN")}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      </section>

      {/* Auto-rotating promotional banner */}
      <RotatingBanner />


      {/* Trust strip */}
      <section className="container py-10 grid sm:grid-cols-3 gap-4">
        {[
          { icon: ShieldCheck, title: "Verified planners", desc: "Every company is vetted & rated" },
          { icon: Store, title: "Real marketplace", desc: "Multiple planners, your choice" },
          { icon: MessagesSquare, title: "Trip Hub after booking", desc: "Chat with planner & travelers" },
        ].map((item, i) => (
          <div
            key={item.title}
            className="flex items-start gap-3 p-4 rounded-2xl bg-muted/40 animate-fade-up opacity-0 hover:-translate-y-1 transition-transform"
            style={{ animationDelay: `${i * 100}ms`, animationFillMode: "forwards" }}
          >
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
                <div className="max-w-[80%] ml-auto p-3 rounded-2xl rounded-br-sm text-sm bg-primary/15 break-words">
                  Hi, is the Manali trip available in April?
                </div>
                <p className="text-[10px] text-right text-muted-foreground">2:14 PM · Seen</p>
                <div className="max-w-[80%] ml-auto p-3 rounded-2xl rounded-br-sm text-sm bg-primary/15 break-words">
                  Hello? Price for 4 ppl?
                </div>
                <p className="text-[10px] text-right text-destructive font-semibold">Yesterday · No reply</p>
                <div className="max-w-[80%] ml-auto p-3 rounded-2xl rounded-br-sm text-sm bg-primary/15 break-words">
                  Anyone there??
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
                  <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1">Pay 25% now</p>
                  <p className="text-lg font-extrabold">₹3,250</p>
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
          {featuredCompanies.map((c, i) => (
            <Link
              key={c.id}
              to={`/planner/${c.id}`}
              className="p-5 rounded-2xl border bg-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 group animate-fade-up opacity-0"
              style={{ animationDelay: `${i * 90}ms`, animationFillMode: "forwards" }}
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
          {destinations.map((d, i) => (
            <Link
              key={d.name}
              to={`/destinations?to=${d.name}`}
              className="relative aspect-square rounded-2xl overflow-hidden group hover-lift animate-fade-up opacity-0"
              style={{ animationDelay: `${i * 70}ms`, animationFillMode: "forwards" }}
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

      {/* LIVE MARKETPLACE — horizontal scroll w/ urgency signals */}
      <section className="py-12 bg-gradient-to-b from-background via-muted/20 to-background">
        <div className="container flex items-end justify-between mb-5">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/15 text-success text-xs font-bold uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" /> Live now
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display">People are booking trips right now</h2>
            <p className="text-sm text-muted-foreground">Real activity from the last 24 hours · don't miss out</p>
          </div>
          <Link to="/explore" className="text-sm font-medium text-primary hover:underline hidden sm:inline">View all →</Link>
        </div>

        <div className="container-fluid pl-4 sm:pl-[max(1rem,calc((100vw-1280px)/2+1rem))] overflow-hidden">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 pr-4 scrollbar-hide">
            {mockTrips.slice(0, 8).map((trip, i) => {
              const statuses = [
                { label: "12 people booked", tone: "success" as const, icon: Users },
                { label: "Only 3 spots left", tone: "warning" as const, icon: Flame },
                { label: "Sold out", tone: "danger" as const, icon: Lock },
                { label: "8 viewing now", tone: "success" as const, icon: Users },
              ];
              const s = statuses[i % statuses.length];
              const isSoldOut = s.label === "Sold out";
              const toneClass =
                s.tone === "success"
                  ? "bg-success text-success-foreground"
                  : s.tone === "warning"
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-destructive text-destructive-foreground";
              return (
                <Link
                  key={trip.id}
                  to={isSoldOut ? "/explore" : `/trip/${trip.id}`}
                  className="snap-start shrink-0 w-[280px] sm:w-[320px] rounded-2xl border bg-card overflow-hidden hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={trip.image}
                      alt={trip.title}
                      loading="lazy"
                      className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${isSoldOut ? "grayscale" : ""}`}
                    />
                    <span className={`absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-extrabold shadow-soft ${toneClass}`}>
                      <s.icon className="w-3 h-3" /> {s.label}
                    </span>
                    {isSoldOut && (
                      <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
                        <span className="px-3 py-1.5 rounded-lg bg-background/90 text-foreground text-xs font-extrabold uppercase tracking-wider">Sold out</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-bold truncate">{trip.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{trip.location} · {trip.duration}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-base font-extrabold text-primary">₹{trip.price.toLocaleString()}</span>
                      <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <Star className="w-3 h-3 fill-secondary stroke-secondary" /> {trip.rating}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
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
          <div className="trip-card-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(query ? filtered : popular).map((trip, i) => (
              <div key={trip.id} style={{ animationDelay: `${i * 60}ms` }}>
                <TripCard trip={trip} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* TRIP HUB — premium teaser with real avatars + chat preview */}
      <section className="relative my-16 overflow-hidden">
        <div className="relative w-full bg-gradient-to-br from-[hsl(222_35%_10%)] via-primary to-accent text-primary-foreground overflow-hidden">
          {/* glow accents */}
          <div aria-hidden className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-secondary/20 blur-3xl pointer-events-none" />
          <div aria-hidden className="absolute -bottom-40 -right-20 w-[500px] h-[500px] rounded-full bg-accent/30 blur-3xl pointer-events-none" />

          <div className="relative container py-16 md:py-24 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* LEFT — copy */}
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" /> Trip Hub
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display leading-[1.02]">
                See who you're<br />traveling with<br /><span className="text-secondary">before the trip.</span>
              </h2>
              <p className="mt-5 text-base sm:text-lg text-primary-foreground/85">
                Real travelers. Real chat. Real plans — all unlocked the moment you book.
              </p>

              <div className="flex flex-wrap gap-2 mt-6">
                {[
                  { icon: Users, label: "Travelers list" },
                  { icon: MessagesSquare, label: "Group chat" },
                  { icon: ShieldCheck, label: "Planner DMs" },
                ].map((p) => (
                  <span key={p.label} className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-primary-foreground/15 backdrop-blur border border-primary-foreground/25 font-medium">
                    <p.icon className="w-3.5 h-3.5" /> {p.label}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-8">
                <Link
                  to="/explore"
                  className="group inline-flex items-center gap-2 h-13 px-6 py-3.5 rounded-xl bg-secondary text-secondary-foreground font-bold hover:bg-secondary/90 transition-all shadow-elevated hover:scale-[1.03]"
                >
                  <Lock className="w-4 h-4" /> Unlock Your Trip Community
                </Link>
                <Link
                  to="/trip-hub"
                  className="inline-flex items-center gap-2 h-13 px-5 py-3.5 rounded-xl bg-primary-foreground/10 backdrop-blur border border-primary-foreground/30 font-medium hover:bg-primary-foreground/20 transition-colors"
                >
                  Preview <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* RIGHT — blurred Trip Hub UI preview */}
            <div className="relative">
              {/* Travelers card */}
              <div className="relative rounded-2xl bg-primary-foreground/10 backdrop-blur-xl border border-primary-foreground/20 p-4 shadow-elevated max-w-md ml-auto" style={{ filter: "blur(0.5px)" }}>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold uppercase tracking-wider opacity-80">Travelers · 12</p>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-success/30 font-bold">All confirmed</span>
                </div>
                <div className="flex -space-x-2 mb-3">
                  {featuredReviews.concat(reviews.slice(3, 8)).slice(0, 6).map((r, i) => (
                    <img
                      key={i}
                      src={r.avatar}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover border-2 border-primary"
                      loading="lazy"
                    />
                  ))}
                  <span className="w-10 h-10 rounded-full border-2 border-primary bg-primary-foreground/20 backdrop-blur flex items-center justify-center text-[10px] font-bold">+6</span>
                </div>
                <div className="text-[11px] opacity-80">Manali Group · Apr 18 – 22</div>
              </div>

              {/* Chat preview card — overlapped */}
              <div className="relative rounded-2xl bg-primary-foreground/10 backdrop-blur-xl border border-primary-foreground/20 p-4 shadow-elevated max-w-sm mt-4 -ml-2 sm:ml-6">
                <div className="flex items-center gap-2 pb-3 mb-3 border-b border-primary-foreground/20">
                  <MessagesSquare className="w-4 h-4" />
                  <p className="text-xs font-bold">Group chat</p>
                  <span className="ml-auto w-2 h-2 rounded-full bg-success animate-pulse" />
                </div>
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2">
                    <img src={featuredReviews[0]?.avatar} alt="" className="w-7 h-7 rounded-full object-cover shrink-0" loading="lazy" />
                    <div className="bg-primary-foreground/15 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[80%]">
                      <p className="text-[11px] font-bold opacity-90">{featuredReviews[0]?.user.split(" ")[0]}</p>
                      <p className="text-xs">Anyone landing at 6am? Share a cab? 🚖</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 justify-end">
                    <div className="bg-secondary/40 rounded-2xl rounded-tr-sm px-3 py-2 max-w-[80%]">
                      <p className="text-xs">Yess I'm in! 🙋‍♀️</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <img src={featuredReviews[1]?.avatar} alt="" className="w-7 h-7 rounded-full object-cover shrink-0" loading="lazy" />
                    <div className="bg-primary-foreground/15 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[80%]">
                      <p className="text-[11px] font-bold opacity-90">Planner · Himalayan Trails</p>
                      <p className="text-xs">Pickup confirmed at 6:30am ✅</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lock badge */}
              <div className="absolute -top-3 -right-3 sm:top-4 sm:-right-2 rotate-6 bg-secondary text-secondary-foreground px-3 py-1.5 rounded-xl text-[11px] font-extrabold shadow-elevated inline-flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" /> Unlocks after booking
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
              className="group inline-flex h-13 px-7 py-3.5 rounded-xl bg-white text-primary font-bold items-center gap-2 hover:scale-105 transition-transform shadow-elevated"
            >
              Start Exploring Trips <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/explore"
              className="inline-flex h-13 px-7 py-3.5 rounded-xl bg-secondary text-secondary-foreground font-bold items-center gap-2 hover:scale-105 transition-transform shadow-elevated"
            >
              <CreditCard className="w-5 h-5" /> Book Instantly (Pay 25%)
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
