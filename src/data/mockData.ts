export interface Signal {
  id: string;
  asset: string;
  type: "BUY" | "SELL";
  entry: number;
  tp: number;
  sl: number;
  currentPrice: number;
  status: "Live" | "TP Hit" | "SL Hit";
  source: string;
  destination: string;
  timestamp: string;
  delaySeconds: number;
}

export interface Provider {
  id: string;
  name: string;
  winRate: number;
  totalSignals: number;
  score: number;
  avatar: string;
  platform: string;
}

const now = new Date("2026-03-20T09:30:00Z");

function minsAgo(mins: number) {
  return new Date(now.getTime() - mins * 60000).toISOString();
}

export const signals: Signal[] = [
  { id: "1", asset: "XAUUSD", type: "BUY", entry: 2185.40, tp: 2198.00, sl: 2178.00, currentPrice: 2191.75, status: "Live", source: "GoldSignals VIP", destination: "TradeFlow Feed", timestamp: minsAgo(3), delaySeconds: 1.2 },
  { id: "2", asset: "XAUUSD", type: "SELL", entry: 2192.80, tp: 2180.00, sl: 2200.00, currentPrice: 2183.50, status: "TP Hit", source: "XAU Premium", destination: "TradeFlow Feed", timestamp: minsAgo(47), delaySeconds: 0.8 },
  { id: "3", asset: "XAUUSD", type: "BUY", entry: 2178.60, tp: 2190.00, sl: 2172.00, currentPrice: 2190.00, status: "TP Hit", source: "GoldSignals VIP", destination: "TradeFlow Feed", timestamp: minsAgo(128), delaySeconds: 1.1 },
  { id: "4", asset: "XAUUSD", type: "SELL", entry: 2196.20, tp: 2184.00, sl: 2203.00, currentPrice: 2203.00, status: "SL Hit", source: "Gold Elite Room", destination: "TradeFlow Feed", timestamp: minsAgo(195), delaySeconds: 1.5 },
  { id: "5", asset: "XAUUSD", type: "BUY", entry: 2170.50, tp: 2182.00, sl: 2164.00, currentPrice: 2182.00, status: "TP Hit", source: "XAU Premium", destination: "TradeFlow Feed", timestamp: minsAgo(310), delaySeconds: 0.9 },
  { id: "6", asset: "XAUUSD", type: "SELL", entry: 2188.90, tp: 2176.00, sl: 2196.00, currentPrice: 2176.00, status: "TP Hit", source: "GoldSignals VIP", destination: "TradeFlow Feed", timestamp: minsAgo(420), delaySeconds: 1.3 },
  { id: "7", asset: "XAUUSD", type: "BUY", entry: 2165.30, tp: 2178.00, sl: 2158.00, currentPrice: 2175.40, status: "Live", source: "Gold Elite Room", destination: "TradeFlow Feed", timestamp: minsAgo(15), delaySeconds: 1.0 },
  { id: "8", asset: "XAUUSD", type: "SELL", entry: 2201.10, tp: 2188.00, sl: 2208.00, currentPrice: 2188.00, status: "TP Hit", source: "XAU Premium", destination: "TradeFlow Feed", timestamp: minsAgo(540), delaySeconds: 0.7 },
  { id: "9", asset: "XAUUSD", type: "BUY", entry: 2175.80, tp: 2188.00, sl: 2168.00, currentPrice: 2168.00, status: "SL Hit", source: "GoldSignals VIP", destination: "TradeFlow Feed", timestamp: minsAgo(680), delaySeconds: 1.4 },
  { id: "10", asset: "XAUUSD", type: "BUY", entry: 2182.20, tp: 2195.00, sl: 2175.00, currentPrice: 2189.60, status: "Live", source: "Gold Elite Room", destination: "TradeFlow Feed", timestamp: minsAgo(8), delaySeconds: 0.6 },
];

export const providers: Provider[] = [
  { id: "1", name: "GoldSignals VIP", winRate: 76, totalSignals: 284, score: 93, avatar: "GS", platform: "Telegram" },
  { id: "2", name: "XAU Premium", winRate: 72, totalSignals: 198, score: 88, avatar: "XP", platform: "Telegram" },
  { id: "3", name: "Gold Elite Room", winRate: 69, totalSignals: 156, score: 82, avatar: "GE", platform: "Telegram" },
];

export const performanceData = [
  { date: "Mar 1", pnl: 1.8, winRate: 70 },
  { date: "Mar 3", pnl: 3.5, winRate: 68 },
  { date: "Mar 5", pnl: 2.9, winRate: 72 },
  { date: "Mar 7", pnl: 6.2, winRate: 78 },
  { date: "Mar 9", pnl: 5.4, winRate: 75 },
  { date: "Mar 11", pnl: 8.1, winRate: 80 },
  { date: "Mar 13", pnl: 7.3, winRate: 77 },
  { date: "Mar 15", pnl: 10.5, winRate: 82 },
  { date: "Mar 17", pnl: 9.8, winRate: 79 },
  { date: "Mar 19", pnl: 12.4, winRate: 83 },
  { date: "Mar 20", pnl: 13.1, winRate: 81 },
];

export const botStatus = {
  status: "running" as "running" | "offline",
  signalsToday: 24,
  avgDelay: 1.04,
  uptime: "99.7%",
};

export function timeAgo(timestamp: string): string {
  const diff = now.getTime() - new Date(timestamp).getTime();
  const secs = Math.floor(diff / 1000);
  if (secs < 60) return `${secs}s ago`;
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export function pipsMoved(entry: number, current: number, type: "BUY" | "SELL"): number {
  const diff = type === "BUY" ? current - entry : entry - current;
  return Math.round(diff * 10) / 10; // XAUUSD pips = price points
}
