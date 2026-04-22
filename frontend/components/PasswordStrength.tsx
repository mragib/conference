"use client";

import { getPasswordStrength } from "@/lib/utils";

export default function PasswordStrength({ password }: { password: string }) {
  const { rules, score, label, color } = getPasswordStrength(password);

  return (
    <div className="space-y-3 mt-2">
      {/* Strength Bar */}
      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${color}`}
          style={{ width: `${(score / 5) * 100}%` }}
        />
      </div>

      {/* Label */}
      <p className="text-xs font-semibold text-slate-600">
        Strength: <span className="font-bold text-black">{label}</span>
      </p>

      {/* Rules */}
      <ul className="text-xs space-y-1">
        <li className={rules.length ? "text-green-600" : "text-red-500"}>
          ✓ At least 8 characters
        </li>
        <li className={rules.upper ? "text-green-600" : "text-red-500"}>
          ✓ One uppercase letter
        </li>
        <li className={rules.lower ? "text-green-600" : "text-red-500"}>
          ✓ One lowercase letter
        </li>
        <li className={rules.number ? "text-green-600" : "text-red-500"}>
          ✓ One number
        </li>
        <li className={rules.special ? "text-green-600" : "text-red-500"}>
          ✓ One special character
        </li>
      </ul>
    </div>
  );
}
