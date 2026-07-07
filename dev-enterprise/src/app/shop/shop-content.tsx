"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Grid3X3, List, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductFilters } from "@/components/shop/product-filters"
import { ProductCard } from "@/components/shop/product-card"
import { ProductCardSkeleton } from "@/components/shared/product-skeleton"
import { SORT_OPTIONS } from "@/lib/constants"
import { formatPrice } from "@/lib/utils"
import { useCartStore } from "@/lib/store/cart-store"
import { toast } from "sonner"
import type { ProductListItem } from "@/lib/data"

// Map ProductListItem to ProductCard-compatible shape
function toCardProduct(p: ProductListItem) {
  return {
    id: p.id, name: p.name, slug: p.slug, sku: p.sku,
    basePrice: p.price, salePrice: p.salePrice,
    category: { name: p.category },
    brand: { name: p.brand },
    images: [{ url: p.image, alt: p.name }],
    reviews: Array.from({ length: Math.min(p.reviews, 3) }, () => ({ rating: p.rating })),
    stock: p.stock, gstRate: p.gstRate,
    isBestSeller: p.badges.includes("Best Seller"),
    isFeatured: true,
    isNewArrival: p.badges.includes("New"),
  }
}

export function ShopContent({ initialProducts }: { initialProducts: ProductListItem[] }) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("new")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading] = useState(false)

  const products = useMemo(() => initialProducts.map(toCardProduct), [initialProducts])

  const sortedProducts = useMemo(() => {
    let sorted = [...products]
    if (sortBy === "price_asc") sorted.sort((a, b) => (a.salePrice || a.basePrice) - (b.salePrice || b.basePrice))
    else if (sortBy === "price_desc") sorted.sort((a, b) => (b.salePrice || b.basePrice) - (a.salePrice || a.basePrice))
    else if (sortBy === "popular") sorted.sort((a, b) => b.reviews.length - a.reviews.length)
    else if (sortBy === "bestseller") sorted = sorted.filter(p => p.isBestSeller).concat(sorted.filter(p => !p.isBestSeller))
    if (searchQuery) sorted = sorted.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    return sorted
  }, [products, sortBy, searchQuery])

  return (
    <div className="bg-gray-50/50 dark:bg-gray-950/50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl lg:text-4xl font-extrabold tracking-tight mb-2">All Products</motion.h1>
          <p className="text-gray-500 dark:text-gray-400">Browse {products.length}+ products across all categories</p>
        </div>

        <div className="flex gap-8">
          <aside className="hidden lg:block w-72 shrink-0"><ProductFilters /></aside>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-6 bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-200/60 dark:border-gray-800/60">
              <div className="w-full sm:w-auto flex-1 max-w-xs">
                <Input placeholder="Search products..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="h-10 rounded-xl" />
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="lg:hidden"><ProductFilters /></div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-10 w-[160px] rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent>{SORT_OPTIONS.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                </Select>
                <div className="hidden sm:flex items-center border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                  <Button variant={viewMode==="grid"?"default":"ghost"} size="icon" className="h-9 w-9 rounded-none" onClick={()=>setViewMode("grid")}><Grid3X3 className="h-4 w-4"/></Button>
                  <Button variant={viewMode==="list"?"default":"ghost"} size="icon" className="h-9 w-9 rounded-none" onClick={()=>setViewMode("list")}><List className="h-4 w-4"/></Button>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Showing <span className="font-semibold text-gray-700 dark:text-gray-300">{sortedProducts.length}</span> products</p>

            <div className={viewMode==="grid"?"product-grid":"space-y-4"}>
              {loading
                ? Array.from({length:8}).map((_,i)=><ProductCardSkeleton key={i}/>)
                : sortedProducts.map((p,i)=>(
                    <motion.div key={p.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.03}}>
                      {viewMode==="grid"
                        ? <ProductCard product={p}/>
                        : <ProductListItem product={p}/>
                      }
                    </motion.div>
                  ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductListItem({ product }: { product: ReturnType<typeof toCardProduct> }) {
  const addToCart = useCartStore(s => s.addItem)
  const price = product.basePrice
  const sp = product.salePrice
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center hover:shadow-lg transition-all duration-300">
      <div className="w-24 h-24 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.images[0]?.url||"/images/products/placeholder.jpg"} alt={product.name} className="w-full h-full object-cover"/>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500 mb-1">{product.brand?.name} • {product.category.name}</p>
        <h3 className="font-semibold text-sm mb-1 truncate">{product.name}</h3>
        <div className="flex items-center gap-2">
          <span className="font-bold text-amber-700 dark:text-amber-400">{formatPrice(sp||price)}</span>
          {sp && <span className="text-sm text-gray-400 line-through">{formatPrice(price)}</span>}
        </div>
      </div>
      <Button size="sm" className="rounded-xl shrink-0" onClick={()=>{
        addToCart({id:product.id,name:product.name,slug:product.slug,sku:product.sku,price,salePrice:sp,image:product.images[0]?.url||"",stock:product.stock,category:product.category.name,brand:product.brand?.name||null,gstRate:product.gstRate})
        toast.success("Added to cart")
      }}><ShoppingCart className="h-4 w-4 mr-2"/>Add to Cart</Button>
    </div>
  )
}
