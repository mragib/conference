"use client";

import { signout } from "@/action/auth";
import { cn } from "@/lib/utils";
import { useActionState } from "react";

export default function SignOutButton({ className }: any) {
  const [state, action] = useActionState(signout, undefined);
  return (
    <form action={action}>
      <button
        className={cn(
          "px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition cursor-pointer",
          className,
        )}
      >
        Sign out
      </button>
    </form>
  );
}
