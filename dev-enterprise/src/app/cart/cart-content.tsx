"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, ArrowRight, Shield, Truck, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { formatPrice } from "@/lib/utils"
import { useCartStore } from "@/lib/store/cart-store"
import { toast } from "sonner"

export function CartContent() {
  const { items, removeItem, updateQuantity, clearCart, getSubtotal, getGST, getTotal } = useCartStore()

  const subtotal = getSubtotal()
  const gst = getGST()
  const total = getTotal()
  const shipping = subtotal > 5000 ? 0 : 299

  if (items.length === 0) {
    return (
      <div className="bg-gray-50/50 dark:bg-gray-950/50 min-h-screen">
        <div className="container mx-auto px-4 py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto">
            <div className="h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
            <h1 className="text-2xl font-extrabold mb-3">Your Cart is Empty</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Looks like you haven&apos;t added anything to your cart yet. Browse our products and find something you love.
            </p>
            <Link href="/shop">
              <Button size="lg" className="rounded-xl">
                <ArrowLeft className="h-4 w-4 mr-2" /> Continue Shopping
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50/50 dark:bg-gray-950/50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "Cart" }]} className="mb-6" />

        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-2">Shopping Cart</h1>
          <p className="text-gray-500 dark:text-gray-400">{items.length} item{items.length > 1 ? 's' : ''} in your cart</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => {
                const itemPrice = item.product.salePrice || item.product.price
                const itemTotal = itemPrice * item.quantity
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-4 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/60 dark:border-gray-800/60"
                  >
                    {/* Image */}
                    <Link href={`/product/${item.product.slug}`} className="h-24 w-24 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-gray-400">{item.product.brand}</span>
                    </Link>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/product/${item.product.slug}`} className="font-semibold text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2">
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-gray-500 mt-1">SKU: {item.product.sku}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div>
                          <span className="font-bold text-blue-700 dark:text-blue-400">
                            {formatPrice(itemPrice)}
                          </span>
                          <span className="text-xs text-gray-400 ml-2">
                            × {item.quantity} = {formatPrice(itemTotal)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {/* Quantity */}
                          <div className="flex items-center border rounded-lg overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="h-8 w-8 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="h-8 w-10 flex items-center justify-center text-sm font-semibold border-x">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="h-8 w-8 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          {/* Remove */}
                          <button
                            onClick={() => {
                              removeItem(item.product.id)
                              toast.success("Item removed from cart")
                            }}
                            className="h-8 w-8 flex items-center justify-center rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>

            <div className="flex justify-between items-center pt-4">
              <Link href="/shop">
                <Button variant="ghost" className="rounded-xl">
                  <ArrowLeft className="h-4 w-4 mr-2" /> Continue Shopping
                </Button>
              </Link>
              <Button variant="outline" className="rounded-xl" onClick={clearCart}>
                <Trash2 className="h-4 w-4 mr-2" /> Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 p-6">
                <h3 className="text-lg font-bold mb-4">Order Summary</h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-semibold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">GST</span>
                    <span className="font-semibold">{formatPrice(gst)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Shipping</span>
                    <span className={shipping === 0 ? "text-green-600 font-semibold" : "font-semibold"}>
                      {shipping === 0 ? "FREE" : formatPrice(shipping)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-blue-700 dark:text-blue-400">{formatPrice(total + shipping)}</span>
                  </div>
                </div>

                {/* Coupon */}
                <div className="mt-4 flex gap-2">
                  <Input placeholder="Coupon code" className="h-10 rounded-xl text-sm" />
                  <Button variant="outline" className="h-10 rounded-xl shrink-0">
                    Apply
                  </Button>
                </div>

                <Link href="/checkout">
                  <Button size="lg" className="w-full rounded-xl mt-4">
                    Proceed to Checkout <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>

              {/* Trust Info */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 p-6 space-y-3">
                {[
                  { icon: Truck, text: "Free shipping on orders above ₹5,000" },
                  { icon: Shield, text: "100% genuine products with warranty" },
                  { icon: Tag, text: "GST invoice with every purchase" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <item.icon className="h-4 w-4 text-blue-600 shrink-0" />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
