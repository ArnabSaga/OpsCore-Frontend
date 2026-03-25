export type WorkspaceRole = "OWNER" | "ADMIN" | "MEMBER" | "VIEWER";

export type Workspace = {
  id: string;
  name: string;
  slug: string;
  logo?: string | null;
  role?: string | null;
  plan?: "FREE" | "PRO" | "ENTERPRISE";
  isActive?: boolean;
  memberCount?: number;
  createdAt: string;
  updatedAt: string;
  metadata?: Record<string, unknown>;
};

export type WorkspacesResponse = {
  success: boolean;
  message?: string;
  data: {
    workspaces: Workspace[];
    activeWorkspace: Workspace | null;
  };
};

export type SwitchWorkspacePayload = {
  workspaceId: string;
};

export type SwitchWorkspaceResponse = {
  success: boolean;
  message?: string;
  data: {
    activeWorkspace: Workspace;
  };
};
