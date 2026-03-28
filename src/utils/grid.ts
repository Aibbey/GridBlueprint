export interface GridCell {
  id: string;
  label: string;
  rowStart: number;
  rowEnd: number;
  colStart: number;
  colEnd: number;
  color: string;
}

export interface GridConfig {
  columns: number;
  rows: number;
  gap: number;
  columnSizes: string[];
  rowSizes: string[];
  justifyItems: string;
  alignItems: string;
  cells: GridCell[];
  layoutType: 'grid' | 'flex';
}

export interface Blueprint {
  id: string;
  name: string;
  icon: string;
  description: string;
  config: GridConfig;
}

export const defaultGridConfig: GridConfig = {
  columns: 3,
  rows: 3,
  gap: 4,
  columnSizes: ['1fr', '1fr', '1fr'],
  rowSizes: ['1fr', '1fr', '1fr'],
  justifyItems: 'stretch',
  alignItems: 'stretch',
  cells: [],
  layoutType: 'grid',
};

const cellColors = [
  '187 100% 50%',
  '35 100% 60%', 
  '280 80% 60%',  
  '140 70% 50%', 
  '350 80% 60%',
  '200 90% 55%',
  '50 100% 55%',  
  '320 80% 55%',
];

export function getCellColor(index: number): string {
  return cellColors[index % cellColors.length];
}
