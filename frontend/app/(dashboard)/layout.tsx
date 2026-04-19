import Sidebar from "@/components/Sidebar";
import { getSession } from "@/lib/session";
import { Role } from "@/lib/type";
import { redirect } from "next/navigation";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session || !session.user || session.user.role !== Role.RESEARCHER)
    redirect("/");
  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <Sidebar user={session.user} />
      <main className="flex-1 w-full overflow-x-hidden pt-16 md:pt-0">
        {children}
      </main>
    </div>
  );
}
