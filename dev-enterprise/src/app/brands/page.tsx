import type { Metadata } from "next"
import Link from "next/link"
import { ShieldCheck, ArrowRight, Star } from "lucide-react"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BRANDS } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Our Brands",
  description: "Authorized dealer for Dell, HP, Lenovo, ASUS, Canon, Brother, Epson, Samsung, LG and more top technology brands.",
}

const brandDetails: Record<string, { description: string; categories: string[] }> = {
  dell: { description: "World leader in enterprise and personal computing solutions.", categories: ["Desktop Computers", "Laptops", "Workstations", "Monitors"] },
  hp: { description: "Innovative printing, personal computing, and enterprise solutions.", categories: ["Laptops", "Printers", "Desktop Computers", "Monitors"] },
  lenovo: { description: "Global leader in business laptops, workstations, and innovative PCs.", categories: ["Laptops", "Workstations", "Desktop Computers", "Monitors"] },
  asus: { description: "Premium laptops, gaming hardware, networking, and PC components.", categories: ["Laptops", "Gaming PCs", "Routers", "Monitors"] },
  acer: { description: "Affordable computing solutions for home and business.", categories: ["Laptops", "Desktop Computers", "Monitors"] },
  canon: { description: "Industry-leading printers, cameras, and imaging solutions.", categories: ["Printers", "Printer Accessories", "Cameras"] },
  brother: { description: "Reliable printing and document solutions for business.", categories: ["Printers", "Printer Accessories"] },
  epson: { description: "Innovative printing and projection technology.", categories: ["Printers", "Printer Accessories", "Projectors"] },
  samsung: { description: "Premium electronics, storage, and display technology.", categories: ["SSD", "Monitors", "Memory Cards", "USB Drives"] },
  lg: { description: "Premium monitors, displays, and technology solutions.", categories: ["Monitors", "USB Drives"] },
  zebronics: { description: "Value-for-money computer peripherals and accessories.", categories: ["Keyboard", "Mouse", "Speaker", "Headphone", "Cabinets"] },
  finger: { description: "Affordable computer accessories and peripherals.", categories: ["Keyboard", "Mouse", "USB Hub", "Power Adapter"] },
}

export default function BrandsPage() {
  return (
    <div className="bg-gray-50/50 dark:bg-gray-950/50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "Brands" }]} className="mb-6" />

        <div className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-3">
            Our Brands
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl">
            We are an authorized dealer and partner for all major technology brands. Every product comes with manufacturer warranty and genuine support.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {BRANDS.map((brand) => {
            const detail = brandDetails[brand.slug] || { description: "Trusted technology brand available at Dev Enterprise.", categories: [] }
            return (
              <Link key={brand.slug} href={`/brands/${brand.slug}`}>
                <Card className="group p-6 h-full cursor-pointer hover:shadow-2xl hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center text-2xl font-bold text-gray-600 dark:text-gray-400 group-hover:from-blue-100 group-hover:to-blue-200 dark:group-hover:from-blue-900/40 dark:group-hover:to-blue-800/40 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 shrink-0">
                      {brand.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {brand.name}
                        </h3>
                        <ShieldCheck className="h-4 w-4 text-green-500" />
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
                        {detail.description}
                      </p>
                      {detail.categories.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {detail.categories.map((cat) => (
                            <span key={cat} className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-medium">
                              {cat}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center">
          <Star className="h-8 w-8 mx-auto mb-3 opacity-80" />
          <h3 className="text-xl font-bold mb-2">Looking for a specific brand or model?</h3>
          <p className="text-blue-100 mb-4">We can source any technology product from any major brand at competitive prices.</p>
          <Link href="/contact">
            <Button className="rounded-xl bg-white text-blue-700 hover:bg-blue-50">
              Contact Us <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
