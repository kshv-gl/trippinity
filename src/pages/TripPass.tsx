import { useState } from "react";
import { Download, Share2, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import SEO from "@/components/SEO";
import { mockTrips } from "@/data/mockTrips";

const TripPass = () => {
  const [form, setForm] = useState({
    travelerName: "",
    parentName: "",
    tripId: "",
  });
  const [generated, setGenerated] = useState(false);

  const selectedTrip = mockTrips.find((t) => t.id === form.tripId);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.travelerName || !form.parentName || !form.tripId) return;
    setGenerated(true);
  };

  const handleDownload = () => window.print();

  const handleShare = async () => {
    const text = `My Trippinity Trip Pass for ${selectedTrip?.title}! ${window.location.href}`;
    if (navigator.share) {
      await navigator.share({ title: "My Trip Pass", text });
    } else {
      await navigator.clipboard.writeText(text);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <SEO
        title="Trip Pass | Trippinity"
        description="Generate a formal (but fun) travel permission letter for your parents, with verified trip details from Trippinity."
        path="/trip-pass"
      />
      <Navbar />
      <div className="container max-w-3xl py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display">Trip Pass</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Generate a formal (but fun) permission letter for your parents.
          </p>
        </div>

        {!generated ? (
          <form onSubmit={handleGenerate} className="bg-card border rounded-2xl shadow-card p-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Your Name</label>
              <input
                value={form.travelerName}
                onChange={(e) => setForm({ ...form, travelerName: e.target.value })}
                placeholder="e.g. Aanya Kapoor"
                className="w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Parent / Guardian Name</label>
              <input
                value={form.parentName}
                onChange={(e) => setForm({ ...form, parentName: e.target.value })}
                placeholder="e.g. Sunita Kapoor"
                className="w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Select Trip</label>
              <select
                value={form.tripId}
                onChange={(e) => setForm({ ...form, tripId: e.target.value })}
                className="w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="">Choose a trip...</option>
                {mockTrips.map((t) => (
                  <option key={t.id} value={t.id}>{t.title}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors shadow-elevated"
            >
              Generate My Trip Pass
            </button>
          </form>
        ) : (
          <div className="space-y-5">
            {/* The Trip Pass Card */}
            <div className="bg-card border rounded-2xl shadow-card overflow-hidden">
              <div className="bg-gradient-to-br from-primary to-accent text-primary-foreground p-6 text-center">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-80">Official Document</p>
                <h2 className="text-2xl font-extrabold font-display mt-1">Trippinity Travel Pass</h2>
                <p className="text-xs opacity-85 mt-1">Issued with great seriousness (and a pinch of humour)</p>
              </div>

              <div className="p-6 space-y-5 text-sm leading-relaxed">
                <p className="text-xs text-muted-foreground">
                  Date: {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                </p>

                <div>
                  <p>To,</p>
                  <p className="font-bold">{form.parentName}</p>
                  <p className="text-muted-foreground text-xs">Respected Parent / Guardian</p>
                </div>

                <p className="font-semibold">
                  Subject: Formal Request for Travel Permission, with Verified Assurances
                </p>

                <div className="space-y-4">
                  <p>Dear {form.parentName},</p>
                  <p>
                    We, the Trippinity Travel Assurance Committee (unofficial but deeply concerned), write to formally
                    request your gracious permission to allow {form.travelerName} to embark upon the following verified
                    group expedition:
                  </p>
                  <div className="rounded-xl border bg-muted/40 p-4 space-y-1.5 text-sm">
                    <p className="flex justify-between gap-4"><span className="text-muted-foreground">Trip</span><span className="font-semibold text-right">{selectedTrip?.title}</span></p>
                    <p className="flex justify-between gap-4"><span className="text-muted-foreground">Destination</span><span className="font-semibold text-right">{selectedTrip?.destination}</span></p>
                    <p className="flex justify-between gap-4"><span className="text-muted-foreground">Dates</span><span className="font-semibold text-right">{selectedTrip?.dates}</span></p>
                    <p className="flex justify-between gap-4"><span className="text-muted-foreground">Trip Leader</span><span className="font-semibold text-right">{selectedTrip?.plannerName} (Verified by Trippinity)</span></p>
                    <p className="flex justify-between gap-4"><span className="text-muted-foreground">Price</span><span className="font-semibold text-right">₹{selectedTrip?.price.toLocaleString("en-IN")} per person</span></p>
                  </div>
                  <p>
                    We solemnly assure you that the trip leader is background-verified, the accommodations are
                    hand-picked, the itinerary is structured, and there will be at least two responsible adults present
                    at all times (not counting your child).
                  </p>
                  <p>
                    Your ward has excellent taste in travel. We wholeheartedly endorse this adventure and kindly request
                    you to consider this letter as Exhibit A in their case for permission.
                  </p>
                  <p className="font-semibold">Yours in itinerary planning,</p>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold font-display">Trippinity</p>
                      <p className="text-xs text-muted-foreground">Verified Group Travel Marketplace</p>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-muted-foreground border-t pt-4 leading-relaxed">
                  Disclaimer: Trippinity ensures a verified and structured booking experience. However, Trippinity is
                  not responsible for the traveler's personal decisions, actions, or any unsanctioned adventures
                  undertaken during the trip. Any homesickness, unplanned shopping, or sudden desire to "live in the
                  mountains forever" is entirely the traveler's own doing.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleDownload}
                className="h-12 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" /> Download Pass
              </button>
              <button
                onClick={handleShare}
                className="h-12 rounded-xl border-2 border-primary text-primary font-bold text-sm hover:bg-primary/5 transition-colors inline-flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
            <button
              onClick={() => setGenerated(false)}
              className="w-full text-sm text-muted-foreground hover:text-foreground text-center py-2 transition-colors"
            >
              Generate another pass
            </button>
          </div>
        )}
      </div>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default TripPass;
