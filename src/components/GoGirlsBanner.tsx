import { Sparkles } from "lucide-react";

interface Props {
  active: boolean;
  onToggle: () => void;
}

const GoGirlsBanner = ({ active, onToggle }: Props) => (
  <button
    type="button"
    role="switch"
    aria-checked={active}
    aria-label="Toggle Go Girls filter"
    onClick={onToggle}
    className={`shrink-0 whitespace-nowrap h-8 pl-1.5 pr-3 rounded-xl text-xs font-semibold inline-flex items-center gap-2 border transition-colors ${
      active
        ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white border-transparent"
        : "bg-muted border-transparent hover:bg-muted/70 text-foreground"
    }`}
  >
    <span
      className={`relative w-8 h-5 rounded-full transition-colors shrink-0 ${
        active ? "bg-white/30" : "bg-muted-foreground/25"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
          active ? "translate-x-3" : ""
        }`}
      />
    </span>
    <Sparkles className={`w-3.5 h-3.5 ${active ? "text-white" : "text-pink-500"}`} />
    Go Girls
    {active && (
      <span className="px-1.5 py-0.5 rounded-full bg-white/25 text-[9px] font-bold uppercase tracking-wider">
        ON
      </span>
    )}
  </button>
);

export default GoGirlsBanner;
