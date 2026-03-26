"use client";

import { MailPlus } from "lucide-react";

import ProtectedPageErrorState from "@/components/shared/error-state/ProtectedPageErrorState";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { WorkspaceInvitation } from "@/types/workspace.types";

type Props = {
  invitations: WorkspaceInvitation[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
};

const formatRole = (role: string) => role.charAt(0) + role.slice(1).toLowerCase();
const formatStatus = (status: string) => status.charAt(0) + status.slice(1).toLowerCase();

const WorkspaceInvitationsSection = ({ invitations, isLoading, isError, onRetry }: Props) => {
  if (isLoading) {
    return (
      <Card className="rounded-[24px] border border-white/10 bg-[#1D2939]/80 text-white">
        <CardHeader>
          <Skeleton className="h-6 w-40 bg-white/10" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="rounded-2xl border border-white/10 bg-white/3 p-4">
              <Skeleton className="h-12 w-full bg-white/5" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <ProtectedPageErrorState
        title="Unable to load invitations"
        description="We couldn&apos;t fetch workspace invitations right now."
        onRetry={onRetry}
      />
    );
  }

  return (
    <Card className="rounded-[24px] border border-white/10 bg-[#1D2939]/80 text-white shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-xl">
          <MailPlus className="h-5 w-5 text-[#CBB5FF]" />
          Invitations
        </CardTitle>
        <Badge variant="outline" className="rounded-full border-white/10 bg-white/5 text-[#D0D5DD]">
          {invitations.length}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-3">
        {invitations.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/3 p-6 text-center text-sm text-[#94A3B8]">
            No invitations found for this workspace.
          </div>
        ) : (
          invitations.map((invitation) => (
            <div
              key={invitation.id}
              className="rounded-2xl border border-white/10 bg-white/3 p-4"
            >
              <div className="flex flex-col gap-3">
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
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="rounded-full border-[#7F56D9]/25 bg-[#7F56D9]/10 text-[#CBB5FF]"
                  >
                    {formatRole(invitation.role)}
                  </Badge>

                  <Badge
                    variant="outline"
                    className="rounded-full border-white/10 bg-white/5 text-[#D0D5DD]"
                  >
                    {formatStatus(invitation.status)}
                  </Badge>
                </div>

                {invitation.invitedBy ? (
                  <p className="text-sm text-[#94A3B8]">Invited by {invitation.invitedBy.name}</p>
                ) : null}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default WorkspaceInvitationsSection;
