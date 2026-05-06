import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  ChevronDown,
  Heart,
  User,
  Info,
  MessageCircle,
  Compass,
  Quote,
  LogOut,
  Sparkles,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { destinations } from "@/data/mockTrips";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [destOpen, setDestOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const isActive = (path: string) => location.pathname === path;
  const navLinkCls = (path: string) =>
    `px-4 py-2 rounded-xl text-sm transition-colors ${
      isActive(path)
        ? "text-primary font-semibold bg-primary/8"
        : "font-medium text-foreground/80 hover:text-foreground hover:bg-muted"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-border/80">
      <div className="container flex items-center justify-between h-[68px]">
        <Link to="/" className="flex items-center gap-1 group">
          <span className="text-2xl sm:text-2xl font-extrabold tracking-tight font-display">
            Tripp<span className="text-primary">inity</span>
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

          <Link to="/explore" className={navLinkCls("/explore")}>
            Explore All Trips
          </Link>

          <Link
            to="/trip-hub"
            className="relative px-4 py-2 rounded-xl text-sm font-bold text-white inline-flex items-center gap-1.5 shadow-soft hover:shadow-elevated transition-all hover:scale-[1.04]"
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)",
              backgroundSize: "200% 200%",
              animation: "gradientShift 4s ease infinite",
            }}
          >
            <Sparkles className="w-3.5 h-3.5" /> Trip Hub
          </Link>

          <Link to="/about" className={navLinkCls("/about")}>
            About
          </Link>

          <Link to="/testimonials" className={navLinkCls("/testimonials")}>
            Testimonials
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <Link
              to="/profile"
              className="hidden sm:inline-flex h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-semibold items-center gap-2 hover:bg-primary/90 transition-colors shadow-soft"
            >
              <span className="w-6 h-6 rounded-full bg-white/20 inline-flex items-center justify-center text-xs font-bold">
                {user?.name?.[0]?.toUpperCase() ?? "U"}
              </span>
              Profile
            </Link>
          ) : (
            <Link
              to="/login"
              className="hidden sm:inline-flex h-10 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold items-center hover:bg-primary/90 transition-colors shadow-soft"
            >
              Login
            </Link>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger className="h-10 w-10 rounded-xl border border-border bg-card hover:bg-muted transition-colors inline-flex items-center justify-center outline-none">
              <Menu className="w-5 h-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {isAuthenticated && (
                <DropdownMenuLabel className="text-xs">
                  Signed in as <span className="font-semibold">{user?.name}</span>
                </DropdownMenuLabel>
              )}
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <User className="w-4 h-4 mr-2" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/favourites")}>
                <Heart className="w-4 h-4 mr-2" /> Favourites
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/trip-hub")}>
                <Compass className="w-4 h-4 mr-2" /> Trip Hub
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/testimonials")}>
                <Quote className="w-4 h-4 mr-2" /> Testimonials
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/about")}>
                <Info className="w-4 h-4 mr-2" /> About
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/contact")}>
                <MessageCircle className="w-4 h-4 mr-2" /> Contact
              </DropdownMenuItem>
              {isAuthenticated && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                    <LogOut className="w-4 h-4 mr-2" /> Log out
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
