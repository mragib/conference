import { jwtVerify } from "jose";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Role } from "./lib/type";

export default async function proxy(request: NextRequest) {
  const secretkey = process.env.SESSION_SECRET!;
  const encodedSecret = new TextEncoder().encode(secretkey);

  const cookieStore = request.cookies.get("session")?.value;
  const path = request.nextUrl.pathname;
  const searchParams = request.nextUrl.search;

  if (!cookieStore) {
    // return NextResponse.redirect(new URL("/", request.url));
    const targetUrl = encodeURIComponent(path + searchParams);
    return NextResponse.redirect(
      new URL(`/signin?callbackUrl=${targetUrl}`, request.url),
    );
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/session/${cookieStore}`,
      {
        headers: { "Content-Type": "application/json" },
      },
    );

    // if (!res.ok) {
    //   return NextResponse.redirect(new URL("/", request.url));
    // }

    if (!res.ok) {
      const targetUrl = encodeURIComponent(path + searchParams);
      const response = NextResponse.redirect(
        new URL(`/signin?callbackUrl=${targetUrl}`, request.url),
      );
      response.cookies.delete("session");
      return response;
    }

    const data = await res.json();

    // if (!data?.session) {
    //   return NextResponse.redirect(new URL("/", request.url));
    // }

    if (!data?.session) {
      const targetUrl = encodeURIComponent(path + searchParams);
      return NextResponse.redirect(
        new URL(`/signin?callbackUrl=${targetUrl}`, request.url),
      );
    }

    const { payload } = await jwtVerify(data.session, encodedSecret);

    const role = payload?.user?.role;

    const roleRoutes = {
      [Role.ADMIN]: "/admin",
      [Role.RESEARCHER]: "/dashboard",
      [Role.REVIEWER]: "/reviewer",
      [Role.AUTHORITY]: "/authority",
    } as const;

    const baseRoute = roleRoutes[role];

    const routePrefixes = ["/admin", "/dashboard", "/reviewer", "/authority"];

    const currentPrefix = routePrefixes.find((prefix) =>
      path.startsWith(prefix),
    );

    if (baseRoute && !path.startsWith(baseRoute)) {
      const newPath = path.replace(currentPrefix, baseRoute);

      const url = new URL(request.url);
      url.pathname = newPath;

      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch (err) {
    // const response = NextResponse.redirect(new URL("/", request.url));

    // // ✅ remove invalid session cookie
    // response.cookies.delete("session");

    // return response;
    const targetUrl = encodeURIComponent(path + searchParams);
    const response = NextResponse.redirect(
      new URL(`/signin?callbackUrl=${targetUrl}`, request.url),
    );
    response.cookies.delete("session");
    return response;
  }
}
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/authority/:path*",
    "/reviewer/:path*",
  ],
};
