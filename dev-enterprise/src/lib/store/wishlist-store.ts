import { create } from "zustand"
import { persist } from "zustand/middleware"

interface WishlistProduct {
  id: string
  name: string
  slug: string
  price: number
  salePrice: number | null
  image: string
  stock: number
  category: string
}

interface WishlistStore {
  items: WishlistProduct[]
  addItem: (product: WishlistProduct) => void
  removeItem: (productId: string) => void
  clearWishlist: () => void
  isInWishlist: (productId: string) => boolean
  toggleItem: (product: WishlistProduct) => void
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        set((state) => {
          if (state.items.find((i) => i.id === product.id)) return state
          return { items: [...state.items, product] }
        })
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== productId),
        }))
      },

      clearWishlist: () => set({ items: [] }),

      isInWishlist: (productId) => {
        return get().items.some((i) => i.id === productId)
      },

      toggleItem: (product) => {
        if (get().isInWishlist(product.id)) {
          get().removeItem(product.id)
        } else {
          get().addItem(product)
        }
      },
    }),
    { name: "dev-enterprise-wishlist" }
  )
)
