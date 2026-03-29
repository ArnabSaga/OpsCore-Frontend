"use client";

import { useQuery } from "@tanstack/react-query";

import { getActivityLogById } from "@/components/features/activity-log/api/activity-log.api";
import { activityLogQueryKeys } from "@/components/features/activity-log/hooks/activity-log.query-keys";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";

type UseActivityLogDetailsOptions = {
  workspaceId?: string | null;
  logId: string;
  enabled?: boolean;
};

export const useActivityLogDetails = ({
  workspaceId,
  logId,
  enabled = true,
}: UseActivityLogDetailsOptions) => {
  const { activeWorkspaceId } = useWorkspaceContext();
  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useQuery({
    queryKey:
      resolvedWorkspaceId && logId
        ? activityLogQueryKeys.detail(resolvedWorkspaceId, logId)
        : [...activityLogQueryKeys.details(), "disabled"],
    queryFn: () => getActivityLogById(resolvedWorkspaceId as string, logId),
    enabled: enabled && !!resolvedWorkspaceId && !!logId,
    staleTime: 1000 * 60,
  });
};
