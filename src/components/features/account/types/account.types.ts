import type { ApiResponse } from "@/types/api.types";

export type AccountWorkspaceMembership = {
  role: string;
  status: string;
  workspace: {
    id: string;
    name: string;
    slug: string;
  };
};

export type AccountProfile = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  systemRole: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  workspaceMembers: AccountWorkspaceMembership[];
};

export type AccountProfileResponse = ApiResponse<AccountProfile>;

export type UpdateAccountProfilePayload = {
  name?: string;
  removeImage?: boolean;
  photo?: File | null;
};

export type UpdateAccountPasswordPayload = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
