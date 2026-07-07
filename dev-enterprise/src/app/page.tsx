import { getProducts, getCategories, getTestimonials } from "@/lib/data"
import { HeroBanner } from "@/components/home/hero-banner"
import { CategoriesGrid } from "@/components/home/categories-grid"
import { FeaturedProducts } from "@/components/home/featured-products"
import { Testimonials } from "@/components/home/testimonials"
import { CTABanner } from "@/components/home/cta-banner"

export default async function HomePage() {
  const [products, categories, testimonials] = await Promise.all([
    getProducts({ featured: true, limit: 6 }),
    getCategories(),
    getTestimonials(),
  ])

  return (
    <>
      <HeroBanner />
      <CategoriesGrid categories={categories} />
      <FeaturedProducts products={products} />
      <CTABanner />
      <Testimonials data={testimonials} />
    </>
  )
}
