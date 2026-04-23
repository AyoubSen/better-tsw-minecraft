import { Link } from '@tanstack/react-router'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'var(--header-bg)',
        borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div
        className="page-wrap"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          padding: '0.875rem 0',
        }}
      >
        {/* Brand */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none',
            color: 'var(--text)',
            fontWeight: 700,
            fontSize: '0.9rem',
            letterSpacing: '-0.01em',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'var(--accent)',
              boxShadow: '0 0 8px var(--accent)',
              flexShrink: 0,
            }}
          />
          TSW Minecraft
        </Link>

        {/* Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1 }}>
          <Link
            to="/"
            activeOptions={{ exact: true }}
            className="nav-link"
            activeProps={{ className: 'nav-link active' }}
          >
            Home
          </Link>
          <Link
            to="/mods"
            className="nav-link"
            activeProps={{ className: 'nav-link active' }}
          >
            Mods
          </Link>
          <Link
            to="/guide"
            className="nav-link"
            activeProps={{ className: 'nav-link active' }}
          >
            Guide
          </Link>
          <Link
            to="/setup"
            className="nav-link"
            activeProps={{ className: 'nav-link active' }}
          >
            Setup
          </Link>
          <Link
            to="/changelog"
            className="nav-link"
            activeProps={{ className: 'nav-link active' }}
          >
            Changelog
          </Link>
          <Link
            to="/sim"
            className="nav-link"
            activeProps={{ className: 'nav-link active' }}
          >
            Simulator
          </Link>
        </nav>

        {/* Actions */}
        <ThemeToggle />
      </div>
    </header>
  )
}
