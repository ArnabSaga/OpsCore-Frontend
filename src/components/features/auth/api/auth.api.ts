export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  workspaceName?: string;
};

export type AuthResponse = {
  success?: boolean;
  message?: string;
  data?: unknown;
  user?: unknown;
};

export const loginUser = async (payload: LoginPayload): Promise<AuthResponse> => {
  const loginEndpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login`;

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

export const registerUser = async (payload: RegisterPayload): Promise<AuthResponse> => {
  const registerEndpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/register`;

  const response = await fetch(registerEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || data?.error || "Unable to create account. Please try again.");
  }

  return data;
};
