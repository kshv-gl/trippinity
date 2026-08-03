import SEO from "@/components/SEO";
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
  Plane,
  Mountain,
  Camera,
  Utensils,
  Sunset,
  Home,
  Sun,
  Moon,
  Compass,
  GitCompare,
  Bus,
  Train,
  Car,
  Bike,
} from "lucide-react";
import { toast } from "sonner";
import { CancellationPolicy, PaymentPolicy } from "@/components/CancellationPolicy";

const TRANSPORT_ICONS: Record<string, React.ElementType> = {
  Bus: Bus,
  Train: Train,
  Flight: Plane,
  "Self-drive": Car,
  Bike: Bike,
};

const dayIcons = [Plane, Mountain, Camera, Sunset, Utensils, Home, Compass];
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import ExitIntent from "@/components/ExitIntent";
import BookingModal from "@/components/BookingModal";
import Footer from "@/components/Footer";
import InclusionsExclusions from "@/components/InclusionsExclusions";
import LockedTripHubPreview from "@/components/LockedTripHubPreview";
import ReviewsSection from "@/components/ReviewsSection";
import AIChatWidget from "@/components/AIChatWidget";
import { mockTrips, companies } from "@/data/mockTrips";
import { useFavourites } from "@/hooks/useFavourites";
import { useBookingState } from "@/hooks/useBookingState";

type Tab = "itinerary" | "inclusions" | "reviews";

const TripDetails = () => {
  const { id } = useParams();
  const trip = mockTrips.find((t) => t.id === id);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [videoOk, setVideoOk] = useState(true);
  const [tab, setTab] = useState<Tab>("itinerary");
  const { isFav, toggle } = useFavourites();
  const { hasBooked } = useBookingState();

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
      <SEO
        title={`${trip.title} – ${trip.duration} | Trippinity`}
        description={`${trip.title}: ${trip.duration} curated trip from ₹${trip.price.toLocaleString()} in ${trip.destination}. Verified planner ${trip.plannerName} on Trippinity.`}
        path={`/trip/${trip.id}`}
        type="product"
        image={trip.image}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: trip.title,
          image: trip.gallery || [trip.image],
          description: `${trip.duration} curated trip in ${trip.destination} hosted by ${trip.plannerName}.`,
          brand: { "@type": "Organization", name: "Trippinity" },
          offers: {
            "@type": "Offer",
            price: trip.price,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            url: `https://trippinity-adventures-unlocked.lovable.app/trip/${trip.id}`,
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: trip.rating,
            reviewCount: Math.max(trip.booked || 0, 5),
          },
        }}
      />
      <Navbar />


      {/* Hero video banner */}
      <div className="relative h-[55vh] min-h-[380px] overflow-hidden bg-foreground">
        {trip.videoUrl && videoOk ? (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={trip.image}
            onError={() => setVideoOk(false)}
          >
            <source src={trip.videoUrl} type="video/mp4" />
          </video>
        ) : (
          <img src={trip.image} alt={trip.title} className="absolute inset-0 w-full h-full object-cover" />
        )}
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
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display max-w-3xl leading-tight break-words">{trip.title}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-4 text-sm">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/15 backdrop-blur font-medium">
                <Clock className="w-4 h-4" /> {trip.duration}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/15 backdrop-blur font-medium">
                <Calendar className="w-4 h-4" /> {trip.dates}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/15 backdrop-blur font-medium">
                <Star className="w-4 h-4 fill-secondary stroke-secondary" /> {trip.rating} · {trip.booked} reviews
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Trip Passport — at-a-glance summary */}
      <div className="container max-w-6xl pt-10">
        <div className="rounded-2xl border bg-card shadow-card p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3 mb-4">
            <p className="text-sm font-extrabold font-display flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-accent" /> Trip at a Glance
            </p>
            {trip.popular && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-secondary text-secondary-foreground text-[11px] font-bold">
                <Flame className="w-3.5 h-3.5" /> Trending
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { icon: Clock, label: "Duration", value: trip.duration },
              { icon: Calendar, label: "Dates", value: trip.dates },
              { icon: TRANSPORT_ICONS[trip.transportMode] ?? Plane, label: "Transport", value: trip.transportMode },
              { icon: MapPin, label: "Boards at", value: trip.assemblyPoint },
              { icon: Users, label: "Group size", value: `${trip.booked}+ booked` },
              { icon: Star, label: "Rating", value: `${trip.rating} / 5` },
            ].map((item) => {
              const Icon = item.icon as React.ElementType;
              return (
                <div key={item.label} className="p-3 rounded-xl bg-muted/40 border border-border/60">
                  <Icon className="w-4 h-4 text-primary mb-1.5" />
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-semibold break-words leading-snug">{item.value}</p>
                </div>
              );
            })}
          </div>

          {/* Price + CTA inline at bottom of passport */}
          <div className="mt-5 pt-5 border-t flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Price per person</p>
              <p className="text-lg font-extrabold text-primary">
                ₹{trip.price.toLocaleString("en-IN")} · Pay ₹{Math.round(trip.price * 0.25).toLocaleString("en-IN")} now
              </p>
            </div>
            <button
              onClick={() => setBookingOpen(true)}
              className="h-11 px-6 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors shadow-elevated"
            >
              Book This Trip
            </button>
          </div>
        </div>
      </div>

      {/* Photo gallery — emotional connect */}
      <div className="container max-w-6xl py-10">
        <div className="flex items-end justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-extrabold font-display flex items-center gap-2">
            <Camera className="w-5 h-5 text-primary" /> From past trips
          </h2>
          <p className="text-xs text-muted-foreground">Real photos · Real travelers</p>
        </div>
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 scrollbar-hide -mx-4 px-4">
          {trip.gallery.map((src, i) => (
            <div
              key={i}
              className="relative shrink-0 snap-start w-[260px] sm:w-[320px] aspect-[4/5] rounded-2xl overflow-hidden group animate-fade-up opacity-0"
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: "forwards" }}
            >
              <img src={src} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              {i === 0 && (
                <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded-lg bg-background/90 backdrop-blur text-xs font-bold inline-flex items-center gap-1 w-fit">
                  📸 By {trip.plannerName}
                </div>
              )}
            </div>
          ))}
          <div className="relative shrink-0 snap-start w-[260px] sm:w-[320px] aspect-[4/5] rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground flex flex-col items-center justify-center text-center p-6">
            <Users className="w-8 h-8 mb-3" />
            <p className="font-extrabold font-display text-lg leading-tight">Be part of the next group</p>
            <button
              onClick={() => setBookingOpen(true)}
              className="mt-4 h-10 px-4 rounded-xl bg-white text-primary font-bold text-sm hover:scale-105 transition-transform"
            >
              Book this trip →
            </button>
          </div>
        </div>
      </div>

      <div className="container py-10 grid lg:grid-cols-[1fr_360px] gap-10 max-w-6xl">
        <div className="space-y-10">
          {/* Trust strip */}
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { icon: ShieldCheck, label: "Verified planner" },
              { icon: CheckCircle2, label: "Free cancellation up to 7 days" },
              { icon: ShieldCheck, label: "Secure payment · Pay 25% now" },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-2 p-3 rounded-xl bg-muted/40 border text-sm font-medium">
                <b.icon className="w-4 h-4 text-accent" /> {b.label}
              </div>
            ))}
          </div>

          {/* Sold by — prominent brand identity */}
          <Link
            to={`/planner/${company?.id ?? ""}`}
            className="block p-5 rounded-2xl border bg-card hover:shadow-card transition-shadow"
          >
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-semibold">Sold by</p>
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

          {/* Cancellation & Payment policies */}
          <div className="space-y-3">
            <CancellationPolicy />
            <PaymentPolicy />
          </div>

          {/* Tabs */}
          <div className="flex bg-muted p-1 rounded-xl overflow-x-auto scrollbar-hide">
            {[
              { id: "itinerary", label: "Day-wise itinerary" },
              { id: "inclusions", label: "What's included" },
              { id: "reviews", label: `Reviews (${trip.booked})` },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id as Tab)}
                className={`flex-1 min-w-[140px] h-11 rounded-lg text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors ${
                  tab === t.id ? "bg-background shadow-soft" : "text-muted-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === "itinerary" && (
            <div className="animate-fade-in">
              <div className="space-y-4">
                {trip.itinerary.map((day, i) => {
                  const Icon = dayIcons[i % dayIcons.length];
                  const isLast = i === trip.itinerary.length - 1;
                  return (
                    <div
                      key={i}
                      className="flex gap-4 animate-fade-up opacity-0"
                      style={{ animationDelay: `${i * 80}ms`, animationFillMode: "forwards" }}
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground flex items-center justify-center shadow-soft shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        {!isLast && <div className="w-0.5 flex-1 bg-gradient-to-b from-accent/40 to-transparent mt-2" />}
                      </div>
                      <div className="flex-1 p-5 rounded-2xl border bg-card hover:shadow-soft transition-shadow mb-2">
                        <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded-lg bg-primary text-primary-foreground text-[11px] font-extrabold uppercase tracking-wider">
                              Day {i + 1}
                            </span>
                            {i === 0 && <span className="px-2 py-0.5 rounded-md bg-success/15 text-success text-[10px] font-bold uppercase">Arrival</span>}
                            {isLast && <span className="px-2 py-0.5 rounded-md bg-secondary/30 text-secondary-foreground text-[10px] font-bold uppercase">Departure</span>}
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                            <Sun className="w-3.5 h-3.5 text-secondary" />
                            <span>Morning – Evening</span>
                            <Moon className="w-3.5 h-3.5" />
                          </div>
                        </div>
                        <p className="text-sm text-foreground/90 font-semibold leading-snug">{day}</p>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {day.split(/[,&]/).slice(0, 3).map((activity, ai) => (
                            <span key={ai} className="text-[11px] px-2 py-1 rounded-full bg-muted text-foreground/80 font-medium">
                              {activity.trim().split(" ").slice(0, 4).join(" ")}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {tab === "inclusions" && (
            <div className="animate-fade-in">
              <InclusionsExclusions />
            </div>
          )}

          {tab === "reviews" && (
            <div className="animate-fade-in">
              <ReviewsSection tripId={trip.id} rating={trip.rating} totalBooked={trip.booked} />
            </div>
          )}

          {/* Locked Trip Hub teaser — only when not booked */}
          {!hasBooked && (
            <div>
              <h2 className="text-2xl font-extrabold font-display mb-4 flex items-center gap-2">
                Trip Hub
                <span className="text-xs font-medium text-muted-foreground">· unlocks after booking</span>
              </h2>
              <LockedTripHubPreview />
            </div>
          )}
        </div>

        {/* Sticky booking sidebar (desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 bg-card border rounded-2xl shadow-card p-6 space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-primary shrink-0">₹{trip.price.toLocaleString("en-IN")}</span>
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
            <button
              onClick={() => {
                const stored = JSON.parse(localStorage.getItem("compareIds") || "[]") as string[];
                if (stored.includes(trip.id)) {
                  const updated = stored.filter((id: string) => id !== trip.id);
                  localStorage.setItem("compareIds", JSON.stringify(updated));
                  toast("Removed from comparison");
                } else if (stored.length >= 3) {
                  toast.error("You can compare up to 3 trips at a time");
                } else {
                  const updated = [...stored, trip.id];
                  localStorage.setItem("compareIds", JSON.stringify(updated));
                  toast.success("Added to comparison! Go to Explore to compare →");
                }
              }}
              className="w-full h-10 rounded-xl border border-primary/30 text-primary text-sm font-semibold hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
            >
              <GitCompare className="w-4 h-4" /> Add to Compare
            </button>
            <div className="text-[11px] text-center text-muted-foreground space-y-1">
              <p>Pay just 25% (₹{Math.round(trip.price * 0.25).toLocaleString("en-IN")}) to confirm</p>
              <p className="flex items-center justify-center gap-1 font-semibold text-foreground/70">
                <ShieldCheck className="w-3 h-3 text-accent" /> Trusted by 500+ travelers
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* Sticky bottom CTA (mobile + tablet) */}
      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-lg border-t lg:hidden">
        <div className="container flex items-center justify-between py-3 gap-3">
          <div>
            <p className="text-xs text-muted-foreground">From</p>
            <p className="text-xl font-extrabold text-primary shrink-0">₹{trip.price.toLocaleString("en-IN")}</p>
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
      <AIChatWidget />
      <ExitIntent trip={trip} />
    </div>
  );
};

export default TripDetails;
