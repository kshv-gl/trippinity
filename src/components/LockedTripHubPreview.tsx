import { Lock, Users, MessagesSquare, FileText, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

// Compact blurred Trip Hub teaser embedded inside the trip details page.
const LockedTripHubPreview = () => {
  return (
    <div className="relative rounded-2xl overflow-hidden border bg-card">
      {/* Blurred preview content */}
      <div
        aria-hidden
        className="pointer-events-none select-none p-6 space-y-4"
        style={{ filter: "blur(6px)", opacity: 0.55 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20" />
          <div className="flex-1">
            <div className="h-3 w-32 bg-foreground/30 rounded mb-1.5" />
            <div className="h-2 w-20 bg-foreground/20 rounded" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-muted/60">
              <div className="w-8 h-8 rounded-full bg-primary/20" />
              <div className="flex-1">
                <div className="h-2 w-16 bg-foreground/30 rounded mb-1" />
                <div className="h-1.5 w-10 bg-foreground/20 rounded" />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-start">
          <div className="max-w-[70%] p-3 rounded-2xl bg-muted">
            <div className="h-2 w-40 bg-foreground/30 rounded mb-1" />
            <div className="h-2 w-28 bg-foreground/20 rounded" />
          </div>
        </div>
        <div className="flex justify-end">
          <div className="max-w-[70%] p-3 rounded-2xl bg-primary/40">
            <div className="h-2 w-32 bg-white/40 rounded mb-1" />
            <div className="h-2 w-20 bg-white/30 rounded" />
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px] flex items-center justify-center p-6">
        <div className="max-w-sm text-center bg-card/95 border rounded-2xl shadow-elevated p-6">
          <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-full bg-muted mb-3">
            <Lock className="w-6 h-6 text-muted-foreground" />
            <Sparkles className="w-3.5 h-3.5 text-secondary absolute top-1 right-1" />
          </div>
          <h3 className="text-lg font-bold font-display">🔒 Unlock after booking</h3>
          <p className="text-xs text-muted-foreground mt-1.5 mb-4">
            Group chat, traveler list, planner DMs and trip documents — all open instantly the moment you confirm.
          </p>
          <div className="grid grid-cols-3 gap-2 mb-4 text-[10px]">
            {[
              { icon: Users, label: "Travelers" },
              { icon: MessagesSquare, label: "Group Chat" },
              { icon: FileText, label: "Documents" },
            ].map((p) => (
              <div key={p.label} className="flex flex-col items-center gap-1 p-2 rounded-lg bg-muted/60">
                <p.icon className="w-4 h-4 text-primary" />
                <span className="font-medium">{p.label}</span>
              </div>
            ))}
          </div>
          <Link
            to="/trip-hub"
            className="inline-flex h-9 px-4 items-center justify-center rounded-lg bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/15 transition-colors"
          >
            Preview Trip Hub →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LockedTripHubPreview;
