import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/prisma';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'articles' });

  // Obtener tags agregados de todos los artículos publicados para SEO keywords
  const articles = await prisma.article.findMany({
    where: { published: true },
    select: { tags: true },
  });
  const keywords = Array.from(
    new Set(
      articles
        .flatMap((a) => a.tags || [])
        .filter(Boolean)
    )
  );

  return {
    title: t('page_title'),
    description: t('page_subtitle'),
    keywords,
    openGraph: {
      title: t('page_title'),
      description: t('page_subtitle'),
      type: 'website',
      locale: locale,
      siteName: 'Asmae Kirimov - Avocat',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('page_title'),
      description: t('page_subtitle'),
    },
  };
}

export default function ActualitesLayout({ children }) {
  return children;
}
