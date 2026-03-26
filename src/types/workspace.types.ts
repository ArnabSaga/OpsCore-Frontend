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
