import { ExternalLink, X } from "lucide-react";
import { useEffect } from "react";
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

interface Props {
	mod: Mod | null;
	onClose: () => void;
}

export default function ModDrawer({ mod, onClose }: Props) {
	useEffect(() => {
		if (!mod) return;
		const handler = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", handler);
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", handler);
			document.body.style.overflow = "";
		};
	}, [mod, onClose]);

	if (!mod) return null;

	const cat = CATEGORIES[mod.category];
	const color = CAT_COLOR[mod.category] ?? "#6b7280";

	return (
		<>
			{/* Backdrop */}
			<div
				onClick={onClose}
				aria-hidden="true"
				style={{
					position: "fixed",
					inset: 0,
					zIndex: 40,
					background: "rgba(0,0,0,0.6)",
					backdropFilter: "blur(4px)",
					WebkitBackdropFilter: "blur(4px)",
				}}
			/>

			{/* Panel */}
			<div
				role="dialog"
				aria-modal="true"
				aria-label={mod.name}
				style={{
					position: "fixed",
					inset: "0 0 0 auto",
					zIndex: 50,
					width: "100%",
					maxWidth: 480,
					display: "flex",
					flexDirection: "column",
					overflowY: "auto",
					background: "var(--bg-card)",
					borderLeft: "1px solid var(--border)",
				}}
			>
				{/* Header */}
				<div
					style={{
						position: "sticky",
						top: 0,
						zIndex: 1,
						display: "flex",
						alignItems: "flex-start",
						justifyContent: "space-between",
						gap: "1rem",
						padding: "1.25rem 1.5rem",
						background: "var(--bg-card)",
						borderBottom: "1px solid var(--border)",
					}}
				>
					<div>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: "0.5rem",
								marginBottom: "0.4rem",
							}}
						>
							<span style={{ fontSize: "1rem" }}>{cat.emoji}</span>
							<span
								style={{
									fontSize: "0.65rem",
									fontWeight: 700,
									letterSpacing: "0.1em",
									textTransform: "uppercase",
									color,
								}}
							>
								{cat.label}
							</span>
						</div>
						<h2
							className="display"
							style={{ margin: 0, fontSize: "1.35rem", color: "var(--text)" }}
						>
							{mod.name}
						</h2>
					</div>
					<button
						type="button"
						onClick={onClose}
						aria-label="Close"
						style={{
							all: "unset",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							padding: "0.4rem",
							border: "1px solid var(--border)",
							borderRadius: "0.5rem",
							cursor: "pointer",
							color: "var(--text-soft)",
							flexShrink: 0,
							transition: "border-color 150ms ease, color 150ms ease",
						}}
						onMouseEnter={(e) => {
							const el = e.currentTarget as HTMLButtonElement;
							el.style.borderColor = "var(--border-hover)";
							el.style.color = "var(--text)";
						}}
						onMouseLeave={(e) => {
							const el = e.currentTarget as HTMLButtonElement;
							el.style.borderColor = "var(--border)";
							el.style.color = "var(--text-soft)";
						}}
					>
						<X size={16} />
					</button>
				</div>

				{/* Body */}
				<div
					style={{
						padding: "1.5rem",
						display: "flex",
						flexDirection: "column",
						gap: "1.75rem",
					}}
				>
					{/* Description */}
					<p
						style={{
							margin: 0,
							fontSize: "0.875rem",
							color: "var(--text-soft)",
							lineHeight: 1.7,
						}}
					>
						{mod.description}
					</p>

					{/* Features */}
					{mod.features.length > 0 && (
						<section>
							<p className="label" style={{ marginBottom: "0.875rem" }}>
								What it adds
							</p>
							<ul
								style={{
									margin: 0,
									padding: 0,
									listStyle: "none",
									display: "flex",
									flexDirection: "column",
									gap: "0.6rem",
								}}
							>
								{mod.features.map((feat) => (
									<li
										key={feat}
										style={{
											display: "flex",
											alignItems: "flex-start",
											gap: "0.6rem",
											fontSize: "0.83rem",
											color: "var(--text-soft)",
										}}
									>
										<span
											style={{
												display: "inline-block",
												width: 5,
												height: 5,
												borderRadius: "50%",
												background: "var(--accent)",
												flexShrink: 0,
												marginTop: "0.45rem",
											}}
										/>
										{feat}
									</li>
								))}
							</ul>
						</section>
					)}

					{/* Newbie note */}
					{mod.newbieNote && (
						<section
							style={{
								background: "var(--accent-dim)",
								border: "1px solid var(--accent-ring)",
								borderRadius: "0.75rem",
								padding: "1rem 1.1rem",
							}}
						>
							<p
								className="label"
								style={{ marginBottom: "0.5rem", color: "var(--accent)" }}
							>
								🌱 New to Minecraft?
							</p>
							<p
								style={{
									margin: 0,
									fontSize: "0.83rem",
									color: "var(--text-soft)",
									lineHeight: 1.65,
								}}
							>
								{mod.newbieNote}
							</p>
						</section>
					)}

					{/* Links */}
					{(mod.modrinth || mod.curseforge) && (
						<section>
							<p className="label" style={{ marginBottom: "0.875rem" }}>
								Learn more
							</p>
							<div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
								{mod.modrinth && (
									<a
										href={`https://modrinth.com/mod/${mod.modrinth}`}
										target="_blank"
										rel="noopener noreferrer"
										style={{
											display: "inline-flex",
											alignItems: "center",
											gap: "0.4rem",
											padding: "0.45rem 0.875rem",
											background: "var(--accent-dim)",
											border: "1px solid var(--accent-ring)",
											borderRadius: "0.5rem",
											fontSize: "0.8rem",
											fontWeight: 600,
											color: "var(--accent)",
											textDecoration: "none",
										}}
									>
										Modrinth
										<ExternalLink size={12} />
									</a>
								)}
								{mod.curseforge && (
									<a
										href={`https://www.curseforge.com/minecraft/mc-mods/${mod.curseforge}`}
										target="_blank"
										rel="noopener noreferrer"
										style={{
											display: "inline-flex",
											alignItems: "center",
											gap: "0.4rem",
											padding: "0.45rem 0.875rem",
											background: "transparent",
											border: "1px solid var(--border)",
											borderRadius: "0.5rem",
											fontSize: "0.8rem",
											fontWeight: 600,
											color: "var(--text-soft)",
											textDecoration: "none",
										}}
									>
										CurseForge
										<ExternalLink size={12} />
									</a>
								)}
							</div>
						</section>
					)}
				</div>
			</div>
		</>
	);
}
