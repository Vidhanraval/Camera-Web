"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Phone, Shield, Star, Truck, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SITE_CONFIG } from "@/lib/constants"

const highlights = [
  { icon: Truck, text: "Free delivery above ₹5,000" },
  { icon: Shield, text: "Authorized dealer — 50+ brands" },
  { icon: Wrench, text: "Installation & support included" },
]

export function HeroBanner() {
  const [current, setCurrent] = useState(0)
  const phrases = ["Best Price.", "Original Products.", "Expert Support."]

  useEffect(() => {
    const t = setInterval(() => setCurrent((p) => (p + 1) % phrases.length), 2500)
    return () => clearInterval(t)
  }, [phrases.length])

  return (
    <section className="relative overflow-hidden bg-white dark:bg-gray-950">
      {/* Subtle top accent line */}
      <div className="h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500" />

      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center">
          {/* Left — Text */}
          <div className="max-w-2xl">
            {/* Small label */}
            <div className="inline-flex items-center gap-2 text-sm font-medium text-amber-600 dark:text-amber-400 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              India&apos;s Trusted Tech Store
            </div>

            {/* Main heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.12] tracking-tight text-gray-900 dark:text-white mb-4">
              Computers, Laptops, CCTV —{" "}
              <span className="relative whitespace-nowrap">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={current}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-0 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent"
                  >
                    {phrases[current]}
                  </motion.span>
                </AnimatePresence>
                <span className="invisible">{phrases[0]}</span>
              </span>
            </h1>

            {/* Description */}
            <p className="text-gray-500 dark:text-gray-400 text-base lg:text-lg leading-relaxed mb-8 max-w-lg">
              Authorized partner for <strong>Dell, HP, Lenovo, ASUS, Canon, Hikvision</strong> &amp; more.
              Whether you need one laptop or a complete office network — we deliver genuine products at
              prices that make sense.
            </p>

            {/* CTA Row */}
            <div className="flex flex-wrap items-center gap-3 mb-10">
              <Link href="/shop">
                <Button size="lg" className="rounded-xl text-sm px-6 h-12 bg-gray-900 dark:bg-white dark:text-gray-900 text-white hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors group">
                  Browse Products
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href={`tel:${SITE_CONFIG.phone}`}>
                <Button variant="outline" size="lg" className="rounded-xl text-sm px-6 h-12">
                  <Phone className="h-4 w-4 mr-2" />
                  Call For Price
                </Button>
              </a>
            </div>

            {/* Trust highlights */}
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {highlights.map((h) => (
                <div key={h.text} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <h.icon className="h-4 w-4 text-amber-500 shrink-0" />
                  {h.text}
                </div>
              ))}
            </div>
          </div>

          {/* Right — Visual Card */}
          <div className="hidden lg:block">
            <div className="relative w-80">
              {/* Main card */}
              <div className="relative rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-white shadow-2xl">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-sm text-gray-400 ml-1">4.8 rating</span>
                </div>

                <div className="space-y-4">
                  {[
                    { label: "Products Sold", value: "15,000+" },
                    { label: "Happy Customers", value: "5,000+" },
                    { label: "Years in Business", value: "10+" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-end justify-between border-b border-gray-700 pb-3 last:border-0">
                      <span className="text-sm text-gray-400">{stat.label}</span>
                      <span className="text-xl font-bold">{stat.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-700">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    &ldquo;Best prices on genuine IT products. These guys know their stuff.&rdquo;
                  </p>
                  <p className="text-sm font-semibold mt-2">— Rajesh, Mumbai</p>
                </div>
              </div>

              {/* Floating element */}
              <div className="absolute -top-6 -right-6 h-16 w-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-xl rotate-6">
                <Shield className="h-7 w-7 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
