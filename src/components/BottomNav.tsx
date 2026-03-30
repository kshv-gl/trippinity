import { Home, Search, PlusCircle, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const items = [
  { icon: Home, label: "Home", to: "/" },
  { icon: Search, label: "Search", to: "/?search=true" },
  { icon: PlusCircle, label: "Add Trip", to: "/list-trip" },
  { icon: User, label: "Profile", to: "/planner/arjun-mehta" },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-t sm:hidden">
      <div className="flex items-center justify-around h-16">
        {items.map((item) => {
          const active = location.pathname === item.to || (item.to === "/" && location.pathname === "/");
          return (
            <Link
              key={item.label}
              to={item.to}
              className={`flex flex-col items-center gap-1 text-xs font-medium transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
