import { useState } from "react";
import { X, CheckCircle } from "lucide-react";
import type { Trip } from "@/data/mockTrips";

interface BookingModalProps {
  trip: Trip;
  open: boolean;
  onClose: () => void;
}

const BookingModal = ({ trip, open, onClose }: BookingModalProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    peopleCount: "1",
  });

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, save to database
    console.log("Booking:", { ...form, tripId: trip.id });
    setSubmitted(true);
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hi, I'd like to book "${trip.title}" for ${form.peopleCount} people on ${form.date}. Name: ${form.name}`
    );
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-card rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-lg font-bold">Request to Book</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-muted transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-accent mx-auto" />
            <h3 className="text-xl font-bold">Booking Requested!</h3>
            <p className="text-muted-foreground text-sm">
              We've received your request for <strong>{trip.title}</strong>. The planner will contact you soon.
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={handleWhatsApp}
                className="w-full h-11 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600 transition-colors"
              >
                Chat on WhatsApp
              </button>
              <button
                onClick={onClose}
                className="w-full h-11 rounded-xl bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Full Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Your name"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium mb-1 block">Phone</label>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="+91..."
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">People</label>
                <input
                  required
                  type="number"
                  min="1"
                  value={form.peopleCount}
                  onChange={(e) => setForm({ ...form, peopleCount: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Preferred Date</label>
              <input
                required
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-opacity"
            >
              Submit Booking Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
