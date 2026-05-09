import { createFileRoute, Link } from "@tanstack/react-router";
import type { Category } from "../data/mods";
import { CATEGORIES, CATEGORY_ORDER, PLAYER_MODS } from "../data/mods";

export const Route = createFileRoute("/")({ component: Home });

const CATEGORY_ACCENT: Record<Category, string> = {
	worldgen: "#34d399",
	structures: "#fbbf24",
	qol: "#60a5fa",
	storage: "#a78bfa",
	combat: "#f87171",
	decoration: "#fb923c",
	mobs: "#22d3ee",
	performance: "#facc15",
	library: "#6b7280",
};

const START_ACTIONS = [
	{
		kicker: "Install",
		title: "I need to set up the pack",
		body: "Start here if you do not have the Prism instance ready yet.",
		to: "/setup",
		cta: "Setup guide",
		primary: true,
	},
	{
		kicker: "Update",
		title: "I need the mods",
		body: "Download the full bundle, only-new-mods bundle, or Windows updater.",
		to: "/download",
		cta: "Downloads",
	},
	{
		kicker: "Fix",
		title: "Something is broken",
		body: "Crashes, wrong mod list, AppData folders, Windows script issues, lag.",
		to: "/troubleshooting",
		cta: "Troubleshooting",
	},
	{
		kicker: "Play",
		title: "I just joined",
		body: "Use the first-session checklist to avoid missing the important basics.",
		to: "/checklist",
		cta: "Checklist",
	},
	{
		kicker: "Learn",
		title: "I want to understand the server",
		body: "Beginner-friendly guide for vanilla basics and the biggest modded changes.",
		to: "/guide",
		cta: "Player guide",
	},
	{
		kicker: "Reference",
		title: "I want info about a mod",
		body: "Search by mod name or problem: waystones, recipes, backpack, storage.",
		to: "/directed-guides",
		cta: "Directed guides",
	},
] as const;

function Stat({ value, label }: { value: string | number; label: string }) {
	return (
		<div>
			<p
				style={{
					margin: 0,
					fontSize: "2rem",
					fontWeight: 700,
					color: "var(--text)",
					lineHeight: 1,
				}}
			>
				{value}
			</p>
			<p
				style={{
					margin: "0.25rem 0 0",
					fontSize: "0.8rem",
					color: "var(--text-muted)",
					fontWeight: 500,
				}}
			>
				{label}
			</p>
		</div>
	);
}

function Home() {
	const playerCategories = CATEGORY_ORDER.filter((c) => c !== "library");

	return (
		<main
			className="page-wrap"
			style={{ paddingTop: "4rem", paddingBottom: "5rem" }}
		>
			{/* ── Hero ─────────────────────────────────────────────────────── */}
			<section
				className="fade-up"
				style={{ maxWidth: 720, marginBottom: "2.5rem" }}
			>
				<p className="label" style={{ marginBottom: "1rem" }}>
					Minecraft 1.21.1 · Fabric 0.19.1
				</p>

				<h1
					className="display"
					style={{
						fontSize: "clamp(2.4rem, 6vw, 4rem)",
						marginBottom: "1.25rem",
					}}
				>
					TSW Minecraft
					<br />
					<span style={{ color: "var(--accent)" }}>Fabric Server</span>
				</h1>

				<p
					style={{
						fontSize: "1.05rem",
						color: "var(--text-soft)",
						lineHeight: 1.7,
						maxWidth: 520,
						marginBottom: "2rem",
					}}
				>
					Install the pack, update your mods, fix common issues, and learn what
					to do once you join.
				</p>

				<div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
					<Link to="/setup" className="btn-primary">
						Start Setup
					</Link>
					<Link to="/download" className="btn-ghost">
						Download Mods
					</Link>
					<Link to="/troubleshooting" className="btn-ghost">
						Something Broken?
					</Link>
				</div>
			</section>

			{/* ── Start hub ─────────────────────────────────────────────────── */}
			<section style={{ marginBottom: "4rem" }}>
				<p className="label" style={{ marginBottom: "0.5rem" }}>
					Start here
				</p>
				<h2
					className="display"
					style={{ fontSize: "1.6rem", marginBottom: "1.4rem" }}
				>
					What are you trying to do?
				</h2>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
						gap: "0.85rem",
					}}
				>
					{START_ACTIONS.map((action) => (
						<Link
							key={action.to}
							to={action.to}
							style={{ textDecoration: "none" }}
						>
							<div
								className="card"
								style={{
									height: "100%",
									padding: "1.2rem",
									borderColor: action.primary
										? "var(--accent-ring)"
										: "var(--border)",
									background: action.primary
										? "var(--accent-dim)"
										: "var(--bg-card)",
								}}
							>
								<p
									className="label"
									style={{
										margin: "0 0 0.45rem",
										color: action.primary
											? "var(--accent)"
											: "var(--text-muted)",
									}}
								>
									{action.kicker}
								</p>
								<p
									style={{
										margin: "0 0 0.4rem",
										fontWeight: 800,
										fontSize: "0.98rem",
										color: "var(--text)",
									}}
								>
									{action.title}
								</p>
								<p
									style={{
										margin: "0 0 0.85rem",
										fontSize: "0.82rem",
										color: "var(--text-soft)",
										lineHeight: 1.55,
									}}
								>
									{action.body}
								</p>
								<p
									style={{
										margin: 0,
										fontSize: "0.78rem",
										fontWeight: 800,
										color: "var(--accent)",
									}}
								>
									{action.cta} →
								</p>
							</div>
						</Link>
					))}
				</div>
			</section>

			{/* ── Stats ────────────────────────────────────────────────────── */}
			<section
				style={{
					display: "flex",
					flexWrap: "wrap",
					gap: "2.5rem",
					padding: "2rem",
					background: "var(--bg-card)",
					border: "1px solid var(--border)",
					borderRadius: "1rem",
					marginBottom: "4rem",
				}}
			>
				<Stat value={PLAYER_MODS.length} label="Player-facing mods" />
				<div
					style={{
						width: 1,
						background: "var(--border)",
						alignSelf: "stretch",
					}}
				/>
				<Stat value={playerCategories.length} label="Categories" />
				<div
					style={{
						width: 1,
						background: "var(--border)",
						alignSelf: "stretch",
					}}
				/>
				<Stat value="1.21.1" label="Minecraft version" />
				<div
					style={{
						width: 1,
						background: "var(--border)",
						alignSelf: "stretch",
					}}
				/>
				<Stat value="Fabric" label="Mod loader" />
			</section>

			{/* ── Category grid ────────────────────────────────────────────── */}
			<section style={{ marginBottom: "4rem" }}>
				<p className="label" style={{ marginBottom: "0.5rem" }}>
					Mod reference
				</p>
				<h2
					className="display"
					style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}
				>
					Browse the pack by category
				</h2>

				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
						gap: "0.75rem",
					}}
				>
					{playerCategories.map((cat) => {
						const meta = CATEGORIES[cat];
						const count = PLAYER_MODS.filter((m) => m.category === cat).length;
						const accent = CATEGORY_ACCENT[cat];
						return (
							<Link
								key={cat}
								to="/mods"
								search={{ category: cat }}
								style={{ textDecoration: "none" }}
							>
								<div
									className="card"
									style={{
										padding: "1.25rem",
										cursor: "pointer",
										height: "100%",
									}}
								>
									<span
										style={{
											fontSize: "1.5rem",
											lineHeight: 1,
											display: "block",
											marginBottom: "0.75rem",
										}}
									>
										{meta.emoji}
									</span>
									<p
										style={{
											margin: 0,
											fontWeight: 700,
											fontSize: "0.875rem",
											color: "var(--text)",
										}}
									>
										{meta.label}
									</p>
									<p
										style={{
											margin: "0.25rem 0 0.75rem",
											fontSize: "0.75rem",
											color: "var(--text-muted)",
											lineHeight: 1.5,
										}}
									>
										{meta.description}
									</p>
									<p
										style={{
											margin: 0,
											fontSize: "0.75rem",
											fontWeight: 700,
											color: accent,
										}}
									>
										{count} mod{count !== 1 ? "s" : ""} →
									</p>
								</div>
							</Link>
						);
					})}
				</div>
			</section>

			{/* ── Reference callouts ───────────────────────────────────────── */}
			<section
				style={{
					background: "var(--accent-dim)",
					border: "1px solid var(--accent-ring)",
					borderRadius: "1rem",
					padding: "2rem",
					display: "flex",
					flexWrap: "wrap",
					alignItems: "center",
					justifyContent: "space-between",
					gap: "1.5rem",
				}}
			>
				<div style={{ maxWidth: 480 }}>
					<p
						style={{
							margin: "0 0 0.5rem",
							fontWeight: 700,
							color: "var(--text)",
						}}
					>
						Need a gentler walkthrough?
					</p>
					<p
						style={{
							margin: 0,
							fontSize: "0.875rem",
							color: "var(--text-soft)",
							lineHeight: 1.6,
						}}
					>
						The player guide explains the Minecraft basics, what changed on this
						server, and the first mods that matter once you are in-game.
					</p>
				</div>
				<Link to="/guide" className="btn-primary" style={{ flexShrink: 0 }}>
					Read the Guide →
				</Link>
			</section>

			<section
				style={{
					marginTop: "1rem",
					background: "var(--bg-card)",
					border: "1px solid var(--border)",
					borderRadius: "1rem",
					padding: "2rem",
					display: "flex",
					flexWrap: "wrap",
					alignItems: "center",
					justifyContent: "space-between",
					gap: "1.5rem",
				}}
			>
				<div style={{ maxWidth: 520 }}>
					<p
						style={{
							margin: "0 0 0.5rem",
							fontWeight: 700,
							color: "var(--text)",
						}}
					>
						One guide per mod — click to read.
					</p>
					<p
						style={{
							margin: 0,
							fontSize: "0.875rem",
							color: "var(--text-soft)",
							lineHeight: 1.6,
						}}
					>
						Small cards for every mod you need to know: Waystones, JourneyMap,
						EMI, backpacks, combat, storage, and more. Search by name or
						problem, click a card to open the guide.
					</p>
				</div>
				<Link
					to="/directed-guides"
					className="btn-ghost"
					style={{ flexShrink: 0 }}
				>
					Open Directed Guides →
				</Link>
			</section>
		</main>
	);
}
