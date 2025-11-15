'use client';

import { useRef, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { AiFillLinkedin, AiFillMail, AiFillPhone, AiOutlineArrowDown } from 'react-icons/ai';

export default function HeroSection() {
  const t = useTranslations('home');
  const ref = useRef(null);
  const videoRef = useRef(null);
  const isInView = useInView(ref, { once: false });
  const [videoLoaded, setVideoLoaded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    const attemptPlay = () => {
      try {
        video.muted = true;
        // Do not always reset time here to avoid visual jump if already playing
        const p = video.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      } catch {}
    };

    const handleLoadedData = () => {
      setVideoLoaded(true);
      attemptPlay();
    };

    video.addEventListener('loadeddata', handleLoadedData);

    // Try initial play on mount
    attemptPlay();
    // Try again shortly after mount in case layout/paint delayed
    const retry1 = setTimeout(attemptPlay, 200);
    const retry2 = setTimeout(attemptPlay, 1000);

    const onVisibility = () => {
      if (document.visibilityState === 'visible') attemptPlay();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      clearTimeout(retry1);
      clearTimeout(retry2);
      document.removeEventListener('visibilitychange', onVisibility);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, []);

  // Ensure captions track remains hidden by default
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !video.textTracks) return;
    try {
      for (let i = 0; i < video.textTracks.length; i++) {
        video.textTracks[i].mode = 'hidden';
      }
    } catch {}
  }, [pathname, isInView]);

  // Try to (re)start playback when returning to home route
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Consider home paths: "/" or "/fr" or "/en" optionally with trailing slash
    const isHome = /^(\/)($|\/?$)|^\/[a-zA-Z]{2}\/?$/.test(pathname || '');
    if (!isHome) return;
    // Reset and try to play to ensure autoplay engages after client navigation
    try {
      video.muted = true; // ensure muted before play for autoplay policies
      video.currentTime = 0;
      // Force reload pipeline then play
      video.load();
      const onCanPlay = () => {
        const p2 = video.play();
        if (p2 && typeof p2.catch === 'function') p2.catch(() => {});
        video.removeEventListener('canplay', onCanPlay);
      };
      video.addEventListener('canplay', onCanPlay);
      const p = video.play();
      if (p && typeof p.catch === 'function') {
        p.catch(() => {});
      }
    } catch {}
  }, [pathname]);

  // If autoplay is deferred until visible, try to play when the hero enters viewport
  useEffect(() => {
    if (!isInView) return;
    const video = videoRef.current;
    if (!video) return;
    try {
      video.muted = true;
      const p = video.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    } catch {}
  }, [isInView]);

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
        preload="auto"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" title="Hero Video" />
        <track
          kind="captions"
          src="/videos/hero-video.vtt"
          srcLang="fr"
          label="Français"
        />
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
