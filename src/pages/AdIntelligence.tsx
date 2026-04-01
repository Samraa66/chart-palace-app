import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { useCampaigns, useDailyAdSpend } from "@/hooks/useAnalytics";
import { DollarSign, MousePointerClick, TrendingUp, Zap } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { chartTooltipStyle, chartGridColor, chartTickStyle } from "@/lib/chartTheme";

export default function AdIntelligence() {
  const { data: campaigns, isLoading: loadingCampaigns } = useCampaigns();
  const { data: adSpend, isLoading: loadingSpend } = useDailyAdSpend();

  const totalSpend = campaigns?.reduce((s, c) => s + c.spend, 0) ?? 0;
  const totalRevenue = campaigns?.reduce((s, c) => s + c.depositValue, 0) ?? 0;
  const totalDeposits = campaigns?.reduce((s, c) => s + c.deposits, 0) ?? 0;
  const overallROAS = totalSpend > 0 ? (totalRevenue / totalSpend).toFixed(2) : "0";

  return (
    <div className="space-y-4 p-4 pb-24 max-w-5xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-foreground">Ad Intelligence</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Meta ad spend → deposits</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Spend", value: `$${totalSpend.toLocaleString()}`, icon: DollarSign },
          { label: "Deposits", value: String(totalDeposits), icon: MousePointerClick },
          { label: "Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: TrendingUp },
          { label: "ROAS", value: `${overallROAS}x`, icon: Zap, highlight: true },
        ].map((s) => (
          <div key={s.label} className="glass-card p-4 flex items-center gap-3">
            <div className={`p-2 rounded-lg shrink-0 ${s.highlight ? "bg-signal-buy/10" : "bg-primary/10"}`}>
              <s.icon className={`h-4 w-4 ${s.highlight ? "text-signal-buy" : "text-primary"}`} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <span className="text-lg font-bold text-foreground tabular-nums">{s.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Spend vs Revenue chart */}
      <div className="glass-card p-4">
        <h2 className="text-sm font-semibold text-foreground mb-3">Daily Spend vs Revenue</h2>
        {loadingSpend ? (
          <Skeleton className="h-[220px] w-full rounded-lg" />
        ) : (
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={adSpend} barSize={16}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} />
                <XAxis dataKey="date" tick={chartTickStyle} axisLine={false} tickLine={false} />
                <YAxis tick={chartTickStyle} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
                <Tooltip contentStyle={chartTooltipStyle} formatter={(v: number) => `$${v}`} />
                <Bar dataKey="spend" fill="hsl(0 72% 56%)" radius={[4, 4, 0, 0]} name="Ad Spend" />
                <Bar dataKey="revenue" fill="hsl(152 60% 48%)" radius={[4, 4, 0, 0]} name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Campaign table */}
      <div className="glass-card p-4">
        <h2 className="text-sm font-semibold text-foreground mb-3">Campaigns</h2>
        {loadingCampaigns ? (
          <Skeleton className="h-[200px] w-full rounded-lg" />
        ) : (
          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="border-b border-border text-muted-foreground text-xs">
                  <th className="text-left py-2 font-medium">Campaign</th>
                  <th className="text-right py-2 font-medium">Spend</th>
                  <th className="text-right py-2 font-medium">Leads</th>
                  <th className="text-right py-2 font-medium">Deposits</th>
                  <th className="text-right py-2 font-medium">ROAS</th>
                  <th className="text-right py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {campaigns?.map((c) => (
                  <tr key={c.id} className="border-b border-border/50 last:border-0">
                    <td className="py-2.5 text-foreground font-medium">{c.name}</td>
                    <td className="py-2.5 text-right tabular-nums text-muted-foreground">${c.spend.toLocaleString()}</td>
                    <td className="py-2.5 text-right tabular-nums text-muted-foreground">{c.leads}</td>
                    <td className="py-2.5 text-right tabular-nums text-foreground font-medium">{c.deposits}</td>
                    <td className="py-2.5 text-right tabular-nums">
                      <span className={c.roas >= 4 ? "text-signal-buy font-semibold" : c.roas >= 2 ? "text-signal-pending" : "text-signal-sell"}>
                        {c.roas}x
                      </span>
                    </td>
                    <td className="py-2.5 text-right">
                      <Badge variant={c.status === "active" ? "default" : "secondary"} className="text-[10px] px-1.5 py-0">
                        {c.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
