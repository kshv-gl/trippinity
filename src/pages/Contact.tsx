import AIChatWidget from "@/components/AIChatWidget";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import { Mail, Phone, MapPin, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast({ title: "Message sent ✅", description: "We'll get back to you within 24 hours." });
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navbar />
      <div className="container py-12 grid lg:grid-cols-2 gap-12 max-w-5xl">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display">Get in touch</h1>
          <p className="text-muted-foreground mt-2">Questions, partnerships, or trip ideas — we'd love to hear from you.</p>
          <div className="mt-8 space-y-4">
            {[
              { icon: Mail, label: "Email", value: "hello@trippinity.com" },
              { icon: Phone, label: "Phone", value: "+91 98765 43210" },
              { icon: MapPin, label: "Office", value: "New Delhi, India" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-semibold">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border rounded-2xl p-6 sm:p-8 shadow-soft">
          {sent ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle className="w-14 h-14 text-success mx-auto" />
              <h3 className="text-xl font-bold">Message sent!</h3>
              <p className="text-sm text-muted-foreground">We'll reply within 24 hours.</p>
              <button onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }} className="text-sm text-primary hover:underline">
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <h2 className="font-bold text-lg">Send us a message</h2>
              <input required placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full h-12 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full h-12 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <textarea required rows={5} placeholder="Your message..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full p-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
              <button type="submit" className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
                Send message
              </button>
            </form>
          )}
        </div>
      </div>
      <Footer />
      <BottomNav />
      <AIChatWidget />

    </div>
  );
};

export default Contact;
