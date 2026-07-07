"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, ShieldCheck, Truck, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const slides = [
  {
    id: 1,
    tag: "Premium Store",
    title: "Your Trusted Technology Partner",
    highlight: "Best Prices",
    description: "Authorized dealer for Dell, HP, Lenovo, ASUS — computers, laptops, CCTV, printers & more. Wholesale & retail at unbeatable prices.",
    cta: "Explore Products",
    link: "/shop",
    secondaryCta: "Get Free Quote",
    secondaryLink: "/contact",
    gradient: "from-amber-500 via-orange-500 to-rose-500",
    bgGlow: "bg-amber-500/20",
  },
  {
    id: 2,
    tag: "Best Seller",
    title: "Complete CCTV & Security Solutions",
    highlight: "Expert Installation",
    description: "HD IP cameras, DVR/NVR systems for home & business. Free site survey, professional installation, and 3-year warranty included.",
    cta: "Shop CCTV",
    link: "/shop?category=cctv",
    secondaryCta: "Request Demo",
    secondaryLink: "/contact",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    bgGlow: "bg-emerald-500/20",
  },
  {
    id: 3,
    tag: "Popular",
    title: "Networking & IT Infrastructure",
    highlight: "Enterprise Grade",
    description: "Routers, switches, access points & structured cabling. Mesh WiFi solutions for seamless coverage across your entire space.",
    cta: "View Networking",
    link: "/shop?category=networking",
    secondaryCta: "Talk to Expert",
    secondaryLink: "/contact",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    bgGlow: "bg-violet-500/20",
  },
]

const stats = [
  { value: "10+", label: "Years Experience", icon: Star },
  { value: "5000+", label: "Happy Customers", icon: Sparkles },
  { value: "50+", label: "Top Brands", icon: ShieldCheck },
  { value: "Pan India", label: "Free Delivery", icon: Truck },
]

export function HeroBanner() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [])

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
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir < 0 ? 200 : -200, opacity: 0, scale: 0.95 }),
  }

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden bg-white dark:bg-gray-950">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-amber-400/10 dark:bg-amber-500/5 blur-3xl animate-float"
          style={{ transform: `translate(${mousePos.x * 0.01}px, ${mousePos.y * 0.01}px)` }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-orange-400/10 dark:bg-orange-500/5 blur-3xl"
          style={{ transform: `translate(${-mousePos.x * 0.008}px, ${-mousePos.y * 0.008}px)`, animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-rose-300/10 dark:bg-rose-500/5 blur-3xl"
          style={{ transform: `translate(calc(-50% + ${mousePos.x * 0.005}px), calc(-50% + ${mousePos.y * 0.005}px))`, animationDelay: "4s" }}
        />
      </div>

      {/* Dot pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container mx-auto px-4 py-12 lg:py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Tag Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 mb-6">
                  <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-sm font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-wider">
                    {slides[current].tag}
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight mb-6">
                  {slides[current].title}{" "}
                  <span className={`bg-gradient-to-r ${slides[current].gradient} bg-clip-text text-transparent`}>
                    {slides[current].highlight}
                  </span>
                </h1>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-lg lg:text-xl leading-relaxed mb-8 max-w-xl">
                  {slides[current].description}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Link href={slides[current].link}>
                    <Button
                      size="lg"
                      className={`rounded-2xl text-base px-8 h-14 bg-gradient-to-r ${slides[current].gradient} text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-0 group`}
                    >
                      {slides[current].cta}
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href={slides[current].secondaryLink}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-2xl text-base px-8 h-14 border-2 hover:scale-105 transition-all duration-300"
                    >
                      {slides[current].secondaryCta}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slide Controls */}
            <div className="flex items-center gap-4 mt-10">
              <button
                onClick={prev}
                className="h-12 w-12 rounded-2xl border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-amber-400 dark:hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-all duration-300 group"
              >
                <ChevronLeft className="h-5 w-5 group-hover:text-amber-600 transition-colors" />
              </button>
              <div className="flex gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`h-2.5 rounded-full transition-all duration-500 ${
                      i === current
                        ? "w-10 bg-gradient-to-r from-amber-500 to-orange-500"
                        : "w-2.5 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="h-12 w-12 rounded-2xl border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-amber-400 dark:hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-all duration-300 group"
              >
                <ChevronRight className="h-5 w-5 group-hover:text-amber-600 transition-colors" />
              </button>
            </div>
          </div>

          {/* Visual Side */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Main visual circle */}
                <div className={`relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[440px] lg:h-[440px] rounded-[40px] bg-gradient-to-br ${slides[current].gradient} p-[3px] shadow-2xl`}>
                  <div className="w-full h-full rounded-[37px] bg-white dark:bg-gray-950 flex items-center justify-center overflow-hidden">
                    <div className={`w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full ${slides[current].bgGlow} flex items-center justify-center animate-float`}>
                      <div className="text-center">
                        <Sparkles className={`h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 mx-auto bg-gradient-to-r ${slides[current].gradient} bg-clip-text text-transparent`} />
                        <p className={`mt-4 text-lg font-bold bg-gradient-to-r ${slides[current].gradient} bg-clip-text text-transparent`}>
                          {slides[current].tag}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 px-4 py-2 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-sm font-bold">4.8</span>
                  </div>
                </motion.div>

                {/* Floating trust badge */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-2 -left-4 sm:-bottom-4 sm:-left-8 px-4 py-2 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 flex items-center gap-2"
                >
                  <ShieldCheck className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-semibold">100% Genuine</span>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 lg:mt-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
              className="text-center p-6 rounded-3xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 hover:border-amber-200 dark:hover:border-amber-800 hover:shadow-lg transition-all duration-300 group"
            >
              <stat.icon className="h-7 w-7 mx-auto mb-3 text-amber-500 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
