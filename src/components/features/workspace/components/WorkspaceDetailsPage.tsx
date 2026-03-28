"use client";

import gsap from "gsap";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import WorkspaceAccessNotice from "@/components/features/workspace/components/WorkspaceAccessNotice";
import WorkspaceDetailsHeader from "@/components/features/workspace/components/WorkspaceDetailsHeader";
import WorkspaceInvitationsSection from "@/components/features/workspace/components/WorkspaceInvitationsSection";
import WorkspaceMembersSection from "@/components/features/workspace/components/WorkspaceMembersSection";
import WorkspaceSummaryCards from "@/components/features/workspace/components/WorkspaceSummaryCards";
import { useWorkspaceCapabilities } from "@/components/features/workspace/hooks/useWorkspaceCapabilities";
import { useWorkspaceDetails } from "@/components/features/workspace/hooks/useWorkspaceDetails";
import { useWorkspaceInvitations } from "@/components/features/workspace/hooks/useWorkspaceInvitations";
import { useWorkspaceMembers } from "@/components/features/workspace/hooks/useWorkspaceMembers";
import ProtectedPageErrorState from "@/components/shared/error-state/ProtectedPageErrorState";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";
import InviteWorkspaceMemberDialog from "./InviteWorkspaceMemberDialog";

const WorkspaceDetailsPage = () => {
  const params = useParams<{ workspaceId: string }>();
  const workspaceId = params.workspaceId;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [inviteOpen, setInviteOpen] = useState(false);

  const { workspaces, activeWorkspaceId, switchingWorkspaceId } = useWorkspaceContext();

  const workspaceSummary = useMemo(
    () => workspaces.find((workspace) => workspace.id === workspaceId) ?? null,
    [workspaces, workspaceId]
  );

  const {
    data: workspace,
    isLoading: isWorkspaceLoading,
    isError: isWorkspaceError,
    refetch: refetchWorkspace,
  } = useWorkspaceDetails(workspaceId);

  const {
    members,
    isLoading: isMembersLoading,
    isError: isMembersError,
    isPermissionError: isMembersPermissionError,
    canViewMembers,
    refetch: refetchMembers,
  } = useWorkspaceMembers(workspaceId);

  const {
    invitations,
    isLoading: isInvitationsLoading,
    isError: isInvitationsError,
    isPermissionError: isInvitationsPermissionError,
    canViewInvitations,
    refetch: refetchInvitations,
  } = useWorkspaceInvitations(workspaceId);

  const { data: capabilities } = useWorkspaceCapabilities(workspaceId);

  useEffect(() => {
    if (!containerRef.current || isWorkspaceLoading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-workspace-details-hero]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );

      gsap.fromTo(
        "[data-workspace-details-section]",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.08,
          delay: 0.08,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isWorkspaceLoading, workspaceId]);

  const pendingInvitationsCount = useMemo(() => {
    return invitations.filter((invitation) => invitation.status === "PENDING").length;
  }, [invitations]);

  if (isWorkspaceLoading) {
    return (
      <div className="space-y-6">
        <div className="rounded-[24px] border border-white/10 bg-[#101828] p-6">
          <Skeleton className="h-5 w-40 bg-white/10" />
          <Skeleton className="mt-4 h-10 w-80 bg-white/10" />
          <Skeleton className="mt-3 h-4 w-60 bg-white/5" />
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="rounded-[24px] border border-white/10 bg-[#1D2939]/80 p-5">
              <Skeleton className="h-4 w-24 bg-white/5" />
              <Skeleton className="mt-4 h-8 w-24 bg-white/10" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="rounded-[24px] border border-white/10 bg-[#1D2939]/80 p-6">
            <Skeleton className="h-6 w-40 bg-white/10" />
            <Skeleton className="mt-6 h-36 w-full bg-white/5" />
          </div>
          <div className="rounded-[24px] border border-white/10 bg-[#1D2939]/80 p-6">
            <Skeleton className="h-6 w-40 bg-white/10" />
            <Skeleton className="mt-6 h-36 w-full bg-white/5" />
          </div>
        </div>
      </div>
    );
  }

  if (isWorkspaceError || !workspace) {
    return (
      <ProtectedPageErrorState
        title="Unable to load workspace"
        description="We couldn't fetch this workspace overview right now."
        onRetry={() => {
          void refetchWorkspace();
        }}
      />
    );
  }

  return (
    <div ref={containerRef} className="space-y-6">
      <div data-workspace-details-hero>
        <WorkspaceDetailsHeader
          workspace={workspace}
          workspaceSummary={workspaceSummary}
          isActive={activeWorkspaceId === workspace.id}
          isSwitching={switchingWorkspaceId === workspace.id}
          canManageInvitations={!!capabilities?.canManageInvitations}
          onInviteClick={() => setInviteOpen(true)}
        />
      </div>

      <div data-workspace-details-section>
        <WorkspaceSummaryCards
          workspaceId={workspaceId}
          workspace={workspace}
          membersCount={workspace._count?.members ?? members.length}
          pendingInvitationsCount={pendingInvitationsCount}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div data-workspace-details-section>
          {canViewMembers ? (
            <WorkspaceMembersSection
              members={members}
              isLoading={isMembersLoading}
              isError={!!isMembersError && !isMembersPermissionError}
              onRetry={() => {
                void refetchMembers();
              }}
            />
          ) : (
            <WorkspaceAccessNotice
              title="Members access restricted"
              description="You do not have permission to view workspace members for this workspace."
            />
          )}
        </div>

        <div data-workspace-details-section>
          {canViewInvitations ? (
            <WorkspaceInvitationsSection
              invitations={invitations}
              isLoading={isInvitationsLoading}
              isError={!!isInvitationsError && !isInvitationsPermissionError}
              onRetry={() => {
                void refetchInvitations();
              }}
            />
          ) : (
            <WorkspaceAccessNotice
              title="Invitations access restricted"
              description="You do not have permission to view workspace invitations for this workspace."
            />
          )}
        </div>
      </div>

      <div data-workspace-details-section>
        <Card className="rounded-[24px] border border-white/10 bg-[#101828]/80 text-white shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          <CardContent className="p-6 md:p-7">
            <h3 className="text-lg font-semibold text-white">Workspace metadata</h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#94A3B8]">
                  Slug
                </p>
                <p className="mt-2 text-sm font-medium text-white">/{workspace.slug}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#94A3B8]">
                  Created
                </p>
                <p className="mt-2 text-sm font-medium text-white">
                  {new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }).format(new Date(workspace.createdAt))}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#94A3B8]">
                  Updated
                </p>
                <p className="mt-2 text-sm font-medium text-white">
                  {new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }).format(new Date(workspace.updatedAt))}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#94A3B8]">
                  Workspace ID
                </p>
                <p className="mt-2 truncate text-sm font-medium text-white">{workspace.id}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <InviteWorkspaceMemberDialog
        workspaceId={workspaceId}
        open={inviteOpen}
        onOpenChange={setInviteOpen}
      />
    </div>
  );
};

export default WorkspaceDetailsPage;
