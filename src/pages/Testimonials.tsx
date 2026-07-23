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
      <SEO
        title="Traveller Reviews & Stories | Trippinity"
        description="Real reviews from travellers who booked curated group and solo-friendly trips through Trippinity."
        path="/testimonials"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "AggregateRating",
          itemReviewed: { "@type": "Organization", name: "Trippinity" },
          ratingValue: "4.8",
          reviewCount: "1200",
        }}
      />
      <Navbar />


      {/* Header */}
      <section className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-background border-b overflow-hidden">
        <span className="pointer-events-none absolute inset-x-0 top-2 text-center font-display font-extrabold text-[180px] sm:text-[260px] leading-none text-primary/[0.06] select-none">
          ★
        </span>
        <div className="relative container py-16 text-center max-w-3xl">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/20 text-secondary-foreground text-xs font-semibold mb-4">
            <Star className="w-3.5 h-3.5 fill-secondary stroke-secondary" /> Loved by travelers
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display leading-tight">
            Real travelers. <span className="text-primary">Real stories.</span>
          </h1>
          <p className="text-base text-muted-foreground mt-3">
            What our travelers say about their Trippinity experiences.
          </p>
        </div>
      </section>

      {/* Masonry columns */}
      <section className="container py-16 max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <article
              key={r.id}
              className="flex flex-col h-full p-5 rounded-2xl border bg-card hover:shadow-card transition-all hover:-translate-y-1 animate-fade-up opacity-0"
              style={{ animationDelay: `${i * 70}ms`, animationFillMode: "forwards" }}
            >
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    className={`w-4 h-4 ${s < r.rating ? "fill-secondary stroke-secondary" : "stroke-muted-foreground/40"}`}
                  />
                ))}
                <span className="ml-1 text-xs font-bold">{r.rating}</span>
              </div>
              <Quote className="w-5 h-5 text-primary/30 mb-1" />
              <p className="text-sm text-foreground/90 leading-relaxed">"{r.text}"</p>
              <Link
                to={`/trip/${r.tripId}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary mt-3 hover:underline"
              >
                See this trip <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <div className="flex items-center gap-3 mt-4 pt-4 border-t">
                <img src={r.avatar} alt={r.user} className="w-10 h-10 rounded-full object-cover" loading="lazy" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{r.user}</p>
                  <p className="text-xs text-muted-foreground truncate">{r.tripTitle}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
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
