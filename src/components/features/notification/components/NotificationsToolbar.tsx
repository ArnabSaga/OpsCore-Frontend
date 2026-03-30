"use client";

import { RotateCcw } from "lucide-react";

import NotificationsFilters from "@/components/features/notification/components/NotificationsFilters";
import type {
  NotificationEntityType,
  NotificationStatus,
  NotificationType,
} from "@/components/features/notification/types/notification.types";
import { Button } from "@/components/ui/button";

type Props = {
  status?: NotificationStatus;
  entityType?: NotificationEntityType;
  type?: NotificationType;
  searchTerm: string;
  onStatusChange: (value?: NotificationStatus) => void;
  onEntityTypeChange: (value?: NotificationEntityType) => void;
  onTypeChange: (value?: NotificationType) => void;
  onSearchTermChange: (value: string) => void;
  onReset: () => void;
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
  onReset,
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

      <div className="mt-4 flex justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onReset}
          className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset filters
        </Button>
      </div>
    </section>
  );
};

export default NotificationsToolbar;
