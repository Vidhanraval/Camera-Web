"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    id: 1,
    name: "Rajesh Sharma",
    role: "IT Manager, Mumbai Corp",
    avatar: "RS",
    rating: 5,
    content:
      "Dev Enterprise has been our go-to IT supplier for over 3 years. Their pricing is competitive, delivery is always on time, and their after-sales support is exceptional. We recently purchased 50 Dell workstations and the entire process was seamless.",
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Small Business Owner",
    avatar: "PP",
    rating: 5,
    content:
      "I run a small accounting firm and needed CCTV cameras and networking setup. Dev Enterprise's team handled everything — from recommending the right products to professional installation. Highly recommended for small businesses!",
  },
  {
    id: 3,
    name: "Amit Verma",
    role: "College Student",
    avatar: "AV",
    rating: 4,
    content:
      "Bought an ASUS gaming laptop for my college projects and gaming. Got the best price compared to Amazon and Flipkart. The GST invoice was helpful for my dad's business too. Will definitely buy again.",
  },
  {
    id: 4,
    name: "Sneha Gupta",
    role: "School Administrator",
    avatar: "SG",
    rating: 5,
    content:
      "We ordered 20 printers for our school's computer lab. Dev Enterprise helped us choose the right models, arranged bulk pricing, and provided installation support. Their service is outstanding for educational institutions.",
  },
  {
    id: 5,
    name: "Vikram Desai",
    role: "Retail Store Owner",
    avatar: "VD",
    rating: 5,
    content:
      "As a fellow retailer, I value their wholesale pricing. I regularly purchase computer accessories and networking equipment from them. Consistent quality, genuine products, and great margins for my business.",
  },
]

export function Testimonials() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () =>
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-blue-50/50 to-white dark:from-blue-950/20 dark:to-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2"
          >
            Testimonials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-4"
          >
            What Our Customers Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 dark:text-gray-400"
          >
            Trusted by businesses, students, and professionals across India
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-900 rounded-3xl p-8 lg:p-12 shadow-xl shadow-blue-500/5 border border-gray-200/60 dark:border-gray-800/60 text-center"
            >
              <Quote className="h-10 w-10 text-blue-200 dark:text-blue-800 mx-auto mb-4" />
              <p className="text-gray-700 dark:text-gray-300 text-base lg:text-lg leading-relaxed mb-6">
                &ldquo;{testimonials[current].content}&rdquo;
              </p>
              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-5 w-5",
                      i < testimonials[current].rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
                    )}
                  />
                ))}
              </div>
              <Avatar className="h-14 w-14 mx-auto mb-2">
                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-lg font-bold">
                  {testimonials[current].avatar}
                </AvatarFallback>
              </Avatar>
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {testimonials[current].name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {testimonials[current].role}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 lg:-translate-x-6 h-10 w-10 rounded-full bg-white dark:bg-gray-800 shadow-lg shadow-black/10 flex items-center justify-center hover:scale-110 transition-transform"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 lg:translate-x-6 h-10 w-10 rounded-full bg-white dark:bg-gray-800 shadow-lg shadow-black/10 flex items-center justify-center hover:scale-110 transition-transform"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === current
                    ? "w-6 bg-blue-600"
                    : "w-2 bg-gray-300 dark:bg-gray-600"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
