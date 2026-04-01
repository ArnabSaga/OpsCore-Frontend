"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  archiveNotification,
  deleteNotification,
  markAllNotificationsAsRead,
  markNotificationAsRead,
  markNotificationAsUnread,
  updateNotificationPreferences,
  triggerDemoNotification,
} from "@/components/features/notification/api/notification.api";
import { notificationQueryKeys } from "@/components/features/notification/hooks/notification.query-keys";
import type {
  MarkAllNotificationsReadPayload,
  UpdateNotificationPreferencesPayload,
} from "@/components/features/notification/types/notification.types";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";

const invalidateNotificationQueries = async (
  queryClient: ReturnType<typeof useQueryClient>,
  workspaceId: string
) => {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: notificationQueryKeys.lists() }),
    queryClient.invalidateQueries({ queryKey: notificationQueryKeys.unreadSummary(workspaceId) }),
    queryClient.invalidateQueries({ queryKey: notificationQueryKeys.preferences(workspaceId) }),
  ]);
};

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();
  const { activeWorkspaceId } = useWorkspaceContext();

  return useMutation({
    mutationFn: async (notificationId: string) => {
      if (!activeWorkspaceId) throw new Error("No active workspace selected.");
      const res = await markNotificationAsRead(activeWorkspaceId, notificationId);
      return res.data;
    },
    onSuccess: async (_, notificationId) => {
      if (!activeWorkspaceId) return;
      await invalidateNotificationQueries(queryClient, activeWorkspaceId);
      await queryClient.invalidateQueries({
        queryKey: notificationQueryKeys.detail(activeWorkspaceId, notificationId),
      });
    },
  });
};

export const useMarkNotificationUnread = () => {
  const queryClient = useQueryClient();
  const { activeWorkspaceId } = useWorkspaceContext();

  return useMutation({
    mutationFn: async (notificationId: string) => {
      if (!activeWorkspaceId) throw new Error("No active workspace selected.");
      const res = await markNotificationAsUnread(activeWorkspaceId, notificationId);
      return res.data;
    },
    onSuccess: async (_, notificationId) => {
      if (!activeWorkspaceId) return;
      await invalidateNotificationQueries(queryClient, activeWorkspaceId);
      await queryClient.invalidateQueries({
        queryKey: notificationQueryKeys.detail(activeWorkspaceId, notificationId),
      });
    },
  });
};

export const useMarkAllNotificationsRead = () => {
  const queryClient = useQueryClient();
  const { activeWorkspaceId } = useWorkspaceContext();

  return useMutation({
    mutationFn: async (payload?: MarkAllNotificationsReadPayload) => {
      if (!activeWorkspaceId) throw new Error("No active workspace selected.");
      const res = await markAllNotificationsAsRead(activeWorkspaceId, payload);
      return res.data;
    },
    onSuccess: async () => {
      if (!activeWorkspaceId) return;
      await invalidateNotificationQueries(queryClient, activeWorkspaceId);
    },
  });
};

export const useArchiveNotification = () => {
  const queryClient = useQueryClient();
  const { activeWorkspaceId } = useWorkspaceContext();

  return useMutation({
    mutationFn: async (notificationId: string) => {
      if (!activeWorkspaceId) throw new Error("No active workspace selected.");
      const res = await archiveNotification(activeWorkspaceId, notificationId);
      return res.data;
    },
    onSuccess: async (_, notificationId) => {
      if (!activeWorkspaceId) return;
      await invalidateNotificationQueries(queryClient, activeWorkspaceId);
      await queryClient.invalidateQueries({
        queryKey: notificationQueryKeys.detail(activeWorkspaceId, notificationId),
      });
    },
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  const { activeWorkspaceId } = useWorkspaceContext();

  return useMutation({
    mutationFn: async (notificationId: string) => {
      if (!activeWorkspaceId) throw new Error("No active workspace selected.");
      await deleteNotification(activeWorkspaceId, notificationId);
      return notificationId;
    },
    onSuccess: async () => {
      if (!activeWorkspaceId) return;
      await invalidateNotificationQueries(queryClient, activeWorkspaceId);
    },
  });
};

export const useUpdateNotificationPreferences = () => {
  const queryClient = useQueryClient();
  const { activeWorkspaceId } = useWorkspaceContext();

  return useMutation({
    mutationFn: async (payload: UpdateNotificationPreferencesPayload) => {
      if (!activeWorkspaceId) throw new Error("No active workspace selected.");
      const res = await updateNotificationPreferences(activeWorkspaceId, payload);
      return res.data;
    },
    onSuccess: async () => {
      if (!activeWorkspaceId) return;
      await queryClient.invalidateQueries({
        queryKey: notificationQueryKeys.preferences(activeWorkspaceId),
      });
    },
  });
};

export const useTriggerDemoNotification = () => {
  const queryClient = useQueryClient();
  const { activeWorkspaceId } = useWorkspaceContext();

  return useMutation({
    mutationFn: async () => {
      if (!activeWorkspaceId) throw new Error("No active workspace selected.");
      const res = await triggerDemoNotification(activeWorkspaceId);
      return res.data;
    },
    onSuccess: async () => {
      if (!activeWorkspaceId) return;
      await invalidateNotificationQueries(queryClient, activeWorkspaceId);
    },
  });
};
