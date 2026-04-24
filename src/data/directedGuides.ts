import { PLAYER_MODS } from './mods'

export interface ModGuideSection {
  heading: string
  body: string
}

export interface ModGuide {
  id: string
  title: string
  mods: string[]
  category: string
  tagline: string
  priority: 'Essential' | 'Useful' | 'Niche'
  searchTerms: string[]
  sections: ModGuideSection[]
  quickTips: string[]
}

export const MOD_GUIDES: ModGuide[] = [
  // ── Travel ────────────────────────────────────────────────────────────────────
  {
    id: 'waystones',
    title: 'Waystones',
    mods: ['Waystones'],
    category: 'Travel',
    tagline: 'Build a fast-travel network between your most important locations.',
    priority: 'Essential',
    searchTerms: ['teleport', 'warp', 'travel', 'fast travel', 'warp stone'],
    sections: [
      {
        heading: 'What it does',
        body: 'Waystones let you teleport between activated obelisks. Village waystones are usually your first entry point — activate one and you can instantly return to that village from anywhere in your network.',
      },
      {
        heading: 'How to activate a waystone',
        body: 'Walk up to a waystone block and right-click it. Your name appears in the menu as the current location. The stone is now part of your network and shows up in every other waystone menu.',
      },
      {
        heading: 'The travel menu',
        body: 'Right-clicking any waystone opens a list of all your activated stones. Each entry shows the name and distance. You can search the list, reorder entries with the arrows, and remove ones you no longer need by shift-clicking the × button.',
      },
      {
        heading: 'Warp Stone (item)',
        body: 'A Warp Stone is a craftable item that opens the same travel menu from anywhere in the world — no waystone block required. It does not teleport you directly; it just lets you use your network from the field.',
      },
    ],
    quickTips: [
      'Name stones by function: Base, Iron Mine, End Portal, Village North.',
      'Keep your most-used destinations at the top of the list.',
      'Carry a Warp Stone when exploring so you can always get home.',
    ],
  },
  {
    id: 'journeymap',
    title: 'JourneyMap',
    mods: ['JourneyMap'],
    category: 'Travel',
    tagline: 'Real-time map, minimap, and waypoints so you never lose your base again.',
    priority: 'Essential',
    searchTerms: ['map', 'minimap', 'waypoint', 'death point', 'navigation', 'fullscreen map'],
    sections: [
      {
        heading: 'What it does',
        body: 'JourneyMap maps the world in real time as you explore. The minimap is always visible in the corner. Press J to open the fullscreen map for route planning, waypoint management, and landmark tracking.',
      },
      {
        heading: 'Waypoints',
        body: 'Double-click anywhere on the fullscreen map to create a waypoint. Name it clearly — "Village North", "Iron Mine", "End Portal" — and it will appear on both the minimap and fullscreen map permanently.',
      },
      {
        heading: 'Death points',
        body: "JourneyMap automatically marks where you died. If you lose gear, open the fullscreen map right away — the death waypoint is there. Delete it once you've recovered your stuff.",
      },
      {
        heading: 'How it pairs with Waystones',
        body: 'JourneyMap tells you where things are. Waystones make getting back there painless. Use the map to discover destinations, then place waystones to connect them into your travel network.',
      },
    ],
    quickTips: [
      'Set a home waypoint the moment you find a good base location.',
      'Delete noisy or temporary waypoints before the map gets cluttered.',
      'Use the fullscreen map to plan routes before long trips.',
    ],
  },
  {
    id: 'compasses',
    title: "Explorer's & Nature's Compass",
    mods: ["Explorer's Compass", "Nature's Compass"],
    category: 'Travel',
    tagline: 'Point to any structure or biome — no more hour-long blind searches.',
    priority: 'Useful',
    searchTerms: ['structure finder', 'biome finder', 'compass', 'find village', 'find stronghold', 'find biome'],
    sections: [
      {
        heading: "Explorer's Compass — structures",
        body: "Right-click the Explorer's Compass and choose a structure type. It points you toward the nearest one and shows the distance. Use it when you want a specific dungeon, stronghold, or village and don't want to wander blindly.",
      },
      {
        heading: "Nature's Compass — biomes",
        body: "Right-click Nature's Compass and choose a biome. Same idea — it points toward the nearest one. Use it when you need a specific biome for resources, building, or modded exploration goals.",
      },
      {
        heading: 'Why these matter in this pack',
        body: 'Worldgen is much larger and more varied than vanilla. Finding a specific biome or structure by wandering alone can take hours. These tools turn that into a 5-minute trip.',
      },
    ],
    quickTips: [
      'Use with JourneyMap — once you find a target, mark it so you never need to find it again.',
      'Bring supplies before long structure hunts.',
      'Connect good finds into your Waystones network.',
    ],
  },

  // ── Information ───────────────────────────────────────────────────────────────
  {
    id: 'emi',
    title: 'EMI',
    mods: ['EMI (Every Menu Indexed)', 'EMI Enchanting', 'EMI Loot'],
    category: 'Information',
    tagline: 'Look up any recipe, use, enchant option, or loot source — always open in your inventory.',
    priority: 'Essential',
    searchTerms: ['recipes', 'uses', 'r key', 'u key', 'loot', 'enchant preview', 'item lookup', 'crafting'],
    sections: [
      {
        heading: 'What it is',
        body: 'EMI is always open on the right side of your inventory screen. It shows every item in the game — vanilla and modded. No setup needed.',
      },
      {
        heading: 'Looking up a recipe',
        body: "Hover any item in the EMI panel and press R (or left-click it) to see how it's crafted. If an item has multiple recipes, arrows let you cycle through them. Click any ingredient to follow the chain deeper.",
      },
      {
        heading: 'Looking up uses',
        body: "Hover any item and press U (or right-click it) to see everything it can be used for — what it crafts into, smelts into, trades, and more. Great when you're holding a raw material and don't know what to do with it.",
      },
      {
        heading: 'EMI Enchanting',
        body: 'EMI Enchanting lets you preview enchanting table options before spending XP. Hover an enchantable item and use the enchanting lookup to see what rolls are possible at your current level.',
      },
      {
        heading: 'EMI Loot',
        body: 'EMI Loot shows where items come from — which mob drops them, which chest pool contains them, which fishing table rolls them. Use it when an item has no recipe.',
      },
    ],
    quickTips: [
      'Search by mod name with @modname — try @waystones or @supplementaries.',
      'Use loot lookup before assuming something is uncraftable.',
      'Follow recipe chains all the way back to raw materials.',
    ],
  },
  {
    id: 'jade',
    title: 'Jade',
    mods: ['Jade', 'Jade Addons'],
    category: 'Information',
    tagline: 'Hover over anything in the world to see what it is and what state it is in.',
    priority: 'Essential',
    searchTerms: ['tooltip', 'overlay', 'what is this block', 'jade', 'block info', 'container preview'],
    sections: [
      {
        heading: 'What it does',
        body: "Jade shows an overlay in the corner of your screen when you look at a block or entity. It tells you the name, mod source, and often useful state info — how full a container is, what's cooking in a furnace, what a mob's health is.",
      },
      {
        heading: 'Why Jade Addons matters',
        body: 'Jade Addons extends the overlay into pack-specific systems — storage mods, backpacks, machines. Without it, modded containers just show a generic name. With it, you can see contents at a glance.',
      },
      {
        heading: 'Practical use',
        body: 'In a pack with 100+ mods, Jade is how you learn what things are without opening a wiki. Look at an unknown block before breaking it. Use the name as a search term in EMI.',
      },
    ],
    quickTips: [
      'Look before you break — Jade names unknown blocks instantly.',
      'Use the displayed name as a search term in EMI or JEI.',
      'Jade + EMI together answer almost every "what is this / how do I use it" question.',
    ],
  },
  {
    id: 'appleskin',
    title: 'AppleSkin',
    mods: ['AppleSkin'],
    category: 'Information',
    tagline: 'See exactly how much hunger and saturation food will restore before you eat it.',
    priority: 'Useful',
    searchTerms: ['food', 'hunger', 'saturation', 'food preview', 'appleskin', 'eat'],
    sections: [
      {
        heading: 'What it does',
        body: 'AppleSkin adds a preview overlay when you hold food in your hand, showing exactly how many hunger bars and how much hidden saturation it will restore. It also visualizes saturation on your HUD.',
      },
      {
        heading: 'Why saturation matters',
        body: "Hunger bars are visible but saturation is hidden in vanilla. Saturation is what actually delays hunger drain — high-saturation food keeps you full far longer than low-saturation food with the same hunger bars. AppleSkin makes this visible.",
      },
    ],
    quickTips: [
      'Cooked meat has much better saturation than bread — it looks similar on the HUD but lasts longer.',
      'High-saturation food is better for exploration; save cheap food for base work.',
      'Hold food in your hand while looking at your HUD to see the preview.',
    ],
  },

  // ── Storage ───────────────────────────────────────────────────────────────────
  {
    id: 'sophisticated-backpacks',
    title: 'Sophisticated Backpacks',
    mods: ['Sophisticated Backpacks'],
    category: 'Storage',
    tagline: 'Wearable, upgradeable backpack that solves inventory pressure in the field.',
    priority: 'Essential',
    searchTerms: ['backpack', 'inventory', 'field storage', 'upgrades', 'portable storage'],
    sections: [
      {
        heading: 'Why craft this early',
        body: 'A basic backpack doubles your effective inventory immediately. It should be one of the first quality-of-life crafts you make — definitely before your first serious mining trip.',
      },
      {
        heading: 'Upgrades',
        body: "Backpacks have upgrade slots that add real functionality: auto-pickup for specific items, void excess items automatically, smelt on the go, sort contents, and more. Don't treat it as just a bigger chest — the upgrades are where the value is.",
      },
      {
        heading: 'Wearing and opening',
        body: 'Equip the backpack in your chest slot or hold it and sneak-right-click to open it without equipping. You can open it from the inventory screen too.',
      },
    ],
    quickTips: [
      'Craft a backpack before your first serious mining session.',
      'Add a pickup upgrade filtered to ores to auto-collect while mining.',
      'You can open a backpack placed on the ground — use it as a temporary field cache.',
    ],
  },
  {
    id: 'sophisticated-storage',
    title: 'Sophisticated Storage',
    mods: ['Sophisticated Storage'],
    category: 'Storage',
    tagline: 'Larger, upgradeable storage chests with filtering and automation support.',
    priority: 'Useful',
    searchTerms: ['chest', 'storage', 'upgrades', 'filter', 'large chest', 'base storage'],
    sections: [
      {
        heading: 'What it gives you',
        body: 'Sophisticated Storage chests start with more slots than vanilla and scale up with upgrades. Upgrade slots let you add item filtering, stack compacting, item blocking, and more — making each chest smarter, not just bigger.',
      },
      {
        heading: 'How it pairs with other mods',
        body: "These chests connect into Tom's Simple Storage, giving you a searchable terminal that sees everything across all connected Sophisticated Storage containers. The combination completely replaces the 'chest room full of unlabeled chests' problem.",
      },
    ],
    quickTips: [
      'Set up filters on chests before they fill up — retroactive sorting is painful.',
      'Pair with a Tom\'s Simple Storage terminal as soon as chest navigation becomes annoying.',
      'Upgrade chests in place — you don\'t have to replace them to make them bigger.',
    ],
  },
  {
    id: 'toms-storage',
    title: "Tom's Simple Storage",
    mods: ["Tom's Simple Storage"],
    category: 'Storage',
    tagline: 'One terminal that searches and accesses everything in your connected chest network.',
    priority: 'Useful',
    searchTerms: ['storage network', 'terminal', 'search chest', 'networked storage', 'item terminal'],
    sections: [
      {
        heading: 'What it does',
        body: "Tom's Simple Storage turns a scattered room of chests into one searchable system. Place a Storage Terminal connected to your chests (via cables or adjacent placement) and you can search, deposit, and withdraw from all of them in one place.",
      },
      {
        heading: 'When to set it up',
        body: 'Set it up once chest navigation becomes annoying — usually when you have 6+ chests and start losing items because you can\'t remember which chest has what.',
      },
      {
        heading: 'Compatibility',
        body: 'Works natively with Sophisticated Storage chests. Once connected, your terminal sees everything in the network. No need to label every chest manually.',
      },
    ],
    quickTips: [
      "Build this when chest navigation becomes a time sink — it pays for itself immediately.",
      "Put the terminal at your main crafting area so depositing and withdrawing is part of your natural workflow.",
      "Works best once your chest organization is at least roughly set up.",
    ],
  },
  {
    id: 'trash-cans',
    title: 'Trash Cans',
    mods: ['Trash Cans'],
    category: 'Storage',
    tagline: 'Void unwanted items cleanly instead of letting junk overflow your storage.',
    priority: 'Useful',
    searchTerms: ['trash', 'void', 'delete items', 'junk', 'overflow'],
    sections: [
      {
        heading: 'Why it matters',
        body: 'Storage gets cluttered fast in modded Minecraft. Trash Cans let you intentionally delete low-value junk — gravel, dirt, excess stone, mob drops you never use — without creating overflow everywhere.',
      },
      {
        heading: 'Liquid and energy variants',
        body: 'Trash Cans also come in liquid and energy variants for voiding fluid and power outputs from machines. Useful once you get into any automation.',
      },
    ],
    quickTips: [
      'Place one near your main storage area for passive junk management.',
      'Set up item filters to auto-void specific junk automatically.',
      "Don't pretend you'll sort that pile of gravel. Just void it.",
    ],
  },

  // ── Combat & Gear ─────────────────────────────────────────────────────────────
  {
    id: 'combat-roll',
    title: 'Combat Roll',
    mods: ['Combat Roll'],
    category: 'Combat',
    tagline: 'Dodge in any direction — movement is now a real defensive tool.',
    priority: 'Useful',
    searchTerms: ['dodge', 'roll', 'combat', 'iframe', 'movement', 'combat roll'],
    sections: [
      {
        heading: 'What it adds',
        body: 'Combat Roll gives you a directional dodge with a cooldown. Move in a direction and press the roll key (default: left Alt) to roll that way, briefly passing through attacks during the animation.',
      },
      {
        heading: 'How to use it well',
        body: 'Roll through projectiles, away from mob swings, or around enemies to reposition. The cooldown is short enough that rolling becomes a natural part of every fight once you practice it.',
      },
      {
        heading: 'Why it changes combat feel',
        body: 'Without Combat Roll, Minecraft combat is mostly standing still and trading hits. With it, positioning and timing matter — harder encounters become about movement, not just armor values.',
      },
    ],
    quickTips: [
      'Bind roll to a key you can reach during combat — left Alt works for many players.',
      'Practice rolling before you need it under pressure.',
      'Roll through projectiles rather than away from them to maintain position.',
    ],
  },
  {
    id: 'artifacts',
    title: 'Artifacts',
    mods: ['Artifacts'],
    category: 'Combat',
    tagline: 'Treasure-drop utility items that give passive mobility, survivability, and convenience bonuses.',
    priority: 'Useful',
    searchTerms: ['artifacts', 'treasure', 'loot', 'passive', 'utility items', 'find artifacts'],
    sections: [
      {
        heading: 'What they are',
        body: 'Artifacts are special items found in dungeon chests and exploration loot. Unlike crafted gear, they are treasure items — you find them, not make them. Each one gives a unique passive or active effect.',
      },
      {
        heading: 'What kind of effects',
        body: 'Mobility bonuses, auto-jump on blocks, underwater breathing, fire immunity, projectile deflection, and more. Effects vary wildly — look them up with EMI Loot to know what you have.',
      },
      {
        heading: 'Where to equip them',
        body: 'Many Artifacts go into Accessories or Trinket slots — your character has dedicated equipment slots beyond armor. Check your character screen for extra slots you might not be using.',
      },
    ],
    quickTips: [
      'Test artifacts instead of stockpiling them — even small passive bonuses add up over hours.',
      'Use EMI Loot to find out which structures drop specific artifacts.',
      'Exploration structures have the best Artifact loot pools.',
    ],
  },
  {
    id: 'accessories-trinkets',
    title: 'Accessories & Trinkets',
    mods: ['Accessories', 'Trinkets'],
    category: 'Combat',
    tagline: 'Extra equipment slots for rings, charms, and artifact items beyond your armor.',
    priority: 'Useful',
    searchTerms: ['accessories', 'trinkets', 'rings', 'extra slots', 'equipment slots', 'passive'],
    sections: [
      {
        heading: 'What they do',
        body: 'Accessories and Trinkets add dedicated equipment slots to your character — rings, amulets, charms, belts, and more. Items that go in these slots provide passive bonuses without taking up armor slots.',
      },
      {
        heading: 'How to open the screen',
        body: 'Press A (or check your keybindings) to open the accessories screen, or find the extra slots inside your character inventory panel. The slots are separate from your normal armor.',
      },
      {
        heading: "Why you shouldn't ignore them",
        body: "If you skip these slots, you're leaving real progression on the table. Many Artifacts, modded rings, and utility items only provide their effect when equipped here.",
      },
    ],
    quickTips: [
      'Check your character screen early — you might have slots you didn\'t know existed.',
      'Exploration loot fills these slots better than crafted gear usually does.',
      'Passive bonuses from accessories are still real progression.',
    ],
  },
  {
    id: 'enchanting-mods',
    title: 'Enchanting & Repair Mods',
    mods: ['Easy Magic', 'Easy Anvils', 'Tax Free Levels', 'Better Than Mending', 'Disenchanting Table', 'Universal Enchants', 'Enchantment Descriptions'],
    category: 'Gear',
    tagline: 'Enchanting and repair are much friendlier here — use the tools this pack gives you.',
    priority: 'Useful',
    searchTerms: ['enchanting', 'anvil', 'repair', 'disenchant', 'mending', 'xp levels', 'enchant descriptions'],
    sections: [
      {
        heading: 'What changes vs vanilla',
        body: 'Easy Magic lets you reroll enchantments without grinding. Easy Anvils removes the "too expensive" cap. Tax Free Levels makes level costs more fair. Together, they remove most of vanilla enchanting\'s worst frustrations.',
      },
      {
        heading: 'Disenchanting Table',
        body: "Found a perfectly enchanted piece but the wrong gear type? The Disenchanting Table lets you transfer enchantments off items. Don't abandon good enchants — salvage them.",
      },
      {
        heading: 'Better Than Mending',
        body: 'Gives you more control over how Mending works — you can configure it so XP fills durability more predictably instead of the vanilla behavior that feels inconsistent.',
      },
      {
        heading: 'Enchantment Descriptions',
        body: "Every enchantment now has a description tooltip. You don't need to look up what 'Impaling' or 'Loyalty' does — hover the enchantment and it tells you.",
      },
    ],
    quickTips: [
      'Read enchant descriptions before dismissing niche enchantments.',
      'Use the Disenchanting Table before scrapping gear with good enchants.',
      "Don't play as if vanilla enchanting limits still apply — they mostly don't.",
    ],
  },
  {
    id: 'mythic-netherite',
    title: 'Mythic Upgrades & Advanced Netherite',
    mods: ['Mythic Upgrades', 'Advanced Netherite'],
    category: 'Gear',
    tagline: 'Gear progression extends well past vanilla Netherite — there are higher tiers.',
    priority: 'Useful',
    searchTerms: ['mythic', 'netherite', 'gear progression', 'endgame gear', 'upgrades', 'advanced'],
    sections: [
      {
        heading: 'What they add',
        body: "Mythic Upgrades and Advanced Netherite both push gear progression beyond vanilla's Netherite ceiling. Instead of Netherite being the unquestioned endpoint, you have additional material tiers and upgrade paths.",
      },
      {
        heading: 'Advanced Netherite specifically',
        body: 'Advanced Netherite adds Netherite variants of most vanilla armor and tool sets, and introduces tiers above standard Netherite using rare Nether materials.',
      },
      {
        heading: 'Mythic Upgrades specifically',
        body: 'Mythic Upgrades adds upgrade materials and smithing templates that push weapons and armor into higher stat ranges. Use EMI to look up the upgrade chains.',
      },
    ],
    quickTips: [
      "Look up upgrade paths in EMI before assuming Netherite is your ceiling.",
      "These mods reward Nether exploration — the upgrade materials are Nether-focused.",
      "Combine with the enchanting mods for the strongest possible gear.",
    ],
  },

  // ── Survival ──────────────────────────────────────────────────────────────────
  {
    id: 'grave-danger',
    title: "You're in Grave Danger",
    mods: ["You're in Grave Danger"],
    category: 'Survival',
    tagline: 'A gravestone spawns when you die — your items are safe until you recover them.',
    priority: 'Essential',
    searchTerms: ['grave', 'death', 'gravestone', 'item recovery', 'died', 'lost items'],
    sections: [
      {
        heading: 'What it does',
        body: "When you die, your items don't scatter on the ground and despawn. Instead, a gravestone spawns at your death location holding everything. Your items are safe until you go back and retrieve them.",
      },
      {
        heading: 'Finding your grave',
        body: 'JourneyMap automatically marks your death location. The mod also includes a compass that points toward your grave. You have time — don\'t panic-rush a dangerous recovery.',
      },
      {
        heading: 'Why this matters for multiplayer',
        body: "On a shared server, items scattered on the ground can be picked up by anyone or despawn in 5 minutes. Graves make death recoverable instead of catastrophic.",
      },
    ],
    quickTips: [
      "A grave buys you time — breathe first, then plan the recovery route.",
      "Don't rush a dangerous recovery. Dying twice makes it worse.",
      "Use JourneyMap to navigate back to the death waypoint.",
    ],
  },
  {
    id: 'comforts',
    title: 'Comforts',
    mods: ['Comforts'],
    category: 'Survival',
    tagline: 'Sleeping bags and hammocks let you sleep without setting a new spawn point.',
    priority: 'Useful',
    searchTerms: ['sleeping bag', 'hammock', 'sleep', 'spawn point', 'night skip', 'comforts'],
    sections: [
      {
        heading: 'What it adds',
        body: 'Sleeping bags skip the night like a bed but do not set your spawn point. Hammocks skip the day similarly. Both are portable and pack down into your inventory.',
      },
      {
        heading: 'When this matters',
        body: 'When you are exploring far from base and want to skip the night without committing your spawn to that location. Sleep at camp, wake up, continue exploring.',
      },
    ],
    quickTips: [
      'Always carry a sleeping bag on long exploration trips.',
      'Sleep in the sleeping bag, not a bed, unless you want to update your spawn.',
      'Hammocks skip day — useful when you want to do cave work at night.',
    ],
  },
  {
    id: 'lootr',
    title: 'Lootr',
    mods: ['Lootr'],
    category: 'Survival',
    tagline: 'Structure chests are personal — everyone on the server gets their own loot.',
    priority: 'Useful',
    searchTerms: ['loot', 'chest', 'personal loot', 'dungeon chest', 'multiplayer loot', 'lootr'],
    sections: [
      {
        heading: 'What it does',
        body: "Lootr makes dungeon and structure chests personal. Each player sees their own loot instance when they open a chest — one player looting it doesn't empty it for everyone else.",
      },
      {
        heading: 'Why it matters on a shared server',
        body: "Without Lootr, the first person to reach a dungeon takes all the loot. With it, everyone who finds the structure gets a fair shot regardless of who got there first.",
      },
    ],
    quickTips: [
      "You can loot chests your friends already looted — your instance is separate.",
      "Lootr chests look slightly different from vanilla chests — that's intentional.",
      "Share dungeon coordinates freely — everyone benefits from the same find.",
    ],
  },

  // ── World & Exploration ───────────────────────────────────────────────────────
  {
    id: 'worldgen',
    title: 'Worldgen Mods',
    mods: ['Terralith', 'Tectonic', 'Regions Unexplored'],
    category: 'Exploration',
    tagline: 'The overworld is dramatically larger and more varied than vanilla — explore with a plan.',
    priority: 'Useful',
    searchTerms: ['worldgen', 'biomes', 'terrain', 'terralith', 'tectonic', 'regions unexplored', 'world generation'],
    sections: [
      {
        heading: 'What changed',
        body: 'Terralith, Tectonic, and Regions Unexplored together make the world larger, more dramatic, and far more biome-diverse than vanilla. Mountain ranges are bigger, biomes are rarer, and interesting terrain appears much farther from spawn.',
      },
      {
        heading: 'How this affects exploration',
        body: 'You will travel farther for specific biomes and structures. Wandering casually is rewarding but disorienting. JourneyMap, Waystones, and compasses become necessary tools rather than conveniences.',
      },
      {
        heading: 'What to do differently',
        body: "Don't assume structures and biomes are close. Use Nature's Compass for biome targets, Explorer's Compass for structure targets, and always return via Waystones. Mark everything on JourneyMap.",
      },
    ],
    quickTips: [
      "Don't explore without JourneyMap running — the world is too big to navigate by memory.",
      "Use compasses for targeted biome and structure hunting.",
      "Connect every interesting find into your Waystones network.",
    ],
  },
  {
    id: 'dimensions',
    title: 'Aether, Better Nether & Better End',
    mods: ['The Aether', 'Better Nether', 'Better End', 'Eternal Starlight'],
    category: 'Exploration',
    tagline: 'All three dimensions are fully overhauled — treat each one like a destination, not a checklist.',
    priority: 'Useful',
    searchTerms: ['aether', 'nether', 'end', 'dimensions', 'better nether', 'better end', 'eternal starlight'],
    sections: [
      {
        heading: 'The Aether',
        body: 'The Aether is a sky dimension accessed through a portal made of Glowstone. It has its own biomes, mobs, dungeons, and gear progression. Treat it like a full alternate dimension with its own content track.',
      },
      {
        heading: 'Better Nether',
        body: 'Better Nether drastically increases Nether biome variety, adds new plants, mobs, and structures. The Nether is no longer just a fast-travel system and blaze/wither skeleton farm — it has actual exploration value.',
      },
      {
        heading: 'Better End',
        body: 'Better End transforms the End from mostly empty void into a rich dimension with many biomes, structures, and unique resources. Return to the End after the dragon fight.',
      },
      {
        heading: 'Eternal Starlight',
        body: 'Eternal Starlight adds a new space-themed dimension with its own exploration and resource goals. Find the portal and treat it as late-game content.',
      },
    ],
    quickTips: [
      "Don't rush dimensions — treat each one as a proper destination with its own prep needs.",
      "Set up return Waystones before going deep into any dimension.",
      "Use JourneyMap in every dimension — each one has its own map.",
    ],
  },
  {
    id: 'dungeons-structures',
    title: "YUNG's & Structure Mods",
    mods: ['When Dungeons Arise', 'Towns & Towers', 'Compatible Villages (CTOV)', 'Aether Villages', "YUNG's Better Dungeons", "YUNG's Better Desert Temples", "YUNG's Better Jungle Temples", "YUNG's Better Mineshafts", "YUNG's Better Nether Fortresses", "YUNG's Better Ocean Monuments", "YUNG's Better Strongholds", "YUNG's Better Witch Huts", 'Hopo Better Mineshaft'],
    category: 'Exploration',
    tagline: 'Structures are bigger, harder, and more rewarding — prepare before going in.',
    priority: 'Useful',
    searchTerms: ['dungeon', 'stronghold', 'temple', 'village', 'mineshaft', 'yung', 'structure loot', 'when dungeons arise'],
    sections: [
      {
        heading: 'What changed',
        body: 'YUNG\'s mods rebuild vanilla structures from scratch — strongholds, dungeons, desert temples, jungle temples, ocean monuments, and more are all larger, more layered, and more interesting than their vanilla originals.',
      },
      {
        heading: 'When Dungeons Arise',
        body: 'WDA adds enormous new dungeon structures to the world — towers, fortresses, and complex multi-floor buildings scattered across the overworld. These are full expeditions, not quick loot runs.',
      },
      {
        heading: 'Villages and Towns & Towers',
        body: "Villages are more biome-aware and architecturally varied. Towns & Towers adds outposts, bridges, and other structures that make the world feel more populated.",
      },
      {
        heading: 'Prepare before going in',
        body: 'Bring food, beds, gear, and inventory space. Many of these structures take a full play session to clear. Mark them on JourneyMap and connect them to your Waystones network after clearing.',
      },
    ],
    quickTips: [
      "Big structures are trips, not pit stops — pack accordingly.",
      "Use Explorer's Compass to target specific structure types.",
      "Mark and connect cleared structures into your travel network.",
    ],
  },

  // ── Building ──────────────────────────────────────────────────────────────────
  {
    id: 'building-mods',
    title: 'Building Mods',
    mods: ['Handcrafted', 'Another Furniture', "Macaw's Bridges", "Macaw's Doors", "Macaw's Lights & Lamps", "Macaw's Fences & Walls", "Macaw's Windows", "Macaw's Roofs", "Let's Do: Beach Party", "Let's Do: Farm & Charm", "Klee's Slabs", 'Master Cutter', 'Moving Elevators'],
    category: 'Building',
    tagline: 'A deep decoration stack that makes bases easier to use, not just prettier.',
    priority: 'Niche',
    searchTerms: ['building', 'decoration', 'furniture', 'roofs', 'windows', 'doors', 'bridges', 'slabs', 'elevators'],
    sections: [
      {
        heading: "Macaw's series",
        body: "Macaw's adds detailed roofs, windows, doors, fences, bridges, and lights. These are the fastest way to make a build look architectural — Macaw's Roofs and Windows in particular do a huge amount of visual work quickly.",
      },
      {
        heading: 'Furniture mods',
        body: 'Handcrafted and Another Furniture add a wide variety of placeable furniture — chairs, tables, shelves, curtains, mirrors, and storage-adjacent decorative pieces. Use them to make rooms feel inhabited rather than empty.',
      },
      {
        heading: "Let's Do series",
        body: "Let's Do: Beach Party and Farm & Charm add thematic block sets for coastal and agricultural builds. Good if you're building a farm house, coastal retreat, or market area.",
      },
      {
        heading: 'Utility building mods',
        body: "Klee's Slabs extends vanilla slab varieties. Master Cutter gives you a stone-cutter equivalent for more block types. Moving Elevators adds functional vertical transport between floors.",
      },
    ],
    quickTips: [
      "Use decoration to signal room purpose — it makes a base easier to navigate.",
      "Pick one style direction at a time instead of mixing everything.",
      "A readable base layout saves real time every play session.",
    ],
  },
  {
    id: 'supplementaries',
    title: 'Supplementaries',
    mods: ['Supplementaries', 'Visual Workbench'],
    category: 'Building',
    tagline: 'Functional decoration — signs, displays, ropes, jars, and many small utility blocks.',
    priority: 'Niche',
    searchTerms: ['supplementaries', 'sign', 'jar', 'rope', 'visual workbench', 'decoration utility', 'display'],
    sections: [
      {
        heading: 'What it adds',
        body: 'Supplementaries is a large utility decoration mod — flagpoles, notice boards, jars that display items, ropes, directional signs, candles, and many small blocks that make a base feel more alive and organized.',
      },
      {
        heading: 'Visual Workbench',
        body: 'Visual Workbench makes crafting stations display the items currently in them, even when you close the GUI. Place ingredients in a crafting table, close it, and the ingredients stay visible on the block.',
      },
      {
        heading: 'Practical use',
        body: "Use Supplementaries blocks to label areas, display important items, or add functional detail to workshop and storage rooms. It's especially good for making a base readable to other players on the server.",
      },
    ],
    quickTips: [
      "Supplementaries blocks are great for labeling storage rooms without signs.",
      "Use jars to display rare items or mob drops decoratively.",
      "Visual Workbench is especially useful in shared crafting areas.",
    ],
  },

  // ── Mobs & Villagers ──────────────────────────────────────────────────────────
  {
    id: 'villager-mods',
    title: 'Villager & Trading Mods',
    mods: ['Goblin Traders', 'Villager Trading Plus', 'Trade Cycling', 'Animal Feeding Trough', 'Friends & Foes'],
    category: 'Mobs',
    tagline: 'Trading and mob interactions are smoother and less grind-heavy than vanilla.',
    priority: 'Useful',
    searchTerms: ['villagers', 'trading', 'goblin traders', 'trade cycling', 'animal trough', 'friends and foes'],
    sections: [
      {
        heading: 'Villager Trading Plus & Trade Cycling',
        body: 'Villager Trading Plus improves the trade interface and makes it easier to manage large numbers of villagers. Trade Cycling lets you reset bad trades more fairly — less reliance on RNG for useful trades.',
      },
      {
        heading: 'Goblin Traders',
        body: "Goblin Traders are wandering merchants that appear underground and in the Nether. They offer unusual trades not available from villagers — worth checking when you encounter one.",
      },
      {
        heading: 'Friends & Foes',
        body: 'Friends & Foes adds mob variants that bring more personality and occasionally utility to the world — including mob types that interact with the player in interesting ways.',
      },
      {
        heading: 'Animal Feeding Trough',
        body: 'Animal Feeding Trough lets you automate animal feeding for breeding without standing there dropping items one by one. Essential for any farm setup.',
      },
    ],
    quickTips: [
      "Villages are long-term assets — protect and invest in them.",
      "Trade Cycling reduces the pain of bad villager RNG.",
      "Goblin Traders are worth checking instead of dismissing as gimmicks.",
    ],
  },

  // ── Technology ────────────────────────────────────────────────────────────────
  {
    id: 'oritech',
    title: 'Oritech',
    mods: ['Oritech'],
    category: 'Technology',
    tagline: 'Full automation and machine processing when manual workflows stop being enough.',
    priority: 'Niche',
    searchTerms: ['oritech', 'machines', 'automation', 'ore processing', 'energy', 'tech mod'],
    sections: [
      {
        heading: 'What it adds',
        body: 'Oritech is a full technology mod — machines, power, ore processing, and automation infrastructure. It is the path you take when convenience tools like backpacks and storage networks are not enough and you want actual production infrastructure.',
      },
      {
        heading: 'When to start',
        body: "Don't force yourself into it on day one. Oritech becomes relevant when your base goals include repeat processing, better throughput, or machine-driven workflows. Let a real need pull you in.",
      },
      {
        heading: 'How to learn it',
        body: 'Use EMI to understand machine recipes and processing chains. Start with one machine chain and build from there — trying to understand the whole mod at once is overwhelming.',
      },
    ],
    quickTips: [
      "Start Oritech when manual processing becomes genuinely repetitive.",
      "Use EMI to trace machine chains before building anything.",
      "Automation is much easier once your storage is already organized.",
    ],
  },

  // ── Creative ──────────────────────────────────────────────────────────────────
  {
    id: 'exposure',
    title: 'Exposure',
    mods: ['Exposure'],
    category: 'Creative',
    tagline: 'In-game photography with film, development, and printable photos.',
    priority: 'Niche',
    searchTerms: ['camera', 'photo', 'photography', 'film', 'darkroom', 'exposure', 'prints'],
    sections: [
      {
        heading: 'What it does',
        body: 'Exposure adds cameras, film, development, and printing as an in-game workflow. It treats photography as a process — shoot with a camera, develop the film, print physical photographs that exist as items in the world.',
      },
      {
        heading: 'How to approach it',
        body: 'Treat it as a hobby system. Use it to document builds, server memories, or exploration moments in a way that creates actual in-game objects rather than external screenshots.',
      },
      {
        heading: 'Why it fits this server',
        body: 'A server with good worldgen, decorative building mods, and shared landmarks benefits from a way to turn moments into physical in-game records. Display photos in your base.',
      },
    ],
    quickTips: [
      "Document your best builds and exploration finds — you'll forget them otherwise.",
      "Treat the development process as part of the experience, not a barrier.",
      "Display printed photos in your base to make it feel lived in.",
    ],
  },
]

const PLAYER_MOD_NAMES = new Set(PLAYER_MODS.map((mod) => mod.name))

for (const guide of MOD_GUIDES) {
  for (const modName of guide.mods) {
    if (!PLAYER_MOD_NAMES.has(modName)) {
      throw new Error(`Mod guide "${guide.id}" references unknown mod "${modName}"`)
    }
  }
}
