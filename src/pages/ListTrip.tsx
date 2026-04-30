import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, Clock, Wallet, TrendingUp, Quote } from "lucide-react";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";

const CATEGORIES = [
  { k: "trek", label: "Trek", emoji: "🏔️" },
  { k: "beach", label: "Beach", emoji: "🏖️" },
  { k: "cultural", label: "Cultural", emoji: "🏛️" },
  { k: "wildlife", label: "Wildlife", emoji: "🐘" },
  { k: "roadtrip", label: "Road trip", emoji: "🚗" },
  { k: "offbeat", label: "Offbeat", emoji: "🧭" },
];

const ListTrip = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: "",
    price: "",
    duration: "",
    maxGroup: "",
    dates: "",
    itinerary: "",
    image: "",
    plannerName: "",
    category: "",
  });

  const fieldsFilled = Object.values(form).filter(Boolean).length;
  const totalFields = Object.keys(form).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New Trip:", form);
    setSubmitted(true);
  };

  const setF = (k: keyof typeof form, v: string) => setForm({ ...form, [k]: v });

  return (
    <div className="min-h-screen pb-20 sm:pb-0">
      <Navbar />
      <div className="container py-8">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        {submitted ? (
          <div className="max-w-xl mx-auto text-center py-12 space-y-4 animate-fade-in">
            <CheckCircle className="w-16 h-16 text-success mx-auto" />
            <h2 className="text-2xl font-extrabold font-display">Trip Listed Successfully!</h2>
            <p className="text-muted-foreground">Your trip is now live for travelers to discover.</p>

            {/* Listing preview */}
            <div className="text-left max-w-sm mx-auto rounded-2xl border bg-card shadow-card overflow-hidden">
              {form.image && <div className="aspect-[4/3] bg-cover bg-center" style={{ backgroundImage: `url(${form.image})` }} />}
              <div className="p-4 space-y-2">
                <h3 className="font-display font-bold">{form.title || "Your trip"}</h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{form.duration}</span>
                  <span className="font-extrabold text-primary">₹{Number(form.price || 0).toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            <Link
              to="/"
              className="inline-flex h-11 px-6 items-center rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-2 space-y-4">
              <h1 className="text-3xl font-extrabold font-display">List your trip on Trippinity</h1>
              <p className="text-muted-foreground">Reach 12,000+ travelers actively booking group trips.</p>

              <div className="space-y-3 pt-2">
                {[
                  { icon: Clock, title: "List in 10 minutes", text: "Simple, no-fluff form. Go live today." },
                  { icon: Wallet, title: "You control pricing", text: "Set your own price, dates and group size." },
                  { icon: TrendingUp, title: "Get paid within 3 days", text: "Travelers pay 50% on booking." },
                ].map((b) => (
                  <div key={b.title} className="rounded-2xl bg-white border shadow-soft p-4 flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0">
                      <b.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-display font-semibold">{b.title}</p>
                      <p className="text-sm text-muted-foreground">{b.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border p-5 space-y-2">
                <p className="text-xs uppercase tracking-wider font-bold text-primary">Sample earnings</p>
                <p className="font-display text-2xl font-extrabold">A ₹10,000/person trip × 8 travelers</p>
                <p className="text-3xl font-extrabold text-primary">= ₹76,000 in your pocket</p>
                <p className="text-xs text-muted-foreground">After Trippinity's 5% marketplace fee.</p>
              </div>

              <div className="rounded-2xl border bg-card p-5">
                <Quote className="w-6 h-6 text-primary mb-2" />
                <p className="text-sm italic">"We doubled our bookings within 2 months of joining. The Trip Hub keeps travelers engaged."</p>
                <p className="text-xs text-muted-foreground mt-2 font-semibold">— Wander With Aman, verified planner</p>
              </div>
            </aside>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl bg-white border shadow-soft p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-xl font-extrabold">Trip details</h2>
                  <span className="text-xs font-semibold text-muted-foreground">
                    {fieldsFilled} of {totalFields} fields complete
                  </span>
                </div>
                <div className="h-1.5 bg-muted rounded-full mb-6 overflow-hidden">
                  <div className="h-full bg-primary transition-all" style={{ width: `${(fieldsFilled / totalFields) * 100}%` }} />
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Category */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Trip category</label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {CATEGORIES.map((c) => (
                        <button
                          key={c.k}
                          type="button"
                          onClick={() => setF("category", c.k)}
                          className={`px-2 py-3 rounded-xl border-2 text-xs font-semibold flex flex-col items-center gap-1 transition-colors ${
                            form.category === c.k ? "border-primary bg-primary/5 text-primary" : "border-border bg-card hover:border-border/80"
                          }`}
                        >
                          <span className="text-lg">{c.emoji}</span>
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Trip Title</label>
                    <input required value={form.title} onChange={(e) => setF("title", e.target.value)}
                      className="w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="e.g., Magical Manali Adventure" />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Price (₹)</label>
                      <input required type="number" value={form.price} onChange={(e) => setF("price", e.target.value)}
                        className="w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="12999" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Duration</label>
                      <input required value={form.duration} onChange={(e) => setF("duration", e.target.value)}
                        className="w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="4N / 5D" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Max group size</label>
                      <input required type="number" value={form.maxGroup} onChange={(e) => setF("maxGroup", e.target.value)}
                        className="w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="12" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Dates</label>
                    <input required value={form.dates} onChange={(e) => setF("dates", e.target.value)}
                      className="w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Apr 15 – Apr 19, 2026" />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Itinerary</label>
                    <textarea required value={form.itinerary} onChange={(e) => setF("itinerary", e.target.value)}
                      className="w-full min-h-[120px] px-4 py-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-y"
                      placeholder={"Day 1: Arrive in Manali...\nDay 2: Solang Valley..."} />
                    <p className="text-[11px] text-muted-foreground mt-1">One day per line. E.g., Day 1: Arrival in Manali...</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Image URL</label>
                    <input required value={form.image} onChange={(e) => setF("image", e.target.value)}
                      className="w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="https://..." />
                    {form.image && (
                      <div className="mt-2 w-32 h-20 rounded-lg bg-cover bg-center border" style={{ backgroundImage: `url(${form.image})` }} />
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Your Name</label>
                    <input required value={form.plannerName} onChange={(e) => setF("plannerName", e.target.value)}
                      className="w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Your full name" />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-opacity shadow-elevated"
                  >
                    Publish Trip
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default ListTrip;
