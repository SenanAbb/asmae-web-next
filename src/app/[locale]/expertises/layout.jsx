import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';

  const t = await getTranslations({ locale, namespace: 'seo' });
  const title = t('expertises.title');
  const description = t('expertises.description');

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `${siteUrl}/${locale}/expertises`,
    },
    openGraph: {
      type: 'website',
      url: `${siteUrl}/${locale}/expertises`,
      siteName: 'Asmae Kirimov',
      title,
      description,
      locale,
      images: [
        {
          url: `${siteUrl}/images/og-expertises.jpg`,
          width: 1200,
          height: 630,
          alt: 'Expertises – Asmae Kirimov',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteUrl}/images/og-expertises.jpg`],
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
  };
}

export default function ExpertisesLayout({ children }) {
  return children;
}
