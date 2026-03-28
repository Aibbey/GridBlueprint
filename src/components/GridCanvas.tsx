import { GridConfig, GridCell } from "@/utils/grid";

interface GridCanvasProps {
  config: GridConfig;
  previewWidth: number;
  onCellClick?: (cell: GridCell) => void;
  selectedCellId?: string | null;
}

const GridCanvas = ({
  config,
  previewWidth,
  onCellClick,
  selectedCellId,
}: GridCanvasProps) => {
  const { columns, rows, gap, columnSizes, rowSizes, cells } = config;

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: columnSizes.join(" "),
    gridTemplateRows: rowSizes.join(" "),
    gap: `${gap * 4}px`,
    width: `${previewWidth}px`,
    minHeight: "400px",
    maxWidth: "100%",
  };

  const hasCells = cells.length > 0;

  return (
    <div className="relative overflow-auto rounded-lg border border-border p-4 grid-pattern">
      <div style={gridStyle} className="mx-auto transition-all duration-300">
        {hasCells
          ? cells.map((cell) => (
              <div
                key={cell.id}
                onClick={() => onCellClick?.(cell)}
                className={`
                  relative rounded-md border-2 transition-all duration-200 cursor-pointer
                  flex items-center justify-center font-mono text-xs
                  hover:scale-[1.02]
                  ${selectedCellId === cell.id ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}
                `}
                style={{
                  gridColumn: `${cell.colStart} / ${cell.colEnd}`,
                  gridRow: `${cell.rowStart} / ${cell.rowEnd}`,
                  backgroundColor: `hsl(${cell.color} / 0.15)`,
                  borderColor: `hsl(${cell.color} / 0.6)`,
                  color: `hsl(${cell.color})`,
                }}
              >
                <span className="text-glow">{cell.label}</span>
                <span className="absolute bottom-1 right-1 text-[10px] opacity-40">
                  {cell.colEnd - cell.colStart}×{cell.rowEnd - cell.rowStart}
                </span>
              </div>
            ))
          : Array.from({ length: columns * rows }, (_, i) => (
              <div
                key={i}
                className="rounded-md border border-dashed border-grid-line bg-grid-cell/30 
                           flex items-center justify-center font-mono text-xs text-muted-foreground
                           hover:bg-primary/10 hover:border-primary/40 transition-all duration-200 min-h-[60px]"
              >
                {i + 1}
              </div>
            ))}
      </div>
    </div>
  );
};

export default GridCanvas;
