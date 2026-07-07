"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    id: 1,
    name: "Rajesh Sharma",
    role: "IT Manager, Mumbai",
    avatar: "RS",
    rating: 5,
    content:
      "Best IT supplier we've worked with. Competitive pricing, on-time delivery, and exceptional after-sales support. Recently purchased 50 Dell workstations — the entire process was seamless.",
    color: "from-amber-500 to-orange-500",
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Business Owner, Pune",
    avatar: "PP",
    rating: 5,
    content:
      "Needed CCTV cameras and networking for my office. They handled everything from recommendations to professional installation. Highly recommended for small businesses!",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: 3,
    name: "Amit Verma",
    role: "Student, Delhi",
    avatar: "AV",
    rating: 5,
    content:
      "Got the best price on my ASUS laptop compared to Amazon and Flipkart. Great service and genuine product. Will definitely buy again and recommend to friends.",
    color: "from-violet-500 to-purple-500",
  },
]

export function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [autoplay])

  const next = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }
  const prev = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 lg:py-28 bg-gray-50/50 dark:bg-gray-950/50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-2xl lg:text-4xl font-extrabold tracking-tight mb-3">
            Loved by{" "}
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Customers</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Real feedback from real people across India
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="max-w-5xl mx-auto relative">
          <div className="grid md:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: i === current ? 1.03 : 0.97,
                  }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => { setCurrent(i); setAutoplay(false) }}
                  className={cn(
                    "relative cursor-pointer rounded-3xl p-8 transition-all duration-500",
                    i === current
                      ? "bg-white dark:bg-gray-900 shadow-2xl border-2 border-amber-200 dark:border-amber-800 scale-105 z-10"
                      : "bg-white/60 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                  )}
                >
                  {/* Gradient top bar for active */}
                  {i === current && (
                    <div className={`absolute top-0 left-4 right-4 h-1 rounded-full bg-gradient-to-r ${t.color}`} />
                  )}

                  <Quote className={cn(
                    "h-8 w-8 mb-4",
                    i === current ? "text-amber-300 dark:text-amber-600" : "text-gray-200 dark:text-gray-700"
                  )} />

                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-6">
                    &ldquo;{t.content}&rdquo;
                  </p>

                  <div className="flex items-center gap-0.5 mb-4">
                    {[...Array(5)].map((_, s) => (
                      <Star
                        key={s}
                        className={cn(
                          "h-4 w-4",
                          s < t.rating
                            ? "fill-amber-400 text-amber-400"
                            : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
                        )}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-white dark:border-gray-800 shadow-md">
                      <AvatarFallback className={`bg-gradient-to-br ${t.color} text-white font-bold`}>
                        {t.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-sm">{t.name}</p>
                      <p className="text-xs text-gray-500">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="h-12 w-12 rounded-2xl border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-all duration-300"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrent(i); setAutoplay(false) }}
                  className={cn(
                    "h-2.5 rounded-full transition-all duration-500",
                    i === current
                      ? "w-10 bg-gradient-to-r from-amber-500 to-orange-500"
                      : "w-2.5 bg-gray-300 dark:bg-gray-600"
                  )}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="h-12 w-12 rounded-2xl border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-all duration-300"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
