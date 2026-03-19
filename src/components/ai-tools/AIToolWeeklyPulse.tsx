import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Activity, Calendar, Layers, Rocket, Crown, ArrowRight } from "lucide-react";
import type { AITool } from "@/hooks/useAITools";

interface FlatRelease {
  toolName: string;
  toolSlug: string;
  version: string;
  date: string;
  highlights: string[];
  isRecent: boolean; // within last 30 days
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatShortDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function daysAgo(dateStr: string): number {
  const now = new Date();
  const then = new Date(dateStr);
  return Math.floor((now.getTime() - then.getTime()) / (1000 * 60 * 60 * 24));
}

export default function AIToolWeeklyPulse({ tools }: { tools: AITool[] }) {
  const { releases, dateRange, stats } = useMemo(() => {
    // Extract ALL releases from all tools
    const allReleases: FlatRelease[] = [];
    for (const tool of tools) {
      if (!tool.release_history || tool.release_history.length === 0) continue;
      for (const release of tool.release_history) {
        allReleases.push({
          toolName: tool.name,
          toolSlug: tool.slug,
          version: release.version,
          date: release.date,
          highlights: release.highlights || [],
          isRecent: daysAgo(release.date) <= 30,
        });
      }
    }

    // Sort descending by date, take top 6
    allReleases.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const top6 = allReleases.slice(0, 6);

    // Date range for subtitle
    const oldest = top6.length > 0 ? top6[top6.length - 1].date : "";
    const newest = top6.length > 0 ? top6[0].date : "";

    // Stats
    const dominantCount = tools.filter((t) => t.maturity === "dominant").length;

    return {
      releases: top6,
      dateRange: oldest && newest ? `${formatShortDate(oldest)} - ${formatShortDate(newest)}` : "",
      stats: {
        totalTools: tools.length,
        categories: 10,
        latestRelease: newest ? formatDate(newest) : "N/A",
        dominantTools: dominantCount,
      },
    };
  }, [tools]);

  if (tools.length === 0) return null;

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Activity className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">AI Release Pulse</h2>
            {dateRange && (
              <p className="text-[10px] text-muted-foreground/60">{dateRange}</p>
            )}
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <StatBlock
          icon={Layers}
          label="Tools Tracked"
          value={String(stats.totalTools)}
          color="text-blue-400"
        />
        <StatBlock
          icon={Layers}
          label="Categories"
          value={String(stats.categories)}
          color="text-violet-400"
        />
        <StatBlock
          icon={Calendar}
          label="Latest Release"
          value={stats.latestRelease}
          color="text-emerald-400"
        />
        <StatBlock
          icon={Crown}
          label="Dominant Tools"
          value={String(stats.dominantTools)}
          color="text-amber-400"
        />
      </div>

      {/* Release Cards - horizontal scroll */}
      {releases.length > 0 ? (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {releases.map((release, i) => (
            <ReleaseCard key={`${release.toolSlug}-${release.version}-${i}`} release={release} />
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">No release history available yet.</p>
      )}
    </section>
  );
}

/* ---- Stat Block ---- */

function StatBlock({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div className="flex items-center gap-1.5">
        <Icon className={`h-3 w-3 ${color}`} />
        <span className="text-[10px] text-muted-foreground/60">{label}</span>
      </div>
      <p className={`mt-1 text-sm font-semibold text-foreground`}>{value}</p>
    </div>
  );
}

/* ---- Release Card ---- */

function ReleaseCard({ release }: { release: FlatRelease }) {
  const age = daysAgo(release.date);

  return (
    <Link
      to={`/ai-tools/${release.toolSlug}`}
      className={`group relative flex-shrink-0 w-64 rounded-lg border p-4 transition-all hover:border-primary/30 hover:bg-card/80 ${
        release.isRecent
          ? "border-primary/20 bg-primary/[0.03]"
          : "border-border bg-card"
      }`}
    >
      {/* Recent badge */}
      {release.isRecent && (
        <span className="absolute -top-2 right-3 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary border border-primary/20">
          <Rocket className="h-2.5 w-2.5" />
          {age === 0 ? "Today" : age === 1 ? "Yesterday" : `${age}d ago`}
        </span>
      )}

      {/* Tool name + version */}
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
          {release.toolName}
        </h3>
        <span className="flex-shrink-0 rounded bg-muted/50 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
          v{release.version}
        </span>
      </div>

      {/* Date */}
      <p className="mt-1 text-[10px] text-muted-foreground/60">
        {formatDate(release.date)}
      </p>

      {/* Highlights (show up to 3) */}
      {release.highlights.length > 0 && (
        <ul className="mt-2.5 space-y-1">
          {release.highlights.slice(0, 3).map((h, j) => (
            <li key={j} className="text-xs text-muted-foreground leading-relaxed line-clamp-1">
              <span className="text-primary/50 mr-1">-</span>
              {h}
            </li>
          ))}
        </ul>
      )}

      {/* Footer link hint */}
      <div className="mt-3 flex items-center gap-1 text-[10px] text-muted-foreground/40 group-hover:text-primary/50 transition-colors">
        <span>View tool</span>
        <ArrowRight className="h-2.5 w-2.5" />
      </div>
    </Link>
  );
}
