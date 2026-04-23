import { useState, useEffect, useRef } from 'react'
import { Lock } from 'lucide-react'

const PASSWORD = import.meta.env.VITE_GATE_PASSWORD ?? ''
const STORAGE_KEY = 'tsw_auth_v1'

function isAuthed(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === btoa(PASSWORD)
  } catch {
    return false
  }
}

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)
  const [authed, setAuthed] = useState(false)
  const [input, setInput] = useState('')
  const [shake, setShake] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setAuthed(isAuthed())
    setReady(true)
  }, [])

  useEffect(() => {
    if (ready && !authed) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [ready, authed])

  function submit() {
    if (input === PASSWORD) {
      try { localStorage.setItem(STORAGE_KEY, btoa(PASSWORD)) } catch {}
      setAuthed(true)
    } else {
      setShake(true)
      setErrorMsg('Wrong password.')
      setInput('')
      setTimeout(() => { setShake(false); inputRef.current?.focus() }, 600)
    }
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter') submit()
  }

  // Don't flash anything on SSR / first paint
  if (!ready) return null

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
          animation: shake ? 'gate-shake 0.5s ease' : 'none',
        }}
      >
        {/* Brand */}
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

        {/* Form */}
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
            <p
              style={{
                margin: '0 0 1rem',
                fontSize: '0.78rem',
                color: '#f87171',
              }}
            >
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
