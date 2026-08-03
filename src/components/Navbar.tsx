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
  MapPin,
  Search,
  CheckCircle2,
  FileText,
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
import { useUserState } from "@/hooks/useUserState";

const LocationChip = () => {
  const { userState, setUserState, INDIAN_STATES } = useUserState();
  const [open, setOpen] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [search, setSearch] = useState("");

  const detectLocation = () => {
    setDetecting(true);
    if (!navigator.geolocation) { setDetecting(false); return; }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
            { headers: { "Accept-Language": "en" } }
          );
          const data = await res.json();
          const detected: string = data?.address?.state ?? "";
          const matched = INDIAN_STATES.find(
            (s) => s.toLowerCase() === detected.toLowerCase()
          );
          if (matched) { setUserState(matched); setOpen(false); }
        } catch {}
        setDetecting(false);
      },
      () => setDetecting(false)
    );
  };

  const filtered = INDIAN_STATES.filter((s) =>
    s.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="hidden md:flex items-center relative">
      <button
        onClick={() => { setOpen((o) => !o); setSearch(""); }}
        className="group flex items-center gap-2 h-9 pl-2.5 pr-3 rounded-full bg-muted hover:bg-muted/80 border border-border/60 transition-all hover:shadow-sm"
      >
        <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
          <MapPin className="w-3 h-3 text-primary" />
        </div>
        <div className="flex flex-col items-start leading-none">
          <span className="text-[9px] text-muted-foreground font-semibold uppercase tracking-wider">
            Departing from
          </span>
          <span className="text-xs font-bold text-foreground max-w-[100px] truncate">
            {userState || "Select state"}
          </span>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform shrink-0 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 mt-3 z-50 bg-card border border-border/80 rounded-2xl shadow-elevated w-72 overflow-hidden">
            <div className="p-3 border-b">
              <p className="text-xs font-bold text-foreground mb-2">Where are you departing from?</p>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search state..."
                  className="w-full h-8 pl-8 pr-3 rounded-lg bg-muted text-xs focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            <button
              onClick={detectLocation}
              disabled={detecting}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-muted/60 transition-colors border-b text-left"
            >
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                {detecting ? (
                  <div className="w-3.5 h-3.5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Compass className="w-3.5 h-3.5 text-primary" />
                )}
              </div>
              <div>
                <p className="text-xs font-semibold text-primary">
                  {detecting ? "Detecting..." : "Auto-detect my location"}
                </p>
                <p className="text-[10px] text-muted-foreground">Uses GPS to find your state</p>
              </div>
            </button>

            <div className="max-h-52 overflow-y-auto py-1">
              {filtered.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-4">No states found</p>
              ) : (
                filtered.map((s) => (
                  <button
                    key={s}
                    onClick={() => { setUserState(s); setOpen(false); setSearch(""); }}
                    className={`w-full text-left text-xs px-3 py-2 flex items-center gap-2 transition-colors ${
                      userState === s
                        ? "bg-primary/10 text-primary font-bold"
                        : "hover:bg-muted/60 text-foreground"
                    }`}
                  >
                    {userState === s && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
                    {userState !== s && <span className="w-3.5 h-3.5 shrink-0" />}
                    {s}
                  </button>
                ))
              )}
            </div>

            {userState && (
              <div className="p-2 border-t">
                <button
                  onClick={() => { setUserState(""); setOpen(false); }}
                  className="w-full text-[11px] text-center text-muted-foreground hover:text-destructive py-1 transition-colors"
                >
                  Clear location filter
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};


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

        <LocationChip />



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
              <DropdownMenuItem onClick={() => navigate("/trip-pass")}>
                <FileText className="w-4 h-4 mr-2" /> Trip Pass
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
