import HeroSection from '@/components/HeroSection';
import WelcomeSection from '@/components/WelcomeSection';
import ExpertisesSection from '@/components/ExpertisesSection';
import AdvantagesSection from '@/components/AdvantagesSection';
import ArticlesPreviewSection from '@/components/ArticlesPreviewSection';
import InformationSection from '@/components/InformationSection';
import ReviewsSection from '@/components/ReviewsSection';
import ContactSection from '@/components/ContactSection';

export default async function HomePage({ params }) {
  const { locale = 'fr' } = await params;
  return (
    <main>
      <HeroSection />
      <WelcomeSection />
      <ExpertisesSection />
      <AdvantagesSection />
      <ArticlesPreviewSection locale={locale} />
      <InformationSection />
      <ReviewsSection />
      <ContactSection />
    </main>
  );
}
