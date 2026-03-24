export type Stage =
  | "New"
  | "Contacted"
  | "Qualified"
  | "Hesitant"
  | "Link Sent"
  | "Registered"
  | "Deposited"
  | "VIP";

export const STAGES: Stage[] = [
  "New",
  "Contacted",
  "Qualified",
  "Hesitant",
  "Link Sent",
  "Registered",
  "Deposited",
  "VIP",
];

export const STAGE_COLORS: Record<Stage, string> = {
  New: "bg-stage-new",
  Contacted: "bg-stage-new",
  Qualified: "bg-stage-qualified",
  Hesitant: "bg-stage-hesitant",
  "Link Sent": "bg-stage-link-sent",
  Registered: "bg-stage-link-sent",
  Deposited: "bg-stage-deposited",
  VIP: "bg-stage-deposited",
};

export const STAGE_TEXT_COLORS: Record<Stage, string> = {
  New: "text-stage-new",
  Contacted: "text-stage-new",
  Qualified: "text-stage-qualified",
  Hesitant: "text-stage-hesitant",
  "Link Sent": "text-stage-link-sent",
  Registered: "text-stage-link-sent",
  Deposited: "text-stage-deposited",
  VIP: "text-stage-deposited",
};

export interface Lead {
  id: string;
  name: string;
  username: string;
  stage: Stage;
  stageEnteredAt: string;
  notes: string;
  avatar: string;
  lastMessageAt: string;
  unread: number;
}

export interface Message {
  id: string;
  leadId: string;
  text: string;
  sender: "client" | "operator";
  timestamp: string;
}

const now = new Date("2026-03-24T14:30:00Z");

function hoursAgo(h: number) {
  return new Date(now.getTime() - h * 3600000).toISOString();
}

function minsAgo(m: number) {
  return new Date(now.getTime() - m * 60000).toISOString();
}

export const leads: Lead[] = [
  { id: "1", name: "Ahmed Al-Rashid", username: "@ahmed_trades", stage: "Qualified", stageEnteredAt: hoursAgo(26), notes: "Interested in XAUUSD. Has some forex experience.", avatar: "AR", lastMessageAt: minsAgo(5), unread: 2 },
  { id: "2", name: "Sara Johnson", username: "@sara_j99", stage: "New", stageEnteredAt: hoursAgo(1), notes: "", avatar: "SJ", lastMessageAt: minsAgo(12), unread: 1 },
  { id: "3", name: "Mohammed K.", username: "@mk_gold", stage: "Hesitant", stageEnteredAt: hoursAgo(48), notes: "Worried about risk. Needs reassurance.", avatar: "MK", lastMessageAt: minsAgo(35), unread: 0 },
  { id: "4", name: "Fatima Noor", username: "@fatima_fx", stage: "Link Sent", stageEnteredAt: hoursAgo(8), notes: "Sent registration link. Following up.", avatar: "FN", lastMessageAt: minsAgo(90), unread: 0 },
  { id: "5", name: "Omar Hassan", username: "@omar_h", stage: "Deposited", stageEnteredAt: hoursAgo(72), notes: "Deposited $500. Active trader.", avatar: "OH", lastMessageAt: hoursAgo(4), unread: 0 },
  { id: "6", name: "Layla Ben", username: "@layla_b", stage: "Contacted", stageEnteredAt: hoursAgo(3), notes: "First reply received.", avatar: "LB", lastMessageAt: minsAgo(45), unread: 3 },
  { id: "7", name: "Yusuf Ali", username: "@yusuf_a1", stage: "VIP", stageEnteredAt: hoursAgo(168), notes: "Top performer. $2k deposited.", avatar: "YA", lastMessageAt: hoursAgo(6), unread: 0 },
  { id: "8", name: "Nadia Khalil", username: "@nadia_kh", stage: "Registered", stageEnteredAt: hoursAgo(12), notes: "Registered but hasn't deposited yet.", avatar: "NK", lastMessageAt: hoursAgo(2), unread: 1 },
];

export const messages: Message[] = [
  // Ahmed
  { id: "m1", leadId: "1", text: "Hi, I saw your signal group on Telegram", sender: "client", timestamp: hoursAgo(28) },
  { id: "m2", leadId: "1", text: "Welcome Ahmed! Yes, we provide XAUUSD signals daily. Do you have any experience trading?", sender: "operator", timestamp: hoursAgo(27) },
  { id: "m3", leadId: "1", text: "Yes, I've been trading forex for about 6 months", sender: "client", timestamp: hoursAgo(26) },
  { id: "m4", leadId: "1", text: "That's great! Our signals focus on gold (XAUUSD). Most members see consistent results within the first week.", sender: "operator", timestamp: hoursAgo(25) },
  { id: "m5", leadId: "1", text: "How do I join the VIP group?", sender: "client", timestamp: minsAgo(10) },
  { id: "m6", leadId: "1", text: "What's the minimum deposit?", sender: "client", timestamp: minsAgo(5) },
  // Sara
  { id: "m7", leadId: "2", text: "Hello, someone recommended your signals", sender: "client", timestamp: minsAgo(12) },
  // Mohammed
  { id: "m8", leadId: "3", text: "I'm not sure about this, trading seems risky", sender: "client", timestamp: hoursAgo(48) },
  { id: "m9", leadId: "3", text: "I understand your concern. We use strict risk management — every signal has a stop loss. Is there something specific holding you back?", sender: "operator", timestamp: hoursAgo(47) },
  { id: "m10", leadId: "3", text: "I've lost money before with other groups", sender: "client", timestamp: hoursAgo(46) },
  { id: "m11", leadId: "3", text: "That's completely understandable. Our win rate is 81% this month. Would you like to see some results first before committing?", sender: "operator", timestamp: minsAgo(35) },
  // Fatima
  { id: "m12", leadId: "4", text: "I'm ready to start. How do I open an account?", sender: "client", timestamp: hoursAgo(9) },
  { id: "m13", leadId: "4", text: "Here is your link to open your account 👉 [Registration Link]", sender: "operator", timestamp: hoursAgo(8) },
  // Layla
  { id: "m14", leadId: "6", text: "Hi! Is this the gold signals group?", sender: "client", timestamp: hoursAgo(4) },
  { id: "m15", leadId: "6", text: "Yes! Welcome Layla 🙌", sender: "operator", timestamp: hoursAgo(3) },
  { id: "m16", leadId: "6", text: "How does it work?", sender: "client", timestamp: minsAgo(50) },
  { id: "m17", leadId: "6", text: "Can I see some proof?", sender: "client", timestamp: minsAgo(48) },
  { id: "m18", leadId: "6", text: "Sure! Let me send you some recent results", sender: "client", timestamp: minsAgo(45) },
  // Nadia
  { id: "m19", leadId: "8", text: "I've registered! What now?", sender: "client", timestamp: hoursAgo(2) },
];

export const STAGE_ACTION_REPLIES = [
  "Here is your link to open your account 👉",
  "Our win rate this month is 81%",
  "Would you like to see some results?",
];

export const FOLLOWUP_REPLIES = [
  "Any experience trading?",
  "Is there something holding you back?",
  "What's your preferred lot size?",
];

export const QUICK_REPLIES = [...STAGE_ACTION_REPLIES, ...FOLLOWUP_REPLIES];

export function formatTimeInStage(stageEnteredAt: string): string {
  const diff = now.getTime() - new Date(stageEnteredAt).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  const remHrs = hrs % 24;
  return remHrs > 0 ? `${days}d ${remHrs}h` : `${days}d`;
}

export function formatMessageTime(timestamp: string): string {
  const d = new Date(timestamp);
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
}
