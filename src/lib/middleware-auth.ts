import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './auth'

export async function verifyAuth(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value

  if (!token) {
    return NextResponse.json(
      { error: 'No autorizado. Token no encontrado.' },
      { status: 401 }
    )
  }

  const payload = verifyToken(token)

  if (!payload) {
    return NextResponse.json(
      { error: 'Token inválido o expirado.' },
      { status: 401 }
    )
  }

  return { userId: payload.userId, email: payload.email }
}
