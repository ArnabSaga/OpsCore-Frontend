import type {
  GetProjectsAnalyticsParams,
  GetRevenueAnalyticsParams,
} from "@/components/features/analytics/types/analytics.types";

export const analyticsQueryKeys = {
  all: ["analytics"] as const,

  projects: () => [...analyticsQueryKeys.all, "projects"] as const,
  projectsOverview: (workspaceId: string, params?: GetProjectsAnalyticsParams) =>
    [...analyticsQueryKeys.projects(), workspaceId, params ?? {}] as const,

  revenue: () => [...analyticsQueryKeys.all, "revenue"] as const,
  revenueOverview: (workspaceId: string, params?: GetRevenueAnalyticsParams) =>
    [...analyticsQueryKeys.revenue(), workspaceId, params ?? {}] as const,
} as const;
