import { blueprints } from "@/utils/blueprints";
import { GridConfig } from "@/utils/grid";

interface BlueprintSelectorProps {
  onSelect: (config: GridConfig) => void;
  activeId?: string;
}

const BlueprintSelector = ({ onSelect, activeId }: BlueprintSelectorProps) => {
  return (
    <div className="space-y-3 animate-slide-in">
      <h3 className="font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        📐 Blueprints
      </h3>
      {blueprints.map((bp) => (
        <button
          key={bp.id}
          onClick={() => onSelect(bp.config)}
          className={`w-full text-left rounded-lg border p-3 transition-all duration-200 group
            ${
              activeId === bp.id
                ? "border-primary bg-primary/10 glow-cyan"
                : "border-border bg-secondary/50 hover:border-primary/40 hover:bg-secondary"
            }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{bp.icon}</span>
            <span className="font-mono text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              {bp.name}
            </span>
          </div>
          <p className="text-xs text-muted-foreground font-mono">
            {bp.description}
          </p>
        </button>
      ))}
    </div>
  );
};

export default BlueprintSelector;
