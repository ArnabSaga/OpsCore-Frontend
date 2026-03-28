"use client";

import { useForm } from "@tanstack/react-form";
import { MailPlus } from "lucide-react";
import { toast } from "sonner";

import { useCreateWorkspaceInvitation } from "@/components/features/workspace/hooks/useCreateWorkspaceInvitation";
import { createWorkspaceInvitationSchema } from "@/components/features/workspace/validations/workspace-invitation.validation";
import AppField from "@/components/form/AppField";
import AppSubmitButton from "@/components/form/AppSubmitButton";
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

type Props = {
  workspaceId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const InviteWorkspaceMemberDialog = ({ workspaceId, open, onOpenChange }: Props) => {
  const { mutateAsync, isPending } = useCreateWorkspaceInvitation(workspaceId);

  const form = useForm({
    defaultValues: {
      email: "",
      role: "MEMBER" as "ADMIN" | "MEMBER",
    },
    onSubmit: async ({ value }) => {
      const parsed = createWorkspaceInvitationSchema.safeParse(value);
      if (!parsed.success) return;

      try {
        await mutateAsync(parsed.data);
        toast.success("Invitation sent", {
          description: `An invite has been sent to ${parsed.data.email}.`,
        });
        form.reset();
        onOpenChange(false);
      } catch (error) {
        form.reset();
        const err = error as { message?: string };
        toast.error("Failed to send invitation", {
          description: err?.message || "Please try again later.",
        });
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-white/10 bg-[#101828] text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MailPlus className="h-5 w-5 text-[#CBB5FF]" />
            Invite workspace member
          </DialogTitle>
          <DialogDescription className="text-[#94A3B8]">
            Send an invitation to add a new member or admin to this workspace.
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
          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) => {
                const parsed = createWorkspaceInvitationSchema.shape.email.safeParse(value);
                return parsed.success ? undefined : parsed.error.issues[0]?.message;
              },
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Email address"
                type="email"
                placeholder="colleague@company.com"
              />
            )}
          </form.Field>

          <form.Field name="role">
            {(field) => (
              <div className="space-y-2">
                <Label className="text-white">Role</Label>
                <Select
                  value={field.state.value}
                  onValueChange={(val) => field.handleChange(val as "ADMIN" | "MEMBER")}
                >
                  <SelectTrigger className="border-white/10 bg-white/5 text-white">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-[#101828] text-white">
                    <SelectItem value="MEMBER">Member</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </form.Field>

          <div className="flex justify-end">
            <AppSubmitButton isSubmitting={isPending}>Send Invitation</AppSubmitButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteWorkspaceMemberDialog;
