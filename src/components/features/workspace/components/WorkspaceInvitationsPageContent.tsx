"use client";

import { MailPlus } from "lucide-react";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

import { useWorkspaceCapabilities } from "@/components/features/workspace/hooks/useWorkspaceCapabilities";
import { useWorkspaceInvitations } from "@/components/features/workspace/hooks/useWorkspaceInvitations";
import ProtectedPageErrorState from "@/components/shared/error-state/ProtectedPageErrorState";
import type { WorkspaceInvitation } from "@/types/workspace.types";
import CancelInvitationDialog from "./CancelInvitationDialog";
import CreateWorkspaceInvitationForm from "./CreateWorkspaceInvitationForm";
import WorkspaceInvitationList from "./WorkspaceInvitationList";
import WorkspacePageHero from "./WorkspacePageHero";
import { PendingInvitationsBanner } from "./PendingInvitationsBanner";

const WorkspaceInvitationsPageContent = () => {
  const params = useParams<{ workspaceId: string }>();
  const workspaceId = params.workspaceId;

  const [selectedInvitation, setSelectedInvitation] = useState<WorkspaceInvitation | null>(null);
  const [cancelOpen, setCancelOpen] = useState(false);

  const { invitations, isError, refetch } = useWorkspaceInvitations(workspaceId);
  const { data: capabilities } = useWorkspaceCapabilities(workspaceId);

  const pendingCount = useMemo(
    () => invitations.filter((invitation) => invitation.status === "PENDING").length,
    [invitations]
  );

  if (isError) {
    return (
      <ProtectedPageErrorState
        title="Unable to load invitations"
        description="We couldn’t fetch workspace invitations right now."
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PendingInvitationsBanner />

      <WorkspacePageHero
        eyebrow="Workspace Invitations"
        title="Manage invitations"
        description="Invite new teammates, monitor invitation lifecycle, and manage pending access requests."
        backHref={`/workspaces/${workspaceId}`}
        actions={
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#D0D5DD]">
            <MailPlus className="h-4 w-4 text-[#CBB5FF]" />
            {pendingCount} pending
          </div>
        }
      />

      <CreateWorkspaceInvitationForm
        workspaceId={workspaceId}
        canManage={!!capabilities?.canManageInvitations}
      />

      <WorkspaceInvitationList
        workspaceId={workspaceId}
        invitations={invitations}
        capabilities={capabilities}
        onCancel={(invitation) => {
          setSelectedInvitation(invitation);
          setCancelOpen(true);
        }}
      />

      <CancelInvitationDialog
        workspaceId={workspaceId}
        invitation={selectedInvitation}
        open={cancelOpen}
        onOpenChange={(open) => {
          setCancelOpen(open);
          if (!open) setSelectedInvitation(null);
        }}
      />
    </div>
  );
};

export default WorkspaceInvitationsPageContent;
