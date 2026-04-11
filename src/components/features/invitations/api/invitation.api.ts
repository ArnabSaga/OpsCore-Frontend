import { API_ENDPOINTS } from "@/config/api-endpoints";
import { apiFetch } from "@/lib/fetcher";
import type { ApiResponse } from "@/types/api.types";
import type {
  CreateWorkspaceInvitationPayload,
  WorkspaceInvitation,
} from "@/types/workspace.types";

export const getMyInvitations = async (): Promise<WorkspaceInvitation[]> => {
  const response = await apiFetch<ApiResponse<WorkspaceInvitation[]>>({
    endpoint: API_ENDPOINTS.invitation.my,
    method: "GET",
  });

  return response.data;
};

export const getInvitationByToken = async (token: string): Promise<WorkspaceInvitation> => {
  const response = await apiFetch<ApiResponse<WorkspaceInvitation>>({
    endpoint: API_ENDPOINTS.invitation.details(token),
    method: "GET",
  });

  return response.data;
};

export const acceptInvitation = async (
  token: string
): Promise<{ workspaceId: string; workspaceName: string }> => {
  const response = await apiFetch<ApiResponse<{ workspaceId: string; workspaceName: string }>>({
    endpoint: API_ENDPOINTS.invitation.accept(token),
    method: "POST",
  });

  return response.data;
};

export const declineInvitation = async (token: string): Promise<void> => {
  await apiFetch<ApiResponse<null>>({
    endpoint: API_ENDPOINTS.invitation.decline(token),
    method: "POST",
  });
};

export const getWorkspaceInvitationHistory = async (
  workspaceId: string
): Promise<WorkspaceInvitation[]> => {
  const response = await apiFetch<ApiResponse<WorkspaceInvitation[]>>({
    endpoint: API_ENDPOINTS.workspace.invitations(workspaceId),
    method: "GET",
    workspaceId,
  });

  return response.data;
};

export const createInvitation = async (
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

export const cancelInvitation = async (
  workspaceId: string,
  invitationId: string
): Promise<void> => {
  await apiFetch<ApiResponse<null>>({
    endpoint: API_ENDPOINTS.workspace.invitation(workspaceId, invitationId),
    method: "DELETE",
    workspaceId,
  });
};

export const resendInvitation = async (
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

export const expireInvitation = async (
  workspaceId: string,
  invitationId: string
): Promise<void> => {
  await apiFetch<ApiResponse<null>>({
    endpoint: API_ENDPOINTS.workspace.expireInvitation(workspaceId, invitationId),
    method: "POST",
    workspaceId,
  });
};

export const deleteInvitation = async (
  workspaceId: string,
  invitationId: string
): Promise<void> => {
  await apiFetch<ApiResponse<null>>({
    endpoint: API_ENDPOINTS.workspace.hardDeleteInvitation(workspaceId, invitationId),
    method: "DELETE",
    workspaceId,
  });
};
