import { GridConfig } from '@/utils/grid';

export function generateTailwindCode(config: GridConfig): string {
  const { columns, rows, gap, columnSizes, rowSizes, cells } = config;

  const isUniformCols = columnSizes.every(s => s === '1fr');
  const isUniformRows = rowSizes.every(s => s === '1fr');

  let gridClass = 'grid';
  
  if (isUniformCols) {
    gridClass += ` grid-cols-${columns}`;
  }
  if (isUniformRows) {
    gridClass += ` grid-rows-${rows}`;
  }
  gridClass += ` gap-${gap}`;

  const needsCustomTemplate = !isUniformCols || !isUniformRows;
  
  let styleAttr = '';
  if (needsCustomTemplate) {
    const parts: string[] = [];
    if (!isUniformCols) {
      parts.push(`gridTemplateColumns: '${columnSizes.join(' ')}'`);
    }
    if (!isUniformRows) {
      parts.push(`gridTemplateRows: '${rowSizes.join(' ')}'`);
    }
    styleAttr = `\n        style={{ ${parts.join(', ')} }}`;
  }

  const cellsCode = cells.length > 0
    ? cells.map(cell => {
        const spanClasses: string[] = [];
        const colSpan = cell.colEnd - cell.colStart;
        const rowSpan = cell.rowEnd - cell.rowStart;
        
        if (colSpan > 1) spanClasses.push(`col-span-${colSpan}`);
        if (rowSpan > 1) spanClasses.push(`row-span-${rowSpan}`);
        
        spanClasses.push(`col-start-${cell.colStart}`);
        spanClasses.push(`row-start-${cell.rowStart}`);

        const cls = `rounded-lg bg-muted p-4 ${spanClasses.join(' ')}`;
        return `        <div className="${cls}">\n          ${cell.label}\n        </div>`;
      }).join('\n')
    : Array.from({ length: columns * rows }, (_, i) =>
        `        <div className="rounded-lg bg-muted p-4">\n          Cell ${i + 1}\n        </div>`
      ).join('\n');

  return `const GridLayout = () => {
  return (
    <div
      className="${gridClass}"${styleAttr}
    >
${cellsCode}
    </div>
  );
};`;
}

export function generateCSSCode(config: GridConfig): string {
  const { columnSizes, rowSizes, gap } = config;

  return `.grid-container {
  display: grid;
  grid-template-columns: ${columnSizes.join(' ')};
  grid-template-rows: ${rowSizes.join(' ')};
  gap: ${gap * 4}px;
}`;
}
