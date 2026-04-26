import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
	{ to: "/", label: "Home", exact: true },
	{ to: "/setup", label: "Setup" },
	{ to: "/download", label: "Download" },
	{ to: "/troubleshooting", label: "Help" },
	{ to: "/checklist", label: "Checklist" },
	{ to: "/guide", label: "Guide" },
	{ to: "/directed-guides", label: "Directed Guides" },
	{ to: "/mods", label: "Mods" },
	{ to: "/changelog", label: "Changelog" },
] as const;

export default function Header() {
	const [menuOpen, setMenuOpen] = useState(false);

	function closeMenu() {
		setMenuOpen(false);
	}

	return (
		<header
			style={{
				position: "sticky",
				top: 0,
				zIndex: 50,
				background: "var(--header-bg)",
				borderBottom: "1px solid var(--border)",
				backdropFilter: "blur(12px)",
				WebkitBackdropFilter: "blur(12px)",
			}}
		>
			<div
				className="page-wrap site-header-inner"
				style={{
					display: "flex",
					alignItems: "center",
					gap: "2rem",
					padding: "0.875rem 0",
				}}
			>
				{/* Brand */}
				<Link
					to="/"
					style={{
						display: "flex",
						alignItems: "center",
						gap: "0.5rem",
						textDecoration: "none",
						color: "var(--text)",
						fontWeight: 700,
						fontSize: "0.9rem",
						letterSpacing: "-0.01em",
						flexShrink: 0,
					}}
				>
					<span
						style={{
							width: 8,
							height: 8,
							borderRadius: "50%",
							background: "var(--accent)",
							boxShadow: "0 0 8px var(--accent)",
							flexShrink: 0,
						}}
					/>
					TSW Minecraft
				</Link>

				{/* Nav */}
				<nav
					className="site-nav-desktop"
					style={{
						display: "flex",
						alignItems: "center",
						gap: "1.5rem",
						flex: 1,
					}}
					aria-label="Primary navigation"
				>
					{NAV_LINKS.map((link) => (
						<Link
							key={link.to}
							to={link.to}
							activeOptions={link.exact ? { exact: true } : undefined}
							className="nav-link"
							activeProps={{ className: "nav-link active" }}
						>
							{link.label}
						</Link>
					))}
				</nav>

				{/* Actions */}
				<div className="site-header-actions">
					<ThemeToggle />
					<button
						type="button"
						className="mobile-menu-button"
						aria-label={
							menuOpen ? "Close navigation menu" : "Open navigation menu"
						}
						aria-expanded={menuOpen}
						aria-controls="mobile-navigation"
						onClick={() => setMenuOpen((open) => !open)}
					>
						{menuOpen ? <X size={18} /> : <Menu size={18} />}
					</button>
				</div>
			</div>

			<nav
				id="mobile-navigation"
				className={`mobile-nav ${menuOpen ? "open" : ""}`}
				aria-label="Mobile navigation"
			>
				<div className="page-wrap mobile-nav-panel">
					{NAV_LINKS.map((link) => (
						<Link
							key={link.to}
							to={link.to}
							activeOptions={link.exact ? { exact: true } : undefined}
							className="mobile-nav-link"
							activeProps={{ className: "mobile-nav-link active" }}
							onClick={closeMenu}
						>
							{link.label}
						</Link>
					))}
				</div>
			</nav>
		</header>
	);
}
