"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  CreditCard, Banknote, Smartphone, Building2, Truck,
  Shield, ChevronLeft, Check, Plus, MapPin, Phone, Mail
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { formatPrice } from "@/lib/utils"
import { useCartStore } from "@/lib/store/cart-store"

export function CheckoutContent() {
  const { items, getSubtotal, getGST, getTotal, clearCart } = useCartStore()
  const [step, setStep] = useState<"shipping" | "payment" | "confirm">("shipping")
  const [paymentMethod, setPaymentMethod] = useState("razorpay")

  const subtotal = getSubtotal()
  const gst = getGST()
  const total = getTotal()
  const shipping = subtotal > 5000 ? 0 : 299

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-extrabold mb-3">Your cart is empty</h1>
        <Link href="/shop">
          <Button className="rounded-xl">Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  const paymentMethods = [
    { id: "razorpay", name: "Razorpay", icon: CreditCard, desc: "UPI, Cards, Net Banking, Wallets" },
    { id: "upi", name: "UPI", icon: Smartphone, desc: "Google Pay, PhonePe, Paytm" },
    { id: "card", name: "Credit / Debit Card", icon: CreditCard, desc: "Visa, Mastercard, RuPay, Amex" },
    { id: "netbanking", name: "Net Banking", icon: Building2, desc: "All major banks supported" },
    { id: "cod", name: "Cash on Delivery", icon: Banknote, desc: "Pay when you receive your order" },
  ]

  const handlePlaceOrder = () => {
    clearCart()
    window.location.href = "/account/orders?order=confirmed"
  }

  return (
    <div className="bg-gray-50/50 dark:bg-gray-950/50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "Cart", href: "/cart" }, { label: "Checkout" }]} className="mb-6" />

        {/* Steps */}
        <div className="flex items-center gap-4 mb-10">
          {["Shipping", "Payment", "Confirm"].map((s, i) => {
            const isActive = step === s.toLowerCase()
            const isDone = (step === "payment" && i === 0) || (step === "confirm" && i < 2)
            return (
              <div key={s} className="flex items-center gap-2">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  isActive || isDone ? "bg-amber-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                }`}>
                  {isDone ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <span className={`text-sm font-medium ${isActive ? "text-amber-600" : "text-gray-500"}`}>
                  {s}
                </span>
                {i < 2 && <div className="w-8 h-px bg-gray-300 dark:bg-gray-600" />}
              </div>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {step === "shipping" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-amber-600" /> Shipping Address
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label>Full Name *</Label>
                    <Input placeholder="Enter your full name" className="mt-1.5" />
                  </div>
                  <div>
                    <Label>Phone *</Label>
                    <Input placeholder="10-digit mobile" type="tel" className="mt-1.5" />
                  </div>
                  <div>
                    <Label>Alternate Phone</Label>
                    <Input placeholder="Optional" type="tel" className="mt-1.5" />
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Address Line 1 *</Label>
                    <Textarea placeholder="House/Flat No., Building, Street" className="mt-1.5 min-h-[60px]" />
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Address Line 2</Label>
                    <Input placeholder="Locality, Landmark (optional)" className="mt-1.5" />
                  </div>
                  <div>
                    <Label>City *</Label>
                    <Input placeholder="City" className="mt-1.5" />
                  </div>
                  <div>
                    <Label>State *</Label>
                    <Input placeholder="State" className="mt-1.5" />
                  </div>
                  <div>
                    <Label>Pincode *</Label>
                    <Input placeholder="6-digit pincode" className="mt-1.5" maxLength={6} />
                  </div>
                  <div>
                    <Label>Address Type</Label>
                    <div className="flex gap-2 mt-1.5">
                      {["Home", "Work", "Other"].map((type) => (
                        <Button key={type} variant="outline" size="sm" className="rounded-lg text-xs">
                          {type}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-6 rounded-xl" size="lg" onClick={() => setStep("payment")}>
                  Continue to Payment <ChevronLeft className="h-4 w-4 ml-2 rotate-180" />
                </Button>
              </motion.div>
            )}

            {step === "payment" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 p-6">
                <h2 className="text-xl font-bold mb-6">Payment Method</h2>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        paymentMethod === method.id
                          ? "border-amber-600 bg-amber-50 dark:bg-amber-950/30"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <RadioGroupItem value={method.id} />
                      <div className="h-10 w-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <method.icon className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{method.name}</p>
                        <p className="text-xs text-gray-500">{method.desc}</p>
                      </div>
                    </label>
                  ))}
                </RadioGroup>
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" className="rounded-xl" onClick={() => setStep("shipping")}>
                    <ChevronLeft className="h-4 w-4 mr-2" /> Back
                  </Button>
                  <Button className="flex-1 rounded-xl" size="lg" onClick={() => setStep("confirm")}>
                    Review Order
                  </Button>
                </div>
              </motion.div>
            )}

            {step === "confirm" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 p-6">
                <h2 className="text-xl font-bold mb-6">Confirm Your Order</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300 text-sm">
                    <Shield className="h-5 w-5" />
                    Your order is protected. Secure checkout powered by Razorpay.
                  </div>
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 py-2">
                      <div className="h-12 w-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs text-gray-400 shrink-0">
                        {item.product.brand}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.product.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-bold">{formatPrice((item.product.salePrice || item.product.price) * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" className="rounded-xl" onClick={() => setStep("payment")}>
                    <ChevronLeft className="h-4 w-4 mr-2" /> Back
                  </Button>
                  <Button className="flex-1 rounded-xl" size="lg" variant="premium" onClick={handlePlaceOrder}>
                    <Shield className="h-4 w-4 mr-2" /> Place Order — {formatPrice(total + shipping)}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <div className="sticky top-24 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 p-6">
              <h3 className="text-lg font-bold mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm mb-4">
                {items.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span className="text-gray-500 truncate max-w-[180px]">{item.product.name}</span>
                    <span className="font-medium">×{item.quantity}</span>
                  </div>
                ))}
                {items.length > 3 && (
                  <p className="text-xs text-amber-600">+{items.length - 3} more items</p>
                )}
              </div>
              <Separator />
              <div className="space-y-2 mt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className={shipping === 0 ? "text-green-600" : ""}>
                    {shipping === 0 ? "FREE" : formatPrice(shipping)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-amber-700 dark:text-amber-400">{formatPrice(total + shipping)}</span>
                </div>
              </div>
              <div className="mt-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 flex items-center gap-2 text-xs text-amber-700 dark:text-amber-300">
                <Truck className="h-4 w-4 shrink-0" />
                {shipping === 0 ? "Free delivery on this order!" : `Add ${formatPrice(5000 - subtotal)} more for free shipping`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
