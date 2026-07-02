import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get("q") || ""
    const limit = parseInt(searchParams.get("limit") || "10")

    if (!query || query.length < 2) {
      return NextResponse.json({ items: [] })
    }

    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
          { tags: { contains: query, mode: "insensitive" } },
          { sku: { contains: query, mode: "insensitive" } },
          { category: { name: { contains: query, mode: "insensitive" } } },
          { brand: { name: { contains: query, mode: "insensitive" } } },
        ],
      },
      include: {
        category: { select: { name: true, slug: true } },
        brand: { select: { name: true, slug: true } },
        images: { where: { isPrimary: true }, take: 1 },
      },
      take: limit,
    })

    // Also search categories and brands
    const [categories, brands] = await Promise.all([
      prisma.category.findMany({
        where: { name: { contains: query, mode: "insensitive" }, isActive: true },
        take: 3,
        select: { id: true, name: true, slug: true },
      }),
      prisma.brand.findMany({
        where: { name: { contains: query, mode: "insensitive" }, isActive: true },
        take: 3,
        select: { id: true, name: true, slug: true },
      }),
    ])

    return NextResponse.json({
      products,
      categories,
      brands,
    })
  } catch (error) {
    console.error("Search API Error:", error)
    return NextResponse.json({ error: "Search failed" }, { status: 500 })
  }
}
