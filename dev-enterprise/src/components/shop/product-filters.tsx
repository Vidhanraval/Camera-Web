"use client"

import { useState } from "react"
import { ChevronDown, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BRANDS, SORT_OPTIONS } from "@/lib/constants"

const categories = [
  "Desktop Computers", "Gaming PCs", "Workstations", "All in One PCs",
  "Laptops", "Monitors", "Printers", "Printer Accessories",
  "CCTV Cameras", "IP Cameras", "DVR", "NVR", "Switches",
  "SSD", "HDD", "RAM", "UPS", "Keyboard", "Mouse",
  "Speaker", "Headphone", "Microphone", "USB Hub",
  "Power Adapter", "Laptop Battery", "HDMI Cable", "VGA Cable",
  "DP Cable", "Cat6 Cable", "RJ45", "BNC", "Junction Box",
  "Wireless HDMI", "USB to LAN", "Cabinets", "SMPS", "Pen Drive",
]

const priceRanges = [
  { label: "Under ₹1,000", min: 0, max: 1000 },
  { label: "₹1,000 – ₹5,000", min: 1000, max: 5000 },
  { label: "₹5,000 – ₹20,000", min: 5000, max: 20000 },
  { label: "₹20,000 – ₹50,000", min: 20000, max: 50000 },
  { label: "₹50,000 – ₹1,00,000", min: 50000, max: 100000 },
  { label: "Above ₹1,00,000", min: 100000, max: Infinity },
]

interface ProductFiltersProps {
  selectedCategory?: string
  selectedBrand?: string
}

export function ProductFilters({ selectedCategory, selectedBrand }: ProductFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "category",
    "price",
    "brand",
  ])
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    )
  }

  const filters = (
    <div className="space-y-6">
      {/* Active Filters */}
      <div className="flex flex-wrap gap-2">
        {selectedCategory && (
          <Badge variant="secondary" className="gap-1 rounded-lg">
            {selectedCategory} <span className="cursor-pointer ml-1">×</span>
          </Badge>
        )}
        {selectedBrand && (
          <Badge variant="secondary" className="gap-1 rounded-lg">
            {selectedBrand} <span className="cursor-pointer ml-1">×</span>
          </Badge>
        )}
      </div>

      {/* Category Filter */}
      <FilterSection
        title="Category"
        section="category"
        expandedSections={expandedSections}
        onToggle={toggleSection}
      >
        <div className="space-y-1 max-h-60 overflow-y-auto">
          {categories.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer text-sm"
            >
              <Checkbox
                checked={selectedCategory === cat}
                className="rounded-md"
              />
              {cat}
            </label>
          ))}
        </div>
      </FilterSection>

      <Separator />

      {/* Price Range */}
      <FilterSection
        title="Price Range"
        section="price"
        expandedSections={expandedSections}
        onToggle={toggleSection}
      >
        <div className="space-y-1">
          {priceRanges.map((range) => (
            <label
              key={range.label}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer text-sm"
            >
              <Checkbox className="rounded-md" />
              {range.label}
            </label>
          ))}
        </div>
        <div className="flex gap-2 mt-3">
          <Input
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
            className="h-9 text-sm"
          />
          <Input
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
            className="h-9 text-sm"
          />
        </div>
        <Button size="sm" variant="outline" className="w-full mt-2 rounded-lg text-xs">
          Apply Price
        </Button>
      </FilterSection>

      <Separator />

      {/* Brand Filter */}
      <FilterSection
        title="Brand"
        section="brand"
        expandedSections={expandedSections}
        onToggle={toggleSection}
      >
        <div className="space-y-1 max-h-48 overflow-y-auto">
          {BRANDS.map((brand) => (
            <label
              key={brand.slug}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer text-sm"
            >
              <Checkbox
                checked={selectedBrand === brand.name}
                className="rounded-md"
              />
              {brand.name}
            </label>
          ))}
        </div>
      </FilterSection>

      <Separator />

      {/* Availability */}
      <FilterSection
        title="Availability"
        section="availability"
        expandedSections={expandedSections}
        onToggle={toggleSection}
      >
        <div className="space-y-1">
          {["In Stock", "Out of Stock"].map((status) => (
            <label
              key={status}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer text-sm"
            >
              <Checkbox className="rounded-md" />
              {status}
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  )

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block sticky top-24">
        <div className="bg-white dark:bg-gray-950 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </h3>
          {filters}
        </div>
      </div>

      {/* Mobile Filters */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full rounded-xl">
              <SlidersHorizontal className="h-4 w-4 mr-2" /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] overflow-y-auto">
            <h3 className="font-semibold text-lg mb-6">Filters</h3>
            {filters}
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

function FilterSection({
  title,
  section,
  expandedSections,
  onToggle,
  children,
}: {
  title: string
  section: string
  expandedSections: string[]
  onToggle: (section: string) => void
  children: React.ReactNode
}) {
  const isExpanded = expandedSections.includes(section)

  return (
    <div>
      <button
        onClick={() => onToggle(section)}
        className="flex items-center justify-between w-full text-sm font-semibold mb-2 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
      >
        {title}
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-300",
            isExpanded && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden min-h-0">
          {children}
        </div>
      </div>
    </div>
  )
}
