"use client";

import { useQuery } from "@tanstack/react-query";
import { getInvitationByToken } from "@/components/features/workspace/api/workspace.api";
import { workspaceQueryKeys } from "@/components/features/workspace/hooks/workspace.query-keys";

export const useInvitationDetails = (token: string) => {
  return useQuery({
    queryKey: token
      ? workspaceQueryKeys.invitationDetails(token)
      : [...workspaceQueryKeys.all, "invitation-details", "disabled"],
    queryFn: () => getInvitationByToken(token),
    enabled: !!token,
  });
};
