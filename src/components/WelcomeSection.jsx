'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import Button from './Button';
import Image from 'next/image';

const WelcomeSection = () => {
  const t = useTranslations('welcome_section');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const slideInLeftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: 'easeOut' } },
  };

  const slideInRightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: 'easeOut' } },
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const underlineVariants = {
    hidden: { width: '0%' },
    visible: {
      width: '100%',
      transition: { duration: 1.5, ease: 'easeOut', delay: 0.5 },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut', delay: 0.8 },
    },
  };

  return (
    <section className="welcome-section" ref={ref}>
      <div className="container">
        {/* Background Elements */}
        <div className="background-elements">
          <div className="bg-circle circle-1"></div>
          <div className="bg-circle circle-2"></div>
          <div className="bg-circle circle-3"></div>
          <div className="bg-pattern"></div>
        </div>

        <motion.div
          className="welcome-content"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Text Content */}
          <motion.div className="welcome-text" variants={slideInLeftVariants}>
            <motion.h2 className="main-title" variants={titleVariants}>
              <motion.span className="title-line" variants={fadeInUpVariants}>
                {t('title')}
              </motion.span>
              <span className="name-highlight">
                <motion.span className="name" variants={fadeInUpVariants}>
                  {t('name')}
                </motion.span>
                <motion.div
                  className="name-underline"
                  variants={underlineVariants}
                ></motion.div>
              </span>
            </motion.h2>

            <motion.h3 className="subtitle" variants={fadeInUpVariants}>
              {t('subtitle')}
            </motion.h3>

            <motion.div
              className="description-content"
              variants={containerVariants}
            >
              <motion.div
                className="description-item"
                variants={fadeInUpVariants}
              >
                <div className="item-icon">
                  <div className="icon-dot"></div>
                </div>
                <p className="description-text">{t('description_1')}</p>
              </motion.div>

              <motion.div
                className="description-item"
                variants={fadeInUpVariants}
              >
                <div className="item-icon">
                  <div className="icon-dot"></div>
                </div>
                <p className="description-text">{t('description_2')}</p>
              </motion.div>

              <motion.div
                className="description-item"
                variants={fadeInUpVariants}
              >
                <div className="item-icon">
                  <div className="icon-dot"></div>
                </div>
                <p className="description-text">{t('description_3')}</p>
              </motion.div>
            </motion.div>

            <motion.div className="cta-section" variants={buttonVariants}>
              <Button
                text={t('button')}
                type="primary"
                className="hero-button"
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div className="welcome-image" variants={slideInRightVariants}>
            <div className="image-container">
              <motion.div className="image-frame" variants={fadeInUpVariants}>
                <Image
                  src="/images/asmae-nobg.webp"
                  alt="Asmae"
                  loading="lazy"
                  className="profile-image"
                  width={100}
                  height={100}
                />
                <div className="image-overlay"></div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WelcomeSection;
