import Link from "next/link";

import ActivityLogActionBadge from "@/components/features/activity-log/components/ActivityLogActionBadge";
import ActivityLogEntityBadge from "@/components/features/activity-log/components/ActivityLogEntityBadge";
import type { ActivityLogItem } from "@/components/features/activity-log/types/activity-log.types";
import { Button } from "@/components/ui/button";

type ActivityLogTableProps = {
  logs: ActivityLogItem[];
};

const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));

const ActivityLogTable = ({ logs }: ActivityLogTableProps) => {
  return (
    <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#101828]/85 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-[#94A3B8]">
          <thead className="bg-white/5 text-xs uppercase tracking-[0.14em] text-[#667085]">
            <tr>
              <th className="px-5 py-4">Actor</th>
              <th className="px-5 py-4">Action</th>
              <th className="px-5 py-4">Entity</th>
              <th className="px-5 py-4">Entity ID</th>
              <th className="px-5 py-4">Created</th>
              <th className="px-5 py-4 text-right">Details</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-t border-white/10">
                <td className="px-5 py-4">
                  <div className="font-medium text-white">{log.user.name}</div>
                  <div className="mt-1 text-xs text-[#667085]">{log.user.email}</div>
                </td>

                <td className="px-5 py-4">
                  <ActivityLogActionBadge action={log.action} />
                </td>

                <td className="px-5 py-4">
                  <ActivityLogEntityBadge entityType={log.entityType} />
                </td>

                <td className="px-5 py-4 text-white">{log.entityId || "—"}</td>

                <td className="px-5 py-4">{formatDateTime(log.createdAt)}</td>

                <td className="px-5 py-4">
                  <div className="flex justify-end">
                    <Button
                      asChild
                      variant="outline"
                      className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
                    >
                      <Link href={`/activity-logs/${log.id}`}>Open</Link>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityLogTable;
