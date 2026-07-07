import type { Metadata } from "next"
import { getProducts } from "@/lib/data"
import { ShopContent } from "./shop-content"
import { SITE_CONFIG } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Shop — All Products",
  description: `Browse our complete range of computers, laptops, printers, CCTV cameras, networking equipment, and IT accessories at ${SITE_CONFIG.name}. Best wholesale & retail prices.`,
}

export default async function ShopPage() {
  const products = await getProducts({ limit: 24 })
  return <ShopContent initialProducts={products} />
}
