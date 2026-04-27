import { ArrowRight, ShieldCheck, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { HERO_VIDEO, HERO_POSTER } from "@/data/mockTrips";

const Hero = () => {
  return (
    <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={HERO_POSTER}
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>
      <div className="absolute inset-0 hero-overlay" />

      <div className="relative z-10 container h-full flex flex-col justify-end pb-20 sm:pb-28 text-primary-foreground">
        <div className="max-w-3xl space-y-6 animate-fade-in">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium animate-fade-in" style={{ animationDelay: "60ms", animationFillMode: "backwards" }}>
            <ShieldCheck className="w-4 h-4 text-secondary" />
            Trusted by 12,000+ travelers · 4.8 ★
          </span>
          <h1
            className="font-display text-5xl sm:text-7xl font-extrabold leading-[1.02] tracking-tight animate-fade-in"
            style={{ animationDelay: "140ms", animationFillMode: "backwards" }}
          >
            The Amazon
            <br />
            <span className="text-secondary">for Trips.</span>
          </h1>
          <p
            className="text-lg sm:text-2xl text-white/90 max-w-xl font-medium animate-fade-in"
            style={{ animationDelay: "260ms", animationFillMode: "backwards" }}
          >
            Compare trips. Book smarter.
          </p>
          <p
            className="text-sm sm:text-base text-white/70 max-w-xl animate-fade-in"
            style={{ animationDelay: "320ms", animationFillMode: "backwards" }}
          >
            Group trips are the ultimate way to socialise. ✨
          </p>
          <div
            className="flex flex-wrap items-center gap-3 pt-2 animate-fade-in"
            style={{ animationDelay: "380ms", animationFillMode: "backwards" }}
          >
            <Link
              to="/explore"
              className="group inline-flex items-center gap-2 h-14 px-7 rounded-2xl bg-secondary text-secondary-foreground font-semibold text-base hover:bg-secondary/90 transition-all shadow-elevated hover:scale-[1.03]"
            >
              Explore Trips <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 h-14 px-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 text-white font-medium hover:bg-white/20 transition-colors"
            >
              Browse destinations
            </Link>
          </div>

          <div
            className="flex flex-wrap gap-x-6 gap-y-2 pt-6 text-sm text-white/85 animate-fade-in"
            style={{ animationDelay: "500ms", animationFillMode: "backwards" }}
          >
            <span className="flex items-center gap-2"><Star className="w-4 h-4 fill-secondary stroke-secondary" /> 4.8 rating</span>
            <span className="flex items-center gap-2"><Users className="w-4 h-4" /> 12,000+ travelers</span>
            <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> 100% verified planners</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
