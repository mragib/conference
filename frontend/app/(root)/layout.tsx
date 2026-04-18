import Navbar from "@/components/Navbar";
import { getPublicSession } from "@/lib/session";
import { ReactNode } from "react";

export default async function RootContentLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getPublicSession();

  return (
    <>
      <Navbar user={session?.user} />
      {children}
    </>
  );
}
