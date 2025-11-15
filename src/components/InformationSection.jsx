'use client';

import { useTranslations } from 'next-intl';
import { AiFillMail, AiFillPhone } from 'react-icons/ai';
import { BsFillPinMapFill } from 'react-icons/bs';

const InformationSection = () => {
  const t = useTranslations('information_section');

  return (
    <section className="information-section">
      <div className="container">
        {/* Header Section */}
        <div className="section-header">
          <h2 className="section-title">{t('information_section_title')}</h2>
          <div className="separator" style={{ marginBottom: '2rem' }} />
        </div>

        {/* Content Grid */}
        <div className="information-content">
          {/* Map Section */}
          <div className="map-container">
            <div className="map-wrapper">
              <div className="map-header">
                <h3>{t('information_section_map_title')}</h3>
                <div className="map-decoration"></div>
              </div>
              <div className="map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2903.8163170685216!2d-0.3741877!3d43.2971682!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5649a14ecc3449%3A0x639aef6cf383aa82!2sAsmae%20KIRIMOV!5e0!3m2!1ses!2ses!4v1748599617919!5m2!1ses!2ses"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Contact Info Section */}
          <div className="contact-info">
            <div className="contact-header">
              <h3>{t('information_section_contact_title')}</h3>
              <p>{t('information_section_contact_subtitle')}</p>
            </div>

            <div className="contact-cards">
              <div className="contact-card phone-card">
                <div className="card-icon">
                  <AiFillPhone />
                </div>
                <div className="card-content">
                  <span className="card-label">
                    {t('information_section_phone_title')}
                  </span>
                  <p className="card-value">(+33) 6 41 22 81 53</p>
                </div>
                <div className="card-decoration"></div>
              </div>

              <div className="contact-card email-card">
                <div className="card-icon">
                  <AiFillMail />
                </div>
                <div className="card-content">
                  <span className="card-label">
                    {t('information_section_email_title')}
                  </span>
                  <p className="card-value">asmaekirimov.avocat@gmail.com</p>
                </div>
                <div className="card-decoration"></div>
              </div>

              <div className="contact-card address-card">
                <div className="card-icon">
                  <BsFillPinMapFill />
                </div>
                <div className="card-content">
                  <span className="card-label">
                    {t('information_section_address_title')}
                  </span>
                  <p className="card-value">22 rue des Cordeliers, 64 000 Pau</p>
                </div>
                <div className="card-decoration"></div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="contact-cta">
              <div className="cta-content">
                <img src="/images/logo-color.webp" alt="Logo" className="cta-logo" />
                <p>{t('information_section_cta_text')}</p>
                <button className="cta-button">
                  <AiFillPhone />
                  {t('information_section_cta_button')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InformationSection;
