import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAuth } from '@/lib/middleware-auth'

export async function GET(request: NextRequest) {
  const authResult = await verifyAuth(request)
  if (authResult instanceof NextResponse) {
    return authResult
  }

  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const published = searchParams.get('published')

    const skip = (page - 1) * limit

    const where: any = {}

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (published !== null && published !== undefined && published !== '') {
      where.published = published === 'true'
    }

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.article.count({ where }),
    ])

    return NextResponse.json(
      {
        articles,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error obteniendo artículos:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// Función para calcular tiempo de lectura basada en caracteres (~900 chars/min)
function calculateReadingTime(content: string): number {
  const chars = content.length
  const charsPerMin = 2000
  return Math.max(1, Math.ceil(chars / charsPerMin))
}

export async function POST(request: NextRequest) {
  const authResult = await verifyAuth(request)
  if (authResult instanceof NextResponse) {
    return authResult
  }

  try {
    const body = await request.json()
    const {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      tags,
      authorName,
      published,
    } = body

    if (!title || !slug || !excerpt || !content || !authorName) {
      return NextResponse.json(
        { error: 'Champs requis: title, slug, excerpt, content, authorName' },
        { status: 400 }
      )
    }

    const existingArticle = await prisma.article.findUnique({
      where: { slug },
    })

    if (existingArticle) {
      return NextResponse.json(
        { error: 'Un article avec ce slug existe déjà' },
        { status: 400 }
      )
    }

    const readingTime = calculateReadingTime(content)

    const article = await prisma.article.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage: coverImage || null,
        tags: tags || [],
        authorName,
        readingTime,
        published: published !== undefined ? published : true,
        publishedAt: published !== false ? new Date() : null,
      },
    })

    return NextResponse.json(
      { success: true, article },
      { status: 201 }
    )
  } catch (error) {
    console.error('Erreur lors de la création:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
