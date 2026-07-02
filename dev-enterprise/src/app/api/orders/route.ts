import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { generateOrderNumber } from "@/lib/utils"

export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")

    const where = { userId: session.user.id }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          items: { include: { product: { select: { slug: true } } } },
          address: true,
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.order.count({ where }),
    ])

    return NextResponse.json({
      items: orders,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error("Orders API Error:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { addressId, items, paymentMethod, couponCode, notes } = await req.json()

    if (!addressId || !items?.length) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Calculate totals
    let subtotal = 0
    let gstAmount = 0

    const orderItems = await Promise.all(
      items.map(async (item: { productId: string; quantity: number }) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
          include: { images: { where: { isPrimary: true }, take: 1 } },
        })

        if (!product) throw new Error(`Product ${item.productId} not found`)

        const price = Number(product.salePrice || product.basePrice)
        const itemTotal = price * item.quantity
        const gst = itemTotal * (Number(product.gstRate) / 100)

        subtotal += itemTotal
        gstAmount += gst

        return {
          productId: product.id,
          productName: product.name,
          productSku: product.sku,
          productImage: product.images[0]?.url || null,
          quantity: item.quantity,
          unitPrice: price,
          gstRate: Number(product.gstRate),
          totalPrice: itemTotal,
        }
      })
    )

    const orderNumber = generateOrderNumber()
    const total = subtotal + gstAmount

    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: session.user.id,
        addressId,
        subtotal,
        gstAmount,
        total,
        paymentMethod: paymentMethod || "RAZORPAY",
        couponCode,
        notes,
        items: { create: orderItems },
        statusHistory: {
          create: { status: "PENDING", note: "Order created" },
        },
      },
      include: { items: true, address: true },
    })

    // Clear cart
    const cart = await prisma.cart.findUnique({ where: { userId: session.user.id } })
    if (cart) {
      await prisma.cartItem.deleteMany({ where: { cartId: cart.id } })
    }

    // Update stock
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity }, salesCount: { increment: item.quantity } },
      })
    }

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error("Create Order Error:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
