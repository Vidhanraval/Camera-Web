import type { Metadata } from "next"
import { ShopContent } from "./shop-content"
import { SITE_CONFIG } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Shop — All Products",
  description: `Browse our complete range of computers, laptops, printers, CCTV cameras, networking equipment, and IT accessories at ${SITE_CONFIG.name}. Best wholesale & retail prices.`,
  openGraph: {
    title: "Shop All Products | Dev Enterprise",
    description: "Computers, Laptops, Printers, CCTV, Networking & IT Accessories",
  },
}

export default function ShopPage() {
  return <ShopContent />
}
