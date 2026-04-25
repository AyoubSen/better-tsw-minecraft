# TSW Fabric Guide

A small TanStack Start app for the TSW Minecraft Fabric server. It gives players a clear place to find setup instructions, mod explanations, beginner guidance, directed mod guides, and changelog notes.

The app is intentionally content-heavy and low-backend: most player-facing information lives in typed data files under `src/data`.

## Tech Stack

- TanStack Start / TanStack Router
- React 19
- Vite
- Tailwind CSS 4 for base tooling, with most current UI styled through CSS variables and component styles
- Biome for formatting and linting
- Fuse.js for local mod search

## Local Development

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

The app runs on `http://localhost:3000`.

## Verification

Run before committing meaningful changes:

```bash
npm run check
npm run build
```

Other available scripts:

```bash
npm run format
npm run lint
npm run test
npm run preview
```

`npm run test` is configured but the project currently has little/no test coverage. Treat `check` and `build` as the required baseline.

## App Routes

- `/` - homepage and category overview
- `/mods` - searchable/filterable mod browser
- `/guide` - new player and modded-player guide
- `/setup` - Prism Launcher setup guide
- `/download` - hosted mod bundle and optional Windows updater script
- `/directed-guides` - one-guide-per-mod/player-goal browser
- `/changelog` - modpack change notes
- `/about` - placeholder/about page
- `/sim` - archived route that redirects to directed guides

## Editing Content

Most updates should happen in these files:

- `src/data/mods.ts` - mod list, categories, descriptions, links, newbie notes
- `src/data/directedGuides.ts` - directed player guides and searchable terms
- `src/data/changelog.ts` - changelog entries
- `src/routes/guide.tsx` - broader beginner/modded guide copy
- `src/routes/setup.tsx` - Prism setup guide copy

When adding or editing mods:

- Keep `id` values unique and stable.
- Use an existing category from `CATEGORY_ORDER` unless you also update category metadata.
- Add search-friendly language to descriptions/features, not just mod names.
- Include Modrinth/CurseForge slugs when available.
- Mark player-facing mods separately from technical/library dependencies.

When adding directed guides:

- Write for player tasks, not just mod encyclopaedia entries.
- Include likely search terms such as item names, problems, and aliases.
- Keep guides short enough to read while playing.
- Prefer concrete first actions: "press J", "craft a backpack", "activate a waystone".

## URL Sharing

The mod browser and directed guides support shareable search URLs:

- `/mods?category=storage`
- `/mods?q=backpack`
- `/directed-guides?q=waystones`
- `/directed-guides?category=Exploration`

Invalid categories are ignored and fall back to the default view.

## Styling Notes

Global tokens and shared utility classes live in `src/styles.css`.

The current UI uses:

- CSS variables for theme colors
- dark mode by default
- a mobile header menu below tablet width
- inline component styles in several older pages

Future cleanup should gradually extract repeated inline patterns into reusable components/classes instead of adding more one-off style objects.

## Privacy / Password Gate

`src/components/PasswordGate.tsx` is currently a passthrough. The older client-side gate is commented out.

If this site needs real privacy, enforce it at the hosting/server level. A client-side password gate only hides casual access and should not be treated as security.

## Hosted Mod Bundle

The public download manifest lives at `public/downloads/manifest.json`.

When the mod bundle changes:

1. Upload the new zip to the file host.
2. Update `zipUrl`, `version`, `updatedAt`, and `notes` in `public/downloads/manifest.json`.
3. Run `npm run check` and `npm run build`.

The `/download` page imports this manifest directly, so it updates from the same source. The updater script has a built-in fallback copy of the current manifest values. Once the site has a stable public URL, set `$ManifestUrl` in `public/downloads/update-tsw-fabric.ps1` to the full URL for `/downloads/manifest.json` so the script can fetch future changes automatically.

Do not commit UploadThing API tokens. The updater and app only need the public file URL for downloads. UploadThing tokens are only for server-side upload/list/delete operations.

## Deployment

Build output is generated with:

```bash
npm run build
```

The app uses TanStack Start/Nitro output under `.output`. Confirm the target hosting provider supports the generated server output, or adapt the deployment preset in `vite.config.ts` / Nitro config as needed.

## Current Improvement Priorities

1. Replace placeholder/about content.
2. Add a First Session Checklist for players.
3. Add a keybinds/troubleshooting guide.
4. Continue reducing duplicated inline styling.
5. Add lightweight content validation for duplicate IDs, invalid categories, and missing links.
