import { Metadata } from "next";
import WorkPageClient from "./WorkPageClient";

export const metadata: Metadata = {
  title: "Work — Tamada Media",
  description: "Featured campaigns, OTT originals, branded series, creator collaborations, and case studies.",
};

export default function WorkPage() {
  return <WorkPageClient />;
}
