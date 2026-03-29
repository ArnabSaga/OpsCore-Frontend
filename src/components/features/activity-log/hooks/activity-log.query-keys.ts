import { GetActivityLogsParams } from "../types/activity-log.types";

export const activityLogQueryKeys = {
  all: ["activity-logs"] as const,

  lists: () => [...activityLogQueryKeys.all, "list"] as const,
  list: (workspaceId: string, params?: GetActivityLogsParams) =>
    [...activityLogQueryKeys.lists(), workspaceId, params ?? {}] as const,

  details: () => [...activityLogQueryKeys.all, "detail"] as const,
  detail: (workspaceId: string, logId: string) =>
    [...activityLogQueryKeys.details(), workspaceId, logId] as const,
} as const;
