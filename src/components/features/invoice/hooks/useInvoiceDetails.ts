"use client";

import { useQuery } from "@tanstack/react-query";

import { getInvoiceById } from "@/components/features/invoice/api/invoice.api";
import { invoiceQueryKeys } from "@/components/features/invoice/hooks/invoice.query-keys";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";

type UseInvoiceDetailsOptions = {
  workspaceId?: string | null;
  invoiceId: string;
  enabled?: boolean;
};

export const useInvoiceDetails = ({
  workspaceId,
  invoiceId,
  enabled = true,
}: UseInvoiceDetailsOptions) => {
  const { activeWorkspaceId } = useWorkspaceContext();
  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useQuery({
    queryKey:
      resolvedWorkspaceId && invoiceId
        ? invoiceQueryKeys.detail(resolvedWorkspaceId, invoiceId)
        : [...invoiceQueryKeys.details(), "disabled"],
    queryFn: () => getInvoiceById(resolvedWorkspaceId as string, invoiceId),
    enabled: enabled && !!resolvedWorkspaceId && !!invoiceId,
    staleTime: 1000 * 30,
  });
};
