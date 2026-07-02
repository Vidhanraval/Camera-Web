"use client"

import { useState } from "react"
import Link from "next/link"
import { Package, Search, Eye, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { formatPrice } from "@/lib/utils"

const orders = [
  { id: "NV241220-0001", date: "2024-12-20", status: "Delivered", total: 39990, items: [{ name: "Dell Inspiron 15 Laptop", qty: 1, price: 39990 }], trackingUrl: "#" },
  { id: "NV241218-0002", date: "2024-12-18", status: "Shipped", total: 14999, items: [{ name: "Brother Laser Printer", qty: 1, price: 14999 }], trackingUrl: "#" },
  { id: "NV241215-0003", date: "2024-12-15", status: "Delivered", total: 3499, items: [{ name: "Hikvision IP Camera", qty: 1, price: 3499 }], trackingUrl: "#" },
  { id: "NV241210-0004", date: "2024-12-10", status: "Cancelled", total: 8990, items: [{ name: "Samsung SSD 1TB", qty: 1, price: 8990 }] },
  { id: "NV241201-0005", date: "2024-12-01", status: "Delivered", total: 54900, items: [{ name: "ASUS Gaming Laptop", qty: 1, price: 54900 }], trackingUrl: "#" },
]

const statusColors: Record<string, string> = {
  Delivered: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300",
  Shipped: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
  Processing: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300",
  Pending: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  Cancelled: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300",
}

export default function OrdersPage() {
  const [search, setSearch] = useState("")
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = orders.filter((o) =>
    o.id.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="bg-gray-50/50 dark:bg-gray-950/50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "Account", href: "/account/dashboard" }, { label: "Orders" }]} className="mb-6" />

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-extrabold mb-1">My Orders</h1>
            <p className="text-gray-500 dark:text-gray-400">{orders.length} orders</p>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search by order ID..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 rounded-xl" />
          </div>
        </div>

        <div className="space-y-4">
          {filtered.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                className="w-full p-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors text-left"
              >
                <div className="flex items-center gap-4">
                  <Package className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-sm">{order.id}</p>
                    <p className="text-xs text-gray-500">{order.date} • {order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className={`${statusColors[order.status]} text-[10px]`}>{order.status}</Badge>
                  <span className="font-bold text-sm">{formatPrice(order.total)}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${expanded === order.id ? 'rotate-180' : ''}`} />
                </div>
              </button>
              {expanded === order.id && (
                <div className="px-5 pb-5 border-t border-gray-100 dark:border-gray-800 pt-4">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between py-2 text-sm">
                      <span>{item.name} × {item.qty}</span>
                      <span className="font-semibold">{formatPrice(item.price)}</span>
                    </div>
                  ))}
                  <div className="flex gap-2 mt-4">
                    {order.trackingUrl && (
                      <Button variant="outline" size="sm" className="rounded-xl">Track Order</Button>
                    )}
                    <Link href={`/account/invoices/${order.id}`}>
                      <Button variant="outline" size="sm" className="rounded-xl">View Invoice</Button>
                    </Link>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
