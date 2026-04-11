"use client";

import gsap from "gsap";
import { CheckCircle2, ShieldAlert, Sparkles, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAcceptInvitation } from "../hooks/useAcceptInvitation";
import { useDeclineInvitation } from "../hooks/useDeclineInvitation";
import { useInvitationDetails } from "../hooks/useInvitationDetails";
import { useUser } from "@/hooks/useUser";

type Props = {
  token: string;
};

const InvitationResponsePageContent = ({ token }: Props) => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { data: invitation, isLoading, isError } = useInvitationDetails(token);
  const { data: user, isLoading: isLoadingUser } = useUser();
  const { mutateAsync: accept, isPending: isAccepting } = useAcceptInvitation();
  const { mutateAsync: decline, isPending: isDeclining } = useDeclineInvitation();

  useEffect(() => {
    if (!containerRef.current || isLoading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-invitation-card]",
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading]);

  const handleAccept = async () => {
    try {
      await accept(token);
      router.push("/dashboard");
    } catch {
       // Error handled by mutation
    }
  };

  const handleDecline = async () => {
    try {
      await decline(token);
      router.push("/workspaces");
    } catch {
       // Error handled by mutation
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-[#7F56D9]" />
        <p className="text-[#94A3B8]">Fetching invitation details...</p>
      </div>
    );
  }

  if (isError || !invitation) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl border border-red-500/20 bg-red-500/10 shadow-[0_20px_50px_rgba(239,68,68,0.15)]">
          <ShieldAlert className="h-10 w-10 text-red-400" />
        </div>
        <h1 className="text-3xl font-bold text-white">Invalid or Expired Invitation</h1>
        <p className="mt-4 max-w-md text-[#94A3B8]">
          This invitation link is no longer valid or has already been used. Please contact the
          workspace administrator for a new invitation.
        </p>
        <Button
          asChild
          variant="outline"
          className="mt-8 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
        >
          <Link href="/workspaces">Back to Workspaces</Link>
        </Button>
      </div>
    );
  }

  const isPending = invitation.status === "PENDING";

  return (
    <div ref={containerRef} className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <Card
        data-invitation-card
        className="relative w-full max-w-xl overflow-hidden rounded-[32px] border border-white/10 bg-[#101828] text-white shadow-[0_24px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(127,86,217,0.22),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(105,65,198,0.16),transparent_35%)]" />

        <CardContent className="relative z-10 p-8 md:p-12">
          <div className="flex flex-col items-center text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#7F56D9]/20 bg-[#7F56D9]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#CBB5FF]">
              <Sparkles className="h-3.5 w-3.5" />
              Workspace Invitation
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              You&apos;ve been invited!
            </h1>

            <p className="mt-6 text-lg text-[#94A3B8]">
              <span className="font-semibold text-white">{invitation.invitedBy?.name ?? "Someone"}</span> has invited you to join <span className="font-semibold text-white">{invitation.workspace?.name ?? "their workspace"}</span>.
            </p>

            <div className="mt-10 w-full space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              {invitation.workspace && (
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <span className="text-sm font-medium text-[#94A3B8]">Workspace</span>
                  <span className="text-sm font-semibold text-white">{invitation.workspace.name}</span>
                </div>
              )}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <span className="text-sm font-medium text-[#94A3B8]">Role</span>
                <span className="inline-flex items-center rounded-full bg-[#7F56D9]/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#CBB5FF]">
                  {invitation.role}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <span className="text-sm font-medium text-[#94A3B8]">Status</span>
                <span className="text-sm font-semibold text-white">{invitation.status}</span>
              </div>
               {invitation.planMeta && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#94A3B8]">Workspace Plan</span>
                  <span className="text-sm font-semibold text-white">{invitation.planMeta.workspacePlan}</span>
                </div>
              )}
            </div>

            {isPending ? (
              isLoadingUser ? (
                <div className="mt-12 flex w-full flex-col items-center gap-4">
                  <Loader2 className="h-8 w-8 animate-spin text-[#7F56D9]" />
                  <p className="text-[#94A3B8]">Verifying your account...</p>
                </div>
              ) : !user ? (
                <div className="mt-12 w-full space-y-6">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
                    <p className="text-[#94A3B8]">
                      You need to be signed in to accept this invitation.
                    </p>
                    <Button
                      asChild
                      className="mt-4 h-12 w-full rounded-xl bg-[#7F56D9] text-white hover:bg-[#6941C6]"
                    >
                      <Link href={`/login?callbackUrl=/invitations/${token}`}>
                        Sign in to continue
                      </Link>
                    </Button>
                  </div>
                </div>
              ) : user.email.toLowerCase() !== invitation.email.toLowerCase() ? (
                <div className="mt-12 w-full space-y-6">
                  <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-6 text-center shadow-[0_10px_30px_rgba(245,158,11,0.1)]">
                    <ShieldAlert className="mx-auto mb-3 h-10 w-10 text-amber-400" />
                    <p className="font-medium text-white">Email Mismatch</p>
                    <p className="mt-2 text-sm text-[#94A3B8]">
                      This invitation was sent to <span className="font-semibold text-amber-300">{invitation.email}</span>,
                      but you are currently signed in as <span className="font-semibold text-white">{user.email}</span>.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button
                      asChild
                      variant="outline"
                      className="h-12 w-full rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
                    >
                      <Link href="/workspaces">Go to my workspaces</Link>
                    </Button>
                    <p className="text-center text-xs text-[#94A3B8]">
                      Please sign in with the correct account to accept this invitation.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-12 flex w-full flex-col gap-4 sm:flex-row">
                  <Button
                    onClick={handleAccept}
                    disabled={isAccepting || isDeclining}
                    className="h-14 flex-1 rounded-2xl bg-[#7F56D9] text-lg font-bold text-white shadow-[0_10px_30px_rgba(127,86,217,0.3)] hover:bg-[#6941C6] hover:shadow-[0_10px_40px_rgba(127,86,217,0.4)]"
                  >
                    {isAccepting ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                      <CheckCircle2 className="mr-2 h-5 w-5" />
                    )}
                    Accept Invitation
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleDecline}
                    disabled={isAccepting || isDeclining}
                    className="h-14 flex-1 rounded-2xl border-white/10 bg-white/5 text-lg font-bold text-white hover:bg-white/10"
                  >
                    {isDeclining ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                      <XCircle className="mr-2 h-5 w-5" />
                    )}
                    Decline
                  </Button>
                </div>
              )
            ) : (
              <div className="mt-12 w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                <p className="text-[#94A3B8]">
                  This invitation is already <span className="font-bold text-white">{invitation.status.toLowerCase()}</span>.
                </p>
                <Button
                  asChild
                  variant="link"
                  className="mt-2 text-[#CBB5FF] hover:text-white"
                >
                  <Link href="/workspaces">Go to my workspaces</Link>
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvitationResponsePageContent;
