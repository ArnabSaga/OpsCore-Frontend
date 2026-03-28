"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteTaskComment } from "@/components/features/task/api/task.api";
import { taskQueryKeys } from "@/components/features/task/hooks/task.query-keys";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";

type UseDeleteTaskCommentOptions = {
  workspaceId?: string | null;
};

export const useDeleteTaskComment = ({ workspaceId }: UseDeleteTaskCommentOptions = {}) => {
  const queryClient = useQueryClient();
  const { activeWorkspaceId } = useWorkspaceContext();

  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useMutation({
    mutationFn: ({ taskId, commentId }: { taskId: string; commentId: string }) =>
      deleteTaskComment(resolvedWorkspaceId as string, taskId, commentId),
    onSuccess: async (_data, variables) => {
      if (!resolvedWorkspaceId) return;

      await queryClient.invalidateQueries({
        queryKey: taskQueryKeys.comments(resolvedWorkspaceId, variables.taskId),
        exact: false,
      });

      await queryClient.invalidateQueries({
        queryKey: taskQueryKeys.detail(resolvedWorkspaceId, variables.taskId),
      });

      await queryClient.invalidateQueries({
        queryKey: taskQueryKeys.lists(),
      });
    },
    onError: (error: Error) => {
      console.error("Delete task comment failed:", error.message);
    },
  });
};
