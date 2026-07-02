import { useEffect, type ReactNode } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/sections/Sections'

interface PageLayoutProps {
  title: string
  children: ReactNode
  /** Optional extra padding class. Defaults to section-container + py-12. */
  contentClass?: string
}

export function PageLayout({ title, children, contentClass }: PageLayoutProps) {
  useEffect(() => {
    document.title = title
  }, [title])

  return (
    <>
      <Navbar />
      <main id="main-content" className={contentClass}>
        {children}
      </main>
      <Footer />
    </>
  )
}
