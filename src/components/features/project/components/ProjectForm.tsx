"use client";

import { useForm } from "@tanstack/react-form";
import { CheckCircle2, FolderKanban, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

import ProjectFormFields from "@/components/features/project/components/ProjectFormFields";
import { createProjectSchema } from "@/components/features/project/validations/project.validation";
import AppSubmitButton from "@/components/form/AppSubmitButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type {
  CreateProjectPayload,
  ProjectDetails,
  ProjectStatus,
  UpdateProjectPayload,
} from "@/types/project.types";

type ProjectFormValues = {
  name: string;
  description: string;
  clientName: string;
  status: ProjectStatus;
  startDate: string;
  endDate: string;
};

export type ProjectFormSubmitPayload = CreateProjectPayload | UpdateProjectPayload;

type ProjectFormProps = {
  mode: "create" | "edit";
  initialValues?: Partial<ProjectFormValues>;
  isSubmitting?: boolean;
  submitError?: string | null;
  submitLabel?: string;
  cancelHref?: string;
  onSubmit: (payload: ProjectFormSubmitPayload) => Promise<ProjectDetails | void>;
};

const defaultValues: ProjectFormValues = {
  name: "",
  description: "",
  clientName: "",
  status: "ACTIVE",
  startDate: "",
  endDate: "",
};

const toIsoDateTime = (value?: string) => {
  if (!value) return undefined;
  return new Date(`${value}T00:00:00.000Z`).toISOString();
};

const ProjectForm = ({
  mode,
  initialValues,
  isSubmitting = false,
  submitError,
  submitLabel,
  cancelHref = "/projects",
  onSubmit,
}: ProjectFormProps) => {
  const mergedValues = useMemo(
    () => ({
      ...defaultValues,
      ...initialValues,
    }),
    [initialValues]
  );

  const form = useForm({
    defaultValues: mergedValues,
    onSubmit: async ({ value }) => {
      const parsed = createProjectSchema.safeParse(value);

      if (!parsed.success) return;

      if (mode === "create") {
        const payload: CreateProjectPayload = {
          name: parsed.data.name.trim(),
          description: parsed.data.description?.trim() || undefined,
          clientName: parsed.data.clientName?.trim() || undefined,
          status: parsed.data.status || "ACTIVE",
          startDate: toIsoDateTime(parsed.data.startDate),
          endDate: toIsoDateTime(parsed.data.endDate),
        };

        await onSubmit(payload);
        return;
      }

      const payload: UpdateProjectPayload = {
        name: parsed.data.name.trim(),
        description: parsed.data.description?.trim() ? parsed.data.description.trim() : null,
        clientName: parsed.data.clientName?.trim() ? parsed.data.clientName.trim() : null,
        status: parsed.data.status || "ACTIVE",
        startDate: parsed.data.startDate ? toIsoDateTime(parsed.data.startDate) : null,
        endDate: parsed.data.endDate ? toIsoDateTime(parsed.data.endDate) : null,
      };

      await onSubmit(payload);
    },
  });

  const primaryLabel = submitLabel ?? (mode === "create" ? "Create Project" : "Save Changes");

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <Card
        data-project-form-card
        className="rounded-[24px] border border-white/10 bg-[#1D2939]/80 text-white shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl"
      >
        <CardContent className="p-6 md:p-8">
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#0C111D] shadow-[0_14px_30px_rgba(0,0,0,0.28)]">
              <FolderKanban className="h-5 w-5 text-[#CBB5FF]" />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white">
                {mode === "create" ? "Project details" : "Update project"}
              </h2>
              <p className="mt-1 text-sm leading-6 text-[#94A3B8]">
                This form mirrors backend validation, including field lengths and date ordering.
              </p>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-6"
          >
            <ProjectFormFields form={form} mode={mode} />

            {submitError ? (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {submitError}
              </div>
            ) : null}

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Button
                asChild
                type="button"
                variant="outline"
                className="h-12 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10 sm:w-auto"
              >
                <Link href={cancelHref}>Cancel</Link>
              </Button>

              <div className="flex-1">
                <AppSubmitButton isSubmitting={isSubmitting}>{primaryLabel}</AppSubmitButton>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="rounded-[24px] border border-white/10 bg-[#101828]/80 text-white shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
        <CardContent className="p-6">
          <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#12B76A]/20 bg-[#12B76A]/10">
            <CheckCircle2 className="h-5 w-5 text-[#6CE9A6]" />
          </div>

          <h3 className="text-lg font-semibold text-white">Backend-aligned behavior</h3>
          <p className="mt-2 text-sm leading-6 text-[#94A3B8]">
            In edit mode, cleared optional fields are sent as null so the backend can remove old
            values correctly.
          </p>

          <div className="mt-6 space-y-3">
            <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
              <p className="text-sm font-medium text-white">Date guardrails</p>
              <p className="mt-1 text-sm text-[#94A3B8]">
                End date cannot be earlier than start date.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
              <p className="text-sm font-medium text-white">Optional field clearing</p>
              <p className="mt-1 text-sm text-[#94A3B8]">
                Empty description, client name, and dates are explicitly cleared in edit mode.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#CBB5FF]" />
                <p className="text-sm font-medium text-white">Workspace-safe updates</p>
              </div>
              <p className="mt-1 text-sm text-[#94A3B8]">
                The active workspace is still enforced through your existing authenticated frontend
                and backend middleware.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectForm;
