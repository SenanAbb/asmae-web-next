import { revalidatePath } from 'next/cache'

// Purga la caché ISR de las páginas públicas de artículos tras crear/editar/borrar.
// Cubre todos los locales al revalidar el patrón de ruta dinámica.
export function revalidateArticles() {
  revalidatePath('/[locale]/actualites', 'page')
  revalidatePath('/[locale]/actualites/[slug]', 'page')
}
