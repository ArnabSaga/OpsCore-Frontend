import type { TopProjectAnalyticsItem } from "@/components/features/analytics/types/analytics.types";

type TopProjectCardProps = {
  project: TopProjectAnalyticsItem;
};

const TopProjectCard = ({ project }: TopProjectCardProps) => {
  return (
    <article className="rounded-[24px] border border-white/10 bg-[#101828]/85 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{project.name}</h3>
          <p className="mt-1 text-sm text-[#94A3B8]">{project.status}</p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#CBB5FF]">
          {project.membersCount} members
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-[#94A3B8]">
          <p>Total tasks</p>
          <p className="mt-1 text-lg font-semibold text-white">{project.tasks.total}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-[#94A3B8]">
          <p>Completion</p>
          <p className="mt-1 text-lg font-semibold text-white">
            {project.tasks.completionRate.toFixed(1)}%
          </p>
        </div>
      </div>
    </article>
  );
};

export default TopProjectCard;
