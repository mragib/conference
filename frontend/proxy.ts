import { jwtVerify } from "jose";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getSessionBySessionId } from "./lib/data-service";
import { Role } from "./lib/type";

export default async function proxy(request: NextRequest) {
  const secretkey = process.env.SESSION_SECRET!;
  const encodedSecret = new TextEncoder().encode(secretkey);
  const cookieStore = request.cookies.get("session")?.value;

  const path = request.nextUrl.pathname;

  // If no cookie, redirect to login
  if (!cookieStore) return NextResponse.redirect(new URL("/", request.url));

  try {
    const data = await getSessionBySessionId(cookieStore);
    const { payload } = await jwtVerify(data.session, encodedSecret);

    // Only redirect if user is NOT already on their page
    if (payload && payload.user) {
      const role = payload.user.role;

      if (role === Role.ADMIN && !path.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/admin", request.url), 307);
      }

      if (role === Role.RESEARCHER && !path.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/dashboard", request.url), 307);
      }
    }
  } catch (err) {
    console.error("Session verification failed:", err);
    // optionally clear cookie
    return NextResponse.redirect(new URL("/", request.url));
  }

  // let the request continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
