import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Search, Play, Pause, Download, SlidersHorizontal, X,
  Loader2, Check, LogIn,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Separator } from '@/components/ui/separator'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/sections/Sections'
import { useAuth } from '@/context/AuthContext'
import { useAudioPlayer } from '@/hooks/useAudioPlayer'
import { tracks, type Track } from '@/data/tracks'
import { downloadTrack } from '@/utils/download'
import { cn } from '@/lib/utils'

const GENRES = ['Lo-Fi','Hip-Hop','Ambient','Electronic','Indie Pop','Soul/R&B','Jazz','Cinematic','Folk','Trap','Funk','Classical']
const MOODS = ['Chill','Energetic','Dark','Uplifting','Melancholic'] as const
const PRICE_OPTIONS = [
  { label: 'Any price', value: 'any' },
  { label: 'Under $1', value: 'under1' },
  { label: 'Under $2', value: 'under2' },
  { label: '$2.99', value: '2.99' },
]
const DURATION_OPTIONS = [
  { label: 'Any length', value: 'any' },
  { label: 'Under 2 min', value: 'under2' },
  { label: '2–4 min', value: '2to4' },
  { label: '4+ min', value: 'over4' },
]
const SORT_OPTIONS = [
  { label: 'Most popular', value: 'popular' },
  { label: 'Newest', value: 'newest' },
  { label: 'Price: low–high', value: 'price_asc' },
  { label: 'BPM', value: 'bpm' },
]

// Pre-computed waveform heights
const waveHeights: Record<number, number[]> = {}
tracks.forEach((t) => {
  waveHeights[t.id] = Array.from({ length: 20 }, (_, i) => {
    const seed = (t.id * 31 + i * 17) % 100
    return 30 + (seed % 70)
  })
})

// Auth prompt modal
function AuthPromptModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-background rounded-2xl p-8 max-w-sm w-full shadow-warm-lg text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
          <LogIn className="h-7 w-7 text-primary" />
        </div>
        <h2 className="font-display text-xl font-bold mb-2">Sign in to download</h2>
        <p className="text-muted-foreground text-sm mb-6">Create a free account to download CC0 tracks for any project.</p>
        <div className="flex flex-col gap-3">
          <Link to="/sign-in?mode=register" onClick={onClose}>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-accent font-semibold">
              Create free account
            </Button>
          </Link>
          <Link to="/sign-in" onClick={onClose}>
            <Button variant="outline" className="w-full font-medium">
              Sign in
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

function TrackCard({ track, onDownload }: { track: Track; onDownload: (t: Track) => void }) {
  const { toggle, isPlaying, progress } = useAudioPlayer()
  const playing = isPlaying(track.id)
  const heights = waveHeights[track.id]

  return (
    <div className={cn(
      'group flex items-center gap-3 p-3 rounded-xl border border-border bg-background hover:border-primary/30 hover:shadow-warm transition-all duration-200',
    )}>
      {/* Album tile */}
      <div
        className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-lg overflow-hidden"
        style={{ backgroundColor: track.color }}
      >
        {playing && (
          <div className="absolute inset-0 flex items-end justify-center gap-px pb-2 px-2">
            {heights.slice(0, 10).map((h, i) => (
              <div
                key={i}
                className="waveform-bar w-px rounded-full"
                style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        )}
        <button
          onClick={() => toggle(track.id, track.audioSrc)}
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 z-10',
            playing
              ? 'bg-white text-foreground shadow-md'
              : 'bg-white/0 text-transparent group-hover:bg-white group-hover:text-foreground shadow-0 group-hover:shadow-md'
          )}
          aria-label={playing ? `Pause ${track.title}` : `Play ${track.title}`}
        >
          {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 ml-0.5" />}
        </button>

        {/* Progress ring on play button */}
        {playing && (
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 56 56" aria-hidden="true">
            <circle
              cx="28" cy="28" r="24"
              fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.4"
              strokeDasharray={`${2 * Math.PI * 24}`}
              strokeDashoffset={`${2 * Math.PI * 24 * (1 - progress)}`}
              strokeLinecap="round"
              transform="rotate(-90 28 28)"
            />
          </svg>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm text-foreground truncate">{track.title}</p>
        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
          <Badge variant="secondary" className="text-xs px-1.5 py-0">{track.genre}</Badge>
          <span className="text-xs text-muted-foreground">{track.mood}</span>
          <span className="text-xs text-muted-foreground">{track.bpm} BPM</span>
          <span className="text-xs text-muted-foreground">{track.duration}</span>
        </div>
      </div>

      {/* CC0 + Price + Download */}
      <div className="flex items-center gap-2 shrink-0">
        <Badge className="bg-green-100 text-green-700 border-green-200 text-xs px-1.5 py-0 font-medium">CC0</Badge>
        <span className="text-sm font-semibold text-foreground">${track.price.toFixed(2)}</span>
        <DownloadButton track={track} onDownload={onDownload} />
      </div>
    </div>
  )
}

function DownloadButton({ track, onDownload }: { track: Track; onDownload: (t: Track) => void }) {
  const [downloading, setDownloading] = useState(false)
  const [done, setDone] = useState(false)

  const handle = async () => {
    setDownloading(true)
    try {
      await onDownload(track)
      setDone(true)
      setTimeout(() => setDone(false), 3000)
    } catch {
      // error handled by parent
    } finally {
      setDownloading(false)
    }
  }

  return (
    <button
      onClick={handle}
      disabled={downloading}
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200',
        done
          ? 'bg-green-100 text-green-600'
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

function FilterSidebar({
  search, setSearch,
  selectedGenres, toggleGenre,
  selectedMoods, toggleMood,
  bpmRange, setBpmRange,
  priceFilter, setPriceFilter,
  durationFilter, setDurationFilter,
  sortBy, setSortBy,
  onReset,
}: FilterSidebarProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Search */}
      <div>
        <label className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2 block">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Title, genre, mood..."
            className="pl-8 h-9 text-sm"
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

      <Separator />

      {/* Sort */}
      <div>
        <label className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2 block">Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full h-9 text-sm rounded-lg border border-border bg-background px-3 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Sort tracks"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <Separator />

      {/* Genre */}
      <div>
        <label className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3 block">Genre</label>
        <div className="flex flex-col gap-2">
          {GENRES.map((g) => (
            <label key={g} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedGenres.includes(g)}
                onChange={() => toggleGenre(g)}
                className="h-4 w-4 rounded border-border accent-primary"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{g}</span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      {/* Mood */}
      <div>
        <label className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3 block">Mood</label>
        <div className="flex flex-wrap gap-2">
          {MOODS.map((m) => (
            <button
              key={m}
              onClick={() => toggleMood(m)}
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium transition-all duration-200',
                selectedMoods.includes(m)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground'
              )}
              aria-pressed={selectedMoods.includes(m)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* BPM */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-semibold text-foreground uppercase tracking-wider">BPM Range</label>
          <span className="text-xs text-muted-foreground">{bpmRange[0]}–{bpmRange[1]}</span>
        </div>
        <Slider
          min={60}
          max={180}
          step={5}
          value={bpmRange}
          onValueChange={(value) => {
            const arr = Array.isArray(value) ? [...value] : [value as number]
            setBpmRange(arr)
          }}
          className="mt-1"
          aria-label="BPM range"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>60</span>
          <span>180</span>
        </div>
      </div>

      <Separator />

      {/* Price */}
      <div>
        <label className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3 block">Price</label>
        <div className="flex flex-col gap-2">
          {PRICE_OPTIONS.map((o) => (
            <label key={o.value} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="price"
                checked={priceFilter === o.value}
                onChange={() => setPriceFilter(o.value)}
                className="accent-primary"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{o.label}</span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      {/* Duration */}
      <div>
        <label className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3 block">Duration</label>
        <div className="flex flex-col gap-2">
          {DURATION_OPTIONS.map((o) => (
            <label key={o.value} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="duration"
                checked={durationFilter === o.value}
                onChange={() => setDurationFilter(o.value)}
                className="accent-primary"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{o.label}</span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      <Button variant="outline" size="sm" onClick={onReset} className="w-full text-xs">
        Reset all filters
      </Button>
    </div>
  )
}

interface FilterSidebarProps {
  search: string; setSearch: (v: string) => void
  selectedGenres: string[]; toggleGenre: (g: string) => void
  selectedMoods: string[]; toggleMood: (m: string) => void
  bpmRange: number[]; setBpmRange: (v: number[]) => void
  priceFilter: string; setPriceFilter: (v: string) => void
  durationFilter: string; setDurationFilter: (v: string) => void
  sortBy: string; setSortBy: (v: string) => void
  onReset: () => void
}

export function CatalogPage() {
  const { isAuthenticated } = useAuth()
  const [searchRaw, setSearchRaw] = useState('')
  const [search, setSearch] = useState('')
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedMoods, setSelectedMoods] = useState<string[]>([])
  const [bpmRange, setBpmRange] = useState([60, 180])
  const [priceFilter, setPriceFilter] = useState('any')
  const [durationFilter, setDurationFilter] = useState('any')
  const [sortBy, setSortBy] = useState('popular')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 30

  // Debounce search
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const handleSearchChange = (v: string) => {
    setSearchRaw(v)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => { setSearch(v); setPage(1) }, 300)
  }

  useEffect(() => {
    document.title = 'Catalog — Torch Studio'
  }, [])

  // Reset page when filters change
  useEffect(() => { setPage(1) }, [selectedGenres, selectedMoods, bpmRange, priceFilter, durationFilter, sortBy])

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
    if (selectedGenres.length > 0) list = list.filter((t) => selectedGenres.includes(t.genre))
    if (selectedMoods.length > 0) list = list.filter((t) => selectedMoods.includes(t.mood))
    list = list.filter((t) => t.bpm >= bpmRange[0] && t.bpm <= bpmRange[1])
    if (priceFilter === 'under1') list = list.filter((t) => t.price < 1)
    else if (priceFilter === 'under2') list = list.filter((t) => t.price < 2)
    else if (priceFilter === '2.99') list = list.filter((t) => t.price === 2.99)
    if (durationFilter === 'under2') list = list.filter((t) => t.durationSecs < 120)
    else if (durationFilter === '2to4') list = list.filter((t) => t.durationSecs >= 120 && t.durationSecs < 240)
    else if (durationFilter === 'over4') list = list.filter((t) => t.durationSecs >= 240)

    switch (sortBy) {
      case 'newest': list.sort((a, b) => b.addedDate.localeCompare(a.addedDate)); break
      case 'price_asc': list.sort((a, b) => a.price - b.price); break
      case 'bpm': list.sort((a, b) => a.bpm - b.bpm); break
      default: break // "popular" = natural order by id
    }

    return list
  }, [search, selectedGenres, selectedMoods, bpmRange, priceFilter, durationFilter, sortBy])

  const visible = filtered.slice(0, page * PAGE_SIZE)
  const hasMore = visible.length < filtered.length

  const toggleGenre = (g: string) =>
    setSelectedGenres((prev) => prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g])

  const toggleMood = (m: string) =>
    setSelectedMoods((prev) => (prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]))

  const resetFilters = () => {
    setSearch(''); setSearchRaw('')
    setSelectedGenres([]); setSelectedMoods([])
    setBpmRange([60, 180]); setPriceFilter('any')
    setDurationFilter('any'); setSortBy('popular')
  }

  const activeFilterCount = [
    search,
    ...selectedGenres,
    ...selectedMoods,
    bpmRange[0] !== 60 || bpmRange[1] !== 180 ? 'bpm' : '',
    priceFilter !== 'any' ? priceFilter : '',
    durationFilter !== 'any' ? durationFilter : '',
  ].filter(Boolean).length

  const handleDownload = async (track: Track) => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }
    try {
      await downloadTrack(track)
      toast.success(`Downloaded! Licensed CC0 — free for any project.`)
    } catch {
      toast.error('Download failed. Please try again.')
    }
  }

  const sidebarProps: FilterSidebarProps = {
    search: searchRaw, setSearch: handleSearchChange,
    selectedGenres, toggleGenre,
    selectedMoods, toggleMood,
    bpmRange, setBpmRange,
    priceFilter, setPriceFilter,
    durationFilter, setDurationFilter,
    sortBy, setSortBy,
    onReset: resetFilters,
  }

  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* Page header */}
        <div className="bg-secondary/40 border-b border-border">
          <div className="section-container py-8">
            <h1 className="font-display text-3xl font-bold text-foreground">Browse Catalog</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              150+ CC0 tracks across 12 genres — free for any project.
            </p>
          </div>
        </div>

        <div className="section-container py-8">
          <div className="flex gap-8">
            {/* Desktop sidebar */}
            <aside
              className="hidden lg:block w-60 shrink-0"
              aria-label="Catalog filters"
            >
              <div className="sticky top-20">
                <FilterSidebar {...sidebarProps} />
              </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Mobile filter toggle + results count */}
              <div className="flex items-center justify-between mb-5 gap-3">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{filtered.length}</span> tracks
                  {filtered.length !== tracks.length && ` (of ${tracks.length})`}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden flex items-center gap-2 text-xs"
                  onClick={() => setSidebarOpen(true)}
                  aria-expanded={sidebarOpen}
                  aria-controls="mobile-filters"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>
              </div>

              {/* Track list */}
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <p className="text-lg font-semibold text-foreground">No tracks found</p>
                  <p className="text-muted-foreground text-sm mt-1">Try adjusting your filters.</p>
                  <Button variant="outline" size="sm" onClick={resetFilters} className="mt-4 text-xs">
                    Reset filters
                  </Button>
                </div>
              ) : (
                <>
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      className="flex flex-col gap-2"
                      layout
                    >
                      {visible.map((track) => (
                        <motion.div
                          key={track.id}
                          layout
                          initial={{ opacity: 0, scale: 0.97 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.97 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                        >
                          <TrackCard track={track} onDownload={handleDownload} />
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>

                  {hasMore && (
                    <div className="flex justify-center mt-8">
                      <Button
                        variant="outline"
                        onClick={() => setPage((p) => p + 1)}
                        className="font-medium"
                      >
                        Load more ({filtered.length - visible.length} remaining)
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile filter drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
            <div
              id="mobile-filters"
              className="absolute right-0 top-0 bottom-0 w-80 bg-background overflow-y-auto p-6 shadow-warm-lg"
              role="dialog"
              aria-label="Catalog filters"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-lg font-semibold">Filters</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  aria-label="Close filters"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <FilterSidebar {...sidebarProps} />
            </div>
          </div>
        )}

        {/* Auth modal */}
        {showAuthModal && <AuthPromptModal onClose={() => setShowAuthModal(false)} />}
      </main>
      <Footer />
    </>
  )
}
