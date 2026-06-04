import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }) {
  const { locale, family } = await params;
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';

  let title = '';
  let description = '';

  try {
    const tExp = await getTranslations({ locale, namespace: 'expertises' });
    title = tExp.optional?.(`meres.${family}.metaTitle`) ?? tExp.optional?.(`meres.${family}.title`) ?? '';
    description = tExp.optional?.(`meres.${family}.metaDescription`) ?? tExp.optional?.('cta_subtitle') ?? '';
    if (!title) {
      const humanize = (slug) => slug.replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
      title = humanize(family);
    }
  } catch (e) {
    const humanize = (slug) => slug.replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
    title = humanize(family);
  }

  const hasMeta = !!title && /Avocat|Pau/i.test(title);
  const brandedTitle = hasMeta ? title : (title ? `${title} · AKZ Avocat` : 'AKZ Avocat');

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
