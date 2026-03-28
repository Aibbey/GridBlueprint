import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { GridConfig } from "@/utils/grid";
import { generateTailwindCode, generateCSSCode } from "@/utils/codeGenerator";
import { Copy, Check, Code2 } from "lucide-react";

interface CodePreviewProps {
  config: GridConfig;
}

const CodePreview = ({ config }: CodePreviewProps) => {
  const [tab, setTab] = useState<"tailwind" | "css">("tailwind");
  const [copied, setCopied] = useState(false);

  const code =
    tab === "tailwind" ? generateTailwindCode(config) : generateCSSCode(config);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-border bg-code-bg overflow-hidden animate-slide-in">
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <div className="flex items-center gap-2">
          <Code2 size={14} className="text-primary" />
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
            Code Export
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-secondary rounded overflow-hidden">
            {(["tailwind", "css"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-1 text-xs font-mono transition-colors ${
                  tab === t
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t === "tailwind" ? "React + TW" : "CSS"}
              </button>
            ))}
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 rounded text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
          >
            {copied ? (
              <Check size={14} className="text-green-400" />
            ) : (
              <Copy size={14} />
            )}
            {copied ? "Copié!" : "Copier"}
          </button>
        </div>
      </div>
      <SyntaxHighlighter
        language={tab === "tailwind" ? "tsx" : "css"}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: "1rem",
          background: "transparent",
          fontSize: "12px",
          maxHeight: "300px",
        }}
        showLineNumbers
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodePreview;
