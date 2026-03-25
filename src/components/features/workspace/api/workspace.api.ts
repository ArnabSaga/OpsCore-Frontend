import { apiFetch } from "@/lib/fetcher";
import type {
  SwitchWorkspacePayload,
  SwitchWorkspaceResponse,
  Workspace,
  WorkspacesResponse,
} from "@/types/workspace.types";

/**
 * Fetches all workspaces for the current user
 */
export const getWorkspaces = async (): Promise<{
  workspaces: Workspace[];
  activeWorkspace: Workspace | null;
}> => {
  const response = (await apiFetch("/api/v1/workspaces/my")) as WorkspacesResponse;

  return {
    workspaces: response.data?.workspaces || [],
    activeWorkspace: response.data?.activeWorkspace || null,
  };
};

/**
 * Switches the active workspace session
 */
export const switchWorkspace = async (
  payload: SwitchWorkspacePayload
): Promise<SwitchWorkspaceResponse> => {
  return apiFetch("/api/v1/workspaces/switch", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
};
