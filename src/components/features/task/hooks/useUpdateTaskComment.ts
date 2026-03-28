"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateTaskComment } from "@/components/features/task/api/task.api";
import { taskQueryKeys } from "@/components/features/task/hooks/task.query-keys";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";
import type { UpdateTaskCommentPayload } from "@/types/task.types";

type UseUpdateTaskCommentOptions = {
  workspaceId?: string | null;
};

export const useUpdateTaskComment = ({ workspaceId }: UseUpdateTaskCommentOptions = {}) => {
  const queryClient = useQueryClient();
  const { activeWorkspaceId } = useWorkspaceContext();
  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useMutation({
    mutationFn: ({
      taskId,
      commentId,
      payload,
    }: {
      taskId: string;
      commentId: string;
      payload: UpdateTaskCommentPayload;
    }) => updateTaskComment(resolvedWorkspaceId as string, taskId, commentId, payload),

    onSuccess: async (_data, variables) => {
      if (!resolvedWorkspaceId) return;

      await queryClient.invalidateQueries({
        queryKey: taskQueryKeys.commentsRoot(resolvedWorkspaceId, variables.taskId),
        exact: false,
      });

      await queryClient.invalidateQueries({
        queryKey: taskQueryKeys.detail(resolvedWorkspaceId, variables.taskId),
      });
    },

    onError: (error: Error) => {
      console.error("Update task comment failed:", error.message);
    },
  });
};
