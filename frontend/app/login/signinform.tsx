"use client";

import { signin } from "@/action/auth";
import { Input } from "@/components/input";
import SubmitButton from "@/components/submitButton";
import { Lock, Mail } from "lucide-react";

import Link from "next/link";
import { useActionState } from "react";

export default function Signinform() {
  const [state, action] = useActionState(signin, undefined);
  return (
    <form action={action} className="space-y-5">
      <div className="flex flex-col gap-2">
        {state?.message && (
          <p className="text-red-500 text-sm">{state.message}</p>
        )}
        <div className="relative group">
          <Mail className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="john@gmail.com"
            className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#C5A059] outline-none text-xs font-bold text-[#003366]"
            defaultValue="admin@gmail.com"
          />
        </div>
        {state?.error?.email && (
          <div className="text-red-500 text-sm">{state.error.email}</div>
        )}
        <div className="relative group">
          <Lock className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />

          <Input
            id="password"
            type="password"
            name="password"
            className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#C5A059] outline-none text-xs font-bold text-[#003366]"
            defaultValue="test123"
          />
        </div>
        {state?.error?.password && (
          <div className="text-red-500 text-sm">{state.error.password}</div>
        )}
        <Link className="text-sm underline" href="#">
          Forgot your password?
        </Link>

        <SubmitButton>Sign In</SubmitButton>
      </div>
    </form>
  );
}
{
  /* <form onSubmit={handleLogin} className="space-y-5">
  <div className="relative">
    <Mail className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
    <input
      type="email"
      required
      placeholder="Institutional Email"
      className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#003366] focus:bg-white transition-all outline-none"
      onChange={(e) => setData({ ...data, email: e.target.value })}
    />
  </div>

  <div className="relative">
    <Lock className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
    <input
      type="password"
      required
      placeholder="Password"
      className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#003366] focus:bg-white transition-all outline-none"
      onChange={(e) => setData({ ...data, password: e.target.value })}
    />
  </div>

  <button
    type="submit"
    disabled={loading}
    className="w-full bg-[#003366] text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-[#003366]/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
  >
    {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
    {!loading && <ArrowRight className="w-5 h-5" />}
  </button>
</form>; */
}
