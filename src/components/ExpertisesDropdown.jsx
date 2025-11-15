'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

export default function ExpertisesDropdown({ data = [], scrolled = false, onMouseEnter, onMouseLeave }) {
  const tNav = useTranslations('navbar')
  const [activeSubfamily, setActiveSubfamily] = useState(null)
  const [activeSubItem, setActiveSubItem] = useState(null)

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, transition: { duration: 0.2 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  }

  const subfamilyVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
  }

  return (
    <motion.div
      className={`expertises-dropdown ${scrolled ? 'scrolled' : ''}`}
      variants={dropdownVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      role="menu"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="dropdown-grid">
        <div className="dropdown-level-1">
          {data.map((family) => (
            <motion.div
              key={family.familyKey}
              className={`family-item ${family.color || ''}`}
              onMouseEnter={() => setActiveSubfamily(family.familyKey)}
              onMouseLeave={() => {
                setActiveSubfamily(null)
                setActiveSubItem(null)
              }}
            >
              <div className="family-header">
                <h3 className="family-title">{tNav(`expertises.${family.i18nKey}`)}</h3>
                <svg className="family-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 2L12 8L6 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>

              {activeSubfamily === family.familyKey && (
                <motion.div
                  className="dropdown-level-2"
                  variants={subfamilyVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {family.subfamilies?.map((subfamily) => (
                    <motion.div
                      key={subfamily.subfamilyKey}
                      className={`subfamily-item ${subfamily.subItems?.length > 0 ? 'has-subitems' : ''}`}
                      onMouseEnter={() => setActiveSubItem(subfamily.subfamilyKey)}
                      onMouseLeave={() => setActiveSubItem(null)}
                    >
                      <Link
                        href={subfamily.path || '#'}
                        className={`subfamily-link ${activeSubItem === subfamily.subfamilyKey ? 'active' : ''}`}
                      >
                        <span className="subfamily-label">{tNav(`expertises.${subfamily.i18nKey}`)}</span>
                        {subfamily.subItems?.length > 0 && (
                          <svg className="subfamily-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M5 2L11 7L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        )}
                      </Link>

                      {subfamily.subItems?.length > 0 && activeSubItem === subfamily.subfamilyKey && (
                        <motion.div
                          className="dropdown-level-3"
                          variants={subfamilyVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                        >
                          {subfamily.subItems.map((subItem, index) => (
                            <Link key={index} href={subItem.path || '#'} className="subitem-link">
                              <span className="subitem-dot"></span>
                              {tNav(`expertises.${subItem.i18nKey}`)}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
