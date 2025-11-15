'use client';

import '@/styles/CabinetPage.global.css';
import { useRef, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { AiOutlineGlobal, AiOutlineUser, AiOutlineHeart } from 'react-icons/ai';

export default function CabinetPage() {
  const t = useTranslations('cabinet');
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
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  const slideInLeftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const slideInRightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const infoBlocks = [
    {
      icon: AiOutlineGlobal,
      title: t('cabinet_page_formation_title'),
      description: t('cabinet_page_formation_description'),
    },
    {
      icon: AiOutlineUser,
      title: t('cabinet_page_experience_title'),
      description: t('cabinet_page_experience_description'),
    },
    {
      icon: AiOutlineHeart,
      title: t('cabinet_page_structure_title'),
      description: t('cabinet_page_structure_description'),
    },
  ];

  const shouldAnimate = hasLoaded || isInView;

  return (
    <section className="cabinet-page" ref={ref}>
      <div className="background-elements">
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
        <div className="bg-circle circle-3"></div>
        <div className="bg-pattern"></div>
      </div>

      <div className="container">
        <motion.div
          className="hero-section"
          variants={containerVariants}
          initial="hidden"
          animate={shouldAnimate ? 'visible' : 'hidden'}
        >
          <motion.div className="hero-content" variants={slideInLeftVariants}>
            <div className="hero-header">
              <h1 className="hero-title">
                <motion.span className="subtitle-text" variants={fadeInUpVariants}>
                  {t('hero_subtitle')}
                </motion.span>
                <motion.span className="name-text" variants={fadeInUpVariants}>
                  {t('name')}
                </motion.span>
              </h1>
            </div>

            <motion.div className="hero-description" variants={containerVariants}>
              <motion.p variants={fadeInUpVariants}>{t('cabinet_page_description_1')}</motion.p>
              <motion.p variants={fadeInUpVariants}>{t('cabinet_page_description_2')}</motion.p>
              <motion.p variants={fadeInUpVariants}>{t('cabinet_page_description_3')}</motion.p>
            </motion.div>
          </motion.div>

          <motion.div className="hero-image" variants={slideInRightVariants}>
            <div className="image-container">
              <div className="image-frame">
                <img src="/images/asmae-cabinet-image.webp" alt="Asmae" className="profile-image" />
                <div className="image-overlay"></div>
              </div>
              <div className="image-decorations">
                <div className="decoration-element element-1"></div>
                <div className="decoration-element element-2"></div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="info-blocks-section"
          variants={containerVariants}
          initial="hidden"
          animate={shouldAnimate ? 'visible' : 'hidden'}
        >
          <motion.div className="section-header" variants={fadeInUpVariants}>
            <h2 className="section-title">{t('cabinet_page_section_title')}</h2>
            <div className="title-decoration"></div>
          </motion.div>

          <div className="info-blocks-grid">
            {infoBlocks.map((block, index) => (
              <motion.div
                key={index}
                className="info-block"
                variants={fadeInUpVariants}
                transition={{ delay: index * 0.2 }}
              >
                <div className="block-header">
                  <div className="icon-wrapper">
                    <block.icon className="block-icon" />
                  </div>
                  <div className="block-number">{String(index + 1).padStart(2, '0')}</div>
                </div>
                <div className="block-content">
                  <h3 className="block-title">{block.title}</h3>
                  <p className="block-description">{block.description}</p>
                </div>
                <div className="block-decoration"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="cta-section"
          variants={fadeInUpVariants}
          initial="hidden"
          animate={shouldAnimate ? 'visible' : 'hidden'}
        >
          <div className="cta-content">
            <div className="cta-header">
              <h3>{t('cabinet_page_cta_title')}</h3>
              <p>{t('cabinet_page_cta_subtitle')}</p>
            </div>
            <div className="cta-actions">
              <a href="tel:+33641228153" className="cta-button primary">
                {t('cabinet_page_cta_call')}
              </a>
              <a href="mailto:asmaekirimov.avocat@gmail.com" className="cta-button secondary">
                {t('cabinet_page_cta_email')}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

