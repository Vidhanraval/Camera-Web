"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
import type { TestimonialItem } from "@/lib/data"

export function Testimonials({ data }: { data: TestimonialItem[] }) {
  return (
    <section className="py-20 lg:py-28 bg-gray-50/50 dark:bg-gray-950/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-14">
            <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-3">
              &mdash; Real Feedback
            </p>
            <h2 className="text-2xl lg:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Don&apos;t take our word.{" "}
              <span className="text-amber-600 dark:text-amber-400">Take theirs.</span>
            </h2>
          </div>

          {/* Testimonials — stacked cards, no carousel */}
          <div className="space-y-4">
            {data.map((t, i) => (
              <motion.blockquote
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 lg:p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className={cn("h-4 w-4", s < t.rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200 dark:fill-gray-700")} />
                  ))}
                </div>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  &ldquo;{t.content}&rdquo;
                </p>

                <footer className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center text-sm font-bold text-amber-700 dark:text-amber-300">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <cite className="not-italic font-semibold text-sm text-gray-900 dark:text-white">{t.name}</cite>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
