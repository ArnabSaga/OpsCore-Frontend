import { buildApiUrl } from "./build-api-url";

type ApiFetchOptions = RequestInit & {
  endpoint: string;
};

/**
 * Base fetcher for API requests. Prepends the base URL if the endpoint is relative.
 */
export const apiFetch = async <T>({
  endpoint,
  headers,
  ...options
}: ApiFetchOptions): Promise<T> => {
  if (!endpoint) {
    throw new Error("apiFetch: endpoint is required");
  }

  const isAbsoluteUrl = /^https?:\/\//i.test(endpoint);
  const url = isAbsoluteUrl ? endpoint : buildApiUrl(endpoint);

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
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

    throw new Error(errorMessage);
  }

  return response.json();
};
