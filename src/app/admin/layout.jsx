import '../[locale]/globals.css'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Admin | Asmae',
  description: 'Gestion des articles',
}

export default function AdminLayout({ children }) {
  return (
    <html lang="fr">
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
