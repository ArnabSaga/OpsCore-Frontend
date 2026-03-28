"use client";

import { useQuery } from "@tanstack/react-query";

import { getTaskAttachments } from "@/components/features/task/api/task.api";
import { taskQueryKeys } from "@/components/features/task/hooks/task.query-keys";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";
import type { GetTaskAttachmentsParams } from "@/types/task.types";

type UseTaskAttachmentsOptions = {
  workspaceId?: string | null;
  taskId: string;
  params?: GetTaskAttachmentsParams;
  enabled?: boolean;
};

export const useTaskAttachments = ({
  workspaceId,
  taskId,
  params,
  enabled = true,
}: UseTaskAttachmentsOptions) => {
  const { activeWorkspaceId } = useWorkspaceContext();

  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useQuery({
    queryKey:
      resolvedWorkspaceId && taskId
        ? taskQueryKeys.attachments(resolvedWorkspaceId, taskId, params)
        : [...taskQueryKeys.all, "attachments", "disabled"],
    queryFn: () => getTaskAttachments(resolvedWorkspaceId as string, taskId, params),
    enabled: enabled && !!resolvedWorkspaceId && !!taskId,
    staleTime: 1000 * 30,
  });
};
