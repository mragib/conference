import Navbar from "@/components/Navbar";
import { getSession } from "@/lib/session";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conference DBA 2026",
  description: "International Conference on Economics and Business",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <>
      <Navbar user={session?.user} />
      {children}
    </>
  );
}
