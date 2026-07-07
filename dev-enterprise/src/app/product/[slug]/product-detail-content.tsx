"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Star, Heart, ShoppingCart, RefreshCw, Shield, Truck, BarChart3,
  Share2, Minus, Plus, ChevronLeft, ChevronRight, Check, HelpCircle,
  Award, FileText, Ruler, Weight, Tag
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { ProductCard } from "@/components/shop/product-card"
import { ProductDetailSkeleton } from "@/components/shared/product-skeleton"
import { formatPrice, getDiscountPercent, cn } from "@/lib/utils"
import { useCartStore } from "@/lib/store/cart-store"
import { useWishlistStore } from "@/lib/store/wishlist-store"
import { useCompareStore } from "@/lib/store/compare-store"
import { toast } from "sonner"

interface ProductDetailContentProps {
  slug: string
}

export function ProductDetailContent({ slug }: ProductDetailContentProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState<string>("")

  // Demo product data
  const product = {
    id: "demo-1",
    name: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    slug,
    sku: "SKU-DEMO-001",
    barcode: "8901234567890",
    description: `Experience exceptional performance with the ${slug.replace(/-/g, " ")}. Designed for professionals and power users, this device delivers outstanding reliability, speed, and efficiency for all your computing needs.\n\nFeaturing cutting-edge technology, premium build quality, and comprehensive warranty coverage, this product is the perfect choice for businesses and individuals who demand the best.`,
    shortDescription: "Professional-grade computing solution with premium features and comprehensive warranty.",
    highlights: [
      "Latest generation processor for blazing-fast performance",
      "Premium build quality with durable construction",
      "Energy-efficient design for reduced power consumption",
      "Comprehensive warranty and support included",
    ],
    basePrice: 45990,
    salePrice: 39990,
    wholesalePrice: 38500,
    gstRate: 18,
    hsnCode: "8471",
    stock: 25,
    category: { name: "Laptops", slug: "laptops" },
    brand: { name: "Dell", slug: "dell" },
    images: [
      { url: "/images/products/main.jpg", alt: "Main view" },
      { url: "/images/products/angle.jpg", alt: "Angle view" },
      { url: "/images/products/side.jpg", alt: "Side view" },
      { url: "/images/products/back.jpg", alt: "Back view" },
    ],
    variants: [
      { id: "v1", name: "8GB RAM / 256GB SSD", sku: "SKU-DEMO-V1", price: 39990, stock: 15 },
      { id: "v2", name: "16GB RAM / 512GB SSD", sku: "SKU-DEMO-V2", price: 49990, stock: 10 },
      { id: "v3", name: "16GB RAM / 1TB SSD", sku: "SKU-DEMO-V3", price: 59990, stock: 5 },
    ],
    specifications: {
      "Processor": "Intel Core i5 12th Gen / AMD Ryzen 5",
      "RAM": "8GB / 16GB DDR4",
      "Storage": "256GB / 512GB / 1TB NVMe SSD",
      "Display": "15.6-inch Full HD IPS",
      "Graphics": "Intel Iris Xe / AMD Radeon",
      "Operating System": "Windows 11 Pro",
      "Warranty": "3 Years Manufacturer Warranty",
      "Weight": "1.7 kg",
      "Dimensions": "35.8 x 23.5 x 1.8 cm",
      "Battery": "54Wh, Up to 8 hours",
      "Ports": "USB-C, USB 3.2 x2, HDMI, Audio Jack",
      "Connectivity": "WiFi 6, Bluetooth 5.2",
    },
    reviews: [
      { id: "r1", rating: 5, title: "Excellent product, great value!", content: "Been using this for 3 months now. Build quality is excellent and performance is top-notch. The after-sales support from Dev Enterprise was fantastic.", user: { name: "Rajesh K.", image: null }, createdAt: "2024-12-15" },
      { id: "r2", rating: 4, title: "Good but shipping took time", content: "Product is as described and works well. Only reason for 4 stars is because shipping took 2 days longer than expected. Otherwise, very satisfied.", user: { name: "Priya M.", image: null }, createdAt: "2024-11-28" },
      { id: "r3", rating: 5, title: "Perfect for my business", content: "Ordered 5 units for my office team. Best price I could find. The team at Dev Enterprise helped with bulk pricing and quick delivery.", user: { name: "Amit S.", image: null }, createdAt: "2024-11-10" },
    ],
    reviewCount: 3,
    avgRating: 4.7,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
  }

  const { addItem } = useCartStore()
  const { isInWishlist, toggleItem } = useWishlistStore()
  const { isInCompare, addItem: addToCompare } = useCompareStore()
  const price = product.basePrice
  const salePrice = product.salePrice

  const cartProduct = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    sku: product.sku,
    price,
    salePrice,
    image: product.images[0]?.url || "",
    stock: product.stock,
    category: product.category.name,
    brand: product.brand?.name || null,
    gstRate: product.gstRate,
  }

  const discount = salePrice ? getDiscountPercent(price, salePrice) : 0

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(cartProduct)
    }
    toast.success(`${quantity}x ${product.name} added to cart`)
  }

  const handleBuyNow = () => {
    handleAddToCart()
    window.location.href = "/checkout"
  }

  if (!product) return <ProductDetailSkeleton />

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      <div className="container mx-auto px-4 py-6 lg:py-10">
        <Breadcrumbs
          items={[
            { label: "Shop", href: "/shop" },
            { label: product.category.name, href: `/categories/${product.category.slug}` },
            { label: product.name },
          ]}
          className="mb-6"
        />

        {/* Product Main */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-square rounded-3xl bg-gray-100 dark:bg-gray-800 overflow-hidden group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.images[selectedImage]?.url || "/images/products/placeholder.jpg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <button className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 dark:bg-gray-900/90 shadow-lg flex items-center justify-center sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 dark:bg-gray-900/90 shadow-lg flex items-center justify-center sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    "aspect-square rounded-xl bg-gray-100 dark:bg-gray-800 overflow-hidden border-2 transition-all duration-200",
                    selectedImage === i
                      ? "border-amber-600 shadow-md"
                      : "border-transparent hover:border-gray-300"
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url || "/images/products/placeholder.jpg"}
                    alt={img.alt || `View ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Brand & Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <Link href={`/brands/${product.brand.slug}`} className="text-sm font-semibold text-amber-600 dark:text-amber-400 hover:underline">
                {product.brand.name}
              </Link>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <span className="text-sm text-gray-500">{product.category.name}</span>
              {product.isBestSeller && <Badge variant="premium">Best Seller</Badge>}
              {discount > 0 && <Badge variant="destructive">{discount}% OFF</Badge>}
            </div>

            {/* Name */}
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight">
              {product.name}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">{product.shortDescription}</p>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-5 w-5",
                      i < Math.floor(product.avgRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    )}
                  />
                ))}
              </div>
              <span className="font-semibold">{product.avgRating}</span>
              <span className="text-gray-500">({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-3xl lg:text-4xl font-extrabold text-amber-700 dark:text-amber-400">
                  {formatPrice(salePrice || price)}
                </span>
                {salePrice && (
                  <span className="text-lg text-gray-400 line-through">
                    {formatPrice(price)}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500">
                HSN: {product.hsnCode} | SKU: {product.sku}
              </p>
              {product.wholesalePrice && (
                <p className="text-sm text-green-600 dark:text-green-400 mt-2 font-medium">
                  Wholesale: {formatPrice(product.wholesalePrice)} (min 5 qty)
                </p>
              )}
            </div>

            {/* Variants */}
            {product.variants.length > 0 && (
              <div>
                <label className="text-sm font-semibold mb-2 block">Configuration</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant.id)}
                      className={cn(
                        "p-3 rounded-xl border-2 text-left transition-all duration-200",
                        selectedVariant === variant.id
                          ? "border-amber-600 bg-amber-50 dark:bg-amber-950/30"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                      )}
                    >
                      <p className="text-sm font-medium">{variant.name}</p>
                      <p className="text-sm font-bold text-amber-700 dark:text-amber-400">
                        {formatPrice(variant.price)}
                      </p>
                      <p className={cn("text-xs", variant.stock > 0 ? "text-green-600" : "text-red-500")}>
                        {variant.stock > 0 ? `${variant.stock} in stock` : "Out of stock"}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center border-2 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-12 w-12 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="h-12 w-14 flex items-center justify-center font-semibold text-lg border-x-2 border-gray-200 dark:border-gray-700">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="h-12 w-12 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <Button size="lg" className="flex-1 rounded-xl" onClick={handleAddToCart}>
                <ShoppingCart className="h-5 w-5 mr-2" /> Add to Cart
              </Button>
              <Button size="lg" variant="premium" className="rounded-xl" onClick={handleBuyNow}>
                Buy Now
              </Button>
            </div>

            {/* Wishlist / Compare / Share */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl"
                onClick={() => {
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
                <Heart className={cn("h-4 w-4 mr-2", isInWishlist(product.id) && "fill-red-500 text-red-500")} />
                {isInWishlist(product.id) ? "Saved" : "Wishlist"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl"
                onClick={() => {
                  addToCompare({
                    id: product.id,
                    name: product.name,
                    slug: product.slug,
                    price,
                    salePrice,
                    image: product.images[0]?.url || "",
                    brand: product.brand.name,
                    category: product.category.name,
                    specifications: product.specifications,
                  })
                  toast.success("Added to compare")
                }}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Compare
              </Button>
              <Button variant="outline" size="sm" className="rounded-xl">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Trust Icons */}
            <div className="flex flex-wrap gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              {[
                { icon: Truck, text: "Free Delivery" },
                { icon: Shield, text: "3 Year Warranty" },
                { icon: RefreshCw, text: "7-Day Replacement" },
                { icon: Award, text: "100% Genuine" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <item.icon className="h-4 w-4 text-amber-600" />
                  {item.text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start rounded-xl p-1">
              {["description", "specifications", "reviews", "shipping"].map((tab) => (
                <TabsTrigger key={tab} value={tab} className="rounded-xl capitalize">
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <div className="max-w-3xl">
                <h3 className="text-lg font-bold mb-3">Product Description</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
                <h3 className="text-lg font-bold mt-6 mb-3">Highlights</h3>
                <ul className="space-y-2">
                  {product.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <div className="max-w-2xl">
                <h3 className="text-lg font-bold mb-4">Technical Specifications</h3>
                <div className="divide-y divide-gray-200 dark:divide-gray-800">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex py-3">
                      <span className="w-48 text-sm font-medium text-gray-500">{key}</span>
                      <span className="text-sm font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="max-w-3xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold mb-1">Customer Reviews</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold">{product.avgRating}</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={cn("h-5 w-5", i < Math.floor(product.avgRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200")} />
                        ))}
                      </div>
                      <span className="text-gray-500">({product.reviewCount} reviews)</span>
                    </div>
                  </div>
                  <Button className="rounded-xl">Write a Review</Button>
                </div>
                <div className="space-y-4">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center text-white text-sm font-bold">
                            {review.user.name[0]}
                          </div>
                          <span className="font-semibold text-sm">{review.user.name}</span>
                        </div>
                        <span className="text-xs text-gray-400">{review.createdAt}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={cn("h-3.5 w-3.5", i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200")} />
                        ))}
                      </div>
                      <h4 className="font-semibold text-sm mb-1">{review.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{review.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="mt-6">
              <div className="max-w-2xl space-y-4">
                <h3 className="text-lg font-bold mb-3">Shipping & Returns</h3>
                {[
                  { icon: Truck, title: "Free Shipping", desc: "Free delivery on orders above ₹5,000. Fast shipping to all major cities." },
                  { icon: RefreshCw, title: "Easy Returns", desc: "7-day replacement guarantee for defective products. No questions asked." },
                  { icon: Shield, title: "Warranty", desc: "3-year manufacturer warranty. Free service at authorized centers pan India." },
            

                ].map((item) => (
                  <div key={item.title} className="flex gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-900">
                    <div className="h-10 w-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <h2 className="text-2xl font-extrabold mb-8">You May Also Like</h2>
          <div className="product-grid">
            {/* Related product placeholders */}
            {[1, 2, 3, 4].map((i) => (
              <ProductCard
                key={i}
                product={{
                  id: `related-${i}`,
                  name: ["HP Pavilion Laptop", "Lenovo ThinkPad", "ASUS Vivobook", "Acer Aspire"][i - 1] || "Related Product",
                  slug: `related-product-${i}`,
                  sku: `SKU-REL-${i}`,
                  basePrice: [52999, 120000, 89990, 45990][i - 1] || 49999,
                  salePrice: [47999, null, 84990, 42990][i - 1],
                  category: { name: "Laptops" },
                  brand: { name: ["HP", "Lenovo", "ASUS", "Acer"][i - 1] || "Dell" },
                  images: [{ url: "", alt: null }],
                  reviews: [{ rating: 4 }, { rating: 5 }],
                  stock: [15, 8, 20, 30][i - 1] || 10,
                  gstRate: 18,
                  isFeatured: false,
                  isNewArrival: i === 3,
                  isBestSeller: i === 1,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
