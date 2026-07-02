import { create } from "zustand"

interface UIStore {
  isMobileMenuOpen: boolean
  isSearchOpen: boolean
  isCartOpen: boolean
  isWishlistOpen: boolean
  theme: "light" | "dark"
  setMobileMenuOpen: (open: boolean) => void
  setSearchOpen: (open: boolean) => void
  setCartOpen: (open: boolean) => void
  setWishlistOpen: (open: boolean) => void
  toggleTheme: () => void
  setTheme: (theme: "light" | "dark") => void
}

export const useUIStore = create<UIStore>()((set) => ({
  isMobileMenuOpen: false,
  isSearchOpen: false,
  isCartOpen: false,
  isWishlistOpen: false,
  theme: "dark",

  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  setSearchOpen: (open) => set({ isSearchOpen: open }),
  setCartOpen: (open) => set({ isCartOpen: open }),
  setWishlistOpen: (open) => set({ isWishlistOpen: open }),
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
  setTheme: (theme) => set({ theme }),
}))
