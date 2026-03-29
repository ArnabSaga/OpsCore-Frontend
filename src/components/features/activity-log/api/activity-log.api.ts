import { API_ENDPOINTS } from "@/config/api-endpoints";
import { apiFetch } from "@/lib/fetcher";
import type { ApiResponse } from "@/types/api.types";

import type {
  ActivityLogItem,
  GetActivityLogsParams,
  PaginatedActivityLogsResponse,
} from "@/components/features/activity-log/types/activity-log.types";

const buildActivityLogsQuery = (params?: GetActivityLogsParams) => {
  const searchParams = new URLSearchParams();

  if (typeof params?.page === "number") {
    searchParams.set("page", String(params.page));
  }

  if (typeof params?.limit === "number") {
    searchParams.set("limit", String(params.limit));
  }

  if (params?.action) {
    searchParams.set("action", params.action);
  }

  if (params?.entityType) {
    searchParams.set("entityType", params.entityType);
  }

  if (params?.userId) {
    searchParams.set("userId", params.userId);
  }

  if (params?.from) {
    searchParams.set("from", params.from);
  }

  if (params?.to) {
    searchParams.set("to", params.to);
  }

  return searchParams.toString();
};

export const getActivityLogs = async (
  workspaceId: string,
  params?: GetActivityLogsParams
): Promise<PaginatedActivityLogsResponse> => {
  const query = buildActivityLogsQuery(params);

  const response = await apiFetch<PaginatedActivityLogsResponse>({
    endpoint: `${API_ENDPOINTS.activityLog.list}${query ? `?${query}` : ""}`,
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

export const getActivityLogById = async (
  workspaceId: string,
  logId: string
): Promise<ActivityLogItem> => {
  const response = await apiFetch<ApiResponse<ActivityLogItem>>({
    endpoint: API_ENDPOINTS.activityLog.details(logId),
    method: "GET",
    workspaceId,
  });

  return response.data;
};
