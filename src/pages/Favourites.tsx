import AIChatWidget from "@/components/AIChatWidget";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import TripCard from "@/components/TripCard";
import { useFavourites } from "@/hooks/useFavourites";
import { mockTrips } from "@/data/mockTrips";

const Favourites = () => {
  const { favs } = useFavourites();
  const trips = mockTrips.filter((t) => favs.includes(t.id));

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navbar />
      <div className="container py-10">
        <div className="flex items-center gap-2 mb-6">
          <Heart className="w-6 h-6 text-destructive fill-destructive" />
          <h1 className="text-3xl font-extrabold font-display">Your favourites</h1>
        </div>
        {trips.length === 0 ? (
          <div className="text-center py-20 space-y-3">
            <div className="text-5xl">💔</div>
            <p className="text-muted-foreground">No favourites yet. Tap the heart on any trip to save it.</p>
            <Link to="/explore" className="inline-block mt-2 px-5 h-11 leading-[44px] rounded-xl bg-primary text-primary-foreground text-sm font-semibold">
              Explore trips
            </Link>
          </div>
        ) : (
          <div className="trip-card-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        )}
      </div>
      <Footer />
      <BottomNav />
      <AIChatWidget />

    </div>
  );
};

export default Favourites;
