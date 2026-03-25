import { env } from "@/env";

export const API_PREFIX = env.NEXT_PUBLIC_API_PREFIX;

export const API_ENDPOINTS = {
  auth: {
    login: `${API_PREFIX}/auth/login`,
    logout: `${API_PREFIX}/auth/logout`,
    googleLogin: `${API_PREFIX}/auth/login/google`,
    register: `${API_PREFIX}/auth/register`,
    verifyEmail: `${API_PREFIX}/auth/verify-email`,
    resendVerification: `${API_PREFIX}/auth/resend-verification`,
    forgotPassword: `${API_PREFIX}/auth/forgot-password`,
    resetPassword: `${API_PREFIX}/auth/reset-password`,
    changePassword: `${API_PREFIX}/auth/change-password`,
    me: `${API_PREFIX}/auth/me`,
  },
  workspace: {
    my: `${API_PREFIX}/workspaces/my`,
    switch: `${API_PREFIX}/auth/workspace/switch`,
  },
};
