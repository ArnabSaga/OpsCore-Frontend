import type { NotificationStatus } from "@/components/features/notification/types/notification.types";
import { cn } from "@/lib/utils";

type Props = { status: NotificationStatus };

const NotificationStatusBadge = ({ status }: Props) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]",
        status === "UNREAD" && "border-[#7F56D9]/20 bg-[#7F56D9]/10 text-[#CBB5FF]",
        status === "READ" && "border-sky-500/20 bg-sky-500/10 text-sky-200",
        status === "ARCHIVED" && "border-white/10 bg-white/5 text-[#94A3B8]"
      )}
    >
      {status}
    </span>
  );
};

export default NotificationStatusBadge;
