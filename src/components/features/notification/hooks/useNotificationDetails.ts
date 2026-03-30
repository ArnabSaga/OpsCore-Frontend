"use client";

import { useQuery } from "@tanstack/react-query";

import { getNotificationById } from "@/components/features/notification/api/notification.api";
import { notificationQueryKeys } from "@/components/features/notification/hooks/notification.query-keys";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";

type UseNotificationDetailsOptions = {
  notificationId: string;
  workspaceId?: string | null;
  enabled?: boolean;
};

export const useNotificationDetails = ({
  notificationId,
  workspaceId,
  enabled = true,
}: UseNotificationDetailsOptions) => {
  const { activeWorkspaceId } = useWorkspaceContext();
  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useQuery({
    queryKey:
      resolvedWorkspaceId && notificationId
        ? notificationQueryKeys.detail(resolvedWorkspaceId, notificationId)
        : [...notificationQueryKeys.details(), "disabled"],
    queryFn: () => getNotificationById(resolvedWorkspaceId as string, notificationId),
    enabled: enabled && !!resolvedWorkspaceId && !!notificationId,
    staleTime: 1000 * 30,
  });
};
