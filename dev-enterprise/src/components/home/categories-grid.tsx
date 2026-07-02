"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Monitor, Laptop, Printer, Camera, Router, HardDrive, Headphones, Cpu, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"

const categories = [
  { name: "Desktop Computers", icon: Monitor, href: "/categories/computers/desktop", count: "120+", color: "from-blue-500 to-blue-600", bg: "from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20" },
  { name: "Laptops", icon: Laptop, href: "/categories/laptops", count: "85+", color: "from-indigo-500 to-indigo-600", bg: "from-indigo-50 to-indigo-100 dark:from-indigo-950/40 dark:to-indigo-900/20" },
  { name: "Printers", icon: Printer, href: "/categories/printers", count: "60+", color: "from-purple-500 to-purple-600", bg: "from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/20" },
  { name: "CCTV Cameras", icon: Camera, href: "/categories/cctv-cameras", count: "95+", color: "from-red-500 to-red-600", bg: "from-red-50 to-red-100 dark:from-red-950/40 dark:to-red-900/20" },
  { name: "Networking", icon: Router, href: "/categories/networking", count: "70+", color: "from-cyan-500 to-cyan-600", bg: "from-cyan-50 to-cyan-100 dark:from-cyan-950/40 dark:to-cyan-900/20" },
  { name: "Storage", icon: HardDrive, href: "/categories/storage", count: "45+", color: "from-emerald-500 to-emerald-600", bg: "from-emerald-50 to-emerald-100 dark:from-emerald-950/40 dark:to-emerald-900/20" },
  { name: "Accessories", icon: Headphones, href: "/categories/accessories", count: "200+", color: "from-orange-500 to-orange-600", bg: "from-orange-50 to-orange-100 dark:from-orange-950/40 dark:to-orange-900/20" },
  { name: "Components", icon: Cpu, href: "/categories/components", count: "150+", color: "from-teal-500 to-teal-600", bg: "from-teal-50 to-teal-100 dark:from-teal-950/40 dark:to-teal-900/20" },
]

export function CategoriesGrid() {
  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3"
          >
            Product Categories
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-4"
          >
            Explore Our Product Range
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            From computers and laptops to CCTV cameras and networking — we have everything for your tech needs.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={cat.href}>
                <Card className="group p-6 lg:p-8 h-full cursor-pointer hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300">
                  <div className={`inline-flex h-14 w-14 rounded-2xl bg-gradient-to-br ${cat.bg} items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <cat.icon className={`h-7 w-7 bg-gradient-to-br ${cat.color} bg-clip-text text-transparent`} />
                  </div>
                  <h3 className="font-semibold text-base lg:text-lg mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{cat.count} Products</p>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/categories"
            className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            View All Categories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
