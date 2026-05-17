import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "@/app/globals.css";

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
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}