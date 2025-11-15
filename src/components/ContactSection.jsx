'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Button from './Button';

const ContactSection = () => {
  const t = useTranslations('contact_section');

  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    phone: '',
    email: '',
    message: '',
  });

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const isFormValid = Object.values(formData).every((val) => val.trim() !== '');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setSending(true);
    setError(null);

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const contentType = res.headers.get('content-type');
      const hasJSON = contentType && contentType.includes('application/json');
      const data = hasJSON ? await res.json() : null;

      if (res.ok) {
        setSent(true);
        setFormData({ name: '', lastname: '', phone: '', email: '', message: '' });
      } else if (res.status === 429) {
        setError(t('contact_section_form_error_too_many_requests'));
      } else if (res.status === 400 && data?.error) {
        setError(t('contact_section_form_error') + ` (${data.error})`);
      } else {
        setError(t('contact_section_form_error'));
      }
    } catch (err) {
      console.error('Send error:', err?.response?.body || err.message);
      setError(t('contact_section_form_error'));
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    if (sending) {
      const id = setTimeout(() => setSending(false), 3000);
      return () => clearTimeout(id);
    }
  }, [sending]);

  useEffect(() => {
    if (sent) {
      const id = setTimeout(() => setSent(false), 3000);
      return () => clearTimeout(id);
    }
  }, [sent]);

  useEffect(() => {
    if (error) {
      const id = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(id);
    }
  }, [error]);

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="contact-wrapper">
          {/* Decorative Elements */}
          <div className="decorative-elements">
            <div className="decoration-circle circle-1"></div>
            <div className="decoration-circle circle-2"></div>
            <div className="decoration-circle circle-3"></div>
          </div>

          <div className="form-container">
            <div className="form-header">
              <h2 className="form-title">{t('contact_section_title')}</h2>
            </div>

            <form onSubmit={handleSubmit} className={`contact-form ${sending ? 'loading' : ''}`}>
              <div className="field-group">
                <div className="input-group">
                  <label htmlFor="name" className="input-label">
                    {t('contact_section_form_name_label')} <span className="required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                      className="form-input"
                      placeholder={t('contact_section_form_name_placeholder')}
                    />
                    <div className="input-border"></div>
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="lastname" className="input-label">
                    {t('contact_section_form_lastname_label')} <span className="required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      name="lastname"
                      id="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      autoComplete="family-name"
                      className="form-input"
                      placeholder={t('contact_section_form_lastname_placeholder')}
                    />
                    <div className="input-border"></div>
                  </div>
                </div>
              </div>

              <div className="field-group">
                <div className="input-group">
                  <label htmlFor="phone" className="input-label">
                    {t('contact_section_form_phone_label')} <span className="required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                      className="form-input"
                      placeholder="+33 6 12 34 56 78"
                    />
                    <div className="input-border"></div>
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="email" className="input-label">
                    {t('contact_section_form_email_label')} <span className="required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      className="form-input"
                      placeholder={t('contact_section_form_email_placeholder')}
                    />
                    <div className="input-border"></div>
                  </div>
                </div>
              </div>

              <div className="input-group full-width">
                <label htmlFor="message" className="input-label">
                  {t('contact_section_form_message_label')} <span className="required">*</span>
                </label>
                <div className="input-wrapper">
                  <textarea
                    name="message"
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="form-textarea"
                    placeholder={t('contact_section_form_message_placeholder')}
                  ></textarea>
                  <div className="input-border"></div>
                </div>
              </div>

              <div className="form-actions">
                <Button
                  text={sending ? t('contact_section_form_button_loading') : t('contact_section_form_button')}
                  type="primary"
                  disabled={!isFormValid || sending}
                  className={`submit-button ${sending ? 'loading' : ''}`}
                />

                {/* Status Messages */}
                <div className="status-messages">
                  {error && (
                    <div className="status-message error-message">
                      <div className="message-icon">⚠️</div>
                      <p>{error}</p>
                    </div>
                  )}

                  {sent && (
                    <div className="status-message success-message">
                      <div className="message-icon">✅</div>
                      <p>{t('contact_section_form_success')}</p>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
