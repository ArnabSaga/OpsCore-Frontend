import { Clock3, RefreshCw, XCircle, ListFilter, CheckCircle2, History, Trash2, Link2, User, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { toast } from "sonner";

import { useExpireWorkspaceInvitation } from "@/components/features/workspace/hooks/useExpireWorkspaceInvitation";
import { useResendWorkspaceInvitation } from "@/components/features/workspace/hooks/useResendWorkspaceInvitation";
import { useDeleteWorkspaceInvitation } from "@/components/features/workspace/hooks/useDeleteWorkspaceInvitation";
import { useUser } from "@/hooks/useUser";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { WorkspaceCapabilities, WorkspaceInvitation } from "@/types/workspace.types";
import WorkspaceSectionCard from "./WorkspaceSectionCard";

type Props = {
  workspaceId: string;
  invitations: WorkspaceInvitation[];
  capabilities?: WorkspaceCapabilities | null;
  onCancel: (invitation: WorkspaceInvitation) => void;
};

const formatText = (value: string) => value.charAt(0) + value.slice(1).toLowerCase();

const InvitationItem = ({
  invitation,
  capabilities,
  resendInvitation,
  expireInvitation,
  deleteInvitation,
  onCancel,
  workspaceId,
  currentUserEmail,
  isResending,
  isExpiring,
  isDeleting,
}: {
  invitation: WorkspaceInvitation;
  workspaceId: string;
  capabilities?: WorkspaceCapabilities | null;
  resendInvitation: (id: string) => Promise<WorkspaceInvitation>;
  expireInvitation: (id: string) => Promise<void>;
  deleteInvitation: (id: string) => Promise<void>;
  onCancel: (invitation: WorkspaceInvitation) => void;
  currentUserEmail?: string;
  isResending: boolean;
  isExpiring: boolean;
  isDeleting: boolean;
}) => {
  const isPending = invitation.status === "PENDING";
  const isSelfInvitation = invitation.email === currentUserEmail;
  const isHistorical = ["CANCELED", "EXPIRED", "REJECTED", "ACCEPTED"].includes(invitation.status);

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/3 p-4 transition-all hover:border-white/20 hover:bg-white/5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium text-white">{invitation.email}</p>
            <Badge
              variant="outline"
              className="rounded-full border-[#7F56D9]/25 bg-[#7F56D9]/10 text-[#CBB5FF]"
            >
              {formatText(invitation.role)}
            </Badge>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#94A3B8]">
            <span className="flex items-center gap-1.5">
              <Clock3 className="h-3.5 w-3.5" />
              {isPending ? "Expires" : "Created"}{" "}
              {new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }).format(new Date(isPending ? invitation.expiresAt : invitation.createdAt))}
            </span>
            {invitation.invitedBy ? <span>Invited by {invitation.invitedBy.name}</span> : null}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="rounded-full border-white/10 bg-white/5 text-[#D0D5DD]"
          >
            {formatText(invitation.status)}
          </Badge>
        </div>
      </div>

      {(capabilities?.canManageInvitations && (isPending || isHistorical)) ||
      (isPending && isSelfInvitation) ? (
        <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
          {capabilities?.canManageInvitations && isPending && (
            <>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-9 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
                onClick={() => resendInvitation(invitation.id)}
                disabled={isResending}
              >
                <RefreshCw className="mr-2 h-3.5 w-3.5" />
                Resend
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-9 rounded-xl border-[#7F56D9]/25 bg-[#7F56D9]/10 text-[#CBB5FF] hover:bg-[#7F56D9]/20"
                onClick={() => expireInvitation(invitation.id)}
                disabled={isExpiring}
              >
                <Clock3 className="mr-2 h-3.5 w-3.5" />
                Expire
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-9 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
                onClick={() => {
                  const url = `${window.location.origin}/invitations/${invitation.token}`;
                  navigator.clipboard.writeText(url);
                  toast.success("Link copied", { description: "Invitation link copied to clipboard." });
                }}
              >
                <Link2 className="mr-2 h-3.5 w-3.5" />
                Copy Link
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-9 rounded-xl border-red-500/20 bg-red-500/10 text-red-300 hover:bg-red-500/20"
                onClick={() => onCancel(invitation)}
              >
                <XCircle className="mr-2 h-3.5 w-3.5" />
                Cancel
              </Button>
            </>
          )}

          {isPending && (
            <Button
              asChild
              type="button"
              size="sm"
              className="h-9 rounded-xl bg-[#7F56D9] text-white hover:bg-[#6941C6]"
            >
              <Link href={`/invitations/${invitation.token}`}>
                <ExternalLink className="mr-2 h-3.5 w-3.5" />
                Open Invite Page
              </Link>
            </Button>
          )}

          {invitation.status === "ACCEPTED" && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="h-9 rounded-xl border-[#7F56D9]/25 bg-[#7F56D9]/10 text-[#CBB5FF] hover:bg-[#7F56D9]/20"
            >
              <Link href={`/workspaces/${invitation.workspace?.id ?? workspaceId}/details`}>
                <User className="mr-2 h-3.5 w-3.5" />
                View Member
              </Link>
            </Button>
          )}

          {capabilities?.canManageInvitations && isHistorical && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-9 rounded-xl border-red-500/20 bg-red-500/10 text-red-300 hover:bg-red-500/20"
              onClick={() => deleteInvitation(invitation.id)}
              disabled={isDeleting}
            >
              <Trash2 className="mr-2 h-3.5 w-3.5" />
              Delete Record
            </Button>
          )}
        </div>
      ) : null}
    </div>
  );
};

const EmptyState = ({ message }: { message: string }) => (
  <div className="rounded-2xl border border-dashed border-white/10 bg-white/3 p-12 text-center text-sm text-[#94A3B8]">
    {message}
  </div>
);

const WorkspaceInvitationList = ({ workspaceId, invitations, capabilities, onCancel }: Props) => {
  const { mutateAsync: resendInvitation, isPending: isResending } =
    useResendWorkspaceInvitation(workspaceId);
  const { mutateAsync: expireInvitation, isPending: isExpiring } =
    useExpireWorkspaceInvitation(workspaceId);
  const { mutateAsync: deleteInvitation, isPending: isDeleting } =
    useDeleteWorkspaceInvitation(workspaceId);

  const { data: user } = useUser();

  const pendingInvitations = useMemo(
    () => invitations.filter((inv) => inv.status === "PENDING"),
    [invitations]
  );
  const acceptedInvitations = useMemo(
    () => invitations.filter((inv) => inv.status === "ACCEPTED"),
    [invitations]
  );
  const historyInvitations = useMemo(
    () =>
      invitations.filter((inv) =>
        ["REJECTED", "DECLINED", "EXPIRED", "CANCELED"].includes(inv.status)
      ),
    [invitations]
  );

  return (
    <WorkspaceSectionCard
      title="Invitation management"
      description="Track workspace invitation lifecycle and manage active access requests."
      icon={<Clock3 className="h-4 w-4" />}
    >
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6 h-11 w-full justify-start gap-2 rounded-2xl border border-white/10 bg-[#0C111D] p-1.5 md:w-auto">
          <TabsTrigger
            value="all"
            className="rounded-xl px-4 text-sm font-medium transition-all data-[state=active]:bg-[#7F56D9] data-[state=active]:text-white data-[state=active]:shadow-[0_2px_10px_rgba(127,86,217,0.3)]"
          >
            <ListFilter className="mr-2 h-4 w-4" />
            All ({invitations.length})
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            className="rounded-xl px-4 text-sm font-medium transition-all data-[state=active]:bg-[#7F56D9] data-[state=active]:text-white data-[state=active]:shadow-[0_2px_10px_rgba(127,86,217,0.3)]"
          >
            <Clock3 className="mr-2 h-4 w-4" />
            Pending ({pendingInvitations.length})
          </TabsTrigger>
          <TabsTrigger
            value="accepted"
            className="rounded-xl px-4 text-sm font-medium transition-all data-[state=active]:bg-[#7F56D9] data-[state=active]:text-white data-[state=active]:shadow-[0_2px_10px_rgba(127,86,217,0.3)]"
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Accepted ({acceptedInvitations.length})
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="rounded-xl px-4 text-sm font-medium transition-all data-[state=active]:bg-[#7F56D9] data-[state=active]:text-white data-[state=active]:shadow-[0_2px_10px_rgba(127,86,217,0.3)]"
          >
            <History className="mr-2 h-4 w-4" />
            History ({historyInvitations.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0 space-y-3">
          {invitations.length === 0 ? (
            <EmptyState message="No invitations found." />
          ) : (
            invitations.map((inv) => (
              <InvitationItem
                key={inv.id}
                invitation={inv}
                workspaceId={workspaceId}
                capabilities={capabilities}
                resendInvitation={resendInvitation}
                expireInvitation={expireInvitation}
                deleteInvitation={deleteInvitation}
                onCancel={onCancel}
                currentUserEmail={user?.email}
                isResending={isResending}
                isExpiring={isExpiring}
                isDeleting={isDeleting}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="pending" className="mt-0 space-y-3">
          {pendingInvitations.length === 0 ? (
            <EmptyState message="No pending invitations." />
          ) : (
            pendingInvitations.map((inv) => (
              <InvitationItem
                key={inv.id}
                invitation={inv}
                workspaceId={workspaceId}
                capabilities={capabilities}
                resendInvitation={resendInvitation}
                expireInvitation={expireInvitation}
                deleteInvitation={deleteInvitation}
                onCancel={onCancel}
                currentUserEmail={user?.email}
                isResending={isResending}
                isExpiring={isExpiring}
                isDeleting={isDeleting}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="accepted" className="mt-0 space-y-3">
          {acceptedInvitations.length === 0 ? (
            <EmptyState message="No accepted invitations." />
          ) : (
            acceptedInvitations.map((inv) => (
              <InvitationItem
                key={inv.id}
                invitation={inv}
                workspaceId={workspaceId}
                capabilities={capabilities}
                resendInvitation={resendInvitation}
                expireInvitation={expireInvitation}
                deleteInvitation={deleteInvitation}
                onCancel={onCancel}
                currentUserEmail={user?.email}
                isResending={isResending}
                isExpiring={isExpiring}
                isDeleting={isDeleting}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="history" className="mt-0 space-y-3">
          {historyInvitations.length === 0 ? (
            <EmptyState message="No historical invitations." />
          ) : (
            historyInvitations.map((inv) => (
              <InvitationItem
                key={inv.id}
                invitation={inv}
                workspaceId={workspaceId}
                capabilities={capabilities}
                resendInvitation={resendInvitation}
                expireInvitation={expireInvitation}
                deleteInvitation={deleteInvitation}
                onCancel={onCancel}
                currentUserEmail={user?.email}
                isResending={isResending}
                isExpiring={isExpiring}
                isDeleting={isDeleting}
              />
            ))
          )}
        </TabsContent>
      </Tabs>
    </WorkspaceSectionCard>
  );
};

export default WorkspaceInvitationList;
