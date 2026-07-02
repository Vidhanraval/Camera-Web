import { HeroBanner } from "@/components/home/hero-banner"
import { CategoriesGrid } from "@/components/home/categories-grid"
import { FeaturedProducts } from "@/components/home/featured-products"
import { BrandsShowcase } from "@/components/home/brands-showcase"
import { Testimonials } from "@/components/home/testimonials"
import { TrustBadges } from "@/components/home/trust-badges"

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <CategoriesGrid />
      <FeaturedProducts />
      <BrandsShowcase />
      <TrustBadges />
      <Testimonials />
    </>
  )
}
