import { subfamilyConfigs } from '@/data/expertisesSubfamilies';

export async function generateMetadata({ params }) {
  const { family, subf } = await params;
  const key = `${family}/${subf}`;
  const def = subfamilyConfigs[key];

  // Fallbacks if not found
  const contentKey = def?.contentKey || 'expertise';
  const image = def?.image || '/images/hero-generic.webp';

  const humanize = (slug) => slug.replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
  const baseTitle = humanize(contentKey);
  const title = `${baseTitle}`;
  const description = `Informations et accompagnement: ${baseTitle}.`;

  return {
    title: { absolute: title },
    description,
    openGraph: {
      title,
      description,
      images: [image],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
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

