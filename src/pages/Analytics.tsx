import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { performanceData, providers } from "@/data/mockData";

const tooltipStyle = {
  backgroundColor: "hsl(220 18% 10%)",
  border: "1px solid hsl(220 14% 16%)",
  borderRadius: "8px",
  color: "hsl(210 20% 92%)",
  fontSize: "13px",
};

export default function Analytics() {
  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground text-balance">XAUUSD Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Gold signal performance breakdown</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card p-5 opacity-0 animate-fade-up" style={{ animationDelay: "0ms" }}>
          <h2 className="text-sm font-semibold text-foreground mb-4">Win Rate Over Time</h2>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 16%)" />
                <XAxis dataKey="date" tick={{ fill: "hsl(215 12% 52%)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(215 12% 52%)", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="winRate" stroke="hsl(200 70% 50%)" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-5 opacity-0 animate-fade-up" style={{ animationDelay: "80ms" }}>
          <h2 className="text-sm font-semibold text-foreground mb-4">XAUUSD PnL Over Time</h2>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 16%)" />
                <XAxis dataKey="date" tick={{ fill: "hsl(215 12% 52%)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(215 12% 52%)", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="pnl" stroke="hsl(152 60% 48%)" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="glass-card p-5 opacity-0 animate-fade-up" style={{ animationDelay: "160ms" }}>
        <h2 className="text-sm font-semibold text-foreground mb-4">Performance by Channel</h2>
        <div className="space-y-4 mt-2">
          {providers.map((p) => (
            <div key={p.id} className="flex items-center gap-4">
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-primary font-bold text-xs">{p.avatar}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">{p.name}</span>
                  <span className="text-xs text-muted-foreground tabular-nums">{p.winRate}% · {p.totalSignals} signals</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${p.winRate}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
