import { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact — Tamada Media",
  description: "Start a conversation. Let's build your next content engine.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
