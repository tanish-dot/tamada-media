import CaaSHero from "@/components/sections/CaaSHero";
import WhyNow from "@/components/sections/WhyNow";
import CaseStudyASBL from "@/components/sections/CaseStudyASBL";
import Manifesto from "@/components/sections/Manifesto";
import WhyTamada from "@/components/sections/WhyTamada";
import Process from "@/components/sections/Process";
import SouthIdentity from "@/components/sections/SouthIdentity";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata = {
  title: "Content as a Service — Tamada Media",
  description: "Tamada Media's Content as a Service offering — strategy, production, distribution, and IP building at scale.",
};

export default function CaaSPage() {
  return (
    <>
      <CaaSHero />
      <WhyNow />
      <div id="manifesto"><Manifesto /></div>
      <WhyTamada />
      <Process />
      <CaseStudyASBL />
      <SouthIdentity />
      <FinalCTA />
    </>
  );
}
