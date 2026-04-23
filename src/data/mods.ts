export type Category =
  | 'worldgen'
  | 'structures'
  | 'qol'
  | 'storage'
  | 'combat'
  | 'decoration'
  | 'mobs'
  | 'performance'
  | 'library'

export interface CategoryMeta {
  label: string
  emoji: string
  description: string
}

export const CATEGORIES: Record<Category, CategoryMeta> = {
  worldgen: {
    label: 'World & Exploration',
    emoji: '🌍',
    description: 'New biomes, dimensions, and terrain generation',
  },
  structures: {
    label: 'Structures & Dungeons',
    emoji: '🏰',
    description: 'Revamped dungeons, temples, fortresses and villages',
  },
  qol: {
    label: 'Quality of Life',
    emoji: '✨',
    description: 'Convenience tweaks that make playing smoother',
  },
  storage: {
    label: 'Storage & Inventory',
    emoji: '📦',
    description: 'Better ways to store, sort and look up items',
  },
  combat: {
    label: 'Combat & Gear',
    emoji: '⚔️',
    description: 'New enchantments, accessories, armour tiers and fighting mechanics',
  },
  decoration: {
    label: 'Building & Decoration',
    emoji: '🪑',
    description: 'Furniture, new blocks, doors, roofs and decorative pieces',
  },
  mobs: {
    label: 'Mobs & Trading',
    emoji: '🐾',
    description: 'New creatures, improved villager trades and exotic merchants',
  },
  performance: {
    label: 'Visuals & Performance',
    emoji: '⚡',
    description: 'Better frames, shader support and visual polish',
  },
  library: {
    label: 'Technical (Libraries)',
    emoji: '🔧',
    description: 'Behind-the-scenes dependencies — you don\'t interact with these directly',
  },
}

export interface Mod {
  id: string
  name: string
  category: Category
  description: string
  features: string[]
  newbieNote?: string
  modrinth?: string
  curseforge?: string
  isLibrary?: boolean
}

export const MODS: Mod[] = [
  // ── WORLD & EXPLORATION ──────────────────────────────────────────────────

  {
    id: 'terralith',
    name: 'Terralith',
    category: 'worldgen',
    description:
      'Completely overhauls vanilla world generation, adding over 85 new biomes with dramatic new terrain shapes — from towering spires to vast underground caves — while keeping the vanilla feel.',
    features: [
      '85+ new biomes added to the overworld',
      'Dramatic cliffs, valleys, and cave formations',
      'Custom trees, plants, and surface rocks per biome',
      'Fully compatible with vanilla structures',
    ],
    newbieNote:
      'When you spawn in a new world, the landscape will look far more varied than normal Minecraft. Go explore — every biome is different!',
    modrinth: 'terralith',
  },
  {
    id: 'tectonic',
    name: 'Tectonic',
    category: 'worldgen',
    description:
      'Pushes Minecraft terrain to its limits with enormous mountains, deep valleys, and geologically inspired landscapes that dwarf anything in vanilla.',
    features: [
      'Much taller and more dramatic mountains',
      'Wide river valleys and canyons',
      'Works alongside Terralith seamlessly',
      'Configurable terrain scale',
    ],
    modrinth: 'tectonic',
  },
  {
    id: 'regions-unexplored',
    name: 'Regions Unexplored',
    category: 'worldgen',
    description:
      'Adds dozens of hand-crafted biomes to the overworld, Nether, and End — each with unique trees, plants, and atmospheric visuals.',
    features: [
      '70+ new biomes across all three dimensions',
      'Unique flora and fauna per biome',
      'New wood types and building materials',
      'Atmospheric fog and sky effects',
    ],
    modrinth: 'regions-unexplored',
  },
  {
    id: 'aether',
    name: 'The Aether',
    category: 'worldgen',
    description:
      'Adds the legendary Aether dimension — a sky realm of floating islands, unique mobs, new ores, and three distinct dungeons to conquer. One of Minecraft\'s most iconic mods.',
    features: [
      'Full sky dimension with floating islands',
      'New mobs: Moas, Aerwhales, Cockatrices, and more',
      'Three dungeon bosses with unique mechanics',
      'New ores, armour sets, and tools',
      'Requires building a glowstone portal to enter',
    ],
    newbieNote:
      'To reach the Aether, build a portal frame from Glowstone (like a Nether portal) and light it with a bucket of water. It\'s a whole new world in the sky!',
    modrinth: 'aether',
  },
  {
    id: 'better-end',
    name: 'Better End',
    category: 'worldgen',
    description:
      'Transforms the End dimension from a barren void into a rich alien world with new biomes, structures, plants, mobs, and bosses.',
    features: [
      '20+ new End biomes',
      'New hostile and passive mobs',
      'Unique crafting materials and decorative blocks',
      'New dungeon structures within the End',
    ],
    newbieNote:
      'The End dimension (reached through a Stronghold portal) is usually boring in vanilla. With this mod it\'s a whole alien landscape worth exploring.',
    modrinth: 'better-end',
  },
  {
    id: 'better-nether',
    name: 'Better Nether',
    category: 'worldgen',
    description:
      'Overhauls the Nether with new biomes, plants, structures, and mobs while keeping the dangerous atmosphere that makes the Nether feel threatening.',
    features: [
      '15+ new Nether biomes',
      'New plants and crafting materials',
      'New hostile mobs and rare passive ones',
      'Extra structures scattered throughout',
    ],
    newbieNote:
      'The Nether is Minecraft\'s hell dimension — reached through a Nether portal you build from Obsidian. This mod makes it much more interesting to explore.',
    modrinth: 'better-nether',
  },
  {
    id: 'eternal-starlight',
    name: 'Eternal Starlight',
    category: 'worldgen',
    description:
      'Adds a brand-new starlit dimension — a tranquil but mysterious realm bathed in eternal night, with its own biomes, mobs, ores, and progression path.',
    features: [
      'New dimension accessible via a custom portal',
      'Unique biomes with glowing flora',
      'New ores and crafting materials',
      'Custom hostile and passive mobs',
    ],
    modrinth: 'eternal-starlight',
  },
  {
    id: 'journeymap',
    name: 'JourneyMap',
    category: 'qol',
    description:
      'Provides a real-time minimap in the corner of your screen and a full-screen map you can open at any time — complete with waypoints, player markers, and mob indicators.',
    features: [
      'Live minimap HUD while you play',
      'Full-screen interactive map (press J)',
      'Create and share waypoints',
      'Shows other players on the map',
      'Auto-maps as you explore',
    ],
    newbieNote:
      'Press J to open the big map. You can right-click anywhere to create a Waypoint — a marker that shows up in the world so you can always find your way home!',
    modrinth: 'journeymap',
  },
  {
    id: 'waystones',
    name: 'Waystones',
    category: 'qol',
    description:
      'Adds craftable fast-travel stones you can place around the world. Activate a Waystone to teleport to any other Waystone you\'ve previously visited.',
    features: [
      'Craftable Waystone blocks',
      'Teleport between any activated waystones',
      'Some waystones generate in villages for free',
      'Configurable cooldown or XP cost',
    ],
    newbieNote:
      'Place a Waystone at your base right away and name it "Home". Any time you find a village or another base, activate their Waystone too. Then you can teleport home instantly!',
    modrinth: 'waystones',
  },
  {
    id: 'explorers-compass',
    name: 'Explorer\'s Compass',
    category: 'qol',
    description:
      'A craftable compass that can locate any vanilla or modded structure — right-click it to open a menu, pick a structure type, and it points you straight to the nearest one.',
    features: [
      'Locates any structure type (vanilla + modded)',
      'Simple compass UI with search',
      'Shows distance and direction',
      'Stackable by structure type',
    ],
    newbieNote:
      'Craft one of these if you\'re trying to find a specific place — like a Village, Stronghold, or any of the new dungeons from this modpack.',
    modrinth: 'explorers-compass',
  },
  {
    id: 'natures-compass',
    name: 'Nature\'s Compass',
    category: 'qol',
    description:
      'Same concept as Explorer\'s Compass, but for biomes. Craft it, select any biome from the list, and it navigates you to the nearest matching terrain.',
    features: [
      'Locates any biome (vanilla + modded)',
      'Searchable biome list',
      'Shows distance in blocks',
      'Works with all Terralith / Regions Unexplored biomes',
    ],
    modrinth: 'natures-compass',
  },

  // ── STRUCTURES & DUNGEONS ──────────────────────────────────────────────

  {
    id: 'dungeons-arise',
    name: 'When Dungeons Arise',
    category: 'structures',
    description:
      'Scatters enormous, hand-built dungeon complexes across the world — from ancient fortresses to sky castles — each filled with traps, loot, and challenging enemies.',
    features: [
      '30+ unique dungeon structures',
      'Highly detailed multi-floor layouts',
      'Scaled loot for mid-to-late game',
      'Structures appear in fitting biomes',
    ],
    newbieNote:
      'These dungeons are designed to be challenging. Bring good gear and plenty of food before entering — don\'t rush in at night with wooden tools!',
    modrinth: 'when-dungeons-arise',
  },
  {
    id: 'towns-and-towers',
    name: 'Towns & Towers',
    category: 'structures',
    description:
      'Overhauls and expands village generation with new village styles per biome, new pillager outpost variants, and scattered watchtowers across the landscape.',
    features: [
      '20+ new village variants (one per biome)',
      'New pillager outpost designs',
      'Scattered watchtowers and ruins',
      'Villages feel unique to their environment',
    ],
    modrinth: 'towns-and-towers',
  },
  {
    id: 'ctov',
    name: 'Compatible Villages (CTOV)',
    category: 'structures',
    description:
      'Adds over 60 new village variants that match every modded biome — so villages generated in Terralith or Regions Unexplored biomes look like they actually belong there.',
    features: [
      '60+ biome-specific village styles',
      'Matches Terralith and Regions Unexplored biomes',
      'Unique architecture per environment',
      'Compatible with other village mods',
    ],
    modrinth: 'compatible-village',
  },
  {
    id: 'aether-villages',
    name: 'Aether Villages',
    category: 'structures',
    description:
      'Adds villages to the Aether dimension complete with their own unique villager types, trades, and buildings that fit the sky-island aesthetic.',
    features: [
      'Aether-themed village structures',
      'New villager trades for Aether items',
      'Spawns naturally on Aether islands',
    ],
    modrinth: 'aether-villages',
  },
  {
    id: 'hopo-better-mineshaft',
    name: 'Hopo Better Mineshaft',
    category: 'structures',
    description:
      'Completely replaces vanilla\'s repetitive mineshafts with much more elaborate, visually distinct underground mine complexes with varied layouts and better loot.',
    features: [
      'Detailed mine layouts with multiple floors',
      'Themed room types (storage, smelting, etc.)',
      'Improved loot tables',
      'Biome-appropriate wood and styling',
    ],
    modrinth: 'hopo-better-mineshaft',
  },
  {
    id: 'yungs-better-dungeons',
    name: "YUNG's Better Dungeons",
    category: 'structures',
    description:
      "Redesigns vanilla dungeons from the ground up — replacing the basic cobblestone boxes with elaborate themed dungeons complete with unique layouts, traps, and improved loot.",
    features: [
      'Multiple dungeon themes (Catacombs, Undead Crypt, Spider Cave)',
      'Procedurally varied layouts',
      'Better loot scaling',
      'Proper lighting and decoration',
    ],
    modrinth: 'yungs-better-dungeons',
  },
  {
    id: 'yungs-better-desert-temples',
    name: "YUNG's Better Desert Temples",
    category: 'structures',
    description:
      'Replaces the vanilla desert pyramid with far more elaborate sandstone temple structures filled with puzzles, traps, and much better loot.',
    features: [
      'Elaborate multi-room temple layouts',
      'Traps and pressure-plate puzzles',
      'Improved loot chests',
      'Fits naturally into desert terrain',
    ],
    modrinth: 'yungs-better-desert-temples',
  },
  {
    id: 'yungs-better-jungle-temples',
    name: "YUNG's Better Jungle Temples",
    category: 'structures',
    description:
      'Overhauls jungle temples into imposing, overgrown ruins with multiple floors, better traps, and much richer rewards for explorers.',
    features: [
      'Multi-floor jungle temple layouts',
      'Overgrown, atmospheric decoration',
      'Improved trap mechanics',
      'Enhanced loot',
    ],
    modrinth: 'yungs-better-jungle-temples',
  },
  {
    id: 'yungs-better-mineshafts',
    name: "YUNG's Better Mineshafts",
    category: 'structures',
    description:
      'A second overhaul to vanilla mineshafts (works alongside Hopo) that adds more structural variety and biome-themed mine variants.',
    features: [
      'Biome-specific mine aesthetics',
      'Better branching layouts',
      'Improved ore and loot distribution',
    ],
    modrinth: 'yungs-better-mineshafts',
  },
  {
    id: 'yungs-better-nether-fortresses',
    name: "YUNG's Better Nether Fortresses",
    category: 'structures',
    description:
      'Redesigns Nether Fortresses into massive, imposing strongholds that actually feel like they belong in the Nether — with new room types and better loot.',
    features: [
      'Much larger and more complex fortress layouts',
      'New room types: armouries, throne rooms, barracks',
      'Better blaze spawner placement',
      'Improved loot chests',
    ],
    newbieNote:
      'Nether Fortresses are the main goal in the Nether — you need Blaze Rods from them to brew potions and reach the End. This mod makes them much more dramatic to explore.',
    modrinth: 'yungs-better-nether-fortresses',
  },
  {
    id: 'yungs-better-ocean-monuments',
    name: "YUNG's Better Ocean Monuments",
    category: 'structures',
    description:
      'Rebuilds underwater Ocean Monuments into properly enormous aquatic fortresses with varied rooms, more Guardians, and better elder guardian encounters.',
    features: [
      'Much larger and more elaborate monuments',
      'New room types and corridors',
      'More dramatic elder guardian boss fight',
      'Better loot throughout',
    ],
    modrinth: 'yungs-better-ocean-monuments',
  },
  {
    id: 'yungs-better-strongholds',
    name: "YUNG's Better Strongholds",
    category: 'structures',
    description:
      'Transforms the End Portal stronghold from a maze of corridors into a proper underground fortress with libraries, prisons, armouries, and a grand End Portal chamber.',
    features: [
      'Much larger and more complex layouts',
      'Themed rooms: library, barracks, prison, treasury',
      'Grand End Portal room',
      'Better loot distribution',
    ],
    newbieNote:
      'The Stronghold is where you find the End Portal — the gateway to the final boss. This mod makes it feel like an actual epic dungeon rather than a random maze.',
    modrinth: 'yungs-better-strongholds',
  },
  {
    id: 'yungs-better-witch-huts',
    name: "YUNG's Better Witch Huts",
    category: 'structures',
    description:
      'Redesigns witch huts into proper creepy swamp cottages with detailed interiors, alchemical props, and a more menacing atmosphere.',
    features: [
      'Detailed cottage interior',
      'Alchemical props and bookshelves',
      'Fits swamp terrain naturally',
      'Improved loot',
    ],
    modrinth: 'yungs-better-witch-huts',
  },

  // ── QUALITY OF LIFE ──────────────────────────────────────────────────────

  {
    id: 'jade',
    name: 'Jade',
    category: 'qol',
    description:
      'Adds a small HUD tooltip in the top-center of the screen that tells you what block or entity you\'re looking at — including mod-specific information like bee populations, crop growth stages, and container contents.',
    features: [
      'Shows block/mob name when you look at them',
      'Displays mod-source for every object',
      'Shows bee count in hives, crop stages, fluid levels',
      'Fully configurable display',
    ],
    newbieNote:
      'This is one of the most useful mods in the pack. Just look at something and it tells you exactly what it is — great for identifying modded blocks you\'ve never seen before.',
    modrinth: 'jade',
  },
  {
    id: 'jade-addons',
    name: 'Jade Addons',
    category: 'qol',
    description:
      'Extends Jade with additional information providers for common mods in the pack, such as Sophisticated Backpacks and storage blocks.',
    features: [
      'Shows backpack contents in Jade tooltip',
      'Extra info for modded machines',
      'Seamlessly integrates with Jade',
    ],
    modrinth: 'jade-addons-fabric',
  },
  {
    id: 'appleskin',
    name: 'AppleSkin',
    category: 'qol',
    description:
      'Enhances the hunger bar to show saturation levels and a preview of how much food an item will restore before you eat it.',
    features: [
      'Saturation shown as a golden overlay on the hunger bar',
      'Food preview when holding food in your hand',
      'Works with all modded food items',
    ],
    newbieNote:
      'In vanilla Minecraft you can\'t see saturation (the hidden hunger stat that keeps you full longer). This mod makes it visible — high-saturation food is better than it looks!',
    modrinth: 'appleskin',
  },
  {
    id: 'vein-miner',
    name: 'Vein Miner',
    category: 'qol',
    description:
      'Hold a key (default: ` / tilde) while mining a block to break the entire connected vein at once — great for ore veins and wood.',
    features: [
      'Mine entire ore veins in one click',
      'Works with any tool, respects Fortune/Silk Touch',
      'Toggleable keybind',
      'Configurable max vein size',
    ],
    newbieNote:
      'When you find a coal or iron vein underground, hold the Vein Miner key while breaking one block and the whole cluster mines itself. Save yourself a lot of clicking!',
    modrinth: 'veinminer',
  },
  {
    id: 'falling-tree',
    name: 'Falling Tree',
    category: 'qol',
    description:
      'Chop the base of a tree with an axe and the whole tree falls at once — every log drops as an item instantly.',
    features: [
      'Full tree drops on base chop',
      'Works with all vanilla and modded wood types',
      'Configurable (can require sneaking to activate)',
      'Respects axe enchantments',
    ],
    newbieNote:
      'No more climbing trees to collect the last few logs at the top! Just chop the bottom block and the whole thing comes down.',
    modrinth: 'fallingtree',
  },
  {
    id: 'right-click-harvest',
    name: 'Right Click Harvest',
    category: 'qol',
    description:
      'Right-click fully grown crops to harvest them and automatically replant — no need to break and replant manually.',
    features: [
      'Right-click to harvest and auto-replant',
      'Works with wheat, carrots, potatoes, beets, and most modded crops',
      'Saves time on farm maintenance',
    ],
    newbieNote:
      'Instead of breaking your crops every harvest (which uproots them), just right-click them when they\'re grown. Much faster farming!',
    modrinth: 'right-click-harvest',
  },
  {
    id: 'jump-over-fences',
    name: 'Jump Over Fences',
    category: 'qol',
    description:
      'Lets you jump over fence blocks normally — no more being stuck inside your own animal pen.',
    features: [
      'Jump over any fence/wall block',
      'Mobs still cannot jump over (keeps pens working)',
      'No configuration needed',
    ],
    modrinth: 'jumpoverfences',
  },
  {
    id: 'easy-elytra-takeoff',
    name: 'Easy Elytra Takeoff',
    category: 'qol',
    description:
      'Allows you to take off with Elytra from the ground without needing to jump from a height — just press jump while equipped.',
    features: [
      'Ground-level Elytra launch',
      'Works with firework rockets for propulsion',
      'Optional stamina/cooldown system',
    ],
    newbieNote:
      'Elytra are the wings you can find in End Cities that let you glide and fly. Normally you need a high ledge to launch; this mod lets you start from anywhere.',
    modrinth: 'easy-elytra-takeoff',
  },
  {
    id: 'jj-elytra-swap',
    name: 'JJ Elytra Swap',
    category: 'qol',
    description:
      'Adds a keybind to instantly swap between your Elytra and your chestplate armour without opening your inventory.',
    features: [
      'One-key swap between Elytra and armour',
      'Works mid-flight',
      'Configurable keybind',
    ],
    modrinth: 'jjelytraswap',
  },
  {
    id: 'controlling',
    name: 'Controlling',
    category: 'qol',
    description:
      'Adds a search bar to the keybindings menu so you can quickly find and resolve key conflicts across the many mods in the pack.',
    features: [
      'Search keybindings by name or key',
      'Highlights conflicting keybinds in red',
      'Makes managing 150+ mod keybinds bearable',
    ],
    modrinth: 'controlling',
  },
  {
    id: 'mouse-tweaks',
    name: 'Mouse Tweaks',
    category: 'qol',
    description:
      'Adds enhanced mouse-drag behaviour to inventory screens — drag to fill stacks, scroll to move items, and more.',
    features: [
      'Drag with right-click to distribute items evenly',
      'Scroll wheel moves items between inventory and container',
      'Works in all inventory screens',
    ],
    modrinth: 'mouse-tweaks',
  },
  {
    id: 'pickup-notifier',
    name: 'Pick Up Notifier',
    category: 'qol',
    description:
      'Shows a small animated notification in the corner of your screen every time you pick up an item — so you always know what you\'ve collected.',
    features: [
      'Animated item pickup toasts',
      'Groups duplicate pickups',
      'Configurable position and duration',
    ],
    modrinth: 'pick-up-notifier',
  },
  {
    id: 'scaffolding-drops-nearby',
    name: 'Scaffolding Drops Nearby',
    category: 'qol',
    description:
      'When you break scaffolding, all connected scaffolding drops as items near you instead of scattered across the ground.',
    features: [
      'All scaffolding drops within reach',
      'No more lost scaffolding items on the floor',
      'Works with stacked scaffold columns',
    ],
    modrinth: 'scaffolding-drops-nearby',
  },
  {
    id: 'trample-no-more',
    name: 'Trample No More',
    category: 'qol',
    description:
      'Farmland no longer gets trampled by players or mobs jumping on it — your crops stay planted.',
    features: [
      'Farmland cannot be trampled',
      'Works for all entities (players and mobs)',
      'Configurable via mod settings',
    ],
    modrinth: 'trample-no-more',
  },
  {
    id: 'gravel-miner',
    name: 'Gravel Miner',
    category: 'qol',
    description:
      'Mining gravel with a shovel also collects any gravel that falls on top — so you don\'t have to mine columns of falling gravel one block at a time.',
    features: [
      'Auto-collects falling gravel above the mined block',
      'Works with shovel enchantments',
      'Saves time in cave exploration',
    ],
    modrinth: 'gravelminer',
  },
  {
    id: 'durability-tooltip',
    name: 'Durability Tooltip',
    category: 'qol',
    description:
      'Shows the exact durability number (e.g. "187 / 250") on any tool or armour piece when you hover over it in your inventory.',
    features: [
      'Exact durability numbers on hover',
      'Works with all tools, weapons, and armour',
      'Colour-coded by durability percentage',
    ],
    modrinth: 'durability-tooltip',
  },
  {
    id: 'fuel-info',
    name: 'Fuel Info',
    category: 'qol',
    description:
      'Shows how many items a fuel source can smelt when you hover over it in your inventory — no more guessing how long a piece of coal will last.',
    features: [
      'Smelting count shown in item tooltip',
      'Works with all vanilla and modded fuels',
      'Shows time per item and total smelt count',
    ],
    modrinth: 'fuel-info',
  },
  {
    id: 'better-ping-display',
    name: 'Better Ping Display',
    category: 'qol',
    description:
      'Shows exact ping numbers (in milliseconds) on the player list instead of just the coloured signal bars.',
    features: [
      'Exact ms ping for every player',
      'Colour-coded by latency threshold',
      'Works on any multiplayer server',
    ],
    modrinth: 'better-ping-display',
  },
  {
    id: 'more-chat-history',
    name: 'More Chat History',
    category: 'qol',
    description:
      'Extends the chat history buffer so you can scroll back further in chat — useful on a busy multiplayer server.',
    features: [
      'Much longer chat history',
      'Configurable buffer size',
      'No interface changes',
    ],
    modrinth: 'morechathistory',
  },
  {
    id: 'ok-zoomer',
    name: 'Ok Zoomer',
    category: 'qol',
    description:
      'Adds a zoom keybind (default: C) that lets you scroll-zoom in on distant objects — like a spyglass but always available.',
    features: [
      'Smooth scroll-to-zoom with mouse wheel',
      'Configurable zoom levels and keybind',
      'Optional cinematic camera during zoom',
    ],
    modrinth: 'ok-zoomer',
  },
  {
    id: 'chunky',
    name: 'Chunky',
    category: 'qol',
    description:
      'A server-side tool that pre-generates world chunks in the background, eliminating chunk-loading lag during exploration.',
    features: [
      'Pre-generates chunks around a radius',
      'Runs in the background without affecting gameplay',
      'Drastically reduces lag spikes while exploring',
      'Progress tracking via commands',
    ],
    newbieNote:
      'This is a server tool — it runs automatically. It\'s the reason the server doesn\'t lag when you walk into new areas.',
    modrinth: 'chunky',
  },
  {
    id: 'patchouli',
    name: 'Patchouli',
    category: 'qol',
    description:
      'A library that lets other mods include in-game guide books. Some mods in this pack come with their own book that explains their content.',
    features: [
      'In-game documentation books',
      'Searchable and cross-referenced entries',
      'Used by mods like the Aether and Sophisticated Backpacks',
    ],
    modrinth: 'patchouli',
  },
  {
    id: 'polymorph',
    name: 'Polymorph',
    category: 'qol',
    description:
      'Resolves crafting recipe conflicts — when two mods add recipes that overlap, Polymorph lets you choose which output you want via a small popup.',
    features: [
      'Detects conflicting crafting recipes',
      'Small UI button to pick your desired output',
      'Works in crafting tables, furnaces, and more',
    ],
    modrinth: 'polymorph',
  },
  {
    id: 'lootr',
    name: 'Lootr',
    category: 'qol',
    description:
      'Makes dungeon loot chests personal — each player gets their own separate loot instance. No more racing your friends to loot a dungeon first!',
    features: [
      'Per-player loot chests in structures',
      'Everyone gets the same loot independently',
      'Works with all vanilla and modded structures',
    ],
    newbieNote:
      'This is huge for multiplayer — in normal Minecraft, whoever opens a chest first takes the loot and others get nothing. With Lootr, every chest has separate loot for every player.',
    modrinth: 'lootr',
  },
  {
    id: 'recipe-essentials',
    name: 'Recipe Essentials',
    category: 'qol',
    description:
      'Adds useful tweaks to the recipe/crafting system, such as showing crafting remainders and managing recipe book state.',
    features: [
      'Crafting remainder tooltips',
      'Recipe book improvements',
      'Configurable behaviour',
    ],
    modrinth: 'recipe-essentials',
  },
  {
    id: 'universal-bone-meal',
    name: 'Universal Bone Meal',
    category: 'qol',
    description:
      'Allows bone meal to work on many modded plants and crops that it couldn\'t grow before — making farming with modded plants much easier.',
    features: [
      'Bone meal works on most modded crops',
      'Configurable per-plant',
      'No gameplay breaking — just convenience',
    ],
    modrinth: 'universal-bone-meal',
  },
  {
    id: 'vanilla-backport',
    name: 'Vanilla Backport',
    category: 'qol',
    description:
      'Backports select features from newer Minecraft snapshots or Java editions that haven\'t made it to 1.21.1 yet.',
    features: [
      'Select upcoming features available early',
      'Behaviour matches official Mojang designs',
      'No gameplay-breaking changes',
    ],
    modrinth: 'vanillabackport',
  },
  {
    id: 'autoclicker',
    name: 'Auto Clicker',
    category: 'qol',
    description:
      'Adds toggleable auto-click for mining or attacking — hold down a key to keep swinging without holding the mouse button.',
    features: [
      'Toggleable auto-attack / auto-mine',
      'Useful for AFK farming setups',
      'Configurable speed and keybind',
    ],
    modrinth: 'autoclicker',
  },
  {
    id: 'freecam',
    name: 'Freecam',
    category: 'qol',
    description:
      'Lets you detach your camera from your player and fly around to scout an area or take screenshots — your character stays in place.',
    features: [
      'Detached camera mode',
      'Fly through walls for scouting',
      'Player stays stationary',
      'Configurable flight speed',
    ],
    newbieNote:
      'Great for taking screenshots or planning builds. Your character stays safe wherever you left them while the camera explores freely.',
    modrinth: 'freecam',
  },
  {
    id: 'catalogue',
    name: 'Catalogue',
    category: 'qol',
    description:
      'Adds a Mods button to the main menu and a searchable, filterable mod list in-game — handy for checking what\'s installed.',
    features: [
      'In-game mod list with descriptions',
      'Searchable and sortable',
      'Links to mod pages',
      'Shows mod versions',
    ],
    modrinth: 'catalogue',
  },
  {
    id: 'mighty-mail',
    name: 'Mighty Mail',
    category: 'qol',
    description:
      'Adds a mailbox system to the server — players can send items to each other via in-game mail even when offline.',
    features: [
      'Send items to any player by name',
      'Mail persists even if recipient is offline',
      'Notification on login when you have mail',
    ],
    modrinth: 'mighty-mail',
  },
  {
    id: 'dark-utilities',
    name: 'Dark Utilities',
    category: 'qol',
    description:
      'A small utility mod that adds a handful of helpful blocks and items — including mob filters, speed pads, and redstone utilities.',
    features: [
      'Speed pads and jump pads',
      'Mob spawning filters',
      'Redstone utility blocks',
      'Lightweight and non-invasive',
    ],
    modrinth: 'dark-utilities',
  },
  {
    id: 'clumps',
    name: 'Clumps',
    category: 'performance',
    description:
      'Groups XP orbs that are close together into a single larger orb — reducing entity count and improving performance around XP farms.',
    features: [
      'Clumps nearby XP orbs into one entity',
      'Noticeable performance boost near XP farms',
      'No change to how much XP you collect',
    ],
    modrinth: 'clumps',
  },

  // ── STORAGE & INVENTORY ────────────────────────────────────────────────

  {
    id: 'emi',
    name: 'EMI (Every Menu Indexed)',
    category: 'storage',
    description:
      'The primary recipe viewer for this modpack — press R on any item to see how to craft it, press U to see what it\'s used in. Shows recipes for every mod.',
    features: [
      'Full recipe lookup for all mods',
      'Usage lookup (what is this item used for?)',
      'Favourites and search',
      'Recipe tree view',
    ],
    newbieNote:
      'This is essential. Whenever you see an item you don\'t know what to do with, hover over it and press R to see its recipe, or U to see what it makes.',
    modrinth: 'emi',
  },
  {
    id: 'jei',
    name: 'JEI (Just Enough Items)',
    category: 'storage',
    description:
      'A second recipe viewer running alongside EMI, providing an ingredient browser panel on the side of any crafting screen.',
    features: [
      'Item browser on crafting screens',
      'Quick recipe lookup via search',
      'Complements EMI for some mod integrations',
    ],
    modrinth: 'jei',
  },
  {
    id: 'emi-enchanting',
    name: 'EMI Enchanting',
    category: 'storage',
    description:
      'Adds enchanting table integration to EMI, showing you exactly what enchantments are available and at what levels before you commit your XP.',
    features: [
      'Preview enchantments before spending XP',
      'Shows all possible enchant combinations',
      'Integrates into the EMI panel',
    ],
    modrinth: 'emi-enchanting',
  },
  {
    id: 'emi-loot',
    name: 'EMI Loot',
    category: 'storage',
    description:
      'Extends EMI to show where you can find any item — including loot table sources like which dungeon chests or mob drops contain it.',
    features: [
      'Shows loot table sources in EMI',
      'Mob drop information',
      'Chest loot previews',
    ],
    modrinth: 'emi-loot',
  },
  {
    id: 'sophisticated-backpacks',
    name: 'Sophisticated Backpacks',
    category: 'storage',
    description:
      'Craftable backpacks that dramatically expand your inventory — and can be upgraded with modules for auto-pickup, smelting, sorting, and more.',
    features: [
      'Wearable backpacks with configurable slots',
      'Upgrade modules: auto-pickup, smelting, void, refilling',
      'Multiple tiers (iron → gold → diamond → netherite)',
      'Nested backpacks possible',
    ],
    newbieNote:
      'Craft a basic backpack as early as possible! It gives you extra inventory space right away, and you can upgrade it later with useful automatic features.',
    modrinth: 'sophisticated-backpacks',
  },
  {
    id: 'sophisticated-storage',
    name: 'Sophisticated Storage',
    category: 'storage',
    description:
      'Adds upgradeable storage blocks — chests and barrels with additional slot upgrades and the same powerful module system as Sophisticated Backpacks.',
    features: [
      'Upgradeable chests with up to 320 slots',
      'Same module system as backpacks (filter, sort, auto-push)',
      'Visual item display on the block face',
      'Multiple tiers mirroring backpacks',
    ],
    modrinth: 'sophisticated-storage',
  },
  {
    id: 'toms-storage',
    name: "Tom's Simple Storage",
    category: 'storage',
    description:
      'A simple but powerful networked storage system — link multiple chests together and access all their contents from a single terminal block.',
    features: [
      'Connect chests via cables into one network',
      'Search and retrieve from a central terminal',
      'Auto-crafting support',
      'Item sorting and filtering',
    ],
    newbieNote:
      'Think of this like a magical filing system: put all your chests next to cables and a terminal, and suddenly you can search your entire base\'s storage from one spot.',
    modrinth: 'toms-storage',
  },
  {
    id: 'trash-cans',
    name: 'Trash Cans',
    category: 'storage',
    description:
      'Adds craftable trash can blocks that void any items (or fluids, or XP) deposited into them — no more throwing things into lava.',
    features: [
      'Item trash can, fluid trash can, XP trash can',
      'Configurable whitelist/blacklist filters',
      'Compact and simple to craft',
    ],
    modrinth: 'trash-cans',
  },
  {
    id: 'inventory-essentials',
    name: 'Inventory Essentials',
    category: 'storage',
    description:
      'Adds keyboard shortcuts to inventory screens — quickly move items, lock slots, and manage your inventory without mouse-only clicking.',
    features: [
      'Lock inventory slots',
      'Quick-move hotkeys',
      'Works in chests, backpacks, and other containers',
    ],
    modrinth: 'inventory-essentials',
  },
  {
    id: 'nemos-sorting',
    name: "Nemo's Inventory Sorting",
    category: 'storage',
    description:
      'Adds a sort button to all inventory and container screens — click it to instantly organise your items by type.',
    features: [
      'Sort button on all inventories',
      'Multiple sort algorithms (type, count, name)',
      'Works with backpacks and modded containers',
    ],
    modrinth: 'nemos-inventory-sorting',
  },

  // ── COMBAT & GEAR ─────────────────────────────────────────────────────

  {
    id: 'artifacts',
    name: 'Artifacts',
    category: 'combat',
    description:
      'Adds 20+ unique treasure items found in dungeon chests — wearable accessories with powerful passive effects, like a lucky scarf that boosts luck or shoes that cancel fall damage.',
    features: [
      '20+ unique artifact items',
      'Found in dungeon, mineshaft, and ocean monument loot',
      'Passive effects when equipped in accessory slots',
      'Complements the Trinkets accessory system',
    ],
    newbieNote:
      'Keep an eye out for unusual items in chests while exploring — these are artifacts! They usually have unique effects described in their tooltip.',
    modrinth: 'artifacts',
  },
  {
    id: 'mythic-upgrades',
    name: 'Mythic Upgrades',
    category: 'combat',
    description:
      'Adds a smithing upgrade system for weapons and tools that can grant them unique mythic properties beyond normal enchantments.',
    features: [
      'Mythic upgrade templates found in loot',
      'Unique weapon/tool effects',
      'Complements the vanilla smithing table system',
    ],
    modrinth: 'mythicupgrades',
  },
  {
    id: 'combat-roll',
    name: 'Combat Roll',
    category: 'combat',
    description:
      'Adds a dodge roll mechanic — press a keybind to roll left, right, or backward to dodge attacks. Gives combat a much more active, skilful feel.',
    features: [
      'Dodge roll in any direction',
      'Brief invincibility frames during roll',
      'Stamina-based system',
      'Works against mobs and players',
    ],
    newbieNote:
      'Fighting feels completely different with this mod. Instead of standing still and trading hits, you can now roll away from attacks — especially useful against boss mobs.',
    modrinth: 'combat-roll',
  },
  {
    id: 'spiky-spikes',
    name: 'Spiky Spikes',
    category: 'combat',
    description:
      'Adds craftable spike traps that damage mobs (and players) who walk over them — great for base defence and mob farms.',
    features: [
      'Multiple spike variants (wood, iron, golden)',
      'Damages entities on contact',
      'Stackable damage with multiple spikes',
      'Good for perimeter defence',
    ],
    modrinth: 'spiky-spikes',
  },
  {
    id: 'advanced-netherite',
    name: 'Advanced Netherite',
    category: 'combat',
    description:
      'Adds four new tiers of Netherite armour and tools beyond vanilla Netherite — each progressively stronger and requiring rarer materials to craft.',
    features: [
      'Four new Netherite upgrade tiers',
      'New Netherite variants with unique stats',
      'Crafted via the smithing table',
      'End-game progression target',
    ],
    modrinth: 'advanced-netherite',
  },
  {
    id: 'universal-enchants',
    name: 'Universal Enchants',
    category: 'combat',
    description:
      'Allows enchantments to be applied to item types that normally can\'t have them — put Looting on swords that couldn\'t get it, apply Mending to any item, etc.',
    features: [
      'Cross-item type enchantment application',
      'Configurable which enchants apply where',
      'Works with the enchanting table and anvil',
    ],
    modrinth: 'universal-enchants',
  },
  {
    id: 'easy-magic',
    name: 'Easy Magic',
    category: 'combat',
    description:
      'Lets you re-roll enchanting table options by clicking a button — no more mashing dirt into the enchanting table to reset the seed.',
    features: [
      'Re-roll enchant options without seed manipulation',
      'Pick which slot to refresh',
      'Small XP cost per re-roll',
    ],
    modrinth: 'easy-magic',
  },
  {
    id: 'easy-anvils',
    name: 'Easy Anvils',
    category: 'combat',
    description:
      'Removes the "Too Expensive!" cap from anvils — you can always repair and enchant regardless of how many times an item has been modified.',
    features: [
      'No more "Too Expensive!" blocking anvil work',
      'Any number of prior work penalties allowed',
      'Configurable cost limits',
    ],
    newbieNote:
      'Normally in Minecraft, if you enchant or repair an item too many times, the anvil refuses to work. This mod removes that frustrating limitation.',
    modrinth: 'easy-anvils',
  },
  {
    id: 'tax-free-levels',
    name: 'Tax Free Levels',
    category: 'combat',
    description:
      'Removes or reduces the XP level cost from anvil operations — enchanting and repairing doesn\'t drain your levels as aggressively.',
    features: [
      'Reduced or removed XP costs on the anvil',
      'Configurable reduction amount',
      'Works with Easy Anvils',
    ],
    modrinth: 'tax-free-levels',
  },
  {
    id: 'better-than-mending',
    name: 'Better Than Mending',
    category: 'combat',
    description:
      'Overhauls the Mending enchantment — XP absorbed by a Mending item now goes into a pool you can spend to repair specific items instead of randomly repairing one.',
    features: [
      'Dedicated Mending repair screen',
      'XP pools per equipped item',
      'Choose which item to repair and when',
      'No more random Mending targets',
    ],
    modrinth: 'better-than-mending',
  },
  {
    id: 'trinkets',
    name: 'Trinkets',
    category: 'combat',
    description:
      'Adds dedicated accessory slots (ring, belt, necklace, etc.) to your character — lets you equip additional items from mods like Artifacts without taking up armour or hotbar slots.',
    features: [
      'New accessory slot screen',
      'Ring, belt, necklace, and more slots',
      'Required by Artifacts and other mods in this pack',
      'Accessible via the inventory screen',
    ],
    newbieNote:
      'Open your inventory and look for the extra slots around your character — these are accessory slots! Items like Artifact rings go there, not in your armour slots.',
    modrinth: 'trinkets',
  },
  {
    id: 'disenchanting-table',
    name: 'Disenchanting Table',
    category: 'combat',
    description:
      'Adds a craftable table that lets you remove specific enchantments from items and transfer them to books — salvage enchantments from unwanted gear.',
    features: [
      'Remove individual enchantments from items',
      'Transferred to an enchanted book',
      'XP cost scales with enchantment level',
      'Craft-able early-mid game',
    ],
    modrinth: 'disenchanting-table',
  },
  {
    id: 'comforts',
    name: 'Comforts',
    category: 'combat',
    description:
      'Adds sleeping bags and hammocks — sleeping bags let you sleep anywhere without setting your spawn point; hammocks let you skip to daytime instead of night.',
    features: [
      'Sleeping bag: skip night without resetting spawn',
      'Hammock: skip to dawn instead of night',
      'Stackable and portable',
      'Multiple colour variants',
    ],
    newbieNote:
      'Use a sleeping bag when you\'re far from home and need to skip night — your spawn point stays at your bed back at base.',
    modrinth: 'comforts',
  },
  {
    id: 'grave-danger',
    name: "You're in Grave Danger",
    category: 'combat',
    description:
      'When you die, a gravestone is placed with all your items safely stored inside. No more frantically running back to your death spot before your items despawn.',
    features: [
      'Gravestone spawns at death location',
      'All items stored safely inside',
      'Break the gravestone to retrieve them',
      'Graveyard compass points to your grave',
    ],
    newbieNote:
      'Dying in Minecraft normally scatters all your items on the ground for 5 minutes before they disappear. This mod keeps them safe in a grave — take your time getting back!',
    modrinth: 'youre-in-grave-danger',
  },
  {
    id: 'ench-desc',
    name: 'Enchantment Descriptions',
    category: 'combat',
    description:
      'Adds a brief description of what every enchantment does directly to the item tooltip — no more guessing what "Impaling" or "Channeling" actually do.',
    features: [
      'Tooltip descriptions for all enchantments',
      'Works with vanilla and modded enchantments',
      'Brief and readable descriptions',
    ],
    modrinth: 'enchantment-descriptions',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    category: 'combat',
    description:
      'An accessory slot framework (similar to Trinkets) that adds dedicated equipment slots to the character screen for rings, belts, and other wearable items.',
    features: [
      'Additional equipment slots',
      'Used by some mods in this pack',
      'Clean UI integration',
    ],
    modrinth: 'accessories',
  },

  // ── BUILDING & DECORATION ─────────────────────────────────────────────

  {
    id: 'handcrafted',
    name: 'Handcrafted',
    category: 'decoration',
    description:
      'A large furniture mod adding dozens of wood-based furniture pieces — sofas, tables, chairs, shelves, and more in every wood type.',
    features: [
      'Sofas, chairs, tables in all wood types',
      'Counters, shelves, and cabinets',
      'Connects and rotates to fit your build',
      'Craftable from the start',
    ],
    newbieNote:
      'If you want to make your base look like an actual home, this is the mod to use. You can make proper furniture from the wood you already have.',
    modrinth: 'handcrafted',
  },
  {
    id: 'another-furniture',
    name: 'Another Furniture',
    category: 'decoration',
    description:
      'Adds another full set of furniture including mirrors, curtains, mail boxes, and decorative storage blocks that complement Handcrafted.',
    features: [
      'Mirrors, curtains, lampshades',
      'Decorative storage and shelving',
      'Works with all wood types',
    ],
    modrinth: 'another-furniture',
  },
  {
    id: 'mcw-bridges',
    name: "Macaw's Bridges",
    category: 'decoration',
    description:
      'Adds a wide variety of bridge blocks in every wood and stone type — rope bridges, stone arches, iron drawbridges, and more.',
    features: [
      '20+ bridge styles',
      'All vanilla wood and stone variants',
      'Rope bridges, stone arches, iron bridges',
      'Fully walkable and structural',
    ],
    modrinth: 'macaws-bridges',
  },
  {
    id: 'mcw-doors',
    name: "Macaw's Doors",
    category: 'decoration',
    description:
      'Adds 50+ new door styles — from rustic barn doors to modern glass panels, in every material and style imaginable.',
    features: [
      '50+ door variants',
      'All wood types, iron, stone, and glass',
      'Double doors, sliding doors, barn doors',
    ],
    modrinth: 'macaws-doors',
  },
  {
    id: 'mcw-lights',
    name: "Macaw's Lights & Lamps",
    category: 'decoration',
    description:
      'A huge collection of decorative light sources — wall sconces, floor lamps, ceiling lights, lanterns, and string lights in many styles.',
    features: [
      '40+ light fixture variants',
      'Modern, medieval, and industrial styles',
      'Proper light emission levels',
    ],
    modrinth: 'macaws-lights-and-lamps',
  },
  {
    id: 'mcw-fences',
    name: "Macaw's Fences & Walls",
    category: 'decoration',
    description:
      'Adds fences, walls, and gates in materials that vanilla doesn\'t support — glass fences, stone brick walls, iron gates, and more.',
    features: [
      'Fences in all stone and metal types',
      'Glass pane fences',
      'Iron and other metal gates',
    ],
    modrinth: 'macaws-fences-and-walls',
  },
  {
    id: 'mcw-windows',
    name: "Macaw's Windows",
    category: 'decoration',
    description:
      'Expands window options massively — framed windows in every wood type, stained arched windows, shutters, and decorative pane patterns.',
    features: [
      'Framed windows in all wood types',
      'Arched and circular window shapes',
      'Shutters and window pane patterns',
    ],
    modrinth: 'macaws-windows',
  },
  {
    id: 'mcw-roofs',
    name: "Macaw's Roofs",
    category: 'decoration',
    description:
      'The mod every builder has wanted — actual roof-shaped blocks that let you build proper angled rooftops in any material.',
    features: [
      'Roof slope blocks in all materials',
      'Ridge, valley, and hip pieces',
      'All vanilla stone and wood types',
      'Essential for realistic buildings',
    ],
    newbieNote:
      'Building a proper pitched roof in normal Minecraft is really hard. This mod adds actual angled roof pieces — hugely useful if you want your house to look realistic.',
    modrinth: 'macaws-roofs',
  },
  {
    id: 'letsdo-beach-party',
    name: "Let's Do: Beach Party",
    category: 'decoration',
    description:
      "Adds beach and tropical themed decorations — umbrellas, beach chairs, tiki bars, palm-themed blocks, and new tropical foods and drinks.",
    features: [
      'Beach chairs, umbrellas, tiki blocks',
      'Tropical food and drinks',
      'New palm wood variants',
      'Beach-themed decorative pieces',
    ],
    modrinth: 'lets-do-beach-party',
  },
  {
    id: 'letsdo-farm-and-charm',
    name: "Let's Do: Farm & Charm",
    category: 'decoration',
    description:
      'Expands the farming and kitchen aesthetic with new crops, cooking stations, pantry items, and rustic decoration blocks for a proper farmhouse feel.',
    features: [
      'New crops and ingredients',
      'Cooking pots, ovens, and kitchen blocks',
      'Pantry and cellar decorative pieces',
      'Rustic farmhouse furniture style',
    ],
    modrinth: 'lets-do-farm-charm',
  },
  {
    id: 'supplementaries',
    name: 'Supplementaries',
    category: 'decoration',
    description:
      'A huge collection of small but creative blocks and items that fill the gaps vanilla leaves — signs you can write on, wind vanes, bamboo spikes, and dozens more.',
    features: [
      '80+ new blocks and items',
      'Planters, signs on posts, wind vanes',
      'Functional: cannons, clocks, hourglasses',
      'Decorative: flower pots, wreaths, jars',
    ],
    modrinth: 'supplementaries',
  },
  {
    id: 'visual-workbench',
    name: 'Visual Workbench',
    category: 'decoration',
    description:
      'Items placed in a crafting table remain visible on top of it — adds a nice touch to workshop setups and doesn\'t change any crafting mechanics.',
    features: [
      'Items display on top of the workbench',
      'Works with all vanilla crafting tables',
      'Pure cosmetic enhancement',
    ],
    modrinth: 'visual-workbench',
  },
  {
    id: 'klees-slabs',
    name: "Klee's Slabs",
    category: 'decoration',
    description:
      'Adds slab variants for many blocks that vanilla doesn\'t include — like glass slabs, bookshelf slabs, and more.',
    features: [
      'Slabs for blocks that normally don\'t have them',
      'Glass, bookshelf, glazed terracotta slabs',
      'Full crafting recipes',
    ],
    modrinth: 'kleeslabs',
  },
  {
    id: 'master-cutter',
    name: 'Master Cutter',
    category: 'decoration',
    description:
      'Expands the stone cutter to also cut wood blocks into stairs, slabs, and other wooden variants — reduces crafting steps for builders.',
    features: [
      'Stonecutter works on wood blocks',
      'Cut to stairs, slabs, fences, planks',
      'Works with all modded wood types',
    ],
    modrinth: 'master-cutter',
  },
  {
    id: 'moving-elevators',
    name: 'Moving Elevators',
    category: 'decoration',
    description:
      'Adds craftable elevator blocks with animated platforms that physically move up and down between floors — a step up from the usual water elevator.',
    features: [
      'Animated moving platform elevators',
      'Configurable speed and floor detection',
      'Multiple aesthetic variants',
      'Connects multiple floors automatically',
    ],
    modrinth: 'moving-elevators',
  },

  // ── MOBS & TRADING ────────────────────────────────────────────────────

  {
    id: 'friends-and-foes',
    name: 'Friends & Foes',
    category: 'mobs',
    description:
      'Adds mob vote losers and other community-requested mobs to the game — including the Copper Golem, Glare, Moobloom, and Iceologer.',
    features: [
      'Copper Golem: builds and presses copper buttons',
      'Glare: shows you dark areas where mobs can spawn',
      'Moobloom: a flower-covered Mooshroom variant',
      'Iceologer: an illager that hurls ice clouds at you',
    ],
    newbieNote:
      'These are creatures that Minecraft fans voted for in official Mob Votes but didn\'t win. Now they\'re in our server!',
    modrinth: 'friends-and-foes',
  },
  {
    id: 'goblin-traders',
    name: 'Goblin Traders',
    category: 'mobs',
    description:
      'Adds goblin merchant mobs that spawn underground and deep in the nether — they sell rare and unique items not available through regular villager trading.',
    features: [
      'Underground goblin spawns',
      'Nether goblin variant',
      'Trades rare materials and exclusive items',
      'Passive unless attacked',
    ],
    modrinth: 'goblin-traders',
  },
  {
    id: 'villager-trading-plus',
    name: 'Villager Trading Plus',
    category: 'mobs',
    description:
      'Improves the villager trading system — villagers restock faster, have better trade values, and trading with them is generally less grindy.',
    features: [
      'Faster villager restocking',
      'Improved default trade offers',
      'Less grind to unlock higher-tier trades',
    ],
    modrinth: 'villager-trading-plus',
  },
  {
    id: 'trade-cycling',
    name: 'Trade Cycling',
    category: 'mobs',
    description:
      'Adds a button to the villager trading screen that lets you cycle through available trades without having to keep trading and waiting for restocks.',
    features: [
      'Cycle villager trades instantly',
      'Small XP/emerald cost per cycle',
      'No more locking in bad trades',
    ],
    modrinth: 'trade-cycling',
  },
  {
    id: 'animal-feeding-trough',
    name: 'Animal Feeding Trough',
    category: 'mobs',
    description:
      'Adds a craftable feeding trough block — fill it with animal food and nearby animals will feed themselves automatically, making animal farming much easier.',
    features: [
      'Passive animal feeding automation',
      'Works with vanilla animal foods',
      'Animals breed automatically if trough is full',
    ],
    modrinth: 'animal-feeding-trough',
  },

  // ── VISUALS & PERFORMANCE ─────────────────────────────────────────────

  {
    id: 'sodium',
    name: 'Sodium',
    category: 'performance',
    description:
      'A complete rewrite of Minecraft\'s rendering engine that dramatically improves frame rate — typically 2–5× better FPS than vanilla, especially on modern hardware.',
    features: [
      '2–5× FPS improvement over vanilla',
      'Lower CPU and GPU usage',
      'Supports all vanilla and most mod visuals',
      'Foundation for shader support via Iris',
    ],
    newbieNote:
      'You won\'t notice this mod directly, but your game will run much smoother because of it. It\'s one of the most important mods in the pack.',
    modrinth: 'sodium',
  },
  {
    id: 'lithium',
    name: 'Lithium',
    category: 'performance',
    description:
      'Optimises Minecraft\'s game logic — pathfinding, ticking, chunk generation, and physics — without changing any gameplay behaviour.',
    features: [
      'Faster mob AI and pathfinding',
      'Optimised chunk generation',
      'Reduced TPS lag on the server',
      'Zero gameplay changes',
    ],
    modrinth: 'lithium',
  },
  {
    id: 'iris',
    name: 'Iris Shaders',
    category: 'performance',
    description:
      'Adds shader pack support to Sodium — install any compatible shader pack and get beautiful shadows, lighting, water reflections, and volumetric fog.',
    features: [
      'Shader pack support (Complementary, BSL, SEUS, etc.)',
      'Works alongside Sodium for great performance',
      'Supports OptiFine shader format',
      'Toggle shaders in-game without restarting',
    ],
    newbieNote:
      'With this mod installed you can use shader packs to make the game look dramatically better — real shadows, reflective water, and beautiful sunsets. Ask in the group for recommended shaders!',
    modrinth: 'iris',
  },
  {
    id: 'entity-culling',
    name: 'Entity Culling',
    category: 'performance',
    description:
      'Stops rendering entities (mobs, items, players) that are blocked from view behind walls — a common source of FPS loss in busy areas.',
    features: [
      'Async entity visibility checking',
      'Significant FPS improvement in mob-dense areas',
      'No visual difference to the player',
    ],
    modrinth: 'entityculling',
  },
  {
    id: 'ferritecore',
    name: 'FerriteCore',
    category: 'performance',
    description:
      'Reduces Minecraft\'s RAM usage significantly by optimising how block state and other data is stored in memory.',
    features: [
      'Up to 40% RAM reduction in some cases',
      'Faster chunk loading',
      'No gameplay changes',
    ],
    modrinth: 'ferrite-core',
  },
  {
    id: 'modernfix',
    name: 'ModernFix',
    category: 'performance',
    description:
      'A comprehensive performance improvement and bug-fix mod that addresses dozens of Minecraft inefficiencies — improves startup time, memory usage, and in-game performance.',
    features: [
      'Faster game startup',
      'Reduced memory usage',
      'Dynamic resource loading',
      'Fixes for many vanilla bugs',
    ],
    modrinth: 'modernfix',
  },
  {
    id: 'dynamic-fps',
    name: 'Dynamic FPS',
    category: 'performance',
    description:
      'Reduces Minecraft\'s frame rate (and CPU/GPU usage) when the window is minimised or you\'re tabbed out — so it doesn\'t drain resources while you\'re doing something else.',
    features: [
      'Reduces FPS when window is inactive',
      'Configurable inactive FPS cap',
      'Significant power/battery savings',
    ],
    modrinth: 'dynamic-fps',
  },
  {
    id: 'entity-model-features',
    name: 'Entity Model Features',
    category: 'performance',
    description:
      'Adds support for custom entity model variants defined in resource packs — enables mods and packs to give mobs unique model variations.',
    features: [
      'Custom entity model support',
      'Compatible with OptiFine CEM format',
      'Foundation for unique mob appearances',
    ],
    modrinth: 'entity-model-features',
  },
  {
    id: 'entity-texture-features',
    name: 'Entity Texture Features',
    category: 'performance',
    description:
      'Adds random and biome-specific texture variation to mobs — cows in different colours, cats with varied markings, and much more visual diversity.',
    features: [
      'Random texture variants for mobs',
      'Biome-specific mob skins',
      'Emissive texture support',
      'OptiFine-compatible format',
    ],
    newbieNote:
      'Notice how some cows have different patterns or some cats look unique? That\'s this mod — it makes mobs look more visually varied.',
    modrinth: 'entity-texture-features',
  },
  {
    id: 'not-enough-animations',
    name: 'Not Enough Animations',
    category: 'performance',
    description:
      'Adds smooth first-person animations for eating, drinking, reading maps, and more — making your character feel more alive in first-person view.',
    features: [
      'Eating and drinking animations',
      'Map-reading animation',
      'Climbing ladder animation',
      'Seat animation when in minecarts/boats',
    ],
    modrinth: 'not-enough-animations',
  },
  {
    id: 'visuality',
    name: 'Visuality',
    category: 'performance',
    description:
      'Adds small visual polish effects — hit particles on mobs, sparkles on enchanted items, ripples in rain, and other atmospheric touches.',
    features: [
      'Hit particles when striking mobs',
      'Enchanted item sparkles',
      'Rain ripple effects on water',
      'Snowflake particles in cold biomes',
    ],
    modrinth: 'visuality',
  },
  {
    id: 'subtle-effects',
    name: 'Subtle Effects',
    category: 'performance',
    description:
      'Adds gentle ambient visual effects — pollen particles in meadows, steam over lava, fireflies at night — without the performance cost of shader packs.',
    features: [
      'Pollen particles in flower biomes',
      'Steam effects over hot blocks',
      'Firefly particles at night',
      'Atmospheric and non-intrusive',
    ],
    modrinth: 'subtle-effects',
  },
  {
    id: 'chat-animation',
    name: 'Chat Animation',
    category: 'performance',
    description:
      'Adds a smooth slide-in animation to chat messages instead of them appearing instantly — a small but polished UI detail.',
    features: [
      'Animated chat message entrance',
      'Configurable animation speed',
      'Works with all chat mods',
    ],
    modrinth: 'chatanimation',
  },
  {
    id: 'continuity',
    name: 'Continuity',
    category: 'performance',
    description:
      'Adds connected texture support — glass panes and other blocks connect seamlessly without the dark frame line in the middle when placed next to each other.',
    features: [
      'Connected glass textures',
      'OptiFine CTM format support',
      'Works with vanilla and modded blocks',
    ],
    modrinth: 'continuity',
  },
  {
    id: 'blur',
    name: 'Blur',
    category: 'performance',
    description:
      'Blurs the game world behind any open GUI (inventory, chest, etc.) — reduces visual noise and makes menus easier to read.',
    features: [
      'Gaussian blur behind all GUIs',
      'Configurable blur radius',
      'Smooth fade-in animation',
    ],
    modrinth: 'blur-fabric',
  },
  {
    id: 'chat-heads',
    name: 'Chat Heads',
    category: 'performance',
    description:
      'Shows a small player head avatar next to each chat message so you can quickly see who\'s talking at a glance.',
    features: [
      'Player head icons in chat',
      'Works for all online players',
      'Configurable size',
    ],
    modrinth: 'chat-heads',
  },
  {
    id: 'ambient-sounds',
    name: 'Ambient Sounds',
    category: 'performance',
    description:
      'Adds rich, layered ambient audio to every biome — wind in deserts, bird calls in forests, deep rumbling in caves — making the world feel genuinely alive.',
    features: [
      'Biome-specific ambient soundscapes',
      'Cave ambience layers',
      'Dynamic volume based on environment',
      'Fade between biome sounds as you move',
    ],
    newbieNote:
      'Turn your volume up when exploring — this mod adds some really atmospheric sounds to the world. The caves especially feel much more eerie.',
    modrinth: 'ambientsounds',
  },
  {
    id: 'reeses-sodium-options',
    name: "Reese's Sodium Options",
    category: 'performance',
    description:
      'Improves the Sodium video settings screen with a better layout and more accessible options — making it easier to tune your graphics settings.',
    features: [
      'Better video settings UI layout',
      'Easier access to Sodium options',
      'Preview and reset buttons',
    ],
    modrinth: 'reeses-sodium-options',
  },
  {
    id: 'alternate-current',
    name: 'Alternate Current',
    category: 'performance',
    description:
      'A highly optimised redstone engine that makes redstone signals propagate faster and with less lag — identical behaviour to vanilla, just much more efficient.',
    features: [
      'Drastically faster redstone processing',
      'Reduces server lag from redstone',
      'Zero behaviour differences from vanilla',
    ],
    modrinth: 'alternate-current',
  },
  {
    id: 'noisium',
    name: 'Noisium',
    category: 'performance',
    description:
      'Optimises world generation noise calculations, making new chunk generation faster — reduces the lag spike when entering new areas.',
    features: [
      'Faster chunk generation',
      'Reduced world-gen related lag spikes',
      'No changes to terrain output',
    ],
    modrinth: 'noisium',
  },
  {
    id: 'exposure',
    name: 'Exposure',
    category: 'qol',
    description:
      'Adds film cameras and a darkroom developing process — take in-game photographs, develop the film, and hang the prints on your walls.',
    features: [
      'Craftable film cameras (black & white and colour)',
      'Develop film in a darkroom',
      'Print and frame photos on walls',
      'Capture memories of your builds and adventures',
    ],
    newbieNote:
      'This is a fun creative mod — craft a camera, take photos of your base or your friends, develop the film, and decorate your house with the prints!',
    modrinth: 'exposure',
  },
  {
    id: 'oritech',
    name: 'Oritech',
    category: 'qol',
    description:
      'A technology mod adding machines, automation, and processing chains — ore doubling, energy systems, and multiblock machines for mid-to-late game automation.',
    features: [
      'Energy generation and storage',
      'Ore doubling and processing',
      'Automated crafting and transport',
      'Multiblock machine structures',
    ],
    newbieNote:
      'This is the most "technical" mod in the pack. Don\'t worry about it early on — it\'s a mid-to-late game mod for players who want to automate resource production.',
    modrinth: 'oritech',
  },

  // ── LIBRARIES (hidden by default) ─────────────────────────────────────

  {
    id: 'fabric-api',
    name: 'Fabric API',
    category: 'library',
    isLibrary: true,
    description: 'The core API required by virtually every Fabric mod.',
    features: [],
    modrinth: 'fabric-api',
  },
  {
    id: 'architectury',
    name: 'Architectury API',
    category: 'library',
    isLibrary: true,
    description: 'Cross-platform modding library used by many mods.',
    features: [],
    modrinth: 'architectury-api',
  },
  {
    id: 'cloth-config',
    name: 'Cloth Config API',
    category: 'library',
    isLibrary: true,
    description: 'Configuration GUI library.',
    features: [],
    modrinth: 'cloth-config',
  },
  {
    id: 'yet-another-config-lib',
    name: 'Yet Another Config Lib',
    category: 'library',
    isLibrary: true,
    description: 'Configuration library used by several mods.',
    features: [],
    modrinth: 'yacl',
  },
  {
    id: 'bookshelf',
    name: 'Bookshelf',
    category: 'library',
    isLibrary: true,
    description: 'Library for Darkhax mods.',
    features: [],
    modrinth: 'bookshelf',
  },
  {
    id: 'collective',
    name: 'Collective',
    category: 'library',
    isLibrary: true,
    description: 'Shared library for Serilum mods.',
    features: [],
    modrinth: 'collective',
  },
  {
    id: 'cupboard',
    name: 'Cupboard',
    category: 'library',
    isLibrary: true,
    description: 'Library required by some Fabric mods.',
    features: [],
    modrinth: 'cupboard',
  },
  {
    id: 'framework',
    name: 'Framework',
    category: 'library',
    isLibrary: true,
    description: 'Shared library for MrCrayfish mods (Macaw\'s series).',
    features: [],
    modrinth: 'framework',
  },
  {
    id: 'balm',
    name: 'Balm',
    category: 'library',
    isLibrary: true,
    description: 'Library for BlayTheNinth mods.',
    features: [],
    modrinth: 'balm',
  },
  {
    id: 'geckolib',
    name: 'GeckoLib',
    category: 'library',
    isLibrary: true,
    description: 'Animation engine library used by mobs in various mods.',
    features: [],
    modrinth: 'geckolib',
  },
  {
    id: 'creativecore',
    name: 'CreativeCore',
    category: 'library',
    isLibrary: true,
    description: 'Core library for CreativeMD mods (Ambient Sounds, etc.).',
    features: [],
    modrinth: 'creativecore',
  },
  {
    id: 'puzzleslib',
    name: 'Puzzles Lib',
    category: 'library',
    isLibrary: true,
    description: 'Library for Fuzs mods.',
    features: [],
    modrinth: 'puzzles-lib',
  },
  {
    id: 'forge-config-api-port',
    name: 'Forge Config API Port',
    category: 'library',
    isLibrary: true,
    description: 'Ports Forge\'s config API to Fabric.',
    features: [],
    modrinth: 'forge-config-api-port',
  },
  {
    id: 'platform-fabric',
    name: 'Platform',
    category: 'library',
    isLibrary: true,
    description: 'Cross-platform library.',
    features: [],
    modrinth: 'platform',
  },
  {
    id: 'fabric-language-kotlin',
    name: 'Fabric Language Kotlin',
    category: 'library',
    isLibrary: true,
    description: 'Kotlin language support for Fabric mods.',
    features: [],
    modrinth: 'fabric-language-kotlin',
  },
  {
    id: 'moonlight',
    name: 'Moonlight Lib',
    category: 'library',
    isLibrary: true,
    description: 'Library for MehVahdJukaar mods (Supplementaries, etc.).',
    features: [],
    modrinth: 'moonlight',
  },
  {
    id: 'yungs-api',
    name: "YUNG's API",
    category: 'library',
    isLibrary: true,
    description: "Required by all YUNG's structure mods.",
    features: [],
    modrinth: 'yungs-api',
  },
  {
    id: 'cristellib',
    name: 'Cristel Lib',
    category: 'library',
    isLibrary: true,
    description: 'Library for structure mods.',
    features: [],
    modrinth: 'cristellib',
  },
  {
    id: 'mru',
    name: 'MRU',
    category: 'library',
    isLibrary: true,
    description: 'Utility library.',
    features: [],
  },
  {
    id: 'owo-lib',
    name: 'oωo (owo-lib)',
    category: 'library',
    isLibrary: true,
    description: 'Library for glisco mods.',
    features: [],
    modrinth: 'owo-lib',
  },
  {
    id: 'accessories-compat',
    name: 'Accessories Compat Layer',
    category: 'library',
    isLibrary: true,
    description: 'Compatibility layer between Accessories and Trinkets.',
    features: [],
  },
  {
    id: 'player-animation-lib',
    name: 'Player Animation Library',
    category: 'library',
    isLibrary: true,
    description: 'Library for player model animation mods.',
    features: [],
    modrinth: 'player-animation-lib',
  },
  {
    id: 'silk',
    name: 'Silk API',
    category: 'library',
    isLibrary: true,
    description: 'API library for world generation mods.',
    features: [],
    modrinth: 'silk',
  },
  {
    id: 'biolith',
    name: 'Biolith',
    category: 'library',
    isLibrary: true,
    description: 'Biome placement library for world generation mods.',
    features: [],
    modrinth: 'biolith',
  },
  {
    id: 'worldweaver',
    name: 'WorldWeaver',
    category: 'library',
    isLibrary: true,
    description: 'World generation library for BetterX mods.',
    features: [],
    modrinth: 'worldweaver',
  },
  {
    id: 'lithostitched',
    name: 'Lithostitched',
    category: 'library',
    isLibrary: true,
    description: 'Library for world generation modifications.',
    features: [],
    modrinth: 'lithostitched',
  },
  {
    id: 'jamlib',
    name: 'JamLib',
    category: 'library',
    isLibrary: true,
    description: 'Library for jamieswhiteshirt mods.',
    features: [],
    modrinth: 'jamlib',
  },
  {
    id: 'fzzy-config',
    name: 'Fzzy Config',
    category: 'library',
    isLibrary: true,
    description: 'Configuration library.',
    features: [],
    modrinth: 'fzzy-config',
  },
  {
    id: 'resourcefullib',
    name: 'Resourceful Lib',
    category: 'library',
    isLibrary: true,
    description: 'Library for Team Resourceful mods.',
    features: [],
    modrinth: 'resourceful-lib',
  },
  {
    id: 'athena',
    name: 'Athena',
    category: 'library',
    isLibrary: true,
    description: 'Cape and cosmetics library.',
    features: [],
    modrinth: 'athena',
  },
  {
    id: 'prickle',
    name: 'Prickle',
    category: 'library',
    isLibrary: true,
    description: 'Library for Fuzs mods.',
    features: [],
    modrinth: 'prickle',
  },
  {
    id: 'monolib',
    name: 'MonoLib',
    category: 'library',
    isLibrary: true,
    description: 'Utility library.',
    features: [],
  },
  {
    id: 'midnightlib',
    name: 'MidnightLib',
    category: 'library',
    isLibrary: true,
    description: 'Library for midnight-cfg and related mods.',
    features: [],
    modrinth: 'midnightlib',
  },
  {
    id: 'supermartijn642configlib',
    name: 'SuperMartijn642\'s Config Lib',
    category: 'library',
    isLibrary: true,
    description: 'Config library for SuperMartijn642 mods.',
    features: [],
    modrinth: 'supermartijn642s-config-lib',
  },
  {
    id: 'supermartijn642corelib',
    name: 'SuperMartijn642\'s Core Lib',
    category: 'library',
    isLibrary: true,
    description: 'Core library for SuperMartijn642 mods (Trash Cans, etc.).',
    features: [],
    modrinth: 'supermartijn642s-core-lib',
  },
  {
    id: 'bclib',
    name: 'BCLib',
    category: 'library',
    isLibrary: true,
    description: 'Library for BetterX mods (Better End, Better Nether).',
    features: [],
    modrinth: 'bclib',
  },
  {
    id: 'searchables',
    name: 'Searchables',
    category: 'library',
    isLibrary: true,
    description: 'Adds search functionality used by Controlling and other mods.',
    features: [],
    modrinth: 'searchables',
  },
  {
    id: 'sophisticated-core',
    name: 'Sophisticated Core',
    category: 'library',
    isLibrary: true,
    description: 'Shared core for Sophisticated Backpacks and Sophisticated Storage.',
    features: [],
    modrinth: 'sophisticated-core',
  },
  {
    id: 'spark',
    name: 'spark',
    category: 'library',
    isLibrary: true,
    description: 'Performance profiler for diagnosing server lag. Used by server admins.',
    features: [],
    modrinth: 'spark',
  },
]

export const PLAYER_MODS = MODS.filter((m) => !m.isLibrary)
export const LIBRARY_MODS = MODS.filter((m) => m.isLibrary)

export function getModById(id: string): Mod | undefined {
  return MODS.find((m) => m.id === id)
}

export const CATEGORY_ORDER: Category[] = [
  'worldgen',
  'structures',
  'qol',
  'storage',
  'combat',
  'decoration',
  'mobs',
  'performance',
  'library',
]
