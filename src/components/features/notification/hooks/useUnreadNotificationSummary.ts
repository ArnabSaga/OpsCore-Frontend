"use client";

import { useQuery } from "@tanstack/react-query";

import { getUnreadNotificationSummary } from "@/components/features/notification/api/notification.api";
import { notificationQueryKeys } from "@/components/features/notification/hooks/notification.query-keys";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";

type UseUnreadNotificationSummaryOptions = {
  workspaceId?: string | null;
  enabled?: boolean;
};

export const useUnreadNotificationSummary = ({
  workspaceId,
  enabled = true,
}: UseUnreadNotificationSummaryOptions = {}) => {
  const { activeWorkspaceId } = useWorkspaceContext();
  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useQuery({
    queryKey: resolvedWorkspaceId
      ? notificationQueryKeys.unreadSummary(resolvedWorkspaceId)
      : [...notificationQueryKeys.all, "unread-summary", "no-workspace"],
    queryFn: () => getUnreadNotificationSummary(resolvedWorkspaceId as string),
    enabled: enabled && !!resolvedWorkspaceId,
    staleTime: 1000 * 15,
  });
};
