"use client";

import { useForm } from "@tanstack/react-form";
import { Palette } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";

import { useUpdateWorkspaceBrandingSettings } from "@/components/features/workspace/hooks/useUpdateWorkspaceBrandingSettings";
import { useWorkspaceBrandingSettings } from "@/components/features/workspace/hooks/useWorkspaceBrandingSettings";
import { updateWorkspaceBrandingSchema } from "@/components/features/workspace/validations/workspace-settings.validation";
import AppField from "@/components/form/AppField";
import AppSubmitButton from "@/components/form/AppSubmitButton";
import ProtectedPageErrorState from "@/components/shared/error-state/ProtectedPageErrorState";
import WorkspacePageHero from "./WorkspacePageHero";
import WorkspaceSectionCard from "./WorkspaceSectionCard";
import WorkspaceSettingsShell from "./WorkspaceSettingsShell";

const WorkspaceBrandingSettingsForm = () => {
  const params = useParams<{ workspaceId: string }>();
  const workspaceId = params.workspaceId;

  const { data, isError, refetch } = useWorkspaceBrandingSettings(workspaceId);

  const { mutateAsync, isPending } = useUpdateWorkspaceBrandingSettings(workspaceId);

  const initialValues = useMemo(
    () => ({
      logoUrl: data?.logoUrl ?? "",
      faviconUrl: data?.faviconUrl ?? "",
      primaryColor: data?.primaryColor ?? "#7F56D9",
      accentColor: data?.accentColor ?? "#6941C6",
      customDomain: data?.customDomain ?? "",
      emailBrandName: data?.emailBrandName ?? "",
    }),
    [data]
  );

  const form = useForm({
    defaultValues: initialValues,
    onSubmit: async ({ value }) => {
      const parsed = updateWorkspaceBrandingSchema.safeParse({
        ...value,
        logoUrl: value.logoUrl || null,
        faviconUrl: value.faviconUrl || null,
        customDomain: value.customDomain || null,
        emailBrandName: value.emailBrandName || null,
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
        title="Unable to load branding settings"
        description="We couldn’t fetch workspace branding settings right now."
        onRetry={() => void refetch()}
      />
    );
  }

  const logoPreview = form.state.values.logoUrl || null;
  const isUnchanged = JSON.stringify(form.state.values) === JSON.stringify(initialValues);

  return (
    <WorkspaceSettingsShell
      hero={
        <WorkspacePageHero
          eyebrow="Branding Settings"
          title="Workspace branding"
          description="Control the visual identity of your workspace using simple URL-based branding inputs."
          backHref={`/workspaces/${workspaceId}/settings`}
        />
      }
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <WorkspaceSectionCard
          title="Brand identity"
          description="Configure logo, favicon, colors, and email brand naming."
          icon={<Palette className="h-4 w-4" />}
        >
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <form.Field name="logoUrl">
              {(field) => (
                <AppField
                  field={field}
                  label="Logo URL"
                  placeholder="https://example.com/logo.png"
                />
              )}
            </form.Field>

            <form.Field name="faviconUrl">
              {(field) => (
                <AppField
                  field={field}
                  label="Favicon URL"
                  placeholder="https://example.com/favicon.ico"
                />
              )}
            </form.Field>

            <div className="grid gap-5 md:grid-cols-2">
              <form.Field name="primaryColor">
                {(field) => (
                  <div className="space-y-2.5">
                    <label className="text-sm font-medium text-[#E5E7EB]">Primary color</label>
                    <div className="flex gap-3">
                      <input
                        type="color"
                        value={field.state.value ?? "#7F56D9"}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="h-12 w-16 rounded-xl border border-white/10 bg-[#101828]"
                      />
                      <input
                        type="text"
                        value={field.state.value ?? ""}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="h-12 flex-1 rounded-xl border border-white/10 bg-[#101828] px-3 text-white placeholder:text-[#667085] focus-visible:outline-none"
                        placeholder="#7F56D9"
                      />
                    </div>
                  </div>
                )}
              </form.Field>

              <form.Field name="accentColor">
                {(field) => (
                  <div className="space-y-2.5">
                    <label className="text-sm font-medium text-[#E5E7EB]">Accent color</label>
                    <div className="flex gap-3">
                      <input
                        type="color"
                        value={field.state.value ?? "#6941C6"}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="h-12 w-16 rounded-xl border border-white/10 bg-[#101828]"
                      />
                      <input
                        type="text"
                        value={field.state.value ?? ""}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="h-12 flex-1 rounded-xl border border-white/10 bg-[#101828] px-3 text-white placeholder:text-[#667085] focus-visible:outline-none"
                        placeholder="#6941C6"
                      />
                    </div>
                  </div>
                )}
              </form.Field>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <form.Field name="customDomain">
                {(field) => (
                  <AppField field={field} label="Custom domain" placeholder="app.company.com" />
                )}
              </form.Field>

              <form.Field name="emailBrandName">
                {(field) => (
                  <AppField field={field} label="Email brand name" placeholder="Acme Workspace" />
                )}
              </form.Field>
            </div>

            <div className="flex justify-end">
              <AppSubmitButton isSubmitting={isPending} disabled={isUnchanged}>
                Save Branding Settings
              </AppSubmitButton>
            </div>
          </form>
        </WorkspaceSectionCard>

        <WorkspaceSectionCard
          title="Preview"
          description="A lightweight preview of your branding setup."
        >
          <div className="space-y-5">
            <div className="rounded-2xl border border-white/10 bg-[#101828] p-6">
              {logoPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logoPreview}
                  alt="Workspace logo preview"
                  className="h-12 w-auto rounded-lg object-contain"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/3 text-[#94A3B8]">
                  Logo
                </div>
              )}

              <div className="mt-5 flex gap-3">
                <div
                  className="h-10 w-10 rounded-2xl border border-white/10"
                  style={{ backgroundColor: form.state.values.primaryColor || "#7F56D9" }}
                />
                <div
                  className="h-10 w-10 rounded-2xl border border-white/10"
                  style={{ backgroundColor: form.state.values.accentColor || "#6941C6" }}
                />
              </div>

              <p className="mt-5 text-sm text-[#94A3B8]">
                Brand name:{" "}
                <span className="font-medium text-white">
                  {form.state.values.emailBrandName || "Not set"}
                </span>
              </p>
            </div>
          </div>
        </WorkspaceSectionCard>
      </div>
    </WorkspaceSettingsShell>
  );
};

export default WorkspaceBrandingSettingsForm;
