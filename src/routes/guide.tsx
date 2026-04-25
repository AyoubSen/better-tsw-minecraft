import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/guide")({ component: GuidePage });

/* ── Small reusable pieces ────────────────────────────────────────────── */

function Divider() {
	return (
		<div style={{ borderTop: "1px solid var(--border)", margin: "3.5rem 0" }} />
	);
}

function Step({
	n,
	title,
	children,
}: {
	n: number;
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
			<div
				style={{
					width: 32,
					height: 32,
					borderRadius: "50%",
					background: "var(--accent-dim)",
					border: "1px solid var(--accent-ring)",
					color: "var(--accent)",
					fontWeight: 700,
					fontSize: "0.8rem",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexShrink: 0,
					marginTop: 2,
				}}
			>
				{n}
			</div>
			<div style={{ flex: 1 }}>
				<p
					style={{
						margin: "0 0 0.35rem",
						fontWeight: 700,
						fontSize: "0.9rem",
						color: "var(--text)",
					}}
				>
					{title}
				</p>
				<p
					style={{
						margin: 0,
						fontSize: "0.83rem",
						color: "var(--text-soft)",
						lineHeight: 1.65,
					}}
				>
					{children}
				</p>
			</div>
		</div>
	);
}

function Callout({ emoji, text }: { emoji: string; text: string }) {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "flex-start",
				gap: "0.75rem",
				padding: "0.875rem 1rem",
				background: "var(--accent-dim)",
				border: "1px solid var(--accent-ring)",
				borderRadius: "0.625rem",
			}}
		>
			<span style={{ fontSize: "1rem", flexShrink: 0 }}>{emoji}</span>
			<p
				style={{
					margin: 0,
					fontSize: "0.82rem",
					color: "var(--text-soft)",
					lineHeight: 1.6,
				}}
			>
				{text}
			</p>
		</div>
	);
}

function TipRow({ icon, text }: { icon: string; text: string }) {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "flex-start",
				gap: "0.75rem",
				padding: "0.8rem 1.1rem",
			}}
		>
			<span style={{ fontSize: "0.95rem", flexShrink: 0, marginTop: 1 }}>
				{icon}
			</span>
			<p
				style={{
					margin: 0,
					fontSize: "0.82rem",
					color: "var(--text-soft)",
					lineHeight: 1.6,
				}}
			>
				{text}
			</p>
		</div>
	);
}

/* ── Track selector ───────────────────────────────────────────────────── */

type Track = "new" | "modded";

function TrackButton({
	active,
	onClick,
	emoji,
	title,
	sub,
}: {
	active: boolean;
	onClick: () => void;
	emoji: string;
	title: string;
	sub: string;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			style={{
				all: "unset",
				flex: 1,
				padding: "1.25rem 1.5rem",
				borderRadius: "0.75rem",
				border: "1px solid",
				borderColor: active ? "var(--accent)" : "var(--border)",
				background: active ? "var(--accent-dim)" : "var(--bg-card)",
				cursor: "pointer",
				transition: "all 150ms ease",
				boxSizing: "border-box",
			}}
		>
			<p style={{ margin: "0 0 0.3rem", fontSize: "1.3rem", lineHeight: 1 }}>
				{emoji}
			</p>
			<p
				style={{
					margin: "0 0 0.2rem",
					fontWeight: 700,
					fontSize: "0.875rem",
					color: active ? "var(--accent)" : "var(--text)",
				}}
			>
				{title}
			</p>
			<p style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-muted)" }}>
				{sub}
			</p>
		</button>
	);
}

/* ── Main page ────────────────────────────────────────────────────────── */

function GuidePage() {
	const [track, setTrack] = useState<Track>("new");

	return (
		<main
			className="page-wrap"
			style={{ paddingTop: "3rem", paddingBottom: "5rem", maxWidth: 720 }}
		>
			{/* Header */}
			<div className="fade-up" style={{ marginBottom: "2.5rem" }}>
				<p className="label" style={{ marginBottom: "0.5rem" }}>
					Player guide
				</p>
				<h1
					className="display"
					style={{
						fontSize: "clamp(1.8rem, 5vw, 2.6rem)",
						marginBottom: "0.75rem",
					}}
				>
					Getting started on TSW Fabric
				</h1>
				<p
					style={{
						margin: 0,
						fontSize: "0.95rem",
						color: "var(--text-soft)",
						lineHeight: 1.7,
					}}
				>
					Pick the track that fits you. You can always switch.
				</p>
			</div>

			{/* Track selector */}
			<div
				style={{
					display: "flex",
					gap: "0.75rem",
					marginBottom: "2.5rem",
					flexWrap: "wrap",
				}}
			>
				<TrackButton
					active={track === "new"}
					onClick={() => setTrack("new")}
					emoji="🌱"
					title="I'm new to Minecraft"
					sub="Never played before — start here"
				/>
				<TrackButton
					active={track === "modded"}
					onClick={() => setTrack("modded")}
					emoji="🎮"
					title="I know Minecraft"
					sub="Skipping to the mod-specific stuff"
				/>
			</div>

			{/* ── TRACK A: New to Minecraft ────────────────────────────────── */}
			{track === "new" && (
				<div>
					{/* What is Minecraft */}
					<section style={{ marginBottom: "2.5rem" }}>
						<p className="label" style={{ marginBottom: "0.75rem" }}>
							First things first
						</p>
						<h2
							className="display"
							style={{ fontSize: "1.4rem", marginBottom: "1rem" }}
						>
							What is Minecraft?
						</h2>
						<div
							style={{
								padding: "1.5rem",
								background: "var(--bg-card)",
								border: "1px solid var(--border)",
								borderRadius: "1rem",
								marginBottom: "1rem",
							}}
						>
							<p
								style={{
									margin: "0 0 0.875rem",
									fontSize: "0.875rem",
									color: "var(--text-soft)",
									lineHeight: 1.75,
								}}
							>
								Minecraft is an open-world survival game built out of blocks.
								There's no single goal — you gather materials, build shelters,
								craft tools, explore the world, and fight enemies at your own
								pace.
							</p>
							<p
								style={{
									margin: 0,
									fontSize: "0.875rem",
									color: "var(--text-soft)",
									lineHeight: 1.75,
								}}
							>
								The world is randomly generated and effectively endless.
								Everything is made of blocks you can place and break. Days cycle
								every ~10 minutes. At night, hostile mobs spawn in the dark.
							</p>
						</div>
						<Callout
							emoji="💡"
							text="The controls are WASD to move, left-click to break blocks, right-click to place or use items. Press E to open your inventory. Press Escape to pause."
						/>
					</section>

					<Divider />

					{/* Day 1 survival */}
					<section style={{ marginBottom: "2.5rem" }}>
						<p className="label" style={{ marginBottom: "0.75rem" }}>
							Your first 10 minutes
						</p>
						<h2
							className="display"
							style={{ fontSize: "1.4rem", marginBottom: "1.25rem" }}
						>
							What to do when you spawn
						</h2>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "1.25rem",
							}}
						>
							<Step n={1} title="Punch a tree to get wood">
								Hold left-click on a log block until it breaks. Grab the wood
								that drops. Do this about 10–15 times. This is literally how the
								game starts for everyone.
							</Step>
							<Step
								n={2}
								title="Open your inventory (E) and craft a Crafting Table"
							>
								In the small 2×2 grid at the top right of your inventory, fill
								all 4 slots with planks. Place the Crafting Table on the ground
								and right-click it — this gives you a bigger crafting grid to
								work with.
							</Step>
							<Step
								n={3}
								title="Make basic tools in order: Wooden → Stone → Iron"
							>
								Craft a wooden pickaxe first, mine stone, then make stone tools.
								Stone tools break blocks faster and last longer. Mine iron ore
								underground and smelt it in a Furnace to make iron tools — these
								are your first real goal.
							</Step>
							<Step n={4} title="Build a shelter before your first night">
								Night falls after about 10 minutes. Skeletons, zombies, and
								creepers spawn in the dark and will attack you. Even a dirt box
								is fine for your first night — just get inside before dark and
								wait it out.
							</Step>
							<Step n={5} title="Eat food to stay alive">
								You have a hunger bar (the chicken legs, top right). If it
								empties, you start losing health. Eat any food you find — meat
								from animals, bread from wheat, apples from trees. Cooked food
								fills you up much more than raw.
							</Step>
						</div>
					</section>

					<Divider />

					{/* Key things */}
					<section style={{ marginBottom: "2.5rem" }}>
						<p className="label" style={{ marginBottom: "0.75rem" }}>
							Good to know
						</p>
						<h2
							className="display"
							style={{ fontSize: "1.4rem", marginBottom: "1.25rem" }}
						>
							Things vanilla Minecraft doesn't tell you
						</h2>
						<div
							style={{
								background: "var(--bg-card)",
								border: "1px solid var(--border)",
								borderRadius: "1rem",
								overflow: "hidden",
							}}
						>
							{[
								[
									"🌙",
									"Night doesn't last forever — wait it out in your shelter, then continue during the day.",
								],
								[
									"💀",
									"Dying drops all your items on the ground for 5 minutes. On this server a gravestone appears, so your stuff is safe — don't panic.",
								],
								[
									"⛏️",
									"Coal is the most important early material — you use it to make torches and smelt ore. Mine every black-speckled stone you see.",
								],
								[
									"🛏️",
									"Sleeping in a bed skips night AND sets your spawn point. Always sleep in a bed when you find one.",
								],
								[
									"🗺️",
									"You spawn at world coordinates 0,0. Your house is somewhere relative to that. Press F3 to see your exact coordinates anytime.",
								],
								[
									"🐄",
									"Animals (cows, chickens, sheep, pigs) are your main food source. They respawn slowly, so set up a pen with 2+ of each animal to breed more.",
								],
							].map(([icon, text], i) => (
								<div
									key={text}
									style={{
										borderTop: i === 0 ? "none" : "1px solid var(--border)",
									}}
								>
									<TipRow icon={icon} text={text} />
								</div>
							))}
						</div>
					</section>

					<Divider />

					{/* The broad goals */}
					<section style={{ marginBottom: "2.5rem" }}>
						<p className="label" style={{ marginBottom: "0.75rem" }}>
							The bigger picture
						</p>
						<h2
							className="display"
							style={{ fontSize: "1.4rem", marginBottom: "1rem" }}
						>
							What's the actual goal?
						</h2>
						<p
							style={{
								margin: "0 0 1.25rem",
								fontSize: "0.875rem",
								color: "var(--text-soft)",
								lineHeight: 1.7,
							}}
						>
							Minecraft has a loose storyline that most players follow over
							time. You're not forced to — but it gives you a direction if you
							want one.
						</p>
						<div
							style={{
								display: "grid",
								gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
								gap: "0.625rem",
							}}
						>
							{[
								{
									step: "1",
									label: "Survive",
									desc: "Get wood, build shelter, make iron gear",
									color: "#34d399",
								},
								{
									step: "2",
									label: "Explore",
									desc: "Find resources, visit villages, explore caves",
									color: "#60a5fa",
								},
								{
									step: "3",
									label: "The Nether",
									desc: "Build a Nether portal from Obsidian, survive a new dimension",
									color: "#f87171",
								},
								{
									step: "4",
									label: "The End",
									desc: "Find a Stronghold, reach the End, fight the Ender Dragon",
									color: "#a78bfa",
								},
							].map(({ step, label, desc, color }) => (
								<div
									key={step}
									style={{
										padding: "1rem",
										background: "var(--bg-card)",
										border: "1px solid var(--border)",
										borderRadius: "0.75rem",
									}}
								>
									<p
										style={{
											margin: "0 0 0.3rem",
											fontSize: "0.65rem",
											fontWeight: 700,
											letterSpacing: "0.08em",
											textTransform: "uppercase",
											color,
										}}
									>
										Stage {step}
									</p>
									<p
										style={{
											margin: "0 0 0.3rem",
											fontWeight: 700,
											fontSize: "0.875rem",
											color: "var(--text)",
										}}
									>
										{label}
									</p>
									<p
										style={{
											margin: 0,
											fontSize: "0.75rem",
											color: "var(--text-muted)",
											lineHeight: 1.5,
										}}
									>
										{desc}
									</p>
								</div>
							))}
						</div>
					</section>

					<Divider />

					{/* Transition to mods */}
					<section
						style={{
							padding: "1.5rem",
							background: "var(--accent-dim)",
							border: "1px solid var(--accent-ring)",
							borderRadius: "1rem",
							marginBottom: "2rem",
						}}
					>
						<p
							style={{
								margin: "0 0 0.5rem",
								fontWeight: 700,
								color: "var(--text)",
							}}
						>
							Ready for the mod stuff?
						</p>
						<p
							style={{
								margin: "0 0 1rem",
								fontSize: "0.83rem",
								color: "var(--text-soft)",
								lineHeight: 1.6,
							}}
						>
							Once you're comfortable with the basics above, switch to the other
							track to see what's different on this server specifically.
						</p>
						<button
							type="button"
							onClick={() => setTrack("modded")}
							className="btn-primary"
							style={{ fontSize: "0.83rem", padding: "0.5rem 1rem" }}
						>
							Switch to "I know Minecraft" →
						</button>
					</section>
				</div>
			)}

			{/* ── TRACK B: Knows Minecraft ─────────────────────────────────── */}
			{track === "modded" && (
				<div>
					{/* What's different */}
					<section style={{ marginBottom: "2.5rem" }}>
						<p className="label" style={{ marginBottom: "0.75rem" }}>
							What changed
						</p>
						<h2
							className="display"
							style={{ fontSize: "1.4rem", marginBottom: "1.25rem" }}
						>
							What's different on this server
						</h2>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "0.625rem",
							}}
						>
							{[
								[
									"🌍",
									"World gen",
									"Completely overhauled by Terralith + Tectonic + Regions Unexplored. 150+ new biomes, dramatic terrain.",
								],
								[
									"🏰",
									"All structures",
									"Every vanilla structure (dungeons, temples, strongholds) has been replaced by YUNG's redesigns. Much bigger, better loot, real traps.",
								],
								[
									"🌅",
									"Two extra dimensions",
									"The Aether (sky realm, Glowstone portal) and Eternal Starlight. Both have their own mobs, ores, and bosses.",
								],
								[
									"⚔️",
									"Combat has a dodge roll",
									"Bind a key for Combat Roll — you get invincibility frames during the roll. Changes fights significantly.",
								],
								[
									"📦",
									"Loot chests are personal",
									"Every dungeon chest gives each player their own loot (Lootr). No racing your friends.",
								],
								[
									"🪦",
									"Death is safe",
									"A gravestone spawns with all your items. Take your time getting back to it.",
								],
							].map(([icon, title, desc]) => (
								<div
									key={title}
									style={{
										display: "flex",
										alignItems: "flex-start",
										gap: "0.875rem",
										padding: "1rem 1.1rem",
										background: "var(--bg-card)",
										border: "1px solid var(--border)",
										borderRadius: "0.75rem",
									}}
								>
									<span
										style={{ fontSize: "1.1rem", flexShrink: 0, marginTop: 1 }}
									>
										{icon}
									</span>
									<div>
										<p
											style={{
												margin: "0 0 0.2rem",
												fontWeight: 700,
												fontSize: "0.85rem",
												color: "var(--text)",
											}}
										>
											{title}
										</p>
										<p
											style={{
												margin: 0,
												fontSize: "0.8rem",
												color: "var(--text-soft)",
												lineHeight: 1.6,
											}}
										>
											{desc}
										</p>
									</div>
								</div>
							))}
						</div>
					</section>

					<Divider />

					{/* 5 mods to know */}
					<section style={{ marginBottom: "2.5rem" }}>
						<p className="label" style={{ marginBottom: "0.75rem" }}>
							Mods to know first
						</p>
						<h2
							className="display"
							style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}
						>
							5 that will immediately matter
						</h2>
						<p
							style={{
								margin: "0 0 1.25rem",
								fontSize: "0.83rem",
								color: "var(--text-muted)",
							}}
						>
							The pack has 110+ mods. These five affect you from day one.
						</p>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "1.25rem",
							}}
						>
							<Step n={1} title="JourneyMap — real-time minimap">
								Press J for the full map. Right-click to create waypoints. Set a
								waypoint for your base immediately.
							</Step>
							<Step n={2} title="Waystones — fast travel">
								Activate the stone pillar in villages. Place one at your base.
								Once you have two, you can teleport between them.
							</Step>
							<Step n={3} title="EMI — recipe viewer">
								Hover any item, press R for its recipe, U to see what it makes.
								Works for all 110 mods. Essential.
							</Step>
							<Step n={4} title="Sophisticated Backpacks — extra inventory">
								Craft a backpack early (leather + wool + chest). Wear it or
								right-click to access. Upgradeable with auto-pickup, smelting,
								sorting modules later.
							</Step>
							<Step n={5} title="Jade — item/block identifier">
								Look at anything and a tooltip tells you exactly what it is and
								which mod added it. Always-on, no setup required.
							</Step>
						</div>
					</section>

					<Divider />

					{/* Quick tips */}
					<section style={{ marginBottom: "2.5rem" }}>
						<p className="label" style={{ marginBottom: "0.75rem" }}>
							Quick tips
						</p>
						<h2
							className="display"
							style={{ fontSize: "1.4rem", marginBottom: "1.25rem" }}
						>
							Things you'll be glad you knew
						</h2>
						<div
							style={{
								background: "var(--bg-card)",
								border: "1px solid var(--border)",
								borderRadius: "1rem",
								overflow: "hidden",
							}}
						>
							{[
								[
									"⛏️",
									"Vein Miner: hold ` (tilde) while mining ore to break the whole vein at once.",
								],
								[
									"🌳",
									"Falling Tree: chop the bottom log, the whole tree drops.",
								],
								[
									"🌾",
									"Right-click harvest: right-click grown crops to harvest and auto-replant.",
								],
								[
									"🔮",
									'Anvil has no "Too Expensive!" cap — re-enchant and repair freely.',
								],
								[
									"👜",
									"Check your inventory for extra accessory slots — Artifact items go there, not armour slots.",
								],
								[
									"🎯",
									"Press C to zoom (Ok Zoomer). Good for spotting structures.",
								],
								[
									"🧭",
									"Explorer's Compass: craft one and right-click to navigate to any structure type.",
								],
							].map(([icon, text], i) => (
								<div
									key={text}
									style={{
										borderTop: i === 0 ? "none" : "1px solid var(--border)",
									}}
								>
									<TipRow icon={icon} text={text} />
								</div>
							))}
						</div>
					</section>

					<Divider />

					{/* Progression */}
					<section style={{ marginBottom: "2.5rem" }}>
						<p className="label" style={{ marginBottom: "0.75rem" }}>
							Rough progression
						</p>
						<h2
							className="display"
							style={{ fontSize: "1.4rem", marginBottom: "1.25rem" }}
						>
							How the modpack unfolds
						</h2>
						<div
							style={{
								background: "var(--bg-card)",
								border: "1px solid var(--border)",
								borderRadius: "1rem",
								overflow: "hidden",
							}}
						>
							{[
								{
									color: "#34d399",
									phase: "Early",
									items:
										"Backpack, Waystone at base, basic farm, explore nearby structures",
								},
								{
									color: "#fbbf24",
									phase: "Mid-game",
									items:
										"Tom's Storage network, Nether run, upgrade backpack, Combat Roll fights",
								},
								{
									color: "#a78bfa",
									phase: "Late-game",
									items:
										"Aether dimension, Artifact accessories, Advanced Netherite, End bosses",
								},
								{
									color: "#60a5fa",
									phase: "Whenever",
									items:
										"Exposure camera, Macaw's Roofs for building, Iris shaders, Freecam screenshots",
								},
							].map(({ color, phase, items }, i) => (
								<div
									key={phase}
									style={{
										display: "flex",
										alignItems: "flex-start",
										gap: "1rem",
										padding: "0.9rem 1.1rem",
										borderTop: i === 0 ? "none" : "1px solid var(--border)",
									}}
								>
									<span
										style={{
											fontSize: "0.65rem",
											fontWeight: 700,
											letterSpacing: "0.06em",
											textTransform: "uppercase",
											color,
											width: 64,
											flexShrink: 0,
											marginTop: 3,
										}}
									>
										{phase}
									</span>
									<p
										style={{
											margin: 0,
											fontSize: "0.82rem",
											color: "var(--text-soft)",
											lineHeight: 1.6,
										}}
									>
										{items}
									</p>
								</div>
							))}
						</div>
					</section>
				</div>
			)}

			{/* Footer CTA — always visible */}
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					alignItems: "center",
					justifyContent: "space-between",
					gap: "1rem",
					padding: "1.25rem 1.5rem",
					background: "var(--bg-card)",
					border: "1px solid var(--border)",
					borderRadius: "0.875rem",
				}}
			>
				<p
					style={{ margin: 0, fontSize: "0.83rem", color: "var(--text-muted)" }}
				>
					See the full list of mods with descriptions for each one.
				</p>
				<Link
					to="/mods"
					className="btn-primary"
					style={{ fontSize: "0.83rem", padding: "0.5rem 1rem" }}
				>
					Browse all mods →
				</Link>
			</div>
		</main>
	);
}
