import { Link } from '@tanstack/react-router'

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: '6rem',
        borderTop: '1px solid var(--border)',
        padding: '2.5rem 0 3rem',
      }}
    >
      <div
        className="page-wrap"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
        }}
      >
        <div>
          <p style={{ margin: 0, fontWeight: 700, fontSize: '0.875rem', color: 'var(--text)' }}>
            TSW Minecraft
          </p>
          <p style={{ margin: '0.2rem 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Fabric 1.21.1 · {new Date().getFullYear()}
          </p>
        </div>

        <nav style={{ display: 'flex', gap: '1.5rem' }}>
          <Link to="/" className="nav-link" style={{ fontSize: '0.8rem' }}>
            Home
          </Link>
          <Link to="/mods" className="nav-link" style={{ fontSize: '0.8rem' }}>
            Mod Browser
          </Link>
          <Link to="/guide" className="nav-link" style={{ fontSize: '0.8rem' }}>
            New Player Guide
          </Link>
          <Link to="/setup" className="nav-link" style={{ fontSize: '0.8rem' }}>
            Prism Setup
          </Link>
          <Link to="/changelog" className="nav-link" style={{ fontSize: '0.8rem' }}>
            Changelog
          </Link>
          <Link to="/directed-guides" className="nav-link" style={{ fontSize: '0.8rem' }}>
            Directed Guides
          </Link>
        </nav>
      </div>
    </footer>
  )
}
