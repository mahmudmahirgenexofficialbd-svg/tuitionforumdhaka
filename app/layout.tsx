import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { ToastProvider } from "@/components/ui/toast";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} | Find the right tutor`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  openGraph: { title: siteConfig.name, description: siteConfig.description, type: "website", siteName: siteConfig.name },
  twitter: { card: "summary_large_image", title: siteConfig.name, description: siteConfig.description },
};
export const viewport: Viewport = { themeColor: "#1E3790", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body><ToastProvider>{children}</ToastProvider></body>
    </html>
  );
}
