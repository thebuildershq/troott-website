import CTASection from "@/components/containers/CallToAction";
import { Faqs } from "@/components/containers/Faqs";
import HeroSection from "@/components/containers/Hero";
import Mission from "@/components/containers/Mission";
import FeatureSection16 from "@/components/containers/Preview";
import TextSection from "@/components/containers/TextSection";



export default function Home() {
  return (
    <main className="flex flex-col overflow-hidden">
      <HeroSection/>
      
      
      <FeatureSection16/>

      <TextSection/>

      <Mission/>
      
      <Faqs/>
      <CTASection/>
    </main>
  );
}
