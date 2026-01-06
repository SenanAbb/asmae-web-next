"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import styles from "./ArticleForm.module.css"

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false })
import "react-quill-new/dist/quill.snow.css"

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ],
}

export default function ArticleForm({ article, onSaved, onCancel }) {
  const [title, setTitle] = useState(article?.title || "")
  const [slug, setSlug] = useState(article?.slug || "")
  const [excerpt, setExcerpt] = useState(article?.excerpt || "")
  const [coverImage, setCoverImage] = useState(article?.coverImage || "")
  const [tags, setTags] = useState(Array.isArray(article?.tags) ? article.tags.join(", ") : "")
  const [authorName, setAuthorName] = useState(article?.authorName || "")
  const [published, setPublished] = useState(article?.published ?? true)
  const [content, setContent] = useState(article?.content || "")
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [ok, setOk] = useState("")

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setError("")
    setOk("")
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Erreur lors du chargement de l'image")
      setCoverImage(data.url)
      setOk("Image téléchargée")
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    setError("")
    setOk("")

    if (!title || !slug || !excerpt || !content || !authorName) {
      setError("Champs requis manquants")
      return
    }

    const payload = {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      authorName,
      published,
    }

    setLoading(true)
    try {
      const isEdit = Boolean(article?.id)
      const url = isEdit ? `/api/admin/articles/${article.id}` : "/api/admin/articles"
      const method = isEdit ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Erreur lors de l'enregistrement")
      setOk(isEdit ? "Article mis à jour" : "Article créé avec succès")
      if (!isEdit) {
        setTitle("")
        setSlug("")
        setExcerpt("")
        setCoverImage("")
        setTags("")
        setAuthorName("")
        setPublished(true)
        setContent("")
      }
      onSaved?.()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <div className={styles.sectionTitle}>Informations principales</div>
            <div className={styles.sectionDescription}>Titre, slug et extrait</div>
          </div>
        </div>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label className={styles.label}>Titre</label>
            <input
              className={styles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titre de l'article"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Slug</label>
            <input
              className={styles.input}
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="mon-article-juridique"
            />
          </div>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Extrait</label>
          <textarea
            className={styles.textarea}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Brève description..."
          />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <div className={styles.sectionTitle}>Image et métadonnées</div>
            <div className={styles.sectionDescription}>Cargar portada y etiquetas</div>
          </div>
        </div>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label className={styles.label}>Image de couverture (upload)</label>
            <input
              className={styles.input}
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              onChange={handleUpload}
              disabled={uploading}
            />
            <small className={styles.hint}>
              Formats: jpg, jpeg, png, webp. Taille max: 10MB. Se guarda en /public/images/articles.
            </small>
            {coverImage && (
              <small className={styles.hint}>Image actuelle: {coverImage}</small>
            )}
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Tags (séparés par des virgules)</label>
            <input
              className={styles.input}
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="droit, juridique, société"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Auteur</label>
            <input
              className={styles.input}
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Asmae Kirimov"
            />
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <div className={styles.sectionTitle}>Contenu</div>
            <div className={styles.sectionDescription}>Rédigez ou éditez l'article</div>
          </div>
        </div>
        <div className={styles.editor}>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            placeholder="Contenu de l'article..."
          />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <div className={styles.sectionTitle}>Publication</div>
            <div className={styles.sectionDescription}>État du contenu</div>
          </div>
        </div>
        <div className={styles.checkbox}>
          <input
            id="published"
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          <label htmlFor="published">Publier directement</label>
        </div>
      </div>

      {error && <div className={styles.error}>{error}</div>}
      {ok && <div className={styles.ok}>{ok}</div>}

      <div className={styles.actions}>
        <button className={styles.secondary} type="button" onClick={onCancel} disabled={loading}>
          Annuler
        </button>
        <button className={styles.primary} type="submit" disabled={loading || uploading}>
          {loading ? "Enregistrement..." : "Enregistrer"}
        </button>
      </div>
    </form>
  )
}
