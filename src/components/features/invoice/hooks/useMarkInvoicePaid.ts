"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { dashboardQueryKeys } from "@/components/features/dashboard/hooks/dashboard.query-keys";
import { markInvoicePaid } from "@/components/features/invoice/api/invoice.api";
import { invoiceQueryKeys } from "@/components/features/invoice/hooks/invoice.query-keys";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";

type UseMarkInvoicePaidOptions = {
  workspaceId?: string | null;
};

type MarkInvoicePaidMutationInput = {
  invoiceId: string;
};

export const useMarkInvoicePaid = ({ workspaceId }: UseMarkInvoicePaidOptions = {}) => {
  const queryClient = useQueryClient();
  const { activeWorkspaceId } = useWorkspaceContext();
  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useMutation({
    mutationFn: ({ invoiceId }: MarkInvoicePaidMutationInput) =>
      markInvoicePaid(resolvedWorkspaceId as string, invoiceId),

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
      console.error("Mark invoice paid failed:", error.message);
    },
  });
};
