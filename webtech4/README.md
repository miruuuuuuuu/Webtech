# Meridian University — Navigation System

A React.js menu navigation system for a university website, built with
React Router, component composition, props, and event handling.

## Structure

- `src/menuData.js` — single source of truth for menu labels and paths
- `src/components/Navbar.js` — top navigation bar, renders `NavItem`s
- `src/components/NavItem.js` — one menu entry, handles dropdown open/close
- `src/components/PageLayout.js` — shared page header layout
- `src/components/SectionLinks.js` — grid of link tiles (props-driven)
- `src/pages/` — one file per route, grouped into subfolders for
  Academics, Admissions, and Research (which have dropdown children)
- `src/App.js` — `BrowserRouter` + `Routes`, one `Route` per URL

## Routing

Every menu and dropdown item has a matching URL:

- `/about`
- `/academics`, `/academics/undergraduate`, `/academics/postgraduate`, `/academics/phd`
- `/admissions`, `/admissions/eligibility`, `/admissions/application-process`, `/admissions/important-dates`
- `/research`, `/research/areas`, `/research/publications`
- `/campus-life`
- `/placements`
- `/contact`

## Design

Mauve and grey palette only, defined as CSS variables in `src/index.css`.
Glassmorphism (blurred translucent panels) is used for the navbar,
dropdowns, and content cards. No extra colours, no rounded "liquid" shapes —
borders are thin and corners are minimally rounded (4px) for a clean, flat
appearance with generous whitespace.

## Run locally

```bash
npm install
npm start
```

Then open http://localhost:3000

## Build for production

```bash
npm run build
```
