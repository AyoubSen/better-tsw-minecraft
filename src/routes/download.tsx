import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, ExternalLink, FolderOpen, Terminal } from "lucide-react";
import downloadManifest from "../../public/downloads/manifest.json";

export const Route = createFileRoute("/download")({ component: DownloadPage });

const PACK = {
	...downloadManifest,
	updaterUrl: "/downloads/update-tsw-fabric.ps1",
};

function InfoCard({
	icon,
	title,
	children,
}: {
	icon: React.ReactNode;
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div
			style={{
				padding: "1.2rem",
				background: "var(--bg-card)",
				border: "1px solid var(--border)",
				borderRadius: "1rem",
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: "0.6rem",
					marginBottom: "0.65rem",
				}}
			>
				<span style={{ color: "var(--accent)", display: "flex" }}>{icon}</span>
				<h2
					className="display"
					style={{ margin: 0, fontSize: "1.15rem", lineHeight: 1.2 }}
				>
					{title}
				</h2>
			</div>
			<div
				style={{
					fontSize: "0.84rem",
					color: "var(--text-soft)",
					lineHeight: 1.65,
				}}
			>
				{children}
			</div>
		</div>
	);
}

function DownloadPage() {
	return (
		<main
			className="page-wrap"
			style={{ paddingTop: "3rem", paddingBottom: "5rem", maxWidth: 920 }}
		>
			<section className="fade-up" style={{ marginBottom: "2rem" }}>
				<p className="label" style={{ marginBottom: "0.5rem" }}>
					Downloads
				</p>
				<h1
					className="display"
					style={{
						fontSize: "clamp(1.9rem, 5vw, 3rem)",
						marginBottom: "0.75rem",
					}}
				>
					Get the current TSW Fabric mods.
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
					Use the manual zip if you want the simplest path. Use the Windows
					updater if you want it to place the files into your selected Prism
					instance for you.
				</p>
			</section>

			<section
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
					gap: "0.75rem",
					marginBottom: "1.5rem",
				}}
			>
				{[
					["Pack version", PACK.version],
					["Minecraft", PACK.minecraft],
					["Fabric Loader", PACK.fabric],
					["Updated", PACK.updatedAt],
				].map(([label, value]) => (
					<div
						key={label}
						style={{
							padding: "1rem",
							background: "var(--bg-card)",
							border: "1px solid var(--border)",
							borderRadius: "0.85rem",
						}}
					>
						<p
							style={{
								margin: "0 0 0.25rem",
								fontSize: "0.72rem",
								color: "var(--text-muted)",
								fontWeight: 800,
								textTransform: "uppercase",
								letterSpacing: "0.06em",
							}}
						>
							{label}
						</p>
						<p style={{ margin: 0, color: "var(--text)", fontWeight: 800 }}>
							{value}
						</p>
					</div>
				))}
			</section>

			<section
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
					gap: "1rem",
					marginBottom: "1.5rem",
				}}
			>
				<InfoCard icon={<Download size={18} />} title="Manual download">
					<p style={{ margin: "0 0 1rem" }}>
						Download the full mods zip, then extract or copy the `.jar` files
						into your Prism instance `mods` folder.
					</p>
					<div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
						<a href={PACK.zipUrl} className="btn-primary">
							Full mods zip
							<ExternalLink size={14} />
						</a>
						<a href={PACK.newModsZipUrl} className="btn-ghost">
							Only new mods archive
							<ExternalLink size={14} />
						</a>
					</div>
				</InfoCard>

				<InfoCard icon={<Terminal size={18} />} title="Windows updater">
					<p style={{ margin: "0 0 1rem" }}>
						Lets you choose either the full bundle or only-new-mods bundle, asks
						you to pick your Prism instance or `mods` folder, then installs the
						downloaded `.jar` files.
					</p>
					<a href={PACK.updaterUrl} className="btn-primary" download>
						Download updater script
					</a>
				</InfoCard>
			</section>

			<section
				style={{
					padding: "1.25rem",
					background: "var(--accent-dim)",
					border: "1px solid var(--accent-ring)",
					borderRadius: "1rem",
					marginBottom: "1.5rem",
				}}
			>
				<div
					style={{
						display: "flex",
						gap: "0.65rem",
						alignItems: "flex-start",
					}}
				>
					<FolderOpen
						size={18}
						style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }}
					/>
					<div>
						<p
							style={{
								margin: "0 0 0.35rem",
								fontWeight: 800,
								color: "var(--text)",
							}}
						>
							Which folder should I pick?
						</p>
						<p
							style={{
								margin: 0,
								fontSize: "0.84rem",
								color: "var(--text-soft)",
								lineHeight: 1.65,
							}}
						>
							Pick your Prism instance folder, or the `mods` folder inside it.
							If your instance is hidden in AppData, choose the paste-path
							option in the updater and paste the full folder path.
						</p>
					</div>
				</div>
			</section>

			<section
				style={{
					padding: "1.25rem",
					background: "var(--bg-card)",
					border: "1px solid var(--border)",
					borderRadius: "1rem",
				}}
			>
				<p
					className="label"
					style={{ marginBottom: "0.65rem", color: "var(--accent)" }}
				>
					Updater command
				</p>
				<p
					style={{
						margin: "0 0 0.9rem",
						fontSize: "0.84rem",
						color: "var(--text-soft)",
						lineHeight: 1.65,
					}}
				>
					After downloading the script, right-click it and choose "Run with
					PowerShell". If Windows asks for confirmation, choose to run it. If
					that does not work, open PowerShell in your Downloads folder and run:
				</p>
				<pre
					style={{
						overflowX: "auto",
						margin: 0,
						padding: "0.9rem",
						background: "var(--bg)",
						border: "1px solid var(--border)",
						borderRadius: "0.75rem",
						color: "var(--accent)",
						fontSize: "0.78rem",
					}}
				>
					{`powershell -ExecutionPolicy Bypass -File .\\update-tsw-fabric.ps1`}
				</pre>
				<div style={{ marginTop: "1rem" }}>
					<Link to="/setup">Need Prism setup help?</Link>
					<span style={{ color: "var(--text-muted)" }}> · </span>
					<Link to="/troubleshooting">Something broken?</Link>
				</div>
			</section>
		</main>
	);
}
