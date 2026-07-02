/**
 * Torch Studio — CatalogPage
 *
 * Design system: formal, architectural, Reluxe/Noize-inspired.
 * - Oversized section headline with overline label
 * - Sharp corners everywhere (no rounded-xl cards)
 * - Bordered row list matching the CatalogPreview on the homepage
 * - Flat filter sidebar with no rounded inputs
 * - Amber (primary) used only for active states and CTAs
 * - Index numbers in mono font for structural accent
 */

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Search, Play, Pause, Download, SlidersHorizontal, X,
  Loader2, Check, LogIn, ArrowUpRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/sections/Sections'
import { useAuth } from '@/context/AuthContext'
import { useAudioPlayer } from '@/hooks/useAudioPlayer'
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback'
import { tracks, type Track } from '@/data/tracks'
import { downloadTrack } from '@/utils/download'
import { generateWaveformHeights } from '@/utils/waveform'
import { cn } from '@/lib/utils'

/* ─── Static data ──────────────────────────────────────────────────────────── */

const GENRES = ['Lo-Fi', 'Chill-Hop', 'Phonk', 'Melancholic', 'Ambient', 'Rock', 'Cinematic']
const MOODS  = ['Chill', 'Energetic', 'Dark', 'Uplifting', 'Melancholic'] as const

const PRICE_OPTIONS = [
  { label: 'Any price',  value: 'any'    },
  { label: 'Under $1',   value: 'under1' },
  { label: 'Under $2',   value: 'under2' },
  { label: '$2.99+',     value: '2.99'   },
]
const DURATION_OPTIONS = [
  { label: 'Any length', value: 'any'    },
  { label: 'Under 2 min',value: 'under2' },
  { label: '2–4 min',    value: '2to4'  },
  { label: '4+ min',     value: 'over4'  },
]
const SORT_OPTIONS = [
  { label: 'Most popular',    value: 'popular'   },
  { label: 'Newest',          value: 'newest'    },
  { label: 'Price: low–high', value: 'price_asc' },
  { label: 'BPM',             value: 'bpm'       },
]

/* Pre-compute waveform heights per track — deterministic, no layout shift */
const waveHeights: Record<number, number[]> = Object.fromEntries(
  tracks.map((t) => [t.id, generateWaveformHeights(t.id, 20)])
)

/* ─── Auth prompt modal ─────────────────────────────────────────────────────── */

function AuthPromptModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-background border border-border w-full max-w-sm p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon block — square, formal */}
        <div className="flex h-12 w-12 items-center justify-center bg-primary/10 mx-auto mb-5">
          <LogIn className="h-5 w-5 text-primary" />
        </div>

        {/* Overline */}
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-3">
          Account required
        </p>

        <h2 className="font-display text-xl font-bold text-foreground mb-2 leading-snug">
          Sign in to download
        </h2>
        <p className="text-muted-foreground text-sm mb-7 leading-relaxed">
          Create a free account to download CC0 tracks for any project — no subscription needed.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            to="/sign-in?mode=register"
            onClick={onClose}
            className="inline-flex items-center justify-center w-full h-11 bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wide hover:bg-accent transition-colors duration-200"
          >
            Create free account
          </Link>
          <Link
            to="/sign-in"
            onClick={onClose}
            className="inline-flex items-center justify-center w-full h-11 border border-border text-foreground font-semibold text-sm hover:bg-secondary transition-colors duration-200"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}

/* ─── Download button ───────────────────────────────────────────────────────── */

function DownloadButton({ track, onDownload }: { track: Track; onDownload: (t: Track) => void }) {
  const [downloading, setDownloading] = useState(false)
  const [done, setDone]               = useState(false)

  const handle = async () => {
    setDownloading(true)
    try {
      await onDownload(track)
      setDone(true)
      setTimeout(() => setDone(false), 3000)
    } catch {
      /* parent handles the toast */
    } finally {
      setDownloading(false)
    }
  }

  return (
    <button
      onClick={handle}
      disabled={downloading}
      className={cn(
        'flex h-8 w-8 items-center justify-center transition-all duration-200',
        done
          ? 'bg-green-100 text-green-700'
          : 'bg-secondary text-muted-foreground hover:bg-primary hover:text-primary-foreground'
      )}
      aria-label={`Download ${track.title}`}
    >
      {downloading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : done ? (
        <Check className="h-3.5 w-3.5" />
      ) : (
        <Download className="h-3.5 w-3.5" />
      )}
    </button>
  )
}

/* ─── Track row — matches CatalogPreview on the homepage ────────────────────── */

function TrackRow({
  track,
  index,
  onDownload,
}: {
  track: Track
  index: number
  onDownload: (t: Track) => void
}) {
  const { toggle, isPlaying, progress } = useAudioPlayer()
  const playing = isPlaying(track.id)
  const heights = waveHeights[track.id]

  return (
    <div
      className={cn(
        'flex items-center gap-4 p-4 sm:p-5 hover:bg-secondary transition-all duration-150 group',
        index !== 0 && 'border-t border-border'
      )}
      role="listitem"
    >
      {/* Index number — mono, restrained */}
      <span className="hidden sm:block text-xs font-mono text-muted-foreground/40 w-5 shrink-0 text-right tracking-[0.1em]">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Play / pause — square color swatch button */}
      <button
        onClick={() => toggle(track.id, track.audioSrc)}
        className="flex h-11 w-11 shrink-0 items-center justify-center relative overflow-hidden transition-all"
        style={{ backgroundColor: track.color }}
        aria-label={playing ? `Pause ${track.title}` : `Play ${track.title}`}
      >
        {/* Waveform visible while playing */}
        {playing && (
          <div
            className="absolute inset-0 flex items-end justify-center gap-px pb-1.5 px-1.5"
            aria-hidden="true"
          >
            {heights.slice(0, 10).map((h, i) => (
              <div
                key={i}
                className="waveform-bar w-px bg-white rounded-none"
                style={{ height: `${h}%`, animationDelay: `${i * 0.06}s` }}
              />
            ))}
          </div>
        )}

        {/* Play/pause icon centered */}
        <span className="flex h-7 w-7 items-center justify-center bg-white/20 hover:bg-white/30 transition-colors z-10">
          {playing ? (
            <Pause className="h-3 w-3 text-white fill-white" strokeWidth={0} />
          ) : (
            <Play className="h-3 w-3 text-white fill-white ml-0.5" strokeWidth={0} />
          )}
        </span>

        {/* Progress ring on the square tile */}
        {playing && (
          <svg
            className="absolute inset-0 h-full w-full pointer-events-none"
            viewBox="0 0 44 44"
            aria-hidden="true"
          >
            <rect
              x="2" y="2" width="40" height="40"
              fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.35"
              strokeDasharray={`${4 * 40}`}
              strokeDashoffset={`${4 * 40 * (1 - progress)}`}
            />
          </svg>
        )}
      </button>

      {/* Track info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-foreground truncate tracking-wide">
          {track.title}
        </p>
        <div className="flex items-center gap-3 mt-0.5 flex-wrap">
          <span className="text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">
            {track.genre}
          </span>
          {track.artistSource && (
            <span className="text-xs text-muted-foreground">
              via {track.artistSource}
            </span>
          )}
        </div>
      </div>

      {/* Waveform — decorative, hidden on small screens */}
      <div
        className="hidden md:flex items-end gap-px h-7 w-16 shrink-0"
        aria-hidden="true"
      >
        {heights.map((h, i) => (
          <div
            key={i}
            className={cn(
              'flex-1 transition-all duration-200',
              playing ? 'bg-primary waveform-bar' : 'bg-muted'
            )}
            style={{
              height: `${h}%`,
              animationDelay: `${(i % 10) * 0.06}s`,
            }}
          />
        ))}
      </div>

      {/* BPM + Duration */}
      <div className="hidden sm:flex flex-col items-end gap-0.5 shrink-0 w-16">
        <span className="text-xs text-muted-foreground font-mono">{track.bpm} BPM</span>
        <span className="text-xs text-muted-foreground font-mono">{track.duration}</span>
      </div>

      {/* CC0 badge + price + download */}
      <div className="flex items-center gap-2 shrink-0">
        <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-[0.1em] text-green-700 border border-green-300 bg-green-50 px-1.5 py-0.5">
          CC0
        </span>
        <span className="text-sm font-bold text-primary">
          ${track.price.toFixed(2)}
        </span>
        <DownloadButton track={track} onDownload={onDownload} />
      </div>
    </div>
  )
}

/* ─── Filter sidebar ─────────────────────────────────────────────────────────── */

interface FilterSidebarProps {
  search: string;          setSearch: (v: string) => void
  selectedGenres: string[];toggleGenre: (g: string) => void
  selectedMoods: string[]; toggleMood: (m: string) => void
  priceFilter: string;     setPriceFilter: (v: string) => void
  durationFilter: string;  setDurationFilter: (v: string) => void
  sortBy: string;          setSortBy: (v: string) => void
  onReset: () => void
}

function FilterSidebar({
  search, setSearch,
  selectedGenres, toggleGenre,
  selectedMoods, toggleMood,
  priceFilter, setPriceFilter,
  durationFilter, setDurationFilter,
  sortBy, setSortBy,
  onReset,
}: FilterSidebarProps) {
  return (
    <div className="flex flex-col gap-7">

      {/* Search */}
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-foreground mb-3">
          Search
        </p>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Title, genre, mood…"
            className="pl-9 h-9 text-sm rounded-none border-border focus:ring-0 focus:border-primary"
            aria-label="Search tracks"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="border-t border-border" aria-hidden="true" />

      {/* Sort */}
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-foreground mb-3">
          Sort By
        </p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full h-9 text-sm border border-border bg-background px-3 focus:outline-none focus:border-primary rounded-none"
          aria-label="Sort tracks"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <div className="border-t border-border" aria-hidden="true" />

      {/* Genre */}
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-foreground mb-3">
          Genre
        </p>
        <div className="flex flex-col gap-2">
          {GENRES.map((g) => (
            <label key={g} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedGenres.includes(g)}
                onChange={() => toggleGenre(g)}
                className="h-3.5 w-3.5 border-border accent-primary rounded-none"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {g}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-border" aria-hidden="true" />

      {/* Mood */}
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-foreground mb-3">
          Mood
        </p>
        <div className="flex flex-wrap gap-1.5">
          {MOODS.map((m) => (
            <button
              key={m}
              onClick={() => toggleMood(m)}
              aria-pressed={selectedMoods.includes(m)}
              className={cn(
                'px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] border transition-all duration-150',
                selectedMoods.includes(m)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
              )}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-border" aria-hidden="true" />

      {/* Price */}
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-foreground mb-3">
          Price
        </p>
        <div className="flex flex-col gap-2">
          {PRICE_OPTIONS.map((o) => (
            <label key={o.value} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="price"
                checked={priceFilter === o.value}
                onChange={() => setPriceFilter(o.value)}
                className="accent-primary"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {o.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-border" aria-hidden="true" />

      {/* Duration */}
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-foreground mb-3">
          Duration
        </p>
        <div className="flex flex-col gap-2">
          {DURATION_OPTIONS.map((o) => (
            <label key={o.value} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="duration"
                checked={durationFilter === o.value}
                onChange={() => setDurationFilter(o.value)}
                className="accent-primary"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {o.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-border" aria-hidden="true" />

      {/* Reset */}
      <button
        onClick={onReset}
        className="w-full h-9 border border-border text-sm font-bold uppercase tracking-[0.1em] text-muted-foreground hover:border-foreground hover:text-foreground transition-colors duration-150"
      >
        Reset all filters
      </button>
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────────────────────────────── */

export function CatalogPage() {
  const { isAuthenticated } = useAuth()

  /* Search — raw for controlled input, debounced for filtering */
  const [searchRaw,       setSearchRaw]       = useState('')
  const [search,          setSearch]           = useState('')
  const [selectedGenres,  setSelectedGenres]   = useState<string[]>([])
  const [selectedMoods,   setSelectedMoods]    = useState<string[]>([])
  const [priceFilter,     setPriceFilter]      = useState('any')
  const [durationFilter,  setDurationFilter]   = useState('any')
  const [sortBy,          setSortBy]           = useState('popular')
  const [sidebarOpen,     setSidebarOpen]      = useState(false)
  const [showAuthModal,   setShowAuthModal]    = useState(false)
  const [page,            setPage]             = useState(1)
  const PAGE_SIZE = 12 // all real tracks fit in one page

  /* Page title */
  useEffect(() => { document.title = 'Catalog — Torch Studio' }, [])

  /* Debounce search input → 300 ms */
  const debouncedSetSearch = useDebouncedCallback((v: string) => {
    setSearch(v)
    setPage(1)
  }, 300)

  const handleSearchChange = (v: string) => {
    setSearchRaw(v)
    debouncedSetSearch(v)
  }

  /* Reset page whenever a filter changes */
  useEffect(() => { setPage(1) }, [selectedGenres, selectedMoods, priceFilter, durationFilter, sortBy])

  /* Filter + sort the 12 real tracks */
  const filtered = useMemo(() => {
    let list = [...tracks]

    if (search) {
      const q = search.toLowerCase()
      list = list.filter((t) =>
        t.title.toLowerCase().includes(q) ||
        t.genre.toLowerCase().includes(q) ||
        t.mood.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q))
      )
    }

    if (selectedGenres.length > 0)  list = list.filter((t) => selectedGenres.includes(t.genre))
    if (selectedMoods.length > 0)   list = list.filter((t) => selectedMoods.includes(t.mood))

    if (priceFilter === 'under1')   list = list.filter((t) => t.price < 1)
    else if (priceFilter === 'under2') list = list.filter((t) => t.price < 2)
    else if (priceFilter === '2.99') list = list.filter((t) => t.price >= 2.99)

    if (durationFilter === 'under2') list = list.filter((t) => t.durationSecs < 120)
    else if (durationFilter === '2to4') list = list.filter((t) => t.durationSecs >= 120 && t.durationSecs < 240)
    else if (durationFilter === 'over4') list = list.filter((t) => t.durationSecs >= 240)

    switch (sortBy) {
      case 'newest':    list.sort((a, b) => b.addedDate.localeCompare(a.addedDate)); break
      case 'price_asc': list.sort((a, b) => a.price - b.price);                     break
      case 'bpm':       list.sort((a, b) => a.bpm - b.bpm);                         break
      default: break /* popular = natural order by id */
    }

    return list
  }, [search, selectedGenres, selectedMoods, priceFilter, durationFilter, sortBy])

  const visible = filtered.slice(0, page * PAGE_SIZE)
  const hasMore = visible.length < filtered.length

  const toggleGenre = (g: string) =>
    setSelectedGenres((prev) => prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g])

  const toggleMood = (m: string) =>
    setSelectedMoods((prev) => prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m])

  const resetFilters = () => {
    setSearch(''); setSearchRaw('')
    setSelectedGenres([]); setSelectedMoods([])
    setPriceFilter('any'); setDurationFilter('any')
    setSortBy('popular')
  }

  /* Count active filters for the mobile badge */
  const activeFilterCount = [
    search,
    ...selectedGenres,
    ...selectedMoods,
    priceFilter    !== 'any' ? priceFilter    : '',
    durationFilter !== 'any' ? durationFilter : '',
  ].filter(Boolean).length

  const handleDownload = async (track: Track) => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }
    try {
      await downloadTrack(track)
      toast.success('Downloaded! Licensed CC0 — free for any project.')
    } catch {
      toast.error('Download failed. Please try again.')
    }
  }

  const sidebarProps: FilterSidebarProps = {
    search: searchRaw, setSearch: handleSearchChange,
    selectedGenres, toggleGenre,
    selectedMoods, toggleMood,
    priceFilter, setPriceFilter,
    durationFilter, setDurationFilter,
    sortBy, setSortBy,
    onReset: resetFilters,
  }

  return (
    <>
      <Navbar />

      <main id="main-content">

        {/* ── Page header — overline + large editorial headline ──────────────── */}
        <div className="border-b border-border bg-secondary">
          <div className="section-container py-12 lg:py-16">
            <p className="overline-label mb-4">Catalog</p>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <h1
                className="section-headline text-foreground"
                style={{ fontSize: 'clamp(2.25rem, 4.5vw, 4rem)' }}
              >
                Browse the full catalog
              </h1>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                {tracks.length} CC0 tracks — free for any project, no subscription required.
              </p>
            </div>
          </div>

          {/* Horizontal rule — structural accent matching homepage sections */}
          <div className="border-t border-border" aria-hidden="true" />
        </div>

        {/* ── Main layout — sidebar + track list ────────────────────────────── */}
        <div className="section-container py-10 lg:py-14">
          <div className="flex gap-10 lg:gap-14">

            {/* Desktop sidebar */}
            <aside className="hidden lg:block w-52 shrink-0" aria-label="Catalog filters">
              <div className="sticky top-20">
                <FilterSidebar {...sidebarProps} />
              </div>
            </aside>

            {/* Track list + controls */}
            <div className="flex-1 min-w-0">

              {/* Top bar: result count + mobile filter button */}
              <div className="flex items-center justify-between mb-6 gap-4">
                <p className="text-xs font-mono text-muted-foreground/60 tracking-[0.12em] uppercase">
                  <span className="text-foreground font-bold">{filtered.length}</span>
                  {' '}of {tracks.length} tracks
                  {activeFilterCount > 0 && (
                    <button
                      onClick={resetFilters}
                      className="ml-3 text-primary underline underline-offset-2 hover:text-accent transition-colors"
                    >
                      clear
                    </button>
                  )}
                </p>

                {/* Mobile: open filter drawer */}
                <button
                  className="lg:hidden flex items-center gap-2 h-9 px-4 border border-border text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground hover:border-foreground hover:text-foreground transition-colors duration-150"
                  onClick={() => setSidebarOpen(true)}
                  aria-expanded={sidebarOpen}
                  aria-controls="mobile-filters"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="flex h-4 w-4 items-center justify-center bg-primary text-primary-foreground text-xs font-bold">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Empty state */}
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center border border-border">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground mb-3">
                    No results
                  </p>
                  <p className="font-display text-2xl font-bold text-foreground mb-2">
                    No tracks match your filters
                  </p>
                  <p className="text-muted-foreground text-sm mb-6">
                    Try broadening your search or clearing a filter.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="h-10 px-6 border border-border text-sm font-bold uppercase tracking-[0.1em] hover:border-foreground transition-colors duration-150"
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                <>
                  {/* Track rows — bordered list matching CatalogPreview style */}
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      className="flex flex-col border border-border"
                      layout
                      role="list"
                      aria-label="Tracks"
                    >
                      {visible.map((track, i) => (
                        <motion.div
                          key={track.id}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15, ease: 'easeOut' }}
                        >
                          <TrackRow
                            track={track}
                            index={i}
                            onDownload={handleDownload}
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>

                  {/* Load more */}
                  {hasMore && (
                    <div className="flex justify-center mt-8">
                      <button
                        onClick={() => setPage((p) => p + 1)}
                        className="h-11 px-8 border border-border text-sm font-bold uppercase tracking-[0.1em] text-muted-foreground hover:border-foreground hover:text-foreground transition-colors duration-150"
                      >
                        Load more ({filtered.length - visible.length} remaining)
                      </button>
                    </div>
                  )}

                  {/* Attribution note below the list */}
                  <p className="text-xs text-muted-foreground mt-8 border-t border-border pt-5">
                    All tracks are CC0 (public domain) sourced from{' '}
                    <a
                      href="https://pixabay.com/music/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 hover:text-foreground transition-colors inline-flex items-center gap-0.5"
                    >
                      Pixabay Music
                      <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                    </a>
                    . No attribution required.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ── Mobile filter drawer ───────────────────────────────────────────── */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            />
            <div
              id="mobile-filters"
              role="dialog"
              aria-label="Catalog filters"
              className="absolute right-0 top-0 bottom-0 w-80 bg-background overflow-y-auto p-6 border-l border-border"
            >
              <div className="flex items-center justify-between mb-7">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-foreground">
                  Filters
                </p>
                <button
                  onClick={() => setSidebarOpen(false)}
                  aria-label="Close filters"
                  className="flex h-7 w-7 items-center justify-center border border-border text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <FilterSidebar {...sidebarProps} />
            </div>
          </div>
        )}

        {/* ── Auth modal ─────────────────────────────────────────────────────── */}
        {showAuthModal && (
          <AuthPromptModal onClose={() => setShowAuthModal(false)} />
        )}
      </main>

      <Footer />
    </>
  )
}
