import { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About — Tamada Media",
  description: "15+ years of building South India's largest content ecosystem. Creator network, IP builder, OTT partner.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
