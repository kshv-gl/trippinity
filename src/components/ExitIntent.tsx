import { useEffect, useRef, useState } from "react";
import { X, Bell, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { type Trip } from "@/data/mockTrips";
import { useAuth, getAgeFromDob } from "@/hooks/useAuth";

interface Props {
  trip: Trip;
}

const DISMISSED_KEY = "trippinity_exit_dismissed";

const ExitIntent = ({ trip }: Props) => {
  const { user } = useAuth();
  const age = getAgeFromDob(user?.dob);
  const [show, setShow] = useState(false);
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [priceDrop, setPriceDrop] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  const dismissForever = () => {
    localStorage.setItem(DISMISSED_KEY, "true");
    setShow(false);
  };

  useEffect(() => {
    if (localStorage.getItem(DISMISSED_KEY) === "true") return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) setShow(true);
    };

    timerRef.current = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave, { once: true });
    }, 30000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (!show) return null;

  const showYoungFlow = age !== null && age <= 22;

  const handleSendToParent = () => {
    if (!phone.trim()) return;
    setSent(true);
    setTimeout(() => setShow(false), 3000);
  };

  const handlePriceDrop = () => {
    setPriceDrop(true);
    setTimeout(() => {
      setPriceDrop(false);
      setShow(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center bg-foreground/50 backdrop-blur-sm p-0 sm:p-4 animate-fade-in">
      <div className="relative w-full sm:max-w-md bg-card rounded-t-3xl sm:rounded-3xl border shadow-elevated p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-center mb-4 sm:hidden">
          <div className="w-10 h-1.5 rounded-full bg-muted" />
        </div>

        {showYoungFlow ? (
          <div className="space-y-4">
            <button
              onClick={() => setShow(false)}
              aria-label="Close"
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted"
            >
              <X className="w-4 h-4" />
            </button>
            {!sent ? (
              <>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-extrabold font-display">Want to send this trip to your parents?</h3>
                  <p className="text-sm text-muted-foreground">
                    They'll receive a WhatsApp message with full trip details from Trippinity, with a Grant Permission button.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-muted/50 border">
                  <p className="font-bold text-sm">{trip.title}</p>
                  <p className="text-xs text-muted-foreground">{trip.destination} · {trip.dates}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    By {trip.plannerName} · ₹{trip.price.toLocaleString("en-IN")} per person
                  </p>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">Parent's WhatsApp number</label>
                  <div className="flex items-center gap-2">
                    <span className="h-11 px-3 rounded-xl border bg-muted inline-flex items-center text-sm font-semibold">+91</span>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder="Parent's mobile number"
                      className="flex-1 h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>
                <button
                  onClick={handleSendToParent}
                  className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" /> Send via WhatsApp
                </button>
                <button onClick={dismissForever} className="w-full text-xs text-muted-foreground hover:text-foreground py-1">
                  Not relevant for me. Never show again
                </button>
              </>
            ) : (
              <div className="text-center space-y-2 py-6">
                <h3 className="text-xl font-extrabold font-display">Sent!</h3>
                <p className="text-sm text-muted-foreground">
                  Your parent will receive a WhatsApp message with the trip details and a permission button. You'll get a notification once they approve.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <button
              onClick={() => setShow(false)}
              aria-label="Close"
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted"
            >
              <X className="w-4 h-4" />
            </button>
            {!priceDrop ? (
              <>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-extrabold font-display">Don't lose this trip</h3>
                  <p className="text-sm text-muted-foreground">Save it to your favourites or get notified if the price drops.</p>
                </div>
                <div className="p-4 rounded-2xl bg-muted/50 border">
                  <p className="font-bold text-sm">{trip.title}</p>
                  <p className="text-xs text-muted-foreground">{trip.destination} · {trip.dates}</p>
                  <p className="text-xs text-muted-foreground mt-1">₹{trip.price.toLocaleString("en-IN")} per person</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => { navigate("/favourites"); setShow(false); }}
                    className="h-12 rounded-xl border-2 border-primary text-primary font-bold text-sm hover:bg-primary/5 transition-colors"
                  >
                    Save Trip
                  </button>
                  <button
                    onClick={handlePriceDrop}
                    className="h-12 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <Bell className="w-4 h-4" /> Price Alert
                  </button>
                </div>
                <button onClick={dismissForever} className="w-full text-xs text-muted-foreground hover:text-foreground py-1">
                  Not relevant for me. Never show again
                </button>
              </>
            ) : (
              <div className="text-center space-y-2 py-6">
                <Bell className="w-8 h-8 text-primary mx-auto" />
                <h3 className="text-xl font-extrabold font-display">Price alert set!</h3>
                <p className="text-sm text-muted-foreground">We'll notify you if the price of {trip.title} drops.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExitIntent;
