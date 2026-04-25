import { createFileRoute } from "@tanstack/react-router";
import type { ChangelogEntry } from "../data/changelog";
import { CHANGELOG } from "../data/changelog";

export const Route = createFileRoute("/changelog")({
	component: ChangelogPage,
});

function formatDate(iso: string) {
	return new Date(iso).toLocaleDateString("en-GB", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
}

function daysAgo(iso: string) {
	const diff = Date.now() - new Date(iso).getTime();
	const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	if (days === 0) return "Today";
	if (days === 1) return "Yesterday";
	if (days < 7) return `${days} days ago`;
	if (days < 30)
		return `${Math.floor(days / 7)} week${Math.floor(days / 7) !== 1 ? "s" : ""} ago`;
	return `${Math.floor(days / 30)} month${Math.floor(days / 30) !== 1 ? "s" : ""} ago`;
}

const SECTION_META = {
	added: { label: "Added", color: "#34d399", dot: "#34d399" },
	removed: { label: "Removed", color: "#f87171", dot: "#f87171" },
	updated: { label: "Updated", color: "#60a5fa", dot: "#60a5fa" },
	notes: {
		label: "Notes",
		color: "var(--text-muted)",
		dot: "var(--text-muted)",
	},
};

function EntryCard({ entry }: { entry: ChangelogEntry }) {
	const playerAdded = entry.added?.filter(
		(m) => !m.note?.startsWith("Library"),
	);
	const libAdded = entry.added?.filter((m) => m.note?.startsWith("Library"));

	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "140px 1fr",
				gap: "0 2rem",
				paddingBottom: "3rem",
				borderBottom: "1px solid var(--border)",
			}}
		>
			{/* Date column */}
			<div style={{ paddingTop: "0.15rem" }}>
				<p
					style={{
						margin: "0 0 0.25rem",
						fontSize: "0.8rem",
						fontWeight: 700,
						color: "var(--text)",
					}}
				>
					{formatDate(entry.date)}
				</p>
				<p
					style={{ margin: 0, fontSize: "0.72rem", color: "var(--text-muted)" }}
				>
					{daysAgo(entry.date)}
				</p>
			</div>

			{/* Content column */}
			<div>
				<h2
					className="display"
					style={{
						fontSize: "1.25rem",
						margin: "0 0 0.4rem",
						color: "var(--text)",
					}}
				>
					{entry.title}
				</h2>

				{entry.description && (
					<p
						style={{
							margin: "0 0 1.5rem",
							fontSize: "0.875rem",
							color: "var(--text-soft)",
							lineHeight: 1.65,
						}}
					>
						{entry.description}
					</p>
				)}

				<div
					style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
				>
					{/* Player-facing additions */}
					{playerAdded && playerAdded.length > 0 && (
						<section>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									gap: "0.5rem",
									marginBottom: "0.75rem",
								}}
							>
								<span
									style={{
										width: 7,
										height: 7,
										borderRadius: "50%",
										background: SECTION_META.added.dot,
										flexShrink: 0,
									}}
								/>
								<span
									style={{
										fontSize: "0.7rem",
										fontWeight: 700,
										letterSpacing: "0.1em",
										textTransform: "uppercase",
										color: SECTION_META.added.color,
									}}
								>
									Added · {playerAdded.length} mod
									{playerAdded.length !== 1 ? "s" : ""}
								</span>
							</div>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									gap: "0.5rem",
								}}
							>
								{playerAdded.map((mod) => (
									<div
										key={mod.name}
										style={{
											padding: "0.6rem 0.875rem",
											background: "var(--bg-card)",
											border: "1px solid var(--border)",
											borderRadius: "0.5rem",
										}}
									>
										<p
											style={{
												margin: 0,
												fontWeight: 700,
												fontSize: "0.83rem",
												color: "var(--text)",
											}}
										>
											{mod.name}
										</p>
										{mod.note && (
											<p
												style={{
													margin: "0.15rem 0 0",
													fontSize: "0.77rem",
													color: "var(--text-muted)",
													lineHeight: 1.5,
												}}
											>
												{mod.note}
											</p>
										)}
									</div>
								))}
							</div>
						</section>
					)}

					{/* Removed */}
					{entry.removed && entry.removed.length > 0 && (
						<section>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									gap: "0.5rem",
									marginBottom: "0.75rem",
								}}
							>
								<span
									style={{
										width: 7,
										height: 7,
										borderRadius: "50%",
										background: SECTION_META.removed.dot,
										flexShrink: 0,
									}}
								/>
								<span
									style={{
										fontSize: "0.7rem",
										fontWeight: 700,
										letterSpacing: "0.1em",
										textTransform: "uppercase",
										color: SECTION_META.removed.color,
									}}
								>
									Removed · {entry.removed.length} mod
									{entry.removed.length !== 1 ? "s" : ""}
								</span>
							</div>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									gap: "0.5rem",
								}}
							>
								{entry.removed.map((mod) => (
									<div
										key={mod.name}
										style={{
											padding: "0.6rem 0.875rem",
											background: "var(--bg-card)",
											border: "1px solid var(--border)",
											borderRadius: "0.5rem",
										}}
									>
										<p
											style={{
												margin: 0,
												fontWeight: 700,
												fontSize: "0.83rem",
												color: "var(--text)",
											}}
										>
											{mod.name}
										</p>
										{mod.note && (
											<p
												style={{
													margin: "0.15rem 0 0",
													fontSize: "0.77rem",
													color: "var(--text-muted)",
													lineHeight: 1.5,
												}}
											>
												{mod.note}
											</p>
										)}
									</div>
								))}
							</div>
						</section>
					)}

					{/* Updated */}
					{entry.updated && entry.updated.length > 0 && (
						<section>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									gap: "0.5rem",
									marginBottom: "0.75rem",
								}}
							>
								<span
									style={{
										width: 7,
										height: 7,
										borderRadius: "50%",
										background: SECTION_META.updated.dot,
										flexShrink: 0,
									}}
								/>
								<span
									style={{
										fontSize: "0.7rem",
										fontWeight: 700,
										letterSpacing: "0.1em",
										textTransform: "uppercase",
										color: SECTION_META.updated.color,
									}}
								>
									Updated · {entry.updated.length} mod
									{entry.updated.length !== 1 ? "s" : ""}
								</span>
							</div>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									gap: "0.5rem",
								}}
							>
								{entry.updated.map((mod) => (
									<div
										key={mod.name}
										style={{
											padding: "0.6rem 0.875rem",
											background: "var(--bg-card)",
											border: "1px solid var(--border)",
											borderRadius: "0.5rem",
										}}
									>
										<p
											style={{
												margin: 0,
												fontWeight: 700,
												fontSize: "0.83rem",
												color: "var(--text)",
											}}
										>
											{mod.name}
										</p>
										{mod.note && (
											<p
												style={{
													margin: "0.15rem 0 0",
													fontSize: "0.77rem",
													color: "var(--text-muted)",
													lineHeight: 1.5,
												}}
											>
												{mod.note}
											</p>
										)}
									</div>
								))}
							</div>
						</section>
					)}

					{/* Notes */}
					{entry.notes && entry.notes.length > 0 && (
						<section>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									gap: "0.5rem",
									marginBottom: "0.75rem",
								}}
							>
								<span
									style={{
										width: 7,
										height: 7,
										borderRadius: "50%",
										background: "var(--text-muted)",
										flexShrink: 0,
									}}
								/>
								<span
									style={{
										fontSize: "0.7rem",
										fontWeight: 700,
										letterSpacing: "0.1em",
										textTransform: "uppercase",
										color: "var(--text-muted)",
									}}
								>
									Notes
								</span>
							</div>
							<ul
								style={{
									margin: 0,
									padding: 0,
									listStyle: "none",
									display: "flex",
									flexDirection: "column",
									gap: "0.35rem",
								}}
							>
								{entry.notes.map((note) => (
									<li
										key={note}
										style={{
											display: "flex",
											gap: "0.5rem",
											fontSize: "0.83rem",
											color: "var(--text-soft)",
											lineHeight: 1.6,
										}}
									>
										<span style={{ flexShrink: 0, color: "var(--text-muted)" }}>
											–
										</span>
										{note}
									</li>
								))}
							</ul>
						</section>
					)}

					{/* Library additions — collapsed, understated */}
					{libAdded && libAdded.length > 0 && (
						<p
							style={{
								margin: 0,
								fontSize: "0.75rem",
								color: "var(--text-muted)",
							}}
						>
							+ {libAdded.length} technical librar
							{libAdded.length !== 1 ? "ies" : "y"} (
							{libAdded.map((m) => m.name).join(", ")})
						</p>
					)}
				</div>
			</div>
		</div>
	);
}

function ChangelogPage() {
	const sorted = [...CHANGELOG].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	);

	return (
		<main
			className="page-wrap"
			style={{ paddingTop: "3rem", paddingBottom: "5rem", maxWidth: 760 }}
		>
			{/* Header */}
			<div className="fade-up" style={{ marginBottom: "3rem" }}>
				<p className="label" style={{ marginBottom: "0.5rem" }}>
					TSW Fabric
				</p>
				<h1
					className="display"
					style={{
						fontSize: "clamp(1.8rem, 5vw, 2.6rem)",
						marginBottom: "0.6rem",
					}}
				>
					Changelog
				</h1>
				<p
					style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-muted)" }}
				>
					A record of every mod added, removed, or updated on the server.
				</p>
			</div>

			{/* Entries */}
			<div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
				{sorted.map((entry) => (
					<EntryCard key={entry.date + entry.title} entry={entry} />
				))}
			</div>
		</main>
	);
}
