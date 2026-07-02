"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Star, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BRANDS } from "@/lib/constants"

export function BrandsShowcase() {
  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2"
          >
            Authorized Dealer
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-4"
          >
            Trusted Brands We Carry
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            We are an authorized dealer and partner for all major technology brands. Every product comes with manufacturer warranty and genuine support.
          </motion.p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-8">
          {BRANDS.map((brand, i) => (
            <motion.div
              key={brand.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
            >
              <Link href={`/brands/${brand.slug}`}>
                <Card className="group p-4 lg:p-6 text-center h-full cursor-pointer hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 hover:scale-105">
                  <div className="h-12 w-12 mx-auto rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center mb-3 group-hover:from-blue-100 group-hover:to-blue-200 dark:group-hover:from-blue-900/40 dark:group-hover:to-blue-800/40 transition-all duration-300">
                    <span className="text-lg font-bold text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {brand.name[0]}
                    </span>
                  </div>
                  <p className="text-sm font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {brand.name}
                  </p>
                  <div className="flex items-center justify-center gap-1 mt-1.5 text-[10px] text-gray-400">
                    <ShieldCheck className="h-3 w-3 text-green-500" />
                    Authorized
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/brands">
            <Button variant="outline" className="rounded-xl">
              View All Brands <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
