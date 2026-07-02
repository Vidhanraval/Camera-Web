import type { Metadata } from "next"
import { CheckoutContent } from "./checkout-content"

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your purchase securely at Dev Enterprise. Multiple payment options available.",
}

export default function CheckoutPage() {
  return <CheckoutContent />
}
