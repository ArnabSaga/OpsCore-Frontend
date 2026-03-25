import { API_ENDPOINTS } from "@/config/api-endpoints";
import { apiFetch } from "@/lib/fetcher";
import type {
  SwitchWorkspacePayload,
  SwitchWorkspaceResponse,
  Workspace,
} from "@/types/workspace.types";

/**
 * Fetches all workspaces for the current user
 */
export const getWorkspaces = async (): Promise<{
  workspaces: Workspace[];
  activeWorkspace: Workspace | null;
}> => {
  const response = await apiFetch<{
    data: Workspace[] | { workspaces?: Workspace[]; items?: Workspace[] };
  }>({
    endpoint: API_ENDPOINTS.workspace.my,
  });

  const data = response?.data;
  let workspaceItems: Workspace[] = [];

  if (Array.isArray(data)) {
    workspaceItems = data;
  } else if (data) {
    workspaceItems = data.workspaces ?? data.items ?? [];
  }

  const workspaces = workspaceItems;

  // Find the active workspace from the list using the isActiveWorkspace flag
  const activeWorkspace =
    workspaces.find((w: Workspace & { isActiveWorkspace?: boolean }) => w.isActiveWorkspace) ||
    null;

  return {
    workspaces,
    activeWorkspace,
  };
};

/**
 * Switches the active workspace session
 */
export const switchWorkspace = async (
  payload: SwitchWorkspacePayload
): Promise<SwitchWorkspaceResponse> => {
  return apiFetch<SwitchWorkspaceResponse>({
    endpoint: API_ENDPOINTS.workspace.switch,
    method: "PATCH",
    body: JSON.stringify(payload),
  });
};
