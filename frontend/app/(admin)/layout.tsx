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
  if (!session || !session.user || session.user.role !== Role.ADMIN)
    redirect("/");
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F8FAFC]">
      <Sidebar user={session.user} />
      <main className="flex-1 w-full overflow-x-hidden">
        {/* --- THEMATIC HEADER --- */}

        {children}
      </main>
    </div>
  );
}
