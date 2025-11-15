import HeroSection from '@/components/HeroSection';
import WelcomeSection from '@/components/WelcomeSection';
import ExpertisesSection from '@/components/ExpertisesSection';
import AdvantagesSection from '@/components/AdvantagesSection';
import InformationSection from '@/components/InformationSection';
import ReviewsSection from '@/components/ReviewsSection';
import ContactSection from '@/components/ContactSection';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <WelcomeSection />
      <ExpertisesSection />
      <AdvantagesSection />
      <InformationSection />
      <ReviewsSection />
      <ContactSection />
    </main>
  );
}
