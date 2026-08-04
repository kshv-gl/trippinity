import { Sparkles } from "lucide-react";

interface Props {
  active: boolean;
  onToggle: () => void;
}

const GoGirlsBanner = ({ active, onToggle }: Props) => (
  <div className="container pt-4">
    <div
      className={`flex items-center justify-between gap-4 p-4 rounded-2xl border transition-colors ${
        active
          ? "bg-gradient-to-r from-pink-500/15 to-purple-500/15 border-pink-400/50"
          : "bg-gradient-to-r from-pink-50 to-purple-50 border-pink-100"
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-xl bg-pink-500/15 flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5 text-pink-600" />
        </div>
        <div className="min-w-0">
          <p className="font-bold font-display text-sm">
            Go Girls Mode {active ? "is ON" : ""}
          </p>
          <p className="text-xs text-muted-foreground">
            {active
              ? "Showing only women-only trips with verified female leaders"
              : "Filter trips made just for women"}
          </p>
        </div>
      </div>

      <button
        role="switch"
        aria-checked={active}
        aria-label="Toggle Go Girls mode"
        onClick={onToggle}
        className={`relative w-14 h-8 rounded-full transition-colors shrink-0 ${
          active ? "bg-pink-500" : "bg-muted-foreground/30"
        }`}
      >
        <span
          className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-soft transition-transform ${
            active ? "translate-x-6" : ""
          }`}
        />
      </button>
    </div>
  </div>
);

export default GoGirlsBanner;
