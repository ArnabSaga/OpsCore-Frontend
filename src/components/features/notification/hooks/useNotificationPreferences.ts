"use client";

import { useQuery } from "@tanstack/react-query";

import { getNotificationPreferences } from "@/components/features/notification/api/notification.api";
import { notificationQueryKeys } from "@/components/features/notification/hooks/notification.query-keys";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";

type UseNotificationPreferencesOptions = {
  workspaceId?: string | null;
  enabled?: boolean;
};

export const useNotificationPreferences = ({
  workspaceId,
  enabled = true,
}: UseNotificationPreferencesOptions = {}) => {
  const { activeWorkspaceId } = useWorkspaceContext();
  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useQuery({
    queryKey: resolvedWorkspaceId
      ? notificationQueryKeys.preferences(resolvedWorkspaceId)
      : [...notificationQueryKeys.all, "preferences", "no-workspace"],
    queryFn: () => getNotificationPreferences(resolvedWorkspaceId as string),
    enabled: enabled && !!resolvedWorkspaceId,
    staleTime: 1000 * 60,
  });
};
