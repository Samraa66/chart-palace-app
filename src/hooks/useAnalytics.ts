import { useQuery } from "@tanstack/react-query";
import {
  dailyLeads, weeklyLeads, funnelStages,
  campaigns, dailyAdSpend,
  vipMembers, activityTrend,
  type DailyLeadCount, type WeeklyLeadCount, type FunnelStage,
  type Campaign, type DailyAdSpend,
  type VIPMember, type ActivityTrend,
} from "@/data/analyticsData";

// Simulates API delay for realistic feel
const fakeFetch = <T,>(data: T, ms = 300): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));

// ---- Funnel Analytics ----
export function useDailyLeads() {
  return useQuery<DailyLeadCount[]>({
    queryKey: ["analytics", "daily-leads"],
    queryFn: () => fakeFetch(dailyLeads),
  });
}

export function useWeeklyLeads() {
  return useQuery<WeeklyLeadCount[]>({
    queryKey: ["analytics", "weekly-leads"],
    queryFn: () => fakeFetch(weeklyLeads),
  });
}

export function useFunnelStages() {
  return useQuery<FunnelStage[]>({
    queryKey: ["analytics", "funnel-stages"],
    queryFn: () => fakeFetch(funnelStages),
  });
}

// ---- Ad Intelligence ----
export function useCampaigns() {
  return useQuery<Campaign[]>({
    queryKey: ["ads", "campaigns"],
    queryFn: () => fakeFetch(campaigns),
  });
}

export function useDailyAdSpend() {
  return useQuery<DailyAdSpend[]>({
    queryKey: ["ads", "daily-spend"],
    queryFn: () => fakeFetch(dailyAdSpend),
  });
}

// ---- Member Activity ----
export function useVIPMembers() {
  return useQuery<VIPMember[]>({
    queryKey: ["members", "vip"],
    queryFn: () => fakeFetch(vipMembers),
  });
}

export function useActivityTrend() {
  return useQuery<ActivityTrend[]>({
    queryKey: ["members", "activity-trend"],
    queryFn: () => fakeFetch(activityTrend),
  });
}
