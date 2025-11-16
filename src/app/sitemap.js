import { routing } from '@/i18n/routing';
import { expertisesMenu } from '@/data/expertises';

export default async function sitemap() {
  const siteUrl = process.env.SITE_URL || 'https://www.avocat-asmaekirimov.com';

  const staticRoutes = ['', 'cabinet', 'expertises', 'honoraires', 'privacy'];

  // Dynamic expertise routes (without locale), e.g.
  // /droit-des-affaires-et-des-societes/societes/creations-et-rachat-dentreprise
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

  const urls = [];

  routing.locales.forEach((locale) => {
    // Static routes
    staticRoutes.forEach((route) => {
      const path = route ? `${locale}/${route}` : `${locale}`;

      urls.push({
        url: `${siteUrl}/${path}`,
        lastModified: new Date(),
      });
    });

    // Dynamic expertise routes
    expertisePaths.forEach((path) => {
      urls.push({
        url: `${siteUrl}/${locale}${path}`,
        lastModified: new Date(),
      });
    });
  });

  return urls;
}
