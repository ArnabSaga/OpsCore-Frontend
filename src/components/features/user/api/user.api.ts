import { apiFetch } from "@/lib/fetcher";
import { ApiResponse } from "@/types/api.types";
import { API_ENDPOINTS } from "@/config/api-endpoints";

export type PlatformUserItem = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  systemRole: string;
  createdAt: string;
};

export type PlatformUsersResponse = {
  items: PlatformUserItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export const getPlatformUsers = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<PlatformUsersResponse> => {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.append("page", params.page.toString());
  if (params?.limit) searchParams.append("limit", params.limit.toString());
  if (params?.search) searchParams.append("search", params.search);

  const response = await apiFetch<ApiResponse<PlatformUsersResponse>>({
    endpoint: `${API_ENDPOINTS.user.platformAll}${
      searchParams.toString() ? `?${searchParams.toString()}` : ""
    }`,
    method: "GET",
  });

  return response.data;
};
