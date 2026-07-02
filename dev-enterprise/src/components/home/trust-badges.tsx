"use client"

import { motion } from "framer-motion"
import { Truck, Shield, RefreshCw, HeadphonesIcon, BadgeIndianRupee, Store } from "lucide-react"

const badges = [
  {
    icon: Truck,
    title: "Pan India Delivery",
    desc: "Free shipping on orders above ₹5,000. Fast & reliable delivery to all major cities.",
  },
  {
    icon: Shield,
    title: "100% Genuine",
    desc: "All products are authentic with manufacturer warranty. No counterfeits, guaranteed.",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    desc: "7-day replacement for defective products. Hassle-free return process.",
  },
  {
    icon: HeadphonesIcon,
    title: "Expert Support",
    desc: "Pre & post-sales tech support. Installation assistance for CCTV & networking.",
  },
  {
    icon: BadgeIndianRupee,
    title: "GST Invoice",
    desc: "GST-compliant invoices for all purchases. Input tax credit for businesses.",
  },
  {
    icon: Store,
    title: "Wholesale Pricing",
    desc: "Special bulk pricing for businesses, retailers, and educational institutions.",
  },
]

export function TrustBadges() {
  return (
    <section className="py-16 lg:py-20 border-y border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20 items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <badge.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="font-semibold text-sm mb-1">{badge.title}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 max-w-[180px] mx-auto leading-relaxed">
                {badge.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
