import type {
  GetTaskAttachmentsParams,
  GetTaskCommentsParams,
  GetTasksParams,
} from "@/types/task.types";

export const taskQueryKeys = {
  all: ["tasks"] as const,

  lists: () => [...taskQueryKeys.all, "list"] as const,
  list: (workspaceId: string, params?: GetTasksParams) =>
    [...taskQueryKeys.lists(), workspaceId, params ?? {}] as const,

  details: () => [...taskQueryKeys.all, "detail"] as const,
  detail: (workspaceId: string, taskId: string) =>
    [...taskQueryKeys.details(), workspaceId, taskId] as const,

  comments: (workspaceId: string, taskId: string, params?: GetTaskCommentsParams) =>
    [...taskQueryKeys.all, "comments", workspaceId, taskId, params ?? {}] as const,

  attachments: (workspaceId: string, taskId: string, params?: GetTaskAttachmentsParams) =>
    [...taskQueryKeys.all, "attachments", workspaceId, taskId, params ?? {}] as const,
} as const;
