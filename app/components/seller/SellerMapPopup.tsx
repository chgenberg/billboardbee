import { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { Icon, Map as LeafletMap } from 'leaflet';

// Orange pin från leaflet-color-markers
const orangeIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

function DraggableMarker({ position, setPosition }: { position: { lat: number; lng: number }, setPosition: (pos: { lat: number, lng: number }) => void }) {
  useMapEvents({
    click(e) {
      setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return (
    <Marker
      position={[position.lat, position.lng]}
      icon={orangeIcon}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const marker = e.target;
          const pos = marker.getLatLng();
          setPosition({ lat: pos.lat, lng: pos.lng });
        },
      }}
    />
  );
}

function SearchBox({ onSelect, map }: { onSelect: (lat: number, lng: number) => void, map: L.Map | null }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ display_name: string, lat: string, lon: string }[]>([]);
  const [showResults, setShowResults] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query) return;
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data);
    setShowResults(true);
  }

  function handleSelectResult(lat: string, lon: string, displayName: string) {
    const latNum = parseFloat(lat);
    const lonNum = parseFloat(lon);
    onSelect(latNum, lonNum);
    setShowResults(false);
    setQuery(displayName);
    if (map) map.setView([latNum, lonNum], 13);
  }

  return (
    <div className="mb-2 relative">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          className="w-full rounded-lg border border-[#bf7100]/30 bg-[#f6f5f3] px-3 py-1.5 text-[#222] placeholder:text-[#bf7100]/60 focus:outline-none focus:ring-2 focus:ring-[#bf7100]/40"
          placeholder="Sök adress eller stad..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button type="submit" className="px-3 py-1.5 rounded-lg bg-[#bf7100] text-white font-bold hover:bg-[#a65f00] transition">Sök</button>
      </form>
      {showResults && results.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white border border-[#bf7100]/20 rounded-lg shadow z-10 mt-1 max-h-48 overflow-auto">
          {results.map((r, i) => (
            <li
              key={i}
              className="px-3 py-2 cursor-pointer hover:bg-[#fff3e0] text-sm"
              onClick={() => handleSelectResult(r.lat, r.lon, r.display_name)}
            >
              {r.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function SellerMapPopup({ lat, lng, onSelect }: { lat?: string; lng?: string; onSelect: (lat: string, lng: string) => void }) {
  const initial = lat && lng ? { lat: parseFloat(lat), lng: parseFloat(lng) } : { lat: 62.0, lng: 16.5 };
  const [position, setPosition] = useState<{ lat: number, lng: number }>(initial);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView([position.lat, position.lng], position.lat === 62.0 && position.lng === 16.5 ? 5 : 13);
    }
  }, [position]);

  function handleSelect(lat: number, lng: number) {
    setPosition({ lat, lng });
    if (mapRef.current) mapRef.current.setView([lat, lng], 13);
  }

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <SearchBox onSelect={handleSelect} map={mapRef.current} />
      <div className="text-[#bf7100] text-sm font-semibold mb-1 text-center">Klicka på kartan eller dra nålen för att välja position</div>
      <div className="flex-1 min-h-[200px]">
        <MapContainer
          center={[position.lat, position.lng]}
          zoom={position.lat === 62.0 && position.lng === 16.5 ? 5 : 13}
          scrollWheelZoom={true}
          style={{ width: '100%', height: '100%' }}
          className="rounded-xl"
          ref={mapRef as any}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          <DraggableMarker position={position} setPosition={setPosition} />
        </MapContainer>
      </div>
      <button
        className="mt-4 mx-auto px-6 py-2 rounded-full bg-[#bf7100] text-white font-bold text-base shadow border border-[#bf7100] tracking-wide font-avenir hover:bg-white hover:text-[#bf7100] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#bf7100]/40"
        style={{ fontFamily: 'Avenir Next, Helvetica Neue, Helvetica, Arial, sans-serif' }}
        onClick={() => onSelect(position.lat.toFixed(6), position.lng.toFixed(6))}
      >
        KLAR
      </button>
    </div>
  );
} 