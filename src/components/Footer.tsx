import { Link } from "react-router-dom";
import { ShieldCheck, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/40 mt-16">
      <div className="container py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
        <div>
          <h4 className="font-display text-2xl font-extrabold mb-3">
            Tripp<span className="text-accent">inity</span>
          </h4>
          <p className="text-muted-foreground">The Amazon for Trips. Discover, compare, and book curated journeys.</p>
        </div>
        <div>
          <h5 className="font-semibold mb-3">Explore</h5>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/explore" className="hover:text-foreground">All Trips</Link></li>
            <li><Link to="/destinations" className="hover:text-foreground">Destinations</Link></li>
            <li><Link to="/trip-hub" className="hover:text-foreground">Trip Hub</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-3">Company</h5>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-3">Trust & Safety</h5>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-accent" /> Verified planners</li>
            <li className="flex items-center gap-1.5"><Heart className="w-4 h-4 text-destructive" /> Loved by 12k+ travelers</li>
          </ul>
        </div>
      </div>
      <div className="border-t py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Trippinity. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
