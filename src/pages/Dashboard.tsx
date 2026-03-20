import { Radio, TrendingUp, DollarSign, Activity, Bot, Zap, Timer, ArrowRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { StatCard } from "@/components/StatCard";
import { SignalCard } from "@/components/SignalCard";
import { signals, performanceData, botStatus } from "@/data/mockData";

function BotStatusCard() {
  const isRunning = botStatus.status === "running";

  return (
    <div className="glass-card p-4 flex flex-wrap items-center gap-4 md:gap-8 opacity-0 animate-fade-up border-primary/20">
      <div className="flex items-center gap-3">
        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${isRunning ? "bg-primary/15" : "bg-signal-sell/15"}`}>
          <Bot className={`h-5 w-5 ${isRunning ? "text-primary" : "text-signal-sell"}`} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${isRunning ? "bg-primary animate-pulse" : "bg-signal-sell"}`} />
            <span className="text-sm font-semibold text-foreground">{isRunning ? "Bot Running" : "Bot Offline"}</span>
          </div>
          <p className="text-[11px] text-muted-foreground">Powered by TradeFlow Bot</p>
        </div>
      </div>

      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-1.5">
          <Zap className="h-3.5 w-3.5 text-signal-pending" />
          <span className="text-muted-foreground">{botStatus.signalsToday}</span>
          <span className="text-muted-foreground/60 text-xs">signals today</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Timer className="h-3.5 w-3.5 text-primary" />
          <span className="text-muted-foreground">{botStatus.avgDelay}s</span>
          <span className="text-muted-foreground/60 text-xs">avg delay</span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5">
          <Activity className="h-3.5 w-3.5 text-primary" />
          <span className="text-muted-foreground">{botStatus.uptime}</span>
          <span className="text-muted-foreground/60 text-xs">uptime</span>
        </div>
      </div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    { icon: Radio, title: "Source Channels", desc: "Bot monitors Telegram signal channels 24/7" },
    { icon: Zap, title: "Instant Forward", desc: "Signals forwarded in under 2 seconds" },
    { icon: TrendingUp, title: "Track & Analyze", desc: "TradeFlow tracks performance automatically" },
  ];

  return (
    <div className="glass-card p-5 opacity-0 animate-fade-up" style={{ animationDelay: "500ms" }}>
      <h2 className="text-sm font-semibold text-foreground mb-4">How It Works</h2>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-0">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3 flex-1">
            <div className="flex items-center gap-3 flex-1">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <step.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{step.title}</p>
                <p className="text-xs text-muted-foreground">{step.desc}</p>
              </div>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight className="h-4 w-4 text-muted-foreground/40 hidden md:block mx-2 shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const liveSignals = signals.filter((s) => s.status === "Live");
  const recentSignals = signals.slice(0, 4);

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground text-balance">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Real-time XAUUSD signal automation + analytics</p>
      </div>

      <BotStatusCard />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Signals Today" value="24" change="+12% vs yesterday" changeType="positive" icon={Radio} delay={80} />
        <StatCard title="Win Rate" value="81%" change="+3.1% this week" changeType="positive" icon={TrendingUp} delay={140} />
        <StatCard title="Net PnL" value="+$1,847" change="+13.1% this month" changeType="positive" icon={DollarSign} delay={200} />
        <StatCard title="Live Trades" value={String(liveSignals.length)} change="Tracking in real-time" changeType="positive" icon={Activity} delay={260} />
      </div>

      <div className="glass-card p-5 opacity-0 animate-fade-up" style={{ animationDelay: "320ms" }}>
        <h2 className="text-sm font-semibold text-foreground mb-4">XAUUSD Performance (PnL %)</h2>
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
              <Line type="monotone" dataKey="pnl" stroke="hsl(152 60% 48%)" strokeWidth={2.5} dot={false} activeDot={{ r: 4, fill: "hsl(152 60% 48%)", stroke: "hsl(220 18% 10%)", strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="opacity-0 animate-fade-up" style={{ animationDelay: "400ms" }}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground">Recent Signals</h2>
          <span className="text-[11px] text-muted-foreground uppercase tracking-wider">via Telegram</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {recentSignals.map((s) => (
            <SignalCard key={s.id} signal={s} />
          ))}
        </div>
      </div>

      <HowItWorks />
    </div>
  );
}
