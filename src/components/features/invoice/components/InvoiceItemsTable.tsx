import type { InvoiceDetails } from "@/components/features/invoice/types/invoice.types";
import { formatInvoiceMoney } from "@/components/features/invoice/utils/invoice-display";
import { Card, CardContent } from "@/components/ui/card";

type InvoiceItemsTableProps = {
  invoice: InvoiceDetails;
};

const InvoiceItemsTable = ({ invoice }: InvoiceItemsTableProps) => {
  return (
    <Card className="rounded-[24px] border border-white/10 bg-[#101828]/85 text-white shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <CardContent className="p-0">
        <div className="border-b border-white/10 px-6 py-5">
          <h2 className="text-lg font-semibold text-white">Invoice items</h2>
          <p className="mt-1 text-sm text-[#94A3B8]">
            Backend-calculated quantities, unit prices, and line totals.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-[#94A3B8]">
            <thead className="bg-white/5 text-xs uppercase tracking-[0.14em] text-[#667085]">
              <tr>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Qty</th>
                <th className="px-6 py-4">Unit price</th>
                <th className="px-6 py-4 text-right">Line total</th>
              </tr>
            </thead>

            <tbody>
              {invoice.items.map((item) => (
                <tr key={item.id} className="border-t border-white/10">
                  <td className="px-6 py-4">
                    <div className="max-w-[520px]">
                      <p className="font-medium text-white">{item.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white">{item.quantity}</td>
                  <td className="px-6 py-4 text-white">
                    {formatInvoiceMoney(item.unitPrice, invoice.currency)}
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-white">
                    {formatInvoiceMoney(item.lineTotal, invoice.currency)}
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr className="border-t border-white/10 bg-white/3">
                <td className="px-6 py-5" colSpan={3}>
                  <span className="text-sm font-medium text-[#94A3B8]">Total</span>
                </td>
                <td className="px-6 py-5 text-right text-lg font-semibold text-white">
                  {formatInvoiceMoney(invoice.amount, invoice.currency)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceItemsTable;
