import SEO from "@/components/SEO";
import AIChatWidget from "@/components/AIChatWidget";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, ArrowUpDown, Star, X, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import TripCard from "@/components/TripCard";
import Footer from "@/components/Footer";
import CompareBar from "@/components/CompareBar";
import { useCompare } from "@/hooks/useCompare";
import { useUserState } from "@/hooks/useUserState";
import { mockTrips, destinations, companies } from "@/data/mockTrips";

const Explore = () => {
  const { compareIds, toggle, clear, isSelected } = useCompare();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [destFilter, setDestFilter] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(30000);
  const [sortBy, setSortBy] = useState<"relevance" | "price-asc" | "price-desc" | "rating" | "popular">("relevance");
  const [durationFilter, setDurationFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setQuery(q);
  }, [searchParams]);

  const filtered = useMemo(() => {
    const result = mockTrips.filter((t) => {
      const q = query.trim().toLowerCase();
      if (q && !t.title.toLowerCase().includes(q) && !t.location.toLowerCase().includes(q) && !t.destination.toLowerCase().includes(q)) return false;
      if (destFilter !== "All" && t.destination !== destFilter) return false;
      if (t.price > maxPrice) return false;
      if (durationFilter !== "All") {
        const days = parseInt(t.duration);
        if (durationFilter === "1-3" && (days < 1 || days > 3)) return false;
        if (durationFilter === "4-7" && (days < 4 || days > 7)) return false;
        if (durationFilter === "8+" && days < 8) return false;
      }
      if (ratingFilter > 0 && t.rating < ratingFilter) return false;
      return true;
    });

    if (sortBy === "price-asc") return [...result].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") return [...result].sort((a, b) => b.price - a.price);
    if (sortBy === "rating") return [...result].sort((a, b) => b.rating - a.rating);
    if (sortBy === "popular") return [...result].sort((a, b) => b.booked - a.booked);
    return result;
  }, [query, destFilter, maxPrice, durationFilter, ratingFilter, sortBy]);

  const hasActiveFilters = destFilter !== "All" || durationFilter !== "All" || ratingFilter > 0 || maxPrice < 30000;
  const resetAll = () => {
    setQuery(""); setDestFilter("All"); setDurationFilter("All");
    setRatingFilter(0); setMaxPrice(30000); setSortBy("relevance");
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <SEO
        title="Explore Curated Trips | Trippinity"
        description="Browse and filter curated trips by destination, budget, duration, and rating. Book verified group and solo-friendly trips across India."
        path="/explore"
      />
      <Navbar />

      <div className="container py-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h1 className="text-3xl font-extrabold font-display">Explore all trips</h1>
            <p className="text-sm text-muted-foreground">{filtered.length} trips found</p>
          </div>
        </div>

        {/* Filter bar */}
        <div className="bg-card border rounded-2xl p-4 shadow-soft mb-8 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search trips, destinations..."
                className="w-full h-11 pl-9 pr-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <select
              aria-label="Sort trips"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="h-11 px-3 rounded-xl border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
            >
              <option value="relevance">Sort: Relevance</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Highest Rated</option>
              <option value="popular">Most Popular</option>
            </select>

            <button
              onClick={() => setShowFilters((v) => !v)}
              className={`relative h-11 px-4 rounded-xl border text-sm font-semibold flex items-center gap-2 transition-colors ${
                showFilters ? "bg-primary text-white border-primary" : "bg-background hover:bg-muted"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-destructive" />
              )}
            </button>

            {(hasActiveFilters || query) && (
              <button
                onClick={resetAll}
                className="h-11 px-3 rounded-xl border text-sm text-muted-foreground hover:text-destructive hover:border-destructive transition-colors flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" /> Clear
              </button>
            )}

            <span className="ml-auto text-xs text-muted-foreground font-semibold">{filtered.length} trips</span>
          </div>

          {showFilters && (
            <div className="pt-3 border-t space-y-4 animate-fade-in">
              <div>
                <p className="text-xs uppercase tracking-wider font-bold text-muted-foreground mb-2">Destination</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setDestFilter("All")}
                    className={`px-3 h-8 rounded-xl text-xs font-semibold transition-colors ${destFilter === "All" ? "bg-primary text-white" : "bg-muted hover:bg-muted/70"}`}
                  >
                    All
                  </button>
                  {destinations.map((d) => (
                    <button
                      key={d.name}
                      onClick={() => setDestFilter(d.name)}
                      className={`px-3 h-8 rounded-xl text-xs font-semibold transition-colors ${destFilter === d.name ? "bg-primary text-white" : "bg-muted hover:bg-muted/70"}`}
                    >
                      {d.emoji} {d.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider font-bold text-muted-foreground mb-2">Duration</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { val: "All", label: "Any duration" },
                    { val: "1-3", label: "1–3 days" },
                    { val: "4-7", label: "4–7 days" },
                    { val: "8+", label: "8+ days" },
                  ].map((d) => (
                    <button
                      key={d.val}
                      onClick={() => setDurationFilter(d.val)}
                      className={`px-3 h-8 rounded-xl text-xs font-semibold transition-colors ${durationFilter === d.val ? "bg-primary text-white" : "bg-muted hover:bg-muted/70"}`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider font-bold text-muted-foreground mb-2">Minimum Rating</p>
                <div className="flex flex-wrap gap-2">
                  {[0, 3.5, 4.0, 4.5, 4.8].map((r) => (
                    <button
                      key={r}
                      onClick={() => setRatingFilter(r)}
                      className={`px-3 h-8 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1 ${ratingFilter === r ? "bg-primary text-white" : "bg-muted hover:bg-muted/70"}`}
                    >
                      {r === 0 ? "Any" : <><Star className="w-3 h-3 fill-current" /> {r}+</>}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2 font-semibold uppercase tracking-wider">
                  <ArrowUpDown className="w-3.5 h-3.5" /> Max budget: <span className="text-foreground">₹{maxPrice.toLocaleString("en-IN")}</span>
                </div>
                <input
                  type="range"
                  min={5000}
                  max={30000}
                  step={500}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="accent-primary w-full max-w-xs"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground max-w-xs">
                  <span>₹5,000</span><span>₹30,000</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 space-y-6">
            <div className="w-20 h-20 rounded-full bg-muted/60 flex items-center justify-center mx-auto">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <p className="text-2xl font-extrabold font-display">No trips found</p>
              <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters or explore these popular trips</p>
            </div>
            <button
              onClick={resetAll}
              className="inline-flex h-10 px-5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Clear all filters
            </button>
            <div className="text-left max-w-5xl mx-auto pt-6">
              <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">You might like these</p>
              <div className="trip-card-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockTrips.filter((t) => t.popular).slice(0, 3).map((trip, i) => (
                  <div key={trip.id} className="animate-fade-up opacity-0" style={{ animationDelay: `${i * 60}ms`, animationFillMode: "forwards" }}>
                    <TripCard trip={trip} compareSelected={isSelected(trip.id)} onToggleCompare={toggle} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="trip-card-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((trip, i) => (
              <div key={trip.id} className="animate-fade-up opacity-0" style={{ animationDelay: `${i * 60}ms`, animationFillMode: "forwards" }}>
                <TripCard
                  trip={trip}
                  compareSelected={isSelected(trip.id)}
                  onToggleCompare={toggle}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
      <BottomNav />
      <AIChatWidget />
      <CompareBar compareIds={compareIds} onRemove={toggle} onClear={clear} />
    </div>
  );
};

export default Explore;
