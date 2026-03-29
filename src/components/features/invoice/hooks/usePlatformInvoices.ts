"use client";

import { useQuery } from "@tanstack/react-query";
import { getPlatformInvoices } from "@/components/features/invoice/api/invoice.api";
import { platformInvoiceQueryKeys } from "@/components/features/invoice/hooks/platform-invoice.query-keys";
import type { GetPlatformInvoicesParams } from "@/components/features/invoice/types/invoice.types";

export type UsePlatformInvoicesOptions = {
  params?: GetPlatformInvoicesParams;
  enabled?: boolean;
};

export const usePlatformInvoices = ({ params, enabled = true }: UsePlatformInvoicesOptions = {}) => {
  return useQuery({
    queryKey: platformInvoiceQueryKeys.list(params),
    queryFn: () => getPlatformInvoices(params),
    enabled: enabled,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
