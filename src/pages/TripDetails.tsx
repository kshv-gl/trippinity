import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  MapPin,
  Calendar,
  Clock,
  Users,
  Flame,
  Heart,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import BookingModal from "@/components/BookingModal";
import Footer from "@/components/Footer";
import { mockTrips, companies } from "@/data/mockTrips";
import { useFavourites } from "@/hooks/useFavourites";

const TripDetails = () => {
  const { id } = useParams();
  const trip = mockTrips.find((t) => t.id === id);
  const [bookingOpen, setBookingOpen] = useState(false);
  const { isFav, toggle } = useFavourites();

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Trip not found</h1>
          <Link to="/" className="text-primary hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  const company = companies[trip.companyId];
  const fav = isFav(trip.id);

  return (
    <div className="min-h-screen pb-32 md:pb-24">
      <Navbar />

      {/* Hero video banner */}
      <div className="relative h-[55vh] min-h-[380px] overflow-hidden bg-foreground">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={trip.image}
        >
          <source src={trip.videoUrl} type="video/mp4" />
        </video>
        <div className="absolute inset-0 hero-overlay" />

        <Link
          to="/explore"
          className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>

        <button
          onClick={() => toggle(trip.id)}
          className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
          aria-label="Toggle favourite"
        >
          <Heart className={`w-5 h-5 ${fav ? "fill-destructive stroke-destructive" : ""}`} />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 text-white">
          <div className="container">
            <div className="flex flex-wrap gap-2 mb-3">
              {trip.popular && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-xs font-semibold">
                  <Flame className="w-3.5 h-3.5" /> Popular
                </span>
              )}
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/15 backdrop-blur text-xs font-medium">
                <MapPin className="w-3.5 h-3.5" /> {trip.location}
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display max-w-3xl leading-tight">{trip.title}</h1>
            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 text-sm">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {trip.duration}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {trip.dates}</span>
              <span className="flex items-center gap-1.5"><Star className="w-4 h-4 fill-secondary stroke-secondary" /> {trip.rating} · ({trip.booked} reviews)</span>
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {trip.booked} people booked</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-10 grid lg:grid-cols-[1fr_360px] gap-10 max-w-6xl">
        <div className="space-y-10">
          {/* Trust strip */}
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { icon: ShieldCheck, label: "Verified planner" },
              { icon: CheckCircle2, label: "Free cancellation" },
              { icon: Users, label: "Small groups" },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-2 p-3 rounded-xl bg-muted/40 border text-sm font-medium">
                <b.icon className="w-4 h-4 text-accent" /> {b.label}
              </div>
            ))}
          </div>

          {/* Sold by */}
          <Link
            to={`/planner/${trip.plannerName.toLowerCase().replace(/\s+/g, "-")}`}
            className="block p-5 rounded-2xl border bg-card hover:shadow-card transition-shadow"
          >
            <p className="text-xs text-muted-foreground mb-2">Sold by</p>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/15 flex items-center justify-center text-2xl">
                {company?.logo}
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg flex items-center gap-1.5">
                  {company?.name}
                  {company?.verified && <ShieldCheck className="w-4 h-4 text-accent" />}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-2">
                  <Star className="w-3 h-3 fill-secondary stroke-secondary" /> {company?.rating} · {company?.trips} trips · Hosted by {trip.plannerName}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Link>

          {/* Itinerary */}
          <div>
            <h2 className="text-2xl font-extrabold font-display mb-4">Day-wise itinerary</h2>
            <div className="space-y-4">
              {trip.itinerary.map((day, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl border bg-card">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      D{i + 1}
                    </div>
                    {i < trip.itinerary.length - 1 && <div className="w-px flex-1 bg-border mt-2" />}
                  </div>
                  <div className="pt-1.5 flex-1">
                    <p className="font-semibold text-sm mb-1">Day {i + 1}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{day}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky booking sidebar (desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 bg-card border rounded-2xl shadow-card p-6 space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-primary">₹{trip.price.toLocaleString("en-IN")}</span>
              <span className="text-xs text-muted-foreground">per person</span>
            </div>
            <div className="text-sm space-y-2 py-3 border-y">
              <p className="flex justify-between"><span className="text-muted-foreground">Duration</span><span className="font-medium">{trip.duration}</span></p>
              <p className="flex justify-between"><span className="text-muted-foreground">Dates</span><span className="font-medium">{trip.dates}</span></p>
              <p className="flex justify-between"><span className="text-muted-foreground">Rating</span><span className="font-medium flex items-center gap-1"><Star className="w-3 h-3 fill-secondary stroke-secondary" />{trip.rating}</span></p>
            </div>
            <button
              onClick={() => setBookingOpen(true)}
              className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors shadow-elevated"
            >
              Book This Trip
            </button>
            <p className="text-xs text-center text-muted-foreground">No charge until your planner confirms</p>
          </div>
        </aside>
      </div>

      {/* Sticky bottom CTA (mobile + tablet) */}
      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-lg border-t lg:hidden">
        <div className="container flex items-center justify-between py-3 gap-3">
          <div>
            <p className="text-xs text-muted-foreground">From</p>
            <p className="text-xl font-extrabold text-primary">₹{trip.price.toLocaleString("en-IN")}</p>
          </div>
          <button
            onClick={() => setBookingOpen(true)}
            className="flex-1 max-w-[240px] h-12 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors shadow-elevated"
          >
            Book This Trip
          </button>
        </div>
      </div>

      <Footer />
      <BookingModal trip={trip} open={bookingOpen} onClose={() => setBookingOpen(false)} />
      <BottomNav />
    </div>
  );
};

export default TripDetails;
