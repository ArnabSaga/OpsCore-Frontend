"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { dashboardQueryKeys } from "@/components/features/dashboard/hooks/dashboard.query-keys";
import { cancelInvoice } from "@/components/features/invoice/api/invoice.api";
import { invoiceQueryKeys } from "@/components/features/invoice/hooks/invoice.query-keys";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";

type UseCancelInvoiceOptions = {
  workspaceId?: string | null;
};

type CancelInvoiceMutationInput = {
  invoiceId: string;
};

export const useCancelInvoice = ({ workspaceId }: UseCancelInvoiceOptions = {}) => {
  const queryClient = useQueryClient();
  const { activeWorkspaceId } = useWorkspaceContext();
  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useMutation({
    mutationFn: ({ invoiceId }: CancelInvoiceMutationInput) =>
      cancelInvoice(resolvedWorkspaceId as string, invoiceId),

    onSuccess: async (updatedInvoice, variables) => {
      if (!resolvedWorkspaceId) return;

      queryClient.setQueryData(
        invoiceQueryKeys.detail(resolvedWorkspaceId, variables.invoiceId),
        updatedInvoice
      );

      await queryClient.invalidateQueries({
        queryKey: invoiceQueryKeys.lists(),
      });

      await queryClient.invalidateQueries({
        queryKey: dashboardQueryKeys.all,
      });
    },

    onError: (error: Error) => {
      console.error("Cancel invoice failed:", error.message);
    },
  });
};
