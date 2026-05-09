import { Footer } from "@/components/layout";
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
  title: "REST Countries API with color theme switcher",
  description:
    "Frontend Mentor REST Countries API with color theme switcher challenge built with Next.js and TypeScript.",
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
    <html lang="en" className={`${nunitoSans.variable} antialiased`}>
      <body className="flex min-h-dvh w-full flex-col">
        {children}
        <Footer />
      </body>
    </html>
  );
}
