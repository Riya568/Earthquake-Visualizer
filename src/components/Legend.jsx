export default function Legend({ earthquakes }) {
  const bins = {
    small: earthquakes.filter((e) => (e.properties?.mag ?? 0) < 2.5).length,
    medium: earthquakes.filter((e) => {
      const m = e.properties?.mag ?? 0;
      return m >= 2.5 && m < 5;
    }).length,
    large: earthquakes.filter((e) => (e.properties?.mag ?? 0) >= 5).length
  };

  return (
    <div className="legend-card pointer-events-auto rounded-md bg-white/90 p-3 text-sm shadow md:text-base">
      <div className="font-semibold mb-2">Legend</div>
      <div className="space-y-1">
        <div className="flex items-center gap-2"><span className="inline-block h-3 w-3 rounded-full" style={{background:'#22c55e'}}></span><span className="text-gray-700">Mag &lt; 3</span></div>
        <div className="flex items-center gap-2"><span className="inline-block h-3 w-3 rounded-full" style={{background:'#fde047'}}></span><span className="text-gray-700">3 – 3.9</span></div>
        <div className="flex items-center gap-2"><span className="inline-block h-3 w-3 rounded-full" style={{background:'#f97316'}}></span><span className="text-gray-700">4 – 4.9</span></div>
        <div className="flex items-center gap-2"><span className="inline-block h-3 w-3 rounded-full" style={{background:'#dc2626'}}></span><span className="text-gray-700">5 – 5.9</span></div>
        <div className="flex items-center gap-2"><span className="inline-block h-3 w-3 rounded-full" style={{background:'#b91c1c'}}></span><span className="text-gray-700">≥ 6</span></div>
      </div>
      <div className="mt-2 text-xs text-gray-600">Source: USGS</div>
      <div className="mt-1 text-xs text-gray-600">Events: {earthquakes.length}</div>
    </div>
  );
}


