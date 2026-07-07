"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SITE_CONFIG } from "@/lib/constants"

export function CTABanner() {
  return (
    <section className="py-16 lg:py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 dark:from-gray-800 dark:via-gray-850 dark:to-gray-900 p-10 lg:p-16 text-center"
        >
          {/* Background Glow */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-20 left-1/4 w-[400px] h-[300px] bg-orange-500/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-sm font-semibold mb-6">
                Need Help Choosing?
              </span>
              <h2 className="text-3xl lg:text-5xl font-black text-white mb-4 leading-tight">
                Let&apos;s Find the Perfect{" "}
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  Solution for You
                </span>
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                Whether you need a single laptop or a complete office setup — our experts will guide you to the right products at the best price.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/shop">
                  <Button size="lg" className="rounded-2xl text-base px-10 h-14 bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xl shadow-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/40 hover:scale-105 transition-all duration-300 border-0 group">
                    Browse Products
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <a href={`tel:${SITE_CONFIG.phone}`}>
                  <Button variant="outline" size="lg" className="rounded-2xl text-base px-10 h-14 border-2 border-gray-600 text-white hover:bg-white/10 hover:border-gray-400 transition-all duration-300">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                </a>
                <a href={`https://wa.me/91${SITE_CONFIG.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="lg" className="rounded-2xl text-base px-8 h-14 text-green-400 hover:bg-green-500/10 transition-all duration-300">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    WhatsApp
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
