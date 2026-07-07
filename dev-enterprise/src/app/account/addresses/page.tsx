"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, MapPin, Pencil, Trash2, Home, Briefcase, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { toast } from "sonner"

const initialAddresses = [
  { id: "a1", fullName: "Rahul Sharma", phone: "9876543210", addressLine1: "42, Tech Park Road, Koramangala", addressLine2: "Near Wipro Park", city: "Bangalore", state: "Karnataka", pincode: "560034", type: "HOME", isDefault: true },
  { id: "a2", fullName: "Rahul Sharma", phone: "9876543210", addressLine1: "Office No. 15, Cyber Hub", addressLine2: "DLF Phase 3", city: "Gurgaon", state: "Haryana", pincode: "122002", type: "WORK", isDefault: false },
]

const typeIcons: Record<string, typeof Home> = { HOME: Home, WORK: Briefcase, OTHER: Building2 }

export default function AddressesPage() {
  const [addresses, setAddresses] = useState(initialAddresses)
  const [editing, setEditing] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  const handleDelete = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id))
    toast.success("Address deleted")
  }

  return (
    <div className="bg-gray-50/50 dark:bg-gray-950/50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "Account", href: "/account/dashboard" }, { label: "Addresses" }]} className="mb-6" />

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-extrabold mb-1">My Addresses</h1>
            <p className="text-gray-500 dark:text-gray-400">{addresses.length} saved addresses</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl">
                <Plus className="h-4 w-4 mr-2" /> Add Address
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader><DialogTitle>Add New Address</DialogTitle></DialogHeader>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="col-span-2"><Label>Full Name</Label><Input className="mt-1" /></div>
                <div className="col-span-2"><Label>Phone</Label><Input className="mt-1" /></div>
                <div className="col-span-2"><Label>Address</Label><Textarea className="mt-1 min-h-[60px]" /></div>
                <div><Label>City</Label><Input className="mt-1" /></div>
                <div><Label>State</Label><Input className="mt-1" /></div>
                <div><Label>Pincode</Label><Input className="mt-1" /></div>
                <div className="col-span-2 flex gap-2 mt-1">
                  {["HOME", "WORK", "OTHER"].map((t) => (
                    <Button key={t} variant="outline" size="sm" className="rounded-lg">{t}</Button>
                  ))}
                </div>
                <div className="col-span-2">
                  <Button className="w-full rounded-xl" onClick={() => { setOpen(false); toast.success("Address added!") }}>Save Address</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {addresses.map((addr, i) => {
            const Icon = typeIcons[addr.type] || Home
            return (
              <motion.div key={addr.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className={`p-5 relative ${addr.isDefault ? "border-amber-300 dark:border-amber-700 ring-2 ring-amber-500/20" : ""}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-amber-600" />
                      <span className="text-sm font-semibold">{addr.type}</span>
                      {addr.isDefault && <Badge variant="premium" className="text-[10px]">Default</Badge>}
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><Pencil className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-red-500" onClick={() => handleDelete(addr.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </div>
                  <p className="font-semibold text-sm">{addr.fullName}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{addr.phone}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {addr.addressLine1}, {addr.addressLine2}<br />
                    {addr.city}, {addr.state} — {addr.pincode}
                  </p>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
