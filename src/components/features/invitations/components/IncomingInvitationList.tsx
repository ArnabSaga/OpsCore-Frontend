"use client";

import { CheckCircle2, ExternalLink, Loader2, ShieldAlert, XCircle } from "lucide-react";
import Link from "next/link";

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

export default function IncomingInvitationList({
  invitations,
  currentUserEmail,
  onAccept,
  onDecline,
  isAccepting,
  isDeclining,
}: {
  invitations: WorkspaceInvitation[];
  currentUserEmail?: string;
  onAccept: (token: string) => Promise<void>;
  onDecline: (token: string) => Promise<void>;
  isAccepting: boolean;
  isDeclining: boolean;
}) {
  if (invitations.length === 0) {
    return (
      <section className="rounded-[24px] border border-dashed border-white/10 bg-[#101828]/60 p-10 text-center">
        <h2 className="text-2xl font-bold text-white">No incoming invitations</h2>
        <p className="mt-3 text-sm text-[#94A3B8]">
          When someone invites you to a workspace, it will appear here.
        </p>
      </section>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {invitations.map((invitation) => {
        const isPending = invitation.status === "PENDING";
        const isLoggedInAsInvitee =
          !!currentUserEmail && currentUserEmail.toLowerCase() === invitation.email.toLowerCase();

        return (
          <article
            key={invitation.id}
            className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#101828]/80 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(127,86,217,0.16),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(105,65,198,0.12),transparent_30%)]" />

            <div className="relative z-10 space-y-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-lg font-semibold text-white">
                      {invitation.workspace?.name ?? "Workspace"}
                    </p>
                    <Badge
                      variant="outline"
                      className={cn(
                        "rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em]",
                        statusClasses(invitation.status)
                      )}
                    >
                      {invitation.status}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#94A3B8]">
                    <span>Invited as {invitation.role}</span>
                    <span>•</span>
                    <span>{invitation.email}</span>
                  </div>
                </div>

                <Button
                  asChild
                  variant="outline"
                  className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
                >
                  <Link href={`/invitations/${invitation.token}`}>
                    Open invite
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#94A3B8]">Invited by</p>
                  <p className="mt-2 text-sm font-medium text-white">
                    {invitation.invitedBy?.name ?? "Workspace Admin"}
                  </p>
                  <p className="mt-1 text-sm text-[#94A3B8]">
                    {invitation.invitedBy?.email ?? "—"}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#94A3B8]">Expires on</p>
                  <p className="mt-2 text-sm font-medium text-white">
                    {formatDate(invitation.expiresAt)}
                  </p>
                </div>
              </div>

              {isPending ? (
                !currentUserEmail ? (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-[#94A3B8]">
                      Sign in with{" "}
                      <span className="font-semibold text-white">{invitation.email}</span> to accept
                      this invitation.
                    </p>
                    <Button
                      asChild
                      className="mt-4 rounded-xl bg-[#7F56D9] text-white hover:bg-[#6941C6]"
                    >
                      <Link href={`/login?callbackUrl=/invitations/${invitation.token}`}>
                        Sign in to continue
                      </Link>
                    </Button>
                  </div>
                ) : !isLoggedInAsInvitee ? (
                  <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4">
                    <div className="flex items-start gap-3">
                      <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
                      <div>
                        <p className="text-sm font-semibold text-white">
                          Signed in with a different account
                        </p>
                        <p className="mt-1 text-sm text-[#D0D5DD]">
                          This invite was sent to{" "}
                          <span className="font-semibold text-amber-300">{invitation.email}</span>.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button
                      onClick={() => onAccept(invitation.token)}
                      disabled={isAccepting || isDeclining}
                      className="h-12 flex-1 rounded-xl bg-[#7F56D9] text-white hover:bg-[#6941C6]"
                    >
                      {isAccepting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                      )}
                      Accept
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => onDecline(invitation.token)}
                      disabled={isAccepting || isDeclining}
                      className="h-12 flex-1 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
                    >
                      {isDeclining ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <XCircle className="mr-2 h-4 w-4" />
                      )}
                      Decline
                    </Button>
                  </div>
                )
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}
