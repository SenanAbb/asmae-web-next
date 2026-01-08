"use client"

import { useState } from 'react'
import styles from './ChangePasswordForm.module.css'

export default function ChangePasswordForm({ onSuccess }) {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [ok, setOk] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setOk('')

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Tous les champs sont requis')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('La confirmation ne correspond pas')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Erreur')
      setOk('Mot de passe mis à jour')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      onSuccess?.()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <label className={styles.label}>
        Mot de passe actuel
        <input
          className={styles.input}
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="••••••••"
        />
      </label>

      <label className={styles.label}>
        Nouveau mot de passe
        <input
          className={styles.input}
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="••••••••"
        />
      </label>

      <label className={styles.label}>
        Confirmer le nouveau mot de passe
        <input
          className={styles.input}
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
        />
      </label>

      {error && <div className={styles.error}>{error}</div>}
      {ok && <div className={styles.ok}>{ok}</div>}

      <div className={styles.actions}>
        <button className={styles.primary} type="submit" disabled={loading}>
          {loading ? 'Mise à jour...' : 'Mettre à jour'}
        </button>
      </div>
    </form>
  )
}
