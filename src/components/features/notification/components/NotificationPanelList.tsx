import NotificationPanelEmptyState from "@/components/features/notification/components/NotificationPanelEmptyState";
import NotificationPanelItem from "@/components/features/notification/components/NotificationPanelItem";
import type { NotificationItem } from "@/components/features/notification/types/notification.types";

type Props = {
  notifications: NotificationItem[];
  onMarkRead: (id: string) => void;
};

const NotificationPanelList = ({ notifications, onMarkRead }: Props) => {
  if (notifications.length === 0) {
    return <NotificationPanelEmptyState />;
  }

  return (
    <div className="space-y-3">
      {notifications.map((item) => (
        <NotificationPanelItem key={item.id} item={item} onMarkRead={onMarkRead} />
      ))}
    </div>
  );
};

export default NotificationPanelList;
