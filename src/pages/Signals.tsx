import { useState, useMemo } from "react";
import { SignalCard } from "@/components/SignalCard";
import { signals } from "@/data/mockData";
import { Search } from "lucide-react";

const assets = ["All", ...new Set(signals.map((s) => s.asset))];
const channels = ["All", ...new Set(signals.map((s) => s.source))];
const statuses = ["All", "Open", "TP Hit", "SL Hit"];

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-150 active:scale-95 ${
        active ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-accent"
      }`}
    >
      {label}
    </button>
  );
}

export default function Signals() {
  const [assetFilter, setAssetFilter] = useState("All");
  const [channelFilter, setChannelFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = useMemo(() => {
    return signals.filter((s) => {
      if (assetFilter !== "All" && s.asset !== assetFilter) return false;
      if (channelFilter !== "All" && s.source !== channelFilter) return false;
      if (statusFilter !== "All" && s.status !== statusFilter) return false;
      return true;
    });
  }, [assetFilter, channelFilter, statusFilter]);

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground text-balance">Signals Feed</h1>
        <p className="text-sm text-muted-foreground mt-1">{filtered.length} signals</p>
      </div>

      <div className="glass-card p-4 space-y-3">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider mr-1">Asset</span>
          {assets.map((a) => (
            <FilterChip key={a} label={a} active={assetFilter === a} onClick={() => setAssetFilter(a)} />
          ))}
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider mr-1">Channel</span>
          {channels.map((c) => (
            <FilterChip key={c} label={c} active={channelFilter === c} onClick={() => setChannelFilter(c)} />
          ))}
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider mr-1">Status</span>
          {statuses.map((s) => (
            <FilterChip key={s} label={s} active={statusFilter === s} onClick={() => setStatusFilter(s)} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((s, i) => (
          <div key={s.id} className="opacity-0 animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
            <SignalCard signal={s} />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="glass-card p-12 text-center">
          <Search className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No signals match your filters</p>
          <button
            onClick={() => { setAssetFilter("All"); setChannelFilter("All"); setStatusFilter("All"); }}
            className="text-primary text-sm mt-2 hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
