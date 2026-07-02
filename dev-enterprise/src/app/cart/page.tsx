import type { Metadata } from "next"
import { CartContent } from "./cart-content"

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Review your shopping cart and proceed to checkout at Dev Enterprise.",
}

export default function CartPage() {
  return <CartContent />
}
