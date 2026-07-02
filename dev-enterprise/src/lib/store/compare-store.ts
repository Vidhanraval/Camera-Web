import { create } from "zustand"
import { persist } from "zustand/middleware"

interface CompareProduct {
  id: string
  name: string
  slug: string
  price: number
  salePrice: number | null
  image: string
  brand: string | null
  category: string
  specifications: Record<string, string>
}

interface CompareStore {
  items: CompareProduct[]
  addItem: (product: CompareProduct) => void
  removeItem: (productId: string) => void
  clearCompare: () => void
  isInCompare: (productId: string) => boolean
}

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        set((state) => {
          if (state.items.length >= 4) return state
          if (state.items.find((i) => i.id === product.id)) return state
          return { items: [...state.items, product] }
        })
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== productId),
        }))
      },

      clearCompare: () => set({ items: [] }),

      isInCompare: (productId) => {
        return get().items.some((i) => i.id === productId)
      },
    }),
    { name: "dev-enterprise-compare" }
  )
)
