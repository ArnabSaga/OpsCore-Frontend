import { API_ENDPOINTS } from "@/config/api-endpoints";
import { apiFetch } from "@/lib/fetcher";

import type {
  BillingHistoryResponse,
  BillingSubscriptionResponse,
  BillingUsageResponse,
  CreateCustomerPortalPayload,
  CustomerPortalResponse,
  GetBillingHistoryParams,
  PrepareCheckoutPayload,
  PreparedCheckoutResponse,
} from "@/components/features/billing/types/billing.types";

const buildBillingHistoryQuery = (params?: GetBillingHistoryParams) => {
  const searchParams = new URLSearchParams();

  if (typeof params?.limit === "number") {
    searchParams.set("limit", String(params.limit));
  }

  if (params?.startingAfter) {
    searchParams.set("startingAfter", params.startingAfter);
  }

  return searchParams.toString();
};

export const getCurrentWorkspaceSubscription = async (
  workspaceId: string
): Promise<BillingSubscriptionResponse> => {
  return apiFetch<BillingSubscriptionResponse>({
    endpoint: API_ENDPOINTS.billing.subscription,
    method: "GET",
    workspaceId,
  });
};

export const prepareCheckoutSession = async (
  workspaceId: string,
  payload: PrepareCheckoutPayload
): Promise<PreparedCheckoutResponse> => {
  return apiFetch<PreparedCheckoutResponse>({
    endpoint: API_ENDPOINTS.billing.checkoutSession,
    method: "POST",
    workspaceId,
    body: payload,
  });
};

export const createCustomerPortalSession = async (
  workspaceId: string,
  payload?: CreateCustomerPortalPayload
): Promise<CustomerPortalResponse> => {
  return apiFetch<CustomerPortalResponse>({
    endpoint: API_ENDPOINTS.billing.customerPortal,
    method: "POST",
    workspaceId,
    body: payload,
  });
};

export const getBillingHistory = async (
  workspaceId: string,
  params?: GetBillingHistoryParams
): Promise<BillingHistoryResponse> => {
  const query = buildBillingHistoryQuery(params);

  const response = await apiFetch<BillingHistoryResponse>({
    endpoint: `${API_ENDPOINTS.billing.invoices}${query ? `?${query}` : ""}`,
    method: "GET",
    workspaceId,
  });

  return {
    ...response,
    data: response.data ?? {
      invoices: [],
      nextCursor: null,
      hasMore: false,
    },
  };
};

export const getBillingUsage = async (workspaceId: string): Promise<BillingUsageResponse> => {
  const response = await apiFetch<BillingUsageResponse>({
    endpoint: API_ENDPOINTS.billing.usage,
    method: "GET",
    workspaceId,
  });

  return {
    ...response,
    data: response.data ?? {
      workspace: {
        id: "",
        name: "",
        slug: "",
        plan: "FREE",
      },
      metrics: [],
    },
  };
};
