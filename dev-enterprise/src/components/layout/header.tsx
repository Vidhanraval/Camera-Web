"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search, ShoppingCart, Heart, User, Menu, X, Sun, Moon, Phone,
  ChevronDown, Sparkles, Monitor, Printer, Camera, Router, HardDrive, Headphones
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { useCartStore } from "@/lib/store/cart-store"
import { useWishlistStore } from "@/lib/store/wishlist-store"
import { useUIStore } from "@/lib/store/ui-store"
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants"

const iconMap: Record<string, React.ReactNode> = {
  Computers: <Monitor className="h-4 w-4" />,
  Laptops: <Monitor className="h-4 w-4" />,
  "Printers & Accessories": <Printer className="h-4 w-4" />,
  "CCTV & Security": <Camera className="h-4 w-4" />,
  Networking: <Router className="h-4 w-4" />,
  Storage: <HardDrive className="h-4 w-4" />,
  Accessories: <Headphones className="h-4 w-4" />,
  Components: <HardDrive className="h-4 w-4" />,
}

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const cartCount = useCartStore((s) => s.getItemCount())
  const wishlistCount = useWishlistStore((s) => s.items.length)
  const { theme, toggleTheme, isMobileMenuOpen, setMobileMenuOpen } = useUIStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:block bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white">
        <div className="container mx-auto px-4 h-10 flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-1.5 hover:text-blue-200 transition-colors">
              <Phone className="h-3.5 w-3.5" /> {SITE_CONFIG.phone}
            </a>
            <span className="text-blue-300">|</span>
            <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-blue-200 transition-colors">
              {SITE_CONFIG.email}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span>GST: {SITE_CONFIG.gstin}</span>
            <span className="text-blue-300">|</span>
            <Link href="/about" className="hover:text-blue-200 transition-colors">About</Link>
            <Link href="/contact" className="hover:text-blue-200 transition-colors">Contact</Link>
            <Link href="/faq" className="hover:text-blue-200 transition-colors">Help</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-2xl shadow-lg shadow-blue-500/5 border-b border-gray-200/50 dark:border-gray-800/50"
            : "bg-white dark:bg-gray-950 border-b border-transparent"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent leading-tight">
                  {SITE_CONFIG.name}
                </h1>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight tracking-wider uppercase">
                  Tech Solutions
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex">
              <NavigationMenu>
                <NavigationMenuList>
                  {NAV_LINKS.map((link) => (
                    <NavigationMenuItem key={link.href}>
                      {link.children ? (
                        <>
                          <NavigationMenuTrigger
                            className={cn(
                              "h-10 text-sm font-medium",
                              pathname === link.href && "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950"
                            )}
                          >
                            {link.title}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <div className="p-4 w-[600px] lg:w-[700px]">
                              <div className="grid grid-cols-2 gap-4">
                                {link.children?.map((child) => (
                                  <div key={child.href}>
                                    <Link
                                      href={child.href}
                                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-gray-900 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-150"
                                    >
                                      {iconMap[child.title] || <ChevronDown className="h-3 w-3" />}
                                      {child.title}
                                    </Link>
                                    {child.children && (
                                      <div className="ml-6 mt-1 space-y-0.5">
                                        {child.children.map((sub) => (
                                          <Link
                                            key={sub.href}
                                            href={sub.href}
                                            className="block px-3 py-1.5 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-600 dark:hover:text-blue-300 transition-all duration-150"
                                          >
                                            {sub.title}
                                          </Link>
                                        ))}
                                      </div>
                                    )}
                                    {!child.children && (
                                      <p className="ml-6 mt-1 px-3 text-xs text-gray-400">
                                        Browse all {child.title.toLowerCase()}
                                      </p>
                                    )}
                                  </div>
                                ))}
                              </div>
                              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-between">
                                <Link
                                  href="/shop"
                                  className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                  View All Products →
                                </Link>
                                <Link
                                  href="/brands"
                                  className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                  Shop by Brand →
                                </Link>
                              </div>
                            </div>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <NavigationMenuLink asChild>
                          <Link
                            href={link.href}
                            className={cn(
                              navigationMenuTriggerStyle(),
                              pathname === link.href && "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950"
                            )}
                          >
                            {link.title}
                          </Link>
                        </NavigationMenuLink>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Search Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(!searchOpen)}
                className="rounded-full"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full hidden sm:flex"
                aria-label="Toggle theme"
                suppressHydrationWarning
              >
                {mounted ? (
                  theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />
                ) : (
                  <span className="h-5 w-5" aria-hidden="true" />
                )}
              </Button>

              {/* Wishlist */}
              <Link href="/wishlist">
                <Button variant="ghost" size="icon" className="rounded-full relative">
                  <Heart className="h-5 w-5" />
                  {mounted && wishlistCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-red-500">
                      {wishlistCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Cart */}
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="rounded-full relative">
                  <ShoppingCart className="h-5 w-5" />
                  {mounted && cartCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-blue-600">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Account */}
              <Link href="/auth/login" className="hidden sm:block">
                <Button variant="outline" size="sm" className="rounded-full">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>

              {/* Mobile Menu */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full lg:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0">
                  <MobileMenu />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-gray-200 dark:border-gray-800 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-4">
                <div className="relative max-w-2xl mx-auto">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for computers, laptops, printers, CCTV cameras..."
                    className="pl-12 pr-24 h-14 text-lg rounded-2xl border-2"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && searchQuery.trim()) {
                        window.location.href = `/shop?q=${encodeURIComponent(searchQuery)}`
                      }
                    }}
                  />
                  <Button
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl"
                    onClick={() => {
                      if (searchQuery.trim()) {
                        window.location.href = `/shop?q=${encodeURIComponent(searchQuery)}`
                      }
                    }}
                  >
                    Search
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}

function MobileMenu() {
  const [expanded, setExpanded] = useState<string | null>(null)
  const { setMobileMenuOpen } = useUIStore()

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            {SITE_CONFIG.name}
          </span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        {NAV_LINKS.map((link) => (
          <div key={link.href}>
            {link.children ? (
              <>
                <button
                  onClick={() => setExpanded(expanded === link.title ? null : link.title)}
                  className="flex items-center justify-between w-full px-6 py-3 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  {link.title}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      expanded === link.title && "rotate-180"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-in-out bg-gray-50 dark:bg-gray-900/50",
                    expanded === link.title ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden min-h-0">
                    {link.children.map((child) => (
                      <div key={child.href}>
                        <Link
                          href={child.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-10 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600"
                        >
                          {child.title}
                        </Link>
                        {child.children?.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-14 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600"
                          >
                            {sub.title}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <Link
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-6 py-3 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                {link.title}
              </Link>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
        <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
          <Button className="w-full rounded-xl">Login / Sign Up</Button>
        </Link>
        <Link href="/wishlist" onClick={() => setMobileMenuOpen(false)}>
          <Button variant="outline" className="w-full rounded-xl">
            <Heart className="h-4 w-4 mr-2" /> Wishlist
          </Button>
        </Link>
      </div>
    </div>
  )
}

