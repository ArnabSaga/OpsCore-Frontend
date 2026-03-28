"use client";

import { AnyFieldApi } from "@tanstack/react-form";
import { BriefcaseBusiness, CalendarDays, FileText, FolderKanban, Layers3 } from "lucide-react";

import type { CreateProjectFormValues } from "@/components/features/project/validations/project.validation";
import AppField from "@/components/form/AppField";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { ProjectStatus } from "@/types/project.types";

type ProjectFormApi = {
  Field: React.ComponentType<{
    name: keyof CreateProjectFormValues;
    validators?: {
      onChange?: (props: { value: unknown }) => string | undefined;
      onBlur?: (props: { value: unknown }) => string | undefined;
    };
    children: (field: AnyFieldApi) => React.ReactNode;
  }>;
};

type ProjectFormFieldsProps = {
  form: ProjectFormApi;
};

const getFieldError = (field: AnyFieldApi) => {
  const errors = field.state.meta.errors;
  if (!errors?.length) return "";

  const firstError = errors[0];

  if (typeof firstError === "string") return firstError;
  if (
    typeof firstError === "object" &&
    firstError !== null &&
    "message" in firstError &&
    typeof firstError.message === "string"
  ) {
    return firstError.message;
  }

  return "Invalid value";
};

const ProjectFormFields = ({ form }: ProjectFormFieldsProps) => {
  return (
    <div className="space-y-5">
      <form.Field
        name="name"
        validators={{
          onChange: ({ value }) => {
            const v = String(value ?? "").trim();
            if (v.length < 2) return "Project name must be at least 2 characters";
            if (v.length > 150) return "Project name cannot exceed 150 characters";
            return undefined;
          },
        }}
      >
        {(field) => (
          <AppField
            field={field}
            label="Project name"
            type="text"
            placeholder="Enter project name"
            autoComplete="organization"
            icon={<FolderKanban className="h-4 w-4 text-[#94A3B8]" />}
          />
        )}
      </form.Field>

      <form.Field
        name="clientName"
        validators={{
          onChange: ({ value }) => {
            const v = String(value ?? "").trim();
            if (!v) return undefined;
            if (v.length < 2) return "Client name must be at least 2 characters";
            if (v.length > 150) return "Client name cannot exceed 150 characters";
            return undefined;
          },
        }}
      >
        {(field) => (
          <AppField
            field={field}
            label="Client name"
            type="text"
            placeholder="Enter client or account name"
            autoComplete="organization"
            icon={<BriefcaseBusiness className="h-4 w-4 text-[#94A3B8]" />}
          />
        )}
      </form.Field>

      <form.Field name="description">
        {(field) => {
          const errorMessage = getFieldError(field);
          const hasError = field.state.meta.isTouched && !!errorMessage;

          return (
            <div className="space-y-2.5">
              <Label htmlFor={field.name} className="text-sm font-medium text-[#E5E7EB]">
                Description
              </Label>

              <div className="relative">
                <FileText className="pointer-events-none absolute left-3 top-4 h-4 w-4 text-[#94A3B8]" />

                <Textarea
                  id={field.name}
                  name={field.name}
                  value={String(field.state.value ?? "")}
                  placeholder="Describe scope, goals, deliverables, or important execution notes"
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={[
                    "min-h-[140px] rounded-2xl border border-white/10 bg-[#101828] pl-10 text-white placeholder:text-[#667085]",
                    "focus-visible:border-[#7F56D9] focus-visible:ring-[3px] focus-visible:ring-[#7F56D9]/30",
                    hasError
                      ? "border-red-500/60 focus-visible:border-red-500 focus-visible:ring-red-500/30"
                      : "",
                  ].join(" ")}
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="min-h-[20px]">
                  {hasError ? <p className="text-red-400">{errorMessage}</p> : null}
                </div>
                <p className="text-[#667085]">{String(field.state.value ?? "").length}/5000</p>
              </div>
            </div>
          );
        }}
      </form.Field>

      <div className="grid gap-5 md:grid-cols-3">
        <form.Field name="status">
          {(field) => {
            const value = (field.state.value as ProjectStatus | undefined) ?? "ACTIVE";

            return (
              <div className="space-y-2.5">
                <Label className="text-sm font-medium text-[#E5E7EB]">Status</Label>

                <Select
                  value={value}
                  onValueChange={(nextValue) => field.handleChange(nextValue as ProjectStatus)}
                >
                  <SelectTrigger className="h-12 w-full rounded-xl border-white/10 bg-[#101828] px-4 text-white focus-visible:ring-[#7F56D9]">
                    <div className="flex items-center gap-2">
                      <Layers3 className="h-4 w-4 text-[#94A3B8]" />
                      <SelectValue placeholder="Select status" />
                    </div>
                  </SelectTrigger>

                  <SelectContent className="rounded-2xl border border-white/10 bg-[#101828] text-white">
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                    <SelectItem value="ON_HOLD">On hold</SelectItem>
                    <SelectItem value="ARCHIVED">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            );
          }}
        </form.Field>

        <form.Field
          name="startDate"
          validators={{
            onChange: ({ value }) => {
              const v = String(value ?? "");
              if (!v) return undefined;
              const parsed = new Date(v);
              if (Number.isNaN(parsed.getTime())) return "Start date is invalid";
              return undefined;
            },
          }}
        >
          {(field) => (
            <AppField
              field={field}
              label="Start date"
              type="date"
              icon={<CalendarDays className="h-4 w-4 text-[#94A3B8]" />}
            />
          )}
        </form.Field>

        <form.Field
          name="endDate"
          validators={{
            onChange: ({ value }) => {
              const v = String(value ?? "");
              if (!v) return undefined;
              const parsed = new Date(v);
              if (Number.isNaN(parsed.getTime())) return "End date is invalid";
              return undefined;
            },
          }}
        >
          {(field) => (
            <AppField
              field={field}
              label="End date"
              type="date"
              icon={<CalendarDays className="h-4 w-4 text-[#94A3B8]" />}
            />
          )}
        </form.Field>
      </div>
    </div>
  );
};

export default ProjectFormFields;
