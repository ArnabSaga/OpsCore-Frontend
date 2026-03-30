import { API_ENDPOINTS } from "@/config/api-endpoints";
import { apiFetch } from "@/lib/fetcher";

import type {
  MarkAllNotificationsReadPayload,
  NotificationDetailsResponse,
  NotificationListParams,
  NotificationMutationResponse,
  NotificationPreferencesResponse,
  NotificationUnreadSummaryResponse,
  NotificationsResponse,
  NotificationBulkReadResponse,
  UpdateNotificationPreferencesPayload,
} from "@/components/features/notification/types/notification.types";

const buildNotificationQuery = (params?: NotificationListParams) => {
  const searchParams = new URLSearchParams();

  if (params?.status) searchParams.set("status", params.status);
  if (params?.channel) searchParams.set("channel", params.channel);
  if (params?.entityType) searchParams.set("entityType", params.entityType);
  if (params?.type) searchParams.set("type", params.type);
  if (params?.searchTerm) searchParams.set("searchTerm", params.searchTerm);
  if (typeof params?.page === "number") searchParams.set("page", String(params.page));
  if (typeof params?.limit === "number") searchParams.set("limit", String(params.limit));
  if (params?.sortBy) searchParams.set("sortBy", params.sortBy);
  if (params?.sortOrder) searchParams.set("sortOrder", params.sortOrder);

  return searchParams.toString();
};

export const getNotifications = async (
  workspaceId: string,
  params?: NotificationListParams
): Promise<NotificationsResponse> => {
  const query = buildNotificationQuery(params);

  const response = await apiFetch<NotificationsResponse>({
    endpoint: `${API_ENDPOINTS.notification.list}${query ? `?${query}` : ""}`,
    method: "GET",
    workspaceId,
  });

  return {
    ...response,
    data: response.data ?? [],
    meta: response.meta ?? {
      page: params?.page ?? 1,
      limit: params?.limit ?? 10,
      total: Array.isArray(response.data) ? response.data.length : 0,
      totalPages: 1,
    },
  };
};

export const getUnreadNotificationSummary = async (
  workspaceId: string
): Promise<NotificationUnreadSummaryResponse> => {
  return apiFetch<NotificationUnreadSummaryResponse>({
    endpoint: API_ENDPOINTS.notification.unreadSummary,
    method: "GET",
    workspaceId,
  });
};

export const getNotificationById = async (
  workspaceId: string,
  notificationId: string
): Promise<NotificationDetailsResponse> => {
  return apiFetch<NotificationDetailsResponse>({
    endpoint: API_ENDPOINTS.notification.details(notificationId),
    method: "GET",
    workspaceId,
  });
};

export const markNotificationAsRead = async (
  workspaceId: string,
  notificationId: string
): Promise<NotificationMutationResponse> => {
  return apiFetch<NotificationMutationResponse>({
    endpoint: API_ENDPOINTS.notification.markRead(notificationId),
    method: "PATCH",
    workspaceId,
  });
};

export const markNotificationAsUnread = async (
  workspaceId: string,
  notificationId: string
): Promise<NotificationMutationResponse> => {
  return apiFetch<NotificationMutationResponse>({
    endpoint: API_ENDPOINTS.notification.markUnread(notificationId),
    method: "PATCH",
    workspaceId,
  });
};

export const markAllNotificationsAsRead = async (
  workspaceId: string,
  payload?: MarkAllNotificationsReadPayload
): Promise<NotificationBulkReadResponse> => {
  return apiFetch<NotificationBulkReadResponse>({
    endpoint: API_ENDPOINTS.notification.markAllRead,
    method: "PATCH",
    workspaceId,
    body: payload,
  });
};

export const archiveNotification = async (
  workspaceId: string,
  notificationId: string
): Promise<NotificationMutationResponse> => {
  return apiFetch<NotificationMutationResponse>({
    endpoint: API_ENDPOINTS.notification.archive(notificationId),
    method: "PATCH",
    workspaceId,
  });
};

export const deleteNotification = async (
  workspaceId: string,
  notificationId: string
): Promise<void> => {
  await apiFetch({
    endpoint: API_ENDPOINTS.notification.delete(notificationId),
    method: "DELETE",
    workspaceId,
  });
};

export const getNotificationPreferences = async (
  workspaceId: string
): Promise<NotificationPreferencesResponse> => {
  return apiFetch<NotificationPreferencesResponse>({
    endpoint: API_ENDPOINTS.notification.preferences,
    method: "GET",
    workspaceId,
  });
};

export const updateNotificationPreferences = async (
  workspaceId: string,
  payload: UpdateNotificationPreferencesPayload
): Promise<NotificationPreferencesResponse> => {
  return apiFetch<NotificationPreferencesResponse>({
    endpoint: API_ENDPOINTS.notification.preferences,
    method: "PATCH",
    workspaceId,
    body: payload,
  });
};
