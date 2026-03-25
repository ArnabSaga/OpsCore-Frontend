import { apiFetch } from "@/lib/fetcher";
import type {
  DashboardActivityResponse,
  DashboardMetrics,
  DashboardMetricsPeriod,
  DashboardOverview,
} from "@/types/dashboard.types";

type OverviewApiResponse = {
  success?: boolean;
  message?: string;
  data?: DashboardOverview;
};

type ActivityApiResponse = {
  success?: boolean;
  message?: string;
  data?: DashboardActivityResponse["data"];
  meta?: DashboardActivityResponse["meta"];
};

type MetricsApiResponse = {
  success?: boolean;
  message?: string;
  data?: DashboardMetrics;
};

export const getDashboardOverview = async (): Promise<DashboardOverview> => {
  const response = (await apiFetch({
    endpoint: "/api/v1/dashboard/overview",
  })) as OverviewApiResponse;

  if (!response?.data) {
    throw new Error("Dashboard overview data not found");
  }

  return response.data;
};

export const getDashboardActivity = async ({
  page = 1,
  limit = 8,
}: {
  page?: number;
  limit?: number;
} = {}): Promise<DashboardActivityResponse> => {
  const response = (await apiFetch({
    endpoint: `/api/v1/dashboard/activity?page=${page}&limit=${limit}`,
  })) as ActivityApiResponse;

  return {
    data: response?.data ?? [],
    meta: response?.meta ?? {
      page,
      limit,
      total: 0,
      totalPages: 1,
    },
  };
};

export const getDashboardMetrics = async (
  period: DashboardMetricsPeriod = "last_30_days"
): Promise<DashboardMetrics> => {
  const response = (await apiFetch({
    endpoint: `/api/v1/dashboard/metrics?period=${period}`,
  })) as MetricsApiResponse;

  return {
    revenue: response?.data?.revenue ?? [],
    projects: response?.data?.projects ?? [],
    tasks: response?.data?.tasks ?? [],
  };
};
