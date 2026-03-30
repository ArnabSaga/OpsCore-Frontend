"use client";

import NotificationBadge from "@/components/features/notification/components/NotificationBadge";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

type Props = {
  unreadCount: number;
  onClick: () => void;
};

const NotificationBellButton = ({ unreadCount, onClick }: Props) => {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="relative rounded-2xl border border-white/10 bg-white/5 text-white hover:bg-white/10"
    >
      <Bell className="h-5 w-5" />
      <NotificationBadge count={unreadCount} />
    </Button>
  );
};

export default NotificationBellButton;
