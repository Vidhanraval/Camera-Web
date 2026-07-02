import type { Metadata } from "next"
import Link from "next/link"
import { ShieldCheck, ArrowRight } from "lucide-react"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BRANDS } from "@/lib/constants"

interface BrandPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BrandPageProps): Promise<Metadata> {
  const { slug } = await params
  const brand = BRANDS.find((b) => b.slug === slug)
  return {
    title: brand ? `${brand.name} Products` : "Brand",
    description: brand ? `Buy genuine ${brand.name} products at best prices with warranty from Dev Enterprise. Authorized ${brand.name} dealer in India.` : "Brand products",
  }
}

const brandDetails: Record<string, { description: string; categories: string[]; featured: boolean; yearFounded: string }> = {
  dell: { description: "Dell Technologies is a global leader in enterprise and personal computing, offering innovative laptops, desktops, workstations, monitors, and IT infrastructure solutions trusted by businesses and consumers worldwide.", categories: ["Desktop Computers", "Laptops", "Workstations", "Monitors"], featured: true, yearFounded: "1984" },
  hp: { description: "HP Inc. is a world leader in personal computing, printing, and 3D printing solutions. Known for reliable business laptops, powerful workstations, and industry-leading printers for home and enterprise.", categories: ["Laptops", "Printers", "Desktop Computers", "Monitors"], featured: true, yearFounded: "1939" },
  lenovo: { description: "Lenovo is the world's largest PC manufacturer, renowned for the legendary ThinkPad series, innovative Yoga laptops, and enterprise workstations that combine performance with legendary reliability.", categories: ["Laptops", "Workstations", "Desktop Computers", "Monitors"], featured: true, yearFounded: "1984" },
  asus: { description: "ASUS is a Taiwan-based multinational known for premium laptops, Republic of Gamers (ROG) gaming hardware, networking equipment, and cutting-edge PC components for enthusiasts and professionals.", categories: ["Laptops", "Gaming PCs", "Routers", "Monitors"], featured: true, yearFounded: "1989" },
  acer: { description: "Acer offers affordable and reliable computing solutions for home, education, and business. Known for value-for-money laptops, desktops, monitors, and gaming products under the Predator brand.", categories: ["Laptops", "Desktop Computers", "Monitors"], featured: false, yearFounded: "1976" },
  canon: { description: "Canon is a global leader in imaging and optical products, renowned for their high-quality printers, cameras, and professional printing solutions for homes, offices, and creative professionals.", categories: ["Printers", "Printer Accessories"], featured: true, yearFounded: "1937" },
  brother: { description: "Brother Industries is a Japanese multinational known for reliable printers, multi-function devices, and sewing machines. Their laser printers are particularly popular for business use.", categories: ["Printers", "Printer Accessories"], featured: false, yearFounded: "1908" },
  epson: { description: "Epson is a global technology leader in printing, visual communications, and wearable technology. Known for innovative EcoTank printers with ultra-low running costs.", categories: ["Printers", "Printer Accessories"], featured: true, yearFounded: "1942" },
  samsung: { description: "Samsung Electronics is a global technology powerhouse known for premium SSDs, memory solutions, monitors, and cutting-edge consumer electronics with industry-leading reliability.", categories: ["SSD", "Monitors", "Memory Cards", "USB Drives"], featured: true, yearFounded: "1938" },
  lg: { description: "LG Electronics is a global innovator in consumer electronics, known for premium monitors, displays, and technology solutions that combine style with performance.", categories: ["Monitors", "USB Drives"], featured: false, yearFounded: "1958" },
  zebronics: { description: "Zebronics is India's leading brand for computer peripherals, audio products, and gaming accessories — offering excellent value-for-money products for Indian consumers.", categories: ["Keyboard", "Mouse", "Speaker", "Headphone", "Cabinets"], featured: true, yearFounded: "1997" },
  finger: { description: "Finger is a trusted Indian brand for affordable computer accessories and peripherals, providing reliable products at competitive prices for the Indian market.", categories: ["Keyboard", "Mouse", "USB Hub", "Power Adapter"], featured: false, yearFounded: "2000" },
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { slug } = await params
  const brand = BRANDS.find((b) => b.slug === slug)

  if (!brand) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-3">Brand Not Found</h1>
        <Link href="/brands"><Button className="rounded-xl">View All Brands</Button></Link>
      </div>
    )
  }

  const detail = brandDetails[slug] || {
    description: `${brand.name} is a trusted technology brand available at Dev Enterprise.`,
    categories: [],
    featured: false,
    yearFounded: "N/A",
  }

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "Brands", href: "/brands" }, { label: brand.name }]} className="mb-6" />

        <div className="max-w-4xl mx-auto">
          {/* Brand Header */}
          <div className="text-center mb-12">
            <div className="h-24 w-24 mx-auto rounded-3xl bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-900/40 dark:to-indigo-900/40 flex items-center justify-center text-4xl font-bold text-blue-600 dark:text-blue-400 mb-6">
              {brand.name[0]}
            </div>
            <div className="flex items-center justify-center gap-3 mb-3">
              <h1 className="text-3xl lg:text-4xl font-extrabold">{brand.name}</h1>
              <ShieldCheck className="h-6 w-6 text-green-500" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              {detail.description}
            </p>
            <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-500">
              <span>Est. {detail.yearFounded}</span>
              <span>•</span>
              <span>Authorized Dealer</span>
              <span>•</span>
              <span>Manufacturer Warranty</span>
            </div>
          </div>

          {/* Categories */}
          {detail.categories.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-bold mb-4 text-center">Categories</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {detail.categories.map((cat) => (
                  <Link key={cat} href={`/shop?category=${cat.toLowerCase().replace(/ /g, "-")}&brand=${slug}`}>
                    <Card className="px-5 py-3 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 cursor-pointer text-sm font-semibold">
                      {cat}
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="text-center">
            <Link href={`/shop?brand=${slug}`}>
              <Button size="lg" className="rounded-xl">
                Shop All {brand.name} Products <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
