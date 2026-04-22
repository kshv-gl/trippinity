import { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import TripCard from "@/components/TripCard";
import Footer from "@/components/Footer";
import { mockTrips, destinations } from "@/data/mockTrips";

const Destinations = () => {
  const [params, setParams] = useSearchParams();
  const active = params.get("to") || "All";

  const filtered = useMemo(() => {
    if (active === "All") return mockTrips;
    return mockTrips.filter((t) => t.destination === active);
  }, [active]);

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navbar />
      <div className="container py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold font-display">Explore by destination</h1>
          <p className="text-sm text-muted-foreground">Pick a place to start your journey</p>
        </div>

        {/* Destination tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <button
            onClick={() => setParams({})}
            className={`relative aspect-[4/3] rounded-2xl overflow-hidden group ${active === "All" ? "ring-2 ring-primary" : ""}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent" />
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold">All trips</div>
          </button>
          {destinations.map((d) => (
            <button
              key={d.name}
              onClick={() => setParams({ to: d.name })}
              className={`relative aspect-[4/3] rounded-2xl overflow-hidden group hover-lift ${
                active === d.name ? "ring-2 ring-primary" : ""
              }`}
            >
              <img src={d.image} alt={d.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 text-left text-white">
                <div className="text-base font-bold">{d.emoji} {d.name}</div>
                <div className="text-[11px] opacity-80">{mockTrips.filter(t => t.destination === d.name).length} trips</div>
              </div>
            </button>
          ))}
        </div>

        {/* Trips */}
        <div>
          <h2 className="text-xl font-bold mb-4">
            {active === "All" ? "All trips" : `Trips in ${active}`} <span className="text-muted-foreground font-normal">({filtered.length})</span>
          </h2>
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No trips here yet. <Link to="/explore" className="text-primary hover:underline">Browse all</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
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

export default Destinations;
