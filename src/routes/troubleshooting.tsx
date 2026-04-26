import { createFileRoute, Link } from "@tanstack/react-router";
import {
	AlertTriangle,
	FolderSearch,
	Gamepad2,
	Gauge,
	Wrench,
} from "lucide-react";

export const Route = createFileRoute("/troubleshooting")({
	component: TroubleshootingPage,
});

type Problem = {
	title: string;
	means: string;
	try: string[];
	send?: string[];
};

const PROBLEMS: Problem[] = [
	{
		title: "Server says my mod list is incompatible",
		means:
			"Your local mods folder probably does not match the server, or you updated the wrong Prism instance.",
		try: [
			"Run the updater again and choose the full mod bundle.",
			"Confirm the instance is Minecraft 1.21.1.",
			"Confirm Fabric Loader is 0.19.1.",
			"Make sure you selected the instance you actually launch from Prism.",
		],
		send: [
			"A screenshot of the server error.",
			"The Prism instance name you are launching.",
		],
	},
	{
		title: "Minecraft crashes on launch",
		means:
			"A mod file may be missing, duplicated, corrupted, or for the wrong Minecraft version.",
		try: [
			"Use the full bundle, not only-new-mods.",
			"Remove old random jars you added manually.",
			"Restart Prism after replacing mods.",
			"Check that Java/RAM settings match the setup guide.",
		],
		send: [
			"The latest log from Prism.",
			"A screenshot of the crash screen if one appears.",
		],
	},
	{
		title: "I cannot find my Prism instance folder",
		means:
			"Prism stores instances in AppData on many Windows installs, which is hidden by default.",
		try: [
			"In the updater, choose the paste-path option.",
			"Try %APPDATA%\\PrismLauncher\\instances in File Explorer.",
			"In Prism, select the instance and click Folder in the bottom-right panel to open the instance folder.",
			"Since the updater needs the mods folder, you can also edit the instance, click Mods on the left, then click Folder in the bottom-right.",
			"You can select either the instance folder or the mods folder directly.",
		],
	},
	{
		title: "Windows blocked the updater",
		means:
			"Windows is cautious with downloaded PowerShell scripts, even when they are simple text files.",
		try: [
			"Right-click the script and choose Run with PowerShell.",
			"If there is an Unblock checkbox in Properties, check it and apply.",
			"Open PowerShell in Downloads and run the command shown on the Download page.",
			"Use the manual zip download if you do not want to run a script.",
		],
	},
	{
		title: "Updater says the bundle is not a zip",
		means:
			"The uploaded archive is not a .zip file, or the download link points to the wrong file.",
		try: [
			"Download the file manually and check that it ends in .zip.",
			"Ask for the latest Download page link.",
			"Use the full mods zip if the only-new-mods archive is broken.",
		],
		send: ["The exact updater error text."],
	},
	{
		title: "The game is laggy or stutters badly",
		means:
			"The pack needs more memory than vanilla Minecraft, but too much RAM can also make performance worse.",
		try: [
			"Set maximum memory to 4096 MB if your PC has 8 GB RAM.",
			"Set maximum memory to 6144 MB if your PC has 16 GB RAM or more.",
			"Close browsers and launchers you are not using.",
			"Lower render distance before exploring new terrain.",
		],
	},
	{
		title: "My keybinds are broken or conflicting",
		means:
			"Several mods add useful keys, and Minecraft marks conflicts in red.",
		try: [
			"Open Options → Controls → Key Binds.",
			"Use the Controlling mod search box to search by key, mod, or category.",
			"Check JourneyMap, EMI, Combat Roll, backpack, and zoom keys.",
			"Change any keybinds shown in red.",
			"Prioritize map, recipe lookup, roll, and backpack access.",
		],
	},
	{
		title: "I lost my base or items",
		means:
			"This is usually recoverable. The pack has map tools and graves to reduce permanent loss.",
		try: [
			"Open JourneyMap and look for your death marker or waypoint.",
			"Use F3 coordinates if you took a screenshot.",
			"Your items should be in a grave where you died.",
			"Ask someone for help before wandering farther away.",
		],
	},
];

function ProblemCard({ problem }: { problem: Problem }) {
	return (
		<article
			style={{
				padding: "1.15rem",
				background: "var(--bg-card)",
				border: "1px solid var(--border)",
				borderRadius: "1rem",
			}}
		>
			<h2
				className="display"
				style={{ margin: "0 0 0.55rem", fontSize: "1.1rem" }}
			>
				{problem.title}
			</h2>
			<p
				style={{
					margin: "0 0 0.9rem",
					fontSize: "0.84rem",
					color: "var(--text-soft)",
					lineHeight: 1.65,
				}}
			>
				{problem.means}
			</p>

			<p className="label" style={{ marginBottom: "0.5rem" }}>
				Try this
			</p>
			<ul
				style={{
					margin: 0,
					paddingLeft: "1.1rem",
					color: "var(--text-soft)",
					fontSize: "0.82rem",
					lineHeight: 1.65,
				}}
			>
				{problem.try.map((item) => (
					<li key={item}>{item}</li>
				))}
			</ul>

			{problem.send && (
				<div
					style={{
						marginTop: "0.9rem",
						padding: "0.8rem 0.9rem",
						background: "var(--accent-dim)",
						border: "1px solid var(--accent-ring)",
						borderRadius: "0.75rem",
					}}
				>
					<p
						style={{
							margin: "0 0 0.35rem",
							fontSize: "0.78rem",
							fontWeight: 800,
							color: "var(--text)",
						}}
					>
						If you ask for help, send:
					</p>
					<ul
						style={{
							margin: 0,
							paddingLeft: "1rem",
							fontSize: "0.78rem",
							color: "var(--text-soft)",
							lineHeight: 1.6,
						}}
					>
						{problem.send.map((item) => (
							<li key={item}>{item}</li>
						))}
					</ul>
				</div>
			)}
		</article>
	);
}

function TroubleshootingPage() {
	return (
		<main
			className="page-wrap"
			style={{ paddingTop: "3rem", paddingBottom: "5rem", maxWidth: 980 }}
		>
			<section className="fade-up" style={{ marginBottom: "2rem" }}>
				<p className="label" style={{ marginBottom: "0.5rem" }}>
					Troubleshooting
				</p>
				<h1
					className="display"
					style={{
						fontSize: "clamp(1.9rem, 5vw, 3rem)",
						marginBottom: "0.75rem",
					}}
				>
					Fix the common setup problems first.
				</h1>
				<p
					style={{
						margin: 0,
						maxWidth: 660,
						fontSize: "0.95rem",
						color: "var(--text-soft)",
						lineHeight: 1.7,
					}}
				>
					Use this before digging through random Discord messages. Most issues
					come from the wrong instance, wrong Fabric version, outdated mods, or
					conflicting keybinds.
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
					[<Wrench size={18} key="wrench" />, "Minecraft 1.21.1"],
					[<Gamepad2 size={18} key="gamepad" />, "Fabric Loader 0.19.1"],
					[<FolderSearch size={18} key="folder" />, "Correct Prism instance"],
					[<Gauge size={18} key="gauge" />, "4096-6144 MB RAM"],
				].map(([icon, text]) => (
					<div
						key={String(text)}
						style={{
							display: "flex",
							alignItems: "center",
							gap: "0.65rem",
							padding: "0.9rem 1rem",
							background: "var(--bg-card)",
							border: "1px solid var(--border)",
							borderRadius: "0.85rem",
							color: "var(--text-soft)",
							fontSize: "0.84rem",
							fontWeight: 800,
						}}
					>
						<span style={{ color: "var(--accent)", display: "flex" }}>
							{icon}
						</span>
						{text}
					</div>
				))}
			</section>

			<section
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
					gap: "1rem",
				}}
			>
				{PROBLEMS.map((problem) => (
					<ProblemCard key={problem.title} problem={problem} />
				))}
			</section>

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
				<div style={{ display: "flex", gap: "0.7rem", alignItems: "start" }}>
					<AlertTriangle
						size={18}
						style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }}
					/>
					<p
						style={{
							margin: 0,
							maxWidth: 540,
							fontSize: "0.85rem",
							color: "var(--text-soft)",
							lineHeight: 1.6,
						}}
					>
						If none of this fixes it, send a screenshot of the error and the
						latest Prism log. That is usually enough to spot the problem.
					</p>
				</div>
				<div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
					<Link to="/download" className="btn-ghost">
						Downloads
					</Link>
					<Link to="/setup" className="btn-primary">
						Setup Guide
					</Link>
				</div>
			</section>
		</main>
	);
}
