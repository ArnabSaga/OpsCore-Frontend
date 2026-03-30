"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const NotificationsFilters = ({
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
    <div className="grid gap-4 lg:grid-cols-4">
      <Input
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        placeholder="Search notifications"
        className="h-11 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-[#667085]"
      />

      <Select
        value={status ?? "ALL_STATUS"}
        onValueChange={(value) =>
          onStatusChange(value === "ALL_STATUS" ? undefined : (value as NotificationStatus))
        }
      >
        <SelectTrigger className="h-11 rounded-xl border-white/10 bg-white/5 px-4 text-white">
          <SelectValue placeholder="All statuses" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL_STATUS">All statuses</SelectItem>
          <SelectItem value="UNREAD">Unread</SelectItem>
          <SelectItem value="READ">Read</SelectItem>
          <SelectItem value="ARCHIVED">Archived</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={entityType ?? "ALL_ENTITIES"}
        onValueChange={(value) =>
          onEntityTypeChange(value === "ALL_ENTITIES" ? undefined : (value as NotificationEntityType))
        }
      >
        <SelectTrigger className="h-11 rounded-xl border-white/10 bg-white/5 px-4 text-white">
          <SelectValue placeholder="All entities" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL_ENTITIES">All entities</SelectItem>
          <SelectItem value="WORKSPACE">Workspace</SelectItem>
          <SelectItem value="PROJECT">Project</SelectItem>
          <SelectItem value="TASK">Task</SelectItem>
          <SelectItem value="INVOICE">Invoice</SelectItem>
          <SelectItem value="INVITATION">Invitation</SelectItem>
          <SelectItem value="SYSTEM">System</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={type ?? "ALL_TYPES"}
        onValueChange={(value) =>
          onTypeChange(value === "ALL_TYPES" ? undefined : (value as NotificationType))
        }
      >
        <SelectTrigger className="h-11 rounded-xl border-white/10 bg-white/5 px-4 text-white">
          <SelectValue placeholder="All types" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL_TYPES">All types</SelectItem>
          <SelectItem value="TASK_ASSIGNED">Task Assigned</SelectItem>
          <SelectItem value="TASK_STATUS_CHANGED">Task Status Changed</SelectItem>
          <SelectItem value="TASK_COMMENT_ADDED">Task Comment Added</SelectItem>
          <SelectItem value="TASK_DUE_SOON">Task Due Soon</SelectItem>
          <SelectItem value="TASK_OVERDUE">Task Overdue</SelectItem>
          <SelectItem value="INVITATION_RECEIVED">Invitation Received</SelectItem>
          <SelectItem value="INVITATION_ACCEPTED">Invitation Accepted</SelectItem>
          <SelectItem value="INVOICE_SENT">Invoice Sent</SelectItem>
          <SelectItem value="INVOICE_PAID">Invoice Paid</SelectItem>
          <SelectItem value="INVOICE_OVERDUE">Invoice Overdue</SelectItem>
          <SelectItem value="SYSTEM_ANNOUNCEMENT">System Announcement</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default NotificationsFilters;
