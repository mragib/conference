"use server";

import { refreshToken } from "@/action/auth";
import { BACKEND_URL } from "@/lib/constants";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { getSession } from "./session";
import {
  AbstractFormSchema,
  AdvanceFormState,
  ApiResponse,
  APIStatus,
  ContactSchema,
  ProfileServerSchema,
  ReviewerFormSchema,
  UserFormSchema,
} from "./type";
import { parseApiError } from "./utils";

export interface AuthFetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export const authFetch = async (
  url: string | URL,
  options: AuthFetchOptions = {},
) => {
  let session = await getSession();
  if (!session?.accessToken) throw new Error("No access token found");

  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${session.accessToken}`,
  };

  let response = await fetch(url, options);

  if (response.status === 401) {
    if (!session?.refreshToken) {
      throw new Error("No refresh token found");
    }

    const newAccessToken = await refreshToken(session.refreshToken);
    if (newAccessToken) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${newAccessToken}`,
      };
      response = await fetch(url, options);
    }
  }

  return response;
};

export const authPostOrPatch = async (
  url: string | URL,
  method: string,
  data: any,
  options: AuthFetchOptions = {},
) => {
  let session = await getSession();
  if (!session?.accessToken) throw new Error("No access token found");

  options.headers = {
    ...options.headers,
    "Content-Type": "application/json",
    Authorization: `Bearer ${session.accessToken}`,
  };

  let response = await fetch(url, {
    method: method,
    body: data,
    ...options,
  });

  if (response.status === 401) {
    if (!session?.refreshToken) {
      throw new Error("No refresh token found");
    }

    const newAccessToken = await refreshToken(session.refreshToken);
    if (newAccessToken) {
      options.headers = {
        ...options.headers,

        Authorization: `Bearer ${newAccessToken}`,
      };
      response = await fetch(url, {
        method: method,
        body: data,
        ...options,
      });
    }
  }

  return response;
};

export const authDelete = async (
  url: string | URL,
  options: AuthFetchOptions = {},
) => {
  let session = await getSession();
  if (!session?.accessToken) throw new Error("No access token found");
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${session.accessToken}`,
  };
  let response = await fetch(url, { method: "DELETE", ...options });
  if (response.status === 401) {
    if (!session?.refreshToken) {
      throw new Error("No refresh token found");
    }
    const newAccessToken = await refreshToken(session.refreshToken);
    if (newAccessToken) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${newAccessToken}`,
      };
      response = await fetch(url, { method: "DELETE", ...options });
    }
  }
  return response;
};

export const authFileUpload = async (
  url: string | URL,
  data: FormData,
  options: AuthFetchOptions = {},
) => {
  let session = await getSession();
  if (!session?.accessToken) throw new Error("No access token found");

  // Remove Content-Type header - let the browser set it automatically
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${session.accessToken}`,
  };

  let response = await fetch(url, {
    body: data,
    method: "POST",
    ...options,
  });

  if (response.status === 401) {
    if (!session?.refreshToken) {
      throw new Error("No refresh token found");
    }

    const newAccessToken = await refreshToken(session.refreshToken);
    if (newAccessToken) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${newAccessToken}`,
      };
      response = await fetch(url, {
        method: "POST",
        body: data,
        ...options,
      });
    }
  }

  return response;
};

export const publicFetch = async (url: string) => {
  const response = await fetch(url);
  return response;
};

export async function getUserIP() {
  const headersList = await headers();

  const forwarded = headersList.get("x-forwarded-for");
  const realIp = headersList.get("x-real-ip");

  return forwarded?.split(",")[0] || realIp || "unknown";
}

export const getProfile = async () => {
  const response = await authFetch(`${BACKEND_URL}/auth/profile`);
  const user = await response.json();
  return user;
};

export const getProtect = async () => {
  const response = await authFetch(`${BACKEND_URL}/auth/protacted`);
  const data = await response.json();

  return data;
};

export const createSessionDB = async ({
  userId,
  session,
}: {
  userId: string;
  session: string;
}) => {
  const data = {
    userId,
    session,
  };

  const response = await fetch(`${BACKEND_URL}/session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Session is not created");
  }

  const { user } = await response.json();

  return user;
};

export const getSessionBySessionId = async (sessionId: string) => {
  const response = await fetch(`${BACKEND_URL}/session/` + sessionId, {
    credentials: "include",
  });
  if (!response.ok) {
    return null;
  }
  const data = await response.json();

  return data;
};

export const getUsers = async (): Promise<ApiResponse> => {
  const response = await authFetch(`${BACKEND_URL}/user`);
  const data = await response.json();
  return data;
};

export const addUserService = async (
  state: ApiResponse,
  data: FormData,
): Promise<ApiResponse> => {
  const name = data.get("name");
  const email = data.get("email");
  const password = data.get("password");
  const phone = data.get("phone");
  const address = data.get("address");
  const role = data.get("role");
  const is_active =
    data.get("is_active") === "true" || data.get("is_active") === "on";

  const validationFields = UserFormSchema.safeParse({
    name,
    email,
    password,
    phone,
    address,
    role,
    is_active,
  });
  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
      status: APIStatus.FAIL,
      statusCode: 400,
      message: "",
    };
  }

  const response = await authPostOrPatch(
    `${BACKEND_URL}/user`,
    "POST",
    JSON.stringify(validationFields.data),
  );

  const resData = await response.json();
  if (response.ok) revalidatePath("/admin/users");
  return resData;
};

export const updateUserService = async (
  state: ApiResponse,
  editId: string,
  data: FormData,
): Promise<ApiResponse> => {
  const name = data.get("name");
  const email = data.get("email");
  const password = data.get("password");
  const phone = data.get("phone");
  const address = data.get("address");
  const role = data.get("role");
  const is_active =
    data.get("is_active") === "true" || data.get("is_active") === "on";

  const validationFields = UserFormSchema.safeParse({
    name,
    email,
    password,
    phone,
    address,
    role,
    is_active,
  });
  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
      status: APIStatus.FAIL,
      statusCode: 400,
      message: "",
    };
  }

  const response = await authPostOrPatch(
    `${BACKEND_URL}/user/${editId}`,
    "PATCH",
    JSON.stringify(validationFields.data),
  );

  const resData = await response.json();
  if (response.ok) revalidatePath("/admin/users");
  return resData;
};

export const deleteUserService = async (id: string): Promise<ApiResponse> => {
  const response = await authDelete(`${BACKEND_URL}/user/${id}`);
  const resData = await response.json();
  if (response.ok) revalidatePath("/admin/users");
  return resData;
};

export const userRoleChangeService = async (
  state: ApiResponse,
  id: string,
  data: FormData,
): Promise<ApiResponse> => {
  const role = data.get("role");

  const response = await authPostOrPatch(
    `${BACKEND_URL}/user/change-role`,
    "POST",
    JSON.stringify({ userId: id, role }),
  );
  const resData = await response.json();
  if (response.ok) revalidatePath("/admin/users");
  return resData;
};

export const getTopics = async () => {
  const response = await publicFetch(`${BACKEND_URL}/topic`);
  const topics = await response.json();
  return topics;
};

export const getUserWithTopic = async () => {
  const response = await authFetch(`${BACKEND_URL}/user/with-topic`);
  const topics = await response.json();
  return topics;
};

export const addReviewerService = async (
  state: ApiResponse,
  data: FormData,
): Promise<ApiResponse> => {
  const payload: any = Object.fromEntries(data.entries());

  if (typeof payload.topic === "string") {
    try {
      payload.topic = JSON.parse(payload.topic);
    } catch {
      payload.topic = [];
    }
  }

  const validation = ReviewerFormSchema.safeParse(payload);

  if (!validation.success) {
    return {
      error: validation.error.flatten().fieldErrors,
      status: APIStatus.FAIL,
      statusCode: 400,
      message: "",
    };
  }

  const response = await authPostOrPatch(
    `${BACKEND_URL}/user/make-reviewer`,
    "POST",
    JSON.stringify(validation.data),
  );

  const resData = await response.json();

  if (response.ok) revalidatePath("/admin/users");
  return resData;
};

export const updateReviewerService = async (
  state: ApiResponse,
  id: string,
  data: FormData,
): Promise<ApiResponse> => {
  const payload: any = Object.fromEntries(data.entries());
  if (typeof payload.topic === "string") {
    try {
      payload.topic = JSON.parse(payload.topic);
    } catch {
      payload.topic = [];
    }
  }

  const validation = ReviewerFormSchema.safeParse(payload);

  if (!validation.success) {
    return {
      error: validation.error.flatten().fieldErrors,
      status: APIStatus.FAIL,
      statusCode: 400,
      message: "",
    };
  }

  const response = await authPostOrPatch(
    `${BACKEND_URL}/user/update-reviewer`,
    "POST",
    JSON.stringify(validation.data),
  );

  const resData = await response.json();

  if (response.ok) revalidatePath("/admin/users");
  return resData;
};

export const createProfile = async (
  state: AdvanceFormState,
  data: FormData,
): Promise<AdvanceFormState> => {
  const payload: any = Object.fromEntries(data.entries());

  const validation = ProfileServerSchema.safeParse(payload);

  if (!validation.success) {
    const fields: Record<string, string> = {};

    for (const key of Object.keys(payload)) {
      fields[key] = payload[key].toString();
    }

    revalidatePath("/dashboard/profile");

    return {
      errors: validation.error.flatten().fieldErrors,

      success: false,
    };
  }

  const response = await authPostOrPatch(
    `${BACKEND_URL}/profile`,
    "POST",
    JSON.stringify(validation.data),
  );

  const resData = await response.json();

  if (!response.ok) {
    return {
      errors: resData.error,
      success: false,
    };
  }

  return {
    success: response.ok,
  };
};

export const createAbstract = async (
  state: AdvanceFormState,
  data: FormData,
): Promise<AdvanceFormState> => {
  const payload: any = Object.fromEntries(data.entries());

  if (payload.co_authors) {
    payload.co_authors = JSON.parse(payload.co_authors);
  }

  const ip_address = await getUserIP();
  payload.ip_address = ip_address;

  console.log(payload);

  const validation = AbstractFormSchema.safeParse(payload);
  console.log("Validation result:", validation);
  if (!validation.success) {
    const fields: Record<string, string> = {};

    for (const key of Object.keys(payload)) {
      fields[key] = payload[key].toString();
    }

    revalidatePath("/dashboard/abstracts");

    return {
      errors: validation.error.flatten().fieldErrors,

      success: false,
    };
  }

  const response = await authPostOrPatch(
    `${BACKEND_URL}/abstracts`,
    "POST",
    JSON.stringify(validation.data),
  );

  const resData = await response.json();
  console.log("Abstract creation result:", resData);

  if (!response.ok) {
    return {
      errors: parseApiError(resData.message),
      success: false,
    };
  }
  return {
    success: response.ok,
  };
};

export async function sendContact(prevState: any, formData: FormData) {
  const payload = Object.fromEntries(formData.entries());

  const validation = ContactSchema.safeParse(payload);

  console.log("Contact form validation result:", validation);

  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await fetch(`${BACKEND_URL}/mail/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validation.data),
    });

    console.log("Contact form response:", res);

    if (!res.ok) {
      const data = await res.json();

      return {
        success: false,
        errors: {
          server: [data.message || "Failed to send"],
        },
      };
    }

    return { success: true };
  } catch (err) {
    return {
      success: false,
      errors: {
        server: ["Something went wrong"],
      },
    };
  }
}
