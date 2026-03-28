import { API_ENDPOINTS } from "@/config/api-endpoints";
import { apiFetch } from "@/lib/fetcher";
import type { ApiResponse } from "@/types/api.types";
import type {
  CreateTaskCommentPayload,
  CreateTaskPayload,
  GetTaskAttachmentsParams,
  GetTaskCommentsParams,
  GetTasksParams,
  PaginatedTaskAttachmentsResponse,
  PaginatedTaskCommentsResponse,
  PaginatedTasksResponse,
  TaskAttachment,
  TaskComment,
  TaskDetails,
  TaskSummary,
  UpdateTaskCommentPayload,
  UpdateTaskPayload,
} from "@/types/task.types";

const buildTaskListQuery = (params?: GetTasksParams) => {
  const searchParams = new URLSearchParams();

  if (params?.searchTerm) searchParams.set("searchTerm", params.searchTerm);
  if (params?.projectId) searchParams.set("projectId", params.projectId);
  if (params?.assignedToUserId) {
    searchParams.set("assignedToUserId", params.assignedToUserId);
  }
  if (typeof params?.assignedToMe === "boolean") {
    searchParams.set("assignedToMe", String(params.assignedToMe));
  }
  if (params?.status) searchParams.set("status", params.status);
  if (params?.priority) searchParams.set("priority", params.priority);
  if (typeof params?.overdue === "boolean") {
    searchParams.set("overdue", String(params.overdue));
  }
  if (params?.dueFrom) searchParams.set("dueFrom", params.dueFrom);
  if (params?.dueTo) searchParams.set("dueTo", params.dueTo);
  if (typeof params?.page === "number") searchParams.set("page", String(params.page));
  if (typeof params?.limit === "number") searchParams.set("limit", String(params.limit));
  if (params?.sortBy) searchParams.set("sortBy", params.sortBy);
  if (params?.sortOrder) searchParams.set("sortOrder", params.sortOrder);

  return searchParams.toString();
};

const buildPaginationQuery = (params?: { page?: number; limit?: number }) => {
  const searchParams = new URLSearchParams();

  if (typeof params?.page === "number") searchParams.set("page", String(params.page));
  if (typeof params?.limit === "number") searchParams.set("limit", String(params.limit));

  return searchParams.toString();
};

export const getTasks = async (
  workspaceId: string,
  params?: GetTasksParams
): Promise<PaginatedTasksResponse> => {
  const query = buildTaskListQuery(params);

  const response = await apiFetch<ApiResponse<TaskSummary[]>>({
    endpoint: `${API_ENDPOINTS.task.list}${query ? `?${query}` : ""}`,
    method: "GET",
    workspaceId,
  });

  return {
    data: response.data ?? [],
    meta: response.meta ?? {
      page: params?.page ?? 1,
      limit: params?.limit ?? 10,
      total: Array.isArray(response.data) ? response.data.length : 0,
      totalPages: 1,
    },
  };
};

export const getTaskById = async (workspaceId: string, taskId: string): Promise<TaskDetails> => {
  const response = await apiFetch<ApiResponse<TaskDetails>>({
    endpoint: API_ENDPOINTS.task.details(taskId),
    method: "GET",
    workspaceId,
  });

  return response.data;
};

export const createTask = async (
  workspaceId: string,
  payload: CreateTaskPayload
): Promise<TaskDetails> => {
  const response = await apiFetch<ApiResponse<TaskDetails>>({
    endpoint: API_ENDPOINTS.task.create,
    method: "POST",
    workspaceId,
    body: payload,
  });

  return response.data;
};

export const updateTask = async (
  workspaceId: string,
  taskId: string,
  payload: UpdateTaskPayload
): Promise<TaskDetails> => {
  const response = await apiFetch<ApiResponse<TaskDetails>>({
    endpoint: API_ENDPOINTS.task.details(taskId),
    method: "PATCH",
    workspaceId,
    body: payload,
  });

  return response.data;
};

export const deleteTask = async (workspaceId: string, taskId: string): Promise<void> => {
  await apiFetch<ApiResponse<null>>({
    endpoint: API_ENDPOINTS.task.details(taskId),
    method: "DELETE",
    workspaceId,
  });
};

export const getTaskComments = async (
  workspaceId: string,
  taskId: string,
  params?: GetTaskCommentsParams
): Promise<PaginatedTaskCommentsResponse> => {
  const query = buildPaginationQuery(params);

  const response = await apiFetch<ApiResponse<TaskComment[]>>({
    endpoint: `${API_ENDPOINTS.task.comments(taskId)}${query ? `?${query}` : ""}`,
    method: "GET",
    workspaceId,
  });

  return {
    data: response.data ?? [],
    meta: response.meta ?? {
      page: params?.page ?? 1,
      limit: params?.limit ?? 10,
      total: Array.isArray(response.data) ? response.data.length : 0,
      totalPages: 1,
    },
  };
};

export const createTaskComment = async (
  workspaceId: string,
  taskId: string,
  payload: CreateTaskCommentPayload
): Promise<TaskComment> => {
  const response = await apiFetch<ApiResponse<TaskComment>>({
    endpoint: API_ENDPOINTS.task.comments(taskId),
    method: "POST",
    workspaceId,
    body: payload,
  });

  return response.data;
};

export const updateTaskComment = async (
  workspaceId: string,
  taskId: string,
  commentId: string,
  payload: UpdateTaskCommentPayload
): Promise<TaskComment> => {
  const response = await apiFetch<ApiResponse<TaskComment>>({
    endpoint: API_ENDPOINTS.task.comment(taskId, commentId),
    method: "PATCH",
    workspaceId,
    body: payload,
  });

  return response.data;
};

export const deleteTaskComment = async (
  workspaceId: string,
  taskId: string,
  commentId: string
): Promise<void> => {
  await apiFetch<ApiResponse<null>>({
    endpoint: API_ENDPOINTS.task.comment(taskId, commentId),
    method: "DELETE",
    workspaceId,
  });
};

export const getTaskAttachments = async (
  workspaceId: string,
  taskId: string,
  params?: GetTaskAttachmentsParams
): Promise<PaginatedTaskAttachmentsResponse> => {
  const query = buildPaginationQuery(params);

  const response = await apiFetch<ApiResponse<TaskAttachment[]>>({
    endpoint: `${API_ENDPOINTS.task.attachments(taskId)}${query ? `?${query}` : ""}`,
    method: "GET",
    workspaceId,
  });

  return {
    data: response.data ?? [],
    meta: response.meta ?? {
      page: params?.page ?? 1,
      limit: params?.limit ?? 10,
      total: Array.isArray(response.data) ? response.data.length : 0,
      totalPages: 1,
    },
  };
};

export const uploadTaskAttachment = async (
  workspaceId: string,
  taskId: string,
  file: File
): Promise<TaskAttachment> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiFetch<ApiResponse<TaskAttachment>>({
    endpoint: API_ENDPOINTS.task.attachments(taskId),
    method: "POST",
    workspaceId,
    body: formData,
    headers: {},
  });

  return response.data;
};

export const deleteTaskAttachment = async (
  workspaceId: string,
  taskId: string,
  attachmentId: string
): Promise<void> => {
  await apiFetch<ApiResponse<null>>({
    endpoint: API_ENDPOINTS.task.attachment(taskId, attachmentId),
    method: "DELETE",
    workspaceId,
  });
};
