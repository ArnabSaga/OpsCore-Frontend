"use client";

import { CheckCircle2, Clock3, History, Loader2, RefreshCcw, Trash2, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { WorkspaceInvitation } from "@/types/workspace.types";

function formatDate(value?: string | null) {
  if (!value) return "—";
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return "—";
  }
}

function statusClasses(status: WorkspaceInvitation["status"]) {
  switch (status) {
    case "PENDING":
      return "border-amber-500/20 bg-amber-500/10 text-amber-300";
    case "ACCEPTED":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-300";
    case "DECLINED":
    case "REJECTED":
    case "CANCELED":
      return "border-red-500/20 bg-red-500/10 text-red-300";
    case "EXPIRED":
      return "border-white/10 bg-white/5 text-[#D0D5DD]";
    default:
      return "border-white/10 bg-white/5 text-[#D0D5DD]";
  }
}

export default function InvitationHistoryList({
  invitations,
  onCancel,
  onResend,
  onExpire,
  onDelete,
  isCancelling,
  isResending,
  isExpiring,
  isDeleting,
}: {
  invitations: WorkspaceInvitation[];
  onCancel: (invitationId: string) => Promise<void>;
  onResend: (invitationId: string) => Promise<void>;
  onExpire: (invitationId: string) => Promise<void>;
  onDelete: (invitationId: string) => Promise<void>;
  isCancelling: boolean;
  isResending: boolean;
  isExpiring: boolean;
  isDeleting: boolean;
}) {
  if (invitations.length === 0) {
    return (
      <section className="rounded-[24px] border border-dashed border-white/10 bg-[#101828]/60 p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#7F56D9]/10 text-[#CBB5FF] ring-1 ring-[#7F56D9]/20">
          <History className="h-6 w-6" />
        </div>
        <h2 className="mt-5 text-2xl font-bold text-white">No invitation history yet</h2>
        <p className="mt-3 text-sm text-[#94A3B8]">
          Sent, expired, canceled, and accepted invitations will appear here.
        </p>
      </section>
    );
  }

  return (
    <div className="space-y-4">
      {invitations.map((invitation) => {
        const isPending = invitation.status === "PENDING";

        return (
          <article
            key={invitation.id}
            className="rounded-[24px] border border-white/10 bg-[#101828]/80 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-lg font-semibold text-white">{invitation.email}</p>
                  <Badge
                    variant="outline"
                    className={cn(
                      "rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em]",
                      statusClasses(invitation.status)
                    )}
                  >
                    {invitation.status}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="rounded-full border-white/10 bg-white/5 text-[#D0D5DD]"
                  >
                    {invitation.role}
                  </Badge>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-[#94A3B8]">Sent on</p>
                    <p className="mt-2 text-sm font-medium text-white">
                      {formatDate(invitation.createdAt)}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-[#94A3B8]">Expires on</p>
                    <p className="mt-2 text-sm font-medium text-white">
                      {formatDate(invitation.expiresAt)}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-[#94A3B8]">Accepted</p>
                    <p className="mt-2 text-sm font-medium text-white">
                      {formatDate(invitation.acceptedAt)}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-[#94A3B8]">
                      Declined / canceled
                    </p>
                    <p className="mt-2 text-sm font-medium text-white">
                      {formatDate(invitation.rejectedAt ?? invitation.canceledAt)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                {isPending ? (
                  <>
                    <Button
                      onClick={() => onResend(invitation.id)}
                      disabled={isResending || isCancelling || isExpiring || isDeleting}
                      className="rounded-xl bg-[#7F56D9] text-white hover:bg-[#6941C6]"
                    >
                      {isResending ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <RefreshCcw className="mr-2 h-4 w-4" />
                      )}
                      Resend
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => onCancel(invitation.id)}
                      disabled={isResending || isCancelling || isExpiring || isDeleting}
                      className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
                    >
                      {isCancelling ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <XCircle className="mr-2 h-4 w-4" />
                      )}
                      Cancel
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => onExpire(invitation.id)}
                      disabled={isResending || isCancelling || isExpiring || isDeleting}
                      className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
                    >
                      {isExpiring ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Clock3 className="mr-2 h-4 w-4" />
                      )}
                      Expire
                    </Button>
                  </>
                ) : invitation.status === "ACCEPTED" ? (
                  <div className="inline-flex items-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Accepted
                  </div>
                ) : null}

                <Button
                  variant="outline"
                  onClick={() => onDelete(invitation.id)}
                  disabled={isDeleting || isResending || isCancelling || isExpiring}
                  className="rounded-xl border-red-500/20 bg-red-500/10 text-red-300 hover:bg-red-500/15"
                >
                  {isDeleting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="mr-2 h-4 w-4" />
                  )}
                  Delete
                </Button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
