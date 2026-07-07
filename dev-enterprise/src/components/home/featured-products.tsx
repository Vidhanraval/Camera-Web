"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Star, Heart, ShoppingCart, Shield, ArrowRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatPrice, getDiscountPercent, cn } from "@/lib/utils"
import { useCartStore } from "@/lib/store/cart-store"
import { useWishlistStore } from "@/lib/store/wishlist-store"
import { toast } from "sonner"

const products = [
  {
    id: "p1", name: "Dell Inspiron 15 — Intel i5, 8GB, 512GB SSD",
    slug: "dell-inspiron-15-laptop", price: 45990, salePrice: 39990,
    image: "/images/products/dell-inspiron.jpg", brand: "Dell", rating: 4.5, reviews: 128, stock: 25,
    sku: "LAP-DEL-INSP15", gstRate: 18, category: "Laptops",
    badge: "Staff Pick",
  },
  {
    id: "p2", name: "HP LaserJet Pro — Wireless Mono Printer",
    slug: "hp-laserjet-pro-printer", price: 28500, salePrice: 24999,
    image: "/images/products/hp-laserjet.jpg", brand: "HP", rating: 4.8, reviews: 89, stock: 15,
    sku: "PRN-HP-LJPRO", gstRate: 18, category: "Printers",
    badge: "₹3,501 OFF",
  },
  {
    id: "p3", name: "Hikvision 4MP IP Bullet Camera — Outdoor",
    slug: "hikvision-ip-cctv-camera", price: 4500, salePrice: 3499,
    image: "/images/products/hikvision-ip.jpg", brand: "Hikvision", rating: 4.6, reviews: 256, stock: 100,
    sku: "CCTV-HIK-IP4MP", gstRate: 18, category: "CCTV",
    badge: "22% OFF",
  },
  {
    id: "p4", name: "ASUS RT-AX88U — WiFi 6 Gaming Router",
    slug: "asus-rt-ax88u-router", price: 18999, salePrice: 15999,
    image: "/images/products/asus-router.jpg", brand: "ASUS", rating: 4.7, reviews: 67, stock: 20,
    sku: "NET-ASUS-AX88U", gstRate: 18, category: "Networking",
  },
  {
    id: "p5", name: "Samsung 24\" FHD Monitor — IPS, 75Hz",
    slug: "samsung-24-inch-monitor", price: 12999, salePrice: 10999,
    image: "/images/products/samsung-monitor.jpg", brand: "Samsung", rating: 4.4, reviews: 198, stock: 40,
    sku: "MON-SAM-24FHD", gstRate: 18, category: "Monitors",
    badge: "₹2,000 OFF",
  },
  {
    id: "p6", name: "Zebronics Keyboard + Mouse Combo — Wired",
    slug: "zebronics-keyboard-mouse-combo", price: 1499, salePrice: 999,
    image: "/images/products/zebronics-km.jpg", brand: "Zebronics", rating: 4.2, reviews: 345, stock: 200,
    sku: "ACC-ZEB-KMCOMBO", gstRate: 18, category: "Accessories",
    badge: "Value Buy",
  },
]

export function FeaturedProducts() {
  const router = useRouter()
  const addToCart = useCartStore((s) => s.addItem)
  const { isInWishlist, toggleItem } = useWishlistStore()

  const handleAddToCart = (product: (typeof products)[0]) => {
    addToCart({ id: product.id, name: product.name, slug: product.slug, sku: product.sku, price: product.price, salePrice: product.salePrice, image: product.image, stock: product.stock, category: product.category, brand: product.brand, gstRate: product.gstRate })
    toast.success(`${product.name} added to cart`)
  }

  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6">
          <div>
            <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-3">
              &mdash; Popular Picks
            </p>
            <h2 className="text-2xl lg:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Products people{" "}
              <span className="text-amber-600 dark:text-amber-400">actually buy</span>
            </h2>
          </div>
          <Link href="/shop" className="shrink-0">
            <Button variant="outline" className="rounded-xl text-sm group">
              See everything <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Product grid — clean, minimal cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <div className="group flex gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-850 transition-colors duration-300">
                {/* Thumbnail */}
                <Link href={`/product/${product.slug}`} className="shrink-0">
                  <div className="h-24 w-24 rounded-xl bg-white dark:bg-gray-800 overflow-hidden border border-gray-100 dark:border-gray-700 group-hover:border-amber-200 dark:group-hover:border-amber-800 transition-colors">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                </Link>

                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">{product.brand}</span>
                      {product.badge && (
                        <Badge variant="premium" className="text-[10px] px-2 py-0">{product.badge}</Badge>
                      )}
                    </div>
                    <Link href={`/product/${product.slug}`}>
                      <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mt-1.5">
                      <div className="flex">
                        {[...Array(5)].map((_, s) => (
                          <Star key={s} className={cn("h-3 w-3", s < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200 dark:fill-gray-700")} />
                        ))}
                      </div>
                      <span className="text-[11px] text-gray-400">{product.reviews}</span>
                    </div>
                  </div>

                  {/* Price + Actions */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-baseline gap-2">
                      <span className="font-extrabold text-gray-900 dark:text-white">{formatPrice(product.salePrice)}</span>
                      {product.salePrice < product.price && (
                        <span className="text-xs text-gray-400 line-through">{formatPrice(product.price)}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-0.5">
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg" onClick={() => { toggleItem({ id: product.id, name: product.name, slug: product.slug, price: product.price, salePrice: product.salePrice, image: product.image, stock: product.stock, category: product.category }); toast.success(isInWishlist(product.id) ? "Removed" : "Saved") }}>
                        <Heart className={cn("h-3.5 w-3.5", isInWishlist(product.id) && "fill-red-500 text-red-500")} />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg" onClick={() => handleAddToCart(product)}>
                        <ShoppingCart className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick stat bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-14 p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-center gap-x-10 gap-y-3"
        >
          {[
            { icon: Zap, text: "Same day dispatch for orders before 2 PM" },
            { icon: Shield, text: "Manufacturer warranty on every product" },
            { icon: ShoppingCart, text: "Bulk orders? Call for wholesale pricing" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <item.icon className="h-4 w-4 text-amber-500 shrink-0" />
              {item.text}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
