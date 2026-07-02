import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number | string, currency = "₹") {
  const num = typeof price === "string" ? parseFloat(price) : price
  return `${currency}${num.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export function formatCompactPrice(price: number | string, currency = "₹") {
  const num = typeof price === "string" ? parseFloat(price) : price
  if (num >= 100000) {
    return `${currency}${(num / 100000).toFixed(2)}L`
  }
  if (num >= 1000) {
    return `${currency}${(num / 1000).toFixed(2)}K`
  }
  return `${currency}${num.toFixed(2)}`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export function generateSKU(category: string, brand: string, id: string): string {
  const cat = category.substring(0, 3).toUpperCase()
  const brd = brand.substring(0, 3).toUpperCase()
  const uid = id.substring(0, 6).toUpperCase()
  return `${cat}-${brd}-${uid}`
}

export function generateOrderNumber(): string {
  const now = new Date()
  const y = now.getFullYear().toString().slice(-2)
  const m = (now.getMonth() + 1).toString().padStart(2, "0")
  const d = now.getDate().toString().padStart(2, "0")
  const rand = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")
  return `NV${y}${m}${d}-${rand}`
}

export function calculateGST(
  amount: number,
  gstRate: number
): { gstAmount: number; total: number } {
  const gstAmount = amount * (gstRate / 100)
  return { gstAmount: Math.round(gstAmount * 100) / 100, total: amount + gstAmount }
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + "..."
}

export function getDiscountPercent(
  basePrice: number,
  salePrice: number
): number {
  if (!salePrice || salePrice >= basePrice) return 0
  return Math.round(((basePrice - salePrice) / basePrice) * 100)
}

export function getAverageRating(reviews: { rating: number }[]): number {
  if (!reviews.length) return 0
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0)
  return Math.round((sum / reviews.length) * 10) / 10
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

export const IMAGE_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' fill='%23f1f5f9'%3E%3Crect width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8' font-size='18'%3EProduct Image%3C/text%3E%3C/svg%3E"
