"use client";

import { AnyFieldApi } from "@tanstack/react-form";
import { CalendarDays, FileText, FolderKanban, Layers3, Type, User2 } from "lucide-react";

import type {
  CreateTaskFormValues,
  UpdateTaskFormValues,
} from "@/components/features/task/validations/task.validation";
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
import type { ProjectListItem } from "@/types/project.types";
import type { TaskPriority, TaskStatus } from "@/types/task.types";
import type { WorkspaceMember } from "@/types/workspace.types";

type TaskFormApi = {
  Field: React.ComponentType<{
    name: keyof (CreateTaskFormValues & UpdateTaskFormValues);
    validators?: {
      onChange?: (props: { value: unknown }) => string | undefined;
      onBlur?: (props: { value: unknown }) => string | undefined;
    };
    children: (field: AnyFieldApi) => React.ReactNode;
  }>;
};

type TaskFormFieldsProps = {
  form: TaskFormApi;
  projects: ProjectListItem[];
  workspaceMembers: WorkspaceMember[];
  mode: "create" | "edit";
  lockProjectSelection?: boolean;
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

const TaskFormFields = ({
  form,
  projects,
  workspaceMembers,
  lockProjectSelection = false,
}: TaskFormFieldsProps) => {
  const activeProjects = projects.filter((project) => !project.archivedAt);
  const activeMembers = workspaceMembers.filter((member) => member.status === "ACTIVE");

  return (
    <div className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <form.Field
          name="projectId"
          validators={{
            onChange: ({ value }) => {
              const v = String(value ?? "");
              if (!v) return "Project is required";
              return undefined;
            },
          }}
        >
          {(field) => (
            <div className="space-y-2.5">
              <Label className="text-sm font-medium text-[#E5E7EB]">Project</Label>

              <Select
                value={String(field.state.value ?? "")}
                onValueChange={(value) => field.handleChange(value)}
                disabled={lockProjectSelection}
              >
                <SelectTrigger className="h-12 w-full rounded-xl border-white/10 bg-[#101828] px-4 text-white focus-visible:ring-[#7F56D9] disabled:opacity-70">
                  <div className="flex items-center gap-2">
                    <FolderKanban className="h-4 w-4 text-[#94A3B8]" />
                    <SelectValue placeholder="Select project" />
                  </div>
                </SelectTrigger>

                <SelectContent className="rounded-2xl border border-white/10 bg-[#101828] text-white">
                  {activeProjects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </form.Field>

        <form.Field name="assignedToUserId">
          {(field) => (
            <div className="space-y-2.5">
              <Label className="text-sm font-medium text-[#E5E7EB]">Assignee</Label>

              <Select
                value={String(field.state.value ?? "") || "UNASSIGNED"}
                onValueChange={(value) => field.handleChange(value === "UNASSIGNED" ? "" : value)}
              >
                <SelectTrigger className="h-12 w-full rounded-xl border-white/10 bg-[#101828] px-4 text-white focus-visible:ring-[#7F56D9]">
                  <div className="flex items-center gap-2">
                    <User2 className="h-4 w-4 text-[#94A3B8]" />
                    <SelectValue placeholder="Select assignee" />
                  </div>
                </SelectTrigger>

                <SelectContent className="rounded-2xl border border-white/10 bg-[#101828] text-white">
                  <SelectItem value="UNASSIGNED">Unassigned</SelectItem>
                  {activeMembers.map((member) => (
                    <SelectItem key={member.user.id} value={member.user.id}>
                      {member.user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </form.Field>
      </div>

      <form.Field
        name="title"
        validators={{
          onChange: ({ value }) => {
            const v = String(value ?? "").trim();
            if (v.length < 2) return "Task title must be at least 2 characters";
            if (v.length > 200) return "Task title cannot exceed 200 characters";
            return undefined;
          },
        }}
      >
        {(field) => (
          <AppField
            field={field}
            label="Task title"
            type="text"
            placeholder="Enter task title"
            autoComplete="off"
            icon={<Type className="h-4 w-4 text-[#94A3B8]" />}
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
                  placeholder="Describe the expected output, scope, or implementation notes"
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
            const value = (field.state.value as TaskStatus | undefined) ?? "TODO";

            return (
              <div className="space-y-2.5">
                <Label className="text-sm font-medium text-[#E5E7EB]">Status</Label>

                <Select
                  value={value}
                  onValueChange={(nextValue) => field.handleChange(nextValue as TaskStatus)}
                >
                  <SelectTrigger className="h-12 w-full rounded-xl border-white/10 bg-[#101828] px-4 text-white focus-visible:ring-[#7F56D9]">
                    <div className="flex items-center gap-2">
                      <Layers3 className="h-4 w-4 text-[#94A3B8]" />
                      <SelectValue placeholder="Select status" />
                    </div>
                  </SelectTrigger>

                  <SelectContent className="rounded-2xl border border-white/10 bg-[#101828] text-white">
                    <SelectItem value="TODO">To Do</SelectItem>
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem value="REVIEW">Review</SelectItem>
                    <SelectItem value="DONE">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            );
          }}
        </form.Field>

        <form.Field name="priority">
          {(field) => {
            const value = (field.state.value as TaskPriority | undefined) ?? "MEDIUM";

            return (
              <div className="space-y-2.5">
                <Label className="text-sm font-medium text-[#E5E7EB]">Priority</Label>

                <Select
                  value={value}
                  onValueChange={(nextValue) => field.handleChange(nextValue as TaskPriority)}
                >
                  <SelectTrigger className="h-12 w-full rounded-xl border-white/10 bg-[#101828] px-4 text-white focus-visible:ring-[#7F56D9]">
                    <div className="flex items-center gap-2">
                      <Layers3 className="h-4 w-4 text-[#94A3B8]" />
                      <SelectValue placeholder="Select priority" />
                    </div>
                  </SelectTrigger>

                  <SelectContent className="rounded-2xl border border-white/10 bg-[#101828] text-white">
                    <SelectItem value="LOW">Low</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="HIGH">High</SelectItem>
                    <SelectItem value="URGENT">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            );
          }}
        </form.Field>

        <form.Field
          name="dueDate"
          validators={{
            onChange: ({ value }) => {
              const v = String(value ?? "");
              if (!v) return undefined;
              const parsed = new Date(v);
              if (Number.isNaN(parsed.getTime())) return "Due date is invalid";
              return undefined;
            },
          }}
        >
          {(field) => (
            <AppField
              field={field}
              label="Due date"
              type="date"
              icon={<CalendarDays className="h-4 w-4 text-[#94A3B8]" />}
            />
          )}
        </form.Field>
      </div>
    </div>
  );
};

export default TaskFormFields;
