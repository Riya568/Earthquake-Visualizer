# Earthquake Visualizer (React + Leaflet + Tailwind)

Casey, a geography student, needs to visualize recent global earthquake activity to understand seismic patterns. This app fetches the USGS 24-hour feed and renders earthquakes on an interactive Leaflet map with dark/light basemaps, legend, and basic status handling.

## Features
- React + Vite + Tailwind
- Leaflet map via react-leaflet
- Dark/light basemaps with a theme toggle (persisted, class-based)
- Live data from USGS GeoJSON feeds (Last Hour / 24h / 7d)
- Min Magnitude slider to filter small events
- Circle markers sized and colored by magnitude with popups
- Legend with color scale and total event count
- Loading, error and empty-result states
- Mobile-responsive full-viewport layout

## Tech
- React 18, Vite 4
- react-leaflet 4, leaflet 1.9
- Tailwind CSS 3

## Getting Started
```bash
npm install
npm run dev
```
Then open the local URL from the terminal output.

## Deploy (free + quick)
- StackBlitz: Create a new React + Vite project, paste this repo contents.
- CodeSandbox: Import folder or drag-and-drop the project files.

## Submission (fill these before submitting)
- AI Work (Level 1): [Chat link or PDF] (paste here)
- Live App (Level 2): [StackBlitz or CodeSandbox URL] (paste here)
- Code (Level 3): [GitHub repo or zip upload link] (paste here)

## Data Source
- USGS Earthquake API (hour/day/week feeds)

## Notes
- Map tiles
  - Light: OpenStreetMap tiles
  - Dark: Stadia Maps Alidade Dark
- Proper attributions are included for OSM and Stadia tiles.
  - OSM: "© OpenStreetMap contributors"
  - Stadia/OMT: "© Stadia Maps, © OpenMapTiles, © OpenStreetMap contributors"

## Project Structure
```
src/
  components/
    MapView.jsx
    ThemeToggle.jsx
    Legend.jsx
  App.jsx
  main.jsx
  index.css
index.html
package.json
postcss.config.js
tailwind.config.js
```

## Challenge Mapping
- Framework: React (meets requirement)
- Styling: Tailwind CSS (meets requirement)
- Data Fetching: USGS public API, no auth (meets requirement)
- State: React useState/useEffect (meets requirement)
- Mapping: Leaflet via react-leaflet (meets requirement)
- UX: Responsive map, theme toggle, legend, period/min-mag controls (addressed)
- Error Handling: Loading, error, and empty states (addressed)
- Code Quality: Simple, readable components (addressed)

## Troubleshooting
- If styles look plain, ensure these files exist at project root: `tailwind.config.js`, `postcss.config.js`.
- `src/main.jsx` must import `./index.css` (it does).
- After any dependency change, stop and rerun `npm run dev` and hard-refresh (Ctrl+Shift+R).

## Working with AI
Share your ChatGPT session link for Level 1 credit.

## License
MIT
