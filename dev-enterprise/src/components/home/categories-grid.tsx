"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Monitor, Laptop, Printer, Camera, Router, HardDrive, Headphones, Cpu, ArrowRight, ShieldCheck } from "lucide-react"
import { BRANDS } from "@/lib/constants"

const categories = [
  { name: "Desktop Computers", icon: Monitor, href: "/categories/computers/desktop", count: "120+", gradient: "from-amber-500 to-orange-500", bgLight: "from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20" },
  { name: "Laptops", icon: Laptop, href: "/categories/laptops", count: "85+", gradient: "from-blue-500 to-cyan-500", bgLight: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/20" },
  { name: "Printers", icon: Printer, href: "/categories/printers", count: "60+", gradient: "from-purple-500 to-pink-500", bgLight: "from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/20" },
  { name: "CCTV Cameras", icon: Camera, href: "/categories/cctv-cameras", count: "95+", gradient: "from-red-500 to-rose-500", bgLight: "from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/20" },
  { name: "Networking", icon: Router, href: "/categories/networking", count: "70+", gradient: "from-emerald-500 to-teal-500", bgLight: "from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20" },
  { name: "Storage", icon: HardDrive, href: "/categories/storage", count: "45+", gradient: "from-sky-500 to-indigo-500", bgLight: "from-sky-50 to-indigo-50 dark:from-sky-950/30 dark:to-indigo-950/20" },
  { name: "Accessories", icon: Headphones, href: "/categories/accessories", count: "200+", gradient: "from-violet-500 to-purple-500", bgLight: "from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/20" },
  { name: "Components", icon: Cpu, href: "/categories/components", count: "150+", gradient: "from-rose-500 to-pink-500", bgLight: "from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/20" },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
}

export function CategoriesGrid() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50/50 dark:bg-gray-950/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl lg:text-5xl font-black tracking-tight mb-4">
            What We{" "}
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Offer</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
            Everything your business needs — from computers to security systems
          </p>
        </motion.div>

        {/* Category Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5"
        >
          {categories.map((cat) => (
            <motion.div key={cat.name} variants={item}>
              <Link href={cat.href}>
                <div className="group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 lg:p-8 h-full cursor-pointer hover:shadow-2xl hover:border-transparent transition-all duration-500 hover:-translate-y-1">
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.bgLight} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`inline-flex h-16 w-16 rounded-2xl bg-gradient-to-br ${cat.bgLight} items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500`}>
                      <cat.icon className={`h-8 w-8 bg-gradient-to-br ${cat.gradient} bg-clip-text text-transparent`} />
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-base lg:text-lg mb-2 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                      {cat.name}
                    </h3>

                    {/* Count & Arrow */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{cat.count} Products</span>
                      <span className={`inline-flex h-8 w-8 rounded-full bg-gradient-to-br ${cat.gradient} items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0`}>
                        <ArrowRight className="h-4 w-4 text-white" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Brand Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 pt-12 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="flex items-center justify-center gap-2 mb-8">
            <ShieldCheck className="h-5 w-5 text-green-500" />
            <span className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
              Authorized Dealer
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {BRANDS.map((brand) => (
              <Link
                key={brand.slug}
                href={`/brands/${brand.slug}`}
                className="text-base font-semibold text-gray-400 dark:text-gray-500 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-300 hover:scale-110"
              >
                {brand.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
