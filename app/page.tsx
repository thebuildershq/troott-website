import CTASection from "@/components/containers/CallToAction";
import { Faqs } from "@/components/containers/Faqs";
import HeroSection from "@/components/containers/Hero";
import Mission from "@/components/containers/Mission";



export default function Home() {
  return (
    <main className="flex flex-col overflow-hidden">
      <HeroSection/>
      <Mission/>
      
      
      <Faqs/>
      <CTASection/>
    </main>
  );
}
