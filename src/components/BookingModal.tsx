import { useState } from "react";
import { X, CheckCircle, Compass, CreditCard, ShieldCheck, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import type { Trip } from "@/data/mockTrips";
import { useBookingState } from "@/hooks/useBookingState";

interface BookingModalProps {
  trip: Trip;
  open: boolean;
  onClose: () => void;
}

type Step = "details" | "payment" | "confirmed";

const BookingModal = ({ trip, open, onClose }: BookingModalProps) => {
  const { setBooked } = useBookingState();
  const [step, setStep] = useState<Step>("details");
  const [processing, setProcessing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    peopleCount: "1",
  });
  const [card, setCard] = useState({ number: "", name: "", exp: "", cvv: "" });

  if (!open) return null;

  const people = parseInt(form.peopleCount || "1", 10) || 1;
  const total = trip.price * people;
  const deposit = Math.round(total * 0.5);

  const handleDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setBooked(true);
      setStep("confirmed");
    }, 1500);
  };

  const close = () => {
    onClose();
    // Reset for next open after fade
    setTimeout(() => {
      setStep("details");
      setProcessing(false);
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={close} />
      <div className="relative w-full max-w-md bg-card rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
        <div className="flex items-center justify-between p-5 border-b">
          <div>
            <h2 className="text-lg font-bold">
              {step === "details" && "Book your trip"}
              {step === "payment" && "Secure payment · 50% deposit"}
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

        {/* Step indicator */}
        {step !== "confirmed" && (
          <div className="px-5 pt-4 flex items-center gap-2 text-[11px] font-medium">
            <span className={`flex-1 h-1.5 rounded-full ${step === "details" ? "bg-primary" : "bg-success"}`} />
            <span className={`flex-1 h-1.5 rounded-full ${step === "payment" ? "bg-primary" : "bg-muted"}`} />
          </div>
        )}

        {step === "details" && (
          <form onSubmit={handleDetails} className="p-5 space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Full Name</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Your name" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium mb-1 block">Phone</label>
                <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="+91..." />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Travelers</label>
                <input required type="number" min="1" max="20" value={form.peopleCount} onChange={(e) => setForm({ ...form, peopleCount: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="you@email.com" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Preferred Start Date</label>
              <input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>

            <div className="rounded-xl bg-muted/50 p-3 text-xs flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <span>Pay just <strong>50% upfront</strong> to confirm. Balance due 7 days before travel.</span>
            </div>

            <button type="submit" className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-colors shadow-elevated">
              Continue to Payment
            </button>
          </form>
        )}

        {step === "payment" && (
          <form onSubmit={handlePay} className="p-5 space-y-4">
            {/* Price summary */}
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
                <span className="font-semibold">Pay now (50%)</span>
                <span className="text-2xl font-extrabold text-primary">₹{deposit.toLocaleString("en-IN")}</span>
              </div>
              <p className="text-[11px] text-muted-foreground">Balance ₹{(total - deposit).toLocaleString("en-IN")} due 7 days before travel.</p>
            </div>

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
            <div className="grid grid-cols-2 gap-3">
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
          <div className="p-8 text-center space-y-4 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-success/15 flex items-center justify-center mx-auto">
              <CheckCircle className="w-12 h-12 text-success" />
            </div>
            <h3 className="text-2xl font-extrabold font-display">Booking Confirmed ✅</h3>
            <p className="text-muted-foreground text-sm">
              You're going on <strong>{trip.title}</strong>! ₹{deposit.toLocaleString("en-IN")} paid · balance due 7 days before travel. Your Trip Hub is now unlocked.
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
  );
};

export default BookingModal;
