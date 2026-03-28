import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowLeft, Clock, Tag } from 'lucide-react'
import { PageLayout } from '@/components/layout/PageLayout'
import { blogPosts, type BlogPost } from '@/data/blogPosts'
import { cn } from '@/lib/utils'

const categoryColors: Record<BlogPost['category'], string> = {
  Guide:     'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  Tips:      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  Spotlight: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  News:      'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
}

function renderBody(body: string) {
  const paragraphs = body.split('\n\n')
  return paragraphs.map((block, i) => {
    if (block.startsWith('## ')) {
      return (
        <h2 key={i} className="font-display text-2xl font-bold text-foreground mt-8 mb-3">
          {block.slice(3)}
        </h2>
      )
    }
    if (block.startsWith('- ') || block.includes('\n- ')) {
      const items = block.split('\n').filter((l) => l.trim())
      return (
        <ul key={i} className="flex flex-col gap-1.5 my-4 pl-1">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-foreground leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              {item.replace(/^-\s+/, '')}
            </li>
          ))}
        </ul>
      )
    }
    if (/^\d+\.\s/.test(block) || block.split('\n').every((l) => /^\d+\.\s/.test(l.trim()))) {
      const items = block.split('\n').filter((l) => l.trim())
      return (
        <ol key={i} className="flex flex-col gap-1.5 my-4 pl-1 list-decimal list-inside">
          {items.map((item, j) => (
            <li key={j} className="text-foreground leading-relaxed">
              {item.replace(/^\d+\.\s+/, '')}
            </li>
          ))}
        </ol>
      )
    }
    // Inline bold (**text**)
    const parts = block.split(/(\*\*[^*]+\*\*)/g)
    return (
      <p key={i} className="text-foreground leading-relaxed my-4">
        {parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j} className="font-semibold">{part.slice(2, -2)}</strong>
          }
          return part
        })}
      </p>
    )
  })
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) return <Navigate to="/blog" replace />

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3)

  return (
    <PageLayout title={`${post.title} — Torch Studio Blog`}>
      {/* Colored hero banner */}
      <div
        className="w-full h-56 md:h-72 flex items-end"
        style={{ backgroundColor: post.coverColor }}
        aria-hidden="true"
      />

      <div className="section-container py-10">
        <div className="max-w-2xl mx-auto">
          {/* Back link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-semibold', categoryColors[post.category])}>
              <Tag className="inline h-3 w-3 mr-1" aria-hidden="true" />
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" aria-hidden="true" />
              {post.readTime}
            </span>
            <span className="text-xs text-muted-foreground">
              {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6">
            {post.title}
          </h1>

          {/* Excerpt lead */}
          <p className="text-lg text-muted-foreground leading-relaxed border-l-4 border-primary pl-4 mb-8">
            {post.excerpt}
          </p>

          {/* Body */}
          <div className="prose-torch">{renderBody(post.body)}</div>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="max-w-2xl mx-auto mt-16 pt-10 border-t border-border">
            <h2 className="font-display text-xl font-bold text-foreground mb-6">More from the Blog</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((rp) => (
                <Link
                  key={rp.slug}
                  to={`/blog/${rp.slug}`}
                  className="group rounded-xl overflow-hidden border border-border bg-background shadow-warm-sm hover:shadow-warm transition-shadow duration-200"
                >
                  <div className="h-20 w-full" style={{ backgroundColor: rp.coverColor }} aria-hidden="true" />
                  <div className="p-3">
                    <span className={cn('rounded-full px-2 py-0.5 text-xs font-semibold', categoryColors[rp.category])}>
                      {rp.category}
                    </span>
                    <p className="mt-2 text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {rp.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  )
}
