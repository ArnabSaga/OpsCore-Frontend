import type { NotificationType } from "@/components/features/notification/types/notification.types";

type Props = { type: NotificationType };

const NotificationTypeBadge = ({ type }: Props) => {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#CBB5FF]">
      {type.replaceAll("_", " ")}
    </span>
  );
};

export default NotificationTypeBadge;
