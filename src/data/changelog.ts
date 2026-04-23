export interface ChangelogEntry {
  date: string          // ISO date e.g. "2026-04-23"
  title: string
  description?: string
  added?: { name: string; note?: string }[]
  removed?: { name: string; note?: string }[]
  updated?: { name: string; note?: string }[]
  notes?: string[]
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    date: '2026-04-23',
    title: 'Big content drop',
    description:
      'Added a batch of content, decoration, and performance mods to round out the pack.',
    added: [
      // Content
      { name: 'When Dungeons Arise',  note: 'Massive hand-built dungeon structures scattered across the world' },
      { name: 'Eternal Starlight',    note: 'New starlit dimension with unique biomes, mobs, and ores' },
      { name: 'Goblin Traders',       note: 'Goblin merchants underground and in the Nether with exclusive trades' },
      { name: 'Advanced Netherite',   note: 'Four new Netherite upgrade tiers beyond vanilla' },
      { name: 'Mythic Upgrades',      note: 'Smithing upgrades that grant unique weapon properties' },
      { name: 'Oritech',              note: 'Tech mod with machines and automation for mid/late game' },
      // Decoration
      { name: 'Supplementaries',      note: '80+ new decorative and functional blocks' },
      { name: 'Another Furniture',    note: 'Mirrors, curtains, lampshades and more furniture pieces' },
      // QoL & inventory
      { name: 'EMI Enchanting',       note: 'Preview enchantments before spending XP' },
      { name: 'EMI Loot',             note: 'See which chests and mobs drop any item, directly in EMI' },
      { name: 'Recipe Essentials',    note: 'Crafting system improvements and remainder tooltips' },
      { name: 'Catalogue',            note: 'In-game searchable mod list accessible from the main menu' },
      { name: 'Mighty Mail',          note: 'Send items to other players via in-game mailboxes' },
      { name: 'Vanilla Backport',     note: 'Select upcoming Minecraft features available early' },
      // Performance
      { name: 'ModernFix',            note: 'Faster startup, reduced memory use, and various bug fixes' },
      { name: 'Noisium',              note: 'Faster world-gen noise — reduces lag when entering new chunks' },
      { name: 'Alternate Current',    note: 'Optimised redstone engine, identical behaviour to vanilla' },
      // Libraries (behind the scenes)
      { name: 'Platform',             note: 'Library — required by other mods' },
      { name: 'Athena',               note: 'Library — required by other mods' },
      { name: 'Cupboard',             note: 'Library — required by other mods' },
      { name: 'Framework',            note: 'Library — required by other mods' },
      { name: 'Moonlight Lib',        note: 'Library — required by Supplementaries and others' },
    ],
  },
]
