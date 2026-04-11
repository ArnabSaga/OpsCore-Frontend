"use client";

import { useForm } from "@tanstack/react-form";
import { MailPlus } from "lucide-react";
import { toast } from "sonner";

import { useCreateInvitation } from "@/components/features/invitations/hooks/useCreateInvitation";
import { createInvitationSchema } from "@/components/features/invitations/validation/invitation.validation";
import AppSubmitButton from "@/components/form/AppSubmitButton";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function InvitationCreateCard({
  workspaceId,
  workspaceName,
  canManage,
}: {
  workspaceId: string;
  workspaceName?: string;
  canManage: boolean;
}) {
  const { mutateAsync, isPending } = useCreateInvitation(workspaceId);

  const form = useForm({
    defaultValues: {
      email: "",
      role: "MEMBER" as "ADMIN" | "MEMBER",
    },
    onSubmit: async ({ value }) => {
      const parsed = createInvitationSchema.safeParse(value);
      if (!parsed.success) return;

      try {
        await mutateAsync(parsed.data);
        toast.success("Invitation sent", {
          description: `An invite has been sent to ${parsed.data.email}.`,
        });
        form.reset();
      } catch (error) {
        const err = error as { message?: string };
        toast.error("Failed to send invitation", {
          description: err?.message || "Please try again later.",
        });
      }
    },
  });

  if (!canManage) return null;

  return (
    <section className="rounded-[24px] border border-white/10 bg-[#101828]/80 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl">
      <div className="mb-6 flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7F56D9]/10 text-[#CBB5FF] ring-1 ring-[#7F56D9]/20">
          <MailPlus className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white">Invite a teammate</h2>
          <p className="mt-1 text-sm text-[#94A3B8]">
            Send an invitation directly to your active workspace
            {workspaceName ? ` — ${workspaceName}` : ""}.
          </p>
        </div>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          void form.handleSubmit();
        }}
        className="grid gap-4 md:grid-cols-[1fr_180px_auto]"
      >
        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) =>
              createInvitationSchema.shape.email.safeParse(value).success
                ? undefined
                : "Enter a valid email address",
          }}
        >
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name} className="text-sm text-[#D0D5DD]">
                Email address
              </Label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                onBlur={field.handleBlur}
                placeholder="teammate@company.com"
                className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none placeholder:text-[#667085] focus:border-[#7F56D9]/40"
              />
              {field.state.meta.errors[0] ? (
                <p className="text-xs text-red-400">{field.state.meta.errors[0]}</p>
              ) : null}
            </div>
          )}
        </form.Field>

        <form.Field name="role">
          {(field) => (
            <div className="space-y-2">
              <Label className="text-sm text-[#D0D5DD]">Role</Label>
              <Select
                value={field.state.value}
                onValueChange={(value) => field.handleChange(value as "ADMIN" | "MEMBER")}
              >
                <SelectTrigger className="h-12 rounded-xl border-white/10 bg-white/5 text-white">
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

        <div className="flex items-end">
          <AppSubmitButton
            isSubmitting={isPending}
            className="h-12 w-full rounded-xl bg-[#7F56D9] text-white hover:bg-[#6941C6] md:w-auto"
          >
            Send invite
          </AppSubmitButton>
        </div>
      </form>
    </section>
  );
}
