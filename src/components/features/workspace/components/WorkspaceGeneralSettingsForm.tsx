"use client";

import { useForm } from "@tanstack/react-form";
import { Settings2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";

import { useUpdateWorkspaceGeneralSettings } from "@/components/features/workspace/hooks/useUpdateWorkspaceGeneralSettings";
import { useWorkspaceGeneralSettings } from "@/components/features/workspace/hooks/useWorkspaceGeneralSettings";
import { updateWorkspaceGeneralSchema } from "@/components/features/workspace/validations/workspace-settings.validation";
import AppField from "@/components/form/AppField";
import AppSubmitButton from "@/components/form/AppSubmitButton";
import ProtectedPageErrorState from "@/components/shared/error-state/ProtectedPageErrorState";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import WorkspacePageHero from "./WorkspacePageHero";
import WorkspaceSectionCard from "./WorkspaceSectionCard";
import WorkspaceSettingsShell from "./WorkspaceSettingsShell";

const WorkspaceGeneralSettingsForm = () => {
  const params = useParams<{ workspaceId: string }>();
  const workspaceId = params.workspaceId;

  const { data, isError, refetch } = useWorkspaceGeneralSettings(workspaceId);

  const { mutateAsync, isPending } = useUpdateWorkspaceGeneralSettings(workspaceId);

  const initialValues = useMemo(
    () => ({
      name: data?.name ?? "",
      description: data?.description ?? "",
      timezone: data?.timezone ?? "",
      currency: data?.currency ?? "",
      supportEmail: data?.supportEmail ?? "",
      billingEmail: data?.billingEmail ?? "",
    }),
    [data]
  );

  const form = useForm({
    defaultValues: initialValues,
    onSubmit: async ({ value }) => {
      const parsed = updateWorkspaceGeneralSchema.safeParse({
        ...value,
        description: value.description || null,
        timezone: value.timezone || null,
        currency: value.currency || null,
        supportEmail: value.supportEmail || null,
        billingEmail: value.billingEmail || null,
      });

      if (!parsed.success) return;

      await mutateAsync(parsed.data);
    },
  });

  useEffect(() => {
    form.reset(initialValues);
  }, [initialValues, form]);

  if (isError) {
    return (
      <ProtectedPageErrorState
        title="Unable to load general settings"
        description="We couldn’t fetch workspace general settings right now."
        onRetry={() => void refetch()}
      />
    );
  }

  const isUnchanged = JSON.stringify(form.state.values) === JSON.stringify(initialValues);

  return (
    <WorkspaceSettingsShell
      hero={
        <WorkspacePageHero
          eyebrow="General Settings"
          title="Workspace profile"
          description="Update your core workspace identity and operational contact information."
          backHref={`/workspaces/${workspaceId}/settings`}
        />
      }
    >
      <WorkspaceSectionCard
        title="General information"
        description="This information helps define the workspace identity across the platform."
        icon={<Settings2 className="h-4 w-4" />}
      >
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="name"
            validators={{
              onChange: ({ value }) => {
                const parsed = updateWorkspaceGeneralSchema.shape.name.safeParse(value);
                return parsed.success ? undefined : parsed.error.issues[0]?.message;
              },
            }}
          >
            {(field) => (
              <AppField field={field} label="Workspace name" placeholder="Workspace name" />
            )}
          </form.Field>

          <form.Field name="description">
            {(field) => (
              <div className="space-y-2.5">
                <Label className="text-sm font-medium text-[#E5E7EB]">Description</Label>
                <Textarea
                  value={field.state.value ?? ""}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Describe the purpose of this workspace"
                  className="min-h-[120px] border-white/10 bg-[#101828] text-white placeholder:text-[#667085] focus-visible:ring-[#7F56D9]"
                />
              </div>
            )}
          </form.Field>

          <div className="grid gap-5 md:grid-cols-2">
            <form.Field name="timezone">
              {(field) => <AppField field={field} label="Timezone" placeholder="e.g. Asia/Dhaka" />}
            </form.Field>

            <form.Field name="currency">
              {(field) => <AppField field={field} label="Currency" placeholder="e.g. BDT" />}
            </form.Field>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <form.Field name="supportEmail">
              {(field) => (
                <AppField
                  field={field}
                  label="Support email"
                  type="email"
                  placeholder="support@company.com"
                />
              )}
            </form.Field>

            <form.Field name="billingEmail">
              {(field) => (
                <AppField
                  field={field}
                  label="Billing email"
                  type="email"
                  placeholder="billing@company.com"
                />
              )}
            </form.Field>
          </div>

          <div className="flex justify-end">
            <AppSubmitButton isSubmitting={isPending} disabled={isUnchanged}>
              Save General Settings
            </AppSubmitButton>
          </div>
        </form>
      </WorkspaceSectionCard>
    </WorkspaceSettingsShell>
  );
};

export default WorkspaceGeneralSettingsForm;
