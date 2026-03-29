import type { ReactNode } from "react";

type AnalyticsStatCardProps = {
  label: string;
  value: string | number;
  icon?: ReactNode;
  hint?: string;
};

const AnalyticsStatCard = ({ label, value, icon, hint }: AnalyticsStatCardProps) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      {icon ? <div className="mb-3 text-[#CBB5FF]">{icon}</div> : null}
      <p className="text-xs uppercase tracking-[0.16em] text-[#667085]">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
      {hint ? <p className="mt-2 text-sm text-[#94A3B8]">{hint}</p> : null}
    </div>
  );
};

export default AnalyticsStatCard;
