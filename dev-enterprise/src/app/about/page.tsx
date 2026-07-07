import type { Metadata } from "next"
import Link from "next/link"
import { Shield, Truck, Award, Users, Star, Sparkles } from "lucide-react"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { SITE_CONFIG } from "@/lib/constants"

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${SITE_CONFIG.name} — your trusted technology partner for computers, laptops, printers, CCTV, networking, and IT accessories.`,
}

const stats = [
  { label: "Years Experience", value: "10+" },
  { label: "Happy Customers", value: "5000+" },
  { label: "Products", value: "1000+" },
  { label: "Brands", value: "12+" },
]

const values = [
  { icon: Shield, title: "Genuine Products", desc: "Every product is 100% authentic with manufacturer warranty. We never sell counterfeit or refurbished goods." },
  { icon: Award, title: "Best Pricing", desc: "Wholesale relationships allow us to offer competitive prices for both bulk orders and individual purchases." },
  { icon: Users, title: "Customer First", desc: "Our team provides expert pre-sales consultation and dedicated after-sales support for every customer." },
  { icon: Truck, title: "Fast Delivery", desc: "Pan-India shipping with reliable logistics partners. Free delivery on orders above ₹5,000." },
]

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "About" }]} className="mb-8" />

        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight mb-4">About {SITE_CONFIG.name}</h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
            Your trusted technology partner — providing computers, laptops, printers, CCTV cameras, networking equipment, and IT accessories at wholesale and retail prices across India.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-6 text-center">
              <p className="text-3xl font-extrabold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Story */}
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-2xl font-extrabold mb-4">Our Story</h2>
          <div className="prose prose-gray dark:prose-invert max-w-none space-y-4 text-gray-600 dark:text-gray-400">
            <p>
              Founded with a vision to bridge the gap between technology and accessibility, {SITE_CONFIG.name} has grown from a small computer shop to a comprehensive IT solutions provider serving customers across India.
            </p>
            <p>
              We are an authorized dealer for all major technology brands including Dell, HP, Lenovo, ASUS, Canon, Brother, Epson, Samsung, and LG. Our deep relationships with manufacturers allow us to offer genuine products at competitive prices — whether you&apos;re buying a single laptop or equipping an entire office.
            </p>
            <p>
              What sets us apart is our commitment to customer satisfaction. We don&apos;t just sell products — we provide solutions. Our team of technology experts helps you choose the right equipment for your needs, and our after-sales support ensures you get the most out of your investment.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-2xl font-extrabold text-center mb-10">Why Choose Us</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <Card key={v.title} className="p-6 text-center group hover:shadow-xl hover:border-amber-200 dark:hover:border-amber-800 transition-all duration-300">
                <div className="h-14 w-14 mx-auto rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/40 dark:to-amber-800/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <v.icon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="font-bold mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{v.desc}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center p-12 rounded-3xl bg-gradient-to-r from-amber-600 to-orange-600 text-white mb-8">
          <Sparkles className="h-10 w-10 mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl font-extrabold mb-3">Ready to Get Started?</h2>
          <p className="text-amber-100 mb-6 max-w-md mx-auto">
            Browse our products, request a quote, or contact us for expert advice on your technology needs.
          </p>
          <div className="flex justify-center gap-3">
            <Link href="/shop"><Button className="rounded-xl bg-white text-amber-700 hover:bg-amber-50">Shop Now</Button></Link>
            <Link href="/contact"><Button variant="outline" className="rounded-xl border-white/30 text-white hover:bg-white/10">Contact Us</Button></Link>
          </div>
        </div>
      </div>
    </div>
  )
}
