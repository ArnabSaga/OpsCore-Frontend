import type { NotificationListParams } from "@/components/features/notification/types/notification.types";

export const notificationQueryKeys = {
  all: ["notifications"] as const,

  lists: () => [...notificationQueryKeys.all, "list"] as const,
  list: (workspaceId: string, params?: NotificationListParams) =>
    [...notificationQueryKeys.lists(), workspaceId, params ?? {}] as const,

  details: () => [...notificationQueryKeys.all, "detail"] as const,
  detail: (workspaceId: string, notificationId: string) =>
    [...notificationQueryKeys.details(), workspaceId, notificationId] as const,

  unreadSummary: (workspaceId: string) =>
    [...notificationQueryKeys.all, "unread-summary", workspaceId] as const,

  preferences: (workspaceId: string) =>
    [...notificationQueryKeys.all, "preferences", workspaceId] as const,
} as const;
