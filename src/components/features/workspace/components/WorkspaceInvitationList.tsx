"use client";

import { Clock3, RefreshCw, XCircle } from "lucide-react";

import { useExpireWorkspaceInvitation } from "@/components/features/workspace/hooks/useExpireWorkspaceInvitation";
import { useResendWorkspaceInvitation } from "@/components/features/workspace/hooks/useResendWorkspaceInvitation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { WorkspaceCapabilities, WorkspaceInvitation } from "@/types/workspace.types";
import WorkspaceSectionCard from "./WorkspaceSectionCard";

type Props = {
  workspaceId: string;
  invitations: WorkspaceInvitation[];
  capabilities?: WorkspaceCapabilities | null;
  onCancel: (invitation: WorkspaceInvitation) => void;
};

const formatText = (value: string) => value.charAt(0) + value.slice(1).toLowerCase();

const WorkspaceInvitationList = ({ workspaceId, invitations, capabilities, onCancel }: Props) => {
  const { mutateAsync: resendInvitation, isPending: isResending } =
    useResendWorkspaceInvitation(workspaceId);
  const { mutateAsync: expireInvitation, isPending: isExpiring } =
    useExpireWorkspaceInvitation(workspaceId);

  return (
    <WorkspaceSectionCard
      title="Pending & historical invitations"
      description="Track invitation lifecycle and manage resend or expiration actions."
      icon={<Clock3 className="h-4 w-4" />}
    >
      <div className="space-y-3">
        {invitations.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/3 p-8 text-center text-sm text-[#94A3B8]">
            No invitations found for this workspace.
          </div>
        ) : (
          invitations.map((invitation) => (
            <div
              key={invitation.id}
              className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/3 p-4"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-medium text-white">{invitation.email}</p>
                  <p className="mt-1 text-sm text-[#94A3B8]">
                    Expires{" "}
                    {new Intl.DateTimeFormat("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }).format(new Date(invitation.expiresAt))}
                  </p>
                  {invitation.invitedBy ? (
                    <p className="mt-1 text-sm text-[#94A3B8]">
                      Invited by {invitation.invitedBy.name}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="rounded-full border-[#7F56D9]/25 bg-[#7F56D9]/10 text-[#CBB5FF]"
                  >
                    {formatText(invitation.role)}
                  </Badge>

                  <Badge
                    variant="outline"
                    className="rounded-full border-white/10 bg-white/5 text-[#D0D5DD]"
                  >
                    {formatText(invitation.status)}
                  </Badge>
                </div>
              </div>

              {capabilities?.canManageInvitations && invitation.status === "PENDING" ? (
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
                    onClick={() => resendInvitation(invitation.id)}
                    disabled={isResending}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Resend
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="rounded-xl border-[#7F56D9]/25 bg-[#7F56D9]/10 text-[#CBB5FF] hover:bg-[#7F56D9]/20"
                    onClick={() => expireInvitation(invitation.id)}
                    disabled={isExpiring}
                  >
                    <Clock3 className="mr-2 h-4 w-4" />
                    Expire
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="rounded-xl border-red-500/20 bg-red-500/10 text-red-300 hover:bg-red-500/20"
                    onClick={() => onCancel(invitation)}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              ) : null}
            </div>
          ))
        )}
      </div>
    </WorkspaceSectionCard>
  );
};

export default WorkspaceInvitationList;
