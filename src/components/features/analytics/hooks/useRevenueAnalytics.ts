"use client";

import { useQuery } from "@tanstack/react-query";

import { getRevenueAnalytics } from "@/components/features/analytics/api/analytics.api";
import { analyticsQueryKeys } from "@/components/features/analytics/hooks/analytics.query-keys";
import type { GetRevenueAnalyticsParams } from "@/components/features/analytics/types/analytics.types";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";

type UseRevenueAnalyticsOptions = {
  workspaceId?: string | null;
  params?: GetRevenueAnalyticsParams;
  enabled?: boolean;
};

export const useRevenueAnalytics = ({
  workspaceId,
  params,
  enabled = true,
}: UseRevenueAnalyticsOptions = {}) => {
  const { activeWorkspaceId } = useWorkspaceContext();
  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useQuery({
    queryKey: resolvedWorkspaceId
      ? analyticsQueryKeys.revenueOverview(resolvedWorkspaceId, params)
      : [...analyticsQueryKeys.revenue(), "no-workspace"],
    queryFn: () => getRevenueAnalytics(resolvedWorkspaceId as string, params),
    enabled: enabled && !!resolvedWorkspaceId,
    staleTime: 1000 * 60,
  });
};
