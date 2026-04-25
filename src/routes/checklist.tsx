import { createFileRoute, Link } from "@tanstack/react-router";
import { RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export const Route = createFileRoute("/checklist")({
	component: ChecklistPage,
});

const STORAGE_KEY = "tsw_first_session_checklist_v1";

type ChecklistItem = {
	id: string;
	title: string;
	detail: string;
	why?: string;
};

type ChecklistSection = {
	id: string;
	kicker: string;
	title: string;
	items: ChecklistItem[];
};

const SECTIONS: ChecklistSection[] = [
	{
		id: "before-joining",
		kicker: "Before joining",
		title: "Make sure the game will actually launch",
		items: [
			{
				id: "prism-installed",
				title: "Install Prism Launcher and log into your Microsoft account",
				detail:
					"Use Prism instead of the vanilla launcher so your modded instance stays separate and easy to repair.",
				why: "Avoids mixing this server's mods with other Minecraft installs.",
			},
			{
				id: "fabric-instance",
				title: "Create a Minecraft 1.21.1 / Fabric 0.19.1 instance",
				detail:
					"Pick Minecraft 1.21.1 and Fabric Loader 0.19.1 to match the server. If Prism offers a newer loader, use 0.19.1 unless the server pack changes.",
			},
			{
				id: "ram-set",
				title: "Set memory to 4096-6144 MB",
				detail:
					"Use 4096 MB on 8 GB systems, 6144 MB on most PCs, and avoid giving Minecraft more than half your total RAM.",
			},
		],
	},
	{
		id: "first-five",
		kicker: "First 5 minutes",
		title: "Set up the tools that prevent getting lost",
		items: [
			{
				id: "open-map",
				title: "Open JourneyMap and learn the map key",
				detail:
					"Press J for the full map. If it does not open, check your keybinds before wandering away from spawn.",
			},
			{
				id: "base-waypoint",
				title: "Create a waypoint where you plan to settle",
				detail:
					"Right-click on the JourneyMap map or use its waypoint menu. Name it something obvious like Base.",
				why: "This is the fastest fix for the classic first-session problem: losing your home.",
			},
			{
				id: "check-keybinds",
				title: "Check keybinds for map, zoom, roll, backpack, and EMI",
				detail:
					"Resolve red conflicts early. Important keys are JourneyMap, Ok Zoomer, Combat Roll, backpack access, EMI recipe/use lookup.",
			},
		],
	},
	{
		id: "first-base",
		kicker: "First base",
		title: "Make the server feel manageable",
		items: [
			{
				id: "activate-waystone",
				title: "Activate any village waystone you find",
				detail:
					"Right-click waystones when you find them. Place one at your base once you can craft or obtain one.",
				why: "Fast travel matters more in this pack because world generation and structures encourage long trips.",
			},
			{
				id: "craft-backpack",
				title: "Craft a backpack early",
				detail:
					"Sophisticated Backpacks gives you breathing room while mining, looting, or exploring far from home.",
			},
			{
				id: "basic-storage",
				title: "Set up basic labeled storage",
				detail:
					"Start with simple chests or barrels. Move to Tom's Storage once you have enough items that searching chests is annoying.",
			},
		],
	},
	{
		id: "survival-safety",
		kicker: "Safety",
		title: "Avoid panic deaths and lost progress",
		items: [
			{
				id: "understand-graves",
				title: "Understand how graves work",
				detail:
					"When you die, your items are stored in a grave instead of exploding everywhere. Mark the location and go back prepared.",
			},
			{
				id: "food-bed",
				title: "Carry food and set spawn with a bed",
				detail:
					"Food keeps you alive; sleeping sets your respawn point. Do not explore far with neither.",
			},
			{
				id: "coords",
				title: "Know how to read coordinates",
				detail:
					"Press F3 if you need exact coordinates. Screenshots of coordinates are useful when asking friends for help.",
			},
		],
	},
	{
		id: "mod-habits",
		kicker: "Good habits",
		title: "Use the helper mods instead of guessing",
		items: [
			{
				id: "emi-recipes",
				title: "Use EMI for recipes and item uses",
				detail:
					"Hover an item and press R for recipe or U for uses. This works across the whole modpack.",
			},
			{
				id: "jade-tooltip",
				title: "Read the Jade tooltip",
				detail:
					"Look at blocks, mobs, and machines. Jade tells you what they are and which mod added them.",
			},
			{
				id: "search-guides",
				title: "Search the directed guides when stuck",
				detail:
					"Search by problem, not just mod name: storage, teleport, recipe, map, grave, combat, backpack.",
			},
		],
	},
];

function readStoredChecked(): Set<string> {
	if (typeof window === "undefined") return new Set();

	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return new Set();
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed)
			? new Set(parsed.filter((id): id is string => typeof id === "string"))
			: new Set();
	} catch {
		return new Set();
	}
}

function ChecklistPage() {
	const [checked, setChecked] = useState<Set<string>>(() => new Set());
	const allItems = useMemo(
		() => SECTIONS.flatMap((section) => section.items),
		[],
	);
	const completed = checked.size;
	const total = allItems.length;
	const percent = Math.round((completed / total) * 100);

	useEffect(() => {
		setChecked(readStoredChecked());
	}, []);

	useEffect(() => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(checked)));
		} catch {
			// Progress persistence is optional; the checklist still works without storage.
		}
	}, [checked]);

	function toggle(id: string) {
		setChecked((current) => {
			const next = new Set(current);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});
	}

	function reset() {
		setChecked(new Set());
	}

	return (
		<main
			className="page-wrap"
			style={{ paddingTop: "3rem", paddingBottom: "5rem", maxWidth: 920 }}
		>
			<section className="fade-up" style={{ marginBottom: "2rem" }}>
				<p className="label" style={{ marginBottom: "0.5rem" }}>
					First session
				</p>
				<h1
					className="display"
					style={{
						fontSize: "clamp(1.9rem, 5vw, 3rem)",
						marginBottom: "0.75rem",
					}}
				>
					Join the server without getting overwhelmed.
				</h1>
				<p
					style={{
						margin: 0,
						maxWidth: 620,
						fontSize: "0.95rem",
						color: "var(--text-soft)",
						lineHeight: 1.7,
					}}
				>
					A short practical checklist for your first play session. It focuses on
					the habits and setup steps that prevent confusion, lost bases, bad
					keybinds, and inventory pain.
				</p>
			</section>

			<section
				style={{
					display: "grid",
					gridTemplateColumns: "minmax(0, 1fr) auto",
					gap: "1rem",
					alignItems: "center",
					padding: "1.2rem",
					background: "var(--bg-card)",
					border: "1px solid var(--border)",
					borderRadius: "1rem",
					marginBottom: "2rem",
				}}
			>
				<div>
					<p
						style={{
							margin: "0 0 0.45rem",
							fontSize: "0.85rem",
							fontWeight: 800,
							color: "var(--text)",
						}}
					>
						{completed} of {total} done
					</p>
					<div
						aria-label={`${percent}% complete`}
						aria-valuemax={total}
						aria-valuemin={0}
						aria-valuenow={completed}
						role="progressbar"
						style={{
							height: 9,
							overflow: "hidden",
							background: "var(--bg)",
							border: "1px solid var(--border)",
							borderRadius: 999,
						}}
					>
						<div
							style={{
								width: `${percent}%`,
								height: "100%",
								background:
									"linear-gradient(90deg, var(--accent), rgba(45,212,191,0.45))",
								transition: "width 180ms ease",
							}}
						/>
					</div>
				</div>
				<button
					type="button"
					onClick={reset}
					className="btn-ghost"
					style={{ padding: "0.55rem 0.85rem", fontSize: "0.8rem" }}
				>
					<RotateCcw size={14} />
					Reset
				</button>
			</section>

			<div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
				{SECTIONS.map((section) => {
					const sectionDone = section.items.filter((item) =>
						checked.has(item.id),
					).length;

					return (
						<section
							key={section.id}
							style={{
								padding: "1.25rem",
								background: "var(--bg-card)",
								border: "1px solid var(--border)",
								borderRadius: "1rem",
							}}
						>
							<div style={{ marginBottom: "1rem" }}>
								<p className="label" style={{ marginBottom: "0.35rem" }}>
									{section.kicker} · {sectionDone}/{section.items.length}
								</p>
								<h2
									className="display"
									style={{ margin: 0, fontSize: "1.25rem" }}
								>
									{section.title}
								</h2>
							</div>

							<div
								style={{
									display: "flex",
									flexDirection: "column",
									gap: "0.65rem",
								}}
							>
								{section.items.map((item) => {
									const isChecked = checked.has(item.id);

									return (
										<label
											key={item.id}
											style={{
												display: "grid",
												gridTemplateColumns: "auto minmax(0, 1fr)",
												gap: "0.75rem",
												alignItems: "flex-start",
												padding: "0.95rem",
												background: isChecked
													? "var(--accent-dim)"
													: "var(--bg)",
												border: `1px solid ${
													isChecked ? "var(--accent-ring)" : "var(--border)"
												}`,
												borderRadius: "0.75rem",
												cursor: "pointer",
											}}
										>
											<input
												type="checkbox"
												checked={isChecked}
												onChange={() => toggle(item.id)}
												style={{
													marginTop: "0.2rem",
													accentColor: "var(--accent)",
												}}
											/>
											<span>
												<span
													style={{
														display: "block",
														marginBottom: "0.2rem",
														fontSize: "0.9rem",
														fontWeight: 800,
														color: "var(--text)",
														textDecoration: isChecked ? "line-through" : "none",
														textDecorationColor: "var(--accent)",
													}}
												>
													{item.title}
												</span>
												<span
													style={{
														display: "block",
														fontSize: "0.82rem",
														color: "var(--text-soft)",
														lineHeight: 1.6,
													}}
												>
													{item.detail}
												</span>
												{item.why && (
													<span
														style={{
															display: "block",
															marginTop: "0.45rem",
															fontSize: "0.76rem",
															color: "var(--text-muted)",
															lineHeight: 1.5,
														}}
													>
														Why it matters: {item.why}
													</span>
												)}
											</span>
										</label>
									);
								})}
							</div>
						</section>
					);
				})}
			</div>

			<section
				style={{
					marginTop: "1.5rem",
					padding: "1.25rem",
					background: "var(--accent-dim)",
					border: "1px solid var(--accent-ring)",
					borderRadius: "1rem",
					display: "flex",
					flexWrap: "wrap",
					gap: "1rem",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<p
					style={{
						margin: 0,
						maxWidth: 540,
						fontSize: "0.85rem",
						color: "var(--text-soft)",
						lineHeight: 1.6,
					}}
				>
					Need more context for one of these steps? The setup guide covers
					Prism, and directed guides explain the important mods one at a time.
				</p>
				<div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
					<Link to="/setup" className="btn-ghost">
						Setup Guide
					</Link>
					<Link to="/directed-guides" className="btn-primary">
						Directed Guides
					</Link>
				</div>
			</section>
		</main>
	);
}
