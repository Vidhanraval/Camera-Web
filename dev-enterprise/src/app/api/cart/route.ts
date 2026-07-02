import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: { where: { isPrimary: true }, take: 1 },
                category: true,
                brand: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json(cart || { items: [] })
  } catch (error) {
    console.error("Cart API Error:", error)
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { productId, quantity } = await req.json()
    if (!productId || !quantity) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    let cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: { items: true },
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: session.user.id,
          items: { create: { productId, quantity } },
        },
        include: { items: true },
      })
    } else {
      const existing = cart.items.find((i) => i.productId === productId)
      if (existing) {
        await prisma.cartItem.update({
          where: { id: existing.id },
          data: { quantity: existing.quantity + quantity },
        })
      } else {
        await prisma.cartItem.create({
          data: { cartId: cart.id, productId, quantity },
        })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Cart API Error:", error)
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { productId } = await req.json()
    const cart = await prisma.cart.findUnique({ where: { userId: session.user.id } })

    if (cart) {
      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id, productId },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Cart API Error:", error)
    return NextResponse.json({ error: "Failed to remove item" }, { status: 500 })
  }
}
