import AIChatWidget from "@/components/AIChatWidget";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import TripCard from "@/components/TripCard";
import Footer from "@/components/Footer";
import CompareBar from "@/components/CompareBar";
import { useCompare } from "@/hooks/useCompare";
import { mockTrips, destinations } from "@/data/mockTrips";

const Explore = () => {
  const { compareIds, toggle, clear, isSelected } = useCompare();
  const [query, setQuery] = useState("");
  const [destFilter, setDestFilter] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(30000);

  const filtered = useMemo(() => {
    return mockTrips.filter((t) => {
      const q = query.trim().toLowerCase();
      if (q && !t.title.toLowerCase().includes(q) && !t.location.toLowerCase().includes(q)) return false;
      if (destFilter !== "All" && t.destination !== destFilter) return false;
      if (t.price > maxPrice) return false;
      return true;
    });
  }, [query, destFilter, maxPrice]);

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navbar />
      <div className="container py-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h1 className="text-3xl font-extrabold font-display">Explore all trips</h1>
            <p className="text-sm text-muted-foreground">{filtered.length} trips found</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-card border rounded-2xl p-4 shadow-soft mb-8 grid lg:grid-cols-[1fr_auto_auto] gap-3 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search trips..."
              className="w-full h-11 pl-9 pr-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setDestFilter("All")}
              className={`px-3 h-11 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                destFilter === "All" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-muted/70"
              }`}
            >
              All
            </button>
            {destinations.map((d) => (
              <button
                key={d.name}
                onClick={() => setDestFilter(d.name)}
                className={`px-3 h-11 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                  destFilter === d.name ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-muted/70"
                }`}
              >
                {d.emoji} {d.name}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-xs text-muted-foreground whitespace-nowrap">
            <SlidersHorizontal className="w-4 h-4" />
            Max ₹{maxPrice.toLocaleString("en-IN")}
            <input
              type="range"
              min={5000}
              max={30000}
              step={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="accent-primary w-32"
            />
          </label>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">No trips match your filters.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
