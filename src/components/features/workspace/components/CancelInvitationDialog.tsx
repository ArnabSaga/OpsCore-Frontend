"use client";

import { useCancelWorkspaceInvitation } from "@/components/features/workspace/hooks/useCancelWorkspaceInvitation";
import AppSubmitButton from "@/components/form/AppSubmitButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { WorkspaceInvitation } from "@/types/workspace.types";

type Props = {
  workspaceId: string;
  invitation: WorkspaceInvitation | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const CancelInvitationDialog = ({ workspaceId, invitation, open, onOpenChange }: Props) => {
  const { mutateAsync, isPending } = useCancelWorkspaceInvitation(workspaceId);

  const handleCancel = async () => {
    if (!invitation) return;
    await mutateAsync(invitation.id);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-white/10 bg-[#101828] text-white">
        <DialogHeader>
          <DialogTitle>Cancel invitation</DialogTitle>
          <DialogDescription className="text-[#94A3B8]">
            This will cancel the invitation sent to{" "}
            <span className="font-medium text-white">{invitation?.email}</span>.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
            onClick={() => onOpenChange(false)}
          >
            Keep
          </Button>

          <AppSubmitButton isSubmitting={isPending} onClick={handleCancel}>
            Cancel Invitation
          </AppSubmitButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CancelInvitationDialog;
