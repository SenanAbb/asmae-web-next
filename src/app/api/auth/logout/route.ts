import { NextResponse } from 'next/server'

const COOKIE_NAME = 'auth_token'

export async function POST() {
  try {
    const response = NextResponse.json(
      { success: true, message: 'Sesión cerrada exitosamente' },
      { status: 200 }
    )
    response.cookies.delete(COOKIE_NAME)
    return response
  } catch (error) {
    console.error('Error en logout:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
