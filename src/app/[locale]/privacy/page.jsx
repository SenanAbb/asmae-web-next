'use client';

import '@/styles/PrivacyPage.css';
import { useTranslations } from 'next-intl';

export default function PrivacyPage() {
  const t = useTranslations('privacy');

  return (
    <section className="policy">
      <div className="container">
        <h1>{t('confidentiality_title')}</h1>

        <h2>{t('confidentiality_definitions_title')}</h2>
        <p>{t('confidentiality_definitions_content')}</p>

        <h2>{t('confidentiality_data_controller_title')}</h2>
        <p>{t('confidentiality_data_controller_identity')}</p>
        <ul>
          <li>{t('confidentiality_data_controller_address')}</li>
          <li>{t('confidentiality_data_controller_phone')}</li>
          <li>{t('confidentiality_data_controller_email')}</li>
        </ul>

        <h2>{t('confidentiality_section_1_title')}</h2>
        <p>{t('confidentiality_section_1_content')}</p>

        <h2>{t('confidentiality_section_2_title')}</h2>
        <p>{t('confidentiality_section_2_content')}</p>

        <h2>{t('confidentiality_section_3_title')}</h2>
        <p>{t('confidentiality_section_3_content')}</p>

        <h2>{t('confidentiality_section_4_title')}</h2>
        <p>{t('confidentiality_section_4_part1')}</p>
        <p>{t('confidentiality_section_4_part2')}</p>

        <h2>{t('confidentiality_section_6_title')}</h2>
        <p>{t('confidentiality_section_6_content')}</p>

        <h2>{t('confidentiality_section_7_title')}</h2>
        <p>{t('confidentiality_section_7_content')}</p>

        <h2>{t('confidentiality_section_8_title')}</h2>
        <p>{t('confidentiality_section_8_duration')}</p>
        <p>{t('confidentiality_section_8_purpose')}</p>
        <p>{t('confidentiality_section_8_optin')}</p>

        <h2>{t('confidentiality_section_9_title')}</h2>
        <p>{t('confidentiality_section_9_content')}</p>

        <h2>{t('confidentiality_section_10_title')}</h2>
        <p>{t('confidentiality_section_10_contract')}</p>
        <p>{t('confidentiality_section_10_anonymization')}</p>
        <p>{t('confidentiality_section_10_delete')}</p>
        <p>{t('confidentiality_section_10_inactivity')}</p>

        <h2>{t('confidentiality_section_11_title')}</h2>
        <p>{t('confidentiality_section_11_user_delete')}</p>
        <p>{t('confidentiality_section_11_violation_delete')}</p>

        <h2>{t('confidentiality_section_12_title')}</h2>
        <p>{t('confidentiality_section_12_user_notice')}</p>
        <p>{t('confidentiality_section_12_liability')}</p>

        <h2>{t('confidentiality_section_13_title')}</h2>
        <p>{t('confidentiality_section_13_content')}</p>

        <h2>{t('confidentiality_section_14_title')}</h2>
        <p>{t('confidentiality_section_14_content')}</p>

        <h2>{t('confidentiality_section_15_title')}</h2>
        <p>{t('confidentiality_section_15_content')}</p>

        <h2>{t('confidentiality_section_16_title')}</h2>
        <p>{t('confidentiality_section_16_content')}</p>
      </div>
    </section>
  );
}
