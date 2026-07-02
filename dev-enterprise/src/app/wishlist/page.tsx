import type { Metadata } from "next"
import { WishlistContent } from "./wishlist-content"

export const metadata: Metadata = {
  title: "My Wishlist",
  description: "Your saved products and wishlist at Dev Enterprise.",
}

export default function WishlistPage() {
  return <WishlistContent />
}
