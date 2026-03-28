"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createTaskComment } from "@/components/features/task/api/task.api";
import { taskQueryKeys } from "@/components/features/task/hooks/task.query-keys";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";
import type { CreateTaskCommentPayload } from "@/types/task.types";

type UseCreateTaskCommentOptions = {
  workspaceId?: string | null;
};

export const useCreateTaskComment = ({ workspaceId }: UseCreateTaskCommentOptions = {}) => {
  const queryClient = useQueryClient();
  const { activeWorkspaceId } = useWorkspaceContext();

  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useMutation({
    mutationFn: ({ taskId, payload }: { taskId: string; payload: CreateTaskCommentPayload }) =>
      createTaskComment(resolvedWorkspaceId as string, taskId, payload),
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
      console.error("Create task comment failed:", error.message);
    },
  });
};
