"use client";

import { signout } from "@/action/auth";
import { LogOut } from "lucide-react";
import { useActionState } from "react";

export default function SignOutButtonNavbar() {
  const [state, action] = useActionState(signout, undefined);
  return (
    <form action={action}>
      <button className="text-red-400 hover:text-red-300 transition-colors cursor-pointer">
        <LogOut size={18} />
      </button>
    </form>
  );
}
