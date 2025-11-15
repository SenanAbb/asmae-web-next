'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import Button from './Button';

const ExpertisesSection = () => {
  const t = useTranslations('expertises_section');
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const expertises = [
    {
      title: t('expertises_section_title_1'),
      subtitle: t('expertises_section_subtitle_1'),
      description: t('expertises_section_description_1'),
      image: '/images/societe.webp',
    },
    {
      title: t('expertises_section_title_2'),
      subtitle: t('expertises_section_subtitle_2'),
      description: t('expertises_section_description_2'),
      image: '/images/etrangers.webp',
    },
    {
      title: t('expertises_section_title_3'),
      subtitle: t('expertises_section_subtitle_3'),
      description: t('expertises_section_description_3'),
      image: '/images/publique.webp',
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % expertises.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [expertises.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % expertises.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + expertises.length) % expertises.length
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleExpertiseClick = () => {
    router.push('/expertises');
  };

  // Animation variants
  const textVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: {
        duration: 0.5,
        ease: 'easeIn',
      },
    },
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section className="expertises-section">
      {/* Carousel Container - Full Width */}
      <div className="carousel-container">
        {/* Background Images */}
        <div className="background-images">
          <AnimatePresence>
            {expertises.map(
              (expertise, index) =>
                index === currentSlide && (
                  <motion.div
                    key={`${index}-${currentSlide}`}
                    className="background-image"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    style={{
                      backgroundImage: `url(${expertise.image})`,
                    }}
                  >
                    <div className="image-overlay"></div>
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>

        {/* Content */}
        <div className="carousel-content">
          <div className="container">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                className="slide-content"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.h2 className="slide-title" variants={textVariants}>
                  {expertises[currentSlide].title}
                </motion.h2>

                <motion.h3 className="slide-subtitle" variants={textVariants}>
                  {expertises[currentSlide].subtitle}
                </motion.h3>

                <motion.p className="slide-description" variants={textVariants}>
                  {expertises[currentSlide].description}
                </motion.p>

                <motion.div className="slide-button" variants={textVariants}>
                  <Button
                    text={t('expertises_section_button')}
                    type="secondary"
                    onClick={handleExpertiseClick}
                    className="expertise-button"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="bottom-controls">
          {/* Navigation Controls */}
          <button
            className="nav-button prev-button"
            onClick={prevSlide}
            aria-label="Anterior"
          >
            <AiOutlineLeft size={20} />
          </button>

          {/* Progress Indicators */}
          <div className="carousel-indicators">
            {expertises.map((_, index) => (
              <button
                key={index}
                className={`indicator ${
                  index === currentSlide ? 'active' : ''
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Ir a slide ${index + 1}`}
              >
                <div className="indicator-progress">
                  {index === currentSlide && (
                    <motion.div
                      className="progress-bar"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 8, ease: 'linear' }}
                    />
                  )}
                </div>
              </button>
            ))}
          </div>

          <button
            className="nav-button next-button"
            onClick={nextSlide}
            aria-label="Siguiente"
          >
            <AiOutlineRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExpertisesSection;