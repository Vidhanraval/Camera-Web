"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Monitor, Laptop, Printer, Camera, Router, HardDrive, Headphones, Cpu, ArrowRight, ShieldCheck } from "lucide-react"
import { BRANDS } from "@/lib/constants"

const categories = [
  { name: "Desktop Computers", desc: "Gaming, workstation, all-in-one PCs", icon: Monitor, href: "/categories/computers/desktop", accent: "border-l-amber-500", iconBg: "bg-amber-50 dark:bg-amber-950/30", iconColor: "text-amber-600" },
  { name: "Laptops", desc: "Business, gaming, student laptops", icon: Laptop, href: "/categories/laptops", accent: "border-l-blue-500", iconBg: "bg-blue-50 dark:bg-blue-950/30", iconColor: "text-blue-600" },
  { name: "Printers & Scanners", desc: "Laser, inkjet, all-in-one", icon: Printer, href: "/categories/printers", accent: "border-l-purple-500", iconBg: "bg-purple-50 dark:bg-purple-950/30", iconColor: "text-purple-600" },
  { name: "CCTV & Security", desc: "IP cameras, DVR, full setup", icon: Camera, href: "/categories/cctv-cameras", accent: "border-l-red-500", iconBg: "bg-red-50 dark:bg-red-950/30", iconColor: "text-red-600" },
  { name: "Networking", desc: "Routers, switches, mesh WiFi", icon: Router, href: "/categories/networking", accent: "border-l-emerald-500", iconBg: "bg-emerald-50 dark:bg-emerald-950/30", iconColor: "text-emerald-600" },
  { name: "Storage & Memory", desc: "SSD, HDD, RAM upgrades", icon: HardDrive, href: "/categories/storage", accent: "border-l-cyan-500", iconBg: "bg-cyan-50 dark:bg-cyan-950/30", iconColor: "text-cyan-600" },
  { name: "Accessories", desc: "Keyboard, mouse, webcams, cables", icon: Headphones, href: "/categories/accessories", accent: "border-l-orange-500", iconBg: "bg-orange-50 dark:bg-orange-950/30", iconColor: "text-orange-600" },
  { name: "Components", desc: "Motherboard, PSU, UPS, cabinets", icon: Cpu, href: "/categories/components", accent: "border-l-rose-500", iconBg: "bg-rose-50 dark:bg-rose-950/30", iconColor: "text-rose-600" },
]

export function CategoriesGrid() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50/50 dark:bg-gray-950/50">
      <div className="container mx-auto px-4">
        {/* Header — clean & minimal */}
        <div className="mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-3"
          >
            &mdash; Our Range
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl lg:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4"
          >
            Everything tech,{" "}
            <span className="text-amber-600 dark:text-amber-400">under one roof</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-gray-500 dark:text-gray-400 max-w-xl"
          >
            No need to visit 5 different shops. We stock every major category —
            if it plugs in or connects to WiFi, we probably have it.
          </motion.p>
        </div>

        {/* Category list — row style with left border accent */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Link href={cat.href}>
                <div className={`group flex items-start gap-4 p-5 rounded-2xl border-l-4 ${cat.accent} bg-white dark:bg-gray-900 hover:shadow-lg transition-all duration-300 hover:-translate-x-0.5`}>
                  <div className={`h-12 w-12 rounded-xl ${cat.iconBg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <cat.icon className={`h-6 w-6 ${cat.iconColor}`} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">{cat.desc}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      Browse <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Brands bar — clean text list */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 pt-10 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="flex items-center gap-2 mb-6">
            <ShieldCheck className="h-4 w-4 text-green-500" />
            <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
              Authorized partner for
            </span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {BRANDS.map((brand) => (
              <Link
                key={brand.slug}
                href={`/brands/${brand.slug}`}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
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
