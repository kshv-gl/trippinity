import AIChatWidget from "@/components/AIChatWidget";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import { ShieldCheck, Heart, Users, Sparkles } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <SEO
        title="About Trippinity | Curated Trips, Verified Planners"
        description="Trippinity connects travellers with verified local planners. Learn how our marketplace curates trips and protects your booking."
        path="/about"
      />
      <Navbar />

      <section className="relative h-[40vh] min-h-[320px] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80" alt="About Trippinity" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 container h-full flex items-end pb-10 text-white">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-display">About Trippinity</h1>
            <p className="mt-2 text-white/85 max-w-xl">The Amazon for trips — bringing curated journeys and verified planners under one roof.</p>
          </div>
        </div>
      </section>

      <div className="container py-12 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold font-display">Why we exist</h2>
          <p className="text-muted-foreground leading-relaxed">
            Booking a trip today means juggling 20 tabs, comparing planner WhatsApp PDFs, and hoping you picked the
            right one. Trippinity changes that. We bring verified planning companies, transparent pricing, and real
            traveler reviews together so you can choose with confidence — and travel with joy.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-4">
            {[
              { icon: ShieldCheck, title: "Verified planners only", desc: "Every company is vetted before being listed." },
              { icon: Heart, title: "Built for travelers", desc: "Designed to reduce decision fatigue, not add to it." },
              { icon: Users, title: "Group-first features", desc: "Trip Hub turns booking into a shared experience." },
              { icon: Sparkles, title: "Curated, not generic", desc: "Itineraries crafted by locals who actually go there." },
            ].map((item) => (
              <div key={item.title} className="p-5 rounded-2xl bg-muted/50 border">
                <item.icon className="w-6 h-6 text-primary mb-2" />
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="bg-card border rounded-2xl p-6 shadow-soft h-fit">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center text-xl font-bold">
              KG
            </div>
            <div>
              <p className="font-bold">Keshav Goel</p>
              <p className="text-xs text-muted-foreground">Founder, Trippinity</p>
            </div>
          </div>
          <blockquote className="mt-4 text-sm text-muted-foreground leading-relaxed border-l-2 border-primary pl-4">
            "I started Trippinity because I believe planning a trip should feel as exciting as the trip itself. Our goal
            is to make travel discovery transparent, trustworthy, and fun — for every Indian traveler."
          </blockquote>
        </aside>
      </div>
      <Footer />
      <BottomNav />
      <AIChatWidget />

    </div>
  );
};

export default About;
