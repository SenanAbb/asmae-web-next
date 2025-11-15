"use client";

import { AiOutlineEye, AiOutlineFieldTime, AiOutlineThunderbolt, AiOutlineUser } from 'react-icons/ai';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const AdvantagesSection = () => {
  const t = useTranslations('advantages_section');

  return (
    <section className="cabinet-strengths">
      <div className="container">
        {/* Header con logo */}
        <div className="section-header">
          <div className="logo-container">
            <Image src="/images/logo-color.webp" alt="Logo" className="brand-logo" width={100} height={100} />
          </div>
          <h2 className="title">{t('advantages_section_title')}</h2>
          <p className="subtitle">{t('advantages_section_subtitle')}</p>
        </div>

        {/* Grid de ventajas */}
        <div className="strengths-grid">
          <div className="strength-card card-1">
            <div className="card-header">
              <div className="icon-wrapper">
                <AiOutlineFieldTime className="icon" />
              </div>
              <h3 className="card-title">{t('advantages_section_item_1_title')}</h3>
              <div className="card-number">01</div>
            </div>
            <div className="card-content">
              <p className="card-text">{t('advantages_section_item_1_description')}</p>
            </div>
            <div className="card-decoration"></div>
          </div>

          <div className="strength-card card-2">
            <div className="card-header">
              <div className="icon-wrapper">
                <AiOutlineUser className="icon" />
              </div>
              <h3 className="card-title">{t('advantages_section_item_2_title')}</h3>
              <div className="card-number">02</div>
            </div>
            <div className="card-content">
              <p className="card-text">{t('advantages_section_item_2_description')}</p>
            </div>
            <div className="card-decoration"></div>
          </div>

          <div className="strength-card card-3">
            <div className="card-header">
              <div className="icon-wrapper">
                <AiOutlineEye className="icon" />
              </div>
              <h3 className="card-title">{t('advantages_section_item_3_title')}</h3>
              <div className="card-number">03</div>
            </div>
            <div className="card-content">
              <p className="card-text">{t('advantages_section_item_3_description')}</p>
            </div>
            <div className="card-decoration"></div>
          </div>

          <div className="strength-card card-4">
            <div className="card-header">
              <div className="icon-wrapper">
                <AiOutlineThunderbolt className="icon" />
              </div>
              <h3 className="card-title">{t('advantages_section_item_4_title')}</h3>
              <div className="card-number">04</div>
            </div>
            <div className="card-content">
              <p className="card-text">{t('advantages_section_item_4_description')}</p>
            </div>
            <div className="card-decoration"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
