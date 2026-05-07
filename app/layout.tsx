import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import CursorGlow from "@/components/layout/CursorGlow";
import ScrollProgress from "@/components/layout/ScrollProgress";
import AmbientBackground from "@/components/layout/AmbientBackground";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tamada Media — Your Thumb Stops Here",
  description:
    "South India's largest content ecosystem. Creator network, IP builder, OTT partner, production house. 750+ channels. 4.8B+ monthly views.",
  openGraph: {
    title: "Tamada Media",
    description: "Your Thumb Stops Here. South India's largest content ecosystem.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${inter.variable}`}
    >
      <body className="bg-[#080808] text-[#F5E6D0] antialiased overflow-x-hidden">
        {/* Ambient background — blobs + topology */}
        <AmbientBackground />
        {/* Global grain overlay */}
        <div className="grain-overlay" aria-hidden />
        <CursorGlow />
        <ScrollProgress />
        <Navigation />
        <main className="bg-[#080808]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
