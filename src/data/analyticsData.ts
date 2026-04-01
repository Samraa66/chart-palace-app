// =============================================
// Funnel Analytics Mock Data
// =============================================

export interface DailyLeadCount {
  date: string;
  leads: number;
  converted: number;
}

export interface WeeklyLeadCount {
  week: string;
  leads: number;
  converted: number;
  conversionRate: number;
}

export interface FunnelStage {
  stage: string;
  count: number;
  dropOff: number; // percentage that drop off before next stage
}

export const dailyLeads: DailyLeadCount[] = [
  { date: "Mar 18", leads: 12, converted: 2 },
  { date: "Mar 19", leads: 18, converted: 4 },
  { date: "Mar 20", leads: 9, converted: 1 },
  { date: "Mar 21", leads: 22, converted: 5 },
  { date: "Mar 22", leads: 15, converted: 3 },
  { date: "Mar 23", leads: 28, converted: 7 },
  { date: "Mar 24", leads: 20, converted: 4 },
];

export const weeklyLeads: WeeklyLeadCount[] = [
  { week: "Feb 24", leads: 64, converted: 12, conversionRate: 18.8 },
  { week: "Mar 03", leads: 78, converted: 18, conversionRate: 23.1 },
  { week: "Mar 10", leads: 91, converted: 21, conversionRate: 23.1 },
  { week: "Mar 17", leads: 124, converted: 26, conversionRate: 21.0 },
];

export const funnelStages: FunnelStage[] = [
  { stage: "New", count: 124, dropOff: 0 },
  { stage: "Contacted", count: 98, dropOff: 21 },
  { stage: "Qualified", count: 67, dropOff: 32 },
  { stage: "Hesitant", count: 23, dropOff: 66 },
  { stage: "Link Sent", count: 44, dropOff: 34 },
  { stage: "Registered", count: 31, dropOff: 30 },
  { stage: "Deposited", count: 22, dropOff: 29 },
  { stage: "VIP", count: 8, dropOff: 64 },
];

// =============================================
// Ad Intelligence Mock Data
// =============================================

export interface Campaign {
  id: string;
  name: string;
  platform: "Meta";
  spend: number;
  impressions: number;
  clicks: number;
  leads: number;
  deposits: number;
  depositValue: number;
  roas: number;
  status: "active" | "paused" | "ended";
}

export interface DailyAdSpend {
  date: string;
  spend: number;
  deposits: number;
  revenue: number;
}

export const campaigns: Campaign[] = [
  { id: "c1", name: "Gold Signals — Lookalike", platform: "Meta", spend: 1240, impressions: 48200, clicks: 1820, leads: 87, deposits: 14, depositValue: 7200, roas: 5.81, status: "active" },
  { id: "c2", name: "XAUUSD Results Proof", platform: "Meta", spend: 860, impressions: 31400, clicks: 1190, leads: 52, deposits: 9, depositValue: 4100, roas: 4.77, status: "active" },
  { id: "c3", name: "Free Signals Retarget", platform: "Meta", spend: 420, impressions: 12800, clicks: 680, leads: 34, deposits: 7, depositValue: 3800, roas: 9.05, status: "active" },
  { id: "c4", name: "Broad — GCC Traders", platform: "Meta", spend: 1580, impressions: 62000, clicks: 2400, leads: 61, deposits: 6, depositValue: 2900, roas: 1.84, status: "paused" },
  { id: "c5", name: "Testimonial Video Ad", platform: "Meta", spend: 340, impressions: 9800, clicks: 520, leads: 28, deposits: 5, depositValue: 2600, roas: 7.65, status: "ended" },
];

export const dailyAdSpend: DailyAdSpend[] = [
  { date: "Mar 18", spend: 620, deposits: 3, revenue: 1400 },
  { date: "Mar 19", spend: 580, deposits: 5, revenue: 2800 },
  { date: "Mar 20", spend: 640, deposits: 2, revenue: 900 },
  { date: "Mar 21", spend: 710, deposits: 6, revenue: 3200 },
  { date: "Mar 22", spend: 550, deposits: 4, revenue: 2100 },
  { date: "Mar 23", spend: 690, deposits: 8, revenue: 4500 },
  { date: "Mar 24", spend: 650, deposits: 5, revenue: 2700 },
];

// =============================================
// Member Activity Monitor Mock Data
// =============================================

export type MemberStatus = "active" | "cooling" | "inactive" | "churned";

export interface VIPMember {
  id: string;
  name: string;
  username: string;
  avatar: string;
  depositTotal: number;
  lastActive: string;
  messagesThisWeek: number;
  tradesThisWeek: number;
  status: MemberStatus;
  joinedAt: string;
}

export interface ActivityTrend {
  date: string;
  activeMembers: number;
  newDeposits: number;
  messages: number;
}

const now = new Date("2026-03-24T14:30:00Z");
function hoursAgo(h: number) { return new Date(now.getTime() - h * 3600000).toISOString(); }
function daysAgo(d: number) { return new Date(now.getTime() - d * 86400000).toISOString(); }

export const vipMembers: VIPMember[] = [
  { id: "v1", name: "Yusuf Ali", username: "@yusuf_a1", avatar: "YA", depositTotal: 2000, lastActive: hoursAgo(2), messagesThisWeek: 34, tradesThisWeek: 12, status: "active", joinedAt: daysAgo(45) },
  { id: "v2", name: "Omar Hassan", username: "@omar_h", avatar: "OH", depositTotal: 1500, lastActive: hoursAgo(6), messagesThisWeek: 18, tradesThisWeek: 8, status: "active", joinedAt: daysAgo(30) },
  { id: "v3", name: "Khalid Mansour", username: "@khalid_m", avatar: "KM", depositTotal: 3200, lastActive: hoursAgo(28), messagesThisWeek: 5, tradesThisWeek: 2, status: "cooling", joinedAt: daysAgo(60) },
  { id: "v4", name: "Tariq Zayed", username: "@tariq_z", avatar: "TZ", depositTotal: 800, lastActive: daysAgo(4), messagesThisWeek: 1, tradesThisWeek: 0, status: "inactive", joinedAt: daysAgo(20) },
  { id: "v5", name: "Hassan Nabil", username: "@hassan_n", avatar: "HN", depositTotal: 1200, lastActive: daysAgo(12), messagesThisWeek: 0, tradesThisWeek: 0, status: "churned", joinedAt: daysAgo(90) },
  { id: "v6", name: "Rami Farouk", username: "@rami_f", avatar: "RF", depositTotal: 4500, lastActive: hoursAgo(1), messagesThisWeek: 42, tradesThisWeek: 15, status: "active", joinedAt: daysAgo(75) },
  { id: "v7", name: "Bilal Sharif", username: "@bilal_s", avatar: "BS", depositTotal: 600, lastActive: daysAgo(7), messagesThisWeek: 0, tradesThisWeek: 0, status: "inactive", joinedAt: daysAgo(14) },
];

export const activityTrend: ActivityTrend[] = [
  { date: "Mar 18", activeMembers: 18, newDeposits: 2, messages: 145 },
  { date: "Mar 19", activeMembers: 22, newDeposits: 3, messages: 189 },
  { date: "Mar 20", activeMembers: 16, newDeposits: 1, messages: 112 },
  { date: "Mar 21", activeMembers: 24, newDeposits: 4, messages: 210 },
  { date: "Mar 22", activeMembers: 20, newDeposits: 2, messages: 167 },
  { date: "Mar 23", activeMembers: 26, newDeposits: 5, messages: 234 },
  { date: "Mar 24", activeMembers: 21, newDeposits: 3, messages: 178 },
];

export const MEMBER_STATUS_CONFIG: Record<MemberStatus, { label: string; color: string; bgColor: string }> = {
  active: { label: "Active", color: "text-signal-buy", bgColor: "bg-signal-buy/10" },
  cooling: { label: "Cooling", color: "text-signal-pending", bgColor: "bg-signal-pending/10" },
  inactive: { label: "Inactive", color: "text-muted-foreground", bgColor: "bg-muted" },
  churned: { label: "Churned", color: "text-signal-sell", bgColor: "bg-signal-sell/10" },
};

export function formatLastActive(isoDate: string): string {
  const diff = now.getTime() - new Date(isoDate).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}
