import { HeroBanner } from "@/components/home/hero-banner"
import { CategoriesGrid } from "@/components/home/categories-grid"
import { FeaturedProducts } from "@/components/home/featured-products"
import { Testimonials } from "@/components/home/testimonials"
import { CTABanner } from "@/components/home/cta-banner"

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <CategoriesGrid />
      <FeaturedProducts />
      <CTABanner />
      <Testimonials />
    </>
  )
}
