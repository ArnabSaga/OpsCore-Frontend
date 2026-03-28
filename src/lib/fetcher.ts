import { buildApiUrl } from "./build-api-url";

type ApiFetchOptions = Omit<RequestInit, "body"> & {
  endpoint: string;
  body?: BodyInit | Record<string, unknown> | null;
  workspaceId?: string | null;
};

export const apiFetch = async <T>({
  endpoint,
  headers,
  workspaceId,
  ...options
}: ApiFetchOptions): Promise<T> => {
  if (!endpoint) {
    throw new Error("apiFetch: endpoint is required");
  }

  const isAbsoluteUrl = /^https?:\/\//i.test(endpoint);
  const url = isAbsoluteUrl ? endpoint : buildApiUrl(endpoint);

  let body: BodyInit | null | undefined;

  if (
    options.body &&
    typeof options.body === "object" &&
    !(options.body instanceof FormData) &&
    !(options.body instanceof Blob) &&
    !(options.body instanceof ArrayBuffer) &&
    !(options.body instanceof URLSearchParams)
  ) {
    body = JSON.stringify(options.body);
  } else {
    body = options.body as BodyInit | null | undefined;
  }

  const isFormData = body instanceof FormData;

  const finalHeaders: Record<string, string> = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(headers as Record<string, string>),
  };

  if (workspaceId) {
    finalHeaders["x-workspace-id"] = workspaceId;
  }

  const response = await fetch(url, {
    ...options,
    body,
    headers: finalHeaders,
    credentials: "include",
  });

  if (!response.ok) {
    let errorMessage = "Something went wrong";

    try {
      const errorData = await response.json();
      errorMessage = errorData?.message || errorData?.error || errorMessage;
    } catch {
      errorMessage = response.statusText || errorMessage;
    }

    const error = new Error(errorMessage) as Error & { status?: number };
    error.status = response.status;
    throw error;
  }

  return response.json();
};
