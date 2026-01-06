"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import styles from "./page.module.css"
import Modal from "@/components/admin/Modal"
import ChangePasswordForm from "@/components/admin/ChangePasswordForm"
import ArticleForm from "@/components/admin/ArticleForm"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [busy, setBusy] = useState(false)
  const [openChangePassword, setOpenChangePassword] = useState(false)
  const [openArticle, setOpenArticle] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [deleteError, setDeleteError] = useState("")
  const [deleteLoading, setDeleteLoading] = useState(false)

  const fetchArticles = async (currentPage = 1) => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch(`/api/admin/articles?page=${currentPage}&limit=20`, {
        credentials: "include",
      })
      if (res.status === 401) {
        router.push("/admin/login")
        return
      }
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Erreur lors du chargement des articles")
      setArticles(data.articles || [])
      setTotalPages(data.pagination?.totalPages || 1)
      setPage(currentPage)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogout = async () => {
    setBusy(true)
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" })
    setBusy(false)
    router.push("/admin/login")
  }

  const startEdit = (article) => {
    setSelectedArticle(article)
    setOpenArticle(true)
  }

  const startDelete = (article) => {
    setSelectedArticle(article)
    setDeleteError("")
    setOpenDelete(true)
  }

  const confirmDelete = async () => {
    if (!selectedArticle?.id) return
    setDeleteLoading(true)
    setDeleteError("")
    try {
      const res = await fetch(`/api/admin/articles/${selectedArticle.id}`, {
        method: "DELETE",
        credentials: "include",
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Erreur lors de la suppression")
      setOpenDelete(false)
      setSelectedArticle(null)
      fetchArticles(page)
    } catch (err) {
      setDeleteError(err.message)
    } finally {
      setDeleteLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div>
          <p className={styles.kicker}>Espace administrateur</p>
          <h1 className={styles.title}>Tableau de bord</h1>
        </div>
        <div className={styles.actions}>
          <Link href="/" className={styles.secondaryBtn}>
            ← Retour au site
          </Link>
          <button
            type="button"
            className={styles.primaryBtn}
            onClick={() => setOpenArticle(true)}
          >
            Créer un article
          </button>
          <button
            type="button"
            className={styles.secondaryBtn}
            onClick={() => setOpenChangePassword(true)}
          >
            Changer le mot de passe
          </button>
          <button className={styles.secondaryBtn} onClick={handleLogout} disabled={busy}>
            {busy ? "Déconnexion..." : "Se déconnecter"}
          </button>
        </div>
      </header>

      <Modal
        open={openChangePassword}
        title="Changer le mot de passe"
        onClose={() => setOpenChangePassword(false)}
      >
        <ChangePasswordForm onSuccess={() => setOpenChangePassword(false)} />
      </Modal>

      <Modal
        open={openArticle}
        size="xl"
        title={selectedArticle ? "Modifier l'article" : "Nouvel article"}
        onClose={() => {
          setOpenArticle(false)
          setSelectedArticle(null)
        }}
      >
        <ArticleForm
          article={selectedArticle}
          onSaved={() => {
            setOpenArticle(false)
            setSelectedArticle(null)
            fetchArticles(page)
          }}
          onCancel={() => {
            setOpenArticle(false)
            setSelectedArticle(null)
          }}
        />
      </Modal>

      <Modal
        open={openDelete}
        title="Supprimer l'article"
        onClose={() => setOpenDelete(false)}
      >
        <div className={styles.confirm}>
          <p>
            Êtes-vous sûr de vouloir supprimer « {selectedArticle?.title} » ?
          </p>
          {deleteError && <div className={styles.error}>{deleteError}</div>}
          <div className={styles.actions}>
            <button className={styles.secondaryBtn} onClick={() => setOpenDelete(false)} disabled={deleteLoading}>
              Annuler
            </button>
            <button className={styles.dangerBtn} onClick={confirmDelete} disabled={deleteLoading}>
              {deleteLoading ? "Suppression..." : "Supprimer"}
            </button>
          </div>
        </div>
      </Modal>

      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <p className={styles.kicker}>Articles</p>
            <h2 className={styles.titleSm}>Liste des articles</h2>
          </div>
          <div className={styles.pagination}>
            <button
              className={styles.secondaryBtn}
              onClick={() => fetchArticles(Math.max(1, page - 1))}
              disabled={page <= 1 || loading}
            >
              ← Précédent
            </button>
            <span className={styles.pageInfo}>
              Page {page} / {totalPages}
            </span>
            <button
              className={styles.secondaryBtn}
              onClick={() => fetchArticles(Math.min(totalPages, page + 1))}
              disabled={page >= totalPages || loading}
            >
              Suivant →
            </button>
          </div>
        </div>

        {error && <div className={styles.error}>{error}</div>}
        {loading && <div className={styles.muted}>Chargement des articles...</div>}

        {!loading && !articles.length && !error && (
          <div className={styles.muted}>Aucun article pour le moment.</div>
        )}

        <div className={styles.table}>
          {articles.map((article) => (
            <div key={article.id} className={styles.row}>
              <div>
                <div className={styles.rowTitle}>{article.title}</div>
                <div className={styles.rowMeta}>
                  {article.slug} • {article.published ? "Publié" : "Brouillon"}
                </div>
              </div>
              <div className={styles.rowActions}>
                <div className={styles.rowMeta}>
                  {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString("fr-FR") : "Sans date"}
                </div>
                <div className={styles.rowButtons}>
                  <button
                    className={styles.secondaryBtn}
                    onClick={() => startEdit(article)}
                  >
                    Éditer
                  </button>
                  <button
                    className={styles.dangerBtn}
                    onClick={() => startDelete(article)}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
