import type { Metadata } from "next"
import Link from "next/link"
import { Calendar, User, ArrowRight, Tag } from "lucide-react"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Blog — Tech Guides & Updates",
  description: "Read technology guides, product reviews, buying advice, and IT tips from the experts at Dev Enterprise.",
}

const posts = [
  {
    title: "How to Choose the Right CCTV System for Your Business",
    excerpt: "A comprehensive guide to selecting the perfect surveillance setup — from camera types to storage options.",
    author: "Dev Enterprise Team",
    date: "2024-12-20",
    category: "CCTV",
    slug: "choose-right-cctv-system-business",
    image: "/images/blog/cctv-guide.jpg",
  },
  {
    title: "Desktop vs Laptop: Which Should You Buy in 2025?",
    excerpt: "Break down the pros and cons to help you decide between a desktop computer and a laptop for your needs.",
    author: "Tech Desk",
    date: "2024-11-15",
    category: "Computers",
    slug: "desktop-vs-laptop-2025",
    image: "/images/blog/desktop-vs-laptop.jpg",
  },
  {
    title: "Complete Guide to WiFi 6 and Mesh Networking",
    excerpt: "Everything you need to know about the latest WiFi technology and how mesh systems can eliminate dead zones.",
    author: "Network Expert",
    date: "2024-10-28",
    category: "Networking",
    slug: "wifi-6-mesh-networking-guide",
    image: "/images/blog/wifi6-guide.jpg",
  },
  {
    title: "Printer Buying Guide: Inkjet vs Laser vs All-in-One",
    excerpt: "Compare printer types, understand running costs, and find the perfect printer for home or office use.",
    author: "Dev Enterprise Team",
    date: "2024-10-10",
    category: "Printers",
    slug: "printer-buying-guide-inkjet-laser-aio",
    image: "/images/blog/printer-guide.jpg",
  },
  {
    title: "Top 10 Computer Accessories to Boost Your Productivity",
    excerpt: "From ergonomic keyboards to USB hubs — discover accessories that can transform your workflow.",
    author: "Tech Desk",
    date: "2024-09-22",
    category: "Accessories",
    slug: "top-10-computer-accessories-productivity",
    image: "/images/blog/accessories-guide.jpg",
  },
  {
    title: "SSD vs HDD: Understanding Storage Technology",
    excerpt: "Learn the differences between SSDs and HDDs, and make an informed choice for your upgrade or new build.",
    author: "Storage Expert",
    date: "2024-09-05",
    category: "Storage",
    slug: "ssd-vs-hdd-storage-technology",
    image: "/images/blog/ssd-vs-hdd.jpg",
  },
]

export default function BlogPage() {
  return (
    <div className="bg-gray-50/50 dark:bg-gray-950/50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "Blog" }]} className="mb-6" />

        <div className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-3">Blog</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl">
            Technology guides, product reviews, buying advice, and expert tips from the Dev Enterprise team.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="group h-full overflow-hidden hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center">
                  <span className="text-3xl font-bold text-blue-300 dark:text-blue-700">{post.category[0]}</span>
                </div>
                <div className="p-5">
                  <Badge variant="secondary" className="mb-3">{post.category}</Badge>
                  <h3 className="font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
