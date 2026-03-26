import { API_ENDPOINTS } from "@/config/api-endpoints";
import { apiFetch } from "@/lib/fetcher";
import type {
  CreateWorkspacePayload,
  SwitchWorkspaceResponse,
  WorkspaceDetails,
  WorkspaceInvitation,
  WorkspaceMember,
  WorkspaceSummary,
} from "@/types/workspace.types";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export const getWorkspaces = async (): Promise<{
  workspaces: WorkspaceSummary[];
  activeWorkspace: WorkspaceSummary | null;
}> => {
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

export const getWorkspaceById = async (workspaceId: string): Promise<WorkspaceDetails> => {
  const response = await apiFetch<ApiResponse<WorkspaceDetails>>({
    endpoint: API_ENDPOINTS.workspace.details(workspaceId),
    method: "GET",
  });

  return response.data;
};

export const createWorkspace = async (
  payload: CreateWorkspacePayload
): Promise<WorkspaceDetails> => {
  const response = await apiFetch<ApiResponse<WorkspaceDetails>>({
    endpoint: API_ENDPOINTS.workspace.create,
    method: "POST",
    body: payload,
  });

  return response.data;
};

export const switchWorkspace = async (workspaceId: string): Promise<SwitchWorkspaceResponse> => {
  const response = await apiFetch<ApiResponse<SwitchWorkspaceResponse>>({
    endpoint: API_ENDPOINTS.workspace.switch(workspaceId),
    method: "POST",
  });

  return response.data;
};

export const getWorkspaceMembers = async (workspaceId: string): Promise<WorkspaceMember[]> => {
  const response = await apiFetch<ApiResponse<WorkspaceMember[]>>({
    endpoint: API_ENDPOINTS.workspace.members(workspaceId),
    method: "GET",
  });

  return response.data ?? [];
};

export const getWorkspaceInvitations = async (
  workspaceId: string
): Promise<WorkspaceInvitation[]> => {
  const response = await apiFetch<ApiResponse<WorkspaceInvitation[]>>({
    endpoint: API_ENDPOINTS.workspace.invitations(workspaceId),
    method: "GET",
  });

  return response.data ?? [];
};
