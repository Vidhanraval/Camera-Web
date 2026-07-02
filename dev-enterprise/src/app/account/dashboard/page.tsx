"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Package, Heart, MapPin, FileText, ShoppingBag, User, LogOut, TrendingUp, Clock, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { formatPrice } from "@/lib/utils"

const accountLinks = [
  { icon: Package, label: "My Orders", href: "/account/orders", count: "3 active", color: "from-blue-500 to-blue-600" },
  { icon: Heart, label: "Wishlist", href: "/wishlist", count: "5 items", color: "from-red-500 to-red-600" },
  { icon: MapPin, label: "Addresses", href: "/account/addresses", count: "2 saved", color: "from-green-500 to-green-600" },
  { icon: FileText, label: "Invoices", href: "/account/invoices", color: "from-purple-500 to-purple-600" },
  { icon: User, label: "Profile", href: "/account/profile", color: "from-orange-500 to-orange-600" },
]

const recentOrders = [
  { id: "NV241220-0001", date: "2024-12-20", status: "Delivered", total: 39990, items: 1 },
  { id: "NV241218-0002", date: "2024-12-18", status: "Shipped", total: 14999, items: 2 },
  { id: "NV241215-0003", date: "2024-12-15", status: "Processing", total: 3499, items: 1 },
]

export default function AccountDashboard() {
  return (
    <div className="bg-gray-50/50 dark:bg-gray-950/50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "My Account" }]} className="mb-6" />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 p-4">
              <div className="flex items-center gap-3 p-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                  R
                </div>
                <div>
                  <p className="font-semibold text-sm">Rahul Sharma</p>
                  <p className="text-xs text-gray-500">rahul@email.com</p>
                </div>
              </div>
              <nav className="space-y-1">
                {[
                  { icon: TrendingUp, label: "Dashboard", href: "/account/dashboard", active: true },
                  { icon: ShoppingBag, label: "Orders", href: "/account/orders" },
                  { icon: Heart, label: "Wishlist", href: "/wishlist" },
                  { icon: MapPin, label: "Addresses", href: "/account/addresses" },
                  { icon: FileText, label: "Invoices", href: "/account/invoices" },
                  { icon: User, label: "Profile", href: "/account/profile" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 ${
                      item.active
                        ? "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-semibold"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 rounded-xl" size="sm">
                  <LogOut className="h-4 w-4 mr-2" /> Sign Out
                </Button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-2xl lg:text-3xl font-extrabold mb-1">Welcome back, Rahul! 👋</h1>
              <p className="text-gray-500 dark:text-gray-400">Here&apos;s what&apos;s happening with your account.</p>
            </motion.div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {accountLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link href={link.href}>
                    <Card className="p-4 text-center h-full hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 cursor-pointer group">
                      <div className={`h-10 w-10 mx-auto rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                        <link.icon className="h-5 w-5 text-white" />
                      </div>
                      <p className="text-sm font-semibold">{link.label}</p>
                      {link.count && <p className="text-xs text-gray-400">{link.count}</p>}
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Recent Orders */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Recent Orders</h2>
                <Link href="/account/orders" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                  View All
                </Link>
              </div>
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <Link key={order.id} href={`/account/orders/${order.id}`}>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                      <div>
                        <p className="font-semibold text-sm">{order.id}</p>
                        <p className="text-xs text-gray-500">{order.date} • {order.items} item{order.items > 1 ? 's' : ''}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm">{formatPrice(order.total)}</p>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          order.status === "Delivered" ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300" :
                          order.status === "Shipped" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300" :
                          "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300"
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
