import type { GetProjectsParams, GetProjectTasksParams } from "@/types/project.types";

export const projectQueryKeys = {
  all: ["projects"] as const,

  lists: () => [...projectQueryKeys.all, "list"] as const,
  list: (workspaceId: string, params?: GetProjectsParams) =>
    [...projectQueryKeys.lists(), workspaceId, params ?? {}] as const,

  details: () => [...projectQueryKeys.all, "detail"] as const,
  detail: (workspaceId: string, projectId: string) =>
    [...projectQueryKeys.details(), workspaceId, projectId] as const,

  members: (workspaceId: string, projectId: string) =>
    [...projectQueryKeys.all, "members", workspaceId, projectId] as const,

  tasks: (workspaceId: string, projectId: string, params?: GetProjectTasksParams) =>
    [...projectQueryKeys.all, "tasks", workspaceId, projectId, params ?? {}] as const,

  summary: (workspaceId: string, projectId: string) =>
    [...projectQueryKeys.all, "summary", workspaceId, projectId] as const,
} as const;
