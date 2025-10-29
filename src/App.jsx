import { useEffect, useState } from "react";
import MapView from "./components/MapView";
import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  const [theme, setTheme] = useState("light");
  const [period, setPeriod] = useState("day"); // hour | day | week
  const [minMag, setMinMag] = useState(0);
  const [refreshMs, setRefreshMs] = useState(60000); // Off=0, 15s, 30s, 60s
  const [lastUpdated, setLastUpdated] = useState("");

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") {
      setTheme(stored);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme("dark");
    }
  }, []);

  // Apply theme to <html> class and persist
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="h-screen w-full flex flex-col bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-white">
      <header className="app-header flex items-center justify-between gap-4 border-b border-gray-200 px-4 py-3 dark:border-gray-800 bg-white dark:bg-gray-900">
        <h1 className="text-xl font-bold">🌍 Earthquake Visualizer</h1>
        <div className="controls flex items-center gap-3">
          <div className="hidden sm:block text-sm opacity-80">{lastUpdated ? `Updated: ${lastUpdated}` : ''}</div>
          <div className="flex items-center gap-2">
            <label className="text-sm">Period</label>
            <select
              className="rounded border px-2 py-1 text-sm bg-white dark:bg-gray-800 dark:border-gray-700"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            >
              <option value="hour">Last Hour</option>
              <option value="day">Last 24h</option>
              <option value="week">Last 7d</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm">Auto</label>
            <select
              className="rounded border px-2 py-1 text-sm bg-white dark:bg-gray-800 dark:border-gray-700"
              value={refreshMs}
              onChange={(e) => setRefreshMs(Number(e.target.value))}
            >
              <option value={0}>Off</option>
              <option value={15000}>15s</option>
              <option value={30000}>30s</option>
              <option value={60000}>60s</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm">Min Mag</label>
            <input
              type="range"
              min={0}
              max={7}
              step={0.1}
              value={minMag}
              onChange={(e) => setMinMag(Number(e.target.value))}
            />
            <span className="w-10 text-right text-sm tabular-nums">{minMag.toFixed(1)}</span>
          </div>
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
      </header>
      <div className="flex-1">
        <MapView
          theme={theme}
          period={period}
          minMag={minMag}
          refreshMs={refreshMs}
          onUpdated={(timestamp) => setLastUpdated(timestamp)}
        />
      </div>
    </div>
  );
}
