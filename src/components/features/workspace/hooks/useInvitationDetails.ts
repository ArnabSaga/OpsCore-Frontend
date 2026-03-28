"use client";

import { useQuery } from "@tanstack/react-query";
import { getInvitationByToken } from "@/components/features/workspace/api/workspace.api";

export const useInvitationDetails = (token: string) => {
  return useQuery({
    queryKey: ["invitation-details", token],
    queryFn: () => getInvitationByToken(token),
    enabled: !!token,
  });
};
