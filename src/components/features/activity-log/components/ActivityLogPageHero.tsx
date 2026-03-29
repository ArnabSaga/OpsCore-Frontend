import { Activity, ShieldCheck, Users } from "lucide-react";

type ActivityLogPageHeroProps = {
  totalLogs: number;
  uniqueActors: number;
  filteredLogs: number;
};

const ActivityLogPageHero = ({
  totalLogs,
  uniqueActors,
  filteredLogs,
}: ActivityLogPageHeroProps) => {
  return (
    <section
      data-activity-log-hero
      className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#101828] px-6 py-7 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:px-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(127,86,217,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(105,65,198,0.16),transparent_30%)]" />

      <div className="relative z-10 flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#7F56D9]/20 bg-[#7F56D9]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#CBB5FF]">
            <ShieldCheck className="h-3.5 w-3.5" />
            Workspace audit trail
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Track what changed, who changed it, and when
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-[#94A3B8] md:text-base">
              Activity Logs provide a structured, read-only workspace audit history for owners and
              admins.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[560px]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <Activity className="mb-3 h-5 w-5 text-[#CBB5FF]" />
            <p className="text-xs uppercase tracking-[0.16em] text-[#667085]">Total logs</p>
            <p className="mt-2 text-2xl font-semibold text-white">{totalLogs}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <Users className="mb-3 h-5 w-5 text-sky-300" />
            <p className="text-xs uppercase tracking-[0.16em] text-[#667085]">Unique actors</p>
            <p className="mt-2 text-2xl font-semibold text-white">{uniqueActors}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <ShieldCheck className="mb-3 h-5 w-5 text-emerald-300" />
            <p className="text-xs uppercase tracking-[0.16em] text-[#667085]">Filtered view</p>
            <p className="mt-2 text-2xl font-semibold text-white">{filteredLogs}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivityLogPageHero;
