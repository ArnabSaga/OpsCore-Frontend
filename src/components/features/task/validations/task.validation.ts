import { z } from "zod";

export const taskStatusEnum = z.enum(["TODO", "IN_PROGRESS", "REVIEW", "DONE"]);
export const taskPriorityEnum = z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]);

export const createTaskSchema = z.object({
  projectId: z.string().min(1, "Project ID is required"),
  title: z
    .string()
    .trim()
    .min(2, "Task title must be at least 2 characters")
    .max(200, "Task title cannot exceed 200 characters"),
  description: z
    .string()
    .trim()
    .max(5000, "Description cannot exceed 5000 characters")
    .optional()
    .or(z.literal("")),
  assignedToUserId: z
    .string()
    .min(1, "Assigned user ID is required")
    .optional()
    .or(z.literal(""))
    .nullable(),
  status: taskStatusEnum.optional(),
  priority: taskPriorityEnum.optional(),
  dueDate: z.string().optional().or(z.literal("")),
});

export const updateTaskSchema = z.object({
  projectId: z.string().min(1, "Project ID is required").optional(),
  title: z
    .string()
    .trim()
    .min(2, "Task title must be at least 2 characters")
    .max(200, "Task title cannot exceed 200 characters"),
  description: z
    .string()
    .trim()
    .max(5000, "Description cannot exceed 5000 characters")
    .optional()
    .or(z.literal("")),
  assignedToUserId: z
    .string()
    .min(1, "Assigned user ID is required")
    .optional()
    .or(z.literal(""))
    .nullable(),
  status: taskStatusEnum.optional(),
  priority: taskPriorityEnum.optional(),
  dueDate: z.string().optional().or(z.literal("")),
});

export const taskCommentSchema = z.object({
  body: z
    .string()
    .trim()
    .min(1, "Comment body is required")
    .max(5000, "Comment body cannot exceed 5000 characters"),
});

export type CreateTaskFormValues = z.infer<typeof createTaskSchema>;
export type UpdateTaskFormValues = z.infer<typeof updateTaskSchema>;
export type TaskCommentFormValues = z.infer<typeof taskCommentSchema>;
