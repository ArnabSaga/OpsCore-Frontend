import FAQSection from '@/components/shared/layout/FAQSection';
import FeatureSection from "@/components/shared/layout/FeatureSection";
import HeroSection from "@/components/shared/layout/HeroSection";
import PricingSection from "@/components/shared/layout/PricingSection";
import TestimonialsSection from "@/components/shared/layout/TestimonialsSection";
import WorkProcessSection from "@/components/shared/layout/WorkProcessSection";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <FeatureSection />
      <WorkProcessSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
    </>
  );
};

export default HomePage;
