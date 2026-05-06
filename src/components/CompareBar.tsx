import { Link } from "react-router-dom";
import { X, GitCompare } from "lucide-react";
import { mockTrips } from "@/data/mockTrips";

interface Props {
  compareIds: string[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

const CompareBar = ({ compareIds, onRemove, onClear }: Props) => {
  if (compareIds.length < 2) return null;
  const trips = compareIds
    .map((id) => mockTrips.find((t) => t.id === id))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-40 animate-scale-pop">
      <div className="bg-foreground text-background rounded-2xl shadow-elevated px-3 py-3 flex items-center gap-3 border border-white/10">
        <div className="hidden sm:flex items-center gap-2">
          {trips.map((t) => (
            <span
              key={t.id}
              className="text-xs font-semibold bg-white/10 px-2.5 py-1 rounded-lg flex items-center gap-1.5"
            >
              {t.title.split(" ").slice(0, 2).join(" ")}
              <button onClick={() => onRemove(t.id)} className="hover:text-destructive transition-colors">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <Link
          to={`/compare?ids=${compareIds.join(",")}`}
          className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors"
        >
          <GitCompare className="w-4 h-4" /> Compare {compareIds.length} trips
        </Link>
        <button onClick={onClear} className="text-xs text-white/60 hover:text-white px-2">
          Clear
        </button>
      </div>
    </div>
  );
};

export default CompareBar;
