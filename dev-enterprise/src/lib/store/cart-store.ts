import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface CartProduct {
  id: string
  name: string
  slug: string
  sku: string
  price: number
  salePrice: number | null
  image: string
  stock: number
  category: string
  brand: string | null
  gstRate: number
}

export interface CartItem {
  id: string
  product: CartProduct
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (product: CartProduct, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getItemCount: () => number
  getSubtotal: () => number
  getGST: () => number
  getTotal: () => number
  getDiscount: (couponValue?: number, couponType?: string) => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existing = state.items.find(
            (item) => item.product.id === product.id
          )
          if (existing) {
            const newQty = Math.min(
              existing.quantity + quantity,
              product.stock
            )
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: newQty }
                  : item
              ),
            }
          }
          return {
            items: [
              ...state.items,
              { id: crypto.randomUUID(), product, quantity: Math.min(quantity, product.stock) },
            ],
          }
        })
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }))
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: Math.min(quantity, item.product.stock) }
              : item
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      getItemCount: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0)
      },

      getSubtotal: () => {
        return get().items.reduce((acc, item) => {
          const price = item.product.salePrice || item.product.price
          return acc + price * item.quantity
        }, 0)
      },

      getGST: () => {
        return get().items.reduce((acc, item) => {
          const price = item.product.salePrice || item.product.price
          const itemTotal = price * item.quantity
          return acc + itemTotal * (item.product.gstRate / 100)
        }, 0)
      },

      getTotal: () => {
        const subtotal = get().getSubtotal()
        const gst = get().getGST()
        return subtotal + gst
      },

      getDiscount: (couponValue = 0, couponType = "PERCENTAGE") => {
        const subtotal = get().getSubtotal()
        if (couponType === "PERCENTAGE") {
          return subtotal * (couponValue / 100)
        }
        return Math.min(couponValue, subtotal)
      },
    }),
    { name: "dev-enterprise-cart" }
  )
)
