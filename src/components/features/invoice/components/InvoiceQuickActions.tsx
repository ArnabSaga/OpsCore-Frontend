import { CheckCheck, Pencil, Send, Trash2, XCircle } from "lucide-react";
import Link from "next/link";

import type { InvoiceDetails } from "@/components/features/invoice/types/invoice.types";
import { getDisplayInvoiceStatus } from "@/components/features/invoice/utils/invoice-display";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type InvoiceQuickActionsProps = {
  invoice: InvoiceDetails;
  onSend: () => void;
  onMarkPaid: () => void;
  onCancel: () => void;
  onDelete: () => void;
};

const InvoiceQuickActions = ({
  invoice,
  onSend,
  onMarkPaid,
  onCancel,
  onDelete,
}: InvoiceQuickActionsProps) => {
  const displayStatus = getDisplayInvoiceStatus(invoice);

  const canEdit = displayStatus !== "PAID" && displayStatus !== "CANCELED";
  const canDelete = displayStatus === "PENDING" || displayStatus === "CANCELED";
  const canSend = displayStatus !== "CANCELED";
  const canMarkPaid = displayStatus !== "PAID" && displayStatus !== "CANCELED";
  const canCancel = displayStatus !== "PAID" && displayStatus !== "CANCELED";

  return (
    <Card className="rounded-[24px] border border-white/10 bg-[#1D2939]/80 text-white shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-white">Quick actions</h2>
        <p className="mt-1 text-sm text-[#94A3B8]">
          Actions are aligned with current backend restrictions.
        </p>

        <div className="mt-6 grid gap-3">
          <Button
            asChild
            disabled={!canEdit}
            className="h-11 justify-start rounded-xl bg-[#7F56D9] text-white hover:bg-[#6941C6] disabled:pointer-events-none disabled:opacity-50"
          >
            <Link href={`/invoices/${invoice.id}/edit`}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit invoice
            </Link>
          </Button>

          <Button
            type="button"
            disabled={!canSend}
            onClick={onSend}
            variant="outline"
            className="h-11 justify-start rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10 disabled:pointer-events-none disabled:opacity-50"
          >
            <Send className="mr-2 h-4 w-4" />
            Send invoice
          </Button>

          <Button
            type="button"
            disabled={!canMarkPaid}
            onClick={onMarkPaid}
            variant="outline"
            className="h-11 justify-start rounded-xl border-emerald-500/20 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/20 disabled:pointer-events-none disabled:opacity-50"
          >
            <CheckCheck className="mr-2 h-4 w-4" />
            Mark as paid
          </Button>

          <Button
            type="button"
            disabled={!canCancel}
            onClick={onCancel}
            variant="outline"
            className="h-11 justify-start rounded-xl border-amber-500/20 bg-amber-500/10 text-amber-200 hover:bg-amber-500/20 disabled:pointer-events-none disabled:opacity-50"
          >
            <XCircle className="mr-2 h-4 w-4" />
            Cancel invoice
          </Button>

          <Button
            type="button"
            disabled={!canDelete}
            onClick={onDelete}
            variant="outline"
            className="h-11 justify-start rounded-xl border-red-500/20 bg-red-500/10 text-red-200 hover:bg-red-500/20 disabled:pointer-events-none disabled:opacity-50"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete invoice
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceQuickActions;
