export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  success?: boolean;
  message?: string;
  data?: unknown;
  user?: unknown;
};

export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  const loginEndpoint = process.env.NEXT_PUBLIC_AUTH_LOGIN_ENDPOINT || `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/sign-in/email`;

  if (!loginEndpoint) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
  }

  const response = await fetch(loginEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || data?.error || "Unable to sign in. Please try again.");
  }

  return data;
};
