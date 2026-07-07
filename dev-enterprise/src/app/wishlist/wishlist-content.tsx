"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"
import { useWishlistStore } from "@/lib/store/wishlist-store"
import { useCartStore } from "@/lib/store/cart-store"
import { toast } from "sonner"

export function WishlistContent() {
  const { items, removeItem, clearWishlist } = useWishlistStore()
  const addToCart = useCartStore((s) => s.addItem)

  if (items.length === 0) {
    return (
      <div className="bg-gray-50/50 dark:bg-gray-950/50 min-h-screen">
        <div className="container mx-auto px-4 py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto">
            <div className="h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-6">
              <Heart className="h-12 w-12 text-gray-400" />
            </div>
            <h1 className="text-2xl font-extrabold mb-3">Your Wishlist is Empty</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Save your favorite products here and come back to them anytime.
            </p>
            <Link href="/shop">
              <Button size="lg" className="rounded-xl">
                <ArrowLeft className="h-4 w-4 mr-2" /> Browse Products
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
        <Breadcrumbs items={[{ label: "Wishlist" }]} className="mb-6" />

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-2">My Wishlist</h1>
            <p className="text-gray-500 dark:text-gray-400">{items.length} saved item{items.length > 1 ? 's' : ''}</p>
          </div>
          <Button variant="outline" className="rounded-xl" onClick={clearWishlist}>
            <Trash2 className="h-4 w-4 mr-2" /> Clear All
          </Button>
        </div>

        <div className="product-grid">
          <AnimatePresence>
            {items.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.03 }}
              >
                <Card className="group h-full overflow-hidden">
                  <Link href={`/product/${product.slug}`}>
                    <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 img-hover-zoom">
                      <div className="w-full h-full flex items-center justify-center text-lg font-bold text-gray-300 dark:text-gray-600">
                        Product
                      </div>
                    </div>
                  </Link>
                  <CardContent className="p-4">
                    <Link href={`/product/${product.slug}`}>
                      <h3 className="font-semibold text-sm mb-2 line-clamp-2 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-gray-500 mb-2">{product.category}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-amber-700 dark:text-amber-400">
                        {formatPrice(product.salePrice || product.price)}
                      </span>
                      {product.salePrice && (
                        <span className="text-sm text-gray-400 line-through">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 rounded-xl"
                        onClick={() => {
                          addToCart({
                            id: product.id,
                            name: product.name,
                            slug: product.slug,
                            sku: "",
                            price: product.price,
                            salePrice: product.salePrice,
                            image: product.image,
                            stock: product.stock,
                            category: product.category,
                            brand: null,
                            gstRate: 18,
                          })
                          toast.success("Added to cart")
                        }}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="rounded-xl shrink-0"
                        onClick={() => {
                          removeItem(product.id)
                          toast.success("Removed from wishlist")
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
