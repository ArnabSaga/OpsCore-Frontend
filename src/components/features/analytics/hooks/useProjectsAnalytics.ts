"use client";

import { useQuery } from "@tanstack/react-query";

import { getProjectsAnalytics } from "@/components/features/analytics/api/analytics.api";
import { analyticsQueryKeys } from "@/components/features/analytics/hooks/analytics.query-keys";
import type { GetProjectsAnalyticsParams } from "@/components/features/analytics/types/analytics.types";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";

type UseProjectsAnalyticsOptions = {
  workspaceId?: string | null;
  params?: GetProjectsAnalyticsParams;
  enabled?: boolean;
};

export const useProjectsAnalytics = ({
  workspaceId,
  params,
  enabled = true,
}: UseProjectsAnalyticsOptions = {}) => {
  const { activeWorkspaceId } = useWorkspaceContext();
  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useQuery({
    queryKey: resolvedWorkspaceId
      ? analyticsQueryKeys.projectsOverview(resolvedWorkspaceId, params)
      : [...analyticsQueryKeys.projects(), "no-workspace"],
    queryFn: () => getProjectsAnalytics(resolvedWorkspaceId as string, params),
    enabled: enabled && !!resolvedWorkspaceId,
    staleTime: 1000 * 60,
  });
};
