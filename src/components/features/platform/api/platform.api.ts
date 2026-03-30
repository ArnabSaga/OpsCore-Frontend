import { apiFetch } from "@/lib/fetcher";
import { API_ENDPOINTS } from "@/config/api-endpoints";
import { ApiResponse } from "@/types/api.types";
import { SubscriptionStatus, WorkspacePlan, BillingInterval } from "../../billing/types/billing.types";

export type PlatformSubscriptionItem = {
  id: string;
  workspaceId: string;
  workspace: {
    id: string;
    name: string;
    slug: string;
    ownerEmail: string;
  };
  plan: WorkspacePlan;
  status: SubscriptionStatus;
  billingInterval: BillingInterval | null;
  currentPeriodEnd: string | null;
  createdAt: string;
};


export type PlatformSubscriptionsResponse = {
  items: PlatformSubscriptionItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type PlatformLogItem = {
  id: string;
  action: string;
  entityType: string;
  entityId: string | null;
  createdAt: string;
  user: {

    id: string;
    name: string;
    email: string;
    image: string | null;
  };
  workspace: {
    id: string;
    name: string;
  } | null;
  metadata?: Record<string, unknown>;
};



export type PlatformLogsResponse = {
  items: PlatformLogItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export const getPlatformSubscriptions = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<PlatformSubscriptionsResponse> => {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.append("page", params.page.toString());
  if (params?.limit) searchParams.append("limit", params.limit.toString());
  if (params?.search) searchParams.append("search", params.search);

  const response = await apiFetch<ApiResponse<PlatformSubscriptionsResponse>>({
    endpoint: `${API_ENDPOINTS.platform.subscriptions}${
      searchParams.toString() ? `?${searchParams.toString()}` : ""
    }`,
    method: "GET",
  });

  return response.data;
};

export const getPlatformLogs = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<PlatformLogsResponse> => {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.append("page", params.page.toString());
  if (params?.limit) searchParams.append("limit", params.limit.toString());
  if (params?.search) searchParams.append("search", params.search);

  const response = await apiFetch<ApiResponse<PlatformLogsResponse>>({
    endpoint: `${API_ENDPOINTS.platform.logs}${
      searchParams.toString() ? `?${searchParams.toString()}` : ""
    }`,
    method: "GET",
  });

  return response.data;
};
