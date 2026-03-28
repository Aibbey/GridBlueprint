import { GridConfig } from "@/utils/grid";
import { Plus, Minus, Grid3X3, LayoutGrid } from "lucide-react";

interface GridControlsProps {
  config: GridConfig;
  onChange: (config: GridConfig) => void;
}

const GridControls = ({ config, onChange }: GridControlsProps) => {
  const updateField = <K extends keyof GridConfig>(
    key: K,
    value: GridConfig[K],
  ) => {
    const newConfig = { ...config, [key]: value };

    if (key === "columns") {
      const cols = value as number;
      newConfig.columnSizes = Array.from(
        { length: cols },
        (_, i) => config.columnSizes[i] || "1fr",
      );
    }
    if (key === "rows") {
      const r = value as number;
      newConfig.rowSizes = Array.from(
        { length: r },
        (_, i) => config.rowSizes[i] || "1fr",
      );
    }

    onChange(newConfig);
  };

  const CountControl = ({
    label,
    value,
    field,
  }: {
    label: string;
    value: number;
    field: "columns" | "rows";
  }) => (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground font-mono">{label}</span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateField(field, Math.max(1, value - 1))}
          className="w-7 h-7 rounded bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors text-foreground"
        >
          <Minus size={14} />
        </button>
        <span className="w-8 text-center font-mono text-primary font-bold">
          {value}
        </span>
        <button
          onClick={() => updateField(field, Math.min(12, value + 1))}
          className="w-7 h-7 rounded bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors text-foreground"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-4 animate-slide-in">
      <div className="flex items-center gap-2 mb-3">
        <Grid3X3 size={16} className="text-primary" />
        <h3 className="font-mono text-sm font-semibold text-foreground uppercase tracking-wider">
          Grid Properties
        </h3>
      </div>

      <CountControl label="Columns" value={config.columns} field="columns" />
      <CountControl label="Rows" value={config.rows} field="rows" />

      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground font-mono">Gap</span>
        <select
          value={config.gap}
          onChange={(e) => updateField("gap", Number(e.target.value))}
          className="bg-secondary text-foreground rounded px-3 py-1 text-sm font-mono border border-border focus:ring-1 focus:ring-primary outline-none"
        >
          {[0, 1, 2, 3, 4, 6, 8].map((v) => (
            <option key={v} value={v}>
              {v * 4}px
            </option>
          ))}
        </select>
      </div>

      <div className="border-t border-border pt-4 mt-4">
        <div className="flex items-center gap-2 mb-3">
          <LayoutGrid size={16} className="text-blueprint-accent" />
          <h3 className="font-mono text-sm font-semibold text-foreground uppercase tracking-wider">
            Alignment
          </h3>
        </div>

        {(["justifyItems", "alignItems"] as const).map((prop) => (
          <div key={prop} className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground font-mono">
              {prop}
            </span>
            <select
              value={config[prop]}
              onChange={(e) => updateField(prop, e.target.value)}
              className="bg-secondary text-foreground rounded px-3 py-1 text-sm font-mono border border-border focus:ring-1 focus:ring-primary outline-none"
            >
              {["stretch", "start", "center", "end"].map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-4 mt-4">
        <h3 className="font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Column Sizes
        </h3>
        {config.columnSizes.map((size, i) => (
          <div key={i} className="flex items-center gap-2 mb-1">
            <span className="text-xs text-muted-foreground font-mono w-8">
              C{i + 1}
            </span>
            <input
              value={size}
              onChange={(e) => {
                const newSizes = [...config.columnSizes];
                newSizes[i] = e.target.value;
                updateField("columnSizes", newSizes);
              }}
              className="flex-1 bg-secondary text-foreground rounded px-2 py-1 text-xs font-mono border border-border focus:ring-1 focus:ring-primary outline-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridControls;
