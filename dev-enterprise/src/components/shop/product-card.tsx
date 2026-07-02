"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Star, Heart, ShoppingCart, Eye, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatPrice, getDiscountPercent, cn } from "@/lib/utils"
import { useCartStore } from "@/lib/store/cart-store"
import { useWishlistStore } from "@/lib/store/wishlist-store"
import { useCompareStore } from "@/lib/store/compare-store"
import { toast } from "sonner"
import type { ProductWithRelations } from "@/lib/types"

interface ProductCardProps {
  product: {
    id: string
    name: string
    slug: string
    sku: string
    description?: string | null
    basePrice: number
    salePrice: number | null
    category: { name: string }
    brand: { name: string } | null
    images: { url: string; alt?: string | null }[]
    reviews: { rating: number }[]
    stock: number
    gstRate: number
    isFeatured?: boolean
    isNewArrival?: boolean
    isBestSeller?: boolean
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()
  const addToCart = useCartStore((s) => s.addItem)
  const { isInWishlist, toggleItem } = useWishlistStore()
  const { isInCompare, addItem: addToCompare } = useCompareStore()
  const avgRating =
    product.reviews.length > 0
      ? product.reviews.reduce((a, r) => a + r.rating, 0) / product.reviews.length
      : 0

  const price = Number(product.basePrice)
  const salePrice = product.salePrice ? Number(product.salePrice) : null
  const discount = salePrice ? getDiscountPercent(price, salePrice) : 0

  const cartProduct = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    sku: product.sku,
    price,
    salePrice,
    image: product.images[0]?.url || "/images/placeholder.jpg",
    stock: product.stock,
    category: product.category.name,
    brand: product.brand?.name || null,
    gstRate: Number(product.gstRate),
  }

  const handleAddToCart = () => {
    addToCart(cartProduct)
    toast.success(`${product.name} added to cart`)
  }

  const badges: string[] = []
  if (product.isFeatured) badges.push("Featured")
  if (product.isNewArrival) badges.push("New")
  if (product.isBestSeller) badges.push("Best Seller")
  if (discount >= 10) badges.push(`${discount}% OFF`)

  return (
    <Card className="group h-full overflow-hidden hover:shadow-2xl hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300">
      {/* Image */}
      <div
        className="cursor-pointer"
        onClick={() => router.push(`/product/${product.slug}`)}
        role="link"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter") router.push(`/product/${product.slug}`) }}
      >
        <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 img-hover-zoom overflow-hidden">
          <div className="w-full h-full flex items-center justify-center text-xl font-bold text-gray-300 dark:text-gray-600">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.images[0]?.url || "/images/products/placeholder.jpg"}
              alt={product.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Badges */}
          {badges.length > 0 && (
            <div className="absolute top-3 left-3 flex flex-col gap-1">
              {badges.slice(0, 2).map((badge) => (
                <Badge
                  key={badge}
                  variant={badge.includes("OFF") ? "destructive" : "premium"}
                  className="text-[10px] font-bold backdrop-blur-sm"
                >
                  {badge}
                </Badge>
              ))}
            </div>
          )}

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Button
              size="icon"
              variant="secondary"
              className="h-9 w-9 rounded-xl shadow-lg hover:scale-110 transition-transform"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                toggleItem({
                  id: product.id,
                  name: product.name,
                  slug: product.slug,
                  price,
                  salePrice,
                  image: product.images[0]?.url || "",
                  stock: product.stock,
                  category: product.category.name,
                })
              }}
            >
              <Heart
                className={cn(
                  "h-4 w-4",
                  isInWishlist(product.id) && "fill-red-500 text-red-500"
                )}
              />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-9 w-9 rounded-xl shadow-lg hover:scale-110 transition-transform"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                router.push(`/product/${product.slug}`)
              }}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-9 w-9 rounded-xl shadow-lg hover:scale-110 transition-transform"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                addToCompare({
                  id: product.id,
                  name: product.name,
                  slug: product.slug,
                  price,
                  salePrice,
                  image: product.images[0]?.url || "",
                  brand: product.brand?.name || null,
                  category: product.category.name,
                  specifications: {},
                })
                toast.success("Added to compare")
              }}
            >
              <BarChart3 className="h-4 w-4" />
            </Button>
          </div>

          {/* Add to Cart */}
          <div className="absolute bottom-3 left-3 right-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <Button className="w-full rounded-xl shadow-lg" size="sm" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart() }}>
              <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
            </Button>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
          {product.brand?.name} • {product.category.name}
        </p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-sm mb-2 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3.5 w-3.5",
                  i < Math.floor(avgRating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews.length})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-lg font-bold text-blue-700 dark:text-blue-400">
            {formatPrice(salePrice || price)}
          </span>
          {salePrice && (
            <>
              <span className="text-sm text-gray-400 line-through">{formatPrice(price)}</span>
              <Badge variant="success" className="text-[10px]">{discount}% OFF</Badge>
            </>
          )}
        </div>
        <p className="text-[10px] text-gray-400 mt-1">+GST @ {Number(product.gstRate)}%</p>

        {/* Stock Status */}
        <p className={cn(
          "text-xs mt-1 font-medium",
          product.stock > 10 ? "text-green-600" : product.stock > 0 ? "text-orange-600" : "text-red-600"
        )}>
          {product.stock > 10 ? "In Stock" : product.stock > 0 ? `Only ${product.stock} left` : "Out of Stock"}
        </p>
      </CardContent>
    </Card>
  )
}
