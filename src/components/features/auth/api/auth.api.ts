export type User = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  emailVerified: boolean;
  isActive?: boolean;
  isDeleted?: boolean;
  systemRole?: string;
};

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

export type VerifyEmailPayload = {
  email: string;
  otp: string;
};

export type ResendVerificationPayload = {
  email: string;
};

export type AuthResponse = {
  success?: boolean;
  message?: string;
  data?: {
    user: User;
    [key: string]: unknown;
  };
  user?: User;
};

export const loginUser = async (payload: LoginPayload): Promise<AuthResponse> => {
  const loginEndpoint = process.env.NEXT_PUBLIC_AUTH_LOGIN_ENDPOINT;

  const response = await fetch(loginEndpoint!, {
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

export const verifyEmailCode = async (payload: VerifyEmailPayload): Promise<AuthResponse> => {
  const verifyEndpoint =
    process.env.NEXT_PUBLIC_AUTH_VERIFY_EMAIL_ENDPOINT ||
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/verify-email`;

  const response = await fetch(verifyEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || data?.error || "Unable to verify email. Please try again.");
  }

  return data;
};

export const resendVerificationCode = async (
  payload: ResendVerificationPayload
): Promise<AuthResponse> => {
  const resendEndpoint =
    process.env.NEXT_PUBLIC_AUTH_RESEND_VERIFICATION_ENDPOINT ||
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/resend-verification`;

  const response = await fetch(resendEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || data?.error || "Unable to resend verification code.");
  }

  return data;
};
