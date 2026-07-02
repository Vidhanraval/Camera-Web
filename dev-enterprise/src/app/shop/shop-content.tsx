"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Grid3X3, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ProductFilters } from "@/components/shop/product-filters"
import { ProductCard } from "@/components/shop/product-card"
import { ProductCardSkeleton } from "@/components/shared/product-skeleton"
import { SORT_OPTIONS } from "@/lib/constants"
import type { ProductWithRelations } from "@/lib/types"
import { ShoppingCart } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import { useCartStore } from "@/lib/store/cart-store"
import { toast } from "sonner"

// Sample products for static/demo display
const products: ProductCardProps["product"][] = Array.from({ length: 24 }, (_, i) => ({
  id: `prod-${i + 1}`,
  name: [
    "Dell Inspiron 15 Laptop 12th Gen i5",
    "HP Pavilion Desktop PC i7 16GB RAM",
    "Lenovo ThinkPad X1 Carbon Gen 11",
    "ASUS ROG Gaming Laptop RTX 4060",
    "Canon PIXMA G3010 All-in-One Printer",
    "Brother DCP-L2541DW Laser Printer",
    "Hikvision 4MP IP Bullet Camera",
    "CP Plus 2MP Dome CCTV Camera",
    "TP-Link Archer AX73 WiFi 6 Router",
    "D-Link 24-Port Gigabit Switch",
    "Samsung 970 EVO Plus 1TB NVMe SSD",
    "WD Blue 2TB Desktop HDD",
    "Corsair Vengeance 16GB DDR4 RAM",
    "APC 1100VA UPS Backup",
    "Logitech Wireless Keyboard Mouse Combo",
    "Zebronics USB Hub 4-Port",
    "Dell 65W Laptop Power Adapter",
    "HP 15.6-inch Laptop Battery",
    "AmazonBasics HDMI Cable 2m",
    "D-Link Cat6 Ethernet Cable 5m",
    "RJ45 Connector Pack of 100",
    "BNC Connector for CCTV",
    "Wireless HDMI Extender Kit",
    "USB 3.0 to Gigabit LAN Adapter",
  ][i] || `Product ${i + 1}`,
  slug: `product-${i + 1}`,
  sku: `SKU-${1000 + i}`,
  basePrice: [45990, 52999, 120000, 89990, 8000, 15999, 4500, 2200, 4999, 7999, 8999, 5499, 3499, 4200, 1499, 499, 1599, 2499, 399, 299, 199, 99, 2499, 799][i] || 9999,
  salePrice: [39990, 47999, null, 84990, 7499, 14999, 3499, 1999, null, 6999, 7499, null, 3199, null, 1299, 399, null, 2199, 349, 249, null, 79, 1999, 699][i],
  category: { name: ["Laptops", "Desktop Computers", "Laptops", "Gaming PCs", "Printers", "Printers", "CCTV Cameras", "CCTV Cameras", "Routers", "Switches", "SSD", "HDD", "RAM", "UPS", "Keyboard", "USB Hub", "Power Adapter", "Laptop Battery", "HDMI Cable", "Cat6 Cable", "RJ45", "BNC", "Wireless HDMI", "USB to LAN"][i] || "Accessories" },
  brand: { name: ["Dell", "HP", "Lenovo", "ASUS", "Canon", "Brother", "Hikvision", "CP Plus", "TP-Link", "D-Link", "Samsung", "WD", "Corsair", "APC", "Logitech", "Zebronics", "Dell", "HP", "AmazonBasics", "D-Link", "Generic", "Generic", "Generic", "Generic"][i] || "Generic" },
  images: [
      [{ url: "/images/products/dell-inspiron.jpg", alt: "Dell Inspiron 15 Laptop" }],
      [{ url: "/images/products/hp-workstation.jpg", alt: "HP Pavilion Desktop PC" }],
      [{ url: "/images/products/lenovo-thinkpad.jpg", alt: "Lenovo ThinkPad X1 Carbon" }],
      [{ url: "/images/products/asus-vivobook.jpg", alt: "ASUS ROG Gaming Laptop" }],
      [{ url: "/images/products/epson-ecotank.jpg", alt: "Canon PIXMA Printer" }],
      [{ url: "/images/products/brother-printer.jpg", alt: "Brother Laser Printer" }],
      [{ url: "/images/products/hikvision-ip.jpg", alt: "Hikvision IP Camera" }],
      [{ url: "/images/products/camera-cp-plus.jpg", alt: "CP Plus CCTV Camera" }],
      [{ url: "/images/products/tp-link-router.jpg", alt: "TP-Link Router" }],
      [{ url: "/images/products/dlink-switch.jpg", alt: "D-Link Switch" }],
      [{ url: "/images/products/samsung-ssd.jpg", alt: "Samsung SSD" }],
      [{ url: "/images/products/samsung-ssd.jpg", alt: "WD Blue HDD" }],
      [{ url: "/images/products/ram-corsair.jpg", alt: "Corsair RAM" }],
      [{ url: "/images/products/samsung-ups.jpg", alt: "APC UPS" }],
      [{ url: "/images/products/zebronics-km.jpg", alt: "Keyboard Mouse Combo" }],
      [{ url: "/images/products/zebronics-km.jpg", alt: "Zebronics USB Hub" }],
      [{ url: "/images/products/dell-optiplex.jpg", alt: "Dell Power Adapter" }],
      [{ url: "/images/products/hp-elitebook.jpg", alt: "HP Laptop Battery" }],
      [{ url: "/images/products/cable-cat6.jpg", alt: "HDMI Cable" }],
      [{ url: "/images/products/cable-cat6.jpg", alt: "Cat6 Ethernet Cable" }],
      [{ url: "/images/products/cable-cat6.jpg", alt: "RJ45 Connector" }],
      [{ url: "/images/products/camera-cp-plus.jpg", alt: "BNC Connector" }],
      [{ url: "/images/products/asus-motherboard.jpg", alt: "Wireless HDMI Extender" }],
      [{ url: "/images/products/dlink-switch.jpg", alt: "USB LAN Adapter" }],
    ][i] || [{ url: "/images/products/placeholder.jpg", alt: "Product" }],
  reviews: [{ rating: 4 }, { rating: 5 }, { rating: 4 }],
  stock: [25, 15, 10, 8, 50, 30, 100, 80, 20, 40, 60, 45, 35, 25, 200, 150, 30, 10, 500, 300, 200, 100, 15, 40][i],
  gstRate: 18,
  isFeatured: i < 6,
  isNewArrival: i >= 6 && i < 10,
  isBestSeller: i < 5,
}))

interface ProductCardProps {
  product: {
    id: string
    name: string
    slug: string
    sku: string
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

export function ShopContent() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("new")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading] = useState(false)

  const sortedProducts = useMemo(() => {
    let sorted = [...products]
    if (sortBy === "price_asc") sorted.sort((a, b) => (a.salePrice || a.basePrice) - (b.salePrice || b.basePrice))
    if (sortBy === "price_desc") sorted.sort((a, b) => (b.salePrice || b.basePrice) - (a.salePrice || a.basePrice))
    if (sortBy === "popular") sorted.sort((a, b) => b.reviews.length - a.reviews.length)
    if (sortBy === "bestseller") sorted = sorted.filter((p) => p.isBestSeller).concat(sorted.filter((p) => !p.isBestSeller))
    if (searchQuery) sorted = sorted.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    return sorted
  }, [products, sortBy, searchQuery])

  return (
    <div className="bg-gray-50/50 dark:bg-gray-950/50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-2"
          >
            All Products
          </motion.h1>
          <p className="text-gray-500 dark:text-gray-400">
            Browse {products.length}+ products across all categories
          </p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block w-72 shrink-0">
            <ProductFilters />
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-6 bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-200/60 dark:border-gray-800/60">
              {/* Search */}
              <div className="w-full sm:w-auto flex-1 max-w-xs">
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 rounded-xl"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {/* Mobile Filters */}
                <div className="lg:hidden">
                  <ProductFilters />
                </div>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-10 w-[160px] rounded-xl">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* View Toggle */}
                <div className="hidden sm:flex items-center border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    className="h-9 w-9 rounded-none"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    className="h-9 w-9 rounded-none"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Showing <span className="font-semibold text-gray-700 dark:text-gray-300">{sortedProducts.length}</span> products
            </p>

            {/* Products Grid */}
            {loading ? (
              <div className={viewMode === "grid" ? "product-grid" : "space-y-4"}>
                {Array.from({ length: 12 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className={viewMode === "grid" ? "product-grid" : "space-y-4"}>
                {sortedProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    {viewMode === "grid" ? (
                      <ProductCard product={product} />
                    ) : (
                      <ProductListItem product={product} />
                    )}
                  </motion.div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="mt-12 flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((page) => (
                <Button
                  key={page}
                  variant={page === 1 ? "default" : "outline"}
                  size="icon"
                  className="h-10 w-10 rounded-xl"
                >
                  {page}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductListItem({ product }: ProductCardProps) {
  const addToCart = useCartStore((s) => s.addItem)
  const price = product.basePrice
  const salePrice = product.salePrice

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 p-4 flex gap-4 items-center hover:shadow-lg transition-all duration-300">
      <div className="w-24 h-24 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
        <span className="text-sm font-bold text-gray-400">{product.brand?.name}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500 mb-1">{product.brand?.name} • {product.category.name}</p>
        <h3 className="font-semibold text-sm mb-1 truncate">{product.name}</h3>
        <div className="flex items-center gap-2">
          <span className="font-bold text-blue-700 dark:text-blue-400">{formatPrice(salePrice || price)}</span>
          {salePrice && <span className="text-sm text-gray-400 line-through">{formatPrice(price)}</span>}
        </div>
      </div>
      <Button
        size="sm"
        className="rounded-xl shrink-0"
        onClick={() => {
          addToCart({
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
          })
          toast.success("Added to cart")
        }}
      >
        <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
      </Button>
    </div>
  )
}

