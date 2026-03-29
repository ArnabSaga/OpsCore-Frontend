import type { AnalyticsRange } from "@/components/features/analytics/types/analytics.types";

type ProjectsAnalyticsRangeInfoProps = {
  range: AnalyticsRange;
};

const formatRangeDate = (value: string | null) => {
  if (!value) return "Not set";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
};

const ProjectsAnalyticsRangeInfo = ({ range }: ProjectsAnalyticsRangeInfoProps) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#94A3B8]">
      Showing project analytics from{" "}
      <span className="font-medium text-white">{formatRangeDate(range.from)}</span> to{" "}
      <span className="font-medium text-white">{formatRangeDate(range.to)}</span>.
    </div>
  );
};

export default ProjectsAnalyticsRangeInfo;
