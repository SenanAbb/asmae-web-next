import { getTranslations } from 'next-intl/server';

// Map family slugs to navbar keys for localized titles
const familyTitleKeys = {
  'droit-des-affaires-et-des-societes': 'expertises.family1.title',
  'droit-de-la-mobilite-internationale-et-des-etrangers': 'expertises.family2.title',
  'droit-de-la-fonction-publique': 'expertises.family3.title',
};

export async function generateMetadata({ params }) {
  const { locale, family } = await params;
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';

  let title = '';
  let description = '';

  try {
    const tNav = await getTranslations({ locale, namespace: 'navbar' });
    const key = familyTitleKeys[family];
    if (key) {
      title = tNav.optional?.(key) ?? '';
    }
    if (!title) {
      const humanize = (slug) => slug.replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
      title = humanize(family);
    }

    const tExp = await getTranslations({ locale, namespace: 'expertises' });
    description = tExp.optional?.('cta_subtitle') ?? '';
  } catch (e) {
    // Fallbacks on any error
    const humanize = (slug) => slug.replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
    title = humanize(family);
  }

  const brandedTitle = title ? `${title} · AKZ Avocat` : 'AKZ Avocat';

  return {
    title: { absolute: brandedTitle },
    description,
    alternates: { canonical: `${siteUrl}/${locale}/${family}` },
    openGraph: {
      type: 'website',
      url: `${siteUrl}/${locale}/${family}`,
      siteName: 'Asmae Kirimov',
      title: brandedTitle,
      description,
      images: [
        {
          url: `${siteUrl}/images/hero-generic.webp`,
          width: 1200,
          height: 630,
          alt: brandedTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: brandedTitle,
      description,
      images: [`${siteUrl}/images/hero-generic.webp`],
    },
    robots: { index: true, follow: true },
  };
}

export default function FamilyLayout({ children }) {
  return children;
}
