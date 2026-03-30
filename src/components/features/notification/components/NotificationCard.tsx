"use client";

import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

import NotificationActionMenu from "@/components/features/notification/components/NotificationActionMenu";
import NotificationEntityBadge from "@/components/features/notification/components/NotificationEntityBadge";
import NotificationStatusBadge from "@/components/features/notification/components/NotificationStatusBadge";
import NotificationTypeBadge from "@/components/features/notification/components/NotificationTypeBadge";
import type { NotificationItem } from "@/components/features/notification/types/notification.types";

type Props = {
  notification: NotificationItem;
  onMarkRead: (id: string) => void;
  onMarkUnread: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
};

const NotificationCard = ({
  notification,
  onMarkRead,
  onMarkUnread,
  onArchive,
  onDelete,
}: Props) => {
  const href = notification.actionUrl || `/notifications`;

  return (
    <article className="rounded-[24px] border border-white/10 bg-[#101828]/85 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <NotificationStatusBadge status={notification.status} />
            <NotificationTypeBadge type={notification.type} />
            <NotificationEntityBadge entityType={notification.entityType} />
          </div>

          <Link href={href} className="mt-4 block">
            <h3 className="text-base font-semibold text-white">{notification.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[#94A3B8]">{notification.message}</p>
          </Link>

          <p className="mt-4 text-xs text-[#667085]">
            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
          </p>
        </div>

        <NotificationActionMenu
          isUnread={notification.status === "UNREAD"}
          onMarkRead={() => onMarkRead(notification.id)}
          onMarkUnread={() => onMarkUnread(notification.id)}
          onArchive={() => onArchive(notification.id)}
          onDelete={() => onDelete(notification.id)}
        />
      </div>
    </article>
  );
};

export default NotificationCard;
