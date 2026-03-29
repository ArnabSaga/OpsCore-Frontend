import { FileText, ReceiptText, Sparkles, Wallet } from "lucide-react";

type InvoiceListHeroProps = {
  totalInvoices: number;
  pendingInvoices: number;
  paidInvoices: number;
  totalVolume: string;
};

const InvoiceListHero = ({
  totalInvoices,
  pendingInvoices,
  paidInvoices,
  totalVolume,
}: InvoiceListHeroProps) => {
  return (
    <section
      data-invoice-hero
      className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#101828] px-6 py-7 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:px-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(127,86,217,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(105,65,198,0.16),transparent_30%)]" />

      <div className="relative z-10 flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#7F56D9]/20 bg-[#7F56D9]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#CBB5FF]">
            <Sparkles className="h-3.5 w-3.5" />
            Invoice workspace
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Manage billing-ready invoices with clarity
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-[#94A3B8] md:text-base">
              Track pending, paid, and overdue invoices from one high-signal workspace view.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[540px]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <FileText className="mb-3 h-5 w-5 text-[#CBB5FF]" />
            <p className="text-xs uppercase tracking-[0.16em] text-[#667085]">Total invoices</p>
            <p className="mt-2 text-2xl font-semibold text-white">{totalInvoices}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <ReceiptText className="mb-3 h-5 w-5 text-amber-300" />
            <p className="text-xs uppercase tracking-[0.16em] text-[#667085]">Pending</p>
            <p className="mt-2 text-2xl font-semibold text-white">{pendingInvoices}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <Wallet className="mb-3 h-5 w-5 text-emerald-300" />
            <p className="text-xs uppercase tracking-[0.16em] text-[#667085]">Paid + value</p>
            <p className="mt-2 text-xl font-semibold text-white">{paidInvoices}</p>
            <p className="mt-1 text-sm text-[#94A3B8]">{totalVolume}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvoiceListHero;
