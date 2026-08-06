import { useEffect, useRef, useState } from "react";
import { X, Check, MessageCircle } from "lucide-react";
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
  const [step, setStep] = useState<"idle" | "phone" | "sent">("idle");
  const [priceSaved, setPriceSaved] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isYoung = age !== null && age <= 22;

  const dismiss = () => {
    localStorage.setItem(DISMISSED_KEY, "true");
    setShow(false);
  };

  useEffect(() => {
    if (localStorage.getItem(DISMISSED_KEY) === "true") return;

    const handleLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) setShow(true);
    };

    timerRef.current = setTimeout(() => {
      document.addEventListener("mouseleave", handleLeave, { once: true });
    }, 30000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const sendToParent = () => {
    const origin = window.location.origin;
    const message = `Hi! Your child wants to go on a trip with Trippinity.

Trip: ${trip.title}
Destination: ${trip.destination}
Dates: ${trip.dates}
Price: ₹${trip.price.toLocaleString("en-IN")}/person

Give Permission: ${origin}/parent-approve?trip=${trip.id}&user=${encodeURIComponent(user?.email ?? "")}
Not This Time: ${origin}/parent-decline?trip=${trip.id}`;

    // Fire-and-forget notification request; UI does not block on it.
    void fetch("/api/whatsapp-permission", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: `+91${phone}`, message, tripId: trip.id }),
    }).catch(() => undefined);

    setStep("sent");
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-[70] w-[calc(100%-2rem)] sm:w-[340px] animate-fade-up">
      <div className="rounded-2xl border bg-card shadow-elevated overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-primary via-pink-500 to-purple-500" />

        <div className="p-4 space-y-3">
          <div className="flex items-start gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold leading-snug">
                {isYoung
                  ? "Want your parents to give you the green light?"
                  : "Save this trip before you go"}
              </p>
              <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                {trip.title} · ₹{trip.price.toLocaleString("en-IN")}
              </p>
            </div>
            <button
              onClick={() => setShow(false)}
              aria-label="Close"
              className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-muted transition-colors shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {isYoung && (
            <>
              {step === "idle" && (
                <div className="space-y-2">
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    We'll send a quick WhatsApp to your parent with the trip details and two simple buttons.
                  </p>
                  <button
                    onClick={() => setStep("phone")}
                    className="w-full h-10 rounded-xl bg-primary text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" /> Send to parent on WhatsApp
                  </button>
                  <button onClick={dismiss} className="w-full text-[11px] text-center text-muted-foreground hover:text-foreground transition-colors py-0.5">
                    Not relevant for me, don't show again
                  </button>
                </div>
              )}

              {step === "phone" && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="h-10 px-2.5 rounded-xl border bg-muted inline-flex items-center text-xs font-semibold shrink-0">+91</span>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder="Parent's WhatsApp number"
                      className="flex-1 h-10 px-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <button
                    disabled={phone.length !== 10}
                    onClick={sendToParent}
                    className="w-full h-10 rounded-xl bg-green-500 text-white text-sm font-bold disabled:opacity-40 hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  >
                    Send now
                  </button>
                  <button onClick={() => setStep("idle")} className="w-full text-[11px] text-center text-muted-foreground hover:text-foreground transition-colors py-0.5">
                    Go back
                  </button>
                </div>
              )}

              {step === "sent" && (
                <div className="flex items-center gap-3 py-1">
                  <div className="w-9 h-9 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold">Sent!</p>
                    <p className="text-[11px] text-muted-foreground">We'll notify you the moment they approve.</p>
                  </div>
                </div>
              )}
            </>
          )}

          {!isYoung && (
            <>
              {!priceSaved ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { setPriceSaved(true); setTimeout(() => setShow(false), 2500); }}
                    className="flex-1 h-10 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors"
                  >
                    Price alert
                  </button>
                  <button
                    onClick={() => setShow(false)}
                    className="h-10 px-4 rounded-xl border text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Not now
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 py-1">
                  <div className="w-9 h-9 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-semibold">We'll notify you if the price drops!</p>
                </div>
              )}
              <button onClick={dismiss} className="w-full text-[11px] text-center text-muted-foreground hover:text-foreground transition-colors py-0.5">
                Not relevant for me, don't show again
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExitIntent;
