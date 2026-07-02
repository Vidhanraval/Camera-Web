import type { Metadata } from "next"
import Link from "next/link"
import { Monitor, Laptop, Printer, Camera, Router, HardDrive, Headphones, Cpu, Cable, Battery, SquareDashedMousePointer, ArrowRight } from "lucide-react"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { Card } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Product Categories",
  description: "Browse all product categories — Computers, Laptops, Printers, CCTV, Networking, Accessories & more at Dev Enterprise.",
}

const categoryGroups = [
  {
    title: "Computers & Laptops",
    icon: Monitor,
    items: [
      { name: "Desktop Computers", href: "/shop?category=desktop-computers", count: 120 },
      { name: "Gaming PCs", href: "/shop?category=gaming-pcs", count: 45 },
      { name: "Workstations", href: "/shop?category=workstations", count: 30 },
      { name: "All in One PCs", href: "/shop?category=aio-pcs", count: 25 },
      { name: "Laptops", href: "/shop?category=laptops", count: 85 },
    ],
  },
  {
    title: "Printers & Consumables",
    icon: Printer,
    items: [
      { name: "Inkjet Printers", href: "/shop?category=inkjet-printers", count: 35 },
      { name: "Laser Printers", href: "/shop?category=laser-printers", count: 28 },
      { name: "All-in-One Printers", href: "/shop?category=aio-printers", count: 20 },
      { name: "Printer Accessories", href: "/shop?category=printer-accessories", count: 60 },
      { name: "Cartridges & Toners", href: "/shop?category=cartridges", count: 80 },
    ],
  },
  {
    title: "CCTV & Security",
    icon: Camera,
    items: [
      { name: "CCTV Cameras", href: "/shop?category=cctv-cameras", count: 95 },
      { name: "IP Cameras", href: "/shop?category=ip-cameras", count: 50 },
      { name: "DVR Systems", href: "/shop?category=dvr", count: 30 },
      { name: "NVR Systems", href: "/shop?category=nvr", count: 25 },
      { name: "CCTV Accessories", href: "/shop?category=cctv-accessories", count: 70 },
    ],
  },
  {
    title: "Networking",
    icon: Router,
    items: [
      { name: "Routers", href: "/shop?category=routers", count: 40 },
      { name: "Mesh WiFi", href: "/shop?category=mesh-wifi", count: 15 },
      { name: "Access Points", href: "/shop?category=access-points", count: 20 },
      { name: "Switches", href: "/shop?category=switches", count: 35 },
      { name: "Network Cables", href: "/shop?category=cables", count: 50 },
    ],
  },
  {
    title: "Storage & Memory",
    icon: HardDrive,
    items: [
      { name: "SSD Drives", href: "/shop?category=ssd", count: 55 },
      { name: "Hard Disk Drives", href: "/shop?category=hdd", count: 40 },
      { name: "RAM Modules", href: "/shop?category=ram", count: 35 },
      { name: "USB Flash Drives", href: "/shop?category=usb-drives", count: 80 },
      { name: "Memory Cards", href: "/shop?category=memory-cards", count: 45 },
    ],
  },
  {
    title: "Accessories & Peripherals",
    icon: SquareDashedMousePointer,
    items: [
      { name: "Keyboard & Mouse", href: "/shop?category=keyboard-mouse", count: 120 },
      { name: "Monitors", href: "/shop?category=monitors", count: 50 },
      { name: "Speakers & Headphones", href: "/shop?category=audio", count: 60 },
      { name: "USB Hubs & Adapters", href: "/shop?category=usb-hubs", count: 40 },
      { name: "Cables & Connectors", href: "/shop?category=cables", count: 100 },
    ],
  },
  {
    title: "Components & Power",
    icon: Cpu,
    items: [
      { name: "SMPS / Power Supply", href: "/shop?category=smps", count: 25 },
      { name: "UPS Systems", href: "/shop?category=ups", count: 20 },
      { name: "Cabinets", href: "/shop?category=cabinets", count: 15 },
      { name: "Power Adapters", href: "/shop?category=power-adapters", count: 45 },
      { name: "Laptop Batteries", href: "/shop?category=laptop-batteries", count: 30 },
    ],
  },
]

export default function CategoriesPage() {
  return (
    <div className="bg-gray-50/50 dark:bg-gray-950/50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[{ label: "Categories" }]}
          className="mb-6"
        />

        <div className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-3">
            Product Categories
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl">
            Explore our complete range of technology products. From computers and laptops to CCTV cameras and networking equipment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {categoryGroups.map((group) => (
            <Card key={group.title} className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 flex items-center justify-center">
                  <group.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-lg font-bold">{group.title}</h2>
              </div>
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-150 text-sm group"
                    >
                      <span>{item.name}</span>
                      <span className="text-xs text-gray-400 group-hover:text-blue-400">{item.count} Items</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
