import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              background: "#003366", // Navy Blue
              color: "#fff",
              borderRadius: "16px", // Softer corners for premium feel
              fontSize: "12px",
              fontWeight: "bold",
              border: "1px solid #C5A059", // Gold Border
              padding: "12px 24px",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)",
            },
            success: {
              iconTheme: {
                primary: "#C5A059", // Gold Icon
                secondary: "#003366", // Navy Background for icon
              },
            },
            error: {
              style: {
                background: "#fff",
                color: "#7f1d1d",
                border: "1px solid #fecaca",
              },
              iconTheme: {
                primary: "#7f1d1d",
                secondary: "#fff",
              },
            },
          }}
        />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
