import { Signal } from "@/data/mockData";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

function StatusBadge({ status }: { status: Signal["status"] }) {
  const styles = {
    Open: "bg-signal-pending/15 text-signal-pending",
    "TP Hit": "bg-signal-buy/15 text-signal-buy",
    "SL Hit": "bg-signal-sell/15 text-signal-sell",
  };
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${styles[status]}`}>
      {status}
    </span>
  );
}

export function SignalCard({ signal }: { signal: Signal }) {
  const isBuy = signal.type === "BUY";

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
            <span className="font-semibold text-sm text-foreground">{signal.asset}</span>
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
          <p className="text-sm font-medium text-foreground tabular-nums">{signal.entry}</p>
        </div>
        <div>
          <p className="text-[11px] text-muted-foreground uppercase tracking-wider">TP</p>
          <p className="text-sm font-medium text-signal-buy tabular-nums">{signal.tp}</p>
        </div>
        <div>
          <p className="text-[11px] text-muted-foreground uppercase tracking-wider">SL</p>
          <p className="text-sm font-medium text-signal-sell tabular-nums">{signal.sl}</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{signal.source}</span>
        <span>{new Date(signal.timestamp).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
      </div>
    </div>
  );
}
