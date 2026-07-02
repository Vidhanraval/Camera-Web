import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id || session.user.role === "CUSTOMER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const search = searchParams.get("search") || ""

    const where: Record<string, unknown> = {}
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { sku: { contains: search, mode: "insensitive" } },
      ]
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: where as never,
        include: {
          category: { select: { name: true } },
          brand: { select: { name: true } },
          images: { where: { isPrimary: true }, take: 1 },
        },
        orderBy: { updatedAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({ where: where as never }),
    ])

    return NextResponse.json({ items: products, total, page, limit, totalPages: Math.ceil(total / limit) })
  } catch (error) {
    console.error("Admin Products Error:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id || session.user.role === "CUSTOMER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const data = await req.json()

    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        sku: data.sku,
        barcode: data.barcode,
        description: data.description,
        shortDescription: data.shortDescription,
        basePrice: data.basePrice,
        salePrice: data.salePrice,
        wholesalePrice: data.wholesalePrice,
        costPrice: data.costPrice,
        gstRate: data.gstRate || 18,
        hsnCode: data.hsnCode,
        stock: data.stock || 0,
        categoryId: data.categoryId,
        brandId: data.brandId,
        isActive: data.isActive ?? true,
        isFeatured: data.isFeatured ?? false,
        specifications: data.specifications || {},
      },
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error("Admin Create Product Error:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
