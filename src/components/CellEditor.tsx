import { GridCell, GridConfig, getCellColor } from "@/utils/grid";
import { Plus, Trash2 } from "lucide-react";

interface CellEditorProps {
  config: GridConfig;
  onChange: (config: GridConfig) => void;
  selectedCellId: string | null;
  onSelectCell: (id: string | null) => void;
}

const CellEditor = ({
  config,
  onChange,
  selectedCellId,
  onSelectCell,
}: CellEditorProps) => {
  const addCell = () => {
    const id = `cell-${Date.now()}`;
    const newCell: GridCell = {
      id,
      label: `Zone ${config.cells.length + 1}`,
      rowStart: 1,
      rowEnd: 2,
      colStart: 1,
      colEnd: 2,
      color: getCellColor(config.cells.length),
    };
    onChange({ ...config, cells: [...config.cells, newCell] });
    onSelectCell(id);
  };

  const updateCell = (id: string, updates: Partial<GridCell>) => {
    onChange({
      ...config,
      cells: config.cells.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    });
  };

  const removeCell = (id: string) => {
    onChange({ ...config, cells: config.cells.filter((c) => c.id !== id) });
    if (selectedCellId === id) onSelectCell(null);
  };

  const selectedCell = config.cells.find((c) => c.id === selectedCellId);

  return (
    <div className="space-y-3 animate-slide-in">
      <div className="flex items-center justify-between">
        <h3 className="font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Zones ({config.cells.length})
        </h3>
        <button
          onClick={addCell}
          className="flex items-center gap-1 px-2 py-1 rounded text-xs font-mono bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        >
          <Plus size={12} /> Ajouter
        </button>
      </div>

      <div className="space-y-1 max-h-[150px] overflow-auto">
        {config.cells.map((cell) => (
          <div
            key={cell.id}
            onClick={() => onSelectCell(cell.id)}
            className={`flex items-center justify-between px-2 py-1.5 rounded text-xs font-mono cursor-pointer transition-colors ${
              selectedCellId === cell.id
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: `hsl(${cell.color})` }}
              />
              <span>{cell.label}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeCell(cell.id);
              }}
              className="text-muted-foreground hover:text-destructive transition-colors"
            >
              <Trash2 size={12} />
            </button>
          </div>
        ))}
      </div>

      {selectedCell && (
        <div className="border-t border-border pt-3 space-y-2">
          <input
            value={selectedCell.label}
            onChange={(e) =>
              updateCell(selectedCell.id, { label: e.target.value })
            }
            className="w-full bg-secondary text-foreground rounded px-2 py-1 text-xs font-mono border border-border focus:ring-1 focus:ring-primary outline-none"
          />
          <div className="grid grid-cols-2 gap-2">
            {(["colStart", "colEnd", "rowStart", "rowEnd"] as const).map(
              (field) => (
                <div key={field}>
                  <label className="text-[10px] text-muted-foreground font-mono">
                    {field}
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={
                      field.includes("col")
                        ? config.columns + 1
                        : config.rows + 1
                    }
                    value={selectedCell[field]}
                    onChange={(e) =>
                      updateCell(selectedCell.id, {
                        [field]: Number(e.target.value),
                      })
                    }
                    className="w-full bg-secondary text-foreground rounded px-2 py-1 text-xs font-mono border border-border focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CellEditor;
