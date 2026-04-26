import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import AIChatWidget from "@/components/AIChatWidget";
import { Heart, Compass, MapPin, Mail, LogOut, LogIn } from "lucide-react";
import { useFavourites } from "@/hooks/useFavourites";
import { useBookingState } from "@/hooks/useBookingState";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Profile = () => {
  const { favs } = useFavourites();
  const { hasBooked } = useBookingState();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Signed out");
    navigate("/");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pb-20 md:pb-0">
        <Navbar />
        <div className="container py-20 max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-7 h-7 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-extrabold font-display">Sign in to view your profile</h1>
          <p className="text-sm text-muted-foreground mt-2 mb-6">
            Your favourites, bookings and Trip Hub access live here.
          </p>
          <Link
            to="/login"
            className="inline-flex h-12 px-6 rounded-xl bg-primary text-primary-foreground font-semibold items-center hover:bg-primary/90 transition-colors shadow-elevated"
          >
            Login or create account
          </Link>
        </div>
        <Footer />
        <BottomNav />
        <AIChatWidget />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navbar />
      <div className="container py-10 max-w-4xl">
        <div className="bg-card border rounded-2xl p-6 sm:p-8 shadow-soft flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center text-3xl font-bold shrink-0">
            {(user?.name?.[0] || "T").toUpperCase()}
          </div>
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl font-extrabold font-display">{user?.name}</h1>
            <p className="text-sm text-muted-foreground flex items-center justify-center sm:justify-start gap-1 mt-1">
              <Mail className="w-3.5 h-3.5" /> {user?.email}
            </p>
            <p className="text-xs text-muted-foreground mt-1 flex items-center justify-center sm:justify-start gap-1">
              <MapPin className="w-3.5 h-3.5" /> India
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="h-10 px-4 rounded-xl border bg-background text-sm font-medium hover:bg-muted transition-colors inline-flex items-center gap-2 text-destructive"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
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
      <AIChatWidget />
    </div>
  );
};

export default Profile;
