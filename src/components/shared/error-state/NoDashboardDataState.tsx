"use client";

import { BarChart3 } from "lucide-react";

const NoDashboardDataState = () => {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#1D2939]/80 p-8 text-center shadow-[0_10px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#7F56D9]/10">
        <BarChart3 className="h-7 w-7 text-[#CBB5FF]" />
      </div>

      <h2 className="mt-5 text-2xl font-semibold text-white">No dashboard data yet</h2>
      <p className="mt-3 text-sm leading-6 text-[#94A3B8]">
        Once your workspace starts receiving projects, tasks, invoices, and activity, your dashboard
        metrics will appear here.
      </p>
    </div>
  );
};

export default NoDashboardDataState;
