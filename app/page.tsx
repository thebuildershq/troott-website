import CTASection from "@/components/layouts/CallToAction";
import { Faqs } from "@/components/layouts/Faqs";
import HeroSection from "@/components/layouts/Hero";
import Mission from "@/components/layouts/Mission";



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
