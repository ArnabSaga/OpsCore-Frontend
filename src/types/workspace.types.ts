export type WorkspacePlan = "FREE" | "PRO" | "ENTERPRISE";
export type WorkspaceRole = "OWNER" | "ADMIN" | "MEMBER";
export type WorkspaceMemberStatus = "ACTIVE" | "INACTIVE" | "INVITED";
export type InvitationStatus = "PENDING" | "ACCEPTED" | "DECLINED" | "EXPIRED" | "CANCELED";

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
  role: Exclude<WorkspaceRole, "OWNER">;
  status: InvitationStatus;
  expiresAt: string;
  createdAt: string;
  invitedBy?: {
    id: string;
    name: string;
    email: string;
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

export type ActivityLogItem = {
  id: string;
  action: string;
  entityType: string;
  entityId: string | null;
  metadata: Record<string, unknown> | null;
  createdAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  } | null;
};

export type ActivityLogResponse = {
  items: ActivityLogItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
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

export type BillingSubscriptionResponse = {
  workspace: {
    id: string;
    name: string;
    slug: string;
    stripeCustomerId: string | null;
  };
  subscription: {
    id: string | null;
    stripeSubscriptionId: string | null;
    stripePriceId: string | null;
    plan: WorkspacePlan;
    status: string;
    currentPeriodStart: string | null;
    currentPeriodEnd: string | null;
    canceledAt: string | null;
    createdAt: string | null;
    updatedAt: string | null;
  };
  planSummary: {
    basePlan: WorkspacePlan;
    effectivePlan: WorkspacePlan;
    isTrialActive: boolean;
    trialStartsAt: string | null;
    trialEndsAt: string | null;
    billingCycleStartsAt: string;
    billingCycleEndsAt: string;
  };
  capabilities: {
    canCheckout: boolean;
    canOpenCustomerPortal: boolean;
  };
};

export type BillingHistoryItem = {
  id: string;
  number: string | null;
  status: string | null;
  currency: string | null;
  total: string | null;
  subtotal: string | null;
  amountPaid: string | null;
  amountDue: string | null;
  hostedInvoiceUrl: string | null;
  invoicePdf: string | null;
  periodStart: string | null;
  periodEnd: string | null;
  createdAt: string | null;
};

export type BillingHistoryResponse = {
  items: BillingHistoryItem[];
  meta: {
    limit: number;
    hasMore: boolean;
    nextCursor: string | null;
  };
};

export type BillingUsageResponse = {
  metrics: {
    resource: string;
    used: number;
    limit: number | null;
  }[];
};
