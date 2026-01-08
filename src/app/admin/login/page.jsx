"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import styles from "./page.module.css"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.error || "Erreur de connexion")
      }

      router.push("/admin/dashboard")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <p className={styles.kicker}>Espace administrateur</p>
          <h2 className={styles.title}>Connexion</h2>
          <p className={styles.subtitle}>Connectez-vous pour gérer vos articles.</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            Adresse e-mail
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="asmae@admin.com"
              required
            />
          </label>

          <label className={styles.label}>
            Mot de passe
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </label>

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <div className={styles.footer}>
          <Link href="/" className={styles.link}>
            ← Retour au site
          </Link>
        </div>
      </div>
    </div>
  )
}
