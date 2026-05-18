import { ShieldCheck, Lock, FileText, Mail, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="py-6 border-b border-border/60 last:border-0">
    <h2 className="font-display text-2xl font-bold mb-3">{title}</h2>
    <div className="text-foreground/80 text-[15px] leading-relaxed space-y-2">{children}</div>
  </section>
);

const TermsAndPrivacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-3xl py-12">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary font-bold mb-3">
          <FileText className="w-4 h-4" /> Legal
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold mb-3">
          Terms &amp; Privacy Policy — Trippinity
        </h1>
        <p className="text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="rounded-2xl border bg-card shadow-soft p-6 sm:p-8">
          <Section title="1. Acceptance of Terms">
            <p>
              By using Trippinity, you agree to these Terms of Service and our Privacy Policy. If you do not
              agree, please do not use the platform.
            </p>
          </Section>

          <Section title="2. Booking & Payments">
            <ul className="list-disc pl-5 space-y-1">
              <li>All bookings are subject to availability and confirmation by Trippinity.</li>
              <li>A 25% non-refundable deposit is required to confirm your booking.</li>
              <li>The remaining 75% is due as per the payment schedule shared at booking.</li>
              <li>Prices are subject to change without notice until booking is confirmed.</li>
            </ul>
          </Section>

          <Section title="3. Cancellation Policy">
            <ul className="list-disc pl-5 space-y-1">
              <li>Cancellations made 30+ days before departure: Full refund of 75% balance (deposit non-refundable).</li>
              <li>Cancellations 15–29 days before departure: 50% refund of total amount paid.</li>
              <li>Cancellations within 14 days: No refund.</li>
            </ul>
          </Section>

          <Section title="4. Traveler Responsibilities">
            <ul className="list-disc pl-5 space-y-1">
              <li>All travelers must carry valid government-issued ID (Aadhar Card or Passport) during the trip.</li>
              <li>Travelers are responsible for their own conduct, safety, and compliance with local laws.</li>
              <li>Trippinity is not liable for loss of personal belongings.</li>
            </ul>
          </Section>

          <Section title="5. Privacy Policy">
            <ul className="list-disc pl-5 space-y-1">
              <li className="flex gap-2"><Lock className="w-4 h-4 text-accent shrink-0 mt-1" /> We collect your name, contact number, Aadhar card number, and travel preferences only to facilitate your booking.</li>
              <li className="flex gap-2"><ShieldCheck className="w-4 h-4 text-accent shrink-0 mt-1" /> Your data is never sold to third parties.</li>
              <li>We may share minimal data with trip partners (guides, hotels) solely for trip execution.</li>
              <li>You may request deletion of your data by writing to <a className="text-primary font-semibold hover:underline" href="mailto:privacy@trippinity.com">privacy@trippinity.com</a>.</li>
            </ul>
          </Section>

          <Section title="6. Intellectual Property">
            <p>
              All content, branding, and imagery on Trippinity are owned by Trippinity and may not be
              reproduced without written consent.
            </p>
          </Section>

          <Section title="7. Contact">
            <p className="flex flex-wrap items-center gap-4">
              <a href="mailto:support@trippinity.com" className="inline-flex items-center gap-1.5 text-primary font-semibold hover:underline">
                <Mail className="w-4 h-4" /> support@trippinity.com
              </a>
              <span className="inline-flex items-center gap-1.5 text-foreground/80">
                <Phone className="w-4 h-4" /> +91-XXXXXXXXXX
              </span>
            </p>
          </Section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsAndPrivacy;
