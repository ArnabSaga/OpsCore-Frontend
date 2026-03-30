import { z } from "zod";

export const notificationStatusEnum = z.enum(["UNREAD", "READ", "ARCHIVED"]);
export const notificationChannelEnum = z.enum(["IN_APP", "EMAIL"]);
export const notificationEntityTypeEnum = z.enum([
  "WORKSPACE",
  "PROJECT",
  "TASK",
  "INVOICE",
  "INVITATION",
  "SYSTEM",
]);
export const notificationTypeEnum = z.enum([
  "INVITATION_RECEIVED",
  "INVITATION_ACCEPTED",
  "INVITATION_DECLINED",
  "WORKSPACE_MEMBER_ROLE_CHANGED",
  "PROJECT_MEMBER_ADDED",
  "PROJECT_ARCHIVED",
  "TASK_ASSIGNED",
  "TASK_UPDATED",
  "TASK_STATUS_CHANGED",
  "TASK_COMMENT_ADDED",
  "TASK_DUE_SOON",
  "TASK_OVERDUE",
  "INVOICE_CREATED",
  "INVOICE_SENT",
  "INVOICE_PAID",
  "INVOICE_OVERDUE",
  "SYSTEM_ANNOUNCEMENT",
]);

export const notificationListFilterSchema = z.object({
  status: notificationStatusEnum.optional(),
  channel: notificationChannelEnum.optional(),
  entityType: notificationEntityTypeEnum.optional(),
  type: notificationTypeEnum.optional(),
  searchTerm: z.string().trim().optional(),
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
  sortBy: z.enum(["createdAt", "readAt"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export const updateNotificationPreferencesSchema = z
  .object({
    inAppEnabled: z.boolean().optional(),
    emailEnabled: z.boolean().optional(),
    taskAssigned: z.boolean().optional(),
    taskStatusChanged: z.boolean().optional(),
    taskCommentAdded: z.boolean().optional(),
    taskDueSoon: z.boolean().optional(),
    taskOverdue: z.boolean().optional(),
    invitationReceived: z.boolean().optional(),
    invitationAccepted: z.boolean().optional(),
    invoiceSent: z.boolean().optional(),
    invoicePaid: z.boolean().optional(),
    invoiceOverdue: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one preference field must be provided",
  });

export const markAllNotificationsReadSchema = z.object({
  type: notificationTypeEnum.optional(),
  entityType: notificationEntityTypeEnum.optional(),
  onlyUnread: z.boolean().optional(),
});

export type NotificationListFilterValues = z.infer<typeof notificationListFilterSchema>;
export type UpdateNotificationPreferencesValues = z.infer<
  typeof updateNotificationPreferencesSchema
>;
export type MarkAllNotificationsReadValues = z.infer<typeof markAllNotificationsReadSchema>;
