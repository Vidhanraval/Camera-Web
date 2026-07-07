import type { Metadata } from "next"
import Link from "next/link"
import { Calendar, User, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { getBlogPosts } from "@/lib/data"

export const metadata: Metadata = {
  title: "Blog — Tech Guides & Updates",
  description: "Read technology guides, product reviews, buying advice, and IT tips from the experts at Dev Enterprise.",
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="bg-gray-50/50 dark:bg-gray-950/50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "Blog" }]} className="mb-6" />
        <div className="mb-10">
          <h1 className="text-2xl lg:text-4xl font-extrabold tracking-tight mb-3">Blog</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl">
            Technology guides, product reviews, and buying advice from the experts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="group p-6 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                  <span className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</span>
                </div>
                <h2 className="font-bold text-base mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-4">{post.excerpt}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
                  ))}
                </div>
                <span className="text-sm font-semibold text-amber-600 dark:text-amber-400 group-hover:underline inline-flex items-center gap-1">
                  Read More <ArrowRight className="h-3 w-3" />
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
