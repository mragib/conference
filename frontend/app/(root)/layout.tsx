import Navbar from "@/components/Navbar";
import { getSession } from "@/lib/session";
import { ReactNode } from "react";

export default async function RootContentLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();

  return (
    <>
      <Navbar user={session?.user} />
      {children}
    </>
  );
}
