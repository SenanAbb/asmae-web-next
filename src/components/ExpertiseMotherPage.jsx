'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import '@/styles/ExpertiseDescriptionPage.css';

const ExpertiseMotherPage = ({ title, subtitle, intro, image, children }) => {
  const locale = useLocale();
  const t = useTranslations('expertises');

  return (
    <section className="service-section">
      <div
        className="hero-image"
        style={{ backgroundImage: `url(${image})` }}
        aria-label={title}
      >
        <div className="hero-overlay" />
        <h1 className="hero-title">{title}</h1>
      </div>

      <div className="container">
        <nav className="nav-buttons">
          <Link href={`/${locale}/expertises`} className="back-button" aria-label={t('back_to_services')}>
            ← {t('back_to_services')}
          </Link>
          <Link href={`/${locale}/#contact`} className="contact-button" aria-label={t('contact_section_title')}>
            {t('contact_section_title')}
          </Link>
        </nav>

        <h2 className="service-subtitle">{subtitle}</h2>
        <p className="service-intro">{intro}</p>

        <ul className="service-list">
          {children.map((c) => (
            <li key={c.href}>
              <Link href={c.href}>
                <strong>{c.title}</strong>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ExpertiseMotherPage;
