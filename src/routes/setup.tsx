import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/setup")({ component: SetupPage });

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
					flexShrink: 0,
					background: "var(--accent-dim)",
					border: "1px solid var(--accent-ring)",
					color: "var(--accent)",
					fontWeight: 700,
					fontSize: "0.8rem",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					marginTop: 2,
				}}
			>
				{n}
			</div>
			<div style={{ flex: 1 }}>
				<p
					style={{
						margin: "0 0 0.4rem",
						fontWeight: 700,
						fontSize: "0.9rem",
						color: "var(--text)",
					}}
				>
					{title}
				</p>
				<div
					style={{
						fontSize: "0.83rem",
						color: "var(--text-soft)",
						lineHeight: 1.7,
					}}
				>
					{children}
				</div>
			</div>
		</div>
	);
}

function Note({ children }: { children: React.ReactNode }) {
	return (
		<div
			style={{
				display: "flex",
				gap: "0.6rem",
				alignItems: "flex-start",
				padding: "0.75rem 1rem",
				background: "var(--accent-dim)",
				border: "1px solid var(--accent-ring)",
				borderRadius: "0.5rem",
				marginTop: "0.75rem",
			}}
		>
			<span style={{ fontSize: "0.85rem", flexShrink: 0 }}>💡</span>
			<p
				style={{
					margin: 0,
					fontSize: "0.8rem",
					color: "var(--text-soft)",
					lineHeight: 1.6,
				}}
			>
				{children}
			</p>
		</div>
	);
}

function Warn({ children }: { children: React.ReactNode }) {
	return (
		<div
			style={{
				display: "flex",
				gap: "0.6rem",
				alignItems: "flex-start",
				padding: "0.75rem 1rem",
				background: "rgba(251,191,36,0.08)",
				border: "1px solid rgba(251,191,36,0.25)",
				borderRadius: "0.5rem",
				marginTop: "0.75rem",
			}}
		>
			<span style={{ fontSize: "0.85rem", flexShrink: 0 }}>⚠️</span>
			<p
				style={{
					margin: 0,
					fontSize: "0.8rem",
					color: "var(--text-soft)",
					lineHeight: 1.6,
				}}
			>
				{children}
			</p>
		</div>
	);
}

function Code({ children }: { children: React.ReactNode }) {
	return (
		<code
			style={{
				fontFamily: "ui-monospace, monospace",
				fontSize: "0.82rem",
				padding: "0.15em 0.45em",
				background: "var(--bg-elevated)",
				border: "1px solid var(--border)",
				borderRadius: "0.3rem",
				color: "var(--accent)",
			}}
		>
			{children}
		</code>
	);
}

function SectionHeader({
	kicker,
	title,
	sub,
}: {
	kicker: string;
	title: string;
	sub?: string;
}) {
	return (
		<div style={{ marginBottom: "1.5rem" }}>
			<p className="label" style={{ marginBottom: "0.4rem" }}>
				{kicker}
			</p>
			<h2
				className="display"
				style={{ fontSize: "1.4rem", margin: "0 0 0.3rem" }}
			>
				{title}
			</h2>
			{sub && (
				<p
					style={{ margin: 0, fontSize: "0.83rem", color: "var(--text-muted)" }}
				>
					{sub}
				</p>
			)}
		</div>
	);
}

function Divider() {
	return (
		<div style={{ borderTop: "1px solid var(--border)", margin: "3rem 0" }} />
	);
}

function SetupPage() {
	return (
		<main
			className="page-wrap"
			style={{ paddingTop: "3rem", paddingBottom: "5rem", maxWidth: 720 }}
		>
			{/* Header */}
			<div className="fade-up" style={{ marginBottom: "2.5rem" }}>
				<p className="label" style={{ marginBottom: "0.5rem" }}>
					Getting started
				</p>
				<h1
					className="display"
					style={{
						fontSize: "clamp(1.8rem, 5vw, 2.6rem)",
						marginBottom: "0.75rem",
					}}
				>
					Setting up Prism Launcher
				</h1>
				<p
					style={{
						margin: 0,
						fontSize: "0.95rem",
						color: "var(--text-soft)",
						lineHeight: 1.7,
					}}
				>
					Prism Launcher is the best way to run modded Minecraft. It keeps your
					modded instances separate from each other, handles mod loaders for
					you, and makes managing mods simple. This guide walks you through
					everything from scratch.
				</p>
			</div>

			{/* Why Prism */}
			<section
				style={{
					padding: "1.5rem",
					background: "var(--bg-card)",
					border: "1px solid var(--border)",
					borderRadius: "1rem",
					marginBottom: "3rem",
					display: "grid",
					gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
					gap: "1.25rem",
				}}
			>
				{[
					[
						"🗂️",
						"Multiple instances",
						"Run different versions or modpacks separately without conflicts",
					],
					[
						"⚡",
						"Automatic mod loaders",
						"Installs Fabric, Forge, or Quilt for you — no manual setup",
					],
					[
						"☕",
						"Java management",
						"Detects or installs the right Java version automatically",
					],
					[
						"🆓",
						"Free & open source",
						"No ads, no paid tiers, maintained by the community",
					],
				].map(([icon, title, desc]) => (
					<div key={title}>
						<p style={{ margin: "0 0 0.3rem", fontSize: "1.1rem" }}>{icon}</p>
						<p
							style={{
								margin: "0 0 0.2rem",
								fontWeight: 700,
								fontSize: "0.83rem",
								color: "var(--text)",
							}}
						>
							{title}
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
			</section>

			{/* Part 1 — Install */}
			<section style={{ marginBottom: "3rem" }}>
				<SectionHeader kicker="Part 1" title="Download & install Prism" />
				<div
					style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
				>
					<Step n={1} title="Download the installer">
						<p style={{ margin: "0 0 0.75rem" }}>
							Head to{" "}
							<a
								href="https://prismlauncher.org/download/"
								target="_blank"
								rel="noopener noreferrer"
								style={{
									display: "inline-flex",
									alignItems: "center",
									gap: "0.25rem",
								}}
							>
								prismlauncher.org/download <ExternalLink size={11} />
							</a>{" "}
							and pick the right version for your OS.
						</p>
						<div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
							{[
								{ os: "Windows", label: "Windows Installer (.exe)" },
								{ os: "macOS", label: "macOS (.dmg)" },
								{ os: "Linux", label: "Linux (AppImage or package)" },
							].map(({ os, label }) => (
								<span
									key={os}
									style={{
										padding: "0.35rem 0.75rem",
										background: "var(--bg-elevated)",
										border: "1px solid var(--border)",
										borderRadius: "0.4rem",
										fontSize: "0.78rem",
										color: "var(--text-soft)",
									}}
								>
									{label}
								</span>
							))}
						</div>
						<Note>
							Windows users: if you see a "Windows protected your PC" warning,
							click{" "}
							<strong style={{ color: "var(--text)" }}>
								More info → Run anyway
							</strong>
							. Prism is safe — Windows just doesn't recognise unsigned
							installers from smaller developers.
						</Note>
					</Step>

					<Step n={2} title="Run the installer and launch Prism">
						Follow the standard install steps. Once it opens, you'll see the
						Prism Launcher window with an empty instance list — that's normal,
						you haven't created anything yet.
						<Note>
							On first launch Prism will ask you to set up a Minecraft account.
							Log in with your Microsoft account (the one linked to your
							Minecraft purchase).
						</Note>
					</Step>

					<Step n={3} title="Set up Java (if needed)">
						Prism handles Java for you. When you first launch an instance it
						will offer to download and install the right Java version
						automatically — just click{" "}
						<strong style={{ color: "var(--text)" }}>Yes</strong> and let it do
						its thing. You don't need to install Java separately or pick a
						version manually.
						<Note>
							If you ever see a Java-related error, go to{" "}
							<strong style={{ color: "var(--text)" }}>Settings → Java</strong>{" "}
							and click{" "}
							<strong style={{ color: "var(--text)" }}>Auto-detect</strong> —
							Prism will find whatever is installed on your machine.
						</Note>
					</Step>
				</div>
			</section>

			<Divider />

			{/* Part 2 — Create instance */}
			<section style={{ marginBottom: "3rem" }}>
				<SectionHeader
					kicker="Part 2"
					title="Create a Fabric instance"
					sub="An 'instance' is just Prism's word for an isolated Minecraft installation. We'll create one for Fabric 1.21.1."
				/>
				<div
					style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
				>
					<Step n={1} title='Click "Add Instance" in the top-left'>
						The button looks like a plus sign. This opens the new instance
						wizard.
					</Step>

					<Step n={2} title="Select Fabric as the mod loader">
						<p style={{ margin: "0 0 0.5rem" }}>
							In the left panel, choose{" "}
							<strong style={{ color: "var(--text)" }}>Fabric</strong>. Then set
							the Minecraft version to <Code>1.21.1</Code>.
						</p>
						<p style={{ margin: 0 }}>
							For the Fabric Loader version, leave it on the latest stable —
							Prism fills this in automatically. The server runs Fabric{" "}
							<Code>0.19.1</Code> but any recent loader version on the client is
							compatible.
						</p>
					</Step>

					<Step n={3} title="Name your instance and click OK">
						Give it a recognisable name like <Code>TSW Fabric 1.21.1</Code>.
						Click OK — Prism will download the game files. This takes a minute
						or two depending on your connection.
					</Step>
				</div>
			</section>

			<Divider />

			{/* Part 3 — RAM */}
			<section style={{ marginBottom: "3rem" }}>
				<SectionHeader
					kicker="Part 3"
					title="Allocate enough RAM"
					sub="Vanilla Minecraft runs fine on 2 GB. With 125 mods loaded, you need more."
				/>
				<div
					style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
				>
					<Step n={1} title="Open instance settings">
						Right-click your instance in the list and choose{" "}
						<strong style={{ color: "var(--text)" }}>Edit</strong>, or click the
						instance once to select it and then click{" "}
						<strong style={{ color: "var(--text)" }}>Settings</strong> in the
						right panel.
					</Step>

					<Step n={2} title="Go to the Java tab and adjust memory">
						<p style={{ margin: "0 0 0.5rem" }}>
							Check{" "}
							<strong style={{ color: "var(--text)" }}>
								Override global settings
							</strong>
							, then set the memory values:
						</p>
						<div
							style={{
								display: "grid",
								gridTemplateColumns: "1fr 1fr",
								gap: "0.5rem",
								padding: "1rem",
								background: "var(--bg)",
								border: "1px solid var(--border)",
								borderRadius: "0.625rem",
								marginBottom: "0.5rem",
							}}
						>
							{[
								["Minimum RAM", "2048 MB", "var(--text-muted)"],
								["Maximum RAM", "6144 MB", "var(--accent)"],
							].map(([label, value, color]) => (
								<div key={label}>
									<p
										style={{
											margin: "0 0 0.2rem",
											fontSize: "0.72rem",
											color: "var(--text-muted)",
										}}
									>
										{label}
									</p>
									<p
										style={{
											margin: 0,
											fontWeight: 700,
											fontSize: "0.9rem",
											color,
										}}
									>
										{value}
									</p>
								</div>
							))}
						</div>
						<p style={{ margin: 0 }}>
							6 GB (6144 MB) is the sweet spot for this pack. If your computer
							has 8 GB of total RAM, use 4096 MB instead. If you have 16 GB or
							more, 8192 MB is fine.
						</p>
						<Warn>
							Don't allocate more than half your total system RAM. Giving
							Minecraft too much actually hurts performance — the garbage
							collector struggles with very large heaps.
						</Warn>
					</Step>
				</div>
			</section>

			<Divider />

			{/* Part 4 — Adding mods */}
			<section style={{ marginBottom: "3rem" }}>
				<SectionHeader kicker="Part 4" title="Adding mods to your instance" />
				<div
					style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
				>
					<Step n={1} title="Open the mods folder for your instance">
						Right-click your instance →{" "}
						<strong style={{ color: "var(--text)" }}>Folder</strong> →{" "}
						<strong style={{ color: "var(--text)" }}>Mods</strong>. This opens
						the folder in your file explorer. Any <Code>.jar</Code> file you
						drop in here will be loaded when the game starts.
					</Step>

					<Step n={2} title="Option A — Drag in .jar files manually">
						If someone shares a mods folder or a zip of jars, just drag them all
						into this folder. Make sure every file ends in <Code>.jar</Code> —
						don't rename them.
						<Note>
							Mod files include both the actual mods and their required
							libraries. Drop everything in — even the ones that look like
							"supporting" files. They're all needed.
						</Note>
					</Step>

					<Step n={3} title="Option B — Use Prism's built-in mod browser">
						<p style={{ margin: "0 0 0.5rem" }}>
							Select your instance → click{" "}
							<strong style={{ color: "var(--text)" }}>Mods</strong> in the
							right panel →{" "}
							<strong style={{ color: "var(--text)" }}>Download mods</strong>.
						</p>
						<p style={{ margin: 0 }}>
							This opens a browser connected to Modrinth and CurseForge. Search
							by mod name, click a result, and hit{" "}
							<strong style={{ color: "var(--text)" }}>
								Select mod for download
							</strong>
							. Prism handles dependencies automatically.
						</p>
					</Step>

					<Step n={4} title="Verify mods are loaded">
						Launch the instance. On the Minecraft main menu, click{" "}
						<strong style={{ color: "var(--text)" }}>Mods</strong> (added by the
						Catalogue mod) to see the full list of active mods. If a mod you
						expected isn't there, check that its <Code>.jar</Code> file is in
						the right folder and the game version matches.
					</Step>
				</div>
			</section>

			<Divider />

			{/* Part 5 — Useful Prism features */}
			<section style={{ marginBottom: "3rem" }}>
				<SectionHeader kicker="Part 5" title="Useful Prism features to know" />
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
							icon: "📸",
							title: "Export & share an instance",
							desc: "Right-click → Export Instance → Modrinth pack or zip. Good for sharing an exact modset with friends.",
						},
						{
							icon: "📋",
							title: "Logs when something crashes",
							desc: "If the game crashes, right-click the instance → Logs. The crash log tells you which mod caused it — paste it in the group chat.",
						},
						{
							icon: "🔁",
							title: "Copy an instance",
							desc: "Right-click → Copy. Useful for testing a new mod without breaking your working setup — test on the copy, then apply to the real one if it's fine.",
						},
						{
							icon: "⚙️",
							title: "Per-instance Java settings",
							desc: "Each instance can override the global Java and RAM settings independently. Good if you run multiple packs with different requirements.",
						},
						{
							icon: "🎮",
							title: "Controller support",
							desc: "Prism supports controller input via the Controlify mod. Install Controlify in your instance and plug in a controller — it just works.",
						},
					].map(({ icon, title, desc }, i) => (
						<div
							key={title}
							style={{
								display: "flex",
								gap: "1rem",
								alignItems: "flex-start",
								padding: "1rem 1.25rem",
								borderTop: i === 0 ? "none" : "1px solid var(--border)",
							}}
						>
							<span style={{ fontSize: "1.1rem", flexShrink: 0, marginTop: 1 }}>
								{icon}
							</span>
							<div>
								<p
									style={{
										margin: "0 0 0.2rem",
										fontWeight: 700,
										fontSize: "0.83rem",
										color: "var(--text)",
									}}
								>
									{title}
								</p>
								<p
									style={{
										margin: 0,
										fontSize: "0.78rem",
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

			{/* Footer CTA */}
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
					Now that you're set up — see what's in the pack.
				</p>
				<div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
					<Link
						to="/guide"
						className="btn-ghost"
						style={{ fontSize: "0.83rem", padding: "0.5rem 1rem" }}
					>
						Player Guide
					</Link>
					<Link
						to="/troubleshooting"
						className="btn-ghost"
						style={{ fontSize: "0.83rem", padding: "0.5rem 1rem" }}
					>
						Troubleshooting
					</Link>
					<Link
						to="/mods"
						className="btn-primary"
						style={{ fontSize: "0.83rem", padding: "0.5rem 1rem" }}
					>
						Browse Mods →
					</Link>
				</div>
			</div>
		</main>
	);
}
