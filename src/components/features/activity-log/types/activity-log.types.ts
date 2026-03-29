import { ApiResponse } from "@/types/api.types";

export type ActivityLogActor = {
  id: string;
  name: string;
  email: string;
  image: string | null;
};

export type ActivityLogItem = {
  id: string;
  workspaceId: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string | null;
  metadata: Record<string, unknown> | null;
  createdAt: string;
  user: ActivityLogActor;
};

export type GetActivityLogsParams = {
  page?: number;
  limit?: number;
  action?: string;
  entityType?: string;
  userId?: string;
  from?: string;
  to?: string;
};

export type PaginatedActivityLogsResponse = ApiResponse<ActivityLogItem[]>;
