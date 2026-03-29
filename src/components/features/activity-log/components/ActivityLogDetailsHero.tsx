import { ArrowLeft, ScrollText } from "lucide-react";
import Link from "next/link";

import ActivityLogActionBadge from "@/components/features/activity-log/components/ActivityLogActionBadge";
import ActivityLogEntityBadge from "@/components/features/activity-log/components/ActivityLogEntityBadge";
import type { ActivityLogItem } from "@/components/features/activity-log/types/activity-log.types";
import { Button } from "@/components/ui/button";

type ActivityLogDetailsHeroProps = {
  log: ActivityLogItem;
};

const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));

const ActivityLogDetailsHero = ({ log }: ActivityLogDetailsHeroProps) => {
  return (
    <section
      data-activity-log-details-hero
      className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#101828] px-6 py-7 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:px-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(127,86,217,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(105,65,198,0.16),transparent_30%)]" />

      <div className="relative z-10 flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#7F56D9]/20 bg-[#7F56D9]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#CBB5FF]">
            <ScrollText className="h-3.5 w-3.5" />
            Activity log details
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Audit event snapshot
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-[#94A3B8] md:text-base">
              Review the actor, action, entity, and metadata captured for this workspace event.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <ActivityLogActionBadge action={log.action} />
            <ActivityLogEntityBadge entityType={log.entityType} />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:w-[360px]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-[#667085]">Created at</p>
            <p className="mt-2 text-base font-semibold text-white">
              {formatDateTime(log.createdAt)}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              asChild
              variant="outline"
              className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              <Link href="/activity-logs">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to logs
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivityLogDetailsHero;
