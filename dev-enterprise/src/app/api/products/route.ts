import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "24")
    const category = searchParams.get("category")
    const brand = searchParams.get("brand")
    const query = searchParams.get("query")
    const sort = searchParams.get("sort")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")

    const where: Record<string, unknown> = { isActive: true }

    if (category) where.category = { slug: category }
    if (brand) where.brand = { slug: brand }
    if (query) {
      where.OR = [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
        { tags: { contains: query, mode: "insensitive" } },
      ]
    }
    if (minPrice || maxPrice) {
      where.basePrice = {}
      if (minPrice) (where.basePrice as Record<string, number>).gte = parseFloat(minPrice)
      if (maxPrice) (where.basePrice as Record<string, number>).lte = parseFloat(maxPrice)
    }

    let orderBy: Record<string, string> = { createdAt: "desc" }
    if (sort === "price_asc") orderBy = { basePrice: "asc" }
    if (sort === "price_desc") orderBy = { basePrice: "desc" }
    if (sort === "popular") orderBy = { viewCount: "desc" }
    if (sort === "bestseller") orderBy = { salesCount: "desc" }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: where as never,
        include: {
          category: true,
          brand: true,
          images: { orderBy: { sortOrder: "asc" } },
          reviews: { select: { rating: true } },
        },
        orderBy: orderBy as never,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({ where: where as never }),
    ])

    return NextResponse.json({
      items: products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error("Products API Error:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
