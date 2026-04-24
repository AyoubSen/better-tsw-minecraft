import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { MOD_GUIDES, type ModGuide } from '../data/directedGuides'

type Search = { category?: string; q?: string }

export const Route = createFileRoute('/directed-guides')({
  validateSearch: (s: Record<string, unknown>): Search => ({
    category: typeof s.category === 'string' ? s.category : undefined,
    q: typeof s.q === 'string' ? s.q : undefined,
  }),
  component: DirectedGuidesPage,
})

const CATEGORIES = ['All', ...Array.from(new Set(MOD_GUIDES.map((g) => g.category)))]

const PRIORITY_STYLE: Record<ModGuide['priority'], React.CSSProperties> = {
  Essential: { color: '#22c55e', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)' },
  Useful:    { color: '#f59e0b', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)' },
  Niche:     { color: '#94a3b8', background: 'rgba(148,163,184,0.12)', border: '1px solid rgba(148,163,184,0.3)' },
}

function normalize(s: string) { return s.toLowerCase() }

function haystack(g: ModGuide) {
  return normalize([g.title, g.category, g.tagline, ...g.mods, ...g.searchTerms].join(' '))
}

// ── Modal ─────────────────────────────────────────────────────────────────────

function GuideModal({ guide, onClose }: { guide: ModGuide; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.65)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        ref={ref}
        style={{
          width: '100%', maxWidth: 620,
          maxHeight: '88vh',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '1.25rem',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.5rem 1.5rem 1.25rem',
          borderBottom: '1px solid var(--border)',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.75rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent)' }}>
                  {guide.category}
                </span>
                <span style={{
                  ...PRIORITY_STYLE[guide.priority],
                  padding: '0.2rem 0.5rem',
                  borderRadius: '999px',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                }}>
                  {guide.priority}
                </span>
              </div>
              <h2 style={{ margin: 0, fontSize: '1.35rem', color: 'var(--text)', lineHeight: 1.2 }}>
                {guide.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                all: 'unset', cursor: 'pointer', flexShrink: 0,
                width: 32, height: 32, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                color: 'var(--text-muted)', fontSize: '1rem',
                transition: 'background 150ms',
              }}
            >
              ✕
            </button>
          </div>
          <p style={{ margin: '0 0 0.85rem', fontSize: '0.875rem', color: 'var(--text-soft)', lineHeight: 1.6 }}>
            {guide.tagline}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {guide.mods.map((mod) => (
              <span
                key={mod}
                style={{
                  padding: '0.22rem 0.5rem',
                  borderRadius: '999px',
                  background: 'var(--accent-dim)',
                  border: '1px solid var(--accent-ring)',
                  fontSize: '0.68rem',
                  color: 'var(--accent)',
                  fontWeight: 600,
                }}
              >
                {mod}
              </span>
            ))}
          </div>
        </div>

        {/* Scrollable content */}
        <div style={{ overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {guide.sections.map((section) => (
            <div key={section.heading}>
              <p style={{ margin: '0 0 0.4rem', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text)' }}>
                {section.heading}
              </p>
              <p style={{ margin: 0, fontSize: '0.845rem', color: 'var(--text-soft)', lineHeight: 1.7 }}>
                {section.body}
              </p>
            </div>
          ))}

          {guide.quickTips.length > 0 && (
            <div style={{
              padding: '1rem 1.1rem',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: '0.75rem',
            }}>
              <p style={{ margin: '0 0 0.65rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text)' }}>
                Quick Tips
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {guide.quickTips.map((tip) => (
                  <div key={tip} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2, fontSize: '0.7rem' }}>▸</span>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-soft)', lineHeight: 1.6 }}>
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Card ──────────────────────────────────────────────────────────────────────

function GuideCard({ guide, onClick }: { guide: ModGuide; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        all: 'unset',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.6rem',
        padding: '1.1rem 1.15rem',
        background: hovered ? 'var(--bg-elevated)' : 'var(--bg-card)',
        border: `1px solid ${hovered ? 'var(--accent-ring)' : 'var(--border)'}`,
        borderRadius: '0.9rem',
        textAlign: 'left',
        transition: 'background 150ms, border-color 150ms',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
        <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--accent)' }}>
          {guide.category}
        </span>
        <span style={{
          ...PRIORITY_STYLE[guide.priority],
          padding: '0.18rem 0.45rem',
          borderRadius: '999px',
          fontSize: '0.62rem',
          fontWeight: 800,
          flexShrink: 0,
        }}>
          {guide.priority}
        </span>
      </div>

      <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1.2 }}>
        {guide.title}
      </p>

      <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-soft)', lineHeight: 1.55 }}>
        {guide.tagline}
      </p>
    </button>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

function DirectedGuidesPage() {
  const navigate = useNavigate()
  const search = Route.useSearch()
  const [query, setQuery] = useState(search.q ?? '')
  const [activeCategory, setActiveCategory] = useState(search.category ?? 'All')
  const [openGuide, setOpenGuide] = useState<ModGuide | null>(null)
  const deferredQuery = useDeferredValue(query)
  const normalizedQuery = normalize(deferredQuery.trim())

  useEffect(() => {
    setQuery(search.q ?? '')
    setActiveCategory(search.category ?? 'All')
  }, [search.category, search.q])

  useEffect(() => {
    navigate({
      to: '/directed-guides',
      search: {
        q: query.trim() || undefined,
        category: activeCategory !== 'All' ? activeCategory : undefined,
      },
      replace: true,
    })
  }, [activeCategory, navigate, query])

  const filtered = useMemo(
    () => MOD_GUIDES.filter((g) => {
      const matchesCat = activeCategory === 'All' || g.category === activeCategory
      const matchesQ = !normalizedQuery || haystack(g).includes(normalizedQuery)
      return matchesCat && matchesQ
    }),
    [activeCategory, normalizedQuery],
  )

  const essential = filtered.filter((g) => g.priority === 'Essential')
  const useful    = filtered.filter((g) => g.priority === 'Useful')
  const niche     = filtered.filter((g) => g.priority === 'Niche')

  return (
    <main className="page-wrap" style={{ paddingTop: '3rem', paddingBottom: '5rem', maxWidth: 1100 }}>

      {/* Header */}
      <section className="fade-up" style={{ marginBottom: '2.5rem', maxWidth: 680 }}>
        <p className="label" style={{ marginBottom: '0.5rem' }}>Directed Guides</p>
        <h1 className="display" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', marginBottom: '0.85rem' }}>
          One guide per mod.
          <br />
          Click to read.
        </h1>
        <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-soft)', lineHeight: 1.7 }}>
          Search by mod name or problem. Essential guides first — start there if you're unsure.
        </p>
      </section>

      {/* Search */}
      <section style={{ marginBottom: '1.25rem' }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search "waystones", "recipes", "backpack", "combat"...'
          style={{
            width: '100%', boxSizing: 'border-box',
            padding: '0.9rem 1rem',
            borderRadius: '0.85rem',
            border: '1px solid var(--border)',
            background: 'var(--bg-card)',
            color: 'var(--text)', fontSize: '0.95rem',
            outline: 'none',
          }}
        />
      </section>

      {/* Category pills */}
      <section style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '2rem' }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(activeCategory === cat ? 'All' : cat)}
            style={{
              all: 'unset', cursor: 'pointer',
              padding: '0.38rem 0.8rem',
              borderRadius: '999px',
              border: '1px solid',
              borderColor: activeCategory === cat ? 'var(--accent)' : 'var(--border)',
              background: activeCategory === cat ? 'var(--accent-dim)' : 'transparent',
              color: activeCategory === cat ? 'var(--accent)' : 'var(--text-soft)',
              fontSize: '0.74rem', fontWeight: 700,
            }}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Guide groups */}
      {filtered.length === 0 ? (
        <div style={{
          padding: '1.5rem', borderRadius: '1rem',
          border: '1px solid var(--border)', background: 'var(--bg-card)',
        }}>
          <p style={{ margin: 0, fontWeight: 700, color: 'var(--text)' }}>No guides match that search.</p>
          <p style={{ margin: '0.35rem 0 0', fontSize: '0.84rem', color: 'var(--text-muted)' }}>
            Try a mod name like Waystones, EMI, or JourneyMap.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {essential.length > 0 && (
            <GuideGroup label="Essential" guides={essential} onOpen={setOpenGuide} />
          )}
          {useful.length > 0 && (
            <GuideGroup label="Useful" guides={useful} onOpen={setOpenGuide} />
          )}
          {niche.length > 0 && (
            <GuideGroup label="Niche" guides={niche} onOpen={setOpenGuide} />
          )}
        </div>
      )}

      {openGuide && (
        <GuideModal guide={openGuide} onClose={() => setOpenGuide(null)} />
      )}
    </main>
  )
}

function GuideGroup({
  label, guides, onOpen,
}: {
  label: string
  guides: ModGuide[]
  onOpen: (g: ModGuide) => void
}) {
  const color = label === 'Essential' ? '#22c55e' : label === 'Useful' ? '#f59e0b' : '#94a3b8'
  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <span style={{ fontSize: '0.72rem', fontWeight: 800, color, letterSpacing: '0.05em' }}>
          {label.toUpperCase()}
        </span>
        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{guides.length}</span>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '0.75rem',
      }}>
        {guides.map((g) => (
          <GuideCard key={g.id} guide={g} onClick={() => onOpen(g)} />
        ))}
      </div>
    </section>
  )
}
