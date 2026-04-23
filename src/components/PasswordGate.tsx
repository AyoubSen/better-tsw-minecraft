// PASSWORD GATE — temporarily disabled. Uncomment the default export below to re-enable.
// To re-enable: comment out the passthrough export and uncomment the full component.

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

/*
import { useState, useEffect, useRef } from 'react'
import { Lock } from 'lucide-react'

// Password is set via VITE_GATE_PASSWORD in .env.local — never hardcode it here.
// Falls back to empty string so the gate always blocks if the env var is missing.
const PASSWORD = import.meta.env.VITE_GATE_PASSWORD ?? ''

// Versioned key so we can invalidate all existing sessions by bumping the suffix (e.g. _v2).
const STORAGE_KEY = 'tsw_auth_v1'

// Checks localStorage for a previously stored auth token.
// We store btoa(PASSWORD) rather than the plaintext password — not cryptographically
// strong, but enough to prevent casual snooping in DevTools.
function isAuthed(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === btoa(PASSWORD)
  } catch {
    // localStorage can throw in private-browsing mode or when storage is full.
    return false
  }
}

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  // `ready` stays false until after the first client-side render.
  // This prevents the gate UI from flashing on SSR or flickering on hydration —
  // the server can't know auth state, so we render nothing until the client checks.
  const [ready, setReady] = useState(false)
  const [authed, setAuthed] = useState(false)
  const [input, setInput] = useState('')
  const [shake, setShake] = useState(false) // drives the CSS shake animation on wrong password
  const [errorMsg, setErrorMsg] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // On mount: check localStorage and mark the gate as ready to render.
  useEffect(() => {
    setAuthed(isAuthed())
    setReady(true)
  }, [])

  // Auto-focus the password field once the gate is visible.
  // The 50ms delay gives the DOM time to paint before we steal focus.
  useEffect(() => {
    if (ready && !authed) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [ready, authed])

  function submit() {
    if (input === PASSWORD) {
      // Persist the token so the user doesn't need to re-enter on refresh.
      try { localStorage.setItem(STORAGE_KEY, btoa(PASSWORD)) } catch {}
      setAuthed(true)
    } else {
      // Wrong password: shake the card, show an error, clear the field, re-focus.
      setShake(true)
      setErrorMsg('Wrong password.')
      setInput('')
      setTimeout(() => { setShake(false); inputRef.current?.focus() }, 600)
    }
  }

  // Allow submitting with Enter instead of clicking the button.
  function onKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter') submit()
  }

  // Don't flash anything on SSR / first paint
  if (!ready) return null

  // Gate passed — render the rest of the app normally.
  if (authed) return <>{children}</>

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg)',
        padding: '1.5rem',
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 360,
          // The shake animation is applied here so the whole card jiggles, not just the input.
          animation: shake ? 'gate-shake 0.5s ease' : 'none',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'var(--accent-dim)',
              border: '1px solid var(--accent-ring)',
              marginBottom: '1rem',
            }}
          >
            <Lock size={18} color="var(--accent)" />
          </div>
          <h1
            className="display"
            style={{ margin: 0, fontSize: '1.4rem', color: 'var(--text)' }}
          >
            TSW Minecraft
          </h1>
          <p style={{ margin: '0.4rem 0 0', fontSize: '0.83rem', color: 'var(--text-muted)' }}>
            Private server — friends only
          </p>
        </div>

        <div
          style={{
            padding: '1.75rem',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '1rem',
          }}
        >
          <label
            htmlFor="gate-password"
            style={{
              display: 'block',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: 'var(--text-soft)',
              marginBottom: '0.5rem',
              letterSpacing: '0.04em',
            }}
          >
            Password
          </label>
          <input
            id="gate-password"
            ref={inputRef}
            type="password"
            value={input}
            onChange={(e) => { setInput(e.target.value); setErrorMsg('') }}
            onKeyDown={onKey}
            placeholder="Enter password…"
            autoComplete="current-password"
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '0.65rem 0.875rem',
              background: 'var(--bg)',
              border: `1px solid ${errorMsg ? 'rgba(248,113,113,0.6)' : 'var(--border)'}`,
              borderRadius: '0.5rem',
              color: 'var(--text)',
              fontSize: '0.875rem',
              fontFamily: 'inherit',
              outline: 'none',
              transition: 'border-color 150ms ease',
              marginBottom: errorMsg ? '0.5rem' : '1rem',
            }}
            onFocus={(e) => {
              if (!errorMsg) (e.target as HTMLInputElement).style.borderColor = 'var(--accent)'
            }}
            onBlur={(e) => {
              (e.target as HTMLInputElement).style.borderColor = errorMsg
                ? 'rgba(248,113,113,0.6)'
                : 'var(--border)'
            }}
          />

          {errorMsg && (
            <p style={{ margin: '0 0 1rem', fontSize: '0.78rem', color: '#f87171' }}>
              {errorMsg}
            </p>
          )}

          <button
            type="button"
            onClick={submit}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Enter
          </button>
        </div>
      </div>

      <style>{`
        @keyframes gate-shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-8px); }
          40%       { transform: translateX(8px); }
          60%       { transform: translateX(-6px); }
          80%       { transform: translateX(6px); }
        }
      `}</style>
    </div>
  )
}
*/
