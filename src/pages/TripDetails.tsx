import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Calendar, Clock, Users, Flame } from "lucide-react";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import BookingModal from "@/components/BookingModal";
import { mockTrips } from "@/data/mockTrips";

const TripDetails = () => {
  const { id } = useParams();
  const trip = mockTrips.find((t) => t.id === id);
  const [bookingOpen, setBookingOpen] = useState(false);

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

  return (
    <div className="min-h-screen pb-20 sm:pb-0">
      <Navbar />

      {/* Banner */}
      <div className="relative h-64 sm:h-96 overflow-hidden">
        <img src={trip.image} alt={trip.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <Link
          to="/"
          className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        {trip.popular && (
          <span className="absolute top-4 right-4 inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-secondary text-secondary-foreground text-sm font-semibold">
            <Flame className="w-4 h-4" /> Popular
          </span>
        )}
      </div>

      <div className="container max-w-3xl -mt-12 relative z-10">
        <div className="bg-card rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">{trip.title}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-accent" />{trip.location}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{trip.duration}</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{trip.dates}</span>
              <span className="flex items-center gap-1"><Users className="w-4 h-4" />{trip.booked} booked</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-3xl font-extrabold text-primary">₹{trip.price.toLocaleString("en-IN")}</span>
            <span className="flex items-center gap-1 text-lg font-semibold">
              <Star className="w-5 h-5 fill-secondary stroke-secondary" /> {trip.rating}
            </span>
          </div>

          {/* Planner */}
          <Link
            to={`/planner/${trip.plannerName.toLowerCase().replace(/\s+/g, "-")}`}
            className="flex items-center gap-3 p-4 rounded-xl bg-muted hover:bg-muted/70 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
              {trip.plannerName[0]}
            </div>
            <div>
              <p className="font-semibold">{trip.plannerName}</p>
              <p className="text-xs text-muted-foreground">Trip Planner</p>
            </div>
          </Link>

          {/* Itinerary */}
          <div>
            <h2 className="text-lg font-bold mb-3">Itinerary</h2>
            <div className="space-y-3">
              {trip.itinerary.map((day, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </div>
                    {i < trip.itinerary.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                  </div>
                  <p className="text-sm text-muted-foreground pt-1.5 pb-3">{day}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setBookingOpen(true)}
            className="w-full h-14 rounded-2xl bg-primary text-primary-foreground text-lg font-bold hover:opacity-90 transition-opacity"
          >
            Request to Book
          </button>
        </div>
      </div>

      <BookingModal trip={trip} open={bookingOpen} onClose={() => setBookingOpen(false)} />
      <BottomNav />
    </div>
  );
};

export default TripDetails;
