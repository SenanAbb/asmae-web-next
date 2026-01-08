import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAuth } from '@/lib/middleware-auth'

// Función para calcular tiempo de lectura basada en caracteres (~900 chars/min)
function calculateReadingTime(content: string): number {
  const chars = content.length
  const charsPerMin = 2000
  return Math.max(1, Math.ceil(chars / charsPerMin))
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await verifyAuth(request)
  if (authResult instanceof NextResponse) {
    return authResult
  }

  try {
    const { id } = await params

    const article = await prisma.article.findUnique({
      where: { id },
    })

    if (!article) {
      return NextResponse.json(
        { error: 'Artículo no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({ article }, { status: 200 })
  } catch (error) {
    console.error('Error obteniendo artículo:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await verifyAuth(request)
  if (authResult instanceof NextResponse) {
    return authResult
  }

  try {
    const { id } = await params
    const body = await request.json()

    const existingArticle = await prisma.article.findUnique({
      where: { id },
    })

    if (!existingArticle) {
      return NextResponse.json(
        { error: 'Artículo no encontrado' },
        { status: 404 }
      )
    }

    if (body.slug && body.slug !== existingArticle.slug) {
      const slugExists = await prisma.article.findUnique({
        where: { slug: body.slug },
      })

      if (slugExists) {
        return NextResponse.json(
          { error: 'Ya existe un artículo con ese slug' },
          { status: 400 }
        )
      }
    }

    const updateData: any = {}

    if (body.title !== undefined) updateData.title = body.title
    if (body.slug !== undefined) updateData.slug = body.slug
    if (body.excerpt !== undefined) updateData.excerpt = body.excerpt
    const contentToUse =
      body.content !== undefined ? body.content : existingArticle.content || ''
    updateData.content = contentToUse
    updateData.readingTime = calculateReadingTime(contentToUse)
    if (body.coverImage !== undefined) updateData.coverImage = body.coverImage
    if (body.tags !== undefined) updateData.tags = body.tags
    if (body.authorName !== undefined) updateData.authorName = body.authorName
    if (body.published !== undefined) {
      updateData.published = body.published
      if (body.published && !existingArticle.publishedAt) {
        updateData.publishedAt = new Date()
      }
    }

    const article = await prisma.article.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(
      { success: true, article },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error actualizando artículo:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await verifyAuth(request)
  if (authResult instanceof NextResponse) {
    return authResult
  }

  try {
    const { id } = await params

    const article = await prisma.article.findUnique({
      where: { id },
    })

    if (!article) {
      return NextResponse.json(
        { error: 'Artículo no encontrado' },
        { status: 404 }
      )
    }

    await prisma.article.delete({
      where: { id },
    })

    return NextResponse.json(
      { success: true, message: 'Artículo eliminado exitosamente' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error eliminando artículo:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
