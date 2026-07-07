"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Plus, Filter, Download, Upload, Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"

const products = [
  { id: "1", name: "Dell Inspiron 15 Laptop", sku: "LAP-DEL-001", category: "Laptops", brand: "Dell", price: 45990, salePrice: 39990, stock: 25, status: "Active" },
  { id: "2", name: "HP LaserJet Pro Printer", sku: "PRN-HP-002", category: "Printers", brand: "HP", price: 28500, salePrice: 24999, stock: 15, status: "Active" },
  { id: "3", name: "Hikvision 4MP IP Camera", sku: "CCTV-HIK-003", category: "CCTV", brand: "Hikvision", price: 4500, salePrice: 3499, stock: 100, status: "Active" },
  { id: "4", name: "ASUS RT-AX88U Router", sku: "NET-ASUS-004", category: "Networking", brand: "ASUS", price: 18999, salePrice: 15999, stock: 20, status: "Active" },
  { id: "5", name: "Samsung 1TB SSD 870 EVO", sku: "SSD-SAM-005", category: "Storage", brand: "Samsung", price: 8999, salePrice: 7499, stock: 3, status: "Low Stock" },
  { id: "6", name: "Zebronics KB+Mouse Combo", sku: "ACC-ZEB-006", category: "Accessories", brand: "Zebronics", price: 1499, salePrice: 999, stock: 200, status: "Active" },
  { id: "7", name: "Dell 65W Power Adapter", sku: "PWR-DEL-007", category: "Accessories", brand: "Dell", price: 1599, salePrice: null, stock: 50, status: "Active" },
  { id: "8", name: "Cat6 Ethernet Cable 5m", sku: "CBL-DLK-008", category: "Cables", brand: "D-Link", price: 299, salePrice: null, stock: 0, status: "Out of Stock" },
]

export default function AdminProductsPage() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <div className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 px-6 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold">Products</h1>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="pl-9 h-10 w-64 rounded-xl" />
            </div>
            <Button variant="outline" size="sm" className="rounded-xl"><Upload className="h-4 w-4 mr-2" /> Import</Button>
            <Button variant="outline" size="sm" className="rounded-xl"><Download className="h-4 w-4 mr-2" /> Export</Button>
            <Button size="sm" className="rounded-xl"><Plus className="h-4 w-4 mr-2" /> Add Product</Button>
          </div>
        </header>

        <div className="p-6">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Total Products", value: "1,024" },
              { label: "Active", value: "980" },
              { label: "Low Stock", value: "28" },
              { label: "Out of Stock", value: "16" },
            ].map((s) => (
              <div key={s.label} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200/60 dark:border-gray-800/60 p-4">
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Products Table */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 text-left text-xs text-gray-500 uppercase">
                    <th className="px-5 py-3">Product</th>
                    <th className="px-5 py-3">SKU</th>
                    <th className="px-5 py-3">Category</th>
                    <th className="px-5 py-3">Brand</th>
                    <th className="px-5 py-3">Price</th>
                    <th className="px-5 py-3">Stock</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                      <td className="px-5 py-3 font-medium">{p.name}</td>
                      <td className="px-5 py-3 text-gray-500">{p.sku}</td>
                      <td className="px-5 py-3">{p.category}</td>
                      <td className="px-5 py-3">{p.brand}</td>
                      <td className="px-5 py-3">
                        <div>
                          <span className="font-semibold">{formatPrice(p.salePrice || p.price)}</span>
                          {p.salePrice && <span className="text-xs text-gray-400 line-through ml-1">{formatPrice(p.price)}</span>}
                        </div>
                      </td>
                      <td className="px-5 py-3 font-medium">{p.stock}</td>
                      <td className="px-5 py-3">
                        <Badge variant={
                          p.status === "Active" ? "success" : p.status === "Low Stock" ? "warning" : "destructive"
                        } className="text-[10px]">{p.status}</Badge>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><Eye className="h-3.5 w-3.5" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><Pencil className="h-3.5 w-3.5" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-red-500"><Trash2 className="h-3.5 w-3.5" /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <p className="text-xs text-gray-500">Showing 1-8 of 1,024 products</p>
              <div className="flex gap-1">
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg"><ChevronLeft className="h-4 w-4" /></Button>
                {[1, 2, 3].map((p) => (
                  <Button key={p} variant={p === page ? "default" : "outline"} size="icon" className="h-8 w-8 rounded-lg">{p}</Button>
                ))}
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg"><ChevronRight className="h-4 w-4" /></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
