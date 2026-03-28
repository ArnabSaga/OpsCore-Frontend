"use client";

import { useQuery } from "@tanstack/react-query";

import { getInvoices } from "@/components/features/invoice/api/invoice.api";
import { invoiceQueryKeys } from "@/components/features/invoice/hooks/invoice.query-keys";
import type { GetInvoicesParams } from "@/components/features/invoice/types/invoice.types";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";

type UseInvoicesOptions = {
  workspaceId?: string | null;
  params?: GetInvoicesParams;
  enabled?: boolean;
};

export const useInvoices = ({ workspaceId, params, enabled = true }: UseInvoicesOptions = {}) => {
  const { activeWorkspaceId } = useWorkspaceContext();
  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useQuery({
    queryKey: resolvedWorkspaceId
      ? invoiceQueryKeys.list(resolvedWorkspaceId, params)
      : [...invoiceQueryKeys.lists(), "no-workspace"],
    queryFn: () => getInvoices(resolvedWorkspaceId as string, params),
    enabled: enabled && !!resolvedWorkspaceId,
    staleTime: 1000 * 60 * 5,
  });
};
