import Hero from "@/components/sections/Hero";
import WhatWeDo from "@/components/sections/WhatWeDo";
import ServicesSection from "@/components/sections/ServicesSection";
import Founders from "@/components/sections/Founders";
import StatsSection from "@/components/sections/StatsSection";
import IPCreation from "@/components/sections/IPCreation";
import OTTSection from "@/components/sections/OTTSection";
import BrandSolutions from "@/components/sections/BrandSolutions";
import CampaignShowcase from "@/components/sections/CampaignShowcase";
import MicroDramas from "@/components/sections/MicroDramas";
import PlatformPartnerships from "@/components/sections/PlatformPartnerships";
import AwardsSection from "@/components/sections/AwardsSection";
import FinalCTA from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <StatsSection />
      <ServicesSection />
      <Founders />
      <IPCreation />
      <AwardsSection />
      <OTTSection />
      <BrandSolutions />
      <CampaignShowcase />
      <MicroDramas />
      <PlatformPartnerships />
      <FinalCTA />
    </>
  );
}
