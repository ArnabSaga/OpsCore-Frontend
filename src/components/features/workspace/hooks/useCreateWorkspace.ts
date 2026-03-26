"use client";

import { createWorkspace } from "@/components/features/workspace/api/workspace.api";
import type { CreateWorkspacePayload } from "@/types/workspace.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateWorkspacePayload) => createWorkspace(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      await queryClient.invalidateQueries({ queryKey: ["auth", "current-user"] });
    },
    onError: (error: Error) => {
      console.error("Create workspace failed:", error.message);
    },
  });
};
