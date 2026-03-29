import ActivityLogMetadataViewer from "@/components/features/activity-log/components/ActivityLogMetadataViewer";
import type { ActivityLogItem } from "@/components/features/activity-log/types/activity-log.types";
import { Card, CardContent } from "@/components/ui/card";

type ActivityLogMetadataCardProps = {
  log: ActivityLogItem;
};

const ActivityLogMetadataCard = ({ log }: ActivityLogMetadataCardProps) => {
  return (
    <Card className="rounded-[24px] border border-white/10 bg-[#101828]/85 text-white shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-white">Metadata snapshot</h3>
        <p className="mt-1 text-sm text-[#94A3B8]">
          Backend-sanitized metadata for this activity record.
        </p>

        <div className="mt-5">
          <ActivityLogMetadataViewer metadata={log.metadata} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityLogMetadataCard;
