import { API_ENDPOINTS } from "@/config/api-endpoints";
import { buildApiUrl } from "@/lib/build-api-url";
import { apiFetch } from "@/lib/fetcher";
import type { ApiResponse } from "@/types/api.types";

import type {
  CreateInvoicePayload,
  GetInvoicesParams,
  InvoiceDetails,
  InvoiceListItem,
  PaginatedInvoicesResponse,
  UpdateInvoicePayload,
} from "@/components/features/invoice/types/invoice.types";

type InvoiceListApiResponse = ApiResponse<InvoiceListItem[]>;

const buildInvoiceListQuery = (params?: GetInvoicesParams) => {
  const searchParams = new URLSearchParams();

  if (params?.searchTerm) searchParams.set("searchTerm", params.searchTerm);
  if (params?.status) searchParams.set("status", params.status);

  if (typeof params?.overdue === "boolean") {
    searchParams.set("overdue", String(params.overdue));
  }

  if (typeof params?.issued === "boolean") {
    searchParams.set("issued", String(params.issued));
  }

  if (typeof params?.page === "number") {
    searchParams.set("page", String(params.page));
  }

  if (typeof params?.limit === "number") {
    searchParams.set("limit", String(params.limit));
  }

  if (params?.sortBy) searchParams.set("sortBy", params.sortBy);
  if (params?.sortOrder) searchParams.set("sortOrder", params.sortOrder);

  return searchParams.toString();
};

export const getInvoices = async (
  workspaceId: string,
  params?: GetInvoicesParams
): Promise<PaginatedInvoicesResponse> => {
  const query = buildInvoiceListQuery(params);

  const response = await apiFetch<InvoiceListApiResponse>({
    endpoint: `${API_ENDPOINTS.invoice.list}${query ? `?${query}` : ""}`,
    method: "GET",
    workspaceId,
  });

  return {
    data: response.data ?? [],
    meta: response.meta ?? {
      page: params?.page ?? 1,
      limit: params?.limit ?? 10,
      total: Array.isArray(response.data) ? response.data.length : 0,
      totalPages: 1,
    },
  };
};

export const getInvoiceById = async (
  workspaceId: string,
  invoiceId: string
): Promise<InvoiceDetails> => {
  const response = await apiFetch<ApiResponse<InvoiceDetails>>({
    endpoint: API_ENDPOINTS.invoice.details(invoiceId),
    method: "GET",
    workspaceId,
  });

  return response.data;
};

export const createInvoice = async (
  workspaceId: string,
  payload: CreateInvoicePayload
): Promise<InvoiceDetails> => {
  const response = await apiFetch<ApiResponse<InvoiceDetails>>({
    endpoint: API_ENDPOINTS.invoice.create,
    method: "POST",
    workspaceId,
    body: payload,
  });

  return response.data;
};

export const updateInvoice = async (
  workspaceId: string,
  invoiceId: string,
  payload: UpdateInvoicePayload
): Promise<InvoiceDetails> => {
  const response = await apiFetch<ApiResponse<InvoiceDetails>>({
    endpoint: API_ENDPOINTS.invoice.details(invoiceId),
    method: "PATCH",
    workspaceId,
    body: payload,
  });

  return response.data;
};

export const deleteInvoice = async (workspaceId: string, invoiceId: string): Promise<void> => {
  await apiFetch<ApiResponse<null>>({
    endpoint: API_ENDPOINTS.invoice.details(invoiceId),
    method: "DELETE",
    workspaceId,
  });
};

export const sendInvoice = async (
  workspaceId: string,
  invoiceId: string
): Promise<InvoiceDetails> => {
  const response = await apiFetch<ApiResponse<InvoiceDetails>>({
    endpoint: API_ENDPOINTS.invoice.send(invoiceId),
    method: "POST",
    workspaceId,
  });

  return response.data;
};

export const markInvoicePaid = async (
  workspaceId: string,
  invoiceId: string
): Promise<InvoiceDetails> => {
  const response = await apiFetch<ApiResponse<InvoiceDetails>>({
    endpoint: API_ENDPOINTS.invoice.markPaid(invoiceId),
    method: "POST",
    workspaceId,
  });

  return response.data;
};

export const cancelInvoice = async (
  workspaceId: string,
  invoiceId: string
): Promise<InvoiceDetails> => {
  const response = await apiFetch<ApiResponse<InvoiceDetails>>({
    endpoint: API_ENDPOINTS.invoice.cancel(invoiceId),
    method: "POST",
    workspaceId,
  });

  return response.data;
};

export const getInvoicePdf = async (workspaceId: string, invoiceId: string): Promise<Blob> => {
  const response = await fetch(buildApiUrl(API_ENDPOINTS.invoice.pdf(invoiceId)), {
    method: "GET",
    credentials: "include",
    headers: {
      "x-workspace-id": workspaceId,
    },
  });

  if (!response.ok) {
    let errorMessage = "Failed to fetch invoice PDF";

    try {
      const errorData = await response.json();
      errorMessage = errorData?.message || errorData?.error || errorMessage;
    } catch {
      errorMessage = response.statusText || errorMessage;
    }

    const error = new Error(errorMessage) as Error & { status?: number };
    error.status = response.status;
    throw error;
  }

  return response.blob();
};
