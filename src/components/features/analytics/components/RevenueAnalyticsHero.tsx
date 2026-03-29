import { BadgeDollarSign, BanknoteArrowUp, Wallet2 } from "lucide-react";

import AnalyticsStatCard from "@/components/features/analytics/components/AnalyticsStatCard";

type RevenueAnalyticsHeroProps = {
  totalInvoices: number;
  paidInvoices: number;
  overdueInvoices: number;
};

const RevenueAnalyticsHero = ({
  totalInvoices,
  paidInvoices,
  overdueInvoices,
}: RevenueAnalyticsHeroProps) => {
  return (
    <section
      data-revenue-analytics-hero
      className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#101828] px-6 py-7 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:px-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(127,86,217,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(105,65,198,0.16),transparent_30%)]" />

      <div className="relative z-10 flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#7F56D9]/20 bg-[#7F56D9]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#CBB5FF]">
            Revenue analytics
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Analyze invoice performance and collection momentum
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-[#94A3B8] md:text-base">
              Review invoice payment mix, currency totals, and monthly issued versus collected
              trends.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[560px]">
          <AnalyticsStatCard
            label="Total invoices"
            value={totalInvoices}
            icon={<BadgeDollarSign className="h-5 w-5" />}
          />
          <AnalyticsStatCard
            label="Paid invoices"
            value={paidInvoices}
            icon={<BanknoteArrowUp className="h-5 w-5" />}
          />
          <AnalyticsStatCard
            label="Overdue invoices"
            value={overdueInvoices}
            icon={<Wallet2 className="h-5 w-5" />}
          />
        </div>
      </div>
    </section>
  );
};

export default RevenueAnalyticsHero;
