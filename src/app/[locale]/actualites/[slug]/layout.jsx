import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;

  const article = await prisma.article.findUnique({
    where: { slug, published: true },
    select: {
      title: true,
      excerpt: true,
      coverImage: true,
      tags: true,
      authorName: true,
      publishedAt: true,
      updatedAt: true,
    },
  });

  if (!article) {
    return {
      title: 'Article non trouvé',
    };
  }

  const siteUrl = process.env.SITE_URL || 'https://www.avocat-asmaekirimov.com';
  const articleUrl = `${siteUrl}/${locale}/actualites/${slug}`;
  const imageUrl = article.coverImage?.startsWith('http') 
    ? article.coverImage 
    : article.coverImage?.startsWith('/') 
    ? `${siteUrl}${article.coverImage}`
    : `${siteUrl}/images/logo-color.webp`;

  return {
    title: `${article.title} | Asmae Kirimov`,
    description: article.excerpt,
    keywords: article.tags?.join(', '),
    authors: [{ name: article.authorName }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      locale: locale,
      url: articleUrl,
      siteName: 'Asmae Kirimov - Avocat',
      publishedTime: article.publishedAt?.toISOString(),
      modifiedTime: article.updatedAt?.toISOString(),
      authors: [article.authorName],
      tags: article.tags,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [imageUrl],
      creator: '@asmaekirimov',
    },
    alternates: {
      canonical: articleUrl,
      languages: {
        'fr': `${siteUrl}/fr/actualites/${slug}`,
        'en': `${siteUrl}/en/actualites/${slug}`,
        'es': `${siteUrl}/es/actualites/${slug}`,
      },
    },
  };
}

export default function ArticleLayout({ children }) {
  return children;
}
