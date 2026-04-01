import type { ApiResponse } from "@/types/api.types";

export type NotificationStatus = "UNREAD" | "READ" | "ARCHIVED";
export type NotificationChannel = "IN_APP" | "EMAIL";
export type NotificationEntityType =
  | "WORKSPACE"
  | "PROJECT"
  | "TASK"
  | "INVOICE"
  | "INVITATION"
  | "SYSTEM";

export type NotificationType =
  | "INVITATION_RECEIVED"
  | "INVITATION_ACCEPTED"
  | "INVITATION_DECLINED"
  | "WORKSPACE_MEMBER_ROLE_CHANGED"
  | "PROJECT_MEMBER_ADDED"
  | "PROJECT_ARCHIVED"
  | "TASK_ASSIGNED"
  | "TASK_UPDATED"
  | "TASK_STATUS_CHANGED"
  | "TASK_COMMENT_ADDED"
  | "TASK_DUE_SOON"
  | "TASK_OVERDUE"
  | "INVOICE_CREATED"
  | "INVOICE_SENT"
  | "INVOICE_PAID"
  | "INVOICE_OVERDUE"
  | "SYSTEM_ANNOUNCEMENT";

export type NotificationItem = {
  id: string;
  workspaceId: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  status: NotificationStatus;
  channel: NotificationChannel;
  entityType?: NotificationEntityType | null;
  entityId?: string | null;
  actionUrl?: string | null;
  metadata?: Record<string, unknown> | null;
  readAt?: string | null;
  archivedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
};

export type NotificationUnreadSummary = {
  totalUnread: number;
  totalArchived: number;
  totalActive: number;
  byType: Array<{
    type: NotificationType;
    count: number;
  }>;
};

export type NotificationPreferences = {
  id: string;
  workspaceId: string;
  userId: string;
  inAppEnabled: boolean;
  emailEnabled: boolean;
  taskAssigned: boolean;
  taskStatusChanged: boolean;
  taskCommentAdded: boolean;
  taskDueSoon: boolean;
  taskOverdue: boolean;
  invitationReceived: boolean;
  invitationAccepted: boolean;
  invoiceSent: boolean;
  invoicePaid: boolean;
  invoiceOverdue: boolean;
  createdAt: string;
  updatedAt: string;
};

export type NotificationListParams = {
  status?: NotificationStatus;
  channel?: NotificationChannel;
  entityType?: NotificationEntityType;
  type?: NotificationType;
  searchTerm?: string;
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "readAt";
  sortOrder?: "asc" | "desc";
};

export type MarkAllNotificationsReadPayload = {
  type?: NotificationType;
  entityType?: NotificationEntityType;
  onlyUnread?: boolean;
};

export type UpdateNotificationPreferencesPayload = {
  inAppEnabled?: boolean;
  emailEnabled?: boolean;
  taskAssigned?: boolean;
  taskStatusChanged?: boolean;
  taskCommentAdded?: boolean;
  taskDueSoon?: boolean;
  taskOverdue?: boolean;
  invitationReceived?: boolean;
  invitationAccepted?: boolean;
  invoiceSent?: boolean;
  invoicePaid?: boolean;
  invoiceOverdue?: boolean;
};

export type NotificationsResponse = ApiResponse<NotificationItem[]>;
export type NotificationDetailsResponse = ApiResponse<NotificationItem>;
export type NotificationUnreadSummaryResponse = ApiResponse<NotificationUnreadSummary>;
export type NotificationPreferencesResponse = ApiResponse<NotificationPreferences>;
export type NotificationMutationResponse = ApiResponse<NotificationItem>;
export type NotificationBulkReadResponse = ApiResponse<{
  count: number;
}>;
