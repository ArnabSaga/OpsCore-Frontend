import { API_ENDPOINTS } from "@/config/api-endpoints";
import { apiFetch } from "@/lib/fetcher";
import { UserRole } from "@/lib/authUtils";
import { WorkspaceSummary } from "@/types/workspace.types";

export type User = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  emailVerified: boolean;
  isActive?: boolean;
  isDeleted?: boolean;
  systemRole?: UserRole;
  needPasswordChange?: boolean;
  activeWorkspaceId?: string | null;
  activeWorkspace?: WorkspaceSummary | null;
  workspaceMembers?: Array<{
    role: string;
    status: string;
    workspace: {
      id: string;
      name: string;
      slug: string;
    };
  }>;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  workspaceName?: string;
};

export type VerifyEmailPayload = {
  email: string;
  otp: string;
};

export type ResendVerificationPayload = {
  email: string;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  email: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
};

export type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type AuthResponse = {
  success?: boolean;
  message?: string;
  data?: {
    user: User;
    [key: string]: unknown;
  };
  user?: User;
};



export const registerUser = async (payload: RegisterPayload): Promise<AuthResponse> => {
  return apiFetch<AuthResponse>({
    endpoint: API_ENDPOINTS.auth.register,
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const verifyEmailCode = async (payload: VerifyEmailPayload): Promise<AuthResponse> => {
  return apiFetch<AuthResponse>({
    endpoint: API_ENDPOINTS.auth.verifyEmail,
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const resendVerificationCode = async (
  payload: ResendVerificationPayload
): Promise<AuthResponse> => {
  return apiFetch<AuthResponse>({
    endpoint: API_ENDPOINTS.auth.resendVerification,
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const forgotPassword = async (payload: ForgotPasswordPayload): Promise<AuthResponse> => {
  return apiFetch<AuthResponse>({
    endpoint: API_ENDPOINTS.auth.forgotPassword,
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const resetPassword = async (payload: ResetPasswordPayload): Promise<AuthResponse> => {
  return apiFetch<AuthResponse>({
    endpoint: API_ENDPOINTS.auth.resetPassword,
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const changePassword = async (payload: ChangePasswordPayload): Promise<AuthResponse> => {
  return apiFetch<AuthResponse>({
    endpoint: API_ENDPOINTS.auth.changePassword,
    method: "POST",
    body: JSON.stringify(payload),
  });
};
