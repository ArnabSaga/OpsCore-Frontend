export type ProjectStatus = "ACTIVE" | "COMPLETED" | "ON_HOLD" | "ARCHIVED";
export type TaskStatus = "TODO" | "IN_PROGRESS" | "REVIEW" | "DONE";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
export type WorkspacePlan = "FREE" | "PRO" | "ENTERPRISE";

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type TaskPlanMeta = {
  workspacePlan: WorkspacePlan;
  isTrialActive: boolean;
  trialStartsAt: string | null;
  trialEndsAt: string | null;
};

export type TaskUser = {
  id: string;
  name: string;
  email: string;
  image: string | null;
};

export type TaskProject = {
  id: string;
  name: string;
  status: ProjectStatus;
  archivedAt?: string | null;
};

export type TaskSummary = {
  id: string;
  workspaceId: string;
  projectId: string;
  assignedToUserId: string | null;
  createdByUserId: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
  project: {
    id: string;
    name: string;
    status: ProjectStatus;
  };
  assignedToUser: TaskUser | null;
  createdByUser: TaskUser;
  _count: {
    comments: number;
    attachments: number;
  };
};

export type TaskDetails = {
  id: string;
  workspaceId: string;
  projectId: string;
  assignedToUserId: string | null;
  createdByUserId: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
  project: TaskProject;
  assignedToUser: TaskUser | null;
  createdByUser: TaskUser;
  _count: {
    comments: number;
    attachments: number;
  };
  planMeta?: TaskPlanMeta;
};

export type TaskComment = {
  id: string;
  workspaceId: string;
  taskId: string;
  userId: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  user: TaskUser;
};

export type TaskAttachment = {
  id: string;
  workspaceId: string;
  taskId: string;
  uploadedById: string;
  fileName: string;
  fileUrl: string;
  mimeType: string | null;
  fileSize: number | null;
  createdAt: string;
  uploadedBy: TaskUser;
};

export type CreateTaskPayload = {
  projectId: string;
  title: string;
  description?: string;
  assignedToUserId?: string | null;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string;
};

export type UpdateTaskPayload = {
  projectId?: string;
  title?: string;
  description?: string | null;
  assignedToUserId?: string | null;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string | null;
};

export type CreateTaskCommentPayload = {
  body: string;
};

export type UpdateTaskCommentPayload = {
  body: string;
};

export type GetTasksParams = {
  searchTerm?: string;
  projectId?: string;
  assignedToUserId?: string;
  assignedToMe?: boolean;
  status?: TaskStatus;
  priority?: TaskPriority;
  overdue?: boolean;
  dueFrom?: string;
  dueTo?: string;
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "updatedAt" | "dueDate" | "title" | "status" | "priority";
  sortOrder?: "asc" | "desc";
};

export type GetTaskCommentsParams = {
  page?: number;
  limit?: number;
};

export type GetTaskAttachmentsParams = {
  page?: number;
  limit?: number;
};

export type PaginatedTasksResponse = {
  data: TaskSummary[];
  meta: PaginationMeta;
};

export type PaginatedTaskCommentsResponse = {
  data: TaskComment[];
  meta: PaginationMeta;
};

export type PaginatedTaskAttachmentsResponse = {
  data: TaskAttachment[];
  meta: PaginationMeta;
};
