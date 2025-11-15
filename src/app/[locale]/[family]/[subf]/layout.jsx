import { subfamilyConfigs } from '@/data/expertisesSubfamilies';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export async function generateMetadata({ params }) {
  const { locale, family, subf } = await params;
  const key = `${family}/${subf}`;
  const def = subfamilyConfigs[key];

  const contentKey = def?.contentKey;
  const image = def?.image || '/images/hero-generic.webp';
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';

  let title = '';
  let description = '';
  try {
    if (contentKey) {
      const t = await getTranslations({ locale, namespace: 'expertises' });
      // Prefer localized title; if missing, don't throw
      title = t.optional?.(`${contentKey}.title`) ?? '';
      // Use subtitle if present; otherwise, fall back to a generic description
      description = t.optional?.(`${contentKey}.subtitle`) ?? '';
      if (!description) {
        description = t('cta_subtitle');
      }
    } else {
      // Fallbacks when there is no contentKey in config
      if (def?.heroNavKey) {
        const tNav = await getTranslations({ locale, namespace: 'navbar' });
        title = tNav(def.heroNavKey);
      } else {
        const humanize = (slug) => slug.replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
        title = humanize(subf);
      }
      const t = await getTranslations({ locale, namespace: 'expertises' });
      description = t('cta_subtitle');
    }
  } catch (error) {
    console.error('Error fetching translations:', error);
  }

  // Final fallbacks if title still empty
  if (!title) {
    if (def?.heroNavKey) {
      try {
        const tNav = await getTranslations({ locale, namespace: 'navbar' });
        title = tNav.optional?.(def.heroNavKey) ?? '';
      } catch {}
    }
    if (!title) {
      const humanize = (slug) => slug.replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
      title = humanize(subf);
    }
  }

  const brandedTitle = title ? `${title} · AKZ Avocat` : 'AKZ Avocat';

  return {
    title: { absolute: brandedTitle },
    description,
    alternates: {
      canonical: `${siteUrl}/${locale}/${family}/${subf}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${siteUrl}/${l}/${family}/${subf}`])
      ),
    },
    openGraph: {
      title: brandedTitle,
      description,
      images: [image],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: brandedTitle,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function SubfamilyLayout({ children }) {
  return children;
}
