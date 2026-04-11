"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyInvitations } from "../api/invitation.api";
import { invitationQueryKeys } from "./invitation.query-keys";

export const useMyInvitations = () => {
  return useQuery({
    queryKey: invitationQueryKeys.my(),
    queryFn: getMyInvitations,
    staleTime: 60 * 1000,
    retry: false,
  });
};
