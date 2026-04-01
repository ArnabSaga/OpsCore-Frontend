"use client";

import gsap from "gsap";
import { useEffect, useMemo, useRef } from "react";

import NotificationsEmptyState from "@/components/features/notification/components/NotificationsEmptyState";
import NotificationsHero from "@/components/features/notification/components/NotificationsHero";
import NotificationsList from "@/components/features/notification/components/NotificationsList";
import NotificationsSkeleton from "@/components/features/notification/components/NotificationsSkeleton";
import NotificationsToolbar from "@/components/features/notification/components/NotificationsToolbar";
import { useNotificationListFilters } from "@/components/features/notification/hooks/useNotificationListFilters";
import {
  useArchiveNotification,
  useDeleteNotification,
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
  useMarkNotificationUnread,
} from "@/components/features/notification/hooks/useNotificationMutations";
import { useNotifications } from "@/components/features/notification/hooks/useNotifications";
import { useUnreadNotificationSummary } from "@/components/features/notification/hooks/useUnreadNotificationSummary";
import ProtectedPageErrorState from "@/components/shared/error-state/ProtectedPageErrorState";
import { Button } from "@/components/ui/button";

const NotificationsPageContent = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const {
    status,
    entityType,
    type,
    searchTerm,
    page,
    params,
    setStatus,
    setEntityType,
    setType,
    setSearchTerm,
    setPage,
    resetFilters,
  } = useNotificationListFilters();

  const { data, isLoading, isError, refetch, isFetching } = useNotifications({ params });
  const { data: summaryData } = useUnreadNotificationSummary();

  const { mutate: markRead } = useMarkNotificationRead();
  const { mutate: markUnread } = useMarkNotificationUnread();
  const { mutate: archive } = useArchiveNotification();
  const { mutate: remove } = useDeleteNotification();
  const { mutate: markAllRead } = useMarkAllNotificationsRead();

  const notifications = useMemo(() => data?.data ?? [], [data?.data]);
  const meta = data?.meta;

  const summary = summaryData?.data;
  const unreadCount = summary?.totalUnread ?? 0;
  const archivedCount = summary?.totalArchived ?? 0;
  const totalActiveCount = summary?.totalActive ?? 0;

  useEffect(() => {
    if (!containerRef.current || isLoading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-notifications-hero]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );

      gsap.fromTo(
        "[data-notifications-toolbar]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.45, delay: 0.05, ease: "power3.out" }
      );

      gsap.fromTo(
        "[data-notifications-section]",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.42,
          stagger: 0.05,
          delay: 0.08,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading, notifications.length, page]);

  if (isLoading) return <NotificationsSkeleton />;

  if (isError) {
    return (
      <ProtectedPageErrorState
        title="Unable to load notifications"
        description="We couldn't fetch the workspace notifications right now."
        onRetry={() => void refetch()}
      />
    );
  }

  return (
    <div ref={containerRef} className="space-y-8">
      <NotificationsHero
        total={totalActiveCount}
        unread={unreadCount}
        archived={archivedCount}
      />

      <div data-notifications-toolbar>
        <NotificationsToolbar
          status={status}
          entityType={entityType}
          type={type}
          searchTerm={searchTerm}
          onStatusChange={(value) => {
            setStatus(value);
            setPage(1);
          }}
          onEntityTypeChange={(value) => {
            setEntityType(value);
            setPage(1);
          }}
          onTypeChange={(value) => {
            setType(value);
            setPage(1);
          }}
          onSearchTermChange={(value) => {
            setSearchTerm(value);
            setPage(1);
          }}
          onReset={resetFilters}
        />
      </div>

      <div data-notifications-section className="flex justify-end">
        <Button
          onClick={() => markAllRead({ onlyUnread: true })}
          variant="outline"
          className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
        >
          Mark all read
        </Button>
      </div>

      <div data-notifications-section>
        {notifications.length === 0 ? (
          <NotificationsEmptyState />
        ) : (
          <NotificationsList
            notifications={notifications}
            onMarkRead={(id) => markRead(id)}
            onMarkUnread={(id) => markUnread(id)}
            onArchive={(id) => archive(id)}
            onDelete={(id) => remove(id)}
          />
        )}
      </div>

      {meta ? (
        <div
          data-notifications-section
          className="flex items-center justify-between rounded-[24px] border border-white/10 bg-[#101828]/80 p-5 text-white"
        >
          <div className="text-sm text-[#94A3B8]">
            Page <span className="font-semibold text-white">{meta.page}</span> of{" "}
            <span className="font-semibold text-white">{meta.totalPages}</span>
            {isFetching ? <span className="ml-2 text-[#CBB5FF]">Refreshing…</span> : null}
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              disabled={meta.page <= 1}
              onClick={() => setPage(Math.max(meta.page - 1, 1))}
              className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              disabled={meta.page >= meta.totalPages}
              onClick={() => setPage(meta.page + 1)}
              className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              Next
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NotificationsPageContent;
