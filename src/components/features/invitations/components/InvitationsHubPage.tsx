"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Clock3, Loader2, Mail, Sparkles, UserCheck } from "lucide-react";
import { useMemo, useRef } from "react";
import { toast } from "sonner";

import { useAcceptInvitation } from "@/components/features/invitations/hooks/useAcceptInvitation";
import { useCancelInvitation } from "@/components/features/invitations/hooks/useCancelInvitation";
import { useDeclineInvitation } from "@/components/features/invitations/hooks/useDeclineInvitation";
import { useDeleteInvitation } from "@/components/features/invitations/hooks/useDeleteInvitation";
import { useExpireInvitation } from "@/components/features/invitations/hooks/useExpireInvitation";
import { useMyInvitations } from "@/components/features/invitations/hooks/useMyInvitations";
import { useResendInvitation } from "@/components/features/invitations/hooks/useResendInvitation";
import { useWorkspaceInvitationHistory } from "@/components/features/invitations/hooks/useWorkspaceInvitationHistory";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/hooks/useUser";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";
import IncomingInvitationList from "./IncomingInvitationList";
import InvitationCreateCard from "./InvitationCreateCard";
import InvitationHistoryList from "./InvitationHistoryList";

export default function InvitationsHubPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { activeWorkspace, isResolved } = useWorkspaceContext();
  const { data: user } = useUser();

  const canManageInvitations =
    activeWorkspace?.role === "OWNER" || activeWorkspace?.role === "ADMIN";

  const incomingQuery = useMyInvitations();
  const historyQuery = useWorkspaceInvitationHistory(activeWorkspace?.id, {
    enabled: !!activeWorkspace?.id && !!canManageInvitations,
  });

  const { mutateAsync: accept, isPending: isAccepting } = useAcceptInvitation();
  const { mutateAsync: decline, isPending: isDeclining } = useDeclineInvitation();

  const { mutateAsync: cancel, isPending: isCancelling } = useCancelInvitation(
    activeWorkspace?.id ?? ""
  );
  const { mutateAsync: resend, isPending: isResending } = useResendInvitation(
    activeWorkspace?.id ?? ""
  );
  const { mutateAsync: expire, isPending: isExpiring } = useExpireInvitation(
    activeWorkspace?.id ?? ""
  );
  const { mutateAsync: hardDelete, isPending: isDeleting } = useDeleteInvitation(
    activeWorkspace?.id ?? ""
  );

  const incoming = useMemo(() => incomingQuery.data ?? [], [incomingQuery.data]);
  const history = useMemo(() => historyQuery.invitations ?? [], [historyQuery.invitations]);

  const pendingIncomingCount = useMemo(
    () => incoming.filter((item) => item.status === "PENDING").length,
    [incoming]
  );

  const acceptedIncomingCount = useMemo(
    () => incoming.filter((item) => item.status === "ACCEPTED").length,
    [incoming]
  );

  const sentPendingCount = useMemo(
    () => history.filter((item) => item.status === "PENDING").length,
    [history]
  );

  useGSAP(
    () => {
      if (!isResolved) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          "[data-invitations-hero]",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }
        );

        gsap.fromTo(
          "[data-invitation-stat]",
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.06,
            ease: "power3.out",
            delay: 0.08,
          }
        );

        gsap.fromTo(
          "[data-invitation-section]",
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.08,
            ease: "power3.out",
            delay: 0.12,
          }
        );
      }, containerRef);

      return () => ctx.revert();
    },
    { dependencies: [isResolved, incoming.length, history.length], scope: containerRef }
  );

  const handleAccept = async (token: string) => {
    try {
      await accept(token);
      await incomingQuery.refetch();
    } catch (error) {
      const err = error as { message?: string };
      toast.error("Failed to accept invitation", {
        description: err?.message || "Please try again.",
      });
    }
  };

  const handleDecline = async (token: string) => {
    try {
      await decline(token);
      await incomingQuery.refetch();
    } catch (error) {
      const err = error as { message?: string };
      toast.error("Failed to decline invitation", {
        description: err?.message || "Please try again.",
      });
    }
  };

  const handleCancel = async (id: string) => {
    try {
      await cancel(id);
      await historyQuery.refetch();
      toast.success("Invitation canceled");
    } catch (error) {
      const err = error as { message?: string };
      toast.error("Failed to cancel invitation", {
        description: err?.message || "Please try again.",
      });
    }
  };

  const handleResend = async (id: string) => {
    try {
      await resend(id);
      await historyQuery.refetch();
      toast.success("Invitation resent");
    } catch (error) {
      const err = error as { message?: string };
      toast.error("Failed to resend invitation", {
        description: err?.message || "Please try again.",
      });
    }
  };

  const handleExpire = async (id: string) => {
    try {
      await expire(id);
      await historyQuery.refetch();
      toast.success("Invitation expired");
    } catch (error) {
      const err = error as { message?: string };
      toast.error("Failed to expire invitation", {
        description: err?.message || "Please try again.",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await hardDelete(id);
      await historyQuery.refetch();
      toast.success("Invitation deleted");
    } catch (error) {
      const err = error as { message?: string };
      toast.error("Failed to delete invitation", {
        description: err?.message || "Please try again.",
      });
    }
  };

  if (!isResolved || incomingQuery.isLoading || (canManageInvitations && historyQuery.isLoading)) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-[#7F56D9]" />
        <p className="text-[#94A3B8]">Loading invitations...</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="space-y-8">
      <section
        data-invitations-hero
        className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#101828] px-6 py-7 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:px-8"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(127,86,217,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(105,65,198,0.16),transparent_30%)]" />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#7F56D9]/20 bg-[#7F56D9]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#CBB5FF]">
              <Sparkles className="h-3.5 w-3.5" />
              Invitation Center
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Manage incoming invites and workspace access
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-[#94A3B8] md:text-base">
                Review incoming invitations, send new invites from your active workspace, and track
                invitation history from one place.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {activeWorkspace ? (
              <Badge
                variant="outline"
                className="rounded-full border-white/10 bg-white/5 px-4 py-2 text-sm text-white"
              >
                Active workspace: {activeWorkspace.name}
              </Badge>
            ) : null}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div
          data-invitation-stat
          className="rounded-[20px] border border-white/10 bg-[#101828]/70 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.22)]"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#7F56D9]/10 text-[#CBB5FF] ring-1 ring-[#7F56D9]/20">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-[#94A3B8]">Incoming pending</p>
              <p className="text-2xl font-bold text-white">{pendingIncomingCount}</p>
            </div>
          </div>
        </div>

        <div
          data-invitation-stat
          className="rounded-[20px] border border-white/10 bg-[#101828]/70 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.22)]"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/20">
              <UserCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-[#94A3B8]">Accepted incoming</p>
              <p className="text-2xl font-bold text-white">{acceptedIncomingCount}</p>
            </div>
          </div>
        </div>

        <div
          data-invitation-stat
          className="rounded-[20px] border border-white/10 bg-[#101828]/70 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.22)]"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-300 ring-1 ring-amber-500/20">
              <Clock3 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-[#94A3B8]">Sent pending</p>
              <p className="text-2xl font-bold text-white">
                {canManageInvitations ? sentPendingCount : "—"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {activeWorkspace && canManageInvitations ? (
        <div data-invitation-section>
          <InvitationCreateCard
            workspaceId={activeWorkspace.id}
            workspaceName={activeWorkspace.name}
            canManage={true}
          />
        </div>
      ) : null}

      <section data-invitation-section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Incoming invitations</h2>
        </div>

        <IncomingInvitationList
          invitations={incoming}
          currentUserEmail={user?.email}
          onAccept={handleAccept}
          onDecline={handleDecline}
          isAccepting={isAccepting}
          isDeclining={isDeclining}
        />
      </section>

      {activeWorkspace && canManageInvitations ? (
        <section data-invitation-section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Sent / history</h2>
          </div>

          <InvitationHistoryList
            invitations={history}
            onCancel={handleCancel}
            onResend={handleResend}
            onExpire={handleExpire}
            onDelete={handleDelete}
            isCancelling={isCancelling}
            isResending={isResending}
            isExpiring={isExpiring}
            isDeleting={isDeleting}
          />
        </section>
      ) : null}

      {!canManageInvitations ? (
        <section
          data-invitation-section
          className="rounded-[24px] border border-white/10 bg-[#101828]/70 p-6 text-sm text-[#94A3B8]"
        >
          Invitation history and invite creation are available for workspace Owners and Admins only.
        </section>
      ) : null}
    </div>
  );
}
