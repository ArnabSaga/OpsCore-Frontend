"use client";

import { useRemoveWorkspaceMember } from "@/components/features/workspace/hooks/useRemoveWorkspaceMember";
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

const RemoveWorkspaceMemberDialog = ({ workspaceId, member, open, onOpenChange }: Props) => {
  const { mutateAsync, isPending } = useRemoveWorkspaceMember(workspaceId);

  const handleRemove = async () => {
    if (!member) return;
    await mutateAsync(member.id);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-white/10 bg-[#101828] text-white">
        <DialogHeader>
          <DialogTitle>Remove member</DialogTitle>
          <DialogDescription className="text-[#94A3B8]">
            This will remove <span className="font-medium text-white">{member?.user.name}</span>{" "}
            from the workspace.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
          This action may remove access to workspace resources immediately.
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

          <AppSubmitButton isSubmitting={isPending} onClick={handleRemove}>
            Remove Member
          </AppSubmitButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveWorkspaceMemberDialog;
