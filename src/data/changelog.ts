export interface ChangelogEntry {
	date: string; // ISO date e.g. "2026-04-23"
	title: string;
	description?: string;
	added?: { name: string; note?: string }[];
	removed?: { name: string; note?: string }[];
	updated?: { name: string; note?: string }[];
	notes?: string[];
}

export const CHANGELOG: ChangelogEntry[] = [
	{
		date: "2026-05-09",
		title: "New mods bundle",
		description:
			"Added a new batch of building, creature, villager, photography, and server utility mods, plus Cobblemon.",
		added: [
			{
				name: "Companions!",
				note: "Tameable companion creatures with adventure and combat utility",
			},
			{
				name: "More Villagers",
				note: "More villager professions, workstations, and trade variety",
			},
			{
				name: "MrCrayfish's Furniture Mod: Refurbished",
				note: "Modern furniture, appliances, and household decorations",
			},
			{ name: "Knight Lib", note: "Library — required by other mods" },
			{
				name: "Smooth Chunk Save",
				note: "Server performance helper for smoother world saving",
			},
			{
				name: "Structure Essentials",
				note: "Structure generation and locating utility improvements",
			},
			{
				name: "Chisel Refabricated",
				note: "Decorative chisel blocks for more detailed building",
			},
			{
				name: "Critters and Companions",
				note: "Vanilla-style animals and small creatures for the overworld",
			},
			{
				name: "Cobblemon",
				note: "Pokemon-style creatures with catching, teams, and battles",
			},
			{
				name: "Stoneworks",
				note: "More stone variants, slabs, stairs, walls, and building options",
			},
			{ name: "Cryonic Config", note: "Library — required by other mods" },
			{
				name: "Exposure Polaroid",
				note: "Instant camera addon for faster in-game photos",
			},
			{
				name: "DarkSmelting - Smelt Armor and Tools",
				note: "Smelt unwanted gear back into useful materials",
			},
		],
		notes: [
			"Updated the full bundle and only-new-mods bundle download links.",
			"Pack version stayed on 2026-04-23-1.",
		],
	},
	{
		date: "2026-04-23",
		title: "Big content drop",
		description:
			"Added a batch of content, decoration, and performance mods to round out the pack.",
		added: [
			// Content
			{
				name: "When Dungeons Arise",
				note: "Massive hand-built dungeon structures scattered across the world",
			},
			{
				name: "Eternal Starlight",
				note: "New starlit dimension with unique biomes, mobs, and ores",
			},
			{
				name: "Goblin Traders",
				note: "Goblin merchants underground and in the Nether with exclusive trades",
			},
			{
				name: "Advanced Netherite",
				note: "Four new Netherite upgrade tiers beyond vanilla",
			},
			{
				name: "Mythic Upgrades",
				note: "Smithing upgrades that grant unique weapon properties",
			},
			{
				name: "Oritech",
				note: "Tech mod with machines and automation for mid/late game",
			},
			// Decoration
			{
				name: "Supplementaries",
				note: "80+ new decorative and functional blocks",
			},
			{
				name: "Another Furniture",
				note: "Mirrors, curtains, lampshades and more furniture pieces",
			},
			// QoL & inventory
			{
				name: "EMI Enchanting",
				note: "Preview enchantments before spending XP",
			},
			{
				name: "EMI Loot",
				note: "See which chests and mobs drop any item, directly in EMI",
			},
			{
				name: "Recipe Essentials",
				note: "Crafting system improvements and remainder tooltips",
			},
			{
				name: "Catalogue",
				note: "In-game searchable mod list accessible from the main menu",
			},
			{
				name: "Mighty Mail",
				note: "Send items to other players via in-game mailboxes",
			},
			{
				name: "Vanilla Backport",
				note: "Select upcoming Minecraft features available early",
			},
			// Performance
			{
				name: "ModernFix",
				note: "Faster startup, reduced memory use, and various bug fixes",
			},
			{
				name: "Noisium",
				note: "Faster world-gen noise — reduces lag when entering new chunks",
			},
			{
				name: "Alternate Current",
				note: "Optimised redstone engine, identical behaviour to vanilla",
			},
			// Libraries (behind the scenes)
			{ name: "Platform", note: "Library — required by other mods" },
			{ name: "Athena", note: "Library — required by other mods" },
			{ name: "Cupboard", note: "Library — required by other mods" },
			{ name: "Framework", note: "Library — required by other mods" },
			{
				name: "Moonlight Lib",
				note: "Library — required by Supplementaries and others",
			},
		],
	},
];
