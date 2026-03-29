import type {
  BillingHistoryResponse,
  BillingSubscriptionResponse,
  BillingUsageResponse,
  CreateWorkspaceInvitationPayload,
  CreateWorkspacePayload,
  EnhancedWorkspaceDetails,
  PlatformWorkspacesResponse,
  SwitchWorkspaceResponse,
  UpdateWorkspaceMemberPayload,
  WorkspaceBrandingSettings,
  WorkspaceCapabilities,
  WorkspaceDetails,
  WorkspaceGeneralSettings,
  WorkspaceInvitation,
  WorkspaceMember,
  WorkspacePermissionMatrix,
  WorkspaceSettingsSummary,
  WorkspaceSummary,
  WorkspacesResponse,
} from "@/types/workspace.types";

import { ApiResponse } from "@/types/api.types";

import { API_ENDPOINTS } from "@/config/api-endpoints";
import { apiFetch } from "@/lib/fetcher";

// --- CORE WORKSPACE API ---

export const createWorkspace = async (
  payload: CreateWorkspacePayload
): Promise<WorkspaceSummary> => {
  const response = await apiFetch<ApiResponse<WorkspaceSummary>>({
    endpoint: API_ENDPOINTS.workspace.create,
    method: "POST",
    body: payload,
  });

  return response.data;
};

export const getWorkspaces = async (): Promise<WorkspacesResponse> => {
  const response = await apiFetch<ApiResponse<WorkspaceSummary[]>>({
    endpoint: API_ENDPOINTS.workspace.my,
    method: "GET",
  });

  const workspaces = response.data ?? [];
  const activeWorkspace = workspaces.find((workspace) => workspace.isActiveWorkspace) ?? null;

  return {
    workspaces,
    activeWorkspace,
  };
};

export const getPlatformWorkspaces = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<PlatformWorkspacesResponse> => {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.append("page", params.page.toString());
  if (params?.limit) searchParams.append("limit", params.limit.toString());
  if (params?.search) searchParams.append("search", params.search);

  const response = await apiFetch<ApiResponse<PlatformWorkspacesResponse>>({
    endpoint: `${API_ENDPOINTS.workspace.platformAll}${
      searchParams.toString() ? `?${searchParams.toString()}` : ""
    }`,
    method: "GET",
  });

  return response.data;
};

export const getWorkspaceById = async (workspaceId: string): Promise<WorkspaceDetails> => {
  const response = await apiFetch<ApiResponse<WorkspaceDetails>>({
    endpoint: API_ENDPOINTS.workspace.details(workspaceId),
    method: "GET",
    workspaceId,
  });

  return response.data;
};

export const switchWorkspace = async (workspaceId: string): Promise<SwitchWorkspaceResponse> => {
  const response = await apiFetch<ApiResponse<SwitchWorkspaceResponse>>({
    endpoint: API_ENDPOINTS.workspace.switch(workspaceId),
    method: "POST",
    workspaceId,
  });

  return response.data;
};

// --- SETTINGS & DETAILS ---

export const getEnhancedWorkspaceById = async (
  workspaceId: string
): Promise<EnhancedWorkspaceDetails> => {
  const response = await apiFetch<ApiResponse<EnhancedWorkspaceDetails>>({
    endpoint: API_ENDPOINTS.workspace.details(workspaceId),
    method: "GET",
    workspaceId,
  });

  return response.data;
};

export const getWorkspaceCapabilities = async (
  workspaceId: string
): Promise<WorkspaceCapabilities> => {
  const response = await apiFetch<ApiResponse<WorkspaceCapabilities>>({
    endpoint: API_ENDPOINTS.workspace.capabilities(workspaceId),
    method: "GET",
    workspaceId,
  });

  return response.data;
};

export const getWorkspaceSettingsSummary = async (
  workspaceId: string
): Promise<WorkspaceSettingsSummary> => {
  const response = await apiFetch<ApiResponse<WorkspaceSettingsSummary>>({
    endpoint: API_ENDPOINTS.workspace.settingsSummary(workspaceId),
    method: "GET",
    workspaceId,
  });

  return response.data;
};

export const getWorkspaceGeneralSettings = async (
  workspaceId: string
): Promise<WorkspaceGeneralSettings> => {
  const response = await apiFetch<ApiResponse<WorkspaceGeneralSettings>>({
    endpoint: API_ENDPOINTS.workspace.generalSettings(workspaceId),
    method: "GET",
    workspaceId,
  });

  return response.data;
};

export const updateWorkspaceGeneralSettings = async (
  workspaceId: string,
  payload: WorkspaceGeneralSettings
): Promise<WorkspaceGeneralSettings> => {
  const response = await apiFetch<ApiResponse<WorkspaceGeneralSettings>>({
    endpoint: API_ENDPOINTS.workspace.generalSettings(workspaceId),
    method: "PATCH",
    workspaceId,
    body: payload,
  });

  return response.data;
};

export const getWorkspaceBrandingSettings = async (
  workspaceId: string
): Promise<WorkspaceBrandingSettings> => {
  const response = await apiFetch<ApiResponse<WorkspaceBrandingSettings>>({
    endpoint: API_ENDPOINTS.workspace.brandingSettings(workspaceId),
    method: "GET",
    workspaceId,
  });

  return response.data;
};

export const updateWorkspaceBrandingSettings = async (
  workspaceId: string,
  payload: WorkspaceBrandingSettings
): Promise<WorkspaceBrandingSettings> => {
  const response = await apiFetch<ApiResponse<WorkspaceBrandingSettings>>({
    endpoint: API_ENDPOINTS.workspace.brandingSettings(workspaceId),
    method: "PATCH",
    workspaceId,
    body: payload,
  });

  return response.data;
};

export const getWorkspacePermissions = async (
  workspaceId: string
): Promise<WorkspacePermissionMatrix> => {
  const response = await apiFetch<ApiResponse<WorkspacePermissionMatrix>>({
    endpoint: API_ENDPOINTS.workspace.permissions(workspaceId),
    method: "GET",
    workspaceId,
  });

  return response.data;
};

export const archiveWorkspace = async (workspaceId: string): Promise<void> => {
  await apiFetch<ApiResponse<null>>({
    endpoint: API_ENDPOINTS.workspace.archive(workspaceId),
    method: "POST",
    workspaceId,
  });
};

export const deleteWorkspace = async (
  workspaceId: string,
  payload?: { confirmName?: string }
): Promise<void> => {
  await apiFetch<ApiResponse<null>>({
    endpoint: API_ENDPOINTS.workspace.details(workspaceId),
    method: "DELETE",
    workspaceId,
    body: payload ?? {},
  });
};

// --- MEMBERS MANAGEMENT ---

export const updateWorkspaceMember = async (
  workspaceId: string,
  memberId: string,
  payload: UpdateWorkspaceMemberPayload
): Promise<void> => {
  await apiFetch<ApiResponse<null>>({
    endpoint: API_ENDPOINTS.workspace.member(workspaceId, memberId),
    method: "PATCH",
    workspaceId,
    body: payload,
  });
};

export const removeWorkspaceMember = async (
  workspaceId: string,
  memberId: string
): Promise<void> => {
  await apiFetch<ApiResponse<null>>({
    endpoint: API_ENDPOINTS.workspace.member(workspaceId, memberId),
    method: "DELETE",
    workspaceId,
  });
};

export const transferWorkspaceOwnership = async (
  workspaceId: string,
  memberId: string,
  payload: { confirm: true }
): Promise<void> => {
  await apiFetch<ApiResponse<null>>({
    endpoint: API_ENDPOINTS.workspace.transferOwnership(workspaceId, memberId),
    method: "POST",
    workspaceId,
    body: payload,
  });
};

export const getWorkspaceMembers = async (workspaceId: string): Promise<WorkspaceMember[]> => {
  const response = await apiFetch<ApiResponse<WorkspaceMember[]>>({
    endpoint: API_ENDPOINTS.workspace.members(workspaceId),
    method: "GET",
    workspaceId,
  });

  return response.data;
};

// --- INVITATIONS MANAGEMENT ---

export const createWorkspaceInvitation = async (
  workspaceId: string,
  payload: CreateWorkspaceInvitationPayload
): Promise<WorkspaceInvitation> => {
  const response = await apiFetch<ApiResponse<WorkspaceInvitation>>({
    endpoint: API_ENDPOINTS.workspace.invitations(workspaceId),
    method: "POST",
    workspaceId,
    body: payload,
  });

  return response.data;
};

export const getWorkspaceInvitations = async (
  workspaceId: string
): Promise<WorkspaceInvitation[]> => {
  const response = await apiFetch<ApiResponse<WorkspaceInvitation[]>>({
    endpoint: API_ENDPOINTS.workspace.invitations(workspaceId),
    method: "GET",
    workspaceId,
  });

  return response.data;
};

export const cancelWorkspaceInvitation = async (
  workspaceId: string,
  invitationId: string
): Promise<void> => {
  await apiFetch<ApiResponse<null>>({
    endpoint: API_ENDPOINTS.workspace.invitation(workspaceId, invitationId),
    method: "DELETE",
    workspaceId,
  });
};

export const resendWorkspaceInvitation = async (
  workspaceId: string,
  invitationId: string
): Promise<WorkspaceInvitation> => {
  const response = await apiFetch<ApiResponse<WorkspaceInvitation>>({
    endpoint: API_ENDPOINTS.workspace.resendInvitation(workspaceId, invitationId),
    method: "POST",
    workspaceId,
  });

  return response.data;
};

export const expireWorkspaceInvitation = async (
  workspaceId: string,
  invitationId: string
): Promise<void> => {
  await apiFetch<ApiResponse<null>>({
    endpoint: API_ENDPOINTS.workspace.expireInvitation(workspaceId, invitationId),
    method: "POST",
    workspaceId,
  });
};

export const deleteWorkspaceInvitation = async (
  workspaceId: string,
  invitationId: string
): Promise<void> => {
  await apiFetch<ApiResponse<null>>({
    endpoint: `${API_ENDPOINTS.workspace.invitations(workspaceId)}/${invitationId}/hard-delete`,
    method: "DELETE",
    workspaceId,
  });
};

// --- BILLING API ---

export const getWorkspaceSubscription = async (
  workspaceId: string
): Promise<BillingSubscriptionResponse> => {
  const response = await apiFetch<ApiResponse<BillingSubscriptionResponse>>({
    endpoint: API_ENDPOINTS.billing.subscription,
    method: "GET",
    workspaceId,
  });

  return response.data;
};

export const getBillingHistory = async (workspaceId: string): Promise<BillingHistoryResponse> => {
  const response = await apiFetch<ApiResponse<BillingHistoryResponse>>({
    endpoint: API_ENDPOINTS.billing.invoices,
    method: "GET",
    workspaceId,
  });

  return response.data;
};

export const getBillingUsage = async (workspaceId: string): Promise<BillingUsageResponse> => {
  const response = await apiFetch<ApiResponse<BillingUsageResponse>>({
    endpoint: API_ENDPOINTS.billing.usage,
    method: "GET",
    workspaceId,
  });

  return response.data;
};

// --- PUBLIC INVITATION API ---

export const getInvitationByToken = async (token: string): Promise<WorkspaceInvitation> => {
  const response = await apiFetch<ApiResponse<WorkspaceInvitation>>({
    endpoint: API_ENDPOINTS.invitation.details(token),
    method: "GET",
  });

  return response.data;
};

export const acceptInvitation = async (token: string): Promise<void> => {
  await apiFetch<ApiResponse<null>>({
    endpoint: API_ENDPOINTS.invitation.accept(token),
    method: "POST",
  });
};

export const declineInvitation = async (token: string): Promise<void> => {
  await apiFetch<ApiResponse<null>>({
    endpoint: API_ENDPOINTS.invitation.decline(token),
    method: "POST",
  });
};

export const getMyInvitations = async (): Promise<WorkspaceInvitation[]> => {
  const response = await apiFetch<ApiResponse<WorkspaceInvitation[]>>({
    endpoint: API_ENDPOINTS.invitation.my,
    method: "GET",
  });

  return response.data;
};
