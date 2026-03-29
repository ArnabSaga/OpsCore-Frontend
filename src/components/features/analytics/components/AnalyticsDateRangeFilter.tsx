"use client";

type AnalyticsDateRangeFilterProps = {
  from: string;
  to: string;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
};

const AnalyticsDateRangeFilter = ({
  from,
  to,
  onFromChange,
  onToChange,
}: AnalyticsDateRangeFilterProps) => {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <input
        type="date"
        value={from}
        onChange={(e) => onFromChange(e.target.value)}
        className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7F56D9]"
      />

      <input
        type="date"
        value={to}
        onChange={(e) => onToChange(e.target.value)}
        className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7F56D9]"
      />
    </div>
  );
};

export default AnalyticsDateRangeFilter;
