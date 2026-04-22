import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShieldCheck, Sparkles, Map, MessagesSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import Hero from "@/components/Hero";
import TripCard from "@/components/TripCard";
import Footer from "@/components/Footer";
import { mockTrips, destinations } from "@/data/mockTrips";

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

      {/* Trust strip */}
      <section className="container py-10 grid sm:grid-cols-3 gap-4">
        {[
          { icon: ShieldCheck, title: "Verified planners", desc: "Every company is vetted & rated" },
          { icon: Sparkles, title: "Curated, not generic", desc: "Hand-picked itineraries by locals" },
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

      <Footer />
      <BottomNav />
    </div>
  );
};

export default Index;
