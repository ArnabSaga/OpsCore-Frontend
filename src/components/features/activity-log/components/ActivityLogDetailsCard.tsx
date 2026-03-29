import { CalendarClock, Hash, Layers3 } from "lucide-react";

import ActivityLogActionBadge from "@/components/features/activity-log/components/ActivityLogActionBadge";
import ActivityLogEntityBadge from "@/components/features/activity-log/components/ActivityLogEntityBadge";
import type { ActivityLogItem } from "@/components/features/activity-log/types/activity-log.types";
import { Card, CardContent } from "@/components/ui/card";

type ActivityLogDetailsCardProps = {
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

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-start justify-between gap-4 border-b border-white/10 py-3 last:border-b-0 last:pb-0">
    <span className="text-sm text-[#667085]">{label}</span>
    <span className="max-w-[60%] text-right text-sm font-medium text-white">{value}</span>
  </div>
);

const ActivityLogDetailsCard = ({ log }: ActivityLogDetailsCardProps) => {
  return (
    <Card className="rounded-[24px] border border-white/10 bg-[#1D2939]/80 text-white shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-white">Activity details</h2>
        <p className="mt-1 text-sm text-[#94A3B8]">Core audit information for this event.</p>

        <div className="mt-5 flex flex-wrap gap-2">
          <ActivityLogActionBadge action={log.action} />
          <ActivityLogEntityBadge entityType={log.entityType} />
        </div>

        <div className="mt-6 space-y-5">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <InfoRow label="Log ID" value={log.id} />
            <InfoRow label="Workspace ID" value={log.workspaceId} />
            <InfoRow label="User ID" value={log.userId} />
            <InfoRow label="Entity ID" value={log.entityId || "No entity id"} />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
                <CalendarClock className="h-4 w-4 text-[#CBB5FF]" />
                Created at
              </div>
              <p className="mt-3 text-base font-semibold text-white">
                {formatDateTime(log.createdAt)}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
                <Layers3 className="h-4 w-4 text-[#CBB5FF]" />
                Entity type
              </div>
              <p className="mt-3 text-base font-semibold text-white">{log.entityType}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
              <Hash className="h-4 w-4 text-[#CBB5FF]" />
              Action name
            </div>
            <p className="mt-3 text-base font-semibold text-white">{log.action}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityLogDetailsCard;
