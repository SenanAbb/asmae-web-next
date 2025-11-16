export default function robots() {
  const siteUrl =
    process.env.SITE_URL || 'https://www.avocat-asmaekirimov.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
