import Sidebar from "@/components/Sidebar";
import { getSession } from "@/lib/session";
import { Role } from "@/lib/type";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session || !session.user || session.user.role !== Role.REVIEWER) {
    const headersList = await headers();
    const currentUrl = headersList.get("x-url") || "";

    // Fallback approach if custom middleware header isn't set:
    // Extracting just the relative path from the standard 'referer' or host header
    const searchParams = headersList.get("x-forwarded-uri") || "";

    if (searchParams) {
      const encodedCallback = encodeURIComponent(searchParams);
      redirect(`/signin?callbackUrl=${encodedCallback}`);
    }

    redirect("/signin");
  }
  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <Sidebar user={session.user} />
      <main className="flex-1 w-full overflow-x-hidden pt-16 md:pt-0">
        {children}
      </main>
    </div>
  );
}
