import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Cell } from "recharts";
import { useDailyLeads, useWeeklyLeads, useFunnelStages } from "@/hooks/useAnalytics";
import { TrendingUp, TrendingDown, Users, Target } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { chartTooltipStyle, chartGridColor, chartTickStyle } from "@/lib/chartTheme";

const FUNNEL_COLORS = [
  "hsl(210, 100%, 56%)", // New
  "hsl(210, 80%, 60%)",  // Contacted
  "hsl(45, 93%, 47%)",   // Qualified
  "hsl(25, 95%, 53%)",   // Hesitant
  "hsl(270, 60%, 60%)",  // Link Sent
  "hsl(270, 50%, 55%)",  // Registered
  "hsl(152, 60%, 48%)",  // Deposited
  "hsl(152, 70%, 40%)",  // VIP
];

function StatMini({ label, value, icon: Icon, trend }: { label: string; value: string; icon: React.ElementType; trend?: string }) {
  const isPositive = trend?.startsWith("+");
  return (
    <div className="glass-card p-4 flex items-center gap-3">
      <div className="p-2 rounded-lg bg-primary/10 shrink-0">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground truncate">{label}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-foreground tabular-nums">{value}</span>
          {trend && (
            <span className={`text-xs font-medium ${isPositive ? "text-signal-buy" : "text-signal-sell"}`}>
              {trend}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FunnelAnalytics() {
  const { data: daily, isLoading: loadingDaily } = useDailyLeads();
  const { data: weekly, isLoading: loadingWeekly } = useWeeklyLeads();
  const { data: funnel, isLoading: loadingFunnel } = useFunnelStages();

  const totalThisWeek = daily?.reduce((s, d) => s + d.leads, 0) ?? 0;
  const convertedThisWeek = daily?.reduce((s, d) => s + d.converted, 0) ?? 0;
  const avgConversion = totalThisWeek > 0 ? ((convertedThisWeek / totalThisWeek) * 100).toFixed(1) : "0";
  const biggestDropOff = funnel?.reduce((max, s) => (s.dropOff > max.dropOff ? s : max), funnel[0]);

  return (
    <div className="space-y-4 p-4 pb-24 max-w-5xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-foreground">Funnel Analytics</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Conversion rates & lead flow</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatMini label="Leads This Week" value={String(totalThisWeek)} icon={Users} trend="+18%" />
        <StatMini label="Converted" value={String(convertedThisWeek)} icon={Target} trend={`${avgConversion}%`} />
        <StatMini label="Avg Conversion" value={`${avgConversion}%`} icon={TrendingUp} />
        <StatMini label="Biggest Drop-off" value={biggestDropOff?.stage ?? "—"} icon={TrendingDown} trend={biggestDropOff ? `-${biggestDropOff.dropOff}%` : undefined} />
      </div>

      {/* Daily leads chart */}
      <div className="glass-card p-4">
        <h2 className="text-sm font-semibold text-foreground mb-3">Daily Leads</h2>
        {loadingDaily ? (
          <Skeleton className="h-[220px] w-full rounded-lg" />
        ) : (
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={daily} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} />
                <XAxis dataKey="date" tick={chartTickStyle} axisLine={false} tickLine={false} />
                <YAxis tick={chartTickStyle} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Bar dataKey="leads" fill="hsl(210 100% 56%)" radius={[4, 4, 0, 0]} name="New Leads" />
                <Bar dataKey="converted" fill="hsl(152 60% 48%)" radius={[4, 4, 0, 0]} name="Converted" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Weekly conversion trend */}
      <div className="glass-card p-4">
        <h2 className="text-sm font-semibold text-foreground mb-3">Weekly Conversion Rate</h2>
        {loadingWeekly ? (
          <Skeleton className="h-[200px] w-full rounded-lg" />
        ) : (
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weekly}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} />
                <XAxis dataKey="week" tick={chartTickStyle} axisLine={false} tickLine={false} />
                <YAxis tick={chartTickStyle} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                <Tooltip contentStyle={chartTooltipStyle} formatter={(v: number) => `${v}%`} />
                <Line type="monotone" dataKey="conversionRate" stroke="hsl(152 60% 48%)" strokeWidth={2.5} dot={{ fill: "hsl(152 60% 48%)", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Funnel visualization */}
      <div className="glass-card p-4">
        <h2 className="text-sm font-semibold text-foreground mb-3">Stage Funnel</h2>
        {loadingFunnel ? (
          <Skeleton className="h-[280px] w-full rounded-lg" />
        ) : (
          <div className="space-y-2">
            {funnel?.map((s, i) => {
              const maxCount = funnel[0].count;
              const pct = (s.count / maxCount) * 100;
              return (
                <div key={s.stage} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-20 shrink-0 text-right">{s.stage}</span>
                  <div className="flex-1 h-7 bg-muted rounded-md overflow-hidden relative">
                    <div
                      className="h-full rounded-md transition-all duration-700 flex items-center px-2"
                      style={{ width: `${pct}%`, backgroundColor: FUNNEL_COLORS[i] }}
                    >
                      <span className="text-[11px] font-semibold text-primary-foreground tabular-nums">{s.count}</span>
                    </div>
                  </div>
                  {s.dropOff > 0 && (
                    <span className="text-[11px] text-signal-sell font-medium tabular-nums w-12 text-right">-{s.dropOff}%</span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
