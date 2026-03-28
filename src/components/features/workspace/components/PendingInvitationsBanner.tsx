"use client";

import { Bell, CheckCircle2, Clock3, ExternalLink, XCircle } from "lucide-react";
import Link from "next/link";
import { useAcceptInvitation } from "@/components/features/workspace/hooks/useAcceptInvitation";
import { useDeclineInvitation } from "@/components/features/workspace/hooks/useDeclineInvitation";
import { useMyInvitations } from "@/components/features/workspace/hooks/useMyInvitations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { WorkspaceInvitation } from "@/types/workspace.types";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const InvitationCard = ({ invitation }: { invitation: WorkspaceInvitation }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutateAsync: accept, isPending: isAccepting } = useAcceptInvitation();
  const { mutateAsync: decline, isPending: isDeclining } = useDeclineInvitation();

  const handleAccept = async () => {
    await accept(invitation.token);
    await queryClient.invalidateQueries({ queryKey: ["my-invitations"] });
    router.push("/dashboard");
  };

  const handleDecline = async () => {
    await decline(invitation.token);
    await queryClient.invalidateQueries({ queryKey: ["my-invitations"] });
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-[#7F56D9]/20 bg-[#7F56D9]/5 p-4 backdrop-blur-sm transition-all hover:border-[#7F56D9]/30 hover:bg-[#7F56D9]/8 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-white">
            {invitation.workspace?.name ?? "Unknown Workspace"}
          </p>
          <Badge
            variant="outline"
            className="rounded-full border-[#7F56D9]/25 bg-[#7F56D9]/10 text-[#CBB5FF] text-xs"
          >
            {invitation.role.charAt(0) + invitation.role.slice(1).toLowerCase()}
          </Badge>
        </div>
        <div className="flex items-center gap-3 text-sm text-[#94A3B8]">
          {invitation.invitedBy && (
            <span>Invited by <span className="text-white">{invitation.invitedBy.name}</span></span>
          )}
          <span className="flex items-center gap-1">
            <Clock3 className="h-3.5 w-3.5" />
            Expires{" "}
            {new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "numeric",
            }).format(new Date(invitation.expiresAt))}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Button
          size="sm"
          className="h-9 rounded-xl bg-[#7F56D9] text-white hover:bg-[#6941C6]"
          onClick={handleAccept}
          disabled={isAccepting || isDeclining}
        >
          <CheckCircle2 className="mr-2 h-3.5 w-3.5" />
          {isAccepting ? "Accepting..." : "Accept"}
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="h-9 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
          onClick={handleDecline}
          disabled={isAccepting || isDeclining}
        >
          <XCircle className="mr-2 h-3.5 w-3.5" />
          {isDeclining ? "Declining..." : "Decline"}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          asChild
          className="h-9 rounded-xl text-[#94A3B8] hover:text-white"
        >
          <Link href={`/invitations/${invitation.token}`}>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export const PendingInvitationsBanner = () => {
  const { data: invitations, isLoading } = useMyInvitations();

  if (isLoading || !invitations || invitations.length === 0) return null;

  return (
    <div className="mb-6 rounded-2xl border border-[#7F56D9]/20 bg-[#0C111D] p-6 shadow-[0_4px_24px_rgba(127,86,217,0.12)]">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#7F56D9]/15 text-[#CBB5FF]">
          <Bell className="h-4 w-4" />
        </div>
        <div>
          <p className="font-semibold text-white">
            You have {invitations.length} pending workspace invitation{invitations.length > 1 ? "s" : ""}
          </p>
          <p className="text-sm text-[#94A3B8]">Review and respond to your workspace invitations.</p>
        </div>
      </div>
      <div className="space-y-3">
        {invitations.map((inv) => (
          <InvitationCard key={inv.id} invitation={inv} />
        ))}
      </div>
    </div>
  );
};
