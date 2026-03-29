import { BarChart3, Receipt, ShieldAlert, Sparkles, TrendingUp } from "lucide-react";
import type { PlatformInvoiceOverviewStats } from "@/components/features/invoice/types/invoice.types";

type PlatformInvoiceHeroProps = {
  stats: PlatformInvoiceOverviewStats;
};

const PlatformInvoiceHero = ({ stats }: PlatformInvoiceHeroProps) => {
  return (
    <section
      className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0B0B0B] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(127,86,217,0.15),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(105,65,198,0.12),transparent_35%)]" />
      
      <div className="relative z-10 flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-purple-300">
            <Sparkles className="h-3.5 w-3.5" />
            Platform Oversight
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Global Invoice Analysis
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-[#94A3B8] sm:text-base">
              Monitor billing trends, track cross-workspace revenue, and identify overdue activity 
              across the entire OpsCore ecosystem.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 xl:min-w-[720px]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/8 shadow-lg">
            <Receipt className="mb-4 h-5 w-5 text-purple-400" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#667085]">Total Count</p>
            <p className="mt-2 text-2xl font-bold text-white">{stats.totalInvoices.toLocaleString()}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/8 shadow-lg">
            <ShieldAlert className="mb-4 h-5 w-5 text-rose-400" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#667085]">Overdue</p>
            <p className="mt-2 text-2xl font-bold text-white">{stats.overdueInvoices.toLocaleString()}</p>
            <p className="mt-1 text-xs font-medium text-rose-400/80">{stats.overdueAmount}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/8 shadow-lg">
            <TrendingUp className="mb-4 h-5 w-5 text-emerald-400" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#667085]">Paid Volume</p>
            <p className="mt-2 text-2xl font-bold text-white">{stats.paidAmount}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/8 shadow-lg">
            <BarChart3 className="mb-4 h-5 w-5 text-sky-400" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#667085]">Pending</p>
            <p className="mt-2 text-2xl font-bold text-white">{stats.pendingAmount}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformInvoiceHero;
