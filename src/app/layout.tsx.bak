import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yemisi Matesun — 60th Birthday Celebration",
  description: "Join us in celebrating on 7 June 2026.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://yemisi60.vercel.app"),
  openGraph: {
    title: "Yemisi Matesun — 60th Birthday Celebration",
    description: "Join us on 7 June 2026 as we celebrate this special milestone.",
    images: ["/og-image.jpg"],
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yemisi Matesun — 60th Birthday Celebration",
    description: "Join us on 7 June 2026",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${greatVibes.variable} ${inter.variable}`}>
      <body className="texture-grain">{children}</body>
    </html>
  );
}