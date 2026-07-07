"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Phone, MessageCircle, ArrowRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SITE_CONFIG } from "@/lib/constants"

export function CTABanner() {
  return (
    <section className="py-16 lg:py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Small urgency badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-xs font-semibold mb-6">
              <Clock className="h-3 w-3" />
              Open Mon&ndash;Sat, 10 AM &ndash; 8 PM
            </span>

            <h2 className="text-2xl lg:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-3">
              Ready to buy?{" "}
              <span className="text-amber-600 dark:text-amber-400">Let&apos;s talk.</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-lg mx-auto leading-relaxed">
              Tell us what you need. We&apos;ll quote you the best price — usually lower than
              online stores because we don&apos;t spend on ads. Just good products at fair prices.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href={`https://wa.me/91${SITE_CONFIG.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="rounded-xl text-sm px-8 h-12 bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/20 transition-all hover:scale-105">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat on WhatsApp
                </Button>
              </a>
              <a href={`tel:${SITE_CONFIG.phone}`}>
                <Button variant="outline" size="lg" className="rounded-xl text-sm px-8 h-12">
                  <Phone className="h-4 w-4 mr-2" />
                  {SITE_CONFIG.phone}
                </Button>
              </a>
              <Link href="/shop">
                <Button variant="ghost" size="lg" className="rounded-xl text-sm px-8 h-12 group">
                  Browse products
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Bottom note */}
            <p className="text-xs text-gray-400 mt-8">
              No pushy salespeople. No hidden charges. Just honest advice.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
