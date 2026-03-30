"use client";

import { useQuery } from "@tanstack/react-query";
import { getPlatformLogs } from "../api/platform.api";
import { platformQueryKeys } from "./platform.query-keys";

type UsePlatformLogsOptions = {
  search?: string;
  page?: number;
  limit?: number;
  enabled?: boolean;
};

export const usePlatformLogs = ({
  search = "",
  page = 1,
  limit = 10,
  enabled = false, // Disabled by default until backend support exists
}: UsePlatformLogsOptions = {}) => {
  return useQuery({
    queryKey: platformQueryKeys.logs({ search, page }),
    queryFn: () => getPlatformLogs({ search, page, limit }),
    enabled,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
