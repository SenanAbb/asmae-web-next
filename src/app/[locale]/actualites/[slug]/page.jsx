import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import "./page.css"

export const dynamic = "force-static"
export const revalidate = 300

const formatDate = (dateString) =>
  new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString))

export default async function ArticlePage({ params }) {
  const { locale, slug } = await params
  const t = await getTranslations({ locale, namespace: "article" })

  const article = await prisma.article.findUnique({
    where: { slug, published: true },
  })

  if (!article) {
    notFound()
  }

  return (
    <article className="article-page" role="main">
      <div className="article-container">
        <div className="article-back-link">
          <Link href="/actualites">← {t("back_to_articles")}</Link>
        </div>

        <header className="article-header">
          {article.tags?.[0] && (
            <div className="article-category">{article.tags[0]}</div>
          )}
          <h1 className="article-title">{article.title}</h1>
          <p className="article-excerpt">{article.excerpt}</p>

          <div className="article-meta">
            <div className="author-info">
              <div className="author-details">
                <span className="author-name">{article.authorName}</span>
              </div>
            </div>

            <div className="meta-details">
              {article.publishedAt && (
                <time dateTime={article.publishedAt}>
                  {formatDate(article.publishedAt)}
                </time>
              )}
              <span className="reading-time">
                {article.readingTime || 5} min de lecture
              </span>
            </div>
          </div>
        </header>

        {(article.coverImage && article.coverImage.startsWith("/images/")) || !article.coverImage ? (
          <div className="article-image-wrapper">
            <img
              src={
                article.coverImage && article.coverImage.startsWith("/images/")
                  ? article.coverImage
                  : "/images/logo-color.webp"
              }
              alt={article.title}
              className="article-cover-image"
            />
          </div>
        ) : null}

        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <footer className="article-footer">
          {article.tags && article.tags.length > 0 && (
            <div className="article-tags">
              {article.tags.map((tag) => (
                <span key={tag} className="tag">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="article-cta">
            <h3>{t("need_help")}</h3>
            <p>{t("contact_text")}</p>
            <Link href="/#contact" className="cta-button">
              {t("contact_button")}
            </Link>
          </div>
        </footer>
      </div>
    </article>
  )
}
