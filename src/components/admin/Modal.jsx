"use client"

import { useEffect } from 'react'
import styles from './Modal.module.css'

export default function Modal({ open, title, children, onClose, size = "md" }) {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  if (!open) return null

  const cardClass =
    size === "xl" ? `${styles.card} ${styles.cardXl}` : styles.card

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true">
      <div className={cardClass}>
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
      <button type="button" className={styles.backdropClick} onClick={onClose} aria-label="Close" />
    </div>
  )
}
