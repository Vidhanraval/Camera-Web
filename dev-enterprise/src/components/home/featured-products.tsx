"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Star, Heart, ShoppingCart, Eye, ArrowRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
  {
    id: "p7",
    name: "Samsung 1TB SSD 870 EVO",
    slug: "samsung-1tb-ssd-870-evo",
    price: 8999,
    salePrice: 7499,
    image: "/images/products/samsung-ssd.jpg",
    category: "Storage",
    brand: "Samsung",
    rating: 4.9,
    reviews: 512,
    stock: 80,
    sku: "SSD-SAM-870-1TB",
    gstRate: 18,
    badges: ["Top Rated"],
  },
  {
    id: "p8",
    name: "Canon EOS Webcam Kit",
    slug: "canon-eos-webcam-kit",
    price: 5999,
    salePrice: 4999,
    image: "/images/products/canon-webcam.jpg",
    category: "Accessories",
    brand: "Canon",
    rating: 4.3,
    reviews: 78,
    stock: 35,
    sku: "ACC-CAN-WEBCAM",
    gstRate: 18,
    badges: ["Bundle Deal"],
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
    <section className="py-16 lg:py-24 bg-gray-50/50 dark:bg-gray-950/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2"
            >
              Featured Products
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl lg:text-4xl font-extrabold tracking-tight"
            >
              Top Picks For You
            </motion.h2>
          </div>
          <Link href="/shop?sort=bestseller">
            <Button variant="outline" className="rounded-xl">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="group h-full overflow-hidden">
                {/* Image */}
                <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 img-hover-zoom overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-300 dark:text-gray-600">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {product.badges.map((badge) => (
                      <Badge
                        key={badge}
                        variant={badge.includes("OFF") ? "destructive" : "premium"}
                        className="text-[10px] font-bold backdrop-blur-sm"
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-3 right-3 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-9 w-9 rounded-xl shadow-lg"
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
                      className="h-9 w-9 rounded-xl shadow-lg"
                      onClick={() => router.push(`/product/${product.slug}`)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Add to Cart Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <Button
                      className="w-full rounded-xl shadow-lg"
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                    </Button>
                  </div>
                </div>

                <CardContent className="p-4">
                  {/* Brand & Category */}
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    {product.brand} • {product.category}
                  </p>

                  {/* Name */}
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
                            i < Math.floor(product.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">({product.reviews})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-blue-700 dark:text-blue-400">
                      {formatPrice(product.salePrice)}
                    </span>
                    {product.salePrice < product.price && (
                      <>
                        <span className="text-sm text-gray-400 line-through">
                          {formatPrice(product.price)}
                        </span>
                        <Badge variant="success" className="text-[10px]">
                          {getDiscountPercent(product.price, product.salePrice)}% OFF
                        </Badge>
                      </>
                    )}
                  </div>

                  {/* GST Note */}
                  <p className="text-[10px] text-gray-400 mt-1">+GST @ {product.gstRate}%</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 lg:p-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center"
        >
          <Zap className="h-8 w-8 mx-auto mb-3 opacity-80" />
          <h3 className="text-xl font-bold mb-2">Need Bulk Order or Wholesale Pricing?</h3>
          <p className="text-blue-100 mb-4 max-w-lg mx-auto">
            Contact us for bulk discounts, GST invoices, and special pricing on orders above ₹50,000.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contact">
              <Button className="rounded-xl bg-white text-blue-700 hover:bg-blue-50">
                Get Quote
              </Button>
            </Link>
            <a href={`tel:${"+91-XXXXXXXXXX"}`}>
              <Button variant="outline" className="rounded-xl border-white/30 text-white hover:bg-white/10">
                Call Now
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
