'use client';

import { useEffect, useRef, useState } from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import HamburgerIcon from './HamburgerIcon';
import LanguageSelector from './LanguageSelector';
import ExpertisesDropdown from './ExpertisesDropdown';
import { expertisesMenu } from '@/data/expertises';

export default function Navbar() {
  const t = useTranslations('navbar'); // namespace de traducciones
  const pathname = usePathname();

  const isHome = pathname === '/';

  const [scrolled, setScrolled] = useState(isHome ? false : true);
  const [showExpertises, setShowExpertises] = useState(false);
  const closeTimerRef = useRef(null);

  const openExpertises = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setShowExpertises(true);
  };

  const scheduleCloseExpertises = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => {
      setShowExpertises(false);
      closeTimerRef.current = null;
    }, 200);
  };

  // Listener de scroll
  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll(); // estado inicial
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const navItems = [
    { href: '/', label: t('home_label') },
    { href: '/cabinet', label: t('about_label') },
    { href: '/expertises', label: t('expertises_label') },
    { href: '/honoraires', label: t('honoraires_label') },
    { href: '/#contact', label: t('contact_label') },
  ];

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container">
        {/* Logo */}
        <Link href="/" className="logo">
          <motion.div
            className="logo-container"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {scrolled ? (
              <Image
                src="/images/logo-color.webp"
                alt="Logo"
                width={100}
                height={100}
                className="logo-image"
              />
            ) : (
              <Image
                src="/images/logo-negro.webp"
                alt="Logo"
                width={100}
                height={100}
                className={`logo-image logo-inverted`}
              />
            )}
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="nav-menu">
          {navItems.map((item, index) => {
            const isExpertises = item.href === '/expertises';
            return (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={isExpertises ? openExpertises : undefined}
                onMouseLeave={
                  isExpertises ? scheduleCloseExpertises : undefined
                }
                style={{ position: 'relative' }}
              >
                <Link
                  href={item.href}
                  className={`${'nav-link'} ${
                    pathname === item.href ? 'active' : ''
                  }`}
                >
                  <span className="nav-text">{item.label}</span>
                  <div className="nav-underline"></div>
                </Link>

                {/* Desktop Expertises Dropdown */}
                {isExpertises && showExpertises && (
                  <ExpertisesDropdown
                    data={expertisesMenu}
                    scrolled={scrolled}
                    onMouseEnter={openExpertises}
                    onMouseLeave={scheduleCloseExpertises}
                  />
                )}
              </motion.li>
            );
          })}
        </ul>

        {/* Right Section */}
        <div className="navbar-right">
          <motion.div
            className="language-wrapper"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <LanguageSelector scrolled={scrolled} />
          </motion.div>
          <motion.div
            className="hamburger-wrapper"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <HamburgerIcon />
          </motion.div>
        </div>
      </div>

      {/* Background blur effect */}
      <div className="navbar-backdrop"></div>
    </motion.nav>
  );
}
