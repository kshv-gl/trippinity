import { Star, Users, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import type { Trip } from "@/data/mockTrips";

const TripCard = ({ trip }: { trip: Trip }) => {
  return (
    <Link
      to={`/trip/${trip.id}`}
      className="group block rounded-2xl bg-card shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden animate-fade-in"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={trip.image}
          alt={trip.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {trip.popular && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-secondary text-secondary-foreground text-xs font-semibold">
            <Flame className="w-3.5 h-3.5" /> Popular
          </span>
        )}
        <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-background/80 backdrop-blur text-sm font-bold">
          ₹{trip.price.toLocaleString("en-IN")}
        </span>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-base leading-tight line-clamp-1 group-hover:text-primary transition-colors">
          {trip.title}
        </h3>
        <p className="text-xs text-muted-foreground">{trip.duration}</p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{trip.plannerName}</span>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-0.5 text-secondary font-medium">
              <Star className="w-3.5 h-3.5 fill-secondary stroke-secondary" />
              {trip.rating}
            </span>
            <span className="flex items-center gap-0.5 text-muted-foreground text-xs">
              <Users className="w-3 h-3" /> {trip.booked}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TripCard;
