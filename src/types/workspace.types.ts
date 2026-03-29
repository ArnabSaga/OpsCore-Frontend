export type WorkspacePlan = "FREE" | "PRO" | "ENTERPRISE";
export type WorkspaceRole = "OWNER" | "ADMIN" | "MEMBER";
export type WorkspaceMemberStatus = "ACTIVE" | "INACTIVE" | "INVITED";
export type InvitationStatus = "PENDING" | "ACCEPTED" | "DECLINED" | "REJECTED" | "EXPIRED" | "CANCELED";

export type WorkspacePlanMeta = {
  basePlan: WorkspacePlan;
  effectivePlan: WorkspacePlan;
  isTrialActive: boolean;
  trialStartsAt: string | null;
  trialEndsAt: string | null;
};

export type WorkspaceSummary = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  createdByUserId: string;
  role?: WorkspaceRole;
  status?: WorkspaceMemberStatus;
  isActiveWorkspace?: boolean;
  _count?: {
    members: number;
  };
  planMeta?: WorkspacePlanMeta;
};

export type WorkspacesResponse = {
  workspaces: WorkspaceSummary[];
  activeWorkspace: WorkspaceSummary | null;
};


export type WorkspaceMember = {
  id: string;
  workspaceId: string;
  userId: string;
  role: WorkspaceRole;
  status: WorkspaceMemberStatus;
  joinedAt: string;
  addedByUserId: string | null;
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };
};

export type WorkspaceInvitation = {
  id: string;
  email: string;
  token: string;
  role: Exclude<WorkspaceRole, "OWNER">;
  status: InvitationStatus;
  expiresAt: string;
  createdAt: string;
  acceptedAt?: string | null;
  rejectedAt?: string | null;
  canceledAt?: string | null;
  invitedBy?: {
    id: string;
    name: string;
    email: string;
  };
  planMeta?: {
    workspacePlan: WorkspacePlan;
    isTrialActive: boolean;
    trialStartsAt: string | null;
    trialEndsAt: string | null;
  };
  workspace?: {
    id: string;
    name: string;
    slug: string;
  };
};

export type WorkspaceDetails = WorkspaceSummary & {
  members?: WorkspaceMember[];
  invitations?: WorkspaceInvitation[];
};

export type CreateWorkspacePayload = {
  name: string;
};

export type SwitchWorkspaceResponse = {
  workspaceId: string;
  workspaceName: string;
  role: WorkspaceRole;
};

export type WorkspaceCapabilities = {
  canViewMembers: boolean;
  canManageMembers: boolean;
  canViewInvitations: boolean;
  canManageInvitations: boolean;
  canManageBilling: boolean;
  canUpdateWorkspace: boolean;
  canDeleteWorkspace: boolean;
  canManageBranding: boolean;
  canManagePermissions: boolean;
};

export type WorkspaceCounts = {
  members: number;
  activeMembers: number;
  invitations: number;
  pendingInvitations: number;
  projects: number;
  tasks: number;
};

export type WorkspaceCreatedBy = {
  id: string;
  name: string;
  email: string;
  image: string | null;
};

export type EnhancedWorkspaceDetails = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  createdByUserId: string;
  createdBy?: WorkspaceCreatedBy;
  role: WorkspaceRole | null;
  status: WorkspaceMemberStatus | null;
  isActiveWorkspace: boolean;
  counts: WorkspaceCounts;
  permissions: WorkspaceCapabilities | null;
  planMeta: WorkspacePlanMeta;
};

export type WorkspaceGeneralSettings = {
  name?: string;
  description?: string | null;
  timezone?: string | null;
  currency?: string | null;
  supportEmail?: string | null;
  billingEmail?: string | null;
};

export type WorkspaceBrandingSettings = {
  logoUrl?: string | null;
  faviconUrl?: string | null;
  primaryColor?: string | null;
  accentColor?: string | null;
  customDomain?: string | null;
  emailBrandName?: string | null;
};

export type WorkspaceSettingsSummary = {
  general: {
    canEdit: boolean;
    name: string;
  };
  branding: {
    enabled: boolean;
    configured: boolean;
  };
  permissions: {
    enabled: boolean;
    customPoliciesSupported: boolean;
  };
  billing: {
    canManage: boolean;
    plan: WorkspacePlan;
  };
  dangerZone: {
    canDelete: boolean;
  };
};

export type WorkspacePermissionMatrix = {
  roles: {
    role: WorkspaceRole;
    capabilities: string[];
  }[];
  featureGates: {
    memberManagement: boolean;
    advancedPermissions: boolean;
  };
};

export type UpdateWorkspaceMemberPayload = {
  role?: WorkspaceRole;
  status?: Extract<WorkspaceMemberStatus, "ACTIVE" | "INACTIVE">;
};

export type CreateWorkspaceInvitationPayload = {
  email: string;
  role: Exclude<WorkspaceRole, "OWNER">;
};








export type PlatformWorkspaceItem = WorkspaceSummary & {
  createdBy?: WorkspaceCreatedBy;
  _count: {
    members: number;
    projects: number;
    tasks: number;
  };
};

export type PlatformWorkspacesResponse = {
  items: PlatformWorkspaceItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
