"use client";

import { useState } from "react";

import { useCancelInvoice } from "@/components/features/invoice/hooks/useCancelInvoice";
import type { InvoiceDetails } from "@/components/features/invoice/types/invoice.types";
import AppSubmitButton from "@/components/form/AppSubmitButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type CancelInvoiceDialogProps = {
  invoice: InvoiceDetails | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const CancelInvoiceDialog = ({ invoice, open, onOpenChange }: CancelInvoiceDialogProps) => {
  const { mutateAsync, isPending } = useCancelInvoice();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleConfirm = async () => {
    if (!invoice) return;

    setErrorMessage(null);

    try {
      await mutateAsync({ invoiceId: invoice.id });
      onOpenChange(false);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to cancel invoice.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-white/10 bg-[#101828] text-white">
        <DialogHeader>
          <DialogTitle>Cancel invoice</DialogTitle>
          <DialogDescription className="text-[#94A3B8]">
            This action will mark the invoice as canceled. Paid invoices cannot be canceled.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-[#94A3B8]">
            <p>
              Invoice: <span className="font-medium text-white">{invoice?.invoiceNumber}</span>
            </p>
            <p className="mt-2">
              Amount: <span className="font-medium text-white">{invoice?.amount}</span>
            </p>
          </div>

          {errorMessage ? (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {errorMessage}
            </div>
          ) : null}

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              Back
            </Button>

            <AppSubmitButton isSubmitting={isPending} onClick={handleConfirm}>
              Cancel Invoice
            </AppSubmitButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CancelInvoiceDialog;
