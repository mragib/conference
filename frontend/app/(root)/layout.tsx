import Footer from "@/components/Footer";
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
    // The relative wrapper + pt-20 keeps the fixed navbar from overlapping your content
    <div className="relative min-h-screen w-full bg-white selection:bg-[#C5A059] selection:text-white">
      <Navbar user={session?.user} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
