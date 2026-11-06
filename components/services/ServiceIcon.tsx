import { BrainCircuit, Cpu, Globe, Smartphone } from "lucide-react";
import type { ServiceIcon as ServiceIconName } from "@/data/services";

const icons = { ai: BrainCircuit, web: Globe, mobile: Smartphone, custom: Cpu } satisfies Record<ServiceIconName, unknown>;

/** AI is the one service set in emerald; the rest keep the gold brand accent. */
const tones: Record<ServiceIconName, string> = {
  ai: "border-emerald/50 bg-emerald/[0.1] text-emerald-soft group-hover:border-emerald-soft/70",
  web: "border-gold/30 bg-gold/[0.05] text-gold group-hover:border-gold/60",
  mobile: "border-gold/30 bg-gold/[0.05] text-gold group-hover:border-gold/60",
  custom: "border-gold/30 bg-gold/[0.05] text-gold group-hover:border-gold/60",
};

export function ServiceIcon({ name }: { name: ServiceIconName }) {
  const Icon = icons[name];
  return (
    <span className={`grid size-12 place-items-center rounded-control border transition-colors duration-500 ${tones[name]}`}>
      <Icon className="size-5" strokeWidth={1.5} aria-hidden />
    </span>
  );
}
