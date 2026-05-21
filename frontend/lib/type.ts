import z from "zod";
import { getWordCount } from "./utils";

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

export type AdvanceFormState = {
  success: boolean;
  message?: string;
  fields?: Record<string, string>;
  errors?: Record<string, string[]>;
};

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

// export const UserFormSchema = z.object({
//   name: z.string().min(2, "Name should be at least 2 characters long").trim(),
//   email: z.string().email("Invalid email address").trim(),
// });

export enum USER_TYPE {
  ACADEMIC = "ACADEMIC",
  INDUSTRY = "INDUSTRY",
  STUDENT = "STUDENT",
}
export type UserProfile = {
  first_name: string;
  last_name: string;
  designation: string;
  country: string;
  organization: string;
  user_type: USER_TYPE;
  contact_number: string;
};

export const ProfileFormSchema = z.object({
  first_name: z
    .string()
    .min(2, "First Name Should be at leaste 2 characters long")
    .trim(),
  last_name: z
    .string()
    .min(2, "Last Name Should be at leaste 2 characters long")
    .trim(),

  countryObj: z.object({
    label: z.string(),
    value: z.string().min(1, "Country is required"),
  }),
  country: z.string().trim().optional(),

  designation: z.string().min(1, "Designation is required").trim(),

  organization: z.string().min(1, "Organization is required").trim(),
  user_typeObj: z.object({
    label: z.string(),
    value: z.string().min(1, "User type is required"),
  }),
  email: z.string(),
  user_type: z.string().trim().optional(),
  contact_number: z.string().min(1, "Contact Number is required").trim().trim(),
});

export const ProfileServerSchema = ProfileFormSchema.omit({
  countryObj: true,
  user_typeObj: true,
}).extend({
  country: z.string(),
  user_type: z.string(),
});

export const OtpFormSchema = z.object({
  otp: z.string().min(6),
  email: z.string(),
});

export type CoAuthor = {
  first_name: string;
  last_name: string;
  email: string;
  organization: string;
};

export type AbstractStatus = {
  name: string;
  description: string;
};

export type AbstractType = {
  id?: string;
  title: string;
  purpose: string;
  methodology: string;
  findings: string;
  theoretical: string;
  practical: string;
  references: string;
  keyword: string;
  ip_address?: string;
  topicId?: string;
  topic: Topic;
  co_authors: CoAuthor[];
  status: AbstractStatus;
  created_at?: Date;
};

export type AbstractTableRow = {
  id: string;
  title: string;

  topic: string; // ✅ flattened
  status: string; // ✅ flattened
  has_review: boolean;

  coAuthors: {
    name: string;
    email: string;
  }[];

  reviewers: {
    name: string;
    email: string;
    is_agreed: boolean;
  }[];

  // optional (only if needed)
  _raw?: {
    assigns: any[];
  };
};

export const AbstractFormSchema = z
  .object({
    title: z
      .string()
      .min(2, "Title Should be at leaste 2 characters long")
      .trim(),
    topic: z
      .object({
        label: z.string(),
        value: z.string().min(1, "Topic is required"),
      })
      .optional()
      .refine((val) => val && val.value, {
        message: "Sub Theme is required",
      }),
    topicId: z.string().trim().optional(),

    keyword: z.string().min(1, "Keyword is required").trim(),

    purpose: z.string().trim().min(1, "Purpose is required"),

    methodology: z.string().trim().min(1, "Methodology is required"),

    findings: z.string().trim().min(1, "Findings  is required"),

    theoretical: z
      .string()
      .trim()
      .min(1, "Theoretical Implications is required"),

    practical: z.string().trim().min(1, "Practical Implications is required"),

    references: z.string().trim().min(1, "References is required"),

    ip_address: z.string().trim().optional(),

    co_authors: z
      .array(
        z.object({
          first_name: z.string().min(1).trim(),
          last_name: z.string().min(1).trim(),
          email: z.string().email().trim(),
          organization: z.string().min(1).trim(),
          display_order: z.coerce.number(),
        }),
      )
      .min(1, "At least one co-author is required")
      .refine(
        (authors) =>
          new Set(authors.map((a) => a.email)).size === authors.length,
        "Duplicate co-author emails are not allowed",
      ),
  })
  .refine(
    (data) => {
      const total =
        getWordCount(data.purpose) +
        getWordCount(data.methodology) +
        getWordCount(data.findings) +
        getWordCount(data.theoretical) +
        getWordCount(data.practical) +
        getWordCount(data.references);

      return total <= 750;
    },
    {
      message: "Total word limit must not exceed 750",
    },
  );

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),

    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

export const ContactSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type User = {
  name: string;
  email: string;
  role: Role;
  profile: UserProfile;
  is_active: boolean;
};

export const UserSchema = z.object({
  name: z.string(),
  email: z.string(),
});

export type REVEIWER_USER_TYPE = {
  id: string;
  user: User;
  display_order: number;
  is_active: boolean;
};

export type REVIEWER_TYPE_FOR_TABLE = {
  id: string;
  name: string;
  email: string;
  display_order: number;
  is_active: boolean;
  total_assigned: number;
  total_agreed: number;
  total_declined: number;
  total_pending: number;
  total_reviewed: number;
};

export const ReviewerUserSchema = z.object({
  name: z.string().min(2, "Name should be at least 2 characters long").trim(),
  email: z.string().email(),
  display_order: z.coerce.number().min(0),
  is_active: z.boolean().optional(),
});

export type ReviewerAbstractType = {
  id?: string;
  is_agreed: boolean | null;
  acknowledge_date: Date | null;
  assign_date: Date;
  abstract: AbstractType;
  has_review?: boolean;
};

export const AdminUserCreateFormSchema = z.object({
  name: z.string().min(2, "Name should be at least 2 characters long").trim(),
  email: z.string().email(),
  role: z.enum(Role).optional(),
  roleObj: z.object({
    label: z.string(),
    value: z.string().min(1, "Role is required"),
  }),
  is_active: z.coerce.boolean(),
});

export const AdminUserServerSchema = AdminUserCreateFormSchema.omit({
  roleObj: true,
}).extend({
  role: z.string(),
});

export const AbstractReviewerChangeSchema = z.object({
  reviewerId: z.string().trim().optional(),
  reviewerObj: z.object({
    label: z.string(),
    value: z.string().min(1, "Role is required"),
  }),
  abstractId: z.string().trim(),
});

export const AbstractReviewerChangeSchemaServer =
  AbstractReviewerChangeSchema.omit({
    reviewerObj: true,
  }).extend({
    reviewerId: z.string().trim(),
  });
