import { createFileRoute, Link } from '@tanstack/react-router'
import { PLAYER_MODS, CATEGORIES, CATEGORY_ORDER } from '../data/mods'
import type { Category } from '../data/mods'

export const Route = createFileRoute('/')({ component: Home })

const CATEGORY_ACCENT: Record<Category, string> = {
  worldgen:    '#34d399',
  structures:  '#fbbf24',
  qol:         '#60a5fa',
  storage:     '#a78bfa',
  combat:      '#f87171',
  decoration:  '#fb923c',
  mobs:        '#22d3ee',
  performance: '#facc15',
  library:     '#6b7280',
}

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div>
      <p style={{ margin: 0, fontSize: '2rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1 }}>
        {value}
      </p>
      <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>
        {label}
      </p>
    </div>
  )
}

function Home() {
  const playerCategories = CATEGORY_ORDER.filter((c) => c !== 'library')

  return (
    <main className="page-wrap" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="fade-up" style={{ maxWidth: 680, marginBottom: '4rem' }}>
        <p className="label" style={{ marginBottom: '1rem' }}>Fabric · Minecraft 1.21.1</p>

        <h1
          className="display"
          style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)', marginBottom: '1.25rem' }}
        >
          TSW Minecraft
          <br />
          <span style={{ color: 'var(--accent)' }}>Fabric Server</span>
        </h1>

        <p style={{ fontSize: '1.05rem', color: 'var(--text-soft)', lineHeight: 1.7, maxWidth: 520, marginBottom: '2rem' }}>
          Everything you need to know about the mods on our server — whether you've played
          Minecraft for years or just picked it up for the first time.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <Link to="/mods" className="btn-primary">
            Browse All Mods
          </Link>
          <Link to="/guide" className="btn-ghost">
            🌱 New Player Guide
          </Link>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────── */}
      <section
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2.5rem',
          padding: '2rem',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '1rem',
          marginBottom: '4rem',
        }}
      >
        <Stat value={PLAYER_MODS.length} label="Player-facing mods" />
        <div style={{ width: 1, background: 'var(--border)', alignSelf: 'stretch' }} />
        <Stat value={playerCategories.length} label="Categories" />
        <div style={{ width: 1, background: 'var(--border)', alignSelf: 'stretch' }} />
        <Stat value="1.21.1" label="Minecraft version" />
        <div style={{ width: 1, background: 'var(--border)', alignSelf: 'stretch' }} />
        <Stat value="Fabric" label="Mod loader" />
      </section>

      {/* ── Category grid ────────────────────────────────────────────── */}
      <section style={{ marginBottom: '4rem' }}>
        <p className="label" style={{ marginBottom: '0.5rem' }}>What's included</p>
        <h2
          className="display"
          style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}
        >
          Browse by category
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '0.75rem',
          }}
        >
          {playerCategories.map((cat) => {
            const meta = CATEGORIES[cat]
            const count = PLAYER_MODS.filter((m) => m.category === cat).length
            const accent = CATEGORY_ACCENT[cat]
            return (
              <Link
                key={cat}
                to="/mods"
                search={{ category: cat }}
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="card"
                  style={{
                    padding: '1.25rem',
                    cursor: 'pointer',
                    height: '100%',
                  }}
                >
                  <span style={{ fontSize: '1.5rem', lineHeight: 1, display: 'block', marginBottom: '0.75rem' }}>
                    {meta.emoji}
                  </span>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: '0.875rem', color: 'var(--text)' }}>
                    {meta.label}
                  </p>
                  <p style={{ margin: '0.25rem 0 0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    {meta.description}
                  </p>
                  <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, color: accent }}>
                    {count} mod{count !== 1 ? 's' : ''} →
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ── Newbie callout ───────────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--accent-dim)',
          border: '1px solid var(--accent-ring)',
          borderRadius: '1rem',
          padding: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
        }}
      >
        <div style={{ maxWidth: 480 }}>
          <p style={{ margin: '0 0 0.5rem', fontWeight: 700, color: 'var(--text)' }}>
            New to modded Minecraft?
          </p>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-soft)', lineHeight: 1.6 }}>
            The guide walks you through what mods are, the 7 most important ones to know on day
            one, survival tips for this server, and a rough progression path.
          </p>
        </div>
        <Link to="/guide" className="btn-primary" style={{ flexShrink: 0 }}>
          Read the Guide →
        </Link>
      </section>

    </main>
  )
}
