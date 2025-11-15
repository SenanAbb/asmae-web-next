'use client';

import '@/styles/ExpertisesPage.global.css';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { expertisesMenu } from '@/data/expertises';
import { AiFillBank, AiOutlineGlobal, AiOutlineUser } from 'react-icons/ai';

export default function ExpertisesPage() {
  const t = useTranslations('expertises');
  const tNav = useTranslations('navbar');

  const ref = useRef(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const [openSubfamily, setOpenSubfamily] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setHasLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const slideInVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const shouldAnimate = hasLoaded || isInView;

  // Families from data
  const [firstFamily, ...otherFamilies] = expertisesMenu;

  return (
    <section
      className="services-page"
      ref={ref}
      role="main"
      aria-label={t('page_title')}
    >
      <div className="background-elements">
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
        <div className="bg-circle circle-3"></div>
        <div className="bg-pattern"></div>
      </div>

      <div className="container">
        {/* Header */}
        <motion.div
          className="page-header"
          variants={containerVariants}
          initial="hidden"
          animate={shouldAnimate ? 'visible' : 'hidden'}
        >
          <motion.div className="header-content" variants={fadeInUpVariants}>
            <div className="logo-container">
              <img
                src="/images/logo-color.webp"
                alt="Logo"
                className="brand-logo"
              />
            </div>
            <h1 className="page-title">{t('main_title')}</h1>
            <div className="title-decoration"></div>
          </motion.div>
        </motion.div>

        {/* Families grid */}
        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          animate={shouldAnimate ? 'visible' : 'hidden'}
        >
          {/* First family with accordion for subfamilies and subitems */}
          {firstFamily && (
            <motion.div
              className={`service-group ${firstFamily.color || ''}`}
              variants={fadeInUpVariants}
            >
              <div className="service-header">
                <div className="icon-wrapper">
                  <AiFillBank className="service-icon" />
                </div>
                <div className="header-content">
                  <h2 className="service-title">
                    {tNav(`expertises.${firstFamily.i18nKey}`)}
                  </h2>
                </div>
                <div className="service-number">01</div>
              </div>

              <div className="service-content">
                <motion.ul
                  className="services-list"
                  variants={containerVariants}
                >
                  {firstFamily.subfamilies?.map((sub, idx) => (
                    <motion.li
                      key={sub.subfamilyKey}
                      variants={slideInVariants}
                    >
                      {sub.subItems?.length ? (
                        <button
                          type="button"
                          className={`service-link ${
                            openSubfamily === sub.subfamilyKey ? 'open' : ''
                          }`}
                          onClick={() =>
                            setOpenSubfamily((k) =>
                              k === sub.subfamilyKey ? null : sub.subfamilyKey
                            )
                          }
                          aria-expanded={openSubfamily === sub.subfamilyKey}
                        >
                          <span
                            className="link-text"
                            style={{ fontWeight: '600' }}
                          >
                            {tNav(`expertises.${sub.i18nKey}`)}
                          </span>
                          <span className="link-arrow">
                            {openSubfamily === sub.subfamilyKey ? '−' : '+'}
                          </span>
                        </button>
                      ) : (
                        <Link className="service-link" href={sub.path || '#'}>
                          <span className="link-text">
                            {tNav(`expertises.${sub.i18nKey}`)}
                          </span>
                          <span className="link-arrow">→</span>
                        </Link>
                      )}

                      {sub.subItems?.length && (
                        <AnimatePresence initial={false}>
                          {openSubfamily === sub.subfamilyKey && (
                            <motion.ul
                              key={`subitems-${sub.subfamilyKey}`}
                              style={{
                                marginTop: 12,
                                paddingLeft: 12,
                                display: 'grid',
                                gap: 10,
                                overflow: 'hidden',
                              }}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: 'easeOut' }}
                            >
                              {sub.subItems.map((leaf, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, y: -6 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -6 }}
                                  transition={{
                                    duration: 0.18,
                                    ease: 'easeOut',
                                    delay: i * 0.03,
                                  }}
                                >
                                  <Link
                                    className="service-link"
                                    href={leaf.path || '#'}
                                  >
                                    <span className="link-text">
                                      {tNav(`expertises.${leaf.i18nKey}`)}
                                    </span>
                                    <span className="link-arrow">→</span>
                                  </Link>
                                </motion.li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      )}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              <div className="service-decoration"></div>
            </motion.div>
          )}

          {/* Other families as simple link lists */}
          {otherFamilies.map((fam, famIndex) => (
            <motion.div
              key={fam.familyKey}
              className={`service-group ${fam.color || ''}`}
              variants={fadeInUpVariants}
            >
              <div className="service-header">
                <div className="icon-wrapper">
                  {famIndex === 0 ? (
                    <AiOutlineGlobal className="service-icon" />
                  ) : (
                    <AiOutlineUser className="service-icon" />
                  )}
                </div>
                <div className="header-content">
                  <h2 className="service-title">
                    {tNav(`expertises.${fam.i18nKey}`)}
                  </h2>
                </div>
                <div className="service-number">
                  {String(famIndex + 2).padStart(2, '0')}
                </div>
              </div>

              <div className="service-content">
                <motion.ul
                  className="services-list"
                  variants={containerVariants}
                >
                  {fam.subfamilies?.map((sub, linkIndex) => (
                    <motion.li
                      key={sub.subfamilyKey}
                      variants={slideInVariants}
                      transition={{ delay: linkIndex * 0.05 }}
                    >
                      <Link className="service-link" href={sub.path || '#'}>
                        <span className="link-text">
                          {tNav(`expertises.${sub.i18nKey}`)}
                        </span>
                        <span className="link-arrow">→</span>
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              <div className="service-decoration"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="cta-section"
          variants={fadeInUpVariants}
          initial="hidden"
          animate={shouldAnimate ? 'visible' : 'hidden'}
        >
          <div className="cta-content">
            <div className="cta-header">
              <h3>{t('cta_title')}</h3>
              <p>{t('cta_subtitle')}</p>
            </div>
            <div className="cta-actions">
              <a href="tel:+33641228153" className="cta-button primary">
                {t('cta_call')}
              </a>
              <a
                href="mailto:asmaekirimov.avocat@gmail.com"
                className="cta-button secondary"
              >
                {t('cta_email')}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
