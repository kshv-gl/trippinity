import { Link } from "react-router-dom";
import { ShieldCheck, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background mt-16">
      <div className="container py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
        <div>
          <h4 className="font-display text-2xl font-extrabold mb-3 text-white">
            Tripp<span className="text-primary">inity</span>
          </h4>
          <p className="text-white/60">The Amazon for Trips. Discover, compare, and book curated journeys.</p>
        </div>
        <div>
          <h5 className="font-semibold mb-3 text-white">Explore</h5>
          <ul className="space-y-2 text-white/60">
            <li><Link to="/explore" className="hover:text-white">All Trips</Link></li>
            <li><Link to="/destinations" className="hover:text-white">Destinations</Link></li>
            <li><Link to="/trip-hub" className="hover:text-white">Trip Hub</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-3 text-white">Company</h5>
          <ul className="space-y-2 text-white/60">
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link to="/testimonials" className="hover:text-white">Testimonials</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-3 text-white">Trust & Safety</h5>
          <ul className="space-y-2 text-white/60">
            <li className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-secondary" /> Verified planners</li>
            <li className="flex items-center gap-1.5"><Heart className="w-4 h-4 text-primary" /> Loved by 12k+ travelers</li>
            <li className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-secondary" /> Payments by Razorpay</li>
            <li><Link to="/terms-and-privacy" className="hover:text-white">Terms & Privacy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-xs text-white/50">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} Trippinity. All rights reserved.</span>
          <span>Made with <Heart className="inline w-3 h-3 fill-primary text-primary" /> in India</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
