import { useRef, useState } from "react";
import { Star, Users, Flame, Heart, ShieldCheck, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { type Trip, companies } from "@/data/mockTrips";
import { useFavourites } from "@/hooks/useFavourites";

const TripCard = ({ trip }: { trip: Trip }) => {
  const { isFav, toggle } = useFavourites();
  const [hover, setHover] = useState(false);
  const [videoOk, setVideoOk] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const company = companies[trip.companyId];
  const fav = isFav(trip.id);

  // Strict rule: only ever attempt video if a non-empty travel videoUrl exists
  // AND it has not previously failed to load.
  const hasVideo = Boolean(trip.videoUrl) && videoOk;

  const onEnter = () => {
    setHover(true);
    if (!hasVideo) return;
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      v.play().catch(() => setVideoOk(false));
    }
  };
  const onLeave = () => {
    setHover(false);
    const v = videoRef.current;
    if (v) v.pause();
  };

  return (
    <Link
      to={`/trip/${trip.id}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group block rounded-2xl bg-card shadow-soft hover:shadow-card transition-all duration-300 overflow-hidden animate-fade-in border border-border/60"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={trip.image}
          alt={trip.title}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
            hover && hasVideo ? "opacity-0 scale-105" : "opacity-100 group-hover:scale-105"
          }`}
          loading="lazy"
        />
        {hasVideo && (
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              hover ? "opacity-100" : "opacity-0"
            }`}
            muted
            loop
            playsInline
            preload="none"
            onError={() => setVideoOk(false)}
          >
            <source src={trip.videoUrl} type="video/mp4" />
          </video>
        )}

        {/* Bottom gradient for text readability */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />

        {/* Top row badges */}
        <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5">
          {trip.popular && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-secondary text-secondary-foreground text-xs font-semibold shadow-soft">
              <Flame className="w-3.5 h-3.5" /> Popular
            </span>
          )}
          {company?.verified && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-background/90 backdrop-blur text-accent text-[11px] font-semibold shadow-soft">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggle(trip.id);
          }}
          aria-label={fav ? "Remove from favourites" : "Add to favourites"}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:scale-110 transition-transform shadow-soft"
        >
          <Heart
            className={`w-[18px] h-[18px] transition-colors ${
              fav ? "fill-destructive stroke-destructive" : "stroke-foreground"
            }`}
          />
        </button>

        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <span className="px-2.5 py-1 rounded-lg bg-background/90 backdrop-blur text-xs font-medium inline-flex items-center gap-1">
            <Clock className="w-3 h-3" /> {trip.duration}
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-soft">
            ₹{trip.price.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {trip.title}
        </h3>

        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            Sold by{" "}
            <span
              role="link"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (company) window.location.assign(`/planner/${company.id}`);
              }}
              className="font-semibold text-foreground inline-flex items-center gap-1 hover:text-primary transition-colors cursor-pointer"
            >
              <span aria-hidden>{company?.logo}</span> {company?.name}
              {company?.verified && <ShieldCheck className="w-3.5 h-3.5 text-accent" />}
            </span>
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/60 text-xs">
          <span className="flex items-center gap-1 font-semibold">
            <Star className="w-3.5 h-3.5 fill-secondary stroke-secondary" />
            {trip.rating}
          </span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <Flame className="w-3.5 h-3.5 text-destructive" /> {trip.booked} people booked
          </span>
        </div>
      </div>
    </Link>
  );
};

export default TripCard;
