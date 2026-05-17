import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_URL ?? "https://agora-network.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AGORA — The open database of the world's communities",
    template: "%s · AGORA",
  },
  description:
    "AGORA collects every community on Earth into one open, Wikipedia-style atlas — and helps you find where you belong. Built by Stark Technologies.",
  keywords: [
    "AGORA",
    "communities",
    "open database",
    "Stark Technologies",
    "network state",
    "human connection",
    "social graph",
  ],
  authors: [{ name: "Stark Technologies", url: SITE_URL }],
  openGraph: {
    title: "AGORA — The open database of the world's communities",
    description:
      "Wikipedia × LinkedIn × the world's diaspora of communities. By Stark Technologies.",
    url: SITE_URL,
    siteName: "AGORA",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "AGORA" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AGORA",
    description: "The open database of the world's communities.",
    images: ["/og-image.svg"],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#1A1F1A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-olive-black text-marble-white marble-bg antialiased">
        {children}
      </body>
    </html>
  );
}
