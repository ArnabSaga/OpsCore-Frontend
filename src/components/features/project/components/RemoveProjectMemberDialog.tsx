"use client";

import { useRemoveProjectMember } from "@/components/features/project/hooks/useRemoveProjectMember";
import AppSubmitButton from "@/components/form/AppSubmitButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ProjectMember } from "@/types/project.types";

type RemoveProjectMemberDialogProps = {
  projectId: string;
  member: ProjectMember | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const RemoveProjectMemberDialog = ({
  projectId,
  member,
  open,
  onOpenChange,
}: RemoveProjectMemberDialogProps) => {
  const { mutateAsync, isPending } = useRemoveProjectMember();

  const handleRemove = async () => {
    if (!member) return;

    await mutateAsync({
      projectId,
      memberId: member.user.id,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-white/10 bg-[#101828] text-white">
        <DialogHeader>
          <DialogTitle>Remove project member</DialogTitle>
          <DialogDescription className="text-[#94A3B8]">
            Remove{" "}
            <span className="font-medium text-white">
              {member?.user.name || member?.user.email}
            </span>{" "}
            from this project? They will lose project-level access and task assignment eligibility.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
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

export default RemoveProjectMemberDialog;
