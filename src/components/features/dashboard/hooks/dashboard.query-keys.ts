import type { DashboardMetricsPeriod, PlatformMetricsPeriod } from "@/types/dashboard.types";

export const dashboardQueryKeys = {
  all: ["dashboard"] as const,

  overview: (workspaceId?: string | null) => [...dashboardQueryKeys.all, "overview", workspaceId] as const,

  activity: (query: { page?: number; limit?: number }, workspaceId?: string | null) =>
    [...dashboardQueryKeys.all, "activity", query, workspaceId] as const,

  metrics: (period: DashboardMetricsPeriod, workspaceId?: string | null) =>
    [...dashboardQueryKeys.all, "metrics", period, workspaceId] as const,

  platform: () => [...dashboardQueryKeys.all, "platform"] as const,
  platformOverview: () => [...dashboardQueryKeys.platform(), "overview"] as const,
  platformMetrics: (period: PlatformMetricsPeriod = "last_30_days") =>
    [...dashboardQueryKeys.platform(), "metrics", period] as const,
  platformActivity: (query: { page?: number; limit?: number }) =>
    [...dashboardQueryKeys.platform(), "activity", query.page, query.limit] as const,
} as const;
