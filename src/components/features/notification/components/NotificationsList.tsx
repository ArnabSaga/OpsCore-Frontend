import NotificationCard from "@/components/features/notification/components/NotificationCard";
import type { NotificationItem } from "@/components/features/notification/types/notification.types";

type Props = {
  notifications: NotificationItem[];
  onMarkRead: (id: string) => void;
  onMarkUnread: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
};

const NotificationsList = ({
  notifications,
  onMarkRead,
  onMarkUnread,
  onArchive,
  onDelete,
}: Props) => {
  return (
    <div className="grid gap-4">
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onMarkRead={onMarkRead}
          onMarkUnread={onMarkUnread}
          onArchive={onArchive}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default NotificationsList;
