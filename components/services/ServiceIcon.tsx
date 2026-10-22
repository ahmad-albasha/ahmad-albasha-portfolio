import { BrainCircuit, Cpu, Globe, Smartphone } from "lucide-react";
import type { ServiceIcon as ServiceIconName } from "@/data/services";

const icons = { ai: BrainCircuit, web: Globe, mobile: Smartphone, custom: Cpu } satisfies Record<ServiceIconName, unknown>;

export function ServiceIcon({ name }: { name: ServiceIconName }) {
  const Icon = icons[name];
  return (
    <span className="grid size-12 place-items-center rounded-control border border-gold/30 bg-gold/[0.05] text-gold transition-all duration-500 group-hover:border-gold/60 group-hover:shadow-glow-sm">
      <Icon className="size-5" strokeWidth={1.5} aria-hidden />
    </span>
  );
}
