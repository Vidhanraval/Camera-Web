"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronLeft, ChevronRight, Monitor, Shield, Truck, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const slides = [
  {
    id: 1,
    title: "Premium Computers & Laptops",
    subtitle: "Authorized Dealer for Dell, HP, Lenovo & ASUS",
    description:
      "Discover our wide range of desktop computers, gaming PCs, and business laptops at the best wholesale and retail prices.",
    cta: "Shop Computers",
    link: "/shop?category=computers",
    bg: "from-blue-600 via-blue-700 to-indigo-800",
    image: "/images/hero/hero-1.png",
    badge: "New Arrivals",
  },
  {
    id: 2,
    title: "Complete CCTV & Security Solutions",
    subtitle: "IP Cameras, DVR, NVR — Protect What Matters",
    description:
      "High-definition surveillance systems for home, office, and enterprise. Expert installation and support included.",
    cta: "Explore CCTV",
    link: "/shop?category=cctv",
    bg: "from-indigo-700 via-purple-700 to-violet-800",
    image: "/images/hero/hero-2.png",
    badge: "Best Seller",
  },
  {
    id: 3,
    title: "Networking & IT Infrastructure",
    subtitle: "Routers, Switches, Access Points — Build Your Network",
    description:
      "Enterprise-grade networking equipment from top brands. Mesh WiFi, access points, structured cabling, and more.",
    cta: "View Networking",
    link: "/shop?category=networking",
    bg: "from-cyan-600 via-blue-700 to-blue-800",
    image: "/images/hero/hero-3.png",
    badge: "Popular",
  },
  {
    id: 4,
    title: "Printers & Office Solutions",
    subtitle: "Canon, HP, Brother, Epson — Print Smarter",
    description:
      "Inkjet, laser, and all-in-one printers for home and business. Genuine accessories and cartridges available.",
    cta: "Shop Printers",
    link: "/shop?category=printers",
    bg: "from-orange-600 via-red-600 to-rose-700",
    image: "/images/hero/hero-4.png",
    badge: "Special Offer",
  },
]

const features = [
  { icon: Truck, title: "Fast Delivery", desc: "Free shipping on orders above ₹5,000" },
  { icon: Shield, title: "Genuine Products", desc: "100% authentic with manufacturer warranty" },
  { icon: Zap, title: "Expert Support", desc: "Tech support & installation assistance" },
  { icon: Monitor, title: "Best Prices", desc: "Wholesale & retail at competitive rates" },
]

export function HeroBanner() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1)
      setCurrent(index)
    },
    [current]
  )

  const next = useCallback(() => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir < 0 ? 300 : -300, opacity: 0 }),
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <Badge variant="premium" className="mb-4">
                  {slides[current].badge}
                </Badge>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight tracking-tight mb-4">
                  <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                    {slides[current].title}
                  </span>
                </h1>
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2 uppercase tracking-wider">
                  {slides[current].subtitle}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-base lg:text-lg mb-8 leading-relaxed max-w-lg">
                  {slides[current].description}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href={slides[current].link}>
                    <Button size="lg" className="rounded-xl group">
                      {slides[current].cta}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href="/shop">
                    <Button variant="outline" size="lg" className="rounded-xl">
                      View All Products
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slide Dots */}
            <div className="flex gap-2 mt-8">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === current
                      ? "w-8 bg-blue-600"
                      : "w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="relative"
              >
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px] rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center animate-float">
                  <div className="w-48 h-48 sm:w-60 sm:h-60 lg:w-72 lg:h-72 rounded-full bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-950/50 shadow-2xl shadow-blue-500/10 flex items-center justify-center">
                    <Monitor className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 text-blue-600 dark:text-blue-400 opacity-80" />
                  </div>
                </div>
                {/* Navigation Arrows */}
                <button
                  onClick={prev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 h-10 w-10 rounded-full bg-white dark:bg-gray-800 shadow-lg shadow-black/10 flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 h-10 w-10 rounded-full bg-white dark:bg-gray-800 shadow-lg shadow-black/10 flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Feature Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 lg:mt-20">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="flex items-center gap-3 p-4 rounded-2xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200/60 dark:border-gray-800/60 hover:shadow-lg transition-all duration-300"
            >
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 flex items-center justify-center shrink-0">
                <feature.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-semibold">{feature.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
