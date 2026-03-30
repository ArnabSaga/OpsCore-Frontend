"use client";

import { useQuery } from "@tanstack/react-query";
import { getPlatformSubscriptions } from "../api/platform.api";
import { platformQueryKeys } from "./platform.query-keys";

type UsePlatformSubscriptionsOptions = {
  search?: string;
  page?: number;
  limit?: number;
  enabled?: boolean;
};

export const usePlatformSubscriptions = ({
  search = "",
  page = 1,
  limit = 10,
  enabled = false, // Disabled by default until backend support exists
}: UsePlatformSubscriptionsOptions = {}) => {
  return useQuery({
    queryKey: platformQueryKeys.subscriptions({ search, page }),
    queryFn: () => getPlatformSubscriptions({ search, page, limit }),
    enabled,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
