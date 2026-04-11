"use client";

import { useQuery } from "@tanstack/react-query";
import { getInvitationByToken } from "../api/invitation.api";
import { invitationQueryKeys } from "./invitation.query-keys";

export const useInvitationDetails = (token: string) => {
  return useQuery({
    queryKey: token
      ? invitationQueryKeys.details(token)
      : [...invitationQueryKeys.all, "details", "disabled"],
    queryFn: () => getInvitationByToken(token),
    enabled: !!token,
  });
};
