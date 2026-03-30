"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

type Props = {
  unreadCount: number;
  onMarkAllRead: () => void;
};

const NotificationPanelHeader = ({ unreadCount, onMarkAllRead }: Props) => {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
      <div>
        <h3 className="text-lg font-semibold text-white">Notifications</h3>
        <p className="text-sm text-[#94A3B8]">{unreadCount} unread</p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onMarkAllRead}
          className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
        >
          Mark all read
        </Button>

        <Button asChild className="rounded-xl bg-[#7F56D9] text-white hover:bg-[#6941C6]">
          <Link href="/notifications">Open</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotificationPanelHeader;
