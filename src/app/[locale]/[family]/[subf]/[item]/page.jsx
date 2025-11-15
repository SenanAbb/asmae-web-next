'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import ExpertiseDescriptionPage from '@/components/ExpertiseDescriptionPage';
import { itemConfigs } from '@/data/expertisesItems';

function NotFoundItem() {
  const t = useTranslations('expertises');
  return (
    <ExpertiseDescriptionPage
      heroTitle={t('main_title')}
      image="/images/placeholder.webp"
      title={404}
      subtitle={t('cta_subtitle')}
      itemsList={[]}
      footerTitle={t('cta_title')}
      footerDescription={''}
    />
  );
}

function resolveItemConfig(key, t, tNav) {
  const def = itemConfigs[key];
  if (!def) return null;
  const { heroNavKey, image, contentKey, itemsKeys } = def;
  return {
    heroTitle: tNav(heroNavKey),
    image,
    title: t(`${contentKey}.title`),
    subtitle: t(`${contentKey}.subtitle`),
    items: itemsKeys.map((k) => ({
      title: t(`${contentKey}.items.${k}.title`),
      description: t(`${contentKey}.items.${k}.description`),
    })),
    footerTitle: t(`${contentKey}.footerTitle`),
    footerDescription: t(`${contentKey}.footerDescription`),
  };
}

export default function ItemPage() {
  const params = useParams();
  const tNav = useTranslations('navbar');
  const t = useTranslations('expertises');

  const { family: familyParam, subf: subfParam, item: itemParam } = params;

  const key = `${familyParam}/${subfParam}/${itemParam}`;
  const config = resolveItemConfig(key, t, tNav);

  if (!config) return <NotFoundItem />;

  return (
    <ExpertiseDescriptionPage
      heroTitle={config.heroTitle}
      image={config.image}
      title={config.title}
      subtitle={config.subtitle}
      itemsList={config.items}
      footerTitle={config.footerTitle}
      footerDescription={config.footerDescription}
    />
  );
}
