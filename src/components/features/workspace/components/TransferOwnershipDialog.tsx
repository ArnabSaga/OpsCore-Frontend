"use client";

import { useTransferWorkspaceOwnership } from "@/components/features/workspace/hooks/useTransferWorkspaceOwnership";
import AppSubmitButton from "@/components/form/AppSubmitButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { WorkspaceMember } from "@/types/workspace.types";

type Props = {
  workspaceId: string;
  member: WorkspaceMember | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const TransferOwnershipDialog = ({ workspaceId, member, open, onOpenChange }: Props) => {
  const { mutateAsync, isPending } = useTransferWorkspaceOwnership(workspaceId);

  const handleTransfer = async () => {
    if (!member) return;
    await mutateAsync({ memberId: member.id, confirm: true });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-white/10 bg-[#101828] text-white">
        <DialogHeader>
          <DialogTitle>Transfer ownership</DialogTitle>
          <DialogDescription className="text-[#94A3B8]">
            You are about to make{" "}
            <span className="font-medium text-white">{member?.user.name}</span> the new workspace
            owner.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-2xl border border-[#12B76A]/20 bg-[#12B76A]/10 p-4 text-sm text-[#6CE9A6]">
          Ownership transfer changes administrative and billing authority for this workspace.
        </div>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <AppSubmitButton isSubmitting={isPending} onClick={handleTransfer}>
            Confirm Transfer
          </AppSubmitButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransferOwnershipDialog;
