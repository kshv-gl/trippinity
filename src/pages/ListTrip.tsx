import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";

const ListTrip = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: "",
    price: "",
    duration: "",
    dates: "",
    itinerary: "",
    image: "",
    plannerName: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New Trip:", form);
    setSubmitted(true);
  };

  const Field = ({
    label,
    name,
    type = "text",
    placeholder,
    textarea = false,
  }: {
    label: string;
    name: keyof typeof form;
    type?: string;
    placeholder: string;
    textarea?: boolean;
  }) => (
    <div>
      <label className="text-sm font-medium mb-1 block">{label}</label>
      {textarea ? (
        <textarea
          required
          value={form[name]}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })}
          className="w-full min-h-[120px] px-4 py-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-y"
          placeholder={placeholder}
        />
      ) : (
        <input
          required
          type={type}
          value={form[name]}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })}
          className="w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          placeholder={placeholder}
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen pb-20 sm:pb-0">
      <Navbar />
      <div className="container max-w-xl py-8">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <h1 className="text-2xl font-extrabold mb-6">List Your Trip</h1>

        {submitted ? (
          <div className="text-center py-12 space-y-4 animate-fade-in">
            <CheckCircle className="w-16 h-16 text-accent mx-auto" />
            <h2 className="text-xl font-bold">Trip Listed Successfully!</h2>
            <p className="text-muted-foreground">Your trip is now live for travelers to discover.</p>
            <Link
              to="/"
              className="inline-flex h-11 px-6 items-center rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Trip Title" name="title" placeholder="e.g., Magical Manali Adventure" />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Price (₹)" name="price" type="number" placeholder="12999" />
              <Field label="Duration" name="duration" placeholder="4N / 5D" />
            </div>
            <Field label="Dates" name="dates" placeholder="Apr 15 – Apr 19, 2026" />
            <Field
              label="Itinerary (one day per line)"
              name="itinerary"
              placeholder={"Day 1: Arrive in Manali...\nDay 2: Solang Valley..."}
              textarea
            />
            <Field label="Image URL" name="image" placeholder="https://..." />
            <Field label="Your Name" name="plannerName" placeholder="Your full name" />
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-opacity"
            >
              Publish Trip
            </button>
          </form>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default ListTrip;
