import { API_ENDPOINTS } from "@/config/api-endpoints";
import { apiFetch } from "@/lib/fetcher";
import type { ApiResponse } from "@/types/api.types";
import type {
  AssignProjectMembersPayload,
  AssignProjectMembersResponse,
  GetProjectsParams,
  GetProjectTasksParams,
  PaginatedProjectTasksResponse,
  ProjectDetails,
  ProjectListItem,
  ProjectMember,
  ProjectSummary,
  CreateProjectPayload,
  UpdateProjectPayload,
} from "@/types/project.types";

const buildProjectListQuery = (params?: GetProjectsParams) => {
  const searchParams = new URLSearchParams();

  if (params?.searchTerm) searchParams.set("searchTerm", params.searchTerm);
  if (params?.status) searchParams.set("status", params.status);
  if (params?.clientName) searchParams.set("clientName", params.clientName);
  if (typeof params?.archived === "boolean") {
    searchParams.set("archived", String(params.archived));
  }
  if (typeof params?.page === "number") searchParams.set("page", String(params.page));
  if (typeof params?.limit === "number") searchParams.set("limit", String(params.limit));
  if (params?.sortBy) searchParams.set("sortBy", params.sortBy);
  if (params?.sortOrder) searchParams.set("sortOrder", params.sortOrder);

  return searchParams.toString();
};

const buildProjectTaskQuery = (params?: GetProjectTasksParams) => {
  const searchParams = new URLSearchParams();

  if (params?.status) searchParams.set("status", params.status);
  if (params?.assignedToUserId) {
    searchParams.set("assignedToUserId", params.assignedToUserId);
  }
  if (typeof params?.page === "number") searchParams.set("page", String(params.page));
  if (typeof params?.limit === "number") searchParams.set("limit", String(params.limit));
  if (params?.sortBy) searchParams.set("sortBy", params.sortBy);
  if (params?.sortOrder) searchParams.set("sortOrder", params.sortOrder);

  return searchParams.toString();
};

export const getProjects = async (
  workspaceId: string,
  params?: GetProjectsParams
): Promise<ApiResponse<ProjectListItem[]>> => {
  const query = buildProjectListQuery(params);

  return apiFetch<ApiResponse<ProjectListItem[]>>({
    endpoint: `${API_ENDPOINTS.project.list}${query ? `?${query}` : ""}`,
    method: "GET",
    workspaceId,
  });
};

export const getProjectById = async (
  workspaceId: string,
  projectId: string
): Promise<ProjectDetails> => {
  const response = await apiFetch<ApiResponse<ProjectDetails>>({
    endpoint: API_ENDPOINTS.project.details(projectId),
    method: "GET",
    workspaceId,
  });

  return response.data;
};

export const createProject = async (
  workspaceId: string,
  payload: CreateProjectPayload
): Promise<ProjectDetails> => {
  const response = await apiFetch<ApiResponse<ProjectDetails>>({
    endpoint: API_ENDPOINTS.project.create,
    method: "POST",
    workspaceId,
    body: payload,
  });

  return response.data;
};

export const updateProject = async (
  workspaceId: string,
  projectId: string,
  payload: UpdateProjectPayload
): Promise<ProjectDetails> => {
  const response = await apiFetch<ApiResponse<ProjectDetails>>({
    endpoint: API_ENDPOINTS.project.details(projectId),
    method: "PATCH",
    workspaceId,
    body: payload,
  });

  return response.data;
};

export const deleteProject = async (workspaceId: string, projectId: string): Promise<void> => {
  await apiFetch<ApiResponse<null>>({
    endpoint: API_ENDPOINTS.project.details(projectId),
    method: "DELETE",
    workspaceId,
  });
};

export const getProjectMembers = async (
  workspaceId: string,
  projectId: string
): Promise<ProjectMember[]> => {
  const response = await apiFetch<ApiResponse<ProjectMember[]>>({
    endpoint: API_ENDPOINTS.project.members(projectId),
    method: "GET",
    workspaceId,
  });

  return response.data ?? [];
};

export const assignProjectMembers = async (
  workspaceId: string,
  projectId: string,
  payload: AssignProjectMembersPayload
): Promise<AssignProjectMembersResponse> => {
  const response = await apiFetch<ApiResponse<AssignProjectMembersResponse>>({
    endpoint: API_ENDPOINTS.project.members(projectId),
    method: "POST",
    workspaceId,
    body: payload,
  });

  return response.data;
};

export const getProjectTasks = async (
  workspaceId: string,
  projectId: string,
  params?: GetProjectTasksParams
): Promise<PaginatedProjectTasksResponse> => {
  const query = buildProjectTaskQuery(params);

  const response = await apiFetch<ApiResponse<PaginatedProjectTasksResponse["data"]>>({
    endpoint: `${API_ENDPOINTS.project.tasks(projectId)}${query ? `?${query}` : ""}`,
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

export const getProjectSummary = async (
  workspaceId: string,
  projectId: string
): Promise<ProjectSummary> => {
  const response = await apiFetch<ApiResponse<ProjectSummary>>({
    endpoint: API_ENDPOINTS.project.summary(projectId),
    method: "GET",
    workspaceId,
  });

  return response.data;
};

export const removeProjectMember = async (
  workspaceId: string,
  projectId: string,
  memberId: string
): Promise<void> => {
  await apiFetch<ApiResponse<null>>({
    endpoint: API_ENDPOINTS.project.member(projectId, memberId),
    method: "DELETE",
    workspaceId,
  });
};
