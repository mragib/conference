"use client";

import { signout } from "@/action/auth";
import { useActionState } from "react";

export default function SignOutButton() {
  const [state, action] = useActionState(signout, undefined);
  return (
    <form action={action}>
      <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition cursor-pointer">
        Sign out
      </button>
    </form>
  );
}
