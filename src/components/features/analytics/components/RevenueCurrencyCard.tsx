import type { RevenueTotalsByCurrency } from "@/components/features/analytics/types/analytics.types";

type RevenueCurrencyCardProps = {
  item: RevenueTotalsByCurrency;
};

const RevenueCurrencyCard = ({ item }: RevenueCurrencyCardProps) => {
  return (
    <article className="rounded-[24px] border border-white/10 bg-[#101828]/85 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-white">{item.currency}</h3>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#CBB5FF]">
          {item.invoiceCount} invoices
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-[#94A3B8]">
          <p>Issued</p>
          <p className="mt-1 text-lg font-semibold text-white">{item.issuedAmount}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-[#94A3B8]">
          <p>Collected</p>
          <p className="mt-1 text-lg font-semibold text-white">{item.collectedAmount}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-[#94A3B8]">
          <p>Outstanding</p>
          <p className="mt-1 text-lg font-semibold text-white">{item.outstandingAmount}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-[#94A3B8]">
          <p>Overdue</p>
          <p className="mt-1 text-lg font-semibold text-white">{item.overdueAmount}</p>
        </div>
      </div>
    </article>
  );
};

export default RevenueCurrencyCard;
