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

export type ProjectPlanMeta = {
  workspacePlan: WorkspacePlan;
  isTrialActive: boolean;
  trialStartsAt: string | null;
  trialEndsAt: string | null;
};

export type ProjectMemberUser = {
  id: string;
  name: string;
  email: string;
  image: string | null;
};

export type ProjectMember = {
  id: string;
  userId?: string;
  createdAt: string;
  user: ProjectMemberUser;
};

export type ProjectTaskItem = {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
  assignedToUser: ProjectMemberUser | null;
  createdByUser: ProjectMemberUser;
  _count: {
    comments: number;
    attachments: number;
  };
};

export type ProjectSummary = {
  totalTasks: number;
  openTasks: number;
  completedTasks: number;
  overdueTasks: number;
  completionRate: number;
  recentActivity: ProjectTaskItem[];
};

export type ProjectListItem = {
  id: string;
  workspaceId: string;
  name: string;
  description: string | null;
  clientName: string | null;
  status: ProjectStatus;
  startDate: string | null;
  endDate: string | null;
  archivedAt: string | null;
  createdAt: string;
  updatedAt: string;
  createdByUser: ProjectMemberUser;
  _count: {
    tasks: number;
    members: number;
  };
};

export type ProjectDetails = {
  id: string;
  workspaceId: string;
  createdByUserId: string;
  name: string;
  description: string | null;
  clientName: string | null;
  status: ProjectStatus;
  startDate: string | null;
  endDate: string | null;
  archivedAt: string | null;
  createdAt: string;
  updatedAt: string;
  createdByUser: ProjectMemberUser;
  members: ProjectMember[];
  _count: {
    tasks: number;
    members: number;
  };
  planMeta?: ProjectPlanMeta;
};

export type CreateProjectPayload = {
  name: string;
  description?: string;
  clientName?: string;
  status?: ProjectStatus;
  startDate?: string;
  endDate?: string;
};

export type UpdateProjectPayload = {
  name?: string;
  description?: string | null;
  clientName?: string | null;
  status?: ProjectStatus;
  startDate?: string | null;
  endDate?: string | null;
  archived?: boolean;
};

export type AssignProjectMembersPayload = {
  userIds: string[];
};

export type AssignProjectMembersResponse = {
  projectId: string;
  addedCount: number;
  totalMembers: number;
};

export type GetProjectsParams = {
  searchTerm?: string;
  status?: ProjectStatus;
  clientName?: string;
  archived?: boolean;
  page?: number;
  limit?: number;
  sortBy?: "name" | "status" | "createdAt" | "updatedAt" | "startDate" | "endDate";
  sortOrder?: "asc" | "desc";
};

export type GetProjectTasksParams = {
  status?: TaskStatus;
  priority?: TaskPriority;
  searchTerm?: string;
  assignedToUserId?: string;
  overdue?: boolean;
  dueFrom?: string;
  dueTo?: string;
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "updatedAt" | "dueDate" | "title" | "status" | "priority";
  sortOrder?: "asc" | "desc";
};

export type PaginatedProjectsResponse = {
  data: ProjectListItem[];
  meta: PaginationMeta;
};

export type PaginatedProjectTasksResponse = {
  data: ProjectTaskItem[];
  meta: PaginationMeta;
};
