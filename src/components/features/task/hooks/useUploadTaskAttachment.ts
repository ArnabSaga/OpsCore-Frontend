"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { uploadTaskAttachment } from "@/components/features/task/api/task.api";
import { taskQueryKeys } from "@/components/features/task/hooks/task.query-keys";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";

type UseUploadTaskAttachmentOptions = {
  workspaceId?: string | null;
};

export const useUploadTaskAttachment = ({ workspaceId }: UseUploadTaskAttachmentOptions = {}) => {
  const queryClient = useQueryClient();
  const { activeWorkspaceId } = useWorkspaceContext();
  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useMutation({
    mutationFn: ({ taskId, file }: { taskId: string; file: File }) =>
      uploadTaskAttachment(resolvedWorkspaceId as string, taskId, file),

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
      console.error("Upload task attachment failed:", error.message);
    },
  });
};
