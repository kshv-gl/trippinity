import { useRef, useState } from "react";
import { Star, Flame, Heart, ShieldCheck, Clock, Sparkles, Crown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { type Trip, companies } from "@/data/mockTrips";
import { useFavourites } from "@/hooks/useFavourites";

interface Props {
  trip: Trip;
  compareSelected?: boolean;
  onToggleCompare?: (id: string) => void;
  womensOnly?: boolean;
  isElite?: boolean;
}

const TripCard = ({ trip, compareSelected, onToggleCompare, womensOnly, isElite }: Props) => {
  const { isFav, toggle } = useFavourites();
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const [videoOk, setVideoOk] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const company = companies[trip.companyId];
  const fav = isFav(trip.id);

  const hasVideo = Boolean(trip.videoUrl) && videoOk;

  const onEnter = () => {
    setHover(true);
    if (!hasVideo) return;
    const v = videoRef.current;
    if (!v) return;
    try { v.load(); } catch { /* noop */ }
    const tryPlay = () => { v.play().catch(() => {}); };
    if (v.readyState >= 2) tryPlay();
    else {
      const onReady = () => {
        v.removeEventListener("loadeddata", onReady);
        tryPlay();
      };
      v.addEventListener("loadeddata", onReady);
    }
  };
  const onLeave = () => {
    setHover(false);
    const v = videoRef.current;
    if (v) { v.pause(); v.currentTime = 0; }
  };

  return (
    <Link
      to={`/trip/${trip.id}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`trip-card group relative block rounded-2xl bg-white shadow-soft hover:shadow-elevated hover:-translate-y-2 active:scale-[0.98] transition-all duration-300 overflow-hidden animate-fade-up border ${
        (isElite ?? trip.isElite)
          ? "border-yellow-400/60 shadow-[0_0_0_1px_rgba(234,179,8,0.3)] hover:shadow-[0_8px_32px_rgba(234,179,8,0.25)]"
          : "border-border hover:border-primary/30"
      }`}
    >
      {onToggleCompare && (
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleCompare(trip.id); }}
          className={`absolute top-3 left-3 z-20 h-7 px-2.5 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 shadow-soft ${
            compareSelected
              ? "bg-primary text-white scale-105"
              : "bg-black/70 backdrop-blur-sm text-white hover:bg-primary/90"
          }`}
        >
          {compareSelected ? "✓ Added to compare" : "+ Compare"}
        </button>
      )}
      <div className="trip-card-media relative aspect-[4/3] overflow-hidden bg-muted">
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
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${hover ? "opacity-100" : "opacity-0"}`}
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setVideoOk(false)}
          >
            <source src={trip.videoUrl} type="video/mp4" />
          </video>
        )}

        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />

        {/* Popular + Verified badges — pushed down to clear the compare button */}
        <div className="absolute top-12 left-3 flex flex-col items-start gap-1.5 z-10">
          {trip.popular && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-secondary text-secondary-foreground text-xs font-semibold shadow-soft">
              <Flame className="w-3.5 h-3.5" /> Popular
            </span>
          )}
          {company?.verified && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-success text-success-foreground text-[11px] font-extrabold shadow-soft">
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
          <Heart className={`w-[18px] h-[18px] transition-colors ${fav ? "fill-destructive stroke-destructive" : "stroke-foreground"}`} />
        </button>

        {(womensOnly ?? trip.womensOnly) && (
          <span className="absolute top-14 right-3 z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-pink-500 text-white text-[11px] font-extrabold shadow-soft">
            <Sparkles className="w-3 h-3" /> Women Only
          </span>
        )}

        {(isElite ?? trip.isElite) && (
          <span className="absolute top-14 right-3 z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gradient-to-r from-yellow-500 to-amber-600 text-white text-[11px] font-extrabold shadow-soft">
            <Crown className="w-3 h-3" /> Elite
          </span>
        )}

        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <span className="px-2.5 py-1 rounded-lg bg-background/90 backdrop-blur text-xs font-medium inline-flex items-center gap-1">
            <Clock className="w-3 h-3" /> {trip.duration}
          </span>
          <span className="trip-card-price px-3 py-1.5 rounded-xl bg-white text-primary text-sm font-extrabold shadow-soft">
            ₹{trip.price.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      <div className="trip-card-body p-4 space-y-3">
        <h3 className="trip-card-title font-display font-semibold text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {trip.title}
        </h3>

        {/* Brand identity block: Sold by */}
        <div
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (company) navigate(`/planner/${company.id}`);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && company) {
              e.preventDefault();
              navigate(`/planner/${company.id}`);
            }
          }}
          className="flex items-center gap-3 p-2.5 -mx-1 rounded-xl border border-border/50 hover:border-border hover:bg-muted/40 transition-colors cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 flex items-center justify-center text-xl shrink-0">
            {company?.logo}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Sold by</p>
            <p className="text-sm font-bold font-display truncate flex items-center gap-1">
              {company?.name}
              {company?.verified && <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0" />}
            </p>
          </div>
          <span className="text-[10px] font-semibold text-primary px-2 py-1 rounded-md bg-primary/10 shrink-0">
            View →
          </span>
        </div>

        {(() => {
          const total = trip.totalSeats ?? 20;
          const left = Math.max(0, total - trip.booked);
          const pct = Math.min(100, (trip.booked / total) * 100);
          const isUrgent = left <= Math.ceil(total * 0.3);

          return (
            <div className="pt-2 border-t border-border/60 space-y-2">
              <div className="flex items-center justify-between text-xs gap-2">
                <span className="flex items-center gap-1 font-semibold shrink-0">
                  <Star className="w-3.5 h-3.5 fill-secondary stroke-secondary" />
                  {trip.rating}
                </span>
                <span className={`flex items-center gap-1 min-w-0 truncate ${isUrgent ? "text-destructive font-semibold" : "text-muted-foreground"}`}>
                  <Flame className="w-3.5 h-3.5 text-destructive shrink-0" />
                  {trip.booked} booked of {total}
                  {isUrgent && ` · ${left} left!`}
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${isUrgent ? "bg-destructive" : "bg-primary"}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })()}
      </div>
    </Link>
  );
};

export default TripCard;
