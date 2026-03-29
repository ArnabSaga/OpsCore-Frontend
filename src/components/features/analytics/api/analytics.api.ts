import { API_ENDPOINTS } from "@/config/api-endpoints";
import { apiFetch } from "@/lib/fetcher";

import type {
  GetProjectsAnalyticsParams,
  GetRevenueAnalyticsParams,
  ProjectsAnalyticsResponse,
  RevenueAnalyticsResponse,
} from "@/components/features/analytics/types/analytics.types";

const buildProjectsAnalyticsQuery = (params?: GetProjectsAnalyticsParams) => {
  const searchParams = new URLSearchParams();

  if (params?.from) {
    searchParams.set("from", params.from);
  }

  if (params?.to) {
    searchParams.set("to", params.to);
  }

  if (typeof params?.limit === "number") {
    searchParams.set("limit", String(params.limit));
  }

  return searchParams.toString();
};

const buildRevenueAnalyticsQuery = (params?: GetRevenueAnalyticsParams) => {
  const searchParams = new URLSearchParams();

  if (params?.from) {
    searchParams.set("from", params.from);
  }

  if (params?.to) {
    searchParams.set("to", params.to);
  }

  if (params?.currency) {
    searchParams.set("currency", params.currency);
  }

  return searchParams.toString();
};

export const getProjectsAnalytics = async (
  workspaceId: string,
  params?: GetProjectsAnalyticsParams
): Promise<ProjectsAnalyticsResponse> => {
  const query = buildProjectsAnalyticsQuery(params);

  return apiFetch<ProjectsAnalyticsResponse>({
    endpoint: `${API_ENDPOINTS.analytics.projects}${query ? `?${query}` : ""}`,
    method: "GET",
    workspaceId,
  });
};

export const getRevenueAnalytics = async (
  workspaceId: string,
  params?: GetRevenueAnalyticsParams
): Promise<RevenueAnalyticsResponse> => {
  const query = buildRevenueAnalyticsQuery(params);

  return apiFetch<RevenueAnalyticsResponse>({
    endpoint: `${API_ENDPOINTS.analytics.revenue}${query ? `?${query}` : ""}`,
    method: "GET",
    workspaceId,
  });
};
