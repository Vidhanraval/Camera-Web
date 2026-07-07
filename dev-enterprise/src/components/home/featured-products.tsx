"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Star, Heart, ShoppingCart, Eye, ArrowRight, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatPrice, getDiscountPercent, cn } from "@/lib/utils"
import { useCartStore } from "@/lib/store/cart-store"
import { useWishlistStore } from "@/lib/store/wishlist-store"
import { toast } from "sonner"

const products = [
  {
    id: "p1",
    name: "Dell Inspiron 15 Laptop",
    slug: "dell-inspiron-15-laptop",
    price: 45990,
    salePrice: 39990,
    image: "/images/products/dell-inspiron.jpg",
    category: "Laptops",
    brand: "Dell",
    rating: 4.5,
    reviews: 128,
    stock: 25,
    sku: "LAP-DEL-INSP15",
    gstRate: 18,
    badges: ["Best Seller", "12% OFF"],
  },
  {
    id: "p2",
    name: "HP LaserJet Pro Printer",
    slug: "hp-laserjet-pro-printer",
    price: 28500,
    salePrice: 24999,
    image: "/images/products/hp-laserjet.jpg",
    category: "Printers",
    brand: "HP",
    rating: 4.8,
    reviews: 89,
    stock: 15,
    sku: "PRN-HP-LJPRO",
    gstRate: 18,
    badges: ["Hot Deal", "₹3,501 OFF"],
  },
  {
    id: "p3",
    name: "Hikvision IP CCTV Camera",
    slug: "hikvision-ip-cctv-camera",
    price: 4500,
    salePrice: 3499,
    image: "/images/products/hikvision-ip.jpg",
    category: "CCTV",
    brand: "Hikvision",
    rating: 4.6,
    reviews: 256,
    stock: 100,
    sku: "CCTV-HIK-IP4MP",
    gstRate: 18,
    badges: ["Popular", "22% OFF"],
  },
  {
    id: "p4",
    name: "ASUS RT-AX88U Router",
    slug: "asus-rt-ax88u-router",
    price: 18999,
    salePrice: 15999,
    image: "/images/products/asus-router.jpg",
    category: "Networking",
    brand: "ASUS",
    rating: 4.7,
    reviews: 67,
    stock: 20,
    sku: "NET-ASUS-AX88U",
    gstRate: 18,
    badges: ["New"],
  },
  {
    id: "p5",
    name: "Samsung 24-inch Monitor",
    slug: "samsung-24-inch-monitor",
    price: 12999,
    salePrice: 10999,
    image: "/images/products/samsung-monitor.jpg",
    category: "Monitors",
    brand: "Samsung",
    rating: 4.4,
    reviews: 198,
    stock: 40,
    sku: "MON-SAM-24FHD",
    gstRate: 18,
    badges: ["₹2,000 OFF"],
  },
  {
    id: "p6",
    name: "Zebronics Keyboard & Mouse",
    slug: "zebronics-keyboard-mouse-combo",
    price: 1499,
    salePrice: 999,
    image: "/images/products/zebronics-km.jpg",
    category: "Accessories",
    brand: "Zebronics",
    rating: 4.2,
    reviews: 345,
    stock: 200,
    sku: "ACC-ZEB-KMCOMBO",
    gstRate: 18,
    badges: ["Value Deal", "33% OFF"],
  },
]

export function FeaturedProducts() {
  const router = useRouter()
  const addToCart = useCartStore((s) => s.addItem)
  const { isInWishlist, toggleItem } = useWishlistStore()

  const handleAddToCart = (product: (typeof products)[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      slug: product.slug,
      sku: product.sku,
      price: product.price,
      salePrice: product.salePrice,
      image: product.image,
      stock: product.stock,
      category: product.category,
      brand: product.brand,
      gstRate: product.gstRate,
    })
    toast.success(`${product.name} added to cart`)
  }

  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-5 w-5 text-amber-500" />
              <span className="text-sm font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Popular Right Now</span>
            </div>
            <h2 className="text-2xl lg:text-4xl font-extrabold tracking-tight">
              Featured{" "}
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Products</span>
            </h2>
          </div>
          <Link href="/shop?sort=bestseller">
            <Button variant="outline" size="lg" className="rounded-2xl border-2 group text-base">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <div className="group relative bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-2xl hover:border-transparent transition-all duration-500 hover:-translate-y-1">
                {/* Image */}
                <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-850 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />

                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {product.badges.map((badge) => (
                      <Badge
                        key={badge}
                        variant={badge.includes("OFF") ? "destructive" : "premium"}
                        className="text-[10px] font-bold shadow-lg"
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-10 w-10 rounded-2xl shadow-lg hover:scale-110 transition-transform"
                      onClick={() => {
                        toggleItem({
                          id: product.id,
                          name: product.name,
                          slug: product.slug,
                          price: product.price,
                          salePrice: product.salePrice,
                          image: product.image,
                          stock: product.stock,
                          category: product.category,
                        })
                        toast.success(
                          isInWishlist(product.id)
                            ? "Removed from wishlist"
                            : "Added to wishlist"
                        )
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
                      className="h-10 w-10 rounded-2xl shadow-lg hover:scale-110 transition-transform"
                      onClick={() => router.push(`/product/${product.slug}`)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Add to Cart Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <Button
                      className="w-full rounded-2xl shadow-xl text-base h-12"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-1.5">
                    {product.brand}
                  </p>
                  <Link href={`/product/${product.slug}`}>
                    <h3 className="font-bold text-sm mb-3 line-clamp-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-3.5 w-3.5",
                            i < Math.floor(product.rating)
                              ? "fill-amber-400 text-amber-400"
                              : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-gray-400">({product.reviews})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-extrabold text-gray-900 dark:text-white">
                      {formatPrice(product.salePrice)}
                    </span>
                    {product.salePrice < product.price && (
                      <>
                        <span className="text-sm text-gray-400 line-through font-medium">
                          {formatPrice(product.price)}
                        </span>
                        <Badge variant="success" className="text-[10px] font-bold">
                          {getDiscountPercent(product.price, product.salePrice)}% OFF
                        </Badge>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
