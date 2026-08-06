import { useEffect, useMemo, useState } from "react";
import { X, CheckCircle, Compass, CreditCard, ShieldCheck, Lock, Smartphone, Building2, Check, User, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import type { Trip } from "@/data/mockTrips";
import { useBookingState } from "@/hooks/useBookingState";
import { useAuth } from "@/hooks/useAuth";

interface BookingModalProps {
  trip: Trip;
  open: boolean;
  onClose: () => void;
}

type Step = "details" | "payment" | "confirmed";

interface Traveler {
  name: string;
  phone: string;
  aadhaar: string;
}

const emptyTraveler = (): Traveler => ({ name: "", phone: "", aadhaar: "" });

const maskedAadhaar = (val: string) => {
  if (!val) return "";
  if (val.length <= 4) return val;
  return "XXXX XXXX " + val.slice(-4);
};

const BookingModal = ({ trip, open, onClose }: BookingModalProps) => {
  const { setBooked } = useBookingState();
  const { user } = useAuth();
  const [step, setStep] = useState<Step>("details");
  const [processing, setProcessing] = useState(false);
  const [form, setForm] = useState({
    email: "",
    peopleCount: "1",
  });
  const [travelers, setTravelers] = useState<Traveler[]>([
    { ...emptyTraveler(), name: user?.name ?? "" },
  ]);
  const [aadhaarFocus, setAadhaarFocus] = useState<Record<number, boolean>>({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [card, setCard] = useState({ number: "", name: "", exp: "", cvv: "" });
  const [payMethod, setPayMethod] = useState<"card" | "upi" | "netbanking">("card");

  const people = Math.max(1, Math.min(20, parseInt(form.peopleCount || "1", 10) || 1));

  // Sync travelers array length with people count
  useEffect(() => {
    setTravelers((prev) => {
      if (prev.length === people) return prev;
      if (prev.length < people) {
        return [...prev, ...Array.from({ length: people - prev.length }, emptyTraveler)];
      }
      return prev.slice(0, people);
    });
  }, [people]);

  // Pre-populate primary traveler when user logs in
  useEffect(() => {
    if (user?.name && !travelers[0]?.name) {
      setTravelers((prev) => {
        const copy = [...prev];
        copy[0] = { ...copy[0], name: user.name };
        return copy;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.name]);

  const total = trip.price * people;
  const deposit = Math.round(total * 0.25);

  const travelersValid = useMemo(
    () =>
      travelers.length === people &&
      travelers.every(
        (t) =>
          t.name.trim().length >= 2 &&
          /^[6-9]\d{9}$/.test(t.phone) &&
          /^\d{12}$/.test(t.aadhaar),
      ),
    [travelers, people],
  );

  if (!open) return null;

  const updateTraveler = (idx: number, patch: Partial<Traveler>) => {
    setTravelers((prev) => prev.map((t, i) => (i === idx ? { ...t, ...patch } : t)));
  };

  const handleDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!travelersValid) {
      toast.error("Please complete all traveler details correctly.");
      return;
    }
    if (!acceptedTerms) {
      setTermsError(true);
      toast.error("Please accept the Terms & Privacy Policy to continue.");
      return;
    }
    setTermsError(false);
    setStep("payment");
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setBooked(true);
      setStep("confirmed");
    }, 1500);
  };

  const close = () => {
    onClose();
    setTimeout(() => {
      setStep("details");
      setProcessing(false);
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={close} />
      <div className="relative w-full max-w-md bg-card rounded-2xl shadow-2xl overflow-hidden animate-scale-in max-h-[90dvh] overflow-y-auto flex flex-col">
        <div className="flex items-center justify-between p-5 border-b shrink-0">
          <div>
            <h2 className="text-lg font-bold">
              {step === "details" && "Book your trip"}
              {step === "payment" && "Secure payment · 25% deposit"}
              {step === "confirmed" && "Booking Confirmed"}
            </h2>
            {step !== "confirmed" && (
              <p className="text-xs text-muted-foreground mt-0.5">{trip.title}</p>
            )}
          </div>
          <button onClick={close} className="p-1 rounded-lg hover:bg-muted transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {step !== "confirmed" && (
          <div className="px-5 pt-4 flex items-center justify-between gap-2 text-[11px] font-medium shrink-0">
            {[
              { key: "details", label: "Details", n: 1 },
              { key: "payment", label: "Payment", n: 2 },
              { key: "confirmed", label: "Confirmed", n: 3 },
            ].map((s, i, arr) => {
              const order = ["details", "payment", "confirmed"];
              const currentIdx = order.indexOf(step);
              const myIdx = order.indexOf(s.key);
              const completed = myIdx < currentIdx;
              const active = myIdx === currentIdx;
              return (
                <div key={s.key} className="flex items-center flex-1 last:flex-none gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold border-2 transition-colors ${
                    completed ? "bg-success border-success text-white"
                    : active ? "bg-primary border-primary text-white"
                    : "bg-card border-border text-muted-foreground"
                  }`}>
                    {completed ? <Check className="w-3.5 h-3.5" /> : s.n}
                  </div>
                  <span className={active ? "text-primary font-semibold" : "text-muted-foreground"}>{s.label}</span>
                  {i < arr.length - 1 && <div className={`flex-1 h-0.5 ${completed ? "bg-success" : "bg-border"}`} />}
                </div>
              );
            })}
          </div>
        )}

        <div className="overflow-y-auto flex-1">
        {step === "details" && (
          <form onSubmit={handleDetails} className="p-5 space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-xl border bg-muted/30">
              <div className="w-14 h-14 rounded-lg bg-cover bg-center shrink-0" style={{ backgroundImage: `url(${trip.image})` }} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-display font-semibold truncate">{trip.title}</p>
                <p className="text-xs text-muted-foreground">₹{trip.price.toLocaleString("en-IN")} / person</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium mb-1 block">Contact Email</label>
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="you@email.com" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Travelers</label>
                <input required type="number" min="1" max="20" value={form.peopleCount}
                  onChange={(e) => setForm({ ...form, peopleCount: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>

            

            {/* Dynamic traveler sections */}
            <div className="space-y-4">
              {travelers.map((t, idx) => {
                const isPrimary = idx === 0;
                const focused = aadhaarFocus[idx];
                return (
                  <div key={idx} className="rounded-xl border bg-muted/20 p-4 space-y-3 animate-fade-in">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-primary/15 text-primary flex items-center justify-center">
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-sm font-bold truncate">
                        Traveler {idx + 1}{isPrimary && <span className="text-muted-foreground font-medium"> (Primary)</span>}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium mb-1 block">Full Name</label>
                      <input
                        required
                        value={t.name}
                        onChange={(e) => updateTraveler(idx, { name: e.target.value })}
                        className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        placeholder="As per government ID"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium mb-1 block">Contact Number</label>
                        <input
                          required
                          type="tel"
                          inputMode="numeric"
                          value={t.phone}
                          onChange={(e) => updateTraveler(idx, { phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                          className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                          placeholder="10-digit mobile"
              
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium mb-1 block flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-accent" /> Aadhar Number
                        </label>
                        <input
                          required
                          inputMode="numeric"
                          value={focused ? t.aadhaar : maskedAadhaar(t.aadhaar)}
                          onFocus={() => setAadhaarFocus((p) => ({ ...p, [idx]: true }))}
                          onBlur={() => setAadhaarFocus((p) => ({ ...p, [idx]: false }))}
                          onChange={(e) => updateTraveler(idx, { aadhaar: e.target.value.replace(/\D/g, "").slice(0, 12) })}
                          className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 font-mono tracking-wider"
                          placeholder="12-digit Aadhar"
                  
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="rounded-xl bg-muted/50 p-3 text-xs flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <span>Pay just <strong>25% upfront</strong> to confirm. Balance 75% due 7 days before travel.</span>
            </div>

            {/* Terms checkbox */}
            <div className={`rounded-xl border p-3 ${termsError ? "border-destructive bg-destructive/5" : "border-border bg-background"}`}>
              <label className="flex items-start gap-2.5 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => {
                    setAcceptedTerms(e.target.checked);
                    if (e.target.checked) setTermsError(false);
                  }}
                  className="mt-0.5 w-4 h-4 accent-primary cursor-pointer"
                />
                <span className="text-foreground/90">
                  I have read and agree to the{" "}
                  <Link to="/terms-and-privacy" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
                    Terms &amp; Privacy Policy
                  </Link>{" "}
                  of Trippinity.
                </span>
              </label>
              {termsError && (
                <p className="text-[11px] text-destructive font-semibold mt-2 flex items-center gap-1 pl-6">
                  <AlertCircle className="w-3 h-3" /> Please accept the Terms &amp; Privacy Policy to continue.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!acceptedTerms}
              className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-colors shadow-elevated disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              Proceed to Payment
            </button>
          </form>
        )}

        {step === "payment" && (
          <form onSubmit={handlePay} className="p-5 space-y-4">
            <div className="rounded-xl border bg-muted/30 p-4 space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{people} traveler{people > 1 ? "s" : ""} × ₹{trip.price.toLocaleString("en-IN")}</span>
                <span className="font-medium">₹{total.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-muted-foreground text-xs">
                <span>Trip total</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
              <div className="border-t pt-2 mt-1 flex justify-between items-baseline">
                <span className="font-semibold">Pay now (25%)</span>
                <span className="text-2xl font-extrabold text-primary">₹{deposit.toLocaleString("en-IN")}</span>
              </div>
              <p className="text-[11px] text-muted-foreground">Remaining 75% (₹{(total - deposit).toLocaleString("en-IN")}) due 7 days before travel.</p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {([
                { k: "card", label: "Card", icon: CreditCard },
                { k: "upi", label: "UPI", icon: Smartphone },
                { k: "netbanking", label: "Net Banking", icon: Building2 },
              ] as const).map((m) => (
                <button
                  type="button"
                  key={m.k}
                  onClick={() => {
                    if (m.k !== "card") {
                      toast("Coming soon — Card works for the demo");
                      return;
                    }
                    setPayMethod("card");
                  }}
                  className={`h-14 rounded-xl border-2 text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-colors ${
                    payMethod === m.k ? "border-primary bg-primary/5 text-primary" : "border-border bg-card text-muted-foreground hover:border-border/80"
                  }`}
                >
                  <m.icon className="w-4 h-4" />
                  {m.label}
                </button>
              ))}
            </div>

            {payMethod === "card" && (
              <>
                <div>
                  <label className="text-sm font-medium mb-1 block flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4" /> Card Number
                  </label>
                  <input required value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 font-mono" placeholder="4242 4242 4242 4242" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Cardholder Name</label>
                  <input required value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Name on card" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Expiry</label>
                    <input required value={card.exp} onChange={(e) => setCard({ ...card, exp: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 font-mono" placeholder="MM / YY" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">CVV</label>
                    <input required type="password" value={card.cvv} onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 font-mono" placeholder="•••" />
                  </div>
                </div>
              </>
            )}

            <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
              <Lock className="w-3 h-3" /> Demo payment — no real card is charged.
            </p>

            <div className="flex gap-2">
              <button type="button" onClick={() => setStep("details")} className="h-12 px-5 rounded-xl border bg-background text-sm font-medium hover:bg-muted transition-colors">
                Back
              </button>
              <button type="submit" disabled={processing} className="flex-1 h-12 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors shadow-elevated disabled:opacity-60">
                {processing ? "Processing…" : `Pay ₹${deposit.toLocaleString("en-IN")} & Confirm`}
              </button>
            </div>
          </form>
        )}

        {step === "confirmed" && (
          <div className="p-8 text-center space-y-4 animate-fade-in relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              {[
                { c: "bg-primary", x: "-80px" },
                { c: "bg-secondary", x: "60px" },
                { c: "bg-success", x: "-40px" },
                { c: "bg-destructive", x: "100px" },
                { c: "bg-accent", x: "20px" },
                { c: "bg-secondary", x: "-110px" },
              ].map((d, i) => (
                <span
                  key={i}
                  className={`absolute w-2.5 h-2.5 rounded-full ${d.c} animate-confetti`}
                  style={{ ["--cx" as string]: d.x, animationDelay: `${i * 60}ms` } as React.CSSProperties}
                />
              ))}
            </div>
            <div className="w-20 h-20 rounded-full bg-success/15 flex items-center justify-center mx-auto relative">
              <CheckCircle className="w-12 h-12 text-success" />
            </div>
            <h3 className="text-2xl font-extrabold font-display">Booking Confirmed ✅</h3>
            <p className="text-muted-foreground text-sm">
              You're going on <strong>{trip.title}</strong>! ₹{deposit.toLocaleString("en-IN")} paid · remaining 75% due 7 days before travel. Your Trip Hub is now unlocked.
            </p>
            <div className="flex flex-col gap-2 pt-2">
              <Link
                to="/trip-hub"
                className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold inline-flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-elevated"
              >
                <Compass className="w-4 h-4" /> Open your Trip Hub
              </Link>
              <button
                onClick={close}
                className="w-full h-11 rounded-xl bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
