import Link from "next/link"
import Image from "next/image"
import { getTranslations } from "next-intl/server"
import { prisma } from "@/lib/prisma"
import styles from "./ArticlesPreviewSection.module.css"

export const revalidate = 300

export default async function ArticlesPreviewSection({ locale }) {
  const t = await getTranslations({ locale, namespace: "articles" })

  const articles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    take: 3,
  })

  return (
    <section className={styles.section} aria-labelledby="articles-preview-heading">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 id="articles-preview-heading" className={styles.sectionTitle}>
            {t("page_title")}
          </h2>
          <p className={styles.sectionSubtitle}>{t("page_subtitle")}</p>
        </div>

        <div className={styles.grid} role="list" aria-label="Derniers articles">
          {articles.map((article) => (
            <article key={article.id} className={styles.card} role="listitem">
              <Link href={`/actualites/${article.slug}`} className={styles.cardLink}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={
                      article.coverImage ? article.coverImage : "/images/logo-color.webp"
                    }
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{article.title}</h3>
                  <p className={styles.cardExcerpt}>{article.excerpt}</p>

                  {article.tags && article.tags.length > 0 && (
                    <div className={styles.tags}>
                      {article.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className={styles.tag}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className={styles.meta}>
                    <span>{article.authorName}</span>
                    <span className={styles.dot}></span>
                    {article.publishedAt && (
                      <time dateTime={article.publishedAt}>
                        {new Date(article.publishedAt).toLocaleDateString(locale || "fr-FR")}
                      </time>
                    )}
                    <span className={styles.dot}></span>
                    <span>{article.readingTime || 5} min</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className={styles.viewAll}>
          <Link href="/actualites" className={styles.viewAllLink}>
            {t("page_title")}
          </Link>
        </div>
      </div>
    </section>
  )
}
