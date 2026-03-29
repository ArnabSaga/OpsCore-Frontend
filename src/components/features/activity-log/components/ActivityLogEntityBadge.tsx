import { cn } from "@/lib/utils";

type ActivityLogEntityBadgeProps = {
  entityType: string;
};

const ActivityLogEntityBadge = ({ entityType }: ActivityLogEntityBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#94A3B8]"
      )}
    >
      {entityType.replaceAll("_", " ")}
    </span>
  );
};

export default ActivityLogEntityBadge;
