"use client";

import { useCallback, useState } from "react";

import type {
  InvoiceDetails,
  InvoiceListItem,
} from "@/components/features/invoice/types/invoice.types";

type InvoiceEntity = InvoiceListItem | InvoiceDetails;

type DialogName = "send" | "markPaid" | "cancel" | "delete";

type InvoiceActionState = {
  send: boolean;
  markPaid: boolean;
  cancel: boolean;
  delete: boolean;
  selectedInvoice: InvoiceEntity | null;
};

export const useInvoiceActionState = () => {
  const [state, setState] = useState<InvoiceActionState>({
    send: false,
    markPaid: false,
    cancel: false,
    delete: false,
    selectedInvoice: null,
  });

  const openDialog = useCallback((dialog: DialogName, invoice?: InvoiceEntity) => {
    setState((prev) => ({
      ...prev,
      [dialog]: true,
      selectedInvoice: invoice ?? prev.selectedInvoice,
    }));
  }, []);

  const closeDialog = useCallback((dialog: DialogName) => {
    setState((prev) => ({
      ...prev,
      [dialog]: false,
    }));
  }, []);

  const closeAllDialogs = useCallback(() => {
    setState({
      send: false,
      markPaid: false,
      cancel: false,
      delete: false,
      selectedInvoice: null,
    });
  }, []);

  const clearSelectedInvoice = useCallback(() => {
    setState((prev) => ({
      ...prev,
      selectedInvoice: null,
    }));
  }, []);

  return {
    ...state,
    openDialog,
    closeDialog,
    closeAllDialogs,
    clearSelectedInvoice,
  };
};
