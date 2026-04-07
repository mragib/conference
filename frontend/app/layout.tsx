import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Conference DBA 2026",
  description: "International Conference on Economics and Business",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};

export default async function RootLayout({
  children,
  auth,
  cfp, // 🚀 Added the CFP slot here
}: Readonly<{
  children: React.ReactNode;
  auth: React.ReactNode;
  cfp: React.ReactNode; // 🚀 Added type definition
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={roboto.variable}>
      <body className="antialiased font-sans">
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              background: "#003366",
              color: "#fff",
              borderRadius: "16px",
              fontSize: "12px",
              fontWeight: "bold",
              border: "1px solid #C5A059",
              padding: "12px 24px",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)",
            },
            success: {
              iconTheme: { primary: "#C5A059", secondary: "#003366" },
            },
            error: {
              style: {
                background: "#fff",
                color: "#7f1d1d",
                border: "1px solid #fecaca",
              },
              iconTheme: { primary: "#7f1d1d", secondary: "#fff" },
            },
          }}
        />

        {/* Main Application Content */}
        <main className="min-h-screen">{children}</main>

        {/* Parallel Route Slots 
            These slots will contain intercepted modals.
            If the route doesn't match, their respective default.tsx (returning null) is rendered.
        */}
        {auth && <div id="auth-portal">{auth}</div>}
        {cfp && <div id="cfp-portal">{cfp}</div>}

        {/* Optional: Portal root for specific modal handling */}
        <div id="modal-root" />
      </body>
    </html>
  );
}
