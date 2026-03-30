"use client";

import { useMemo } from "react";

import NotificationPanelHeader from "@/components/features/notification/components/NotificationPanelHeader";
import NotificationPanelList from "@/components/features/notification/components/NotificationPanelList";
import {
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
} from "@/components/features/notification/hooks/useNotificationMutations";
import { useNotifications } from "@/components/features/notification/hooks/useNotifications";
import { useUnreadNotificationSummary } from "@/components/features/notification/hooks/useUnreadNotificationSummary";
import { Sheet, SheetContent } from "@/components/ui/sheet";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const NotificationPanel = ({ open, onOpenChange }: Props) => {
  const { data } = useNotifications({
    params: { limit: 5, page: 1, sortBy: "createdAt", sortOrder: "desc" },
    enabled: open,
  });
  const { data: summary } = useUnreadNotificationSummary({ enabled: open });

  const { mutate: markRead } = useMarkNotificationRead();
  const { mutate: markAllRead } = useMarkAllNotificationsRead();

  const notifications = useMemo(() => data?.data ?? [], [data?.data]);
  const unreadCount = summary?.data?.totalUnread ?? 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full border-white/10 bg-[#0C111D] px-0 text-white sm:max-w-[480px]"
      >
        <div className="flex h-full flex-col px-6 py-6">
          <NotificationPanelHeader
            unreadCount={unreadCount}
            onMarkAllRead={() => markAllRead({ onlyUnread: true })}
          />

          <div className="mt-5 flex-1 overflow-y-auto">
            <NotificationPanelList
              notifications={notifications}
              onMarkRead={(id) => markRead(id)}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationPanel;
