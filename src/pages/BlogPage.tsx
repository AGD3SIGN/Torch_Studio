import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageLayout } from '@/components/layout/PageLayout'
import { blogPosts, type BlogPost } from '@/data/blogPosts'
import { cn } from '@/lib/utils'

const CATEGORIES = ['All', 'Guide', 'Tips', 'Spotlight', 'News'] as const
type Filter = (typeof CATEGORIES)[number]

const categoryColors: Record<BlogPost['category'], string> = {
  Guide:     'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  Tips:      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  Spotlight: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  News:      'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden border border-border bg-background shadow-warm-sm hover:shadow-warm transition-shadow duration-200"
    >
      {/* Cover */}
      <div
        className="h-40 w-full flex items-end p-4"
        style={{ backgroundColor: post.coverColor }}
        aria-hidden="true"
      />

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Category + read time */}
        <div className="flex items-center justify-between">
          <span className={cn('rounded-full px-2 py-0.5 text-xs font-semibold', categoryColors[post.category])}>
            {post.category}
          </span>
          <span className="text-xs text-muted-foreground">{post.readTime}</span>
        </div>

        {/* Title */}
        <h2 className="font-display text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors duration-150">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border mt-auto">
          <span className="text-xs text-muted-foreground">
            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all duration-150">
            Read more <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export function BlogPage() {
  const [filter, setFilter] = useState<Filter>('All')

  const filtered = filter === 'All'
    ? blogPosts
    : blogPosts.filter((p) => p.category === filter)

  return (
    <PageLayout title="Blog — Torch Studio">
      {/* Header */}
      <div className="bg-secondary/40 border-b border-border">
        <div className="section-container py-10">
          <h1 className="font-display text-3xl font-bold text-foreground">Blog</h1>
          <p className="mt-2 text-muted-foreground text-sm">
            Guides, tips, creator spotlights, and product news.
          </p>
        </div>
      </div>

      <div className="section-container py-12">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter by category">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-150',
                filter === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-muted'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">No posts in this category yet.</p>
        )}
      </div>
    </PageLayout>
  )
}
