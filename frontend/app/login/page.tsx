import Link from "next/link";

import Signinform from "./signinform";

const LoginPage = async () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
      <div className="w-full max-w-[450px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        {/* Top Accent Bar */}
        <div className="h-2 bg-gradient-to-r from-[#003366] via-[#C5A059] to-[#003366]"></div>

        <div className="p-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-[#003366] tracking-tight">
              Welcome Back
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
              Researcher Portal Access
            </p>
          </div>

          <Signinform />

          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <p className="text-slate-600">
              New researcher?{" "}
              <Link
                href="/register"
                className="text-[#C5A059] font-bold hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
