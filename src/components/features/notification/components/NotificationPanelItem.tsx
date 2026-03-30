"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

import type { NotificationItem } from "@/components/features/notification/types/notification.types";
import NotificationActionMenu from "@/components/features/notification/components/NotificationActionMenu";

type Props = {
  item: NotificationItem;
  onMarkRead: (id: string) => void;
};

const NotificationPanelItem = ({ item, onMarkRead }: Props) => {
  const href = item.actionUrl || "/notifications";

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-start justify-between gap-3">
        <Link
          href={href}
          onClick={() => item.status === "UNREAD" && onMarkRead(item.id)}
          className="min-w-0 flex-1"
        >
          <div className="flex items-center gap-2">
            {item.status === "UNREAD" ? (
              <span className="h-2.5 w-2.5 rounded-full bg-[#7F56D9]" />
            ) : (
              <span className="h-2.5 w-2.5 rounded-full bg-transparent" />
            )}
            <p className="truncate text-sm font-semibold text-white">{item.title}</p>
          </div>

          <p className="mt-2 line-clamp-2 text-sm text-[#94A3B8]">{item.message}</p>
          <p className="mt-3 text-xs text-[#667085]">
            {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
          </p>
        </Link>

        <NotificationActionMenu
          isUnread={item.status === "UNREAD"}
          onMarkRead={() => onMarkRead(item.id)}
        />
      </div>
    </div>
  );
};

export default NotificationPanelItem;
