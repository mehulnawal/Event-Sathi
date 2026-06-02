import "./globals.css";

export const metadata = {
  title: "EventSathi",
  description: "Every Event Needs a Saathi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
