import type { NotificationEntityType } from "@/components/features/notification/types/notification.types";

type Props = { entityType?: NotificationEntityType | null };

const NotificationEntityBadge = ({ entityType }: Props) => {
  if (!entityType) return null;

  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#94A3B8]">
      {entityType}
    </span>
  );
};

export default NotificationEntityBadge;
