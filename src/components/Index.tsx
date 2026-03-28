import { useState } from "react";
import { GridConfig, defaultGridConfig } from "@/utils/grid";
import GridCanvas from "@/components/GridCanvas";
import GridControls from "@/components/GridControls";
import CodePreview from "@/components/CodePreview";
import BlueprintSelector from "@/components/BlueprintSelector";
import ResponsiveSlider from "@/components/ResponsiveSlider";
import CellEditor from "@/components/CellEditor";
import { Grid3X3, Zap } from "lucide-react";

const Index = () => {
  const [config, setConfig] = useState<GridConfig>(defaultGridConfig);
  const [previewWidth, setPreviewWidth] = useState(800);
  const [activeBlueprint, setActiveBlueprint] = useState<string | undefined>();
  const [selectedCellId, setSelectedCellId] = useState<string | null>(null);

  const handleBlueprintSelect = (newConfig: GridConfig) => {
    setConfig(newConfig);
    setActiveBlueprint(
      newConfig === config
        ? undefined
        : newConfig.cells.length > 8
          ? "instagram"
          : newConfig.cells.length > 10
            ? "netflix"
            : "airbnb",
    );
    setSelectedCellId(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-4">
        <div className="flex items-center justify-between max-w-[1600px] mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center glow-cyan">
              <Grid3X3 size={20} className="text-primary" />
            </div>
            <div>
              <h1 className="font-mono text-lg font-bold text-foreground tracking-tight">
                Grid<span className="text-primary">Blueprint</span>
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto flex gap-0 min-h-[calc(100vh-65px)]">
        <aside className="w-[280px] min-w-[280px] border-r border-border p-4 space-y-6 overflow-auto">
          <GridControls
            config={config}
            onChange={(c) => {
              setConfig(c);
              setActiveBlueprint(undefined);
            }}
          />
          <div className="border-t border-border pt-4">
            <CellEditor
              config={config}
              onChange={(c) => {
                setConfig(c);
                setActiveBlueprint(undefined);
              }}
              selectedCellId={selectedCellId}
              onSelectCell={setSelectedCellId}
            />
          </div>
          <div className="border-t border-border pt-4">
            <BlueprintSelector
              onSelect={handleBlueprintSelect}
              activeId={activeBlueprint}
            />
          </div>
        </aside>

        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="border-b border-border px-6 py-3">
            <ResponsiveSlider value={previewWidth} onChange={setPreviewWidth} />
          </div>

          <div className="flex-1 p-6 overflow-auto">
            <GridCanvas
              config={config}
              previewWidth={previewWidth}
              onCellClick={(cell) => setSelectedCellId(cell.id)}
              selectedCellId={selectedCellId}
            />
          </div>

          <div className="border-t border-border p-4">
            <CodePreview config={config} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
