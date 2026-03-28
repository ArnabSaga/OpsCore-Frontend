"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { deleteInvoice } from "@/components/features/invoice/api/invoice.api";
import { invoiceQueryKeys } from "@/components/features/invoice/hooks/invoice.query-keys";
import { dashboardQueryKeys } from "@/components/features/dashboard/hooks/dashboard.query-keys";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";

type UseDeleteInvoiceOptions = {
  workspaceId?: string | null;
  redirectTo?: string | null;
};

type DeleteInvoiceMutationInput = {
  invoiceId: string;
};

export const useDeleteInvoice = ({ workspaceId, redirectTo }: UseDeleteInvoiceOptions = {}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { activeWorkspaceId } = useWorkspaceContext();
  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useMutation({
    mutationFn: ({ invoiceId }: DeleteInvoiceMutationInput) =>
      deleteInvoice(resolvedWorkspaceId as string, invoiceId),

    onSuccess: async (_data, variables) => {
      if (!resolvedWorkspaceId) return;

      await queryClient.invalidateQueries({
        queryKey: invoiceQueryKeys.lists(),
      });

      queryClient.removeQueries({
        queryKey: invoiceQueryKeys.detail(resolvedWorkspaceId, variables.invoiceId),
      });

      await queryClient.invalidateQueries({
        queryKey: dashboardQueryKeys.all,
      });

      if (redirectTo) {
        router.replace(redirectTo);
        router.refresh();
      }
    },

    onError: (error: Error) => {
      console.error("Delete invoice failed:", error.message);
    },
  });
};
