import { useState, useMemo } from "react";
import { Search, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import TripCard from "@/components/TripCard";
import { mockTrips } from "@/data/mockTrips";

const Index = () => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return mockTrips;
    const q = query.toLowerCase();
    return mockTrips.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.location.toLowerCase().includes(q) ||
        t.plannerName.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="min-h-screen pb-20 sm:pb-0">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/10 py-12 sm:py-20">
        <div className="container text-center space-y-6">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Discover Your Next
            <br />
            <span className="text-gradient">Adventure</span>
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Browse curated trips by expert local planners. Book in seconds.
          </p>
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Where do you want to go?"
              className="w-full h-14 pl-12 pr-4 rounded-2xl border shadow-lg bg-card text-base focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
            />
          </div>
        </div>
      </section>

      {/* Trip Grid */}
      <section className="container py-10">
        <div className="flex items-center gap-2 mb-6">
          <MapPin className="w-5 h-5 text-accent" />
          <h2 className="text-xl font-bold">
            {query ? `Results for "${query}"` : "Explore Trips"}
          </h2>
          <span className="text-sm text-muted-foreground">({filtered.length})</span>
        </div>
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            No trips found. Try a different search!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((trip, i) => (
              <div key={trip.id} style={{ animationDelay: `${i * 80}ms` }}>
                <TripCard trip={trip} />
              </div>
            ))}
          </div>
        )}
      </section>

      <BottomNav />
    </div>
  );
};

export default Index;
