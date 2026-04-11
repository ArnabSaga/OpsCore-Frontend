"use client";

import { getWorkspaceInvitationHistory } from "@/components/features/invitations/api/invitation.api";
import type { WorkspaceInvitation } from "@/types/workspace.types";
import { useQuery } from "@tanstack/react-query";
import { invitationQueryKeys } from "./invitation.query-keys";

type QueryError = Error & { status?: number };

export const useWorkspaceInvitationHistory = (
  workspaceId?: string,
  options?: { enabled?: boolean }
) => {
  const query = useQuery<WorkspaceInvitation[], QueryError>({
    queryKey: workspaceId
      ? invitationQueryKeys.history(workspaceId)
      : [...invitationQueryKeys.all, "history", "disabled"],
    queryFn: () => getWorkspaceInvitationHistory(workspaceId!),
    enabled: !!workspaceId && options?.enabled !== false,
    retry: (failureCount, error) => {
      if (error?.status === 401 || error?.status === 403) return false;
      return failureCount < 2;
    },
  });

  return {
    ...query,
    invitations: query.data ?? [],
  };
};
