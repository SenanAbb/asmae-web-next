import { routing } from '@/i18n/routing';
import { expertisesMenu } from '@/data/expertises';
import { prisma } from '@/lib/prisma';

export default async function sitemap() {
  const siteUrl = process.env.SITE_URL || 'https://www.avocat-asmaekirimov.com';

  const staticRoutes = ['', 'cabinet', 'expertises', 'actualites', 'honoraires', 'privacy'];

  // Dynamic expertise routes
  const expertisePaths = new Set();

  expertisesMenu.forEach((family) => {
    family.subfamilies.forEach((sub) => {
      if (sub.subItems && sub.subItems.length > 0) {
        sub.subItems.forEach((item) => {
          if (item.path) {
            expertisePaths.add(item.path);
          }
        });
      } else if (sub.path) {
        expertisePaths.add(sub.path);
      }
    });
  });

  // Get published articles
  const articles = await prisma.article.findMany({
    where: { published: true },
    select: {
      slug: true,
      updatedAt: true,
    },
    orderBy: { publishedAt: 'desc' },
  });

  const urls = [];

  routing.locales.forEach((locale) => {
    // Static routes
    staticRoutes.forEach((route) => {
      const path = route ? `${locale}/${route}` : `${locale}`;

      urls.push({
        url: `${siteUrl}/${path}`,
        lastModified: new Date(),
        changeFrequency: route === 'actualites' ? 'daily' : 'monthly',
        priority: route === '' ? 1 : route === 'actualites' ? 0.9 : 0.8,
      });
    });

    // Dynamic expertise routes
    expertisePaths.forEach((path) => {
      urls.push({
        url: `${siteUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });

    // Dynamic article routes
    articles.forEach((article) => {
      urls.push({
        url: `${siteUrl}/${locale}/actualites/${article.slug}`,
        lastModified: article.updatedAt,
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    });
  });

  return urls;
}
