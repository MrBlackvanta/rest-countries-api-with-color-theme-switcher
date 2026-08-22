import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Providers } from "@/providers/providers";
import { openGraphBase, siteName, siteUrl } from "@/lib/site";
import type { Metadata, Viewport } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  weight: ["300", "600", "800"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Browse every country`,
    template: `%s | ${siteName}`,
  },
  description:
    "Search every country by name, filter by region, and open a detail view for its capital, population and bordering countries.",
  alternates: { canonical: "/" },
  // No title or description here on purpose: letting both fall back per route is what
  // makes /country/[code] share as the country's own name.
  openGraph: { ...openGraphBase, url: "/" },
  twitter: { card: "summary_large_image", images: openGraphBase.images },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "hsl(0, 0%, 98%)" },
    { media: "(prefers-color-scheme: dark)", color: "hsl(207, 26%, 17%)" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nunitoSans.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh w-full flex-col">
        <Providers>
          <Header />
          <main className="mx-auto flex w-full max-w-7xl grow flex-col px-4">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
