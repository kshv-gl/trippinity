import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ArrowLeft, Star, ShieldCheck, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import TripCard from "@/components/TripCard";
import { mockTrips, companies } from "@/data/mockTrips";

const PlannerProfile = () => {
  const { slug } = useParams();
  const plannerTrips = mockTrips.filter(
    (t) => t.plannerName.toLowerCase().replace(/\s+/g, "-") === slug
  );
  const planner = plannerTrips[0];

  if (!planner) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Planner not found</h1>
          <Link to="/" className="text-primary hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  const company = companies[planner.companyId];
  const avgRating = (plannerTrips.reduce((s, t) => s + t.rating, 0) / plannerTrips.length).toFixed(1);
  const totalBooked = plannerTrips.reduce((s, t) => s + t.booked, 0);

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navbar />

      {/* Cover */}
      <div className="relative h-48 sm:h-64 bg-gradient-to-br from-primary to-accent overflow-hidden">
        <img src={planner.image} alt="" className="w-full h-full object-cover opacity-30" />
        <Link to="/" className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-background/80 backdrop-blur flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </div>

      <div className="container max-w-5xl -mt-16 relative z-10 space-y-8">
        {/* Header card */}
        <div className="bg-card border rounded-2xl p-6 sm:p-8 shadow-card flex flex-col sm:flex-row gap-5 items-start">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/15 flex items-center justify-center text-4xl shrink-0">
            {company?.logo}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-extrabold font-display">{company?.name}</h1>
              {company?.verified && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                  <ShieldCheck className="w-3 h-3" /> Verified
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">Hosted by <span className="font-medium text-foreground">{planner.plannerName}</span></p>
            <div className="flex flex-wrap gap-4 mt-4 text-sm">
              <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-secondary stroke-secondary" /> <strong>{avgRating}</strong> · {plannerTrips.length} trips</span>
              <span className="flex items-center gap-1 text-muted-foreground">{totalBooked}+ travelers hosted</span>
              <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="w-4 h-4" /> India</span>
            </div>
          </div>
          <Link
            to="/contact"
            className="h-11 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold inline-flex items-center hover:bg-primary/90 transition-colors"
          >
            Contact planner
          </Link>
        </div>

        {/* About */}
        <div className="bg-muted/40 rounded-2xl p-6">
          <h2 className="font-bold mb-2">About</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{company?.about}</p>
          <p className="text-sm text-muted-foreground leading-relaxed mt-2">{planner.plannerAbout}</p>
        </div>

        {/* Current listings */}
        <div>
          <h2 className="text-xl font-bold mb-4">Current listings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plannerTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </div>

        {/* Past trips (mock — other trips from same company) */}
        <div>
          <h2 className="text-xl font-bold mb-1">Past trips</h2>
          <p className="text-sm text-muted-foreground mb-4">Successfully hosted journeys by {company?.name}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { title: "Spiti Winter Circuit", year: "2025", travelers: 18 },
              { title: "Kasol & Kheerganga Trek", year: "2024", travelers: 24 },
              { title: "Kashmir Great Lakes", year: "2024", travelers: 12 },
            ].map((p) => (
              <div key={p.title} className="p-4 rounded-2xl border bg-card hover:shadow-soft transition-shadow">
                <div className="flex items-center gap-1 text-xs text-success mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Completed · {p.year}
                </div>
                <p className="font-semibold text-sm">{p.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{p.travelers} travelers · ⭐ 4.8 avg</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default PlannerProfile;
