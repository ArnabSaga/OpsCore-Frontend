import Link from "next/link";

import InvoiceStatusBadge from "@/components/features/invoice/components/InvoiceStatusBadge";
import type { InvoiceListItem } from "@/components/features/invoice/types/invoice.types";
import {
  formatInvoiceDate,
  formatInvoiceMoney,
} from "@/components/features/invoice/utils/invoice-display";
import { Button } from "@/components/ui/button";

type InvoiceTableProps = {
  invoices: InvoiceListItem[];
  onDelete?: (invoice: InvoiceListItem) => Promise<void> | void;
};

const InvoiceTable = ({ invoices, onDelete }: InvoiceTableProps) => {
  return (
    <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#101828]/85 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-[#94A3B8]">
          <thead className="bg-white/5 text-xs uppercase tracking-[0.14em] text-[#667085]">
            <tr>
              <th className="px-5 py-4">Invoice</th>
              <th className="px-5 py-4">Customer</th>
              <th className="px-5 py-4">Amount</th>
              <th className="px-5 py-4">Due</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Items</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-t border-white/10">
                <td className="px-5 py-4">
                  <div className="font-medium text-white">{invoice.invoiceNumber}</div>
                  <div className="mt-1 text-xs text-[#667085]">
                    Created {formatInvoiceDate(invoice.createdAt)}
                  </div>
                </td>

                <td className="px-5 py-4">
                  <div className="font-medium text-white">
                    {invoice.customerName || "Unnamed customer"}
                  </div>
                  <div className="mt-1 text-xs text-[#667085]">
                    {invoice.customerEmail || "No email"}
                  </div>
                </td>

                <td className="px-5 py-4 font-medium text-white">
                  {formatInvoiceMoney(invoice.amount, invoice.currency)}
                </td>

                <td className="px-5 py-4">{formatInvoiceDate(invoice.dueAt, "No due date")}</td>

                <td className="px-5 py-4">
                  <InvoiceStatusBadge invoice={invoice} />
                </td>

                <td className="px-5 py-4">{invoice._count.items}</td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <Button
                      asChild
                      variant="outline"
                      className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
                    >
                      <Link href={`/invoices/${invoice.id}`}>Open</Link>
                    </Button>

                    <Button
                      asChild
                      className="rounded-xl bg-[#7F56D9] text-white hover:bg-[#6941C6]"
                    >
                      <Link href={`/invoices/${invoice.id}/preview`}>Preview</Link>
                    </Button>

                    {onDelete ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => void onDelete(invoice)}
                        className="rounded-xl border-red-500/20 bg-red-500/10 text-red-200 hover:bg-red-500/20"
                      >
                        Delete
                      </Button>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceTable;
