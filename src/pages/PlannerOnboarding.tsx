import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Upload, ShieldCheck, ChevronRight, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import SEO from "@/components/SEO";

const STEPS = ["Company Info", "Verification", "First Trip", "Go Live"];

const PlannerOnboarding = () => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    companyName: "", ownerName: "", email: "", phone: "",
    city: "", state: "", website: "", description: "",
    gst: "", panCard: "", yearsActive: "", tripsPerYear: "",
    tripTitle: "", tripPrice: "", tripDuration: "", tripDestination: "",
  });

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const inputClass = "w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all";
  const labelClass = "text-sm font-semibold block mb-1.5 text-foreground";

  if (submitted) {
    return (
      <div className="min-h-screen pb-20 md:pb-0">
        <SEO
          title="Planner Application Received | Trippinity"
          description="Your planner application is under review. Verification takes up to 48 hours."
          path="/planner-onboarding"
        />
        <Navbar />
        <div className="container max-w-xl py-20 text-center space-y-5">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-green-50 border border-green-200 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-extrabold font-display">You&apos;re on the list!</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Our team will verify your details within 48 hours. Once approved, you&apos;ll get access to your Planner Dashboard to manage trips, bookings, and traveler communications.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link to="/planner-dashboard" className="h-12 px-6 rounded-xl bg-primary text-white font-bold text-sm inline-flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
              <ShieldCheck className="w-4 h-4" /> Preview your Dashboard
            </Link>
            <Link to="/" className="h-12 px-6 rounded-xl border font-semibold text-sm inline-flex items-center justify-center hover:bg-muted transition-colors">
              Back to Trippinity
            </Link>
          </div>
        </div>
        <Footer />
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <SEO
        title="List Your Trips as a Verified Planner | Trippinity"
        description="Join Trippinity as a verified trip planner. Zero listing fees, a digital storefront, and access to 12,000+ travelers."
        path="/planner-onboarding"
      />
      <Navbar />

      <div className="container max-w-3xl py-10">
        {/* Hero */}
        <div className="text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" /> For Trip Planners
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight">
            List your trips.<br />Reach 12,000+ travelers.
          </h1>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Join verified planners on Trippinity. Get a digital storefront, manage bookings, and connect with your group before they even depart.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-8">
          {[
            { v: "12K+", l: "Active travelers" },
            { v: "0%", l: "Listing fee" },
            { v: "12%", l: "Commission on booking" },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl border bg-card p-4 text-center">
              <p className="text-xl font-extrabold font-display">{s.v}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{s.l}</p>
            </div>
          ))}
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mt-8 overflow-x-auto scrollbar-hide pb-1">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => i < step && setStep(i)}
                className={`flex items-center gap-2 text-xs font-bold transition-colors whitespace-nowrap ${
                  i === step ? "text-primary" : i < step ? "text-green-600 cursor-pointer" : "text-muted-foreground cursor-default"
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] border ${
                  i === step ? "bg-primary text-white border-primary" : i < step ? "bg-green-50 border-green-300 text-green-600" : "bg-muted border-transparent"
                }`}>
                  {i < step ? "✓" : i + 1}
                </span>
                {s}
              </button>
              {i < STEPS.length - 1 && <span className="w-6 h-px bg-border" />}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="bg-card border rounded-2xl p-5 sm:p-7 shadow-soft mt-4">
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold font-display">Tell us about your company</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className={labelClass}>Company / Brand Name</label><input className={inputClass} placeholder="e.g. Himalayan Trails Co." value={form.companyName} onChange={(e) => update("companyName", e.target.value)} /></div>
                <div><label className={labelClass}>Owner / Founder Name</label><input className={inputClass} placeholder="e.g. Arjun Mehta" value={form.ownerName} onChange={(e) => update("ownerName", e.target.value)} /></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className={labelClass}>Business Email</label><input type="email" className={inputClass} placeholder="you@company.com" value={form.email} onChange={(e) => update("email", e.target.value)} /></div>
                <div><label className={labelClass}>WhatsApp / Phone</label><input className={inputClass} placeholder="+91 98765 43210" value={form.phone} onChange={(e) => update("phone", e.target.value)} /></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className={labelClass}>City</label><input className={inputClass} placeholder="e.g. Manali" value={form.city} onChange={(e) => update("city", e.target.value)} /></div>
                <div><label className={labelClass}>State</label><input className={inputClass} placeholder="e.g. Himachal Pradesh" value={form.state} onChange={(e) => update("state", e.target.value)} /></div>
              </div>
              <div><label className={labelClass}>Website / Instagram (optional)</label><input className={inputClass} placeholder="@handle or website URL" value={form.website} onChange={(e) => update("website", e.target.value)} /></div>
              <div><label className={labelClass}>Tell travelers about you</label><textarea rows={4} className="w-full p-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="What makes your trips special?" value={form.description} onChange={(e) => update("description", e.target.value)} /></div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold font-display">Verify your business</h2>
              <p className="text-sm text-muted-foreground">We verify all planners before listing. This protects travelers and makes your profile trustworthy.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className={labelClass}>GST Number</label><input className={inputClass} placeholder="22AAAAA0000A1Z5" value={form.gst} onChange={(e) => update("gst", e.target.value)} /></div>
                <div><label className={labelClass}>PAN Card Number</label><input className={inputClass} placeholder="ABCDE1234F" value={form.panCard} onChange={(e) => update("panCard", e.target.value)} /></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className={labelClass}>Years in operation</label><input type="number" className={inputClass} placeholder="e.g. 5" value={form.yearsActive} onChange={(e) => update("yearsActive", e.target.value)} /></div>
                <div><label className={labelClass}>Trips conducted per year</label><input type="number" className={inputClass} placeholder="e.g. 30" value={form.tripsPerYear} onChange={(e) => update("tripsPerYear", e.target.value)} /></div>
              </div>
              <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/40 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-semibold">Upload GST certificate or business registration</p>
                <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG · Max 10MB</p>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-green-50 border border-green-200">
                <ShieldCheck className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-green-800">Your data is safe</p>
                  <p className="text-xs text-green-700 mt-0.5">Documents are used only for verification. Never shared with travelers.</p>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold font-display">Add your first trip</h2>
              <p className="text-sm text-muted-foreground">This is just a preview. You can add full details, photos, and itinerary from your dashboard after approval.</p>
              <div><label className={labelClass}>Trip title</label><input className={inputClass} placeholder="e.g. Magical Manali Group Escape" value={form.tripTitle} onChange={(e) => update("tripTitle", e.target.value)} /></div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className={labelClass}>Destination</label><input className={inputClass} placeholder="e.g. Manali, Himachal" value={form.tripDestination} onChange={(e) => update("tripDestination", e.target.value)} /></div>
                <div><label className={labelClass}>Price per person (₹)</label><input type="number" className={inputClass} placeholder="e.g. 12999" value={form.tripPrice} onChange={(e) => update("tripPrice", e.target.value)} /></div>
              </div>
              <div><label className={labelClass}>Duration</label><input className={inputClass} placeholder="e.g. 4 Nights / 5 Days" value={form.tripDuration} onChange={(e) => update("tripDuration", e.target.value)} /></div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold font-display">You&apos;re almost live!</h2>
              <div className="space-y-3">
                {[
                  { label: "Company", value: form.companyName || "Not filled" },
                  { label: "Contact", value: form.email || "Not filled" },
                  { label: "First trip", value: form.tripTitle || "Not filled" },
                  { label: "Verification", value: form.gst ? "Documents submitted" : "Pending" },
                ].map((r) => (
                  <div key={r.label} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-muted/40 border">
                    <span className="text-sm font-semibold shrink-0">{r.label}</span>
                    <span className="text-sm text-muted-foreground truncate">{r.value}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl border bg-primary/5 text-sm leading-relaxed text-foreground/80">
                By submitting, you agree to Trippinity&apos;s <Link to="/terms-and-privacy" className="text-primary font-semibold">Planner Terms</Link>. Our team will review your details within 48 hours and activate your storefront.
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-8">
            {step > 0 && (
              <button onClick={() => setStep((s) => s - 1)} className="h-12 px-6 rounded-xl border font-semibold text-sm hover:bg-muted transition-colors">
                Back
              </button>
            )}
            <button
              onClick={() => (step < STEPS.length - 1 ? setStep((s) => s + 1) : setSubmitted(true))}
              className="flex-1 h-12 rounded-xl bg-primary text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-elevated"
            >
              {step < STEPS.length - 1 ? (
                <><span>Continue</span> <ChevronRight className="w-4 h-4" /></>
              ) : (
                <><ShieldCheck className="w-4 h-4" /> Submit for Verification</>
              )}
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          Already have an account? <Link to="/planner-dashboard" className="text-primary font-semibold hover:underline">Go to dashboard</Link>
        </div>
      </div>

      <Footer />
      <BottomNav />
    </div>
  );
};

export default PlannerOnboarding;
