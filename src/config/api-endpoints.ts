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

  user: {
    platformAll: `${API_PREFIX}/account/platform/all`,
  },

  workspace: {
    my: `${API_PREFIX}/workspaces/my`,
    platformAll: `${API_PREFIX}/workspaces/platform/all`,
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

  project: {
    list: `${API_PREFIX}/projects`,
    create: `${API_PREFIX}/projects`,
    details: (projectId: string) => `${API_PREFIX}/projects/${projectId}`,
    summary: (projectId: string) => `${API_PREFIX}/projects/${projectId}/summary`,
    members: (projectId: string) => `${API_PREFIX}/projects/${projectId}/members`,
    member: (projectId: string, memberId: string) =>
      `${API_PREFIX}/projects/${projectId}/members/${memberId}`,
    tasks: (projectId: string) => `${API_PREFIX}/projects/${projectId}/tasks`,
  },

  task: {
    list: `${API_PREFIX}/tasks`,
    create: `${API_PREFIX}/tasks`,
    details: (taskId: string) => `${API_PREFIX}/tasks/${taskId}`,
    comments: (taskId: string) => `${API_PREFIX}/tasks/${taskId}/comments`,
    comment: (taskId: string, commentId: string) =>
      `${API_PREFIX}/tasks/${taskId}/comments/${commentId}`,
    attachments: (taskId: string) => `${API_PREFIX}/tasks/${taskId}/attachments`,
    attachment: (taskId: string, attachmentId: string) =>
      `${API_PREFIX}/tasks/${taskId}/attachments/${attachmentId}`,
  },

  invoice: {
    list: `${API_PREFIX}/invoices`,
    platformAll: `${API_PREFIX}/platform/invoices`,
    create: `${API_PREFIX}/invoices`,
    details: (invoiceId: string) => `${API_PREFIX}/invoices/${invoiceId}`,
    send: (invoiceId: string) => `${API_PREFIX}/invoices/${invoiceId}/send`,
    markPaid: (invoiceId: string) => `${API_PREFIX}/invoices/${invoiceId}/mark-paid`,
    cancel: (invoiceId: string) => `${API_PREFIX}/invoices/${invoiceId}/cancel`,
    pdf: (invoiceId: string) => `${API_PREFIX}/invoices/${invoiceId}/pdf`,
  },

  activityLog: {
    list: `${API_PREFIX}/activity-logs`,
    details: (logId: string) => `${API_PREFIX}/activity-logs/${logId}`,
  },

  analytics: {
    projects: `${API_PREFIX}/analytics/projects`,
    revenue: `${API_PREFIX}/analytics/revenue`,
  },

  notification: {
    list: `${API_PREFIX}/notifications`,
    unreadSummary: `${API_PREFIX}/notifications/unread-summary`,
    preferences: `${API_PREFIX}/notifications/preferences`,
    details: (notificationId: string) => `${API_PREFIX}/notifications/${notificationId}`,
    markRead: (notificationId: string) => `${API_PREFIX}/notifications/${notificationId}/read`,
    markUnread: (notificationId: string) => `${API_PREFIX}/notifications/${notificationId}/unread`,
    archive: (notificationId: string) => `${API_PREFIX}/notifications/${notificationId}/archive`,
    delete: (notificationId: string) => `${API_PREFIX}/notifications/${notificationId}`,
    markAllRead: `${API_PREFIX}/notifications/read-all`,
  },
} as const;
