"use client";

import { useQuery } from "@tanstack/react-query";

import { getNotifications } from "@/components/features/notification/api/notification.api";
import { notificationQueryKeys } from "@/components/features/notification/hooks/notification.query-keys";
import type { NotificationListParams } from "@/components/features/notification/types/notification.types";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";

type UseNotificationsOptions = {
  workspaceId?: string | null;
  params?: NotificationListParams;
  enabled?: boolean;
};

export const useNotifications = ({
  workspaceId,
  params,
  enabled = true,
}: UseNotificationsOptions = {}) => {
  const { activeWorkspaceId } = useWorkspaceContext();
  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useQuery({
    queryKey: resolvedWorkspaceId
      ? notificationQueryKeys.list(resolvedWorkspaceId, params)
      : [...notificationQueryKeys.lists(), "no-workspace"],
    queryFn: () => getNotifications(resolvedWorkspaceId as string, params),
    enabled: enabled && !!resolvedWorkspaceId,
    staleTime: 1000 * 30,
  });
};
