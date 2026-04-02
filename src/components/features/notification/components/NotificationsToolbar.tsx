"use client";

import NotificationsFilters from "@/components/features/notification/components/NotificationsFilters";
import type {
  NotificationEntityType,
  NotificationStatus,
  NotificationType,
} from "@/components/features/notification/types/notification.types";

type Props = {
  status?: NotificationStatus;
  entityType?: NotificationEntityType;
  type?: NotificationType;
  searchTerm: string;
  onStatusChange: (value?: NotificationStatus) => void;
  onEntityTypeChange: (value?: NotificationEntityType) => void;
  onTypeChange: (value?: NotificationType) => void;
  onSearchTermChange: (value: string) => void;
};

const NotificationsToolbar = ({
  status,
  entityType,
  type,
  searchTerm,
  onStatusChange,
  onEntityTypeChange,
  onTypeChange,
  onSearchTermChange,
}: Props) => {
  return (
    <section
      data-notifications-toolbar
      className="rounded-[24px] border border-white/10 bg-[#101828]/80 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl"
    >
      <NotificationsFilters
        status={status}
        entityType={entityType}
        type={type}
        searchTerm={searchTerm}
        onStatusChange={onStatusChange}
        onEntityTypeChange={onEntityTypeChange}
        onTypeChange={onTypeChange}
        onSearchTermChange={onSearchTermChange}
      />
    </section>
  );
};

export default NotificationsToolbar;
