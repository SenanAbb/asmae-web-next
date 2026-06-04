export default function JsonLd({ name, description, url }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Maître Asmae Kirimov – Avocat',
    description,
    url,
    areaServed: ['Pau', 'Pyrénées-Atlantiques', 'Nouvelle-Aquitaine', 'Occitanie', 'France'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Pau',
      addressRegion: 'Nouvelle-Aquitaine',
      addressCountry: 'FR',
    },
    serviceType: name,
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
