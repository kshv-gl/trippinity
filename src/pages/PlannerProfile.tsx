import AIChatWidget from "@/components/AIChatWidget";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Star, ShieldCheck, MapPin, Mail, Map, Users, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import TripCard from "@/components/TripCard";
import { mockTrips, companies } from "@/data/mockTrips";

const PlannerProfile = () => {
  const { slug } = useParams();

  const plannerTrips = mockTrips.filter((t) => {
    const companyMatch = t.companyId === slug;
    const nameMatch = t.plannerName.toLowerCase().replace(/\s+/g, "-") === slug;
    return companyMatch || nameMatch;
  });
  const planner = plannerTrips[0];
  const company = planner
    ? companies[planner.companyId]
    : Object.values(companies).find((c) => c.id === slug);

  if (!company) {
    return (
      <div className="min-h-screen pb-20 md:pb-0">
        <Navbar />
        <div className="container max-w-xl mx-auto py-24 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-muted flex items-center justify-center">
            <Map className="w-7 h-7 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-extrabold font-display">Operator not found</h1>
          <p className="text-sm text-muted-foreground">This operator profile doesn't exist or has been removed.</p>
          <Link to="/explore" className="inline-flex h-11 px-5 rounded-xl bg-primary text-primary-foreground font-semibold items-center hover:bg-primary/90 transition-colors">
            Browse all trips
          </Link>
        </div>
      </div>
    );
  }

  const totalHosted = plannerTrips.reduce((s, t) => s + t.booked, 0);

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navbar />

      {/* Cover */}
      <div className="relative h-48 sm:h-64 bg-gradient-to-br from-primary to-accent overflow-hidden">
        {planner && <img src={planner.image} alt="" className="w-full h-full object-cover opacity-30" />}
        <Link to="/" className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-background/80 backdrop-blur flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </div>

      <div className="container max-w-5xl -mt-16 relative z-10 space-y-8">
        {/* Header card */}
        <div className="bg-card border rounded-2xl p-6 sm:p-8 shadow-card flex flex-col sm:flex-row gap-5 items-start animate-fade-up">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/15 flex items-center justify-center text-4xl shrink-0">
            {company.logo}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-extrabold font-display">{company.name}</h1>
              {company.verified && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-success text-success-foreground text-xs font-bold">
                  <ShieldCheck className="w-3 h-3" /> Verified Operator
                </span>
              )}
            </div>
            {planner && (
              <p className="text-sm text-muted-foreground mt-1">
                Hosted by <span className="font-medium text-foreground">{planner.plannerName}</span>
              </p>
            )}
            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-sm">
              <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-secondary stroke-secondary" /> <strong>{company.rating}</strong></span>
              <span className="text-muted-foreground">{company.trips} trips listed</span>
              {plannerTrips.length > 0 && (
                <span className="text-muted-foreground">{totalHosted}+ travelers hosted</span>
              )}
              <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="w-4 h-4" /> India</span>
              <span className="flex items-center gap-1 text-muted-foreground"><Clock className="w-4 h-4" /> Replies within 2 hours</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <a
              href={`mailto:contact@trippinity.com?subject=Inquiry about ${company.name}`}
              className="h-11 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold inline-flex items-center gap-2 hover:bg-primary/90 transition-colors"
            >
              <Mail className="w-4 h-4" /> Contact operator
            </a>
            <p className="text-[11px] text-muted-foreground">contact@trippinity.com</p>
          </div>
        </div>

        {/* About */}
        <div className="bg-muted/40 rounded-2xl p-6">
          <h2 className="font-bold mb-2">About {company.name}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{company.about}</p>
          {planner?.plannerAbout && (
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">{planner.plannerAbout}</p>
          )}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Avg rating", value: company.rating, icon: Star },
            { label: "Trips listed", value: company.trips, icon: Map },
            { label: "Travelers hosted", value: `${totalHosted || 0}+`, icon: Users },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border bg-card p-4 text-center">
              <s.icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-xl font-extrabold font-display">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Current listings */}
        {plannerTrips.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Current listings</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {plannerTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          </div>
        )}

        {/* Past trips */}
        <div>
          <h2 className="text-xl font-bold mb-1">Past trips</h2>
          <p className="text-sm text-muted-foreground mb-4">Successfully hosted by {company.name}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { title: "Spiti Winter Circuit", year: "2025", travelers: 18, rating: 4.9 },
              { title: "Kasol & Kheerganga Trek", year: "2024", travelers: 24, rating: 4.8 },
              { title: "Kashmir Great Lakes", year: "2024", travelers: 12, rating: 5.0 },
            ].map((p) => (
              <div key={p.title} className="p-4 rounded-2xl border bg-card hover:shadow-soft transition-shadow">
                <div className="flex items-center gap-1 text-xs text-success mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Completed · {p.year}
                </div>
                <p className="font-semibold text-sm">{p.title}</p>
                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  <span>{p.travelers} travelers</span>
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-secondary stroke-secondary" /> {p.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      <BottomNav />
      <AIChatWidget />
    </div>
  );
};

export default PlannerProfile;
