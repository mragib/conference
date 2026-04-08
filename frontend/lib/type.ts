import z from "zod";

export type FormState =
  | {
      error?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type ApiResponse =
  | {
      error?: any; // Can be string or field errors object
      message?: string;
      status?: string;
      statusCode?: number;
      data?: any;
    }
  | undefined;

export const SignupFormSchema = z.object({
  name: z.string().min(2, "Name should be at least 2 characters long").trim(),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password should be at least 6 characters long")
    .regex(/[a-zA-Z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character",
    ),
});

export const SigninFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password field cannot be empty"),
});

export enum Role {
  RESEARCHER = "RESEARCHER",
  REVIEWER = "REVIEWER",
  ADMIN = "ADMIN",
  AUTHORITY = "AUTHORITY",
}

export enum APIStatus {
  SUCCESS = "success",
  FAIL = "fail",
}

export const UserFormSchema = z.object({
  name: z.string().min(2, "Name should be at least 2 characters long").trim(),
  email: z.string().email("Invalid email address").trim(),
  password: z
    .string()
    .min(6, "Password should be at least 6 characters long")
    .regex(/[a-zA-Z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character",
    ),

  phone: z
    .string("Phone number should not be empty")
    .regex(
      /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/,
      "Provide proper phone number",
    )
    .trim(),
  address: z.string("Please provide address").trim(),
  role: z.enum(Role),
  is_active: z.boolean(),
});

export type Topic = {
  id: string;
  name: string;
};

export const TopicSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type REVEIWER_USER = {
  id: string;
  name: string;
  email: string;
  topic?: Topic[];
};

export const ReviewerFormSchema = z.object({
  name: z.string().min(2, "Name should be at least 2 characters long").trim(),
  email: z.string().email("Invalid email address").trim(),
  topic: z.array(TopicSchema).min(1, "Select at least one topic"),
});
