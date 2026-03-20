import { Radio, TrendingUp, DollarSign, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { StatCard } from "@/components/StatCard";
import { SignalCard } from "@/components/SignalCard";
import { signals, performanceData } from "@/data/mockData";

export default function Dashboard() {
  const recentSignals = signals.slice(0, 4);

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground text-balance">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Overview of your trading performance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Signals Today" value="24" change="+12% vs yesterday" changeType="positive" icon={Radio} delay={0} />
        <StatCard title="Win Rate" value="82%" change="+3.2% this week" changeType="positive" icon={TrendingUp} delay={80} />
        <StatCard title="Net PnL" value="+$1,847" change="+14.2% this month" changeType="positive" icon={DollarSign} delay={160} />
        <StatCard title="Active Trades" value="7" change="3 near TP" changeType="positive" icon={Activity} delay={240} />
      </div>

      <div className="glass-card p-5 opacity-0 animate-fade-up" style={{ animationDelay: "300ms" }}>
        <h2 className="text-sm font-semibold text-foreground mb-4">Performance (PnL %)</h2>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 16%)" />
              <XAxis dataKey="date" tick={{ fill: "hsl(215 12% 52%)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(215 12% 52%)", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(220 18% 10%)",
                  border: "1px solid hsl(220 14% 16%)",
                  borderRadius: "8px",
                  color: "hsl(210 20% 92%)",
                  fontSize: "13px",
                }}
              />
              <Line
                type="monotone"
                dataKey="pnl"
                stroke="hsl(152 60% 48%)"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4, fill: "hsl(152 60% 48%)", stroke: "hsl(220 18% 10%)", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="opacity-0 animate-fade-up" style={{ animationDelay: "400ms" }}>
        <h2 className="text-sm font-semibold text-foreground mb-3">Recent Signals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {recentSignals.map((s) => (
            <SignalCard key={s.id} signal={s} />
          ))}
        </div>
      </div>
    </div>
  );
}
