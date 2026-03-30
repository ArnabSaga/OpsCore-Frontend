import { API_ENDPOINTS } from "@/config/api-endpoints";
import { apiFetch } from "@/lib/fetcher";
import type { ApiResponse } from "@/types/api.types";

import type {
  AccountProfileResponse,
  UpdateAccountPasswordPayload,
  UpdateAccountProfilePayload,
} from "@/components/features/account/types/account.types";

const buildAccountProfileFormData = (payload: UpdateAccountProfilePayload): FormData => {
  const formData = new FormData();

  if (typeof payload.name === "string" && payload.name.trim()) {
    formData.append("name", payload.name.trim());
  }

  if (typeof payload.removeImage === "boolean") {
    formData.append("removeImage", String(payload.removeImage));
  }

  if (payload.photo instanceof File) {
    formData.append("photo", payload.photo);
  }

  return formData;
};

export const getMyProfile = async (): Promise<AccountProfileResponse> => {
  return apiFetch<AccountProfileResponse>({
    endpoint: API_ENDPOINTS.user.profile,
    method: "GET",
  });
};

export const updateMyProfile = async (
  payload: UpdateAccountProfilePayload
): Promise<AccountProfileResponse> => {
  const formData = buildAccountProfileFormData(payload);

  return apiFetch<AccountProfileResponse>({
    endpoint: API_ENDPOINTS.user.profile,
    method: "PATCH",
    body: formData,
  });
};

export const updateMyPassword = async (
  payload: UpdateAccountPasswordPayload
): Promise<ApiResponse<null>> => {
  return apiFetch<ApiResponse<null>>({
    endpoint: API_ENDPOINTS.user.password,
    method: "PATCH",
    body: payload,
  });
};
