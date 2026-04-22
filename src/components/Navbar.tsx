import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, ChevronDown, Heart, User, Info, MessageCircle, Compass } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { destinations } from "@/data/mockTrips";

const Navbar = () => {
  const navigate = useNavigate();
  const [destOpen, setDestOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-xl border-b border-border/60">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-1 group">
          <span className="text-3xl sm:text-3xl font-extrabold tracking-tight font-display">
            Tripp<span className="text-accent">inity</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <DropdownMenu open={destOpen} onOpenChange={setDestOpen}>
            <DropdownMenuTrigger className="px-4 py-2 rounded-xl text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-colors inline-flex items-center gap-1 outline-none">
              Explore by Destination
              <ChevronDown className={`w-4 h-4 transition-transform ${destOpen ? "rotate-180" : ""}`} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[420px] p-3">
              <DropdownMenuLabel className="text-xs uppercase tracking-wide text-muted-foreground px-2">
                Popular destinations
              </DropdownMenuLabel>
              <div className="grid grid-cols-2 gap-1 mt-1">
                {destinations.map((d) => (
                  <button
                    key={d.name}
                    onClick={() => navigate(`/destinations?to=${d.name}`)}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted text-left transition-colors"
                  >
                    <div
                      className="w-10 h-10 rounded-lg bg-cover bg-center shrink-0"
                      style={{ backgroundImage: `url(${d.image})` }}
                    />
                    <div className="text-sm">
                      <div className="font-semibold">{d.name}</div>
                      <div className="text-xs text-muted-foreground">Curated trips</div>
                    </div>
                  </button>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/destinations")} className="font-medium text-primary">
                <Compass className="w-4 h-4 mr-2" /> View all destinations
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            to="/explore"
            className="px-4 py-2 rounded-xl text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
          >
            Explore All Trips
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="hidden sm:inline-flex h-10 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold items-center hover:bg-primary/90 transition-colors shadow-soft"
          >
            Login
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="h-10 w-10 rounded-xl border border-border bg-card hover:bg-muted transition-colors inline-flex items-center justify-center outline-none">
              <Menu className="w-5 h-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <User className="w-4 h-4 mr-2" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/favourites")}>
                <Heart className="w-4 h-4 mr-2" /> Favourites
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/trip-hub")}>
                <Compass className="w-4 h-4 mr-2" /> Trip Hub
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/about")}>
                <Info className="w-4 h-4 mr-2" /> About
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/contact")}>
                <MessageCircle className="w-4 h-4 mr-2" /> Contact
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
