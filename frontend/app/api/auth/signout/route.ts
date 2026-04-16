import { BACKEND_URL } from "@/lib/constants";
import { authFetch } from "@/lib/data-service";
import { destroySession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log("logout button call");

  const response = await authFetch(`${BACKEND_URL}/auth/signout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  if (response.ok) {
    await destroySession();
  }
  console.log("logout");
  revalidatePath("/", "layout");
  revalidatePath("/", "page");

  return NextResponse.redirect(new URL("/", req.nextUrl));
}
