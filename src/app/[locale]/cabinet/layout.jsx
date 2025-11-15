import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';

  const t = await getTranslations({ locale, namespace: 'seo' });
  const title = t('cabinet.title');
  const description = t('cabinet.description');

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `${siteUrl}/${locale}/cabinet`,
    },
    openGraph: {
      type: 'website',
      url: `${siteUrl}/${locale}/cabinet`,
      siteName: 'Asmae Kirimov',
      title,
      description,
      locale,
      images: [
        {
          url: `${siteUrl}/images/og-cabinet.jpg`,
          width: 1200,
          height: 630,
          alt: 'Cabinet - Asmae Kirimov',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteUrl}/images/og-cabinet.jpg`],
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

export default function CabinetLayout({ children }) {
  return children;
}
