import type { Metadata } from "next"
import { ProductDetailContent } from "./product-detail-content"

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  return {
    title: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    description: `Buy ${slug.replace(/-/g, " ")} at best price from Dev Enterprise. Authorized dealer with warranty and fast delivery.`,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  return <ProductDetailContent slug={slug} />
}
