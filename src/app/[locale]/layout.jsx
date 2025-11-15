import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { Roboto, Italianno, Poppins } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { keywordsSEO } from '@/data/keywords';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

/** SECTIONS STYLES */
import './globals.css';
import '@/styles/HeroSection.global.css';
import '@/styles/WelcomeSection.global.css';
import '@/styles/ExpertisesSection.global.css';
import '@/styles/AdvantagesSection.global.css';
import '@/styles/InformationSection.global.css';
import '@/styles/ReviewsSection.global.css';
import '@/styles/ReviewCard.global.css';
import '@/styles/ContactSection.global.css';
import '@/styles/Footer.global.css';
import '@/styles/ExpertisesDropdown.global.css';

/** COMPONENTS STYLES */
import '@/styles/LanguageSelector.global.css';
import '@/styles/Button.global.css';
import '@/styles/Navbar.global.css';
import '@/styles/HamburgerIcon.global.css';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const italianno = Italianno({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-italianno',
});

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
  const titleBase = 'AKZ · Asmae Kirimov Avocat';
  const defaultTitle = `${titleBase}`;
  const description =
    'Avocate à Pau. Droit des affaires et des sociétés, mobilité internationale et droit des étrangers, droit de la fonction publique.';

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${siteUrl}/${l}/`])
  );

  const keywordsMap = keywordsSEO;
  const keywords = keywordsMap[locale] || keywordsMap.en;

  return {
    metadataBase: new URL(siteUrl),
    applicationName: titleBase,
    title: {
      default: defaultTitle,
      template: `%s | ${titleBase}`,
    },
    description,
    keywords,
    alternates: {
      canonical: `${siteUrl}/${locale}/`,
      languages,
    },
    openGraph: {
      type: 'website',
      url: `${siteUrl}/${locale}/`,
      siteName: titleBase,
      title: defaultTitle,
      description,
      locale,
      images: [
        {
          url: `${siteUrl}/images/asmae-nobg.webp`,
          width: 1200,
          height: 630,
          alt: titleBase,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: defaultTitle,
      description,
      images: [`${siteUrl}/images/asmae-nobg.webp`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    icons: {
      icon: '/favicon.ico',
    },
  };
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Load translation messages for the current locale
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <head>
        {(() => {
          const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
          const data = {
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Asmae Kirimov',
            url: `${siteUrl}/${locale}/`,
            image: `${siteUrl}/images/asmae-nobg.webp`,
            logo: `${siteUrl}/images/logo-color.webp`,
            telephone: '+33 641 22 81 53',
            areaServed: 'FR',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '22 rue des Cordeliers',
              addressLocality: 'Pau',
              postalCode: '64000',
              addressCountry: 'FR',
            },
            sameAs: [
              'https://www.linkedin.com/in/asmae-kirimov-528443267/',
              'https://maps.app.goo.gl/6p4mZsJt2s8p8wZt8',
            ],
          };
          return (
            <script
              key="ld-legalservice"
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
            />
          );
        })()}
        {/* Preload critical assets (hero video & logo) */}
        <link
          rel="preload"
          as="video"
          href="/videos/hero-video.mp4"
          type="video/mp4"
          crossOrigin="anonymous"
        />
        <link rel="preload" as="image" href="/images/logo-color.webp" />
        <meta
          name="google-site-verification"
          content="v3W_Uq-gtwZU7oDFVzA9psmR5HpZ89YOFXQGJZHDZHU"
        />
      </head>
      <body
        className={`${roboto.className} ${italianno.variable} ${poppins.variable}`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          {children}
          <Footer />
          <SpeedInsights />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
