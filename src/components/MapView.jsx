import { MapContainer, TileLayer, Popup, CircleMarker } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Legend from "./Legend";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

export default function MapView({ theme, period = "day", minMag = 0, refreshMs = 0, onUpdated }) {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        setLoading(true);
        setError("");
        const feed =
          period === "hour"
            ? "all_hour"
            : period === "week"
            ? "all_week"
            : "all_day";
        const res = await fetch(
          `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${feed}.geojson`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error(`Network error: ${res.status}`);
        const data = await res.json();
        setEarthquakes(Array.isArray(data.features) ? data.features : []);
        if (onUpdated) {
          const ts = new Date().toLocaleTimeString();
          onUpdated(ts);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Failed to load earthquakes. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [period]);

  // Auto refresh interval
  useEffect(() => {
    if (!refreshMs) return; // Off
    let cancelled = false;
    let previousIds = new Set(earthquakes.map((e) => e.id));
    const id = setInterval(async () => {
      try {
        const feed =
          period === "hour" ? "all_hour" : period === "week" ? "all_week" : "all_day";
        const res = await fetch(
          `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${feed}.geojson`
        );
        if (!res.ok) return;
        const data = await res.json();
        const newFeatures = Array.isArray(data.features) ? data.features : [];
        const newIds = new Set(newFeatures.map((e) => e.id));
        let newCount = 0;
        for (const id of newIds) if (!previousIds.has(id)) newCount++;
        previousIds = newIds;
        setEarthquakes(newFeatures);
        if (onUpdated) onUpdated(new Date().toLocaleTimeString());
        if (newCount > 0) {
          setToast(`${newCount} new earthquake${newCount > 1 ? 's' : ''}`);
          setTimeout(() => setToast(""), 3000);
        }
      } catch {}
    }, refreshMs);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshMs, period]);

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: "100%", width: "100%" }}
      >
      <TileLayer
        url={
          theme === "dark"
            ? "https://tiles.stadiamaps.com/tiles/alidade_dark/{z}/{x}/{y}{r}.png"
            : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        }
        attribution={
          theme === "dark"
            ? '&copy; <a href="https://www.stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
      />

      {earthquakes
        .filter((eq) => (eq.properties?.mag ?? 0) >= minMag)
        .map((eq) => {
          const [lng, lat] = eq.geometry.coordinates;
          const mag = eq.properties?.mag ?? 0;
          const color =
            mag >= 6 ? "#b91c1c" : mag >= 5 ? "#dc2626" : mag >= 4 ? "#f97316" : mag >= 3 ? "#fde047" : "#22c55e";
          const radius = Math.max(4, mag * 2.5);
          return (
            <CircleMarker key={eq.id} center={[lat, lng]} radius={radius} pathOptions={{ color, fillColor: color, fillOpacity: 0.7 }}>
              <Popup>
                <strong>{eq.properties.place}</strong>
                <br />
                Magnitude: {mag}
                <br />
                Time: {new Date(eq.properties.time).toLocaleString()}
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
      {loading && (
        <div className="absolute inset-0 z-[401] grid place-items-center bg-black/20">
          <div className="rounded-md bg-white px-4 py-2 text-sm text-gray-800 shadow">Loading earthquakes…</div>
        </div>
      )}
      {!loading && error && (
        <div className="absolute inset-x-0 top-3 z-[401] mx-auto w-fit rounded-md bg-red-600 px-3 py-2 text-white shadow">{error}</div>
      )}
      {!loading && !error && earthquakes.length === 0 && (
        <div className="absolute inset-x-0 top-3 z-[401] mx-auto w-fit rounded-md bg-yellow-500 px-3 py-2 text-white shadow">No recent earthquakes found.</div>
      )}
      {toast && (
        <div className="absolute inset-x-0 top-16 z-[401] mx-auto w-fit rounded-md bg-emerald-600 px-3 py-2 text-white shadow">{toast}</div>
      )}
      <div className="pointer-events-none absolute right-3 top-3 z-[400]">
        <Legend earthquakes={earthquakes} />
      </div>
    </div>
  );
}
