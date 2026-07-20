import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";

// Industry-Standard Production Level Metadata Engine
export const metadata = {
  title: {
    default: "Eventsaathi | Premium Wedding Planners & Verified Vendors",
    template: "%s | Eventsaathi",
  },
  description:
    "Eventsaathi is India's premier wedding planning companion connecting families with top-tier verified venues, couture decor, gourmet catering, and cinematic photography with instant 30-minute support.",
  keywords: [
    "wedding planners in india",
    "verified wedding vendors",
    "luxury wedding decor",
    "wedding catering services",
    "emergency wedding planning",
    "tatkal event backup",
    "best wedding venues",
    "event saathi planner",
  ],
  authors: [{ name: "Eventsaathi Team" }],
  creator: "Eventsaathi",
  publisher: "Eventsaathi",

  category: "Wedding Planning & Event Management",

  openGraph: {
    title: "Eventsaathi | Every Indian Wedding Needs a Trusted Saathi",
    description:
      "Discover verified wedding partners, custom budget quotes, and a 30-minute live backup response network for a stress-free ghar jaisa luxury celebration.",
    url: "https://eventsaathi.com",
    siteName: "Eventsaathi",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://eventsaathi.com/assets/og-preview-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Eventsaathi Premium Wedding Planning Ecosystem",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Eventsaathi | Premium Wedding Planners & Verified Vendors",
    description:
      "Handpicked premium service pairings and emergency backup infrastructure designed to execute flawless luxury weddings.",
    images: ["https://eventsaathi.com/assets/og-preview-banner.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/assets/favicon.png",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Local Business Structured Data (JSON-LD Schema) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Eventsaathi",
              image: "https://eventsaathi.com/assets/logo-placeholder.png",
              description:
                "Premium wedding planning platform and verified event vendor network in India.",
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
              },
              priceRange: "$$$",
              telephone: "",
              url: "https://eventsaathi.com",
            }),
          }}
        />
      </head>

      <body suppressHydrationWarning={true}>
        <GoogleTagManager gtmId="GTM-PPVP793P" />
        {children}
      </body>
    </html>
  );
}
