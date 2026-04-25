import { createFileRoute, useNavigate } from "@tanstack/react-router";
import Fuse from "fuse.js";
import { Search, X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import ModCard from "../components/ModCard";
import ModDrawer from "../components/ModDrawer";
import type { Category, Mod } from "../data/mods";
import {
	CATEGORIES,
	CATEGORY_ORDER,
	LIBRARY_MODS,
	PLAYER_MODS,
} from "../data/mods";

type RouteSearch = { category?: Category; q?: string };

export const Route = createFileRoute("/mods")({
	validateSearch: (s: Record<string, unknown>): RouteSearch => ({
		category:
			typeof s.category === "string" && isPlayerCategory(s.category)
				? s.category
				: undefined,
		q: typeof s.q === "string" && s.q.trim() ? s.q : undefined,
	}),
	component: ModsPage,
});

const fuse = new Fuse(PLAYER_MODS, {
	keys: ["name", "description", "features"],
	threshold: 0.35,
	minMatchCharLength: 2,
});

const PLAYER_CATS = CATEGORY_ORDER.filter((c) => c !== "library");

function isPlayerCategory(value: string): value is Category {
	return PLAYER_CATS.includes(value as Category);
}

const CAT_COLOR: Record<string, string> = {
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

function ModsPage() {
	const navigate = useNavigate();
	const search = Route.useSearch();
	const query = search.q ?? "";
	const activeCat = search.category ?? "all";
	const [selectedMod, setSelectedMod] = useState<Mod | null>(null);
	const [showLibs, setShowLibs] = useState(false);

	const updateSearch = useCallback(
		(next: { category?: Category | "all"; q?: string }) => {
			const nextCategory = next.category ?? activeCat;
			const nextQuery = next.q ?? query;

			navigate({
				to: "/mods",
				search: {
					category: nextCategory !== "all" ? nextCategory : undefined,
					q: nextQuery.trim() || undefined,
				},
				replace: true,
			});
		},
		[activeCat, navigate, query],
	);

	const filtered = useMemo(() => {
		let pool = PLAYER_MODS;
		if (activeCat !== "all")
			pool = pool.filter((m) => m.category === activeCat);
		if (query.trim().length >= 2) {
			const ids = new Set(fuse.search(query.trim()).map((r) => r.item.id));
			pool = pool.filter((m) => ids.has(m.id));
		}
		return pool;
	}, [query, activeCat]);

	const closeMod = useCallback(() => setSelectedMod(null), []);

	return (
		<main
			className="page-wrap"
			style={{ paddingTop: "3rem", paddingBottom: "5rem" }}
		>
			{/* Page title */}
			<div style={{ marginBottom: "2rem" }}>
				<p className="label" style={{ marginBottom: "0.4rem" }}>
					TSW Fabric
				</p>
				<h1
					className="display"
					style={{ fontSize: "2rem", marginBottom: "0.4rem" }}
				>
					Mod Browser
				</h1>
				<p
					style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)" }}
				>
					{PLAYER_MODS.length} mods · click any card to read more
				</p>
			</div>

			{/* Search */}
			<div style={{ position: "relative", marginBottom: "1.25rem" }}>
				<Search
					size={15}
					style={{
						position: "absolute",
						left: "0.875rem",
						top: "50%",
						transform: "translateY(-50%)",
						color: "var(--text-muted)",
						pointerEvents: "none",
					}}
				/>
				<input
					type="search"
					placeholder="Search mods…"
					value={query}
					onChange={(e) => updateSearch({ q: e.target.value })}
					style={{
						width: "100%",
						boxSizing: "border-box",
						padding: "0.65rem 2.5rem 0.65rem 2.4rem",
						background: "var(--bg-card)",
						border: "1px solid var(--border)",
						borderRadius: "0.625rem",
						color: "var(--text)",
						fontSize: "0.875rem",
						fontFamily: "inherit",
						outline: "none",
						transition: "border-color 150ms ease",
					}}
					onFocus={(e) => {
						(e.target as HTMLInputElement).style.borderColor = "var(--accent)";
					}}
					onBlur={(e) => {
						(e.target as HTMLInputElement).style.borderColor = "var(--border)";
					}}
				/>
				{query && (
					<button
						type="button"
						onClick={() => updateSearch({ q: "" })}
						aria-label="Clear"
						style={{
							all: "unset",
							position: "absolute",
							right: "0.875rem",
							top: "50%",
							transform: "translateY(-50%)",
							color: "var(--text-muted)",
							cursor: "pointer",
							display: "flex",
						}}
					>
						<X size={14} />
					</button>
				)}
			</div>

			{/* Category filters */}
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					gap: "0.5rem",
					marginBottom: "2rem",
				}}
			>
				{/* All button */}
				<button
					type="button"
					onClick={() => updateSearch({ category: "all" })}
					style={{
						all: "unset",
						padding: "0.35rem 0.85rem",
						borderRadius: "999px",
						fontSize: "0.78rem",
						fontWeight: 600,
						cursor: "pointer",
						border: "1px solid",
						transition: "all 150ms ease",
						...(activeCat === "all"
							? {
									background: "var(--accent)",
									borderColor: "var(--accent)",
									color: "var(--on-accent)",
								}
							: {
									background: "transparent",
									borderColor: "var(--border)",
									color: "var(--text-soft)",
								}),
					}}
				>
					All ({PLAYER_MODS.length})
				</button>

				{PLAYER_CATS.map((cat) => {
					const meta = CATEGORIES[cat];
					const count = PLAYER_MODS.filter((m) => m.category === cat).length;
					const isActive = activeCat === cat;
					const color = CAT_COLOR[cat];
					return (
						<button
							key={cat}
							type="button"
							onClick={() => updateSearch({ category: isActive ? "all" : cat })}
							style={{
								all: "unset",
								padding: "0.35rem 0.85rem",
								borderRadius: "999px",
								fontSize: "0.78rem",
								fontWeight: 600,
								cursor: "pointer",
								border: "1px solid",
								transition: "all 150ms ease",
								...(isActive
									? { background: `${color}20`, borderColor: color, color }
									: {
											background: "transparent",
											borderColor: "var(--border)",
											color: "var(--text-soft)",
										}),
							}}
						>
							{meta.emoji} {meta.label} ({count})
						</button>
					);
				})}
			</div>

			{/* Results */}
			{filtered.length === 0 ? (
				<div
					style={{
						padding: "3rem",
						textAlign: "center",
						background: "var(--bg-card)",
						border: "1px solid var(--border)",
						borderRadius: "1rem",
					}}
				>
					<p style={{ fontSize: "2rem", margin: "0 0 0.5rem" }}>🔍</p>
					<p style={{ margin: 0, fontWeight: 600, color: "var(--text)" }}>
						No mods found
					</p>
					<p
						style={{
							margin: "0.35rem 0 0",
							fontSize: "0.83rem",
							color: "var(--text-muted)",
						}}
					>
						Try a different search term or clear the filter.
					</p>
				</div>
			) : (
				<>
					<p
						style={{
							margin: "0 0 1rem",
							fontSize: "0.78rem",
							color: "var(--text-muted)",
						}}
					>
						{filtered.length} mod{filtered.length !== 1 ? "s" : ""}
						{query.trim() ? ` matching "${query.trim()}"` : ""}
					</p>
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
							gap: "0.75rem",
						}}
					>
						{filtered.map((mod) => (
							<ModCard key={mod.id} mod={mod} onClick={setSelectedMod} />
						))}
					</div>
				</>
			)}

			{/* Libraries */}
			<div
				style={{
					marginTop: "4rem",
					borderTop: "1px solid var(--border)",
					paddingTop: "2rem",
				}}
			>
				<button
					type="button"
					onClick={() => setShowLibs((v) => !v)}
					style={{
						all: "unset",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						width: "100%",
						boxSizing: "border-box",
						padding: "1rem 1.25rem",
						background: "var(--bg-card)",
						border: "1px solid var(--border)",
						borderRadius: "0.75rem",
						cursor: "pointer",
						transition: "border-color 150ms ease",
					}}
					onMouseEnter={(e) => {
						(e.currentTarget as HTMLButtonElement).style.borderColor =
							"var(--border-hover)";
					}}
					onMouseLeave={(e) => {
						(e.currentTarget as HTMLButtonElement).style.borderColor =
							"var(--border)";
					}}
				>
					<div>
						<p
							style={{
								margin: 0,
								fontWeight: 600,
								fontSize: "0.875rem",
								color: "var(--text)",
							}}
						>
							🔧 Technical Dependencies ({LIBRARY_MODS.length})
						</p>
						<p
							style={{
								margin: "0.2rem 0 0",
								fontSize: "0.75rem",
								color: "var(--text-muted)",
							}}
						>
							Behind-the-scenes libraries — you don't interact with these
							directly
						</p>
					</div>
					<span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
						{showLibs ? "▲" : "▼"}
					</span>
				</button>

				{showLibs && (
					<div
						style={{
							marginTop: "0.75rem",
							display: "grid",
							gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
							gap: "0.5rem",
						}}
					>
						{LIBRARY_MODS.map((mod) => (
							<div
								key={mod.id}
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									padding: "0.6rem 0.875rem",
									background: "var(--bg-card)",
									border: "1px solid var(--border)",
									borderRadius: "0.5rem",
								}}
							>
								<span
									style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}
								>
									{mod.name}
								</span>
								{mod.modrinth && (
									<a
										href={`https://modrinth.com/mod/${mod.modrinth}`}
										target="_blank"
										rel="noopener noreferrer"
										style={{
											fontSize: "0.75rem",
											color: "var(--accent)",
											textDecoration: "none",
											marginLeft: "0.5rem",
											flexShrink: 0,
										}}
									>
										↗
									</a>
								)}
							</div>
						))}
					</div>
				)}
			</div>

			<ModDrawer mod={selectedMod} onClose={closeMod} />
		</main>
	);
}
