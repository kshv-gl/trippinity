import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle2, Star, MapPin, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import AIChatWidget from "@/components/AIChatWidget";
import { mockTrips } from "@/data/mockTrips";

const Compare = () => {
  const [params] = useSearchParams();
  const ids = params.get("ids")?.split(",") ?? [];
  const trips = ids
    .map((id) => mockTrips.find((t) => t.id === id))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  if (trips.length < 2) {
    return (
      <div className="min-h-screen pb-20 md:pb-0">
        <Navbar />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-extrabold font-display mb-3">Select 2–3 trips to compare</h1>
          <Link to="/explore" className="text-primary font-semibold hover:underline">
            Browse trips →
          </Link>
        </div>
      </div>
    );
  }

  type T = (typeof trips)[number];
  const rows: { label: string; render: (t: T) => string }[] = [
    { label: "Price", render: (t) => `₹${t.price.toLocaleString("en-IN")} / person` },
    { label: "Duration", render: (t) => t.duration },
    { label: "Dates", render: (t) => t.dates },
    { label: "Location", render: (t) => t.location },
    { label: "Rating", render: (t) => `⭐ ${t.rating}` },
    { label: "Bookings", render: (t) => `${t.booked}+ booked` },
    { label: "Pay now (25%)", render: (t) => `₹${Math.round(t.price * 0.25).toLocaleString("en-IN")}` },
  ];

  const cols = `200px repeat(${trips.length}, 1fr)`;

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navbar />
      <div className="container max-w-6xl py-10">
        <div className="flex items-center gap-3 mb-8">
          <Link to="/explore" className="w-10 h-10 rounded-xl border bg-card flex items-center justify-center hover:bg-muted transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold font-display">Trip comparison</h1>
            <p className="text-sm text-muted-foreground">Comparing {trips.length} trips side by side</p>
          </div>
        </div>

        <div className="grid gap-3" style={{ gridTemplateColumns: cols }}>
          <div />
          {trips.map((t) => (
            <div key={t.id} className="rounded-2xl border bg-card overflow-hidden">
              <img src={t.image} alt={t.title} className="w-full h-32 object-cover" loading="lazy" />
              <div className="p-3">
                <p className="font-bold text-sm line-clamp-2">{t.title}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3" /> {t.location}
                </p>
              </div>
            </div>
          ))}

          {rows.map((row) => (
            <>
              <div key={`l-${row.label}`} className="text-xs font-bold uppercase tracking-wider text-muted-foreground self-center">
                {row.label}
              </div>
              {trips.map((t) => (
                <div key={`${row.label}-${t.id}`} className="p-3 rounded-xl bg-muted/40 text-sm font-semibold">
                  {row.render(t)}
                </div>
              ))}
            </>
          ))}

          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground pt-3">Itinerary</div>
          {trips.map((t) => (
            <div key={`it-${t.id}`} className="p-3 rounded-xl bg-muted/40">
              <ul className="space-y-1.5">
                {t.itinerary.slice(0, 3).map((day, i) => (
                  <li key={i} className="text-xs flex items-start gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-success mt-0.5 shrink-0" /> {day}
                  </li>
                ))}
                {t.itinerary.length > 3 && (
                  <p className="text-[11px] text-muted-foreground">+{t.itinerary.length - 3} more days</p>
                )}
              </ul>
            </div>
          ))}

          <div />
          {trips.map((t) => (
            <Link
              key={`cta-${t.id}`}
              to={`/trip/${t.id}`}
              className="h-11 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-bold inline-flex items-center justify-center hover:bg-primary/90 transition-colors"
            >
              Book this trip <Star className="w-4 h-4 ml-1.5 fill-secondary stroke-secondary" />
            </Link>
          ))}
        </div>
      </div>
      <Footer />
      <BottomNav />
      <AIChatWidget />
    </div>
  );
};

export default Compare;
