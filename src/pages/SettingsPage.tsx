import { useState } from "react";
import { Bell, Shield, CreditCard } from "lucide-react";

const assetOptions = ["BTC/USDT", "ETH/USDT", "SOL/USDT", "GOLD", "EUR/USD", "GBP/JPY", "SILVER"];

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [selectedAssets, setSelectedAssets] = useState<string[]>(["BTC/USDT", "ETH/USDT", "GOLD"]);

  const toggleAsset = (asset: string) => {
    setSelectedAssets((prev) =>
      prev.includes(asset) ? prev.filter((a) => a !== asset) : [...prev, asset]
    );
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground text-balance">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your preferences</p>
      </div>

      <div className="glass-card p-5 opacity-0 animate-fade-up">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="h-5 w-5 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Notifications</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-foreground">Push Notifications</p>
            <p className="text-xs text-muted-foreground mt-0.5">Get alerted when new signals arrive</p>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`relative w-11 h-6 rounded-full transition-colors duration-200 active:scale-95 ${
              notifications ? "bg-primary" : "bg-muted"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-foreground transition-transform duration-200 ${
                notifications ? "translate-x-5" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <div className="glass-card p-5 opacity-0 animate-fade-up" style={{ animationDelay: "80ms" }}>
        <div className="flex items-center gap-3 mb-4">
          <Shield className="h-5 w-5 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Preferred Assets</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {assetOptions.map((asset) => (
            <button
              key={asset}
              onClick={() => toggleAsset(asset)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-150 active:scale-95 ${
                selectedAssets.includes(asset)
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              {asset}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card p-5 opacity-0 animate-fade-up" style={{ animationDelay: "160ms" }}>
        <div className="flex items-center gap-3 mb-4">
          <CreditCard className="h-5 w-5 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Subscription</h2>
        </div>
        <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border/50">
          <div>
            <p className="text-sm font-medium text-foreground">Pro Plan</p>
            <p className="text-xs text-muted-foreground mt-0.5">Unlimited signals & analytics</p>
          </div>
          <span className="text-sm font-bold text-primary">$29/mo</span>
        </div>
      </div>
    </div>
  );
}
