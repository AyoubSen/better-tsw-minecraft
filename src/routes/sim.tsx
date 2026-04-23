import { useState, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sim')({ component: SimPage })

// ─── Types ────────────────────────────────────────────────────────────────────

type Zone = 'hotbar' | 'inventory' | 'armor' | 'crafting' | 'offhand' | null

interface Step {
  title: string
  desc: string
  highlight: Zone
  tip?: string
}

// ─── Steps ────────────────────────────────────────────────────────────────────

const STEPS: Step[] = [
  {
    title: 'Your Inventory',
    desc: "Press E anywhere in the world to open your inventory. This is your most-visited screen — let's walk through each part. You can also click items to pick them up and move them around.",
    highlight: null,
  },
  {
    title: 'The Hotbar',
    desc: 'The 9 slots at the bottom row are your hotbar. These are always visible on your HUD while playing. Press 1–9 to select a slot, or scroll your mouse wheel. Whatever is in the selected slot is what you hold and use.',
    highlight: 'hotbar',
    tip: 'Put your most-used tools here — sword, pickaxe, torch, and food are a good start.',
  },
  {
    title: 'Main Inventory',
    desc: 'The 27 slots above the hotbar are your main storage. Items you pick up from the world land here. You can drag items between slots freely, or Shift+click to move a whole stack instantly.',
    highlight: 'inventory',
    tip: 'Shift+click also works with chests and crafting tables to transfer items quickly.',
  },
  {
    title: 'Armor Slots',
    desc: 'The 4 slots on the left hold your armor: helmet, chestplate, leggings, and boots (top to bottom). Equipped armor is shown on your character model and reduces incoming damage.',
    highlight: 'armor',
    tip: 'Even a full set of leather armor makes a noticeable difference when starting out.',
  },
  {
    title: '2×2 Crafting Grid',
    desc: 'The small grid in the top-right lets you craft basic recipes anywhere — wooden planks from logs, sticks from planks. For anything more complex (tools, armor, most recipes) you need a Crafting Table.',
    highlight: 'crafting',
    tip: 'Place a Crafting Table near your base early on — you will use it constantly.',
  },
  {
    title: 'Offhand Slot',
    desc: 'The slot in the bottom-right corner of the top panel is your offhand. Most players keep a shield here to block attacks. Press F in-game to swap your main-hand item into your offhand quickly.',
    highlight: 'offhand',
    tip: 'Right-click with a shield equipped in your offhand to raise it and block most attacks.',
  },
]

// ─── Initial inventory state ──────────────────────────────────────────────────

const INIT_HOTBAR   = ['⚔️', '⛏️', '🪓', '🍖', '🍎', '🔦', '', '', '🏹']
const INIT_INV      = [
  '🪵', '🪵', '🪵', '🪨', '🪨', '🪨', '', '🧱', '🧱',
  '💎', '', '🌾', '🌾', '🌾', '', '🎣', '', '',
  '', '🪙', '🪙', '🪙', '', '', '', '🍄', '',
]
const INIT_ARMOR    = ['⛑️', '🛡️', '🥼', '👢']
const INIT_CRAFTING = ['', '', '', '']
const INIT_OFFHAND  = '🛡️'

// ─── Minecraft UI constants ───────────────────────────────────────────────────

const SLOT = 42
const GAP  = 2

const MC = {
  panel:       '#c6c6c6',
  slot:        '#8b8b8b',
  borderDark:  '#373737',
  borderLight: '#ffffff',
  label:       '#404040',
}

// ─── Slot component ───────────────────────────────────────────────────────────

function McSlot({
  item = '',
  onClick,
  holding = false, // true when the user is carrying an item (shows hover tint)
}: {
  item?: string
  onClick?: () => void
  holding?: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width:      SLOT,
        height:     SLOT,
        background: holding && hovered ? '#a8a8a8' : MC.slot,
        borderTop:    `2px solid ${MC.borderDark}`,
        borderLeft:   `2px solid ${MC.borderDark}`,
        borderBottom: `2px solid ${MC.borderLight}`,
        borderRight:  `2px solid ${MC.borderLight}`,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        fontSize:    SLOT * 0.52,
        lineHeight:  1,
        flexShrink:  0,
        boxSizing:   'border-box',
        cursor:      onClick ? 'pointer' : 'default',
        transition:  'background 80ms',
        userSelect:  'none',
      }}
    >
      {item}
    </div>
  )
}

// ─── Zone highlight wrapper ───────────────────────────────────────────────────

function Zone({
  children,
  id,
  highlight,
  style,
}: {
  children: React.ReactNode
  id: Zone
  highlight: Zone
  style?: React.CSSProperties
}) {
  const active  = highlight !== null
  const isMe    = highlight === id
  const dimmed  = active && !isMe

  return (
    <div
      style={{
        borderRadius:  2,
        outline:       isMe ? '2px solid #2dd4bf' : '2px solid transparent',
        outlineOffset: 3,
        boxShadow:     isMe ? '0 0 20px rgba(45,212,191,0.35)' : 'none',
        opacity:       dimmed ? 0.4 : 1,
        transition:    'opacity 220ms, box-shadow 220ms, outline 220ms',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function SimPage() {
  const [step, setStep] = useState(0)

  // Inventory state — all mutable so drag & drop works
  const [hotbar,   setHotbar]   = useState([...INIT_HOTBAR])
  const [inv,      setInv]      = useState([...INIT_INV])
  const [armor,    setArmor]    = useState([...INIT_ARMOR])
  const [crafting, setCrafting] = useState([...INIT_CRAFTING])
  const [offhand,  setOffhand]  = useState(INIT_OFFHAND)

  // The item the user is currently "holding" on their cursor
  const [held,   setHeld]   = useState<string | null>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })

  // Track cursor for the floating held-item display
  useEffect(() => {
    function onMove(e: MouseEvent) {
      setCursor({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // ESC drops the held item; arrow keys navigate steps when not holding
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setHeld(null)
      if (held) return
      if (e.key === 'ArrowRight') setStep(s => Math.min(STEPS.length - 1, s + 1))
      if (e.key === 'ArrowLeft')  setStep(s => Math.max(0, s - 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [held])

  // ── Slot click logic ────────────────────────────────────────────────────────

  // For array-based zones (hotbar, inventory, armor, crafting)
  function clickArray(
    items: string[],
    setItems: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
  ) {
    if (held === null) {
      if (!items[index]) return
      setHeld(items[index])
      setItems(prev => { const n = [...prev]; n[index] = ''; return n })
    } else {
      const existing = items[index]
      setItems(prev => { const n = [...prev]; n[index] = held; return n })
      setHeld(existing || null)
    }
  }

  // For single-item slots (offhand)
  function clickSingle(item: string, setItem: React.Dispatch<React.SetStateAction<string>>) {
    if (held === null) {
      if (!item) return
      setHeld(item)
      setItem('')
    } else {
      setItem(held)
      setHeld(item || null)
    }
  }

  // Reset everything to initial state
  function reset() {
    setHotbar([...INIT_HOTBAR])
    setInv([...INIT_INV])
    setArmor([...INIT_ARMOR])
    setCrafting([...INIT_CRAFTING])
    setOffhand(INIT_OFFHAND)
    setHeld(null)
  }

  const highlight = STEPS[step].highlight
  const anyHL     = highlight !== null
  const isHolding = held !== null

  return (
    <main
      className="page-wrap"
      style={{ paddingTop: '3rem', paddingBottom: '5rem', maxWidth: 860 }}
    >
      {/* Header */}
      <div className="fade-up" style={{ marginBottom: '2.5rem' }}>
        <p className="label" style={{ marginBottom: '0.5rem' }}>Interactive Guide</p>
        <h1 className="display" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', marginBottom: '0.5rem' }}>
          Inventory Simulator
        </h1>
        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          A guided tour of the Minecraft inventory. Click items to pick them up and move them around.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>

        {/* ── Minecraft Inventory Panel ── */}
        <div
          // Right-click on the panel cancels the held item
          onContextMenu={e => { e.preventDefault(); setHeld(null) }}
          style={{
            background:   MC.panel,
            padding:      12,
            borderTop:    `3px solid ${MC.borderLight}`,
            borderLeft:   `3px solid ${MC.borderLight}`,
            borderBottom: `3px solid ${MC.borderDark}`,
            borderRight:  `3px solid ${MC.borderDark}`,
            userSelect:   'none',
            overflowX:    'auto',
            cursor:       isHolding ? 'none' : 'default',
          }}
        >
          {/* Top section: armor | player | crafting + offhand */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>

            {/* Armor column */}
            <Zone id="armor" highlight={highlight}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: GAP }}>
                {armor.map((item, i) => (
                  <McSlot
                    key={i}
                    item={item}
                    holding={isHolding}
                    onClick={() => clickArray(armor, setArmor, i)}
                  />
                ))}
              </div>
            </Zone>

            {/* Player model */}
            <div
              style={{
                width:      SLOT * 2 + GAP,
                height:     SLOT * 4 + GAP * 3,
                background: MC.slot,
                borderTop:    `2px solid ${MC.borderDark}`,
                borderLeft:   `2px solid ${MC.borderDark}`,
                borderBottom: `2px solid ${MC.borderLight}`,
                borderRight:  `2px solid ${MC.borderLight}`,
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                fontSize:    52,
                flexShrink:  0,
                opacity:     anyHL ? 0.4 : 1,
                transition:  'opacity 220ms',
              }}
            >
              🧍
            </div>

            {/* Crafting area + offhand below */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignSelf: 'stretch' }}>
              <Zone id="crafting" highlight={highlight}>
                <p style={{ margin: '0 0 5px', fontSize: 10, color: MC.label, fontWeight: 700 }}>
                  Crafting
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: `${SLOT}px ${SLOT}px`, gap: GAP }}>
                    {crafting.map((item, i) => (
                      <McSlot
                        key={i}
                        item={item}
                        holding={isHolding}
                        onClick={() => clickArray(crafting, setCrafting, i)}
                      />
                    ))}
                  </div>
                  <span style={{ color: MC.label, fontSize: 20, fontWeight: 700 }}>→</span>
                  {/* Output slot — raised border (reversed) */}
                  <div
                    style={{
                      width:      SLOT + 8,
                      height:     SLOT + 8,
                      background: MC.slot,
                      borderTop:    `2px solid ${MC.borderLight}`,
                      borderLeft:   `2px solid ${MC.borderLight}`,
                      borderBottom: `2px solid ${MC.borderDark}`,
                      borderRight:  `2px solid ${MC.borderDark}`,
                    }}
                  />
                </div>
              </Zone>

              {/* Offhand — bottom-right of top section */}
              <Zone id="offhand" highlight={highlight} style={{ alignSelf: 'flex-end' }}>
                <McSlot
                  item={offhand}
                  holding={isHolding}
                  onClick={() => clickSingle(offhand, setOffhand)}
                />
              </Zone>
            </div>

          </div>

          {/* Inventory label */}
          <p style={{ margin: '0 0 4px', fontSize: 10, color: MC.label, fontWeight: 700 }}>
            Inventory
          </p>

          {/* Main inventory — 3 × 9 */}
          <Zone id="inventory" highlight={highlight} style={{ marginBottom: GAP }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(9, ${SLOT}px)`,
                gap: GAP,
                marginBottom: GAP,
              }}
            >
              {inv.map((item, i) => (
                <McSlot
                  key={i}
                  item={item}
                  holding={isHolding}
                  onClick={() => clickArray(inv, setInv, i)}
                />
              ))}
            </div>
          </Zone>

          {/* Hotbar — 1 × 9, separated by a top border */}
          <Zone id="hotbar" highlight={highlight}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(9, ${SLOT}px)`,
                gap: GAP,
                paddingTop: 4,
                borderTop: `2px solid ${MC.borderDark}`,
              }}
            >
              {hotbar.map((item, i) => (
                <McSlot
                  key={i}
                  item={item}
                  holding={isHolding}
                  onClick={() => clickArray(hotbar, setHotbar, i)}
                />
              ))}
            </div>
          </Zone>
        </div>

        {/* Reset hint */}
        {isHolding && (
          <p style={{ margin: '-0.5rem 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Right-click or press Esc to cancel
          </p>
        )}

        {/* ── Step card ── */}
        <div
          style={{
            width:      '100%',
            maxWidth:   620,
            background: 'var(--bg-card)',
            border:     '1px solid var(--border)',
            borderRadius: '1rem',
            padding:    '1.5rem',
          }}
        >
          {/* Progress dots */}
          <div style={{ display: 'flex', gap: 6, marginBottom: '1.25rem' }}>
            {STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                aria-label={`Step ${i + 1}`}
                style={{
                  width:      i === step ? 22 : 8,
                  height:     8,
                  borderRadius: 4,
                  border:     'none',
                  background: i === step ? 'var(--accent)' : 'var(--border)',
                  cursor:     'pointer',
                  padding:    0,
                  transition: 'width 200ms, background 200ms',
                }}
              />
            ))}
          </div>

          <h2
            className="display"
            style={{ margin: '0 0 0.5rem', fontSize: '1.1rem', color: 'var(--text)' }}
          >
            {STEPS[step].title}
          </h2>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-soft)', lineHeight: 1.75 }}>
            {STEPS[step].desc}
          </p>

          {STEPS[step].tip && (
            <div
              style={{
                marginTop:  '1rem',
                padding:    '0.6rem 0.875rem',
                background: 'var(--accent-dim)',
                border:     '1px solid var(--accent-ring)',
                borderRadius: '0.5rem',
                fontSize:   '0.8rem',
                color:      'var(--accent)',
                lineHeight: 1.6,
              }}
            >
              <strong>Tip:</strong> {STEPS[step].tip}
            </div>
          )}

          {/* Navigation */}
          <div
            style={{
              display:        'flex',
              justifyContent: 'space-between',
              alignItems:     'center',
              marginTop:      '1.5rem',
            }}
          >
            <button
              onClick={() => setStep(s => Math.max(0, s - 1))}
              disabled={step === 0}
              className="btn-ghost"
              style={{
                padding: '0.5rem 1.25rem',
                fontSize: '0.83rem',
                opacity: step === 0 ? 0.3 : 1,
                cursor:  step === 0 ? 'default' : 'pointer',
              }}
            >
              ← Back
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button
                onClick={reset}
                style={{
                  background: 'none',
                  border:     'none',
                  fontSize:   '0.75rem',
                  color:      'var(--text-muted)',
                  cursor:     'pointer',
                  padding:    0,
                  textDecoration: 'underline',
                }}
              >
                Reset items
              </button>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {step + 1} / {STEPS.length}
              </span>
            </div>

            {step < STEPS.length - 1 ? (
              <button
                onClick={() => setStep(s => s + 1)}
                className="btn-primary"
                style={{ padding: '0.5rem 1.25rem', fontSize: '0.83rem' }}
              >
                Next →
              </button>
            ) : (
              <button
                onClick={() => setStep(0)}
                className="btn-primary"
                style={{ padding: '0.5rem 1.25rem', fontSize: '0.83rem' }}
              >
                Restart
              </button>
            )}
          </div>
        </div>

      </div>

      {/* ── Floating held item (follows cursor) ── */}
      {held && (
        <div
          style={{
            position:      'fixed',
            left:           cursor.x - SLOT / 2,
            top:            cursor.y - SLOT / 2,
            width:          SLOT,
            height:         SLOT,
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            fontSize:       SLOT * 0.56,
            pointerEvents:  'none',
            zIndex:         9999,
            filter:         'drop-shadow(0 2px 8px rgba(0,0,0,0.55))',
          }}
        >
          {held}
        </div>
      )}
    </main>
  )
}
