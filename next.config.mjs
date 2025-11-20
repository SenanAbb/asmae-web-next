import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ];
  },
  poweredByHeader: false,
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
