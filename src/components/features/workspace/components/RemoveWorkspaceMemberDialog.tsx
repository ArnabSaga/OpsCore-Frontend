"use client";

import { useRemoveWorkspaceMember } from "@/components/features/workspace/hooks/useRemoveWorkspaceMember";
import type { WorkspaceMember } from "@/types/workspace.types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AppSubmitButton from "@/components/form/AppSubmitButton";

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
            Are you sure you want to remove <span className="font-medium text-white">{member?.user.name || member?.user.email}</span> from this workspace? They will lose access to all projects and data.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>

          <AppSubmitButton
            variant="destructive"
            isSubmitting={isPending}
            onClick={handleRemove}
            className="bg-red-600 font-medium hover:bg-red-700"
          >
            Remove Member
          </AppSubmitButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveWorkspaceMemberDialog;
