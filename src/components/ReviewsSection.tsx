import { Star } from "lucide-react";
import { getReviewsForTrip } from "@/data/reviews";

const ReviewsSection = ({ tripId, rating, totalBooked }: { tripId: string; rating: number; totalBooked: number }) => {
  const list = getReviewsForTrip(tripId);

  return (
    <div>
      <div className="flex items-end justify-between mb-4">
        <h2 className="text-2xl font-extrabold font-display flex items-center gap-2">
          <Star className="w-6 h-6 fill-secondary stroke-secondary" />
          {rating} · {totalBooked} reviews
        </h2>
      </div>

      {list.length === 0 ? (
        <div className="rounded-2xl border bg-muted/30 p-6 text-sm text-muted-foreground text-center">
          Reviews from past travelers will appear here once they return from this trip.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {list.map((r) => (
            <article key={r.id} className="p-5 rounded-2xl border bg-card hover:shadow-soft transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <img src={r.avatar} alt={r.user} className="w-11 h-11 rounded-full object-cover" loading="lazy" />
                <div className="flex-1">
                  <p className="font-semibold text-sm">{r.user}</p>
                  <p className="text-xs text-muted-foreground">{r.city} · {r.date}</p>
                </div>
                <span className="flex items-center gap-1 text-sm font-bold">
                  <Star className="w-3.5 h-3.5 fill-secondary stroke-secondary" />
                  {r.rating}
                </span>
              </div>
              <p className="text-sm text-foreground/85 leading-relaxed">"{r.text}"</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;
