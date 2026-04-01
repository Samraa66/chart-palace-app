import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useVIPMembers, useActivityTrend } from "@/hooks/useAnalytics";
import { formatLastActive, MEMBER_STATUS_CONFIG } from "@/data/analyticsData";
import { Activity, AlertTriangle, Crown, UserCheck } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

const tooltipStyle = {
  backgroundColor: "hsl(220 18% 10%)",
  border: "1px solid hsl(220 14% 16%)",
  borderRadius: "8px",
  color: "hsl(210 20% 92%)",
  fontSize: "13px",
};

export default function MemberActivity() {
  const { data: members, isLoading: loadingMembers } = useVIPMembers();
  const { data: trend, isLoading: loadingTrend } = useActivityTrend();

  const activeCount = members?.filter((m) => m.status === "active").length ?? 0;
  const coolingCount = members?.filter((m) => m.status === "cooling").length ?? 0;
  const inactiveCount = members?.filter((m) => m.status === "inactive" || m.status === "churned").length ?? 0;
  const totalDeposits = members?.reduce((s, m) => s + m.depositTotal, 0) ?? 0;

  return (
    <div className="space-y-4 p-4 pb-24 max-w-5xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-foreground">Member Activity</h1>
        <p className="text-xs text-muted-foreground mt-0.5">VIP member engagement & alerts</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Active Members", value: String(activeCount), icon: UserCheck, color: "text-signal-buy" },
          { label: "Cooling Down", value: String(coolingCount), icon: Activity, color: "text-signal-pending" },
          { label: "Needs Attention", value: String(inactiveCount), icon: AlertTriangle, color: "text-signal-sell" },
          { label: "Total Deposits", value: `$${totalDeposits.toLocaleString()}`, icon: Crown, color: "text-primary" },
        ].map((s) => (
          <div key={s.label} className="glass-card p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-muted shrink-0">
              <s.icon className={`h-4 w-4 ${s.color}`} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <span className="text-lg font-bold text-foreground tabular-nums">{s.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Activity trend */}
      <div className="glass-card p-4">
        <h2 className="text-sm font-semibold text-foreground mb-3">Activity Trend</h2>
        {loadingTrend ? (
          <Skeleton className="h-[200px] w-full rounded-lg" />
        ) : (
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 16%)" />
                <XAxis dataKey="date" tick={{ fill: "hsl(215 12% 52%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(215 12% 52%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="activeMembers" stroke="hsl(152 60% 48%)" strokeWidth={2} dot={false} name="Active" />
                <Line type="monotone" dataKey="messages" stroke="hsl(210 100% 56%)" strokeWidth={2} dot={false} name="Messages" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Member list */}
      <div className="glass-card p-4">
        <h2 className="text-sm font-semibold text-foreground mb-3">VIP Members</h2>
        {loadingMembers ? (
          <Skeleton className="h-[300px] w-full rounded-lg" />
        ) : (
          <div className="space-y-1">
            {members
              ?.sort((a, b) => {
                const order = { churned: 0, inactive: 1, cooling: 2, active: 3 };
                return order[a.status] - order[b.status];
              })
              .map((m) => {
                const cfg = MEMBER_STATUS_CONFIG[m.status];
                return (
                  <div key={m.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-muted-foreground">{m.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground truncate">{m.name}</span>
                        <Badge className={`text-[10px] px-1.5 py-0 border-0 ${cfg.bgColor} ${cfg.color}`}>
                          {cfg.label}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-[11px] text-muted-foreground">{m.username}</span>
                        <span className="text-[11px] text-muted-foreground">·</span>
                        <span className="text-[11px] text-muted-foreground">${m.depositTotal.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[11px] text-muted-foreground">{formatLastActive(m.lastActive)}</p>
                      <p className="text-[11px] text-muted-foreground tabular-nums">{m.tradesThisWeek} trades</p>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {/* Inactive alerts */}
      {members?.some((m) => m.status === "inactive" || m.status === "churned") && (
        <div className="glass-card p-4 border-signal-sell/20">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-4 w-4 text-signal-sell" />
            <h2 className="text-sm font-semibold text-signal-sell">Inactive Alerts</h2>
          </div>
          <div className="space-y-2">
            {members
              ?.filter((m) => m.status === "inactive" || m.status === "churned")
              .map((m) => (
                <div key={m.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <div>
                    <span className="text-sm text-foreground">{m.name}</span>
                    <p className="text-[11px] text-muted-foreground">Last seen {formatLastActive(m.lastActive)} · ${m.depositTotal} deposited</p>
                  </div>
                  <button className="text-xs px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors">
                    Re-engage
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
