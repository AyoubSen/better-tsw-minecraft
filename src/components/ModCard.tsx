import type { Mod } from "../data/mods";
import { CATEGORIES } from "../data/mods";

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

interface ModCardProps {
	mod: Mod;
	onClick: (mod: Mod) => void;
}

export default function ModCard({ mod, onClick }: ModCardProps) {
	const cat = CATEGORIES[mod.category];
	const color = CAT_COLOR[mod.category] ?? "#6b7280";

	return (
		<button
			type="button"
			onClick={() => onClick(mod)}
			style={{
				all: "unset",
				display: "flex",
				flexDirection: "column",
				padding: "1.1rem",
				background: "var(--bg-card)",
				border: "1px solid var(--border)",
				borderRadius: "0.875rem",
				cursor: "pointer",
				textAlign: "left",
				width: "100%",
				boxSizing: "border-box",
				transition:
					"border-color 180ms ease, transform 180ms ease, background 180ms ease",
			}}
			onMouseEnter={(e) => {
				const el = e.currentTarget as HTMLButtonElement;
				el.style.borderColor = "var(--border-hover)";
				el.style.transform = "translateY(-2px)";
				el.style.background = "var(--bg-elevated)";
			}}
			onMouseLeave={(e) => {
				const el = e.currentTarget as HTMLButtonElement;
				el.style.borderColor = "var(--border)";
				el.style.transform = "translateY(0)";
				el.style.background = "var(--bg-card)";
			}}
		>
			{/* Category badge */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: "0.4rem",
					marginBottom: "0.6rem",
				}}
			>
				<span style={{ fontSize: "0.9rem", lineHeight: 1 }}>{cat.emoji}</span>
				<span
					style={{
						fontSize: "0.62rem",
						fontWeight: 700,
						letterSpacing: "0.08em",
						textTransform: "uppercase",
						color,
					}}
				>
					{cat.label}
				</span>
			</div>

			{/* Name */}
			<p
				style={{
					margin: "0 0 0.4rem",
					fontWeight: 700,
					fontSize: "0.875rem",
					color: "var(--text)",
					lineHeight: 1.3,
				}}
			>
				{mod.name}
			</p>

			{/* Description */}
			<p
				style={{
					margin: 0,
					fontSize: "0.78rem",
					color: "var(--text-soft)",
					lineHeight: 1.55,
					display: "-webkit-box",
					WebkitLineClamp: 2,
					WebkitBoxOrient: "vertical",
					overflow: "hidden",
					flex: 1,
				}}
			>
				{mod.description}
			</p>

			{/* Newbie indicator */}
			{mod.newbieNote && (
				<p
					style={{
						margin: "0.6rem 0 0",
						fontSize: "0.7rem",
						fontWeight: 600,
						color: "var(--accent)",
					}}
				>
					🌱 Newbie tip inside
				</p>
			)}
		</button>
	);
}
