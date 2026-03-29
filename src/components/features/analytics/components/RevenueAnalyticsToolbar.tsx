"use client";

import { RotateCcw } from "lucide-react";

import AnalyticsDateRangeFilter from "@/components/features/analytics/components/AnalyticsDateRangeFilter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type RevenueAnalyticsToolbarProps = {
  from: string;
  to: string;
  currency: string;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
  onCurrencyChange: (value: string) => void;
  onReset: () => void;
};

const RevenueAnalyticsToolbar = ({
  from,
  to,
  currency,
  onFromChange,
  onToChange,
  onCurrencyChange,
  onReset,
}: RevenueAnalyticsToolbarProps) => {
  return (
    <section
      data-revenue-analytics-toolbar
      className="rounded-[24px] border border-white/10 bg-[#101828]/80 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl"
    >
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_220px_auto] xl:items-end">
        <AnalyticsDateRangeFilter
          from={from}
          to={to}
          onFromChange={onFromChange}
          onToChange={onToChange}
        />

        <Input
          value={currency}
          onChange={(e) => onCurrencyChange(e.target.value)}
          className="h-11 rounded-xl border-white/10 bg-white/5 text-white"
          placeholder="Currency (USD)"
        />

        <Button
          type="button"
          variant="outline"
          onClick={onReset}
          className="h-11 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>
    </section>
  );
};

export default RevenueAnalyticsToolbar;
