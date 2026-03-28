"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteWorkspaceInvitation } from "@/components/features/workspace/api/workspace.api";

export const useDeleteWorkspaceInvitation = (workspaceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (invitationId: string) => deleteWorkspaceInvitation(workspaceId, invitationId),
    onSuccess: () => {
      toast.success("Invitation deleted", {
        description: "The invitation record has been permanently removed.",
      });
      queryClient.invalidateQueries({ queryKey: ["workspaces", workspaceId, "invitations"] });
    },
    onError: (error: { message?: string }) => {
      toast.error("Failed to delete invitation", {
        description: error?.message || "Something went wrong. Please try again.",
      });
    },
  });
};
