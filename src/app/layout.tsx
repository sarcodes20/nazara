import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Archivo, IBM_Plex_Mono } from "next/font/google";
import { SITE } from "@/data/site";
import { organisationSchema } from "@/lib/schema";
import { NOINDEX } from "./robots";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Cursor } from "@/components/motion/Cursor";
import { Choreography } from "@/components/motion/Choreography";
import { Header } from "@/components/site/Header";
import { SelectionProvider } from "@/components/selection/SelectionProvider";
import { SelectionTray } from "@/components/selection/SelectionTray";
import "./globals.css";

/**
 * Self-hosted through next/font: zero layout shift, no third-party request,
 * and the optical-size axis on Bodoni survives, which is the difference
 * between a Didone that looks couture and one that looks free.
 */
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex",
  display: "swap",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Nazara · Marble & Granite, Kishangarh",
    template: "%s | Nazara",
  },
  description:
    "A library of forty-one stones, selected block by block in Rajasthan. Open by appointment. Nothing here was designed; everything here was chosen.",
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  formatDetection: { telephone: false, address: false, email: false },
  // robots.txt is only a request; the meta tag is what actually keeps a demo
  // out of the index. Both read the same flag.
  robots: NOINDEX
    ? { index: false, follow: false, nocache: true }
    : { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  // The viewer's theme picks the ground; both are declared so the browser
  // chrome matches rather than flashing white behind a dark page.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#EAEBE4" },
    { media: "(prefers-color-scheme: dark)", color: "#0F1411" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-IN"
      className={`${bodoni.variable} ${archivo.variable} ${plex.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organisationSchema()),
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[999] focus:bg-ink focus:px-5 focus:py-3 focus:text-ground"
        >
          Skip to content
        </a>

        <SelectionProvider>
          <SmoothScroll />
          <Cursor />
          <Header />
          <main id="main">
            <Choreography>{children}</Choreography>
          </main>
          <SelectionTray />
        </SelectionProvider>
      </body>
    </html>
  );
}
