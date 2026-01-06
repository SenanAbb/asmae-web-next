import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'

export default async function AdminIndexPage() {
  const token = (await cookies()).get('auth_token')?.value
  const payload = token ? verifyToken(token) : null

  if (payload) {
    redirect('/admin/dashboard')
  }

  redirect('/admin/login')
}
