"use client";

import { useForm } from "@tanstack/react-form";
import { useEffect } from "react";

import { useUpdateWorkspaceMember } from "@/components/features/workspace/hooks/useUpdateWorkspaceMember";
import AppSubmitButton from "@/components/form/AppSubmitButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { WorkspaceMember, WorkspaceMemberStatus, WorkspaceRole } from "@/types/workspace.types";

type Props = {
  workspaceId: string;
  member: WorkspaceMember | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const UpdateWorkspaceMemberDialog = ({ workspaceId, member, open, onOpenChange }: Props) => {
  const { mutateAsync, isPending } = useUpdateWorkspaceMember(workspaceId);

  const form = useForm({
    defaultValues: {
      role: (member?.role ?? "MEMBER") as WorkspaceRole,
      status: (member?.status ?? "ACTIVE") as WorkspaceMemberStatus,
    },
    onSubmit: async ({ value }) => {
      if (!member) return;

      await mutateAsync({
        memberId: member.id,
        payload: {
          role: value.role as WorkspaceRole,
          status: value.status as "ACTIVE" | "INACTIVE",
        },
      });

      onOpenChange(false);
    },
  });

  useEffect(() => {
    if (member && open) {
      form.reset({
        role: member.role,
        status: member.status,
      });
    }
  }, [member, open, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-white/10 bg-[#101828] text-white">
        <DialogHeader>
          <DialogTitle>Update member</DialogTitle>
          <DialogDescription className="text-[#94A3B8]">
            Adjust role and account status for this workspace member.
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field name="role">
            {(field) => (
              <div className="space-y-2">
                <Label className="text-white">Role</Label>
                <Select
                  value={field.state.value as string}
                  onValueChange={(value) => field.handleChange(value as WorkspaceRole)}
                >
                  <SelectTrigger className="border-white/10 bg-white/5 text-white">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-[#101828] text-white">
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="MEMBER">Member</SelectItem>
                    {member?.role === "OWNER" ? <SelectItem value="OWNER">Owner</SelectItem> : null}
                  </SelectContent>
                </Select>
              </div>
            )}
          </form.Field>

          <form.Field name="status">
            {(field) => (
              <div className="space-y-2">
                <Label className="text-white">Status</Label>
                <Select
                  value={field.state.value as string}
                  onValueChange={(value) => field.handleChange(value as WorkspaceMemberStatus)}
                >
                  <SelectTrigger className="border-white/10 bg-white/5 text-white">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-[#101828] text-white">
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </form.Field>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <AppSubmitButton isSubmitting={isPending}>Save Changes</AppSubmitButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateWorkspaceMemberDialog;
