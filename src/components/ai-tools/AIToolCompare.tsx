import { useState } from "react";
import { ChevronDown, X, Check } from "lucide-react";
import type { AITool } from "@/hooks/useAITools";

interface AIToolCompareProps {
  tools: AITool[];
}

const MAX_SLOTS = 3;

const maturityLabels: Record<string, string> = {
  dominant: "Dominant",
  mature: "Mature",
  growing: "Growing",
  emerging: "Emerging",
};

const pricingLabels: Record<string, string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
  enterprise: "Enterprise",
};

function getScoreColor(score: number) {
  if (score >= 80) return "text-emerald-400";
  if (score >= 60) return "text-blue-400";
  if (score >= 40) return "text-amber-400";
  return "text-muted-foreground";
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return "--";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function ToolSelector({
  tools,
  selected,
  excludeIds,
  onSelect,
  onClear,
}: {
  tools: AITool[];
  selected: AITool | null;
  excludeIds: Set<string>;
  onSelect: (tool: AITool) => void;
  onClear: () => void;
}) {
  const [open, setOpen] = useState(false);
  const available = tools.filter((t) => !excludeIds.has(t.id));

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-2 rounded-md border border-border bg-card px-3 py-2 text-xs transition-colors hover:border-primary/30"
      >
        <span className={selected ? "text-foreground font-medium" : "text-muted-foreground"}>
          {selected ? selected.name : "Select a tool..."}
        </span>
        <div className="flex items-center gap-1">
          {selected && (
            <span
              role="button"
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
              className="rounded p-0.5 hover:bg-muted/50"
            >
              <X className="h-3 w-3 text-muted-foreground" />
            </span>
          )}
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </div>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 max-h-52 w-full overflow-y-auto rounded-md border border-border bg-card shadow-lg">
          {available.length === 0 && (
            <p className="px-3 py-2 text-xs text-muted-foreground">No tools available</p>
          )}
          {available.map((tool) => (
            <button
              key={tool.id}
              onClick={() => {
                onSelect(tool);
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-foreground hover:bg-muted/40 transition-colors"
            >
              <span className="truncate">{tool.name}</span>
              <span className="ml-auto flex-shrink-0 text-[10px] text-muted-foreground/60">
                {tool.maker}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

type ComparisonRow = {
  label: string;
  render: (tool: AITool) => React.ReactNode;
};

const ROWS: ComparisonRow[] = [
  { label: "Maker", render: (t) => t.maker },
  { label: "Category", render: (t) => t.category.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) },
  {
    label: "Maturity",
    render: (t) => maturityLabels[t.maturity || ""] || "--",
  },
  {
    label: "Adoption Score",
    render: (t) => (
      <span className={`font-mono font-bold ${getScoreColor(t.adoption_score)}`}>
        {t.adoption_score}
      </span>
    ),
  },
  {
    label: "Pricing",
    render: (t) => pricingLabels[t.pricing_model || ""] || "--",
  },
  {
    label: "Latest Version",
    render: (t) => (t.latest_version ? `v${t.latest_version}` : "--"),
  },
  {
    label: "Release Date",
    render: (t) => formatDate(t.latest_release_date),
  },
  {
    label: "API Available",
    render: (t) =>
      t.api_available ? (
        <Check className="h-3.5 w-3.5 text-emerald-400" />
      ) : (
        <X className="h-3.5 w-3.5 text-muted-foreground/40" />
      ),
  },
  {
    label: "# Capabilities",
    render: (t) => t.key_capabilities.length,
  },
  {
    label: "# Integrations",
    render: (t) => t.integrations.length,
  },
];

export default function AIToolCompare({ tools }: AIToolCompareProps) {
  const [selected, setSelected] = useState<(AITool | null)[]>([null, null]);

  const excludeIds = new Set(selected.filter(Boolean).map((t) => t!.id));

  function handleSelect(index: number, tool: AITool) {
    setSelected((prev) => {
      const next = [...prev];
      next[index] = tool;
      return next;
    });
  }

  function handleClear(index: number) {
    setSelected((prev) => {
      const next = [...prev];
      next[index] = null;
      // Collapse trailing empty slot if it's the 3rd
      if (index === next.length - 1 && next.length > 2) {
        next.pop();
      }
      return next;
    });
  }

  function addSlot() {
    if (selected.length < MAX_SLOTS) {
      setSelected((prev) => [...prev, null]);
    }
  }

  const activePicks = selected.filter(Boolean) as AITool[];
  const canCompare = activePicks.length >= 2;

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="text-sm font-semibold text-foreground mb-3">Compare Tools</h3>

      {/* Selectors */}
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${selected.length}, minmax(0, 1fr))${selected.length < MAX_SLOTS ? " auto" : ""}` }}>
        {selected.map((sel, i) => (
          <ToolSelector
            key={i}
            tools={tools}
            selected={sel}
            excludeIds={new Set(selected.filter((s, j) => s && j !== i).map((s) => s!.id))}
            onSelect={(tool) => handleSelect(i, tool)}
            onClear={() => handleClear(i)}
          />
        ))}
        {selected.length < MAX_SLOTS && (
          <button
            onClick={addSlot}
            className="flex items-center justify-center rounded-md border border-dashed border-border px-3 py-2 text-xs text-muted-foreground hover:border-primary/30 hover:text-foreground transition-colors"
          >
            + Add
          </button>
        )}
      </div>

      {/* Comparison table */}
      {canCompare && (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 pr-3 text-left text-muted-foreground font-medium w-32" />
                {activePicks.map((tool) => (
                  <th
                    key={tool.id}
                    className="py-2 px-3 text-left text-foreground font-semibold"
                  >
                    {tool.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.label} className="border-b border-border/50">
                  <td className="py-2 pr-3 text-muted-foreground font-medium whitespace-nowrap">
                    {row.label}
                  </td>
                  {activePicks.map((tool) => (
                    <td key={tool.id} className="py-2 px-3 text-foreground">
                      {row.render(tool)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!canCompare && activePicks.length > 0 && (
        <p className="mt-3 text-xs text-muted-foreground">Select at least 2 tools to compare.</p>
      )}
    </div>
  );
}
