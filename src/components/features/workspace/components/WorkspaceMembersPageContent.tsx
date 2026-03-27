"use client";

import { Users } from "lucide-react";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

import { useWorkspaceCapabilities } from "@/components/features/workspace/hooks/useWorkspaceCapabilities";
import { useWorkspaceMembers } from "@/components/features/workspace/hooks/useWorkspaceMembers";
import ProtectedPageErrorState from "@/components/shared/error-state/ProtectedPageErrorState";
import type { WorkspaceMember } from "@/types/workspace.types";
import RemoveWorkspaceMemberDialog from "./RemoveWorkspaceMemberDialog";
import TransferOwnershipDialog from "./TransferOwnershipDialog";
import UpdateWorkspaceMemberDialog from "./UpdateWorkspaceMemberDialog";
import WorkspaceMembersTable from "./WorkspaceMembersTable";
import WorkspacePageHero from "./WorkspacePageHero";

const WorkspaceMembersPageContent = () => {
  const params = useParams<{ workspaceId: string }>();
  const workspaceId = params.workspaceId;

  const [selectedMember, setSelectedMember] = useState<WorkspaceMember | null>(null);
  const [dialog, setDialog] = useState<"edit" | "remove" | "transfer" | null>(null);

  const { members, isError, refetch } = useWorkspaceMembers(workspaceId);
  const { data: capabilities } = useWorkspaceCapabilities(workspaceId);

  const memberCount = useMemo(() => members.length, [members]);

  if (isError) {
    return (
      <ProtectedPageErrorState
        title="Unable to load members"
        description="We couldn’t fetch workspace members right now."
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <WorkspacePageHero
        eyebrow="Workspace Members"
        title="Manage team access"
        description="Control who belongs to this workspace, assign roles, and transfer workspace ownership when needed."
        backHref={`/workspaces/${workspaceId}`}
        actions={
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#D0D5DD]">
            <Users className="h-4 w-4 text-[#CBB5FF]" />
            {memberCount} members
          </div>
        }
      />

      <WorkspaceMembersTable
        members={members}
        capabilities={capabilities}
        onEdit={(member) => {
          setSelectedMember(member);
          setDialog("edit");
        }}
        onRemove={(member) => {
          setSelectedMember(member);
          setDialog("remove");
        }}
        onTransferOwnership={(member) => {
          setSelectedMember(member);
          setDialog("transfer");
        }}
      />

      <UpdateWorkspaceMemberDialog
        workspaceId={workspaceId}
        member={selectedMember}
        open={dialog === "edit"}
        onOpenChange={(open) => {
          if (!open) {
            setDialog(null);
            setSelectedMember(null);
          }
        }}
      />

      <RemoveWorkspaceMemberDialog
        workspaceId={workspaceId}
        member={selectedMember}
        open={dialog === "remove"}
        onOpenChange={(open) => {
          if (!open) {
            setDialog(null);
            setSelectedMember(null);
          }
        }}
      />

      <TransferOwnershipDialog
        workspaceId={workspaceId}
        member={selectedMember}
        open={dialog === "transfer"}
        onOpenChange={(open) => {
          if (!open) {
            setDialog(null);
            setSelectedMember(null);
          }
        }}
      />
    </div>
  );
};

export default WorkspaceMembersPageContent;
