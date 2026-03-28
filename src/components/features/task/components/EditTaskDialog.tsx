"use client";

import { useForm } from "@tanstack/react-form";
import { CalendarDays, FileText, Pencil, Type, User2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { useUpdateTask } from "@/components/features/task/hooks/useUpdateTask";
import { updateTaskSchema } from "@/components/features/task/validations/task.validation";
import AppSubmitButton from "@/components/form/AppSubmitButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { TaskPriority, TaskStatus, TaskSummary } from "@/types/task.types";
import type { WorkspaceMember } from "@/types/workspace.types";

type EditTaskDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: TaskSummary | null;
  workspaceMembers: WorkspaceMember[];
};

const toInputDate = (value?: string | null) => {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
};

const toIsoDate = (value?: string) => {
  if (!value) return null;
  const date = new Date(value.includes("T") ? value : `${value}T00:00:00.000Z`);
  return isNaN(date.getTime()) ? null : date.toISOString();
};

const EditTaskDialog = ({ open, onOpenChange, task, workspaceMembers }: EditTaskDialogProps) => {
  const { mutateAsync, isPending } = useUpdateTask();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const activeMembers = useMemo(
    () => workspaceMembers.filter((member) => member.status === "ACTIVE"),
    [workspaceMembers]
  );

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      assignedToUserId: "",
      status: "TODO" as TaskStatus,
      priority: "MEDIUM" as TaskPriority,
      dueDate: "",
    },
    onSubmit: async ({ value }) => {
      if (!task) return;

      setSubmitError(null);

      const parsed = updateTaskSchema.safeParse(value);
      if (!parsed.success) {
        setSubmitError(parsed.error.errors[0]?.message || "Invalid form data.");
        return;
      }

      try {
        await mutateAsync({
          taskId: task.id,
          currentProjectId: task.projectId,
          payload: {
            title: parsed.data.title.trim(),
            description: parsed.data.description?.trim() ? parsed.data.description.trim() : null,
            assignedToUserId:
              parsed.data.assignedToUserId && parsed.data.assignedToUserId !== ""
                ? parsed.data.assignedToUserId
                : null,
            status: parsed.data.status,
            priority: parsed.data.priority,
            dueDate: parsed.data.dueDate ? toIsoDate(parsed.data.dueDate) : null,
            projectId: task.projectId,
          },
        });

        onOpenChange(false);
      } catch (error) {
        setSubmitError(error instanceof Error ? error.message : "Failed to update task.");
      }
    },
  });

  useEffect(() => {
    if (!task || !open) return;

    form.setFieldValue("title", task.title);
    form.setFieldValue("description", task.description ?? "");
    form.setFieldValue("assignedToUserId", task.assignedToUserId ?? "");
    form.setFieldValue("status", task.status);
    form.setFieldValue("priority", task.priority);
    form.setFieldValue("dueDate", toInputDate(task.dueDate));
  }, [task, open, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl border-white/10 bg-[#101828] text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pencil className="h-5 w-5 text-[#CBB5FF]" />
            Edit task
          </DialogTitle>
          <DialogDescription className="text-[#94A3B8]">
            Update task details and send nullable fields correctly to the backend.
          </DialogDescription>
        </DialogHeader>

        {!task ? null : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-5"
          >
            <form.Field name="title">
              {(field) => (
                <div className="space-y-2">
                  <Label className="text-[#E5E7EB]">Task title</Label>
                  <div className="relative">
                    <Type className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-[#94A3B8]" />
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="h-11 rounded-xl border-white/10 bg-white/5 pl-10 text-white"
                    />
                  </div>
                </div>
              )}
            </form.Field>

            <form.Field name="description">
              {(field) => (
                <div className="space-y-2">
                  <Label className="text-[#E5E7EB]">Description</Label>
                  <div className="relative">
                    <FileText className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-[#94A3B8]" />
                    <Textarea
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="min-h-[120px] rounded-2xl border-white/10 bg-white/5 pl-10 text-white"
                    />
                  </div>
                </div>
              )}
            </form.Field>

            <div className="grid gap-4 md:grid-cols-2">
              <form.Field name="assignedToUserId">
                {(field) => (
                  <div className="space-y-2">
                    <Label className="text-[#E5E7EB]">Assignee</Label>
                    <Select
                      value={field.state.value || "UNASSIGNED"}
                      onValueChange={(value) =>
                        field.handleChange(value === "UNASSIGNED" ? "" : value)
                      }
                    >
                      <SelectTrigger className="h-11 rounded-xl border-white/10 bg-white/5 text-white">
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

              <form.Field name="dueDate">
                {(field) => (
                  <div className="space-y-2">
                    <Label className="text-[#E5E7EB]">Due date</Label>
                    <div className="relative">
                      <CalendarDays className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-[#94A3B8]" />
                      <Input
                        type="date"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="h-11 rounded-xl border-white/10 bg-white/5 pl-10 text-white"
                      />
                    </div>
                  </div>
                )}
              </form.Field>

              <form.Field name="status">
                {(field) => (
                  <div className="space-y-2">
                    <Label className="text-[#E5E7EB]">Status</Label>
                    <Select
                      value={field.state.value}
                      onValueChange={(value) => field.handleChange(value as TaskStatus)}
                    >
                      <SelectTrigger className="h-11 rounded-xl border-white/10 bg-white/5 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl border border-white/10 bg-[#101828] text-white">
                        <SelectItem value="TODO">To Do</SelectItem>
                        <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                        <SelectItem value="REVIEW">Review</SelectItem>
                        <SelectItem value="DONE">Done</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </form.Field>

              <form.Field name="priority">
                {(field) => (
                  <div className="space-y-2">
                    <Label className="text-[#E5E7EB]">Priority</Label>
                    <Select
                      value={field.state.value}
                      onValueChange={(value) => field.handleChange(value as TaskPriority)}
                    >
                      <SelectTrigger className="h-11 rounded-xl border-white/10 bg-white/5 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl border border-white/10 bg-[#101828] text-white">
                        <SelectItem value="LOW">Low</SelectItem>
                        <SelectItem value="MEDIUM">Medium</SelectItem>
                        <SelectItem value="HIGH">High</SelectItem>
                        <SelectItem value="URGENT">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </form.Field>
            </div>

            {submitError ? (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {submitError}
              </div>
            ) : null}

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="h-12 min-w-[100px] rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <AppSubmitButton isSubmitting={isPending} className="w-fit min-w-[140px] px-8">
                Save Changes
              </AppSubmitButton>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskDialog;
