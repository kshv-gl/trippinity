import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Download, Share2, Sparkles, PartyPopper, Copy, Check, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import SEO from "@/components/SEO";
import { mockTrips } from "@/data/mockTrips";
import { useAuth } from "@/hooks/useAuth";

const TripPass = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
    travelerName: user?.name || "",
    parentName: "",
    tripId: searchParams.get("trip") || "",
  });
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [docNo] = useState(() => Math.random().toString(36).substring(2, 7).toUpperCase());

  const selectedTrip = mockTrips.find((t) => t.id === form.tripId);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.travelerName || !form.parentName || !form.tripId) return;
    setGenerated(true);
  };

  const handleCopyText = async () => {
    const text = `Dear ${form.parentName}, this is an official notice from Trippinity that ${form.travelerName} has expressed a strong desire to attend "${selectedTrip?.title}" (${selectedTrip?.dates}). The trip is verified, the planner is background-checked, and your child's wanderlust cannot be contained. Please grant permission. Thank you.`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "My Permission Slip",
        text: `I just got my Permission Slip from Trippinity for ${selectedTrip?.title}!`,
      });
    } else {
      handleCopyText();
    }
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <SEO
        title="Permission Slip | Trippinity"
        description="Make it official. Generate a ridiculously formal (and very persuasive) travel permission slip for your parents."
        path="/trip-pass"
      />
      <Navbar />

      <div className="container max-w-3xl py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" /> New feature
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display mt-3">Permission Slip</h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-lg mx-auto">
            Make it official. Get your parents to say yes with a ridiculously formal letter from us.
          </p>
        </div>

        {!generated ? (
          <form onSubmit={handleGenerate} className="bg-card border rounded-2xl shadow-card p-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Your name (the accused)</label>
              <input
                value={form.travelerName}
                onChange={(e) => setForm({ ...form, travelerName: e.target.value })}
                placeholder="e.g. Aanya Kapoor"
                className="w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Parent / guardian name (the decision maker)</label>
              <input
                value={form.parentName}
                onChange={(e) => setForm({ ...form, parentName: e.target.value })}
                placeholder="e.g. Sunita Kapoor"
                className="w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Which trip are you trying to escape to?</label>
              <select
                value={form.tripId}
                onChange={(e) => setForm({ ...form, tripId: e.target.value })}
                className="w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="">Pick your adventure...</option>
                {mockTrips.map((t) => (
                  <option key={t.id} value={t.id}>{t.title}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors shadow-elevated inline-flex items-center justify-center gap-2"
            >
              <PartyPopper className="w-4 h-4" /> Generate My Permission Slip
            </button>
            <p className="text-[11px] text-center text-muted-foreground">
              No actual legal authority. But still very official-looking.
            </p>
          </form>
        ) : (
          <div className="space-y-5">
            {/* The Permission Slip Card */}
            <div className="bg-card border rounded-2xl shadow-card overflow-hidden">
              {/* Top ribbon */}
              <div className="bg-gradient-to-br from-primary to-accent text-primary-foreground p-6 text-center">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-80">
                  Official Document No. TRP-{docNo}
                </p>
                <h2 className="text-2xl font-extrabold font-display mt-1">Permission Slip</h2>
                <p className="text-xs opacity-85 mt-1">
                  Issued by Trippinity · Legally unenforceable but emotionally persuasive
                </p>
              </div>

              {/* Body */}
              <div className="p-6 space-y-5 text-sm leading-relaxed">
                <p className="text-xs text-muted-foreground">
                  Date: {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                </p>

                <div>
                  <p>To,</p>
                  <p className="font-bold">{form.parentName}</p>
                  <p className="text-muted-foreground text-xs">Guardian, Rule-Maker, Final Decision Authority</p>
                </div>

                <p className="font-semibold">
                  Subject: Urgent Request for Travel Permission (This is important, please read fully)
                </p>

                <div className="space-y-4">
                  <p>Dear {form.parentName},</p>

                  <p>
                    We, the Trippinity Travel Authorization Committee, are reaching out on behalf of one{" "}
                    {form.travelerName}, who has formally lodged a request (several times, we are told) to attend the
                    following expedition:
                  </p>

                  {/* Trip details block */}
                  <div className="rounded-xl border bg-muted/40 p-4">
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        { l: "Trip Name", v: selectedTrip?.title },
                        { l: "Destination", v: selectedTrip?.destination },
                        { l: "Dates", v: selectedTrip?.dates },
                        { l: "Duration", v: selectedTrip?.duration },
                        { l: "Trip Leader", v: selectedTrip?.plannerName },
                        { l: "Price", v: `₹${selectedTrip?.price.toLocaleString("en-IN")} per person` },
                        { l: "Assembly Point", v: selectedTrip?.assemblyPoint },
                        { l: "Verification Status", v: "Fully Verified by Trippinity" },
                      ].map(({ l, v }) => (
                        <div key={l} className="min-w-0">
                          <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{l}</p>
                          <p className="font-semibold break-words">{v}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p>
                    We would like to formally assure you that the trip leader ({selectedTrip?.plannerName}) has been
                    background-verified, the group has been curated, the accommodations have been hand-picked, and
                    there will be structured check-ins throughout the trip. Basically, we have done the adulting so{" "}
                    {form.travelerName} doesn't have to.
                  </p>

                  <p>
                    Your ward's wanderlust is real, their bank account is ready (25% deposit confirms the booking), and
                    their bags are metaphorically already packed. We respectfully ask you to consider this letter as
                    conclusive evidence that this is a responsible, safe, and genuinely amazing trip.
                  </p>

                  <p>
                    Should you have any concerns, please note that Trippinity has a 24x7 safety support line, a
                    verified planner on ground, and a group of equally excited co-travelers who will collectively make
                    sure nothing goes wrong.
                  </p>

                  <p className="font-semibold">We trust your wisdom. We believe in your generosity. Please say yes.</p>

                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold font-display">Trippinity</p>
                      <p className="text-xs text-muted-foreground">India's most verified group travel marketplace</p>
                    </div>
                  </div>
                </div>

                {/* Disclaimer */}
                <p className="text-[11px] text-muted-foreground border-t pt-4 leading-relaxed">
                  Fine Print: Trippinity guarantees a verified, structured, and safe booking experience. However,
                  Trippinity accepts zero responsibility for: the traveler's personal decisions, unplanned purchases of
                  local handicrafts, sudden desires to move to the mountains permanently, new friendships that result
                  in future unapproved trips, or any personality upgrades that occur as a result of this experience.
                  You've been warned (in the best way possible).
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => window.print()}
                className="h-12 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Save PDF
              </button>
              <button
                onClick={handleShare}
                className="h-12 rounded-xl border-2 border-primary text-primary font-bold text-sm hover:bg-primary/5 transition-colors inline-flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button
                onClick={handleCopyText}
                className="h-12 rounded-xl border font-bold text-sm hover:bg-muted transition-colors inline-flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy text"}
              </button>
            </div>

            <button
              onClick={() => setGenerated(false)}
              className="w-full text-sm text-center text-muted-foreground hover:text-foreground py-2 transition-colors"
            >
              Need one for a different trip?
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
