import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
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

export const metadata: Metadata = {
  title: "Event Saathi — Build Your Event Team in Minutes",
  description:
    "India's premier event staffing marketplace. Find verified anchors, decorators, coordinators and production crews for any event, anywhere in India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} scroll-smooth`}
    >
      {/*
        Removed: bg-[#030306] text-white font-sans
        globals.css handles all color and typography tokens.
        Only keep antialiased and min-h-screen from Tailwind.
      */}
      <body className="min-h-screen antialiased">
        {/* <PageLoader /> */}
        {children}
      </body>
    </html>
  );
}

