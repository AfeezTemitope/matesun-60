import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="texture-grain">{children}</body>
    </html>
  );
}
