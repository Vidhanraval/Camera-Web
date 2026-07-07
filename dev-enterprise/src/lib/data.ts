// Unified data access layer — DB-first with static fallbacks
// All functions work without a running database

import { prisma } from "@/lib/prisma"
import type { Product, Category, Brand } from "@prisma/client"

// ─── Helpers ───────────────────────────────────────

let dbAvailable = true
async function tryDB<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  if (!dbAvailable) return fallback
  try { return await fn() }
  catch { dbAvailable = false; return fallback }
}

// ─── Products ──────────────────────────────────────

export type ProductListItem = {
  id: string; name: string; slug: string; sku: string
  price: number; salePrice: number | null
  image: string; category: string; brand: string
  rating: number; reviews: number; stock: number; gstRate: number
  badges: string[]
}

const staticProducts: ProductListItem[] = [
  { id:"p1", name:"Dell Inspiron 15 — Intel i5, 8GB, 512GB SSD", slug:"dell-inspiron-15-laptop", sku:"LAP-DEL-INSP15", price:45990, salePrice:39990, image:"/images/products/dell-inspiron.jpg", category:"Laptops", brand:"Dell", rating:4.5, reviews:128, stock:25, gstRate:18, badges:["Best Seller","12% OFF"] },
  { id:"p2", name:"HP LaserJet Pro — Wireless Mono Printer", slug:"hp-laserjet-pro-printer", sku:"PRN-HP-LJPRO", price:28500, salePrice:24999, image:"/images/products/hp-laserjet.jpg", category:"Printers", brand:"HP", rating:4.8, reviews:89, stock:15, gstRate:18, badges:["Hot Deal","₹3,501 OFF"] },
  { id:"p3", name:"Hikvision 4MP IP Bullet Camera — Outdoor", slug:"hikvision-ip-cctv-camera", sku:"CCTV-HIK-IP4MP", price:4500, salePrice:3499, image:"/images/products/hikvision-ip.jpg", category:"CCTV", brand:"Hikvision", rating:4.6, reviews:256, stock:100, gstRate:18, badges:["Popular","22% OFF"] },
  { id:"p4", name:"ASUS RT-AX88U — WiFi 6 Gaming Router", slug:"asus-rt-ax88u-router", sku:"NET-ASUS-AX88U", price:18999, salePrice:15999, image:"/images/products/asus-router.jpg", category:"Networking", brand:"ASUS", rating:4.7, reviews:67, stock:20, gstRate:18, badges:["New"] },
  { id:"p5", name:"Samsung 24\" FHD Monitor — IPS, 75Hz", slug:"samsung-24-inch-monitor", sku:"MON-SAM-24FHD", price:12999, salePrice:10999, image:"/images/products/samsung-monitor.jpg", category:"Monitors", brand:"Samsung", rating:4.4, reviews:198, stock:40, gstRate:18, badges:["₹2,000 OFF"] },
  { id:"p6", name:"Zebronics Keyboard + Mouse Combo — Wired", slug:"zebronics-keyboard-mouse-combo", sku:"ACC-ZEB-KMCOMBO", price:1499, salePrice:999, image:"/images/products/zebronics-km.jpg", category:"Accessories", brand:"Zebronics", rating:4.2, reviews:345, stock:200, gstRate:18, badges:["Value Deal","33% OFF"] },
  { id:"p7", name:"Samsung 1TB SSD 870 EVO", slug:"samsung-1tb-ssd-870-evo", sku:"SSD-SAM-870-1TB", price:8999, salePrice:7499, image:"/images/products/samsung-ssd.jpg", category:"Storage", brand:"Samsung", rating:4.9, reviews:512, stock:80, gstRate:18, badges:["Top Rated"] },
  { id:"p8", name:"Canon EOS Webcam Kit", slug:"canon-eos-webcam-kit", sku:"ACC-CAN-WEBCAM", price:5999, salePrice:4999, image:"/images/products/canon-webcam.jpg", category:"Accessories", brand:"Canon", rating:4.3, reviews:78, stock:35, gstRate:18, badges:["Bundle Deal"] },
]

export async function getProducts(opts?: {
  category?: string; brand?: string; search?: string
  sort?: string; featured?: boolean; limit?: number
}): Promise<ProductListItem[]> {
  return tryDB(async () => {
    const where: Record<string, unknown> = { isActive: true }
    if (opts?.category) where.category = { slug: opts.category }
    if (opts?.brand) where.brand = { slug: opts.brand }
    if (opts?.search) where.name = { contains: opts.search, mode: "insensitive" }
    if (opts?.featured) where.isFeatured = true

    const orderBy: Record<string, string> = {}
    if (opts?.sort === "price_asc") orderBy.salePrice = "asc"
    else if (opts?.sort === "price_desc") orderBy.salePrice = "desc"
    else if (opts?.sort === "new") orderBy.createdAt = "desc"
    else orderBy.salesCount = "desc"

    const products = await prisma.product.findMany({
      where, orderBy, take: opts?.limit || 24,
      include: { category: { select: { name: true } }, brand: { select: { name: true } }, images: { where: { isPrimary: true }, take: 1 }, reviews: { select: { rating: true } } },
    })
    return products.map(p => ({
      id: p.id, name: p.name, slug: p.slug, sku: p.sku,
      price: Number(p.basePrice), salePrice: p.salePrice ? Number(p.salePrice) : null,
      image: p.images[0]?.url || "/images/products/placeholder.jpg",
      category: p.category.name, brand: p.brand?.name || "",
      rating: p.reviews.length ? p.reviews.reduce((a, r) => a + r.rating, 0) / p.reviews.length : 0,
      reviews: p.reviews.length, stock: p.stock, gstRate: Number(p.gstRate),
      badges: p.isBestSeller ? ["Best Seller"] : p.isNewArrival ? ["New"] : [],
    })) as ProductListItem[]
  }, opts?.featured ? staticProducts.slice(0, 6) : opts?.limit ? staticProducts.slice(0, opts.limit) : staticProducts)
}

export async function getProductBySlug(slug: string) {
  return tryDB(async () => {
    const p = await prisma.product.findUnique({
      where: { slug },
      include: { category: true, brand: true, images: { orderBy: { sortOrder: "asc" } }, reviews: { where: { status: "APPROVED" }, include: { user: { select: { name: true, image: true } } }, orderBy: { createdAt: "desc" } }, variants: { where: { isActive: true } } },
    })
    if (!p) return null
    return {
      id: p.id, name: p.name, slug: p.slug, sku: p.sku,
      description: p.description || "", shortDescription: p.shortDescription || "",
      highlights: p.highlights ? p.highlights.split("\n") : [],
      specifications: p.specifications as Record<string, string> | null,
      basePrice: Number(p.basePrice), salePrice: p.salePrice ? Number(p.salePrice) : null,
      wholesalePrice: p.wholesalePrice ? Number(p.wholesalePrice) : null,
      gstRate: Number(p.gstRate), hsnCode: p.hsnCode || "",
      stock: p.stock, stockStatus: p.stockStatus,
      category: { name: p.category.name, slug: p.category.slug },
      brand: p.brand ? { name: p.brand.name, slug: p.brand.slug } : null,
      images: p.images.map(i => ({ url: i.url, alt: i.alt || "", isPrimary: i.isPrimary })),
      variants: p.variants.map(v => ({ id: v.id, name: v.name, sku: v.sku, price: v.price ? Number(v.price) : null, stock: v.stock })),
      reviews: p.reviews.map(r => ({ id: r.id, rating: r.rating, title: r.title || "", content: r.content || "", user: { name: r.user.name || "Anonymous", image: r.user.image }, createdAt: r.createdAt.toISOString() })),
      reviewCount: p.reviews.length,
      avgRating: p.reviews.length ? p.reviews.reduce((a, r) => a + r.rating, 0) / p.reviews.length : 0,
      isFeatured: p.isFeatured,
    }
  }, null)
}

// ─── Categories ────────────────────────────────────

export type CategoryItem = { name: string; slug: string; description: string; icon: string; count: number; children?: CategoryItem[] }

const staticCategories: CategoryItem[] = [
  { name:"Desktop Computers", slug:"computers/desktop", description:"Gaming, workstation, all-in-one PCs", icon:"Monitor", count:120 },
  { name:"Laptops", slug:"laptops", description:"Business, gaming, student laptops", icon:"Laptop", count:85 },
  { name:"Printers", slug:"printers", description:"Laser, inkjet, all-in-one", icon:"Printer", count:60 },
  { name:"CCTV Cameras", slug:"cctv-cameras", description:"IP cameras, DVR, full setup", icon:"Camera", count:95 },
  { name:"Networking", slug:"networking", description:"Routers, switches, mesh WiFi", icon:"Router", count:70 },
  { name:"Storage", slug:"storage", description:"SSD, HDD, RAM upgrades", icon:"HardDrive", count:45 },
  { name:"Accessories", slug:"accessories", description:"Keyboard, mouse, webcams, cables", icon:"Headphones", count:200 },
  { name:"Components", slug:"components", description:"Motherboard, PSU, UPS, cabinets", icon:"Cpu", count:150 },
]

export async function getCategories(): Promise<CategoryItem[]> {
  return tryDB(async () => {
    const cats = await prisma.category.findMany({ where: { isActive: true }, include: { _count: { select: { products: true } }, children: true }, orderBy: { sortOrder: "asc" } })
    return cats.map(c => ({ name: c.name, slug: c.slug, description: c.description || "", icon: c.icon || "", count: c._count.products, children: c.children.map(ch => ({ name: ch.name, slug: ch.slug, description: "", icon: "", count: 0 })) })) as CategoryItem[]
  }, staticCategories)
}

// ─── Brands ────────────────────────────────────────

export type BrandItem = { name: string; slug: string }

const staticBrands: BrandItem[] = [
  { name:"Dell", slug:"dell" },{ name:"HP", slug:"hp" },{ name:"Lenovo", slug:"lenovo" },
  { name:"ASUS", slug:"asus" },{ name:"Acer", slug:"acer" },{ name:"Canon", slug:"canon" },
  { name:"Brother", slug:"brother" },{ name:"Epson", slug:"epson" },{ name:"Samsung", slug:"samsung" },
  { name:"LG", slug:"lg" },{ name:"Zebronics", slug:"zebronics" },{ name:"Hikvision", slug:"hikvision" },
]

export async function getBrands(): Promise<BrandItem[]> {
  return tryDB(async () => {
    const brands = await prisma.brand.findMany({ where: { isActive: true }, orderBy: { name: "asc" } })
    return brands.map(b => ({ name: b.name, slug: b.slug })) as BrandItem[]
  }, staticBrands)
}

// ─── Blog ──────────────────────────────────────────

export type BlogPostItem = { id:string; title:string; slug:string; excerpt:string; image:string; author:string; date:string; tags:string[] }

const staticBlogPosts: BlogPostItem[] = [
  { id:"b1", title:"How to Choose the Right CCTV System for Your Business", slug:"choose-right-cctv-system", excerpt:"A complete guide to selecting the perfect surveillance setup based on your requirements, budget, and property size.", image:"/images/blog/cctv-guide.jpg", author:"Dev Enterprise", date:"2024-12-15", tags:["CCTV","Security","Guide"] },
  { id:"b2", title:"Desktop vs Laptop: Which One Should You Buy in 2025?", slug:"desktop-vs-laptop-2025", excerpt:"We break down the pros and cons to help you decide between a desktop PC and a laptop for your needs.", image:"/images/blog/desktop-vs-laptop.jpg", author:"Dev Enterprise", date:"2024-12-10", tags:["Computers","Laptops","Comparison"] },
  { id:"b3", title:"Printer Buying Guide: Inkjet vs Laser vs All-in-One", slug:"printer-buying-guide", excerpt:"Understanding different printer technologies to make the right choice for home or office use.", image:"/images/blog/printer-guide.jpg", author:"Dev Enterprise", date:"2024-12-05", tags:["Printers","Guide"] },
  { id:"b4", title:"Top 10 Networking Tips for Small Offices", slug:"networking-tips-small-office", excerpt:"Simple yet effective networking strategies to keep your small office connected and productive.", image:"/images/blog/networking-tips.jpg", author:"Dev Enterprise", date:"2024-11-28", tags:["Networking","Tips"] },
  { id:"b5", title:"Why Buy from Authorized Dealers? 5 Key Benefits", slug:"benefits-authorized-dealers", excerpt:"From warranty to genuine products — here's why you should always choose authorized dealers.", image:"/images/blog/authorized-dealer.jpg", author:"Dev Enterprise", date:"2024-11-20", tags:["Guide","Tips"] },
  { id:"b6", title:"SSD vs HDD: Speed, Price, and Reliability Compared", slug:"ssd-vs-hdd-comparison", excerpt:"Everything you need to know about storage drives before your next upgrade.", image:"/images/blog/ssd-vs-hdd.jpg", author:"Dev Enterprise", date:"2024-11-15", tags:["Storage","Comparison"] },
]

export async function getBlogPosts(): Promise<BlogPostItem[]> {
  return tryDB(async () => {
    const posts = await prisma.blogPost.findMany({ where: { isPublished: true }, orderBy: { publishedAt: "desc" } })
    return posts.map(p => ({ id:p.id, title:p.title, slug:p.slug, excerpt:p.excerpt||"", image:p.image||"", author:p.author||"Dev Enterprise", date:p.publishedAt?.toISOString().split("T")[0]||"", tags:p.tags?p.tags.split(","):[] })) as BlogPostItem[]
  }, staticBlogPosts)
}

// ─── FAQs ──────────────────────────────────────────

export type FaqItem = { q: string; a: string }

const staticFaqs: FaqItem[] = [
  { q:"What brands do you sell?", a:"We are an authorized dealer for Dell, HP, Lenovo, ASUS, Acer, Canon, Brother, Epson, Samsung, LG, Zebronics, Hikvision, and more. All products come with manufacturer warranty." },
  { q:"What are your shipping charges?", a:"We offer free shipping on all orders above ₹5,000. For orders below ₹5,000, a nominal shipping fee of ₹299 applies. We deliver across India." },
  { q:"How long does delivery take?", a:"Orders are typically dispatched within 24 hours. Delivery to major cities takes 2-4 business days. Remote areas may take 5-7 business days." },
  { q:"What is your return policy?", a:"We offer a 7-day replacement guarantee for defective products. Simply contact our support team and we will arrange a replacement at no extra cost." },
  { q:"Do you offer installation services?", a:"Yes! We provide professional installation for CCTV systems, networking equipment, and complete office IT setup. Contact us for a custom quote." },
  { q:"Can I get bulk or wholesale pricing?", a:"Absolutely. We offer special pricing for bulk orders, businesses, schools, and government institutions. Contact our sales team for a quote." },
  { q:"What payment methods do you accept?", a:"We accept UPI, credit/debit cards, net banking, Cash on Delivery, and bank transfers. All online payments are processed securely." },
  { q:"Do you provide warranty on products?", a:"Yes, all products come with the manufacturer's standard warranty. Duration varies by product and brand. We assist with all warranty claims." },
]

export async function getFaqs(): Promise<FaqItem[]> {
  return tryDB(async () => { return staticFaqs }, staticFaqs)
}

// ─── Testimonials ──────────────────────────────────

export type TestimonialItem = { id:number; name:string; role:string; avatar:string; rating:number; content:string }

const staticTestimonials: TestimonialItem[] = [
  { id:1, name:"Rajesh Sharma", role:"IT Manager, Mumbai", avatar:"RS", rating:5, content:"Ordered 50 Dell workstations for our office. Dev Enterprise handled everything — competitive pricing, on-time delivery, and their after-sales support is genuinely good. They actually pick up the phone." },
  { id:2, name:"Priya Patel", role:"Cafe Owner, Pune", avatar:"PP", rating:5, content:"Needed CCTV cameras for my restaurant. Their team visited the site, suggested the right cameras, installed everything professionally, and even trained my staff on using the app. Zero headache." },
  { id:3, name:"Amit Verma", role:"Student, Delhi", avatar:"AV", rating:5, content:"Compared prices on Amazon, Flipkart, and 3 local shops — Dev Enterprise gave me the best deal on my ASUS laptop. Genuine sealed-box product. Saved almost ₹3,000." },
]

export async function getTestimonials(): Promise<TestimonialItem[]> {
  return tryDB(async () => { return staticTestimonials }, staticTestimonials)
}
