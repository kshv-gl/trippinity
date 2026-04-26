import {
  Bed,
  Bus,
  Utensils,
  Map,
  ShieldCheck,
  Phone,
  Plane,
  Wallet,
  Mountain,
  Umbrella,
  Check,
  X,
} from "lucide-react";
import { STANDARD_INCLUSIONS, STANDARD_EXCLUSIONS } from "@/data/reviews";

const iconMap: Record<string, React.ElementType> = {
  bed: Bed,
  bus: Bus,
  utensils: Utensils,
  map: Map,
  shield: ShieldCheck,
  phone: Phone,
  plane: Plane,
  wallet: Wallet,
  mountain: Mountain,
  umbrella: Umbrella,
};

const InclusionsExclusions = () => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="rounded-2xl border bg-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-8 h-8 rounded-lg bg-success/15 text-success flex items-center justify-center">
            <Check className="w-4 h-4" />
          </span>
          <h3 className="font-bold">What's included</h3>
        </div>
        <ul className="space-y-2.5">
          {STANDARD_INCLUSIONS.map((item) => {
            const Icon = iconMap[item.icon] ?? Check;
            return (
              <li key={item.label} className="flex items-center gap-3 text-sm">
                <span className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center text-foreground/70">
                  <Icon className="w-3.5 h-3.5" />
                </span>
                <span className="text-foreground/90">{item.label}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="rounded-2xl border bg-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-8 h-8 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center">
            <X className="w-4 h-4" />
          </span>
          <h3 className="font-bold">Not included</h3>
        </div>
        <ul className="space-y-2.5">
          {STANDARD_EXCLUSIONS.map((item) => {
            const Icon = iconMap[item.icon] ?? X;
            return (
              <li key={item.label} className="flex items-center gap-3 text-sm">
                <span className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center text-foreground/70">
                  <Icon className="w-3.5 h-3.5" />
                </span>
                <span className="text-foreground/80">{item.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default InclusionsExclusions;
