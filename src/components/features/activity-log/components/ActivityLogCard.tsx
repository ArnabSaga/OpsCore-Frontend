import { ArrowUpRight, Clock3, Hash, UserCircle2 } from "lucide-react";
import Link from "next/link";

import ActivityLogActionBadge from "@/components/features/activity-log/components/ActivityLogActionBadge";
import ActivityLogEntityBadge from "@/components/features/activity-log/components/ActivityLogEntityBadge";
import type { ActivityLogItem } from "@/components/features/activity-log/types/activity-log.types";
import { Button } from "@/components/ui/button";

type ActivityLogCardProps = {
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

const ActivityLogCard = ({ log }: ActivityLogCardProps) => {
  return (
    <article
      data-activity-log-card
      className="rounded-[24px] border border-white/10 bg-[#101828]/85 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl"
    >
      <div className="flex flex-wrap items-center gap-2">
        <ActivityLogActionBadge action={log.action} />
        <ActivityLogEntityBadge entityType={log.entityType} />
      </div>

      <div className="mt-5 space-y-3 text-sm text-[#94A3B8]">
        <div className="flex items-center gap-2">
          <UserCircle2 className="h-4 w-4 text-[#CBB5FF]" />
          <span>{log.user.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <Hash className="h-4 w-4 text-[#CBB5FF]" />
          <span>{log.entityId || "No entity id"}</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock3 className="h-4 w-4 text-[#CBB5FF]" />
          <span>{formatDateTime(log.createdAt)}</span>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button asChild className="rounded-xl bg-[#7F56D9] text-white hover:bg-[#6941C6]">
          <Link href={`/activity-logs/${log.id}`}>
            View details
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </article>
  );
};

export default ActivityLogCard;
