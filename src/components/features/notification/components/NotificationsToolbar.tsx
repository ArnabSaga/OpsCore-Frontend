"use client";

import { RotateCcw } from "lucide-react";

import NotificationsFilters from "@/components/features/notification/components/NotificationsFilters";
import type {
  NotificationEntityType,
  NotificationStatus,
  NotificationType,
} from "@/components/features/notification/types/notification.types";
import { useTriggerDemoNotification } from "@/components/features/notification/hooks/useNotificationMutations";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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
  const { mutate: triggerDemo, isPending: isTriggering } = useTriggerDemoNotification();

  const handleSendTest = () => {
    triggerDemo(undefined, {
      onSuccess: () => toast.success("Test notification sent!"),
      onError: () => toast.error("Failed to send test notification."),
    });
  };
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

      <div className="mt-4 flex items-center justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          disabled={isTriggering}
          onClick={handleSendTest}
          className="rounded-xl border-[#7F56D9]/30 bg-[#7F56D9]/10 text-[#CBB5FF] hover:bg-[#7F56D9]/20"
        >
          {isTriggering ? "Sending..." : "Send Test"}
        </Button>

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
