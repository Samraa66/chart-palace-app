export interface Signal {
  id: string;
  asset: string;
  type: "BUY" | "SELL";
  entry: number;
  tp: number;
  sl: number;
  status: "Open" | "TP Hit" | "SL Hit";
  source: string;
  timestamp: string;
}

export interface Provider {
  id: string;
  name: string;
  winRate: number;
  totalSignals: number;
  score: number;
  avatar: string;
}

export const signals: Signal[] = [
  { id: "1", asset: "BTC/USDT", type: "BUY", entry: 67250, tp: 69500, sl: 66000, status: "Open", source: "Alpha Signals", timestamp: "2026-03-20T09:14:00Z" },
  { id: "2", asset: "ETH/USDT", type: "BUY", entry: 3480, tp: 3650, sl: 3380, status: "TP Hit", source: "CryptoVault", timestamp: "2026-03-20T08:30:00Z" },
  { id: "3", asset: "GOLD", type: "SELL", entry: 2185, tp: 2140, sl: 2210, status: "SL Hit", source: "FX Masters", timestamp: "2026-03-20T07:45:00Z" },
  { id: "4", asset: "EUR/USD", type: "BUY", entry: 1.0845, tp: 1.0920, sl: 1.0790, status: "Open", source: "FX Masters", timestamp: "2026-03-20T06:20:00Z" },
  { id: "5", asset: "SOL/USDT", type: "SELL", entry: 142.5, tp: 132, sl: 148, status: "TP Hit", source: "Alpha Signals", timestamp: "2026-03-19T22:10:00Z" },
  { id: "6", asset: "BTC/USDT", type: "SELL", entry: 68100, tp: 66500, sl: 69000, status: "TP Hit", source: "Whale Watch", timestamp: "2026-03-19T18:05:00Z" },
  { id: "7", asset: "GBP/JPY", type: "BUY", entry: 191.45, tp: 193.20, sl: 190.50, status: "Open", source: "FX Masters", timestamp: "2026-03-19T15:30:00Z" },
  { id: "8", asset: "AVAX/USDT", type: "BUY", entry: 38.2, tp: 42.5, sl: 36, status: "SL Hit", source: "CryptoVault", timestamp: "2026-03-19T12:00:00Z" },
  { id: "9", asset: "SILVER", type: "BUY", entry: 24.85, tp: 25.80, sl: 24.20, status: "TP Hit", source: "Whale Watch", timestamp: "2026-03-19T10:15:00Z" },
  { id: "10", asset: "DOGE/USDT", type: "SELL", entry: 0.1245, tp: 0.1100, sl: 0.1320, status: "Open", source: "Alpha Signals", timestamp: "2026-03-19T08:40:00Z" },
];

export const providers: Provider[] = [
  { id: "1", name: "Alpha Signals", winRate: 74, totalSignals: 312, score: 92, avatar: "AS" },
  { id: "2", name: "CryptoVault", winRate: 68, totalSignals: 198, score: 85, avatar: "CV" },
  { id: "3", name: "FX Masters", winRate: 71, totalSignals: 456, score: 88, avatar: "FM" },
  { id: "4", name: "Whale Watch", winRate: 79, totalSignals: 127, score: 94, avatar: "WW" },
];

export const performanceData = [
  { date: "Mar 1", pnl: 2.1, winRate: 68 },
  { date: "Mar 3", pnl: 4.8, winRate: 72 },
  { date: "Mar 5", pnl: 3.2, winRate: 65 },
  { date: "Mar 7", pnl: 7.5, winRate: 78 },
  { date: "Mar 9", pnl: 6.1, winRate: 74 },
  { date: "Mar 11", pnl: 9.3, winRate: 80 },
  { date: "Mar 13", pnl: 8.0, winRate: 76 },
  { date: "Mar 15", pnl: 11.2, winRate: 82 },
  { date: "Mar 17", pnl: 10.4, winRate: 79 },
  { date: "Mar 19", pnl: 13.7, winRate: 84 },
  { date: "Mar 20", pnl: 14.2, winRate: 82 },
];

export const assetPerformance = [
  { asset: "BTC/USDT", winRate: 78, pnl: 5.2, trades: 42 },
  { asset: "ETH/USDT", winRate: 72, pnl: 3.8, trades: 35 },
  { asset: "GOLD", winRate: 65, pnl: 1.4, trades: 28 },
  { asset: "EUR/USD", winRate: 70, pnl: 2.1, trades: 51 },
  { asset: "SOL/USDT", winRate: 80, pnl: 4.6, trades: 18 },
];
