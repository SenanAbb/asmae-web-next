import { NextResponse } from 'next/server';
import { routing } from '@/i18n/routing';
import { subfamilyConfigs } from '@/data/expertisesSubfamilies';

export async function GET() {
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
  const now = new Date().toISOString();

  const routes = ['/', '/cabinet', '/expertises', '/honoraires', '/privacy'];

  // Dynamic subfamily pages: /[locale]/[family]/[subf]
  const subfamilyPaths = Object.keys(subfamilyConfigs).map((k) => `/${k}`);

  const urls = routing.locales.flatMap((locale) => {
    const staticUrls = routes.map((path) => ({
      loc: `${siteUrl}/${locale}${path}`,
      lastmod: now,
      changefreq: 'weekly',
      priority: path === '/' ? '1.0' : '0.8',
      hreflangs: routing.locales.map((l) => ({ hreflang: l, href: `${siteUrl}/${l}${path}` })),
    }));

    const dynamicUrls = subfamilyPaths.map((path) => ({
      loc: `${siteUrl}/${locale}${path}`,
      lastmod: now,
      changefreq: 'weekly',
      priority: '0.7',
      hreflangs: routing.locales.map((l) => ({ hreflang: l, href: `${siteUrl}/${l}${path}` })),
    }));

    return [...staticUrls, ...dynamicUrls];
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
    ${urls
      .map(
        (u) => `
      <url>
        <loc>${u.loc}</loc>
        <lastmod>${u.lastmod}</lastmod>
        <changefreq>${u.changefreq}</changefreq>
        <priority>${u.priority}</priority>
        ${u.hreflangs
          .map(
            (h) => `<xhtml:link rel="alternate" hreflang="${h.hreflang}" href="${h.href}" />`
          )
          .join('\n        ')}
      </url>`
      )
      .join('\n')}
  </urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}

