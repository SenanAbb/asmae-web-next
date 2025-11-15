'use client';

import { useRef, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { AiFillLinkedin, AiFillMail, AiFillPhone, AiOutlineArrowDown } from 'react-icons/ai';

export default function HeroSection() {
  const t = useTranslations('home');
  const ref = useRef(null);
  const videoRef = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      const handleLoadedData = () => setVideoLoaded(true);
      video.addEventListener('loadeddata', handleLoadedData);
      return () => video.removeEventListener('loadeddata', handleLoadedData);
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.5 },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: 'easeOut' },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: 'easeOut', delay: 0.3 },
    },
  };

  const socialVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut', delay: 1.2, staggerChildren: 0.1 },
    },
  };

  const socialItemVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const scrollIndicatorVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, ease: 'easeOut', delay: 2 } },
  };

  const socialLinks = [
    { href: 'https://www.linkedin.com/in/asmae-kirimov-528443267/', icon: AiFillLinkedin, label: 'LinkedIn' },
    { href: 'mailto:asmaekirimov.avocat@gmail.com', icon: AiFillMail, label: 'Email' },
    { href: 'tel:+33641228153', icon: AiFillPhone, label: 'Phone' },
  ];

  return (
    <section className="hero-section" ref={ref}>
      {/* Video Background */}
      <video
        ref={videoRef}
        className={`hero-video ${videoLoaded ? 'loaded' : ''}`}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" title="Hero Video" />
      </video>

      {/* Overlay */}
      <div className="black-overlay">
        <div className="overlay-pattern"></div>
        <div className="overlay-gradient"></div>
      </div>

      {/* Background Decorative Elements */}
      <div className="decorative-elements">
        <div className="floating-element element-1"></div>
        <div className="floating-element element-2"></div>
        <div className="floating-element element-3"></div>
      </div>

      {/* Content */}
      <div className="content">
        <motion.div
          className="title"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h1 variants={titleVariants}>
            <motion.div className="name-container" variants={titleVariants}>
              <motion.span className="subtitle-text" variants={subtitleVariants}>
                {t('hero_subtitle')}
              </motion.span>
              <motion.span className="name-text" variants={subtitleVariants}>
                Asmae Kirimov
              </motion.span>
            </motion.div>
          </motion.h1>

          {/* Social Links */}
          <motion.div className="social-links" variants={socialVariants}>
            {socialLinks.map((social) => (
              <motion.div key={social.label} variants={socialItemVariants}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={social.label}
                >
                  <div className="social-icon-wrapper">
                    <social.icon size={40} />
                    <div className="social-ripple"></div>
                  </div>
                  <span className="social-tooltip">{social.label}</span>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="scroll-indicator"
          variants={scrollIndicatorVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div
            className="scroll-arrow"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut', delay: 2.5 }}
          >
            <AiOutlineArrowDown size={20} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
