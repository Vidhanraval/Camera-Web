import type { Product, ProductImage, ProductVariant, Review, Category, Brand, Order, OrderItem, Address, Coupon } from "@prisma/client"

export type ProductWithRelations = Product & {
  category: Category
  brand: Brand | null
  images: ProductImage[]
  variants: ProductVariant[]
  reviews: (Review & { user: { name: string | null; image: string | null } })[]
}

export type CartProductType = {
  id: string
  name: string
  slug: string
  sku: string
  price: number
  salePrice: number | null
  image: string
  stock: number
  category: string
  brand: string | null
  gstRate: number
}

export type OrderWithRelations = Order & {
  items: (OrderItem & { product: { slug: string } })[]
  address: Address | null
  user: { name: string | null; email: string }
}

export interface SearchFilters {
  query?: string
  category?: string
  brand?: string
  minPrice?: number
  maxPrice?: number
  sort?: string
  page?: number
  limit?: number
}

export interface PaginatedResult<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface StatsData {
  totalOrders: number
  totalRevenue: number
  totalCustomers: number
  totalProducts: number
  revenueByMonth: { month: string; revenue: number }[]
  ordersByStatus: { status: string; count: number }[]
  topProducts: { name: string; sales: number; revenue: number }[]
}

export interface BreadcrumbItem {
  label: string
  href?: string
}
