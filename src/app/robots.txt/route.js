import { NextResponse } from 'next/server';

export async function GET() {
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
  const lines = [
    'User-agent: *',
    'Allow: /',
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ];
  return new NextResponse(lines.join('\n'), {
    status: 200,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
