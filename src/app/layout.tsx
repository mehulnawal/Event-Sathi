'use client';

import { Syne, DM_Sans } from "next/font/google";
import { usePathname } from "next/navigation";
import "@/app/globals.css";
import PageLoader from "@/app/PageLoader";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} scroll-smooth`}
    >
      <body className="min-h-screen antialiased">
        {/* Loader sirf tabhi aayega jab url exact "/" hoga (like http://localhost:3000/) */}
        {pathname === "/" && <PageLoader />}

        {children}
      </body>
    </html>
  );
}