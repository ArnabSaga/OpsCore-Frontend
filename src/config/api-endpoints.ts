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
    create: `${API_PREFIX}/workspaces`,
    details: (workspaceId: string) => `${API_PREFIX}/workspaces/${workspaceId}`,
    switch: (workspaceId: string) => `${API_PREFIX}/workspaces/${workspaceId}/switch`,
    members: (workspaceId: string) => `${API_PREFIX}/workspaces/${workspaceId}/members`,
    member: (workspaceId: string, memberId: string) =>
      `${API_PREFIX}/workspaces/${workspaceId}/members/${memberId}`,
    transferOwnership: (workspaceId: string, memberId: string) =>
      `${API_PREFIX}/workspaces/${workspaceId}/members/${memberId}/transfer-ownership`,
    invitations: (workspaceId: string) => `${API_PREFIX}/workspaces/${workspaceId}/invitations`,
    invitation: (workspaceId: string, invitationId: string) =>
      `${API_PREFIX}/workspaces/${workspaceId}/invitations/${invitationId}`,
    resendInvitation: (workspaceId: string, invitationId: string) =>
      `${API_PREFIX}/workspaces/${workspaceId}/invitations/${invitationId}/resend`,
    expireInvitation: (workspaceId: string, invitationId: string) =>
      `${API_PREFIX}/workspaces/${workspaceId}/invitations/${invitationId}/expire`,
    generalSettings: (workspaceId: string) =>
      `${API_PREFIX}/workspaces/${workspaceId}/settings/general`,
    brandingSettings: (workspaceId: string) =>
      `${API_PREFIX}/workspaces/${workspaceId}/settings/branding`,
    settingsSummary: (workspaceId: string) =>
      `${API_PREFIX}/workspaces/${workspaceId}/settings/summary`,
    permissions: (workspaceId: string) =>
      `${API_PREFIX}/workspaces/${workspaceId}/settings/permissions`,
    capabilities: (workspaceId: string) => `${API_PREFIX}/workspaces/${workspaceId}/capabilities`,
    activityLogs: (workspaceId: string) => `${API_PREFIX}/workspaces/${workspaceId}/activity-logs`,
    archive: (workspaceId: string) => `${API_PREFIX}/workspaces/${workspaceId}/archive`,
  },
  invitation: {
    my: `${API_PREFIX}/invitations/my`,
    accept: (token: string) => `${API_PREFIX}/invitations/${token}/accept`,
    decline: (token: string) => `${API_PREFIX}/invitations/${token}/decline`,
    details: (token: string) => `${API_PREFIX}/invitations/${token}`,
  },
  billing: {
    subscription: `${API_PREFIX}/billing/subscription`,
    checkoutSession: `${API_PREFIX}/billing/checkout-session`,
    customerPortal: `${API_PREFIX}/billing/customer-portal`,
    invoices: `${API_PREFIX}/billing/invoices`,
    usage: `${API_PREFIX}/billing/usage`,
  },
};
