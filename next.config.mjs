import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'public.blob.vercel-storage.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ];
  },
  async redirects() {
    const oldBase = 'droit-de-la-mobilite-internationale-et-des-etrangers';
    const newBase = 'droit-des-etrangers-et-de-la-nationalite';
    return [
      // default locale (no prefix): mother page + sous-pages
      { source: `/${oldBase}`, destination: `/${newBase}`, permanent: true },
      { source: `/${oldBase}/:subf*`, destination: `/${newBase}/:subf*`, permanent: true },
      // prefixed locales (en, es)
      { source: `/:locale(en|es)/${oldBase}`, destination: `/:locale/${newBase}`, permanent: true },
      { source: `/:locale(en|es)/${oldBase}/:subf*`, destination: `/:locale/${newBase}/:subf*`, permanent: true },
    ];
  },
  poweredByHeader: false,
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
