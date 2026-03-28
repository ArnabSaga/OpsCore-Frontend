"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteWorkspaceInvitation } from "@/components/features/workspace/api/workspace.api";
import { workspaceQueryKeys } from "@/components/features/workspace/hooks/workspace.query-keys";

export const useDeleteWorkspaceInvitation = (workspaceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (invitationId: string) => deleteWorkspaceInvitation(workspaceId, invitationId),
    onSuccess: async () => {
      toast.success("Invitation deleted", {
        description: "The invitation record has been permanently removed.",
      });

      await queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.invitations(workspaceId),
      });
    },
    onError: (error: { message?: string }) => {
      toast.error("Failed to delete invitation", {
        description: error?.message || "Something went wrong. Please try again.",
      });
    },
  });
};
