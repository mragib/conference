"use server";

import { BACKEND_URL, FRONTEND_URL } from "@/lib/constants";
import { authFetch } from "@/lib/data-service";
import { createSession, destroySession } from "@/lib/session";
import {
  AdvanceFormState,
  ApiResponse,
  FormState,
  SigninFormSchema,
  SignupFormSchema,
} from "@/lib/type";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signup(
  state: AdvanceFormState,
  data: FormData,
): Promise<AdvanceFormState> {
  const payload: any = Object.fromEntries(data.entries());

  const validation = SignupFormSchema.safeParse(payload);
  if (!validation.success) {
    const fields: Record<string, string> = {};

    for (const key of Object.keys(payload)) {
      fields[key] = payload[key].toString();
    }

    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
      fields,
    };
  }

  const response = await fetch(`${BACKEND_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validation.data),
  });

  if (!response.ok) {
    const resData = await response.json();
    return {
      errors: resData.message,
      success: false,
    };
  }

  const resData = await response.json();

  await createSession({
    user: {
      id: resData.id,
      name: resData.name,
      role: resData.role,
    },
    accessToken: resData.accessToken,
    refreshToken: resData.refreshToken,
  });
  return {
    success: response.ok,
  };
  // redirect("/dashboard");
}

export async function signin(
  state: FormState,
  data: FormData,
): Promise<FormState> {
  const email = data.get("email");
  const password = data.get("password");

  const validationFields = SigninFormSchema.safeParse({
    email,
    password,
  });
  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${BACKEND_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validationFields.data),
  });

  if (!response.ok) {
    const resData = await response.json();
    return {
      message: resData.message,
    };
  }
  const result = await response.json();

  await createSession({
    user: {
      id: result.id,
      name: result.name,
      role: result.role,
    },
    accessToken: result.accessToken,
    refreshToken: result.refreshToken,
  });

  redirect("/dashboard");
}

export const refreshToken = async (oldRefreshToken: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/refresh`, {
      method: "POST",
      body: JSON.stringify({ refreshToken: oldRefreshToken }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const { accessToken, refreshToken } = await response.json();

    // await updateToken({ accessToken, refreshToken });
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (sessionCookie) {
      headers.Cookie = `${sessionCookie.name}=${sessionCookie.value}`;
    }

    const updateRes = await fetch(`${FRONTEND_URL}/api/auth/refresh-token`, {
      method: "POST",
      body: JSON.stringify({ accessToken, refreshToken }),
      headers,
    });

    // console.log("Update token response:", updateRes);

    if (!updateRes.ok) {
      throw new Error("Failed to update token in session");
    }

    return accessToken;
  } catch (error) {
    console.error("Refresh token error", error);
    return null;
  }
};

export const googlesignin = async () => {
  redirect(`${BACKEND_URL}/auth/google/login`);
};

export async function signout(state: ApiResponse, data: FormData) {
  const response = await authFetch(`${BACKEND_URL}/auth/signout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    await destroySession();
  }
  revalidatePath("/");
  redirect("/");
}

export const forgotPassword = async ({ email }: { email: string }) => {
  const res = await fetch(`${BACKEND_URL}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();

  if (!res.ok) {
    return { success: false, message: data.message };
  }

  // 🍪 store email temporarily (10 min)
  const cookieStore = await cookies();
  cookieStore.set("reset_email", email, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    maxAge: 60 * 10,
    path: "/",
  });

  return { success: true };
};

export const verifyOtp = async (otp: string) => {
  const cookieStore = await cookies();
  const email = cookieStore.get("reset_email")?.value;

  if (!email) {
    return {
      success: false,
      message: "Session expired. Please try again.",
    };
  }

  const res = await fetch(`${BACKEND_URL}/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });

  const data = await res.json();

  if (!res.ok) {
    return { success: false, message: data.message };
  }

  // 🍪 store reset token securely
  cookieStore.set("reset_token", data.resetToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    maxAge: 60 * 10,
    path: "/",
  });

  return { success: true };
};

export const resetPassword = async (password: string) => {
  const cookieStore = await cookies();

  const resetToken = cookieStore.get("reset_token")?.value;

  if (!resetToken) {
    return {
      success: false,
      message: "Reset session expired",
    };
  }

  const res = await fetch(`${BACKEND_URL}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resetToken, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    return { success: false, message: data.message };
  }

  // 🧹 cleanup cookies
  cookieStore.delete("reset_email");
  cookieStore.delete("reset_token");

  await createSession({
    user: {
      id: data.id, // make sure backend returns this if needed
      name: data.name,
      role: data.role,
    },
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  });

  return {
    success: true,
    message: "Password updated successfully",
  };
};

export const validateInvite = async (token: string) => {
  const res = await fetch(`${BACKEND_URL}/auth/validate-invite`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });

  const data = await res.json();

  if (!res.ok) {
    return { success: false, message: data.message };
  }
  return { success: true, data };
};

export const setPassword = async ({
  token,
  password,
}: {
  token: string;
  password: string;
}) => {
  const res = await fetch(`${BACKEND_URL}/auth/set-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    return { success: false, message: data.message };
  }

  await createSession({
    user: {
      id: data.id, // make sure backend returns this if needed
      name: data.name,
      role: data.role,
    },
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  });

  return {
    success: true,
    message: "Password updated successfully",
  };
};
