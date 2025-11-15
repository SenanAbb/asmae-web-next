'use client';

import '@/styles/HonorairesPage.global.css';
import { useRef, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  AiOutlineClockCircle,
  AiOutlineCalculator,
  AiOutlineTrophy,
  AiOutlineHeart,
  AiOutlineUser,
} from 'react-icons/ai';

export default function HonorairesPage() {
  const t = useTranslations('honoraires');
  const locale = useLocale();
  const ref = useRef(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

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
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const slideInVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const honorairesData = [
    {
      icon: AiOutlineClockCircle,
      title: t('honoraires_page_time_based_title'),
      description: t('honoraires_page_time_based_description'),
      color: 'primary',
    },
    {
      icon: AiOutlineCalculator,
      title: t('honoraires_page_fixed_fee_title'),
      description: t('honoraires_page_fixed_fee_description'),
      color: 'secondary',
    },
    {
      icon: AiOutlineTrophy,
      title: t('honoraires_page_result_fee_title'),
      description: t('honoraires_page_result_fee_description'),
      color: 'primary-light',
    },
    {
      icon: AiOutlineHeart,
      title: t('honoraires_page_legal_aid_title'),
      description: t('honoraires_page_legal_aid_description'),
      color: 'secondary-light',
    },
    {
      icon: AiOutlineUser,
      title: t('honoraires_page_consultation_title'),
      description: t('honoraires_page_consultation_description'),
      color: 'primary',
    },
  ];

  const shouldAnimate = hasLoaded || isInView;

  return (
    <section className="honoraires-page" ref={ref} role="main" aria-label={t('honoraires_page_title')}>
      <div className="background-elements">
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
        <div className="bg-circle circle-3"></div>
        <div className="bg-pattern"></div>
      </div>

      <div className="container">
        <motion.div
          className="page-header"
          variants={containerVariants}
          initial="hidden"
          animate={shouldAnimate ? 'visible' : 'hidden'}
        >
          <motion.div className="header-content" variants={fadeInUpVariants}>
            <div className="logo-container">
              <img src="/images/logo-color.webp" alt="Logo" className="brand-logo" />
            </div>
            <h1 className="page-title">{t('honoraires_page_title')}</h1>
            <p className="page-subtitle">{t('honoraires_page_subtitle')}</p>
            <div className="title-decoration"></div>
          </motion.div>

          <motion.div className="intro-section" variants={fadeInUpVariants}>
            <p className="intro-text">{t('honoraires_page_intro')}</p>
          </motion.div>
        </motion.div>

        <motion.div
          className="honoraires-grid"
          variants={containerVariants}
          initial="hidden"
          animate={shouldAnimate ? 'visible' : 'hidden'}
        >
          {honorairesData.map((item, index) => (
            <motion.div
              key={index}
              className={`honoraire-card ${item.color}`}
              variants={slideInVariants}
              transition={{ delay: index * 0.1 }}
            >
              <div className="card-header">
                <div className="icon-wrapper">
                  <item.icon className="card-icon" />
                </div>
                <div className="card-number">{String(index + 1).padStart(2, '0')}</div>
              </div>

              <div className="card-content">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-description">{item.description}</p>
              </div>

              <div className="card-decoration"></div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="cta-section"
          variants={fadeInUpVariants}
          initial="hidden"
          animate={shouldAnimate ? 'visible' : 'hidden'}
        >
          <div className="cta-content">
            <div className="cta-header">
              <h3>{t('honoraires_page_cta_title')}</h3>
              <p>{t('honoraires_page_cta_subtitle')}</p>
            </div>
            <div className="cta-actions">
              <a href="tel:+33641228153" className="cta-button primary">
                {t('honoraires_page_cta_call')}
              </a>
              <Link href={`/${locale}#contact`} className="cta-button secondary">
                {t('honoraires_page_cta_email')}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
