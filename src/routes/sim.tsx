import { useState, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sim')({ component: SimPage })

// ─── Shared types ─────────────────────────────────────────────────────────────

interface SlotItem { item: string; count: number }
type Slot = SlotItem | ''

interface Step<H extends string | null = string | null> {
  title: string
  desc: string
  highlight: H
  tip?: string
}

type Screen = 'inventory' | 'hud' | 'emi'

// ─── Shared constants ─────────────────────────────────────────────────────────

const SLOT    = 42
const GAP     = 2
const MC_FONT = '"Press Start 2P", monospace'

const MC = {
  panel:       '#c6c6c6',
  slot:        '#8b8b8b',
  borderDark:  '#373737',
  borderLight: '#ffffff',
  label:       '#404040',
}

const s = (item: string, count = 1): SlotItem => ({ item, count })

// ─── Shared components ────────────────────────────────────────────────────────

// Generic zone wrapper — dims when a different zone is highlighted
function Zone({
  id, highlight, children, style,
}: {
  id: string
  highlight: string | null
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  const active = highlight !== null
  const isMe   = highlight === id
  const dimmed = active && !isMe
  return (
    <div style={{
      borderRadius:  2,
      outline:       isMe ? '2px solid #2dd4bf' : '2px solid transparent',
      outlineOffset: 3,
      boxShadow:     isMe ? '0 0 20px rgba(45,212,191,0.35)' : 'none',
      opacity:       dimmed ? 0.35 : 1,
      transition:    'opacity 250ms, box-shadow 250ms, outline 250ms',
      ...style,
    }}>
      {children}
    </div>
  )
}

// Minecraft-style inventory slot with optional stack count
function McSlot({
  slot, onClick, holding = false, size = SLOT,
}: {
  slot: Slot
  onClick?: () => void
  holding?: boolean
  size?: number
}) {
  const [hovered, setHovered] = useState(false)
  const isEmpty = slot === ''
  const item    = isEmpty ? '' : slot.item
  const count   = isEmpty ? 0  : slot.count

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width:  size, height: size,
        background: holding && hovered ? '#a8a8a8' : MC.slot,
        borderTop:    `2px solid ${MC.borderDark}`,
        borderLeft:   `2px solid ${MC.borderDark}`,
        borderBottom: `2px solid ${MC.borderLight}`,
        borderRight:  `2px solid ${MC.borderLight}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: size * 0.52, lineHeight: 1,
        flexShrink: 0, boxSizing: 'border-box', position: 'relative',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'background 80ms', userSelect: 'none',
      }}
    >
      {item}
      {count > 1 && (
        <span style={{
          position: 'absolute', bottom: 2, right: 2,
          fontSize: 7, fontFamily: MC_FONT,
          color: '#fff', textShadow: '1px 1px 0 #3f3f3f',
          lineHeight: 1, pointerEvents: 'none',
        }}>
          {count}
        </span>
      )}
    </div>
  )
}

// Step card shared by all screens
function StepCard({
  steps, step, setStep,
  extra,
}: {
  steps: Step[]
  step: number
  setStep: React.Dispatch<React.SetStateAction<number>>
  extra?: React.ReactNode
}) {
  const current = steps[step]
  return (
    <div style={{
      width: '100%', maxWidth: 620,
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: '1rem', padding: '1.5rem',
    }}>
      {/* Progress dots */}
      <div style={{ display: 'flex', gap: 6, marginBottom: '1.25rem' }}>
        {steps.map((_, i) => (
          <button key={i} onClick={() => setStep(i)} aria-label={`Step ${i + 1}`}
            style={{
              width: i === step ? 22 : 8, height: 8, borderRadius: 4,
              border: 'none', padding: 0, cursor: 'pointer',
              background: i === step ? 'var(--accent)' : 'var(--border)',
              transition: 'width 200ms, background 200ms',
            }}
          />
        ))}
      </div>

      <h2 className="display" style={{ margin: '0 0 0.5rem', fontSize: '1.1rem', color: 'var(--text)' }}>
        {current.title}
      </h2>
      <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-soft)', lineHeight: 1.75 }}>
        {current.desc}
      </p>

      {current.tip && (
        <div style={{
          marginTop: '1rem', padding: '0.6rem 0.875rem',
          background: 'var(--accent-dim)', border: '1px solid var(--accent-ring)',
          borderRadius: '0.5rem', fontSize: '0.8rem', color: 'var(--accent)', lineHeight: 1.6,
        }}>
          <strong>Tip:</strong> {current.tip}
        </div>
      )}

      {extra}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
        <button
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={step === 0}
          className="btn-ghost"
          style={{ padding: '0.5rem 1.25rem', fontSize: '0.83rem', opacity: step === 0 ? 0.3 : 1, cursor: step === 0 ? 'default' : 'pointer' }}
        >
          ← Back
        </button>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {step + 1} / {steps.length}
        </span>
        {step < steps.length - 1 ? (
          <button onClick={() => setStep(s => s + 1)} className="btn-primary"
            style={{ padding: '0.5rem 1.25rem', fontSize: '0.83rem' }}>
            Next →
          </button>
        ) : (
          <button onClick={() => setStep(0)} className="btn-primary"
            style={{ padding: '0.5rem 1.25rem', fontSize: '0.83rem' }}>
            Restart
          </button>
        )}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCREEN 1 — Inventory
// ═══════════════════════════════════════════════════════════════════════════════

type InvZone = 'hotbar' | 'inventory' | 'armor' | 'crafting' | 'offhand' | null

const INV_STEPS: Step<InvZone>[] = [
  { title: 'Your Inventory', highlight: null,
    desc: "Press E anywhere in the world to open your inventory. This is your most-visited screen — let's walk through each part. You can click items to pick them up and move them around." },
  { title: 'The Hotbar', highlight: 'hotbar',
    desc: 'The 9 slots at the bottom row are your hotbar. These are always visible on your HUD while playing. Press 1–9 to select a slot, or scroll your mouse wheel.',
    tip: 'Put your most-used tools here — sword, pickaxe, torch, and food are a good start.' },
  { title: 'Main Inventory', highlight: 'inventory',
    desc: 'The 27 slots above the hotbar are your main storage. Items you pick up from the world land here. You can drag items between slots freely.',
    tip: 'Shift+click an item to instantly move a full stack between your inventory and a chest.' },
  { title: 'Armor Slots', highlight: 'armor',
    desc: 'The 4 slots on the left hold your armor: helmet, chestplate, leggings, and boots (top to bottom). Equipped armor is shown on your character model and reduces incoming damage.',
    tip: 'Even a full set of leather armor makes a noticeable difference when starting out.' },
  { title: '2×2 Crafting Grid', highlight: 'crafting',
    desc: 'The small grid in the top-right lets you craft basic recipes anywhere — wooden planks from logs, sticks from planks. For anything more complex you need a Crafting Table.',
    tip: 'Place a Crafting Table near your base early on — you will use it constantly.' },
  { title: 'Offhand Slot', highlight: 'offhand',
    desc: 'The slot in the bottom-right of the top panel is your offhand. Most players keep a shield here. Press F in-game to swap your main-hand item into your offhand quickly.',
    tip: 'Right-click with a shield in your offhand to raise it and block most attacks.' },
]

const INIT_HOTBAR: Slot[]   = [s('⚔️'), s('⛏️'), s('🪓'), s('🍖', 8), s('🍎', 6), s('🔦', 4), '', '', s('🏹')]
const INIT_INV: Slot[]      = [
  s('🪵', 42), s('🪵', 27), s('🪵', 13), s('🪨', 64), s('🪨', 64), s('🪨', 33), '', s('🧱', 16), s('🧱', 16),
  s('💎', 3),  '',           s('🌾', 18), s('🌾', 18),  s('🌾', 7),  '',          s('🎣'),       '',          '',
  '',           s('🪙', 12), s('🪙', 12), s('🪙', 4),   '',          '',           '',            s('🍄', 5),  '',
]
const INIT_ARMOR: Slot[]    = [s('⛑️'), s('🛡️'), s('🥼'), s('👢')]
const INIT_CRAFTING: Slot[] = ['', '', '', '']
const INIT_OFFHAND: Slot    = s('🛡️')

function InventoryScreen() {
  const [step, setStep]         = useState(0)
  const [hotbar,   setHotbar]   = useState<Slot[]>([...INIT_HOTBAR])
  const [inv,      setInv]      = useState<Slot[]>([...INIT_INV])
  const [armor,    setArmor]    = useState<Slot[]>([...INIT_ARMOR])
  const [crafting, setCrafting] = useState<Slot[]>([...INIT_CRAFTING])
  const [offhand,  setOffhand]  = useState<Slot>(INIT_OFFHAND)
  const [held,     setHeld]     = useState<SlotItem | null>(null)
  const [cursor,   setCursor]   = useState({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setHeld(null)
      if (held) return
      if (e.key === 'ArrowRight') setStep(s => Math.min(INV_STEPS.length - 1, s + 1))
      if (e.key === 'ArrowLeft')  setStep(s => Math.max(0, s - 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [held])

  function clickArray(items: Slot[], setItems: React.Dispatch<React.SetStateAction<Slot[]>>, index: number) {
    if (held === null) {
      if (items[index] === '') return
      setHeld(items[index] as SlotItem)
      setItems(prev => { const n = [...prev]; n[index] = ''; return n })
    } else {
      const existing = items[index]
      setItems(prev => { const n = [...prev]; n[index] = held; return n })
      setHeld(existing === '' ? null : existing as SlotItem)
    }
  }

  function clickSingle(slot: Slot, setSlot: React.Dispatch<React.SetStateAction<Slot>>) {
    if (held === null) {
      if (slot === '') return
      setHeld(slot as SlotItem)
      setSlot('')
    } else {
      setSlot(held)
      setHeld(slot === '' ? null : slot as SlotItem)
    }
  }

  function reset() {
    setHotbar([...INIT_HOTBAR]); setInv([...INIT_INV])
    setArmor([...INIT_ARMOR]);   setCrafting([...INIT_CRAFTING])
    setOffhand(INIT_OFFHAND);    setHeld(null)
  }

  const highlight = INV_STEPS[step].highlight as string | null
  const anyHL     = highlight !== null
  const isHolding = held !== null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', width: '100%' }}>
      <div
        onContextMenu={e => { e.preventDefault(); setHeld(null) }}
        style={{
          background: MC.panel, padding: 12,
          borderTop:    `3px solid ${MC.borderLight}`,
          borderLeft:   `3px solid ${MC.borderLight}`,
          borderBottom: `3px solid ${MC.borderDark}`,
          borderRight:  `3px solid ${MC.borderDark}`,
          userSelect: 'none', overflowX: 'auto',
          cursor: isHolding ? 'none' : 'default',
        }}
      >
        {/* Top section */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
          <Zone id="armor" highlight={highlight}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: GAP }}>
              {armor.map((slot, i) => (
                <McSlot key={i} slot={slot} holding={isHolding} onClick={() => clickArray(armor, setArmor, i)} />
              ))}
            </div>
          </Zone>

          <div style={{
            width: SLOT * 2 + GAP, height: SLOT * 4 + GAP * 3,
            background: MC.slot,
            borderTop: `2px solid ${MC.borderDark}`, borderLeft: `2px solid ${MC.borderDark}`,
            borderBottom: `2px solid ${MC.borderLight}`, borderRight: `2px solid ${MC.borderLight}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 52, flexShrink: 0,
            opacity: anyHL ? 0.35 : 1, transition: 'opacity 250ms',
          }}>🧍</div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignSelf: 'stretch' }}>
            <Zone id="crafting" highlight={highlight}>
              <p style={{ margin: '0 0 5px', fontSize: 8, fontFamily: MC_FONT, color: MC.label }}>Crafting</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ display: 'grid', gridTemplateColumns: `${SLOT}px ${SLOT}px`, gap: GAP }}>
                  {crafting.map((slot, i) => (
                    <McSlot key={i} slot={slot} holding={isHolding} onClick={() => clickArray(crafting, setCrafting, i)} />
                  ))}
                </div>
                <span style={{ color: MC.label, fontSize: 20, fontWeight: 700 }}>→</span>
                <div style={{
                  width: SLOT + 8, height: SLOT + 8, background: MC.slot,
                  borderTop: `2px solid ${MC.borderLight}`, borderLeft: `2px solid ${MC.borderLight}`,
                  borderBottom: `2px solid ${MC.borderDark}`, borderRight: `2px solid ${MC.borderDark}`,
                }} />
              </div>
            </Zone>
            <Zone id="offhand" highlight={highlight} style={{ alignSelf: 'flex-end' }}>
              <McSlot slot={offhand} holding={isHolding} onClick={() => clickSingle(offhand, setOffhand)} />
            </Zone>
          </div>
        </div>

        <p style={{ margin: '0 0 4px', fontSize: 8, fontFamily: MC_FONT, color: MC.label }}>Inventory</p>

        <Zone id="inventory" highlight={highlight} style={{ marginBottom: GAP }}>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(9, ${SLOT}px)`, gap: GAP, marginBottom: GAP }}>
            {inv.map((slot, i) => (
              <McSlot key={i} slot={slot} holding={isHolding} onClick={() => clickArray(inv, setInv, i)} />
            ))}
          </div>
        </Zone>

        <Zone id="hotbar" highlight={highlight}>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(9, ${SLOT}px)`, gap: GAP, paddingTop: 4, borderTop: `2px solid ${MC.borderDark}` }}>
            {hotbar.map((slot, i) => (
              <McSlot key={i} slot={slot} holding={isHolding} onClick={() => clickArray(hotbar, setHotbar, i)} />
            ))}
          </div>
        </Zone>
      </div>

      {isHolding && (
        <p style={{ margin: '-0.5rem 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Right-click or Esc to cancel
        </p>
      )}

      <StepCard steps={INV_STEPS} step={step} setStep={setStep} extra={
        <button onClick={reset} style={{
          display: 'block', marginTop: '1rem',
          background: 'none', border: 'none', fontSize: '0.75rem',
          color: 'var(--text-muted)', cursor: 'pointer', padding: 0, textDecoration: 'underline',
        }}>
          Reset items
        </button>
      } />

      {held && (
        <div style={{
          position: 'fixed', left: cursor.x - SLOT / 2, top: cursor.y - SLOT / 2,
          width: SLOT, height: SLOT, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: SLOT * 0.56, pointerEvents: 'none', zIndex: 9999,
          filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.55))',
        }}>
          {held.item}
          {held.count > 1 && (
            <span style={{
              position: 'absolute', bottom: 2, right: 2,
              fontSize: 7, fontFamily: MC_FONT, color: '#fff',
              textShadow: '1px 1px 0 #3f3f3f', lineHeight: 1, pointerEvents: 'none',
            }}>
              {held.count}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCREEN 2 — HUD
// ═══════════════════════════════════════════════════════════════════════════════

type HUDZone = 'crosshair' | 'health' | 'hunger' | 'xp' | 'hotbar' | null

const HUD_STEPS: Step<HUDZone>[] = [
  { title: 'The Playing HUD', highlight: null,
    desc: "This is what you see while actually playing — no menus, just the world. Unlike the inventory screen, this is always visible. Each element gives you critical information at a glance." },
  { title: 'The Crosshair', highlight: 'crosshair',
    desc: 'The + in the center of your screen shows exactly where you\'re aiming. Left-click to mine blocks or attack. Right-click to place blocks or interact with objects and entities.',
    tip: 'You can only interact with things within about 4–5 blocks of reach from the crosshair.' },
  { title: 'Health Bar', highlight: 'health',
    desc: 'The 10 hearts above the hotbar show your current health. Each full heart is 2 HP, so you have 20 HP total. Hearts deplete when you take damage from mobs, falls, fire, or starvation.',
    tip: 'Health regenerates slowly on its own as long as your hunger bar is above 6 drumsticks.' },
  { title: 'Hunger Bar', highlight: 'hunger',
    desc: 'The 10 drumsticks mirror the health bar on the right. Hunger depletes as you sprint, jump, and heal. When it hits zero you stop regenerating health — and on Hard difficulty you take damage.',
    tip: 'Always carry cooked meat. Steak and pork chops restore the most hunger per item.' },
  { title: 'Experience Bar', highlight: 'xp',
    desc: 'The green bar between the hearts/hunger and your hotbar shows XP progress toward the next level. Your current level is shown as a number above the bar. Earn XP by killing mobs, smelting, fishing, and mining ores.',
    tip: 'Higher levels let you apply stronger enchantments. Dying drops all your XP — keep that in mind.' },
  { title: 'The Hotbar', highlight: 'hotbar',
    desc: 'The 9 slots at the very bottom are your hotbar — the same slots you manage in your inventory. The selected slot has a bright outline. Press 1–9 or scroll to switch.',
    tip: 'The name of the item in your selected slot briefly appears just above the hotbar when you switch.' },
]

// Small pixel-art heart row
function Hearts({ current, highlight }: { current: number; highlight: string | null }) {
  return (
    <Zone id="health" highlight={highlight}>
      <div style={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        {Array.from({ length: 10 }, (_, i) => {
          const hp   = current - i * 2
          const full = hp >= 2
          const half = hp === 1
          return (
            <div key={i} style={{ position: 'relative', width: 10, height: 10, flexShrink: 0 }}>
              {/* Empty heart */}
              <span style={{ position: 'absolute', inset: 0, fontSize: 10, lineHeight: 1, color: '#5a0000', fontFamily: MC_FONT }}>♥</span>
              {/* Filled heart (clipped for half) */}
              {(full || half) && (
                <span style={{
                  position: 'absolute', inset: 0, fontSize: 10, lineHeight: 1,
                  color: '#FF2222', fontFamily: MC_FONT,
                  clipPath: half ? 'inset(0 50% 0 0)' : undefined,
                }}>♥</span>
              )}
            </div>
          )
        })}
      </div>
    </Zone>
  )
}

// Hunger drumstick row
function HungerBar({ current, highlight }: { current: number; highlight: string | null }) {
  return (
    <Zone id="hunger" highlight={highlight}>
      <div style={{ display: 'flex', flexDirection: 'row-reverse', gap: 1, alignItems: 'center' }}>
        {Array.from({ length: 10 }, (_, i) => {
          const val  = current - i * 2
          const full = val >= 2
          const half = val === 1
          const opacity = full || half ? 1 : 0.25
          return (
            <span key={i} style={{ fontSize: 11, lineHeight: 1, opacity, filter: full || half ? 'none' : 'grayscale(1)' }}>
              🍗
            </span>
          )
        })}
      </div>
    </Zone>
  )
}

// XP bar
function XPBar({ level, progress, highlight }: { level: number; progress: number; highlight: string | null }) {
  return (
    <Zone id="xp" highlight={highlight}>
      <div style={{ position: 'relative', height: 5, background: '#141414', marginBottom: 2 }}>
        <div style={{
          position: 'absolute', inset: 0, width: `${progress * 100}%`,
          background: '#7BFC22',
        }} />
      </div>
      <div style={{ textAlign: 'center', fontSize: 7, fontFamily: MC_FONT, color: '#7BFC22', textShadow: '1px 1px 0 #1a4a00' }}>
        {level}
      </div>
    </Zone>
  )
}

// HUD crosshair
function Crosshair({ highlight }: { highlight: string | null }) {
  return (
    <Zone id="crosshair" highlight={highlight} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <div style={{ position: 'relative', width: 16, height: 16 }}>
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 2, background: 'rgba(255,255,255,0.85)', transform: 'translateY(-50%)', boxShadow: '0 0 2px rgba(0,0,0,0.8)' }} />
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: 'rgba(255,255,255,0.85)', transform: 'translateX(-50%)', boxShadow: '0 0 2px rgba(0,0,0,0.8)' }} />
      </div>
    </Zone>
  )
}

// Simple MC-world scene used as background in HUD screen
// Horizon sits at 42% from the top of the game window
const HORIZON = 42

function WorldScene() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>

      {/* ── Sky ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(to bottom, #6aafd6 0%, #87ceeb ${HORIZON - 10}%, #b8ddf5 ${HORIZON}%)`,
      }} />

      {/* Wispy clouds — thin pill shapes at various depths */}
      {[
        { top: '5%',  left: '3%',  w: '18%', h: '2.8%', op: 0.92 },
        { top: '7%',  left: '14%', w: '10%', h: '2%',   op: 0.80 },
        { top: '10%', left: '32%', w: '22%', h: '3%',   op: 0.88 },
        { top: '8%',  left: '53%', w: '16%', h: '2.5%', op: 0.85 },
        { top: '13%', left: '68%', w: '24%', h: '2.8%', op: 0.90 },
        { top: '18%', left: '8%',  w: '14%', h: '2%',   op: 0.70 },
        { top: '22%', left: '44%', w: '18%', h: '1.8%', op: 0.65 },
        { top: '26%', left: '75%', w: '20%', h: '2%',   op: 0.60 },
        // Distant thin wisps near horizon
        { top: '33%', left: '20%', w: '28%', h: '1.2%', op: 0.45 },
        { top: '36%', left: '55%', w: '22%', h: '1%',   op: 0.40 },
      ].map((c, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: c.top, left: c.left, width: c.w, height: c.h,
          background: `rgba(255,255,255,${c.op})`,
          borderRadius: '50%',
          filter: 'blur(1.5px)',
        }} />
      ))}

      {/* Horizon haze — soft glow where sky meets ground */}
      <div style={{
        position: 'absolute',
        top: `${HORIZON - 5}%`, height: '10%',
        left: 0, right: 0,
        background: 'linear-gradient(to bottom, transparent, rgba(210,235,252,0.55), transparent)',
        filter: 'blur(3px)',
      }} />

      {/* ── Ground ── */}
      <div style={{
        position: 'absolute',
        top: `${HORIZON}%`, bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(to bottom, #8bc34a 0%, #7cb342 30%, #689f38 100%)',
      }} />

      {/* Perspective grid — SVG lines converging at the vanishing point */}
      <svg
        viewBox="0 0 100 58"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          top: `${HORIZON}%`, bottom: 0, left: 0, right: 0,
          height: `${100 - HORIZON}%`,
          opacity: 0.10,
        }}
      >
        {/* Vertical lines radiating from horizon center */}
        {[5, 15, 25, 35, 45, 55, 65, 75, 85, 95].map(x => (
          <line key={x} x1={x} y1={58} x2={50} y2={0} stroke="#1a3a00" strokeWidth="0.5" />
        ))}
        {/* Horizontal lines — exponentially spaced to fake perspective depth */}
        {[52, 44, 34, 24, 15, 8, 3, 1].map(y => (
          <line key={y} x1={0} y1={y} x2={100} y2={y} stroke="#1a3a00" strokeWidth="0.4" />
        ))}
      </svg>

      {/* ── Far background structures (at horizon) ── */}

      {/* Building — left side, sitting on the horizon */}
      <div style={{ position: 'absolute', top: `${HORIZON - 11}%`, left: '4%' }}>
        {/* Roof */}
        <div style={{ width: 72, height: 18, background: '#4a2008' }} />
        {/* Walls */}
        <div style={{ width: 72, height: 32, background: '#6b3a18', display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingTop: 6 }}>
          <div style={{ width: 11, height: 11, background: '#c4934a', opacity: 0.7 }} />
          <div style={{ width: 11, height: 11, background: '#c4934a', opacity: 0.7 }} />
          <div style={{ width: 11, height: 11, background: '#c4934a', opacity: 0.7 }} />
        </div>
      </div>

      {/* Trees — round leafy tops like in the screenshot */}
      {[
        { left: '28%', leafW: 32, leafH: 26, trunkW: 9, trunkH: 16 },
        { left: '33%', leafW: 26, leafH: 22, trunkW: 7, trunkH: 14 },
        { left: '70%', leafW: 30, leafH: 24, trunkW: 8, trunkH: 15 },
        { left: '75%', leafW: 22, leafH: 18, trunkW: 6, trunkH: 12 },
      ].map((t, i) => (
        <div key={i} style={{ position: 'absolute', top: `${HORIZON - 10}%`, left: t.left, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Leaf ball — slightly irregular */}
          <div style={{
            width: t.leafW, height: t.leafH,
            background: '#3d7a1e',
            borderRadius: '45% 55% 50% 50%',
            boxShadow: `inset -4px -3px 0 rgba(0,0,0,0.15), inset 3px 2px 0 rgba(255,255,255,0.08)`,
            marginBottom: -3,
          }} />
          {/* Trunk */}
          <div style={{ width: t.trunkW, height: t.trunkH, background: '#5c3317' }} />
        </div>
      ))}

      {/* Distant tiny structures on horizon */}
      <div style={{ position: 'absolute', top: `${HORIZON - 4}%`, left: '52%', width: 30, height: 20, background: '#4a3520', opacity: 0.6 }} />
      <div style={{ position: 'absolute', top: `${HORIZON - 6}%`, left: '55%', width: 18, height: 24, background: '#3d2e1a', opacity: 0.5 }} />

    </div>
  )
}

const HUD_HOTBAR: Slot[] = [s('⚔️'), s('⛏️'), s('🪓'), s('🍖', 8), s('🍎', 6), s('🔦', 4), '', '', s('🏹')]
const HUD_SLOT = 36 // Slightly smaller slots for the HUD

function HUDScreen() {
  const [step, setStep] = useState(0)
  const highlight = HUD_STEPS[step].highlight as string | null

  const health   = 14  // out of 20
  const hunger   = 16  // out of 20
  const xpLevel  = 12
  const xpProgress = 0.65
  const selected = 0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', width: '100%' }}>
      {/* Game window */}
      <div style={{
        position: 'relative',
        width: '100%', maxWidth: 560,
        aspectRatio: '16 / 9',
        overflow: 'hidden',
        borderTop:    `3px solid ${MC.borderLight}`,
        borderLeft:   `3px solid ${MC.borderLight}`,
        borderBottom: `3px solid ${MC.borderDark}`,
        borderRight:  `3px solid ${MC.borderDark}`,
        userSelect: 'none',
      }}>
        <WorldScene />

        {/* Crosshair */}
        <Crosshair highlight={highlight} />

        {/* HUD overlay — bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '0 10px 8px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)',
        }}>
          {/* Health + Hunger row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
            <Hearts current={health} highlight={highlight} />
            <HungerBar current={hunger} highlight={highlight} />
          </div>

          {/* XP bar */}
          <XPBar level={xpLevel} progress={xpProgress} highlight={highlight} />

          {/* Hotbar */}
          <Zone id="hotbar" highlight={highlight}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: GAP }}>
              {HUD_HOTBAR.map((slot, i) => (
                <div key={i} style={{ position: 'relative' }}>
                  <McSlot slot={slot} size={HUD_SLOT} />
                  {/* Selected slot outline */}
                  {i === selected && (
                    <div style={{
                      position: 'absolute', inset: -2,
                      border: '2px solid #ffffff',
                      pointerEvents: 'none',
                    }} />
                  )}
                </div>
              ))}
            </div>
          </Zone>
        </div>
      </div>

      <StepCard steps={HUD_STEPS} step={step} setStep={setStep} />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// Main page — screen selector + active screen
// ═══════════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════════
// SCREEN 3 — EMI (Recipe Viewer)
// ═══════════════════════════════════════════════════════════════════════════════

type EMIZone = 'item-list' | 'search' | 'recipe' | 'uses' | null

const EMI_STEPS: Step<EMIZone>[] = [
  { title: 'EMI — Recipe Viewer', highlight: null,
    desc: "EMI appears automatically on the right side of your inventory screen. It lists every item in the game — vanilla and modded. No setup needed; it's always there when you open your inventory." },
  { title: 'The Item List', highlight: 'item-list',
    desc: 'The grid on the right shows every craftable and obtainable item, including all mod items from our 125 mods. Scroll up and down to browse. Hovering an item shows its full name and mod source.',
    tip: 'Items cycle through variants on hover — hover over a plank to see all wood types.' },
  { title: 'Search Bar', highlight: 'search',
    desc: 'Type in the search bar to filter the item list instantly. Search by item name, or prefix with @ to filter by mod — try "@supplementaries" or "@waystones" to browse a specific mod\'s items.',
    tip: 'You can start typing immediately after opening your inventory — the search bar captures keystrokes automatically.' },
  { title: 'Viewing a Recipe', highlight: 'recipe',
    desc: 'Left-click any item to see its crafting recipe. The 3×3 grid shows exactly what ingredients go where. If an item has multiple recipes, arrows let you cycle through all of them.',
    tip: 'Some modded items require special crafting stations (a Smithing Table, Anvil, etc.) — EMI shows which one.' },
  { title: 'Viewing Uses', highlight: 'uses',
    desc: "Right-click any item to see everything it can be used for — what it crafts into, what it smelts into, trades, and more. Great when you're holding a raw material and don't know what to do with it.",
    tip: 'Try right-clicking Cobblestone or Iron Ingots — the sheer number of uses will surprise you.' },
  { title: 'Following Recipe Chains', highlight: null,
    desc: "Inside any recipe view, you can left-click an ingredient to see how to make that ingredient too. Chain as deep as you need — EMI keeps a back button so you can retrace your steps.",
    tip: 'This is the fastest way to go from "I need a diamond pickaxe" all the way back to "I need to mine iron first".' },
]

// Items shown in the EMI panel grid
const EMI_GRID_ITEMS = [
  '🪨','🪵','🧱','💎','🪙','🔮',
  '⚔️','⛏️','🪓','🏹','🛡️','🪄',
  '🌾','🍖','🍎','🍄','🎣','🔦',
  '🏺','🧲','⚗️','🌟','📜','🗺️',
  '🪬','🧪','🪤','🔨','🗡️','🧭',
  '🌿','🪸','🦎','🐝','🦋','🐾',
]

// A few sample recipes keyed by item emoji
const RECIPES: Record<string, { grid: (string|'')[]; output: string; outputCount: number; station: string }> = {
  '⛏️': {
    grid: ['🪵','🪵','🪵', '','🌿','', '','🌿',''],
    output: '⛏️', outputCount: 1, station: 'Crafting Table',
  },
  '🧱': {
    grid: ['🪨','🪨','', '🪨','🪨','', '','',''],
    output: '🧱', outputCount: 4, station: 'Crafting Table',
  },
  '🔦': {
    grid: ['','🪨','', '','🌿','', '','',''],
    output: '🔦', outputCount: 4, station: 'Crafting Table',
  },
}

// Sample uses for a selected item
const USES: Record<string, { desc: string; output: string }[]> = {
  '🪵': [
    { desc: '4× in 2×2 pattern', output: '🪵 → 🟫 Planks ×4' },
    { desc: 'Fuel in Furnace', output: '🪵 → ♨️ 1.5 smelts' },
    { desc: 'Part of Campfire recipe', output: '🪵 → 🔥 Campfire' },
    { desc: 'Part of Smoker recipe', output: '🪵 → 🏭 Smoker' },
  ],
  '🪨': [
    { desc: '3× in top row + 2 sticks', output: '🪨 → ⛏️ Stone Pickaxe' },
    { desc: '8× surrounding a furnace', output: '🪨 → 🔥 Blast Furnace' },
    { desc: 'Smelt to get Stone', output: '🪨 → 🪨 Stone (smooth)' },
  ],
}

const EMI_SLOT = 30   // Item size in the EMI grid
const INV_SLOT = 34   // Compact inventory slot size

function EMIScreen() {
  const [step, setStep]           = useState(0)
  const [selectedItem, setSelectedItem] = useState<string>('⛏️')
  const [search, setSearch]       = useState('')

  const highlight  = EMI_STEPS[step].highlight as string | null
  const showRecipe = highlight === 'recipe'
  const showUses   = highlight === 'uses'

  const filteredItems = search
    ? EMI_GRID_ITEMS.filter(it => it.includes(search))
    : EMI_GRID_ITEMS

  const recipe = RECIPES[selectedItem]
  const uses   = USES[selectedItem] ?? USES['🪨']

  // Compact inventory items (just 3 rows + hotbar, no armor/crafting)
  const compactInv: Slot[] = [
    s('🪵',42), s('🪵',13), s('🪨',64), s('🪨',33), '', s('🧱',16), s('💎',3), '', '',
    '', s('🌾',18), s('🌾',7), '', s('🎣'), '', '', s('🪙',12), '',
    '', '', s('🍄',5), '', '', '', '', '', '',
  ]
  const compactHotbar: Slot[] = [s('⚔️'), s('⛏️'), s('🪓'), s('🍖',8), s('🍎',6), s('🔦',4), '', '', s('🏹')]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', width: '100%' }}>

      {/* ── Main UI mockup ── */}
      <div style={{
        display: 'flex',
        background: MC.panel,
        padding: 10,
        borderTop:    `3px solid ${MC.borderLight}`,
        borderLeft:   `3px solid ${MC.borderLight}`,
        borderBottom: `3px solid ${MC.borderDark}`,
        borderRight:  `3px solid ${MC.borderDark}`,
        gap: 8,
        userSelect: 'none',
      }}>

        {/* ── Left: compact inventory ── */}
        <div style={{ opacity: (showRecipe || showUses) ? 0.4 : 1, transition: 'opacity 250ms' }}>
          <p style={{ margin: '0 0 4px', fontSize: 7, fontFamily: MC_FONT, color: MC.label }}>Inventory</p>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(9, ${INV_SLOT}px)`, gap: GAP, marginBottom: GAP }}>
            {compactInv.map((slot, i) => <McSlot key={i} slot={slot} size={INV_SLOT} />)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(9, ${INV_SLOT}px)`, gap: GAP, paddingTop: 3, borderTop: `2px solid ${MC.borderDark}` }}>
            {compactHotbar.map((slot, i) => <McSlot key={i} slot={slot} size={INV_SLOT} />)}
          </div>
        </div>

        {/* ── Right: EMI panel ── */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          borderLeft: `2px solid ${MC.borderDark}`,
          paddingLeft: 8,
          minWidth: 0,
        }}>

          {/* Recipe / Uses panel — shown when relevant step is active */}
          {(showRecipe || showUses) && (
            <Zone id={showRecipe ? 'recipe' : 'uses'} highlight={highlight}
              style={{ marginBottom: 8 }}
            >
              <div style={{
                background: '#1a1a2e',
                border: `1px solid ${MC.borderDark}`,
                padding: '8px 10px',
                minWidth: 200,
              }}>
                {showRecipe && recipe && (
                  <>
                    <p style={{ margin: '0 0 6px', fontSize: 7, fontFamily: MC_FONT, color: '#aaa' }}>
                      Recipe · {recipe.station}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {/* 3×3 grid */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 28px)', gap: 2 }}>
                        {recipe.grid.map((item, i) => (
                          <div key={i} style={{
                            width: 28, height: 28,
                            background: '#2a2a2a',
                            border: '1px solid #555',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 14,
                          }}>
                            {item}
                          </div>
                        ))}
                      </div>
                      <span style={{ color: '#888', fontSize: 16 }}>→</span>
                      {/* Output */}
                      <div style={{ position: 'relative' }}>
                        <div style={{
                          width: 36, height: 36,
                          background: '#2a2a2a',
                          border: '2px solid #888',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 20,
                        }}>
                          {recipe.output}
                        </div>
                        {recipe.outputCount > 1 && (
                          <span style={{
                            position: 'absolute', bottom: 2, right: 2,
                            fontSize: 7, fontFamily: MC_FONT, color: '#fff',
                            textShadow: '1px 1px 0 #000', lineHeight: 1,
                          }}>{recipe.outputCount}</span>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {showUses && (
                  <>
                    <p style={{ margin: '0 0 6px', fontSize: 7, fontFamily: MC_FONT, color: '#aaa' }}>
                      Uses for {selectedItem}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {uses.map((u, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#ccc' }}>
                          <span style={{ fontSize: 14, flexShrink: 0 }}>{selectedItem}</span>
                          <span style={{ color: '#555' }}>→</span>
                          <span style={{ fontSize: 10, color: '#aaa' }}>{u.output}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </Zone>
          )}

          {/* Item grid */}
          <Zone id="item-list" highlight={highlight} style={{ flex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(6, ${EMI_SLOT}px)`, gap: 2 }}>
              {filteredItems.map((item, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedItem(item)}
                  style={{
                    width: EMI_SLOT, height: EMI_SLOT,
                    background: selectedItem === item ? '#4a4a6a' : '#2a2a2a',
                    border: selectedItem === item ? '1px solid #8888cc' : '1px solid #444',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: EMI_SLOT * 0.52,
                    cursor: 'pointer',
                    transition: 'background 80ms',
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </Zone>

          {/* Search bar */}
          <Zone id="search" highlight={highlight} style={{ marginTop: 6 }}>
            <div style={{
              background: '#1a1a1a',
              border: `1px solid ${highlight === 'search' ? '#2dd4bf' : '#555'}`,
              padding: '4px 8px',
              display: 'flex', alignItems: 'center', gap: 6,
              transition: 'border-color 200ms',
            }}>
              <span style={{ fontSize: 10, color: '#666' }}>🔍</span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search items..."
                style={{
                  background: 'none', border: 'none', outline: 'none',
                  color: '#ddd', fontSize: 11, fontFamily: MC_FONT,
                  width: '100%',
                }}
              />
            </div>
          </Zone>

        </div>
      </div>

      <StepCard steps={EMI_STEPS} step={step} setStep={setStep} />
    </div>
  )
}

const SCREENS: { id: Screen; label: string; desc: string }[] = [
  { id: 'inventory', label: 'Inventory',  desc: 'Press E to open' },
  { id: 'hud',       label: 'HUD',        desc: 'While playing' },
  { id: 'emi',       label: 'EMI',        desc: 'Recipe viewer' },
]

function SimPage() {
  const [screen, setScreen] = useState<Screen>('inventory')

  return (
    <main className="page-wrap" style={{ paddingTop: '3rem', paddingBottom: '5rem', maxWidth: 860 }}>

      {/* Header */}
      <div className="fade-up" style={{ marginBottom: '2.5rem' }}>
        <p className="label" style={{ marginBottom: '0.5rem' }}>Interactive Guide</p>
        <h1 className="display" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', marginBottom: '0.5rem' }}>
          Interactive Guides
        </h1>
        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Learn the Minecraft and mod interfaces step by step. Pick a topic to explore.
        </p>
      </div>

      {/* Screen tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        {SCREENS.map(sc => (
          <button
            key={sc.id}
            onClick={() => setScreen(sc.id)}
            style={{
              padding: '0.5rem 1.1rem',
              borderRadius: '0.5rem',
              border: screen === sc.id ? '1px solid var(--accent)' : '1px solid var(--border)',
              background: screen === sc.id ? 'var(--accent-dim)' : 'transparent',
              color: screen === sc.id ? 'var(--accent)' : 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '0.83rem',
              fontWeight: screen === sc.id ? 700 : 400,
              transition: 'all 150ms',
              textAlign: 'left',
            }}
          >
            <div style={{ fontWeight: 700 }}>{sc.label}</div>
            <div style={{ fontSize: '0.7rem', opacity: 0.75, marginTop: 1 }}>{sc.desc}</div>
          </button>
        ))}
      </div>

      {/* Active screen */}
      {screen === 'inventory' && <InventoryScreen />}
      {screen === 'hud'       && <HUDScreen />}
      {screen === 'emi'       && <EMIScreen />}

    </main>
  )
}
