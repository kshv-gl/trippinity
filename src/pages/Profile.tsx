import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import { Heart, Compass, MapPin, Mail } from "lucide-react";
import { useFavourites } from "@/hooks/useFavourites";
import { useBookingState } from "@/hooks/useBookingState";

const Profile = () => {
  const { favs } = useFavourites();
  const { hasBooked } = useBookingState();
  const userRaw = typeof window !== "undefined" ? localStorage.getItem("trippinity:user") : null;
  const user = userRaw ? JSON.parse(userRaw) : { name: "Traveler", email: "guest@trippinity.com" };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navbar />
      <div className="container py-10 max-w-4xl">
        <div className="bg-card border rounded-2xl p-6 sm:p-8 shadow-soft flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center text-3xl font-bold shrink-0">
            {(user.name?.[0] || "T").toUpperCase()}
          </div>
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl font-extrabold font-display">{user.name}</h1>
            <p className="text-sm text-muted-foreground flex items-center justify-center sm:justify-start gap-1 mt-1">
              <Mail className="w-3.5 h-3.5" /> {user.email}
            </p>
            <p className="text-xs text-muted-foreground mt-1 flex items-center justify-center sm:justify-start gap-1">
              <MapPin className="w-3.5 h-3.5" /> India
            </p>
          </div>
          <Link to="/login" className="text-sm font-medium text-primary hover:underline">Manage account</Link>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mt-6">
          <Link to="/favourites" className="p-5 rounded-2xl bg-card border shadow-soft hover-lift">
            <Heart className="w-6 h-6 text-destructive mb-2" />
            <p className="text-2xl font-bold">{favs.length}</p>
            <p className="text-xs text-muted-foreground">Favourite trips</p>
          </Link>
          <Link to="/trip-hub" className="p-5 rounded-2xl bg-card border shadow-soft hover-lift">
            <Compass className="w-6 h-6 text-primary mb-2" />
            <p className="text-2xl font-bold">{hasBooked ? "1" : "0"}</p>
            <p className="text-xs text-muted-foreground">Active bookings</p>
          </Link>
          <Link to="/explore" className="p-5 rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-elevated hover-lift">
            <Compass className="w-6 h-6 mb-2" />
            <p className="font-bold">Find your next trip</p>
            <p className="text-xs opacity-90 mt-1">Browse curated journeys →</p>
          </Link>
        </div>
      </div>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Profile;
