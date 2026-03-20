import { Signal, timeAgo, pipsMoved } from "@/data/mockData";
import { ArrowUpRight, ArrowDownRight, Zap, Send } from "lucide-react";

function StatusBadge({ status }: { status: Signal["status"] }) {
  const styles = {
    Live: "bg-signal-buy/15 text-signal-buy animate-pulse-glow",
    "TP Hit": "bg-signal-buy/15 text-signal-buy",
    "SL Hit": "bg-signal-sell/15 text-signal-sell",
  };
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${styles[status]}`}>
      {status === "Live" && "● "}{status}
    </span>
  );
}

export function SignalCard({ signal }: { signal: Signal }) {
  const isBuy = signal.type === "BUY";
  const pips = pipsMoved(signal.entry, signal.currentPrice, signal.type);
  const isPositive = pips >= 0;

  return (
    <div className="glass-card p-4 transition-all duration-200 hover:translate-y-[-1px]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-md ${isBuy ? "bg-signal-buy/15" : "bg-signal-sell/15"}`}>
            {isBuy ? (
              <ArrowUpRight className="h-4 w-4 text-signal-buy" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-signal-sell" />
            )}
          </div>
          <div>
            <span className="font-semibold text-sm text-foreground">XAUUSD</span>
            <span className={`ml-2 text-xs font-medium ${isBuy ? "text-signal-buy" : "text-signal-sell"}`}>
              {signal.type}
            </span>
          </div>
        </div>
        <StatusBadge status={signal.status} />
      </div>

      <div className="grid grid-cols-3 gap-3 mb-3">
        <div>
          <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Entry</p>
          <p className="text-sm font-medium text-foreground tabular-nums">{signal.entry.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-[11px] text-muted-foreground uppercase tracking-wider">TP</p>
          <p className="text-sm font-medium text-signal-buy tabular-nums">{signal.tp.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-[11px] text-muted-foreground uppercase tracking-wider">SL</p>
          <p className="text-sm font-medium text-signal-sell tabular-nums">{signal.sl.toFixed(2)}</p>
        </div>
      </div>

      {/* Execution Insight */}
      <div className="grid grid-cols-3 gap-3 mb-3 p-2.5 rounded-lg bg-secondary/50 border border-border/30">
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Current</p>
          <p className="text-sm font-semibold text-foreground tabular-nums">{signal.currentPrice.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Pips</p>
          <p className={`text-sm font-semibold tabular-nums ${isPositive ? "text-signal-buy" : "text-signal-sell"}`}>
            {isPositive ? "+" : ""}{pips.toFixed(1)}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Delay</p>
          <p className="text-sm font-semibold text-foreground tabular-nums">{signal.delaySeconds}s</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Send className="h-3 w-3" />
          <span>{signal.source}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Zap className="h-3 w-3 text-signal-pending" />
          <span>{timeAgo(signal.timestamp)}</span>
        </div>
      </div>
    </div>
  );
}
