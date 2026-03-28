"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteTaskAttachment } from "@/components/features/task/api/task.api";
import { taskQueryKeys } from "@/components/features/task/hooks/task.query-keys";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";

type UseDeleteTaskAttachmentOptions = {
  workspaceId?: string | null;
};

export const useDeleteTaskAttachment = ({ workspaceId }: UseDeleteTaskAttachmentOptions = {}) => {
  const queryClient = useQueryClient();
  const { activeWorkspaceId } = useWorkspaceContext();
  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useMutation({
    mutationFn: ({ taskId, attachmentId }: { taskId: string; attachmentId: string }) =>
      deleteTaskAttachment(resolvedWorkspaceId as string, taskId, attachmentId),

    onSuccess: async (_data, variables) => {
      if (!resolvedWorkspaceId) return;

      await queryClient.invalidateQueries({
        queryKey: taskQueryKeys.attachmentsRoot(resolvedWorkspaceId, variables.taskId),
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
      console.error("Delete task attachment failed:", error.message);
    },
  });
};
