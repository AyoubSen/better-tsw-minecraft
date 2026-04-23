# TSW Minecraft — Site TODO

## Done
- [x] Password gate — edit `VITE_GATE_PASSWORD` in `.env.local` to set the password
- [x] Prism Launcher setup guide (`/setup`)
- [x] Changelog page (`/changelog`)
- [x] Inventory simulator prototype (`/sim`)

## Planned

### Server status widget
- API: https://api.mcsrvstat.us/3/tsw.hopto.org
- Server: tsw.hopto.org · Minecraft 1.21.1 · Fabric 0.19.1
- Confirm with friends first (privacy)
- No changes needed server-side — read-only ping

### Essential/featured badges on mod cards
- JourneyMap, EMI, Waystones, Sophisticated Backpacks, Jade

### Mobile layout pass

### Inventory Simulator — improvement priorities
1. **Drag & drop** — click to pick up items, click again to place/swap (in progress)
2. **Real pixel-art item sprites** — replace emoji with actual MC sprite sheet
3. **Stack count numbers** — small number in bottom-right corner of slots
4. **Minecraft font** — `Monocraft` or similar for labels and counts
5. **Item tooltips** — hover shows item name in MC-style tooltip box
6. **More screens** — Crafting Table (3×3 + working recipes), Chest UI, Hotbar HUD
7. **Guided scenarios** — "Your first night" crafting walkthrough, "Gearing up" armor sequence
8. **Sound effects** — Web Audio API clicks and pickup sounds
9. **Free explore mode** — post-walkthrough sandbox with no annotations

### Interactive Minecraft UI simulator (long-term)
- Full guided walkthrough beyond inventory (combat, crafting, building)
