import { Link } from "react-router-dom";
import { Star, Quote, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import AIChatWidget from "@/components/AIChatWidget";
import { reviews } from "@/data/reviews";

const Testimonials = () => {
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-background border-b">
        <div className="container py-16 text-center max-w-3xl">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/20 text-secondary-foreground text-xs font-semibold mb-4">
            <Star className="w-3.5 h-3.5 fill-secondary stroke-secondary" /> 4.8 average · 12,000+ travelers
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display leading-tight">
            Real travelers. <span className="text-primary">Real stories.</span>
          </h1>
          <p className="text-base text-muted-foreground mt-3">
            Hear from the squad — friends, solo travellers and groups who booked through Trippinity and came back with stories worth telling.
          </p>
        </div>
      </section>

      {/* Alternating cards */}
      <section className="container py-16 max-w-5xl space-y-10">
        {reviews.map((r, i) => {
          const reverse = i % 2 === 1;
          return (
            <article
              key={r.id}
              className={`grid md:grid-cols-[200px_1fr] gap-6 items-start p-6 sm:p-8 rounded-3xl border bg-card hover:shadow-card transition-shadow animate-fade-in ${
                reverse ? "md:[&>*:first-child]:order-2" : ""
              }`}
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="flex md:flex-col items-center md:items-start gap-3 md:gap-4">
                <img
                  src={r.avatar}
                  alt={r.user}
                  className="w-20 h-20 md:w-32 md:h-32 rounded-2xl object-cover shadow-soft"
                  loading="lazy"
                />
                <div>
                  <p className="font-bold">{r.user}</p>
                  <p className="text-xs text-muted-foreground">{r.city}</p>
                  <p className="text-xs text-muted-foreground mt-1">{r.date}</p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary">{r.tripTitle}</span>
                  <span className="flex items-center gap-1 text-sm font-bold">
                    {Array.from({ length: r.rating }).map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-secondary stroke-secondary" />
                    ))}
                  </span>
                </div>
                <Quote className="w-7 h-7 text-primary/30 mb-2" />
                <p className="text-base sm:text-lg text-foreground/90 leading-relaxed">
                  {r.text}
                </p>
                <Link
                  to={`/trip/${r.tripId}`}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary mt-4 hover:underline"
                >
                  See this trip <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          );
        })}
      </section>

      {/* Final CTA */}
      <section className="container pb-20">
        <div className="rounded-3xl bg-gradient-to-br from-primary to-accent text-primary-foreground p-10 text-center">
          <h2 className="text-3xl font-extrabold font-display">Your story starts here.</h2>
          <p className="opacity-90 mt-2">Browse curated trips from verified planners across India.</p>
          <Link
            to="/explore"
            className="inline-flex h-12 px-6 mt-5 rounded-xl bg-white text-primary font-semibold items-center gap-2 hover:scale-105 transition-transform"
          >
            Explore Trips <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
      <BottomNav />
      <AIChatWidget />
    </div>
  );
};

export default Testimonials;
