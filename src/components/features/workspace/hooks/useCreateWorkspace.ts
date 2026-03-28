"use client";

import { createWorkspace } from "@/components/features/workspace/api/workspace.api";
import type { CreateWorkspacePayload } from "@/types/workspace.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { workspaceQueryKeys } from "@/components/features/workspace/hooks/workspace.query-keys";
import { authQueryKeys } from "@/components/features/auth/hooks/auth.query-keys";

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateWorkspacePayload) => createWorkspace(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: workspaceQueryKeys.all });
      await queryClient.invalidateQueries({ queryKey: authQueryKeys.currentUser() });
    },
    onError: (error: Error) => {
      console.error("Create workspace failed:", error.message);
    },
  });
};
