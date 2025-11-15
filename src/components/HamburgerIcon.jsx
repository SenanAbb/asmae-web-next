'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import LanguageSelector from './LanguageSelector';
import { expertisesMenu } from '@/data/expertises';
import { IoCloseSharp } from 'react-icons/io5';
import Image from 'next/image';

const HamburgerIcon = () => {
  const t = useTranslations('navbar');
  const tNav = useTranslations('navbar');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const inputRef = useRef(null);
  const [openExpertises, setOpenExpertises] = useState(false);
  const [openFamilyKey, setOpenFamilyKey] = useState(null);
  const [openSubfamilyKey, setOpenSubfamilyKey] = useState(null);

  const handleClose = () => {
    setOpen(false);
    setOpenExpertises(false);
    setOpenFamilyKey(null);
    setOpenSubfamilyKey(null);
    if (inputRef.current) inputRef.current.checked = false;
  };

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 12);
    updateScrolled();

    const handleScroll = () => {
      updateScrolled();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggle = () => {
    setOpen(!open);
    if (inputRef.current) inputRef.current.checked = !open;
  };

  const navItems = [
    { to: '/', label: t('home_label') },
    { to: '/cabinet', label: t('about_label') },
    { to: '/expertises', label: t('expertises_label') },
    { to: '/honoraires', label: t('honoraires_label') },
    { to: '/#contact', label: t('contact_label') },
  ];

  return (
    <div className="hamburger-container">
      {/* Language Selector */}
      <div className="language-selector-wrapper">
        <LanguageSelector scrolled={scrolled} />
      </div>

      {/* Hamburger Menu */}
      <div className={`menuToggle ${scrolled ? 'ham-scrolled' : ''}`}>
        <motion.div
          className="hamburger-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleToggle}
        >
          <input
            type="checkbox"
            ref={inputRef}
            readOnly
            checked={open}
            id="menuToggle"
          />
          <span
            className={`line line1 ${open ? 'open' : ''} ${
              scrolled ? 'ham-scrolled' : ''
            }`}
          ></span>
          <span
            className={`line line2 ${open ? 'open' : ''} ${
              scrolled ? 'ham-scrolled' : ''
            }`}
          ></span>
          <span
            className={`line line3 ${open ? 'open' : ''} ${
              scrolled ? 'ham-scrolled' : ''
            }`}
          ></span>
        </motion.div>

        {/* Menu Overlay */}
        <AnimatePresence>
          {open && (
            <>
              {/* Backdrop */}
              <motion.div
                className="menu-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={handleClose}
              />

              {/* Menu Panel */}
              <motion.div
                className="menu-panel"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                {/* Menu Header */}
                <motion.div
                  className="menu-header"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <Image
                    src="/images/logo-color.webp"
                    alt="Logo"
                    className="menu-logo"
                    width={100}
                    height={100}
                  />
                  <div className="menu-close" onClick={handleClose}>
                    <IoCloseSharp />
                  </div>
                </motion.div>

                {/* Menu Content */}
                <motion.ul
                  className="menu-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {navItems.map((item, index) => {
                    const isExpertises = item.to === '/expertises';
                    if (!isExpertises) {
                      return (
                        <motion.li
                          key={item.to}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.5 + index * 0.1,
                            duration: 0.5,
                          }}
                        >
                          <Link
                            href={item.to}
                            onClick={handleClose}
                            className="menu-link"
                          >
                            <span className="menu-link-text">{item.label}</span>
                            <div className="menu-link-arrow">→</div>
                          </Link>
                        </motion.li>
                      );
                    }

                    return (
                      <motion.li
                        key={item.to}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                      >
                        <button
                          type="button"
                          className={`menu-link menu-link-button ${
                            openExpertises ? 'open' : ''
                          }`}
                          onClick={() => setOpenExpertises((v) => !v)}
                        >
                          <span
                            className="menu-link-text"
                            style={{ fontWeight: '500' }}
                          >
                            {item.label}
                          </span>
                          <div className="menu-link-arrow">
                            {openExpertises ? '−' : '+'}
                          </div>
                        </button>

                        <AnimatePresence>
                          {openExpertises && (
                            <motion.ul
                              className="menu-sublist level-1"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                            >
                              {expertisesMenu.map((family) => (
                                <li
                                  key={family.familyKey}
                                  className={`family ${family.color || ''}`}
                                >
                                  <button
                                    type="button"
                                    className={`menu-sublink ${
                                      openFamilyKey === family.familyKey
                                        ? 'open'
                                        : ''
                                    }`}
                                    onClick={() =>
                                      setOpenFamilyKey((k) =>
                                        k === family.familyKey
                                          ? null
                                          : family.familyKey
                                      )
                                    }
                                  >
                                    <span className="menu-sublink-text">
                                      {tNav(`expertises.${family.i18nKey}`)}
                                    </span>
                                    <div className="menu-sublink-arrow">
                                      {openFamilyKey === family.familyKey
                                        ? '−'
                                        : '+'}
                                    </div>
                                  </button>

                                  <AnimatePresence>
                                    {openFamilyKey === family.familyKey && (
                                      <motion.ul
                                        className="menu-sublist level-2"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                      >
                                        {family.subfamilies?.map((sub) => (
                                          <li
                                            key={sub.subfamilyKey}
                                            className="subfamily"
                                          >
                                            {sub.subItems?.length ? (
                                              <>
                                                <button
                                                  type="button"
                                                  className={`menu-sublink ${
                                                    openSubfamilyKey ===
                                                    sub.subfamilyKey
                                                      ? 'open'
                                                      : ''
                                                  }`}
                                                  onClick={() =>
                                                    setOpenSubfamilyKey((k) =>
                                                      k === sub.subfamilyKey
                                                        ? null
                                                        : sub.subfamilyKey
                                                    )
                                                  }
                                                >
                                                  <span className="menu-sublink-text">
                                                    {tNav(
                                                      `expertises.${sub.i18nKey}`
                                                    )}
                                                  </span>
                                                  <div className="menu-sublink-arrow">
                                                    {openSubfamilyKey ===
                                                    sub.subfamilyKey
                                                      ? '−'
                                                      : '+'}
                                                  </div>
                                                </button>
                                                <AnimatePresence>
                                                  {openSubfamilyKey ===
                                                    sub.subfamilyKey && (
                                                    <motion.ul
                                                      className="menu-sublist level-3"
                                                      initial={{
                                                        height: 0,
                                                        opacity: 0,
                                                      }}
                                                      animate={{
                                                        height: 'auto',
                                                        opacity: 1,
                                                      }}
                                                      exit={{
                                                        height: 0,
                                                        opacity: 0,
                                                      }}
                                                    >
                                                      {sub.subItems.map(
                                                        (subItem, i) => (
                                                          <li key={i}>
                                                            <Link
                                                              href={
                                                                subItem.path ||
                                                                '#'
                                                              }
                                                              className="menu-sublink leaf"
                                                              onClick={
                                                                handleClose
                                                              }
                                                            >
                                                              <span className="dot"></span>
                                                              {tNav(
                                                                `expertises.${subItem.i18nKey}`
                                                              )}
                                                            </Link>
                                                          </li>
                                                        )
                                                      )}
                                                    </motion.ul>
                                                  )}
                                                </AnimatePresence>
                                              </>
                                            ) : (
                                              <Link
                                                href={sub.path || '#'}
                                                className="menu-sublink"
                                                onClick={handleClose}
                                              >
                                                {tNav(
                                                  `expertises.${sub.i18nKey}`
                                                )}
                                              </Link>
                                            )}
                                          </li>
                                        ))}
                                      </motion.ul>
                                    )}
                                  </AnimatePresence>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </motion.li>
                    );
                  })}
                </motion.ul>

                {/* Menu Footer */}
                <motion.div
                  className="menu-footer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <div className="contact-info">
                    <p>{t('navbar_cta_label')}</p>
                    <a href="tel:+33641228153" className="phone-link">
                      (+33) 6 41 22 81 53
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HamburgerIcon;
