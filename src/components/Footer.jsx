import { AiFillLinkedin, AiFillMail, AiFillPhone } from 'react-icons/ai';
import { BsFillPinMapFill } from 'react-icons/bs';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const Footer = () => {
  const t = useTranslations('footer');
  const tn = useTranslations('navbar');
  const year = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="footer-background">
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
        <div className="bg-pattern"></div>
      </div>

      <div className="container">
        <div className="footer-content">
          <div className="description">
            <div className="description-content">
              <div className="title">
                <div className="logo-container">
                  <Image src="/images/logo-negro.webp" alt="Logo" className="footer-logo" width={100} height={100} />
                </div>
                <div className="title-content">
                  <h4 className="footer-name">Asmae Kirimov</h4>
                  <div className="title-decoration"></div>
                </div>
              </div>

              <div className="description-text">
                <p>{t('footer_description')}</p>
              </div>

              <div className="social">
                <a
                  href="https://www.linkedin.com/in/asmae-kirimov-528443267/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="LinkedIn"
                >
                  <AiFillLinkedin />
                  <span className="social-tooltip">LinkedIn</span>
                </a>
              </div>
            </div>

            <div className="copyright">
              <p>&copy; {year} {t('footer_copyright')}</p>
            </div>
          </div>

          <div className="links">
            <h4 className="footer-section-title">{t('footer_section_links_label')}</h4>
            <ul className="footer-links-list">
              <li>
                <Link href="/" className="footer-link">{tn('home_label')}</Link>
              </li>
              <li>
                <Link href="/cabinet" className="footer-link">{tn('about_label')}</Link>
              </li>
              <li>
                <Link href="/expertises" className="footer-link">{tn('expertises_label')}</Link>
              </li>
              <li>
                <Link href="/?scrollTo=contact" className="footer-link">{tn('contact_label')}</Link>
              </li>
              <li>
                <Link href="/honoraires" className="footer-link">{tn('honoraires_label')}</Link>
              </li>
            </ul>
          </div>

          <div className="contact">
            <h4 className="footer-section-title">{t('footer_section_contact_label')}</h4>
            <ul className="contact-list">
              <li className="contact-item">
                <div className="contact-icon"><AiFillPhone /></div>
                <div className="contact-info">
                  <span className="contact-label">{t('footer_phone_label')}</span>
                  <a href="tel:+33641228153" className="contact-value">(+33) 6 41 22 81 53</a>
                </div>
              </li>
              <li className="contact-item">
                <div className="contact-icon"><AiFillMail /></div>
                <div className="contact-info">
                  <span className="contact-label">{t('footer_email_label')}</span>
                  <a href="mailto:asmaekirimov.avocat@gmail.com" className="contact-value">asmaekirimov.avocat@gmail.com</a>
                </div>
              </li>
              <li className="contact-item">
                <div className="contact-icon"><BsFillPinMapFill /></div>
                <div className="contact-info">
                  <span className="contact-label">{t('footer_address_label')}</span>
                  <p className="contact-value">22 rue des Cordeliers, 64 000 Pau</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="time">
            <h4 className="footer-section-title">{t('footer_section_time_label')}</h4>
            <ul className="schedule-list">
              <li className="schedule-item">
                <span className="schedule-day">{t('footer_section_monday_friday_label')}</span>
                <span className="schedule-time">9:00 - 18:00</span>
              </li>
              <li className="schedule-item">
                <span className="schedule-day">{t('footer_section_saturday_label')}</span>
                <span className="schedule-time">9:00 - 14:00</span>
              </li>
              <li className="schedule-item">
                <span className="schedule-day">{t('footer_section_sunday_label')}</span>
                <span className="schedule-time closed">{t('footer_section_closed_label')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="bottom-content">
            <p className="bottom-text">
              {t('footer_bottom_text')} {' '}
              <a href="https://www.linkedin.com/in/sanan-abbasov/" className="bottom-link" target="_blank" rel="noopener noreferrer">
                {t('footer_bottom_link')}
              </a>
            </p>
            <div className="bottom-links">
              <Link href="/privacy" className="bottom-link">{t('footer_privacy_label')}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
