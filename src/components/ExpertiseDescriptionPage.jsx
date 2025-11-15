'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import '@/styles/ExpertiseDescriptionPage.css';

const ExpertiseDescriptionPage = ({
  heroTitle,
  image,
  title,
  subtitle,
  itemsList,
  footerTitle,
  footerDescription,
}) => {
  const locale = useLocale();
  const t = useTranslations('expertises');

  return (
    <section className='service-section'>
      <div
        className="hero-image"
        style={{ backgroundImage: `url(${image})` }}
        aria-label={heroTitle}
      >
        <div className="hero-overlay" />
        <h1 className="hero-title">{heroTitle}</h1>
      </div>

      <div className="container">
        <nav className="nav-buttons">
          <Link
            href={`/${locale}/expertises`}
            className="back-button"
            aria-label={t('back_to_services')}
          >
            ← {t('back_to_services')}
          </Link>
          <Link
            href={`/${locale}/#contact`}
            className="contact-button"
            aria-label={t('contact_section_title')}
          >
            {t('contact_section_title')}
          </Link>
        </nav>

        <h2 className="service-subtitle">{title}</h2>
        <p className="service-intro">{subtitle}</p>

        <ul className="service-list">
          {itemsList.map((item, index) => (
            <li key={index}>
              <strong>{item.title}</strong>
              {item.description}
            </li>
          ))}
        </ul>

        <h2 className="service-conclusion-title">{footerTitle}</h2>
        {footerDescription && <p className="service-conclusion-text">{footerDescription}</p>}
      </div>
    </section>
  );
};

export default ExpertiseDescriptionPage;
