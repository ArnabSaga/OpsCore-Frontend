import { ScrollText } from "lucide-react";

const ActivityLogEmptyState = () => {
  return (
    <div className="rounded-[24px] border border-dashed border-white/10 bg-[#101828]/80 px-6 py-16 text-center shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
        <ScrollText className="h-6 w-6 text-[#CBB5FF]" />
      </div>

      <h3 className="mt-5 text-xl font-semibold text-white">No activity logs found</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#94A3B8]">
        Try adjusting the filters or date range to reveal matching workspace activity.
      </p>
    </div>
  );
};

export default ActivityLogEmptyState;
