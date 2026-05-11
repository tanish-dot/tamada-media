import Hero from "@/components/sections/Hero";
import WhatWeDo from "@/components/sections/WhatWeDo";
import PlatformPartnerships from "@/components/sections/PlatformPartnerships";
import ContentShowcase from "@/components/sections/ContentShowcase";
import BrandLogoGrid from "@/components/sections/BrandLogoGrid";
import CaaSPitch from "@/components/sections/CaaSPitch";
import OriginalIPs from "@/components/sections/OriginalIPs";
import Founders from "@/components/sections/Founders";
import JoinUs from "@/components/sections/JoinUs";
import FinalCTA from "@/components/sections/FinalCTA";
import SectionTransition from "@/components/layout/SectionTransition";
import MarqueeDivider from "@/components/ui/MarqueeDivider";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeDivider bg="red" speed={28} />
      <SectionTransition><WhatWeDo /></SectionTransition>
      <MarqueeDivider bg="dark" speed={35} reverse />
      <SectionTransition><ContentShowcase /></SectionTransition>
      <SectionTransition><PlatformPartnerships /></SectionTransition>
      <MarqueeDivider bg="red" speed={25} />
      <SectionTransition><BrandLogoGrid /></SectionTransition>
      <SectionTransition><CaaSPitch /></SectionTransition>
      <SectionTransition><OriginalIPs /></SectionTransition>
      <MarqueeDivider bg="dark" speed={40} reverse />
      <SectionTransition><Founders /></SectionTransition>
      <SectionTransition><JoinUs /></SectionTransition>
      <SectionTransition><FinalCTA /></SectionTransition>
    </>
  );
}
