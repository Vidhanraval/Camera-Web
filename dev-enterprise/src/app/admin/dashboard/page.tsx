"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  TrendingUp, Package, ShoppingCart, Users, DollarSign, Star,
  BarChart3, Settings, Tag, FileText, MessageSquare, LogOut,
  ChevronDown, Bell, Search, Menu, Plus, Download, Filter
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"

const stats = [
  { icon: DollarSign, label: "Total Revenue", value: "₹24,85,000", change: "+12.5%", color: "from-green-500 to-emerald-600", up: true },
  { icon: ShoppingCart, label: "Total Orders", value: "1,284", change: "+8.2%", color: "from-blue-500 to-blue-600", up: true },
  { icon: Users, label: "Customers", value: "856", change: "+15.3%", color: "from-purple-500 to-purple-600", up: true },
  { icon: Package, label: "Products", value: "1,024", change: "+5.7%", color: "from-orange-500 to-orange-600", up: true },
]

const recentOrders = [
  { id: "NV241220-0001", customer: "Rahul Sharma", amount: 39990, status: "Delivered", date: "2024-12-20" },
  { id: "NV241220-0002", customer: "Priya Patel", amount: 14999, status: "Processing", date: "2024-12-20" },
  { id: "NV241219-0003", customer: "Amit Verma", amount: 8990, status: "Shipped", date: "2024-12-19" },
  { id: "NV241219-0004", customer: "Sneha Gupta", amount: 54900, status: "Pending", date: "2024-12-19" },
  { id: "NV241218-0005", customer: "Vikram Desai", amount: 12999, status: "Delivered", date: "2024-12-18" },
]

const lowStockProducts = [
  { name: "Dell Inspiron 15 Laptop", sku: "LAP-DEL-001", stock: 3, minStock: 10 },
  { name: "HP LaserJet Pro Printer", sku: "PRN-HP-002", stock: 2, minStock: 5 },
  { name: "Samsung 970 EVO Plus SSD", sku: "SSD-SAM-003", stock: 4, minStock: 15 },
]

const sidebarLinks = [
  { icon: TrendingUp, label: "Dashboard", href: "/admin/dashboard", active: true },
  { icon: Package, label: "Products", href: "/admin/products" },
  { icon: ShoppingCart, label: "Orders", href: "/admin/orders" },
  { icon: Users, label: "Customers", href: "/admin/customers" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Tag, label: "Coupons", href: "/admin/coupons" },
  { icon: FileText, label: "Invoices", href: "/admin/invoices" },
  { icon: Star, label: "Reviews", href: "/admin/reviews" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
]

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-all duration-300 shrink-0`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shrink-0">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
          {sidebarOpen && <span className="font-bold text-sm">Admin Panel</span>}
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 ${
                link.active
                  ? "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-semibold"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              <link.icon className="h-4 w-4 shrink-0" />
              {sidebarOpen && link.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-gray-200 dark:border-gray-800">
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start rounded-xl" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              {sidebarOpen && "Exit Admin"}
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 overflow-y-auto">
        {/* Top Bar */}
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="rounded-xl">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search..." className="pl-9 h-10 w-64 rounded-xl" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-xl relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 bg-red-500 rounded-full" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
          </div>
        </header>

        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-extrabold">Admin Dashboard</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Overview of your store performance</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="rounded-xl">
                <Download className="h-4 w-4 mr-2" /> Export
              </Button>
              <Button size="sm" className="rounded-xl">
                <Plus className="h-4 w-4 mr-2" /> Add Product
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="h-5 w-5 text-white" />
                    </div>
                    <Badge variant={stat.up ? "success" : "destructive"} className="text-xs">{stat.change}</Badge>
                  </div>
                  <p className="text-2xl font-extrabold mb-0.5">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Orders */}
            <div className="lg:col-span-2">
              <Card>
                <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <h2 className="font-bold">Recent Orders</h2>
                  <Link href="/admin/orders" className="text-xs font-semibold text-blue-600 hover:underline">View All</Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-gray-800 text-left text-xs text-gray-500 uppercase">
                        <th className="px-5 py-3">Order ID</th>
                        <th className="px-5 py-3">Customer</th>
                        <th className="px-5 py-3">Amount</th>
                        <th className="px-5 py-3">Status</th>
                        <th className="px-5 py-3">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                          <td className="px-5 py-3 font-medium">{order.id}</td>
                          <td className="px-5 py-3">{order.customer}</td>
                          <td className="px-5 py-3 font-semibold">{formatPrice(order.amount)}</td>
                          <td className="px-5 py-3">
                            <Badge variant={
                              order.status === "Delivered" ? "success" :
                              order.status === "Processing" ? "default" :
                              order.status === "Shipped" ? "secondary" : "warning"
                            } className="text-[10px]">
                              {order.status}
                            </Badge>
                          </td>
                          <td className="px-5 py-3 text-gray-500">{order.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            {/* Low Stock Alert */}
            <Card>
              <div className="p-5 border-b border-gray-100 dark:border-gray-800">
                <h2 className="font-bold">Low Stock Alert</h2>
              </div>
              <div className="p-5 space-y-4">
                {lowStockProducts.map((product) => (
                  <div key={product.sku} className="flex items-center justify-between p-3 rounded-xl bg-red-50 dark:bg-red-950/20">
                    <div>
                      <p className="text-sm font-semibold truncate max-w-[150px]">{product.name}</p>
                      <p className="text-xs text-gray-500">SKU: {product.sku}</p>
                    </div>
                    <Badge variant="destructive" className="shrink-0">{product.stock} left</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
