import { Smartphone, Tablet, Monitor } from 'lucide-react';

interface ResponsiveSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const breakpoints = [
  { icon: Smartphone, label: '375px', value: 375 },
  { icon: Tablet, label: '768px', value: 768 },
  { icon: Monitor, label: '1200px', value: 1200 },
];

const ResponsiveSlider = ({ value, onChange }: ResponsiveSliderProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1">
        {breakpoints.map(({ icon: Icon, label, value: bpValue }) => (
          <button
            key={label}
            onClick={() => onChange(bpValue)}
            className={`p-1.5 rounded transition-colors ${
              Math.abs(value - bpValue) < 50
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            title={label}
          >
            <Icon size={16} />
          </button>
        ))}
      </div>
      <input
        type="range"
        min={320}
        max={1400}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
      />
      <span className="font-mono text-xs text-primary min-w-[50px] text-right">{value}px</span>
    </div>
  );
};

export default ResponsiveSlider;
