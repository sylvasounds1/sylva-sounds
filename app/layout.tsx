import type { Metadata, Viewport } from "next";
import { displayFont, bodyFont } from "@/lib/fonts";
import "@/styles/globals.css";
import "@/styles/animations.css";
import { AudioProvider } from "@/components/audio/AudioProvider";
import { MiniPlayer } from "@/components/audio/MiniPlayer";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollIndicator } from "@/components/layout/ScrollIndicator";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { WaveformWorld } from "@/components/three/WaveformWorld";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Music, Sound & Audio Production`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL("https://sylvasounds.com"),
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "icon", url: "/icon-192.png", sizes: "192x192" },
      { rel: "icon", url: "/icon-512.png", sizes: "512x512" },
    ],
  },
  openGraph: {
    title: site.name,
    description: site.description,
    type: "website",
    locale: "en_US",
    siteName: site.name,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SYLVA SOUNDS — From Silence to Experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0B",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        <AudioProvider>
          <SmoothScroll>
            <WaveformWorld />
            <Navbar />
            <ScrollIndicator />
            <main className="relative z-10">{children}</main>
            <Footer />
            <MiniPlayer />
          </SmoothScroll>
        </AudioProvider>
      </body>
    </html>
  );
}
