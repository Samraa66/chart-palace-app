import { useState } from "react";
import { providers } from "@/data/mockData";
import { ArrowUpDown, TrendingUp, Radio, Star, Send } from "lucide-react";

type SortKey = "score" | "winRate" | "totalSignals";

export default function Providers() {
  const [sortBy, setSortBy] = useState<SortKey>("score");
  const sorted = [...providers].sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground text-balance">Signal Channels</h1>
        <p className="text-sm text-muted-foreground mt-1">{providers.length} Telegram channels tracked</p>
      </div>

      <div className="flex items-center gap-2">
        <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">Sort by:</span>
        {(["score", "winRate", "totalSignals"] as SortKey[]).map((key) => (
          <button
            key={key}
            onClick={() => setSortBy(key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-150 active:scale-95 ${
              sortBy === key ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-accent"
            }`}
          >
            {key === "winRate" ? "Win Rate" : key === "totalSignals" ? "Signals" : "Score"}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {sorted.map((p, i) => (
          <div
            key={p.id}
            className="glass-card p-5 flex items-center gap-5 opacity-0 animate-fade-up transition-all duration-200 hover:translate-y-[-1px]"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-primary font-bold text-sm">{p.avatar}</span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">{p.name}</h3>
                <span className="flex items-center gap-1 text-[10px] text-muted-foreground/60 bg-secondary px-1.5 py-0.5 rounded">
                  <Send className="h-2.5 w-2.5" /> {p.platform}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-1">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3" /> {p.winRate}% win rate
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Radio className="h-3 w-3" /> {p.totalSignals} XAUUSD signals
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10">
              <Star className="h-3.5 w-3.5 text-primary" />
              <span className="text-sm font-bold text-primary tabular-nums">{p.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
