import Link from "next/link";
import { ExternalLink, Eye, LayoutGrid } from "lucide-react";

import InvoiceStatusBadge from "@/components/features/invoice/components/InvoiceStatusBadge";
import type { PlatformInvoiceListItem } from "@/components/features/invoice/types/invoice.types";
import {
  formatInvoiceDate,
  formatInvoiceMoney,
} from "@/components/features/invoice/utils/invoice-display";
import { Button } from "@/components/ui/button";

type PlatformInvoiceTableProps = {
  invoices: PlatformInvoiceListItem[];
};

const PlatformInvoiceTable = ({ invoices }: PlatformInvoiceTableProps) => {
  return (
    <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#101828]/40 shadow-[0_32px_120px_rgba(0,0,0,0.5)] backdrop-blur-3xl">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] text-left text-sm text-[#94A3B8]">
          <thead className="border-b border-white/5 bg-white/2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#667085]">
            <tr>
              <th className="px-6 py-5">Workspace</th>
              <th className="px-6 py-5">Invoice #</th>
              <th className="px-6 py-5">Customer</th>
              <th className="px-6 py-5">Amount</th>
              <th className="px-6 py-5">Status</th>
              <th className="px-6 py-5">Due Date</th>
              <th className="px-6 py-5 text-right">Oversight</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {invoices.map((invoice) => (
              <tr 
                key={invoice.id} 
                className="group transition-colors hover:bg-white/3"
              >
                <td className="px-6 py-5">
                  <Link 
                    href={`/platform/workspaces/${invoice.workspaceId}`}
                    className="inline-flex items-center gap-2 font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <LayoutGrid className="h-3.5 w-3.5 opacity-50" />
                    {invoice.workspaceName}
                  </Link>
                </td>

                <td className="px-6 py-5">
                  <div className="font-bold text-white tracking-wide">{invoice.invoiceNumber}</div>
                  <div className="mt-1 text-[11px] text-[#667085]">
                    Issued {formatInvoiceDate(invoice.createdAt)}
                  </div>
                </td>

                <td className="px-6 py-5">
                  <div className="font-medium text-white/90">
                    {invoice.customerName || "—"}
                  </div>
                  <div className="mt-1 text-[11px] text-[#667085]">
                    {invoice.customerEmail || "No email"}
                  </div>
                </td>

                <td className="px-6 py-5">
                  <div className="text-[15px] font-bold text-white tabular-nums">
                    {formatInvoiceMoney(invoice.amount, invoice.currency)}
                  </div>
                </td>

                <td className="px-6 py-5">
                  <InvoiceStatusBadge invoice={invoice} />
                </td>

                <td className="px-6 py-5">
                   <div className="text-[13px] font-medium text-[#94A3B8]">
                     {formatInvoiceDate(invoice.dueAt, "Not set")}
                   </div>
                </td>

                <td className="px-6 py-5 text-right">
                   <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-9 px-3 rounded-xl border border-white/5 bg-white/5 text-[#94A3B8] hover:bg-white/10 hover:text-white"
                        asChild
                      >
                         <span className="inline-flex items-center cursor-not-allowed opacity-50">
                            <Eye className="mr-2 h-4 w-4" />
                            Details (v2)
                         </span>
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-9 px-3 rounded-xl border border-white/5 bg-white/5 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300"
                        title="Open in tenant context (Careful)"
                        disabled
                      >
                         <ExternalLink className="h-4 w-4" />
                      </Button>
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

export default PlatformInvoiceTable;
