import Link from "next/link"
import Image from "next/image"
import { getTranslations } from "next-intl/server"
import { prisma } from "@/lib/prisma"
import "./page.css"

export const dynamic = "force-static"
export const revalidate = 300

export default async function ActualitesPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "articles" })

  const articles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  })

  return (
    <div className="articles-page">
      <div className="background-elements" aria-hidden="true">
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
      </div>

      <div className="container">
        <div className="page-header">
          <h1 className="page-title">{t("page_title")}</h1>
          <p className="page-subtitle">{t("page_subtitle")}</p>
        </div>

        {articles.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--text-secondary)" }}>
            {t("no_articles")}
          </p>
        ) : (
          <div className="articles-grid">
            {articles.map((article) => (
              <div key={article.id} className="article-card">
                <Link href={`/actualites/${article.slug}`} className="card-link">
                  <div className="card-image-wrapper">
                    {article.coverImage && article.coverImage.startsWith("/images/") ? (
                      <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        className="card-image"
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <Image
                        src="/images/logo-color.webp"
                        alt="placeholder"
                        fill
                        className="card-image placeholder-image"
                        style={{ objectFit: "contain" }}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}
                  </div>
                  <div className="card-content">
                    <h2 className="card-title">{article.title}</h2>
                    <p className="card-excerpt">{article.excerpt}</p>
                    {article.tags && article.tags.length > 0 && (
                      <div className="card-tags">
                        {article.tags.map((tag) => (
                          <span key={tag} className="tag">#{tag}</span>
                        ))}
                      </div>
                    )}
                    <div className="card-footer">
                      <div className="author-info">
                        <div className="author-details">
                          <span className="author-name">{article.authorName}</span>
                        </div>
                      </div>
                      <div className="card-meta">
                        {article.publishedAt && (
                          <time>
                            {new Date(article.publishedAt).toLocaleDateString("fr-FR")}
                          </time>
                        )}
                        <span className="reading-time">
                          {article.readingTime || 5} min
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
