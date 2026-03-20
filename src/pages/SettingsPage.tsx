import { useState } from "react";
import { Bell, Shield, CreditCard, Bot } from "lucide-react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [liveAlerts, setLiveAlerts] = useState(true);

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground text-balance">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your TradeFlow preferences</p>
      </div>

      <div className="glass-card p-5 opacity-0 animate-fade-up">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="h-5 w-5 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Notifications</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">Signal Alerts</p>
              <p className="text-xs text-muted-foreground mt-0.5">Get notified when new XAUUSD signals arrive</p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 active:scale-95 ${
                notifications ? "bg-primary" : "bg-muted"
              }`}
            >
              <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-foreground transition-transform duration-200 ${notifications ? "translate-x-5" : ""}`} />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">Live Trade Updates</p>
              <p className="text-xs text-muted-foreground mt-0.5">Alerts when TP or SL is hit</p>
            </div>
            <button
              onClick={() => setLiveAlerts(!liveAlerts)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 active:scale-95 ${
                liveAlerts ? "bg-primary" : "bg-muted"
              }`}
            >
              <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-foreground transition-transform duration-200 ${liveAlerts ? "translate-x-5" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="glass-card p-5 opacity-0 animate-fade-up" style={{ animationDelay: "80ms" }}>
        <div className="flex items-center gap-3 mb-4">
          <Bot className="h-5 w-5 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Bot Configuration</h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border/30">
            <span className="text-sm text-foreground">Asset</span>
            <span className="text-sm font-medium text-primary">XAUUSD</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border/30">
            <span className="text-sm text-foreground">Source Channels</span>
            <span className="text-sm font-medium text-muted-foreground">3 connected</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border/30">
            <span className="text-sm text-foreground">Forward Destination</span>
            <span className="text-sm font-medium text-muted-foreground">TradeFlow Feed</span>
          </div>
        </div>
      </div>

      <div className="glass-card p-5 opacity-0 animate-fade-up" style={{ animationDelay: "160ms" }}>
        <div className="flex items-center gap-3 mb-4">
          <CreditCard className="h-5 w-5 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Subscription</h2>
        </div>
        <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border/30">
          <div>
            <p className="text-sm font-medium text-foreground">Pro Plan</p>
            <p className="text-xs text-muted-foreground mt-0.5">Unlimited XAUUSD signals & analytics</p>
          </div>
          <span className="text-sm font-bold text-primary">$29/mo</span>
        </div>
      </div>
    </div>
  );
}
