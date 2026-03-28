"use client";

import { useForm } from "@tanstack/react-form";
import { CheckCircle2, ShieldCheck, SquareKanban } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import TaskFormFields from "@/components/features/task/components/TaskFormFields";
import { createTaskSchema } from "@/components/features/task/validations/task.validation";
import AppSubmitButton from "@/components/form/AppSubmitButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { ProjectListItem } from "@/types/project.types";
import type {
  CreateTaskPayload,
  TaskDetails,
  TaskPriority,
  TaskStatus,
  UpdateTaskPayload,
} from "@/types/task.types";
import type { WorkspaceMember } from "@/types/workspace.types";

type TaskFormValues = {
  projectId: string;
  title: string;
  description: string;
  assignedToUserId: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
};

export type TaskFormSubmitPayload = CreateTaskPayload | UpdateTaskPayload;

type TaskFormProps = {
  mode: "create" | "edit";
  projects: ProjectListItem[];
  workspaceMembers: WorkspaceMember[];
  initialValues?: Partial<TaskFormValues>;
  isSubmitting?: boolean;
  submitError?: string | null;
  submitLabel?: string;
  cancelHref?: string;
  lockProjectSelection?: boolean;
  onSubmit: (payload: TaskFormSubmitPayload) => Promise<TaskDetails | void>;
};

const defaultValues: TaskFormValues = {
  projectId: "",
  title: "",
  description: "",
  assignedToUserId: "",
  status: "TODO",
  priority: "MEDIUM",
  dueDate: "",
};

const toIsoDateTime = (value?: string) => {
  if (!value) return undefined;
  return new Date(`${value}T00:00:00.000Z`).toISOString();
};

const toNullableIsoDateTime = (value?: string) => {
  if (!value) return null;
  return new Date(`${value}T00:00:00.000Z`).toISOString();
};

const TaskForm = ({
  mode,
  projects,
  workspaceMembers,
  initialValues,
  isSubmitting = false,
  submitError,
  submitLabel,
  cancelHref = "/tasks",
  lockProjectSelection = false,
  onSubmit,
}: TaskFormProps) => {
  const mergedValues = useMemo(
    () => ({
      ...defaultValues,
      ...initialValues,
    }),
    [initialValues]
  );

  const [localSubmitError, setLocalSubmitError] = useState<string | null>(null);
  const form = useForm({
    defaultValues: mergedValues,
    onSubmit: async ({ value }) => {
      setLocalSubmitError(null);
      const parsed = createTaskSchema.safeParse(value);

      if (!parsed.success) {
        setLocalSubmitError(parsed.error.errors[0]?.message || "Invalid form data.");
        return;
      }

      try {
        if (mode === "create") {
          const payload: CreateTaskPayload = {
            projectId: parsed.data.projectId,
            title: parsed.data.title.trim(),
            description: parsed.data.description?.trim() || undefined,
            assignedToUserId:
              parsed.data.assignedToUserId && parsed.data.assignedToUserId !== ""
                ? parsed.data.assignedToUserId
                : null,
            status: parsed.data.status || "TODO",
            priority: parsed.data.priority || "MEDIUM",
            dueDate: parsed.data.dueDate ? toIsoDateTime(parsed.data.dueDate) : undefined,
          };

          await onSubmit(payload);
          return;
        }

        const payload: UpdateTaskPayload = {
          projectId: parsed.data.projectId || undefined,
          title: parsed.data.title.trim(),
          description: parsed.data.description?.trim() ? parsed.data.description.trim() : null,
          assignedToUserId:
            parsed.data.assignedToUserId && parsed.data.assignedToUserId !== ""
              ? parsed.data.assignedToUserId
              : null,
          status: parsed.data.status || "TODO",
          priority: parsed.data.priority || "MEDIUM",
          dueDate: parsed.data.dueDate ? toNullableIsoDateTime(parsed.data.dueDate) : null,
        };

        await onSubmit(payload);
      } catch (error) {
        setLocalSubmitError(error instanceof Error ? error.message : "Failed to submit task.");
      }
    },
  });

  const primaryLabel = submitLabel ?? (mode === "create" ? "Create Task" : "Save Changes");

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <Card
        data-task-form-card
        className="rounded-[24px] border border-white/10 bg-[#1D2939]/80 text-white shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl"
      >
        <CardContent className="p-6 md:p-8">
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#0C111D] shadow-[0_14px_30px_rgba(0,0,0,0.28)]">
              <SquareKanban className="h-5 w-5 text-[#CBB5FF]" />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white">
                {mode === "create" ? "Task details" : "Update task"}
              </h2>
              <p className="mt-1 text-sm leading-6 text-[#94A3B8]">
                This form mirrors backend validation, project selection, assignee selection, and ISO
                date conversion.
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
            <TaskFormFields
              form={form}
              projects={projects}
              workspaceMembers={workspaceMembers}
              mode={mode}
              lockProjectSelection={lockProjectSelection}
            />

            {localSubmitError || submitError ? (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {localSubmitError || submitError}
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
            OpsCore sends clean trimmed values, allows nullable assignee clearing, and converts due
            dates into ISO datetime strings for backend-safe submission.
          </p>

          <div className="mt-6 space-y-3">
            <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
              <p className="text-sm font-medium text-white">Global task creation</p>
              <p className="mt-1 text-sm text-[#94A3B8]">
                Select the project first, then assign ownership, delivery state, priority, and due
                date.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
              <p className="text-sm font-medium text-white">Project-safe selection</p>
              <p className="mt-1 text-sm text-[#94A3B8]">
                Archived projects are excluded from the dropdown to stay aligned with task creation
                restrictions.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#CBB5FF]" />
                <p className="text-sm font-medium text-white">Workspace-safe creation</p>
              </div>
              <p className="mt-1 text-sm text-[#94A3B8]">
                The active workspace context still flows through your authenticated frontend and
                backend middleware.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskForm;
