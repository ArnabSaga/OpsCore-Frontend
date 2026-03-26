"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { switchWorkspace } from "@/components/features/workspace/api/workspace.api";

export const useSwitchWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (workspaceId: string) => switchWorkspace(workspaceId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      await queryClient.invalidateQueries({ queryKey: ["auth", "current-user"] });
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
      await queryClient.invalidateQueries({ queryKey: ["members"] });
      await queryClient.invalidateQueries({ queryKey: ["analytics"] });
    },
    onError: (error: Error) => {
      console.error("Workspace switch failed:", error.message);
    },
  });
};
