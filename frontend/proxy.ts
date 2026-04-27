import { jwtVerify } from "jose";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Role } from "./lib/type";

export default async function proxy(request: NextRequest) {
  const secretkey = process.env.SESSION_SECRET!;
  const encodedSecret = new TextEncoder().encode(secretkey);

  const cookieStore = request.cookies.get("session")?.value;
  const path = request.nextUrl.pathname;

  if (!cookieStore) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/session/${cookieStore}`,
      {
        headers: { "Content-Type": "application/json" },
      },
    );

    if (!res.ok) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const data = await res.json();

    if (!data?.session) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const { payload } = await jwtVerify(data.session, encodedSecret);

    const role = payload?.user?.role;

    if (role === Role.ADMIN && !path.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    if (role === Role.RESEARCHER && !path.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (role === Role.REVIEWER && !path.startsWith("/reviewer")) {
      return NextResponse.redirect(new URL("/reviewer", request.url));
    }

    if (role === Role.AUTHORITY && !path.startsWith("/authority")) {
      return NextResponse.redirect(new URL("/authority", request.url));
    }

    return NextResponse.next();
  } catch (err) {
    const response = NextResponse.redirect(new URL("/", request.url));

    // ✅ remove invalid session cookie
    response.cookies.delete("session");

    return response;
  }
}
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/reviewer/:path*",
    "/authority/:path*",
  ],
};
