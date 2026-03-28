import type { TaskPriority, TaskStatus } from "./task.types";

export interface BaseTaskUI {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
  assignedToUser: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  } | null;
  createdByUser: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };
  _count: {
    comments: number;
    attachments: number;
  };
}
