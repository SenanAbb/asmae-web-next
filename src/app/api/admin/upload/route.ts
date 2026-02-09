import { NextRequest, NextResponse } from 'next/server'
import { verifyAuth } from '@/lib/middleware-auth'
import path from 'path'
import { put } from '@vercel/blob'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const authResult = await verifyAuth(request)
  if (authResult instanceof NextResponse) {
    return authResult
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json(
        { error: 'Archivo no proporcionado' },
        { status: 400 }
      )
    }

    // Validar tamaño (~10 MB límite razonable para plan gratuito)
    const MAX_SIZE = 10 * 1024 * 1024
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'El archivo excede el tamaño máximo de 10MB' },
        { status: 400 }
      )
    }

    // Validar tipo simple (imagen jpg, jpeg, png, webp)
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Solo se permiten imágenes jpg, jpeg, png o webp' },
        { status: 400 }
      )
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const ext = path.extname(file.name) || '.jpg'
    const fileName = `article-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}${ext}`

    const blobPath = `images/articles/${fileName}`
    const blob = await put(blobPath, buffer, {
      access: 'public',
      contentType: file.type,
      addRandomSuffix: false,
    })

    return NextResponse.json({ url: blob.url }, { status: 201 })
  } catch (error) {
    console.error('Error subiendo imagen:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
