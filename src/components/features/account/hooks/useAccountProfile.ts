"use client";

import { useQuery } from "@tanstack/react-query";

import { getMyProfile } from "@/components/features/account/api/account.api";
import { accountQueryKeys } from "@/components/features/account/hooks/account.query-keys";

type UseAccountProfileOptions = {
  enabled?: boolean;
};

export const useAccountProfile = ({ enabled = true }: UseAccountProfileOptions = {}) => {
  return useQuery({
    queryKey: accountQueryKeys.profile(),
    queryFn: getMyProfile,
    enabled,
    staleTime: 1000 * 60,
  });
};
