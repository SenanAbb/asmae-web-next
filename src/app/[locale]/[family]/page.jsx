'use client';

import { useParams, notFound } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import ExpertiseMotherPage from '@/components/ExpertiseMotherPage';
import JsonLd from '@/components/JsonLd';
import { familyConfigs } from '@/data/expertisesFamilies';
import { subfamilyConfigs } from '@/data/expertisesSubfamilies';

export default function FamilyPage() {
  const { family } = useParams();
  const locale = useLocale();
  const t = useTranslations('expertises');
  const tNav = useTranslations('navbar');

  const cfg = familyConfigs[family];
  if (!cfg) return notFound();

  const base = `meres.${cfg.contentKey}`;
  const children = cfg.children.map((key) => {
    const sub = subfamilyConfigs[key];
    return {
      href: `/${locale}/${key}`,
      title: tNav(sub.heroNavKey),
    };
  });

  return (
    <>
      <JsonLd
        name={t(`${base}.title`)}
        description={t(`${base}.subtitle`)}
        url={`/${locale}/${family}`}
      />
      <ExpertiseMotherPage
        title={t(`${base}.title`)}
        subtitle={t(`${base}.subtitle`)}
        intro={t(`${base}.intro`)}
        image={cfg.image}
        children={children}
      />
    </>
  );
}
