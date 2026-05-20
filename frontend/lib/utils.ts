import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
  if (!str) return "";
  return str.charAt(0)?.toUpperCase() + str?.slice(1).toLowerCase();
}

export function changeForSelectArray(data: any[] | null | undefined) {
  if (!data || !Array.isArray(data)) {
    return [];
  }

  return data
    .map((item) => {
      // Skip items without proper id or name
      if (!item || item.id == null || !item.name) {
        return null;
      }

      return {
        label: capitalize(String(item.name)),
        value: String(item.id), // Ensure value is always a string
      };
    })
    .filter((item): item is { label: string; value: string } => item !== null); // Type guard to filter out nulls
}

export function changeForDatabaseArray(data: any[] | null | undefined) {
  if (!data || !Array.isArray(data)) {
    return [];
  }

  return data
    .map((item) => {
      if (!item || item.value == null || !item.label) {
        return null;
      }

      return {
        name: String(item.label),
        id: item.value, // Keep original type (could be string or number)
      };
    })
    .filter((item): item is { name: string; id: any } => item !== null);
}

export function changeForSelectObject(data: any) {
  if (!data || data.id == null || !data.name) {
    return null;
  }

  return {
    label: capitalize(String(data.name)),
    value: String(data.id), // Ensure value is always a string
  };
}

export function changeForDatabaseObject(data: any) {
  if (!data || data.value == null || !data.label) {
    return null;
  }

  return {
    name: String(data.label),
    id: data.value, // Keep original type
  };
}

export const getWordCount = (text: string) => {
  if (!text) return 0;

  const cleanText = text
    .replace(/<[^>]*>/g, " ") // remove HTML tags
    .replace(/&nbsp;/g, " ") // fix non-breaking spaces
    .replace(/\s+/g, " "); // normalize spaces

  return cleanText.trim() ? cleanText.trim().split(" ").length : 0;
};

export const formatErrors = (errors?: Record<string, string[]>) => {
  if (!errors) return "Something went wrong";

  return Object.values(errors).flat().join("\n");
};

export function getPasswordStrength(password: string) {
  const rules = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const score = Object.values(rules).filter(Boolean).length;

  let label = "Very Weak";
  let color = "bg-red-500";

  if (score === 5) {
    label = "Strong";
    color = "bg-green-500";
  } else if (score >= 3) {
    label = "Medium";
    color = "bg-yellow-500";
  } else if (score >= 2) {
    label = "Weak";
    color = "bg-orange-500";
  }

  return { rules, score, label, color };
}
export function parseApiError(error: unknown): string {
  if (!error) return "Something went wrong";

  if (typeof error === "string") return error;

  if (Array.isArray(error)) return error.join(", ");

  if (typeof error === "object") {
    const err = error as any;

    // NestJS standard
    if (err.message) {
      return Array.isArray(err.message) ? err.message.join(", ") : err.message;
    }

    if (err.response?.message) {
      return Array.isArray(err.response.message)
        ? err.response.message.join(", ")
        : err.response.message;
    }
  }

  return "Something went wrong";
}

export function formatDateTime(date) {
  if (!date) return "";

  return new Intl.DateTimeFormat("en-BD", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export const parseError = (errors: any): string => {
  if (!errors) return "Something went wrong";

  const extract = (value: any): string | null => {
    if (!value) return null;

    // string
    if (typeof value === "string") return value;

    // array
    if (Array.isArray(value)) {
      return extract(value[0]);
    }

    // object
    if (typeof value === "object") {
      // direct message
      if ("message" in value && typeof value.message === "string") {
        return value.message;
      }

      // recursive nested search
      for (const nested of Object.values(value)) {
        const found = extract(nested);

        if (found) return found;
      }
    }

    return null;
  };

  return extract(errors) || "Something went wrong";
};
