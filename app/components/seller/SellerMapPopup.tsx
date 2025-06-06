import { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { Icon } from 'leaflet';
import Image from 'next/image';

// Orange pin för ny skylt
const orangeIcon = new Icon({
  iconUrl: '/pinbi2.png',
  iconSize: [44, 54],
  iconAnchor: [22, 54],
  popupAnchor: [0, -54],
  shadowUrl: undefined,
});

// Grå pin för befintliga skyltar
const grayIcon = new Icon({
  iconUrl: '/pinbi2.png',
  iconSize: [36, 44],
  iconAnchor: [18, 44],
  popupAnchor: [0, -44],
  shadowUrl: undefined,
});

interface Billboard {
  id: string;
  title: string;
  imageUrls: string[];
  latitude: number | null;
  longitude: number | null;
  price: number;
  location: string;
}

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
    >
      <Popup>
        <div className="text-center">
          <p className="font-semibold text-orange-600">Din nya skylt</p>
          <p className="text-sm text-gray-600">Dra för att flytta</p>
        </div>
      </Popup>
    </Marker>
  );
}

function SearchBox({ onSelect, map }: { onSelect: (lat: number, lng: number) => void, map: L.Map | null }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ display_name: string, lat: string, lon: string }[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [searching, setSearching] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query) return;
    
    setSearching(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=se`);
      const data = await res.json();
      setResults(data);
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setSearching(false);
    }
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
    <div className="relative">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
          placeholder="Sök adress eller stad i Sverige..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button 
          type="submit" 
          disabled={searching}
          className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium shadow hover:shadow-lg transition-all duration-200 disabled:opacity-50"
        >
          {searching ? 'Söker...' : 'Sök'}
        </button>
      </form>
      {showResults && results.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-10 mt-2 max-h-64 overflow-auto">
          {results.map((r, i) => (
            <li
              key={i}
              className="px-4 py-3 cursor-pointer hover:bg-orange-50 transition-colors text-sm border-b border-gray-100 last:border-b-0"
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
  const initial = lat && lng ? { lat: parseFloat(lat), lng: parseFloat(lng) } : { lat: 59.3293, lng: 18.0686 };
  const [position, setPosition] = useState<{ lat: number, lng: number }>(initial);
  const [billboards, setBillboards] = useState<Billboard[]>([]);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // Hämta befintliga skyltar
    const fetchBillboards = async () => {
      try {
        const response = await fetch('/api/billboards');
        const data = await response.json();
        const validBillboards = data.filter((b: Billboard) => b.latitude && b.longitude);
        setBillboards(validBillboards);
      } catch (error) {
        console.error('Error fetching billboards:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBillboards();
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView([position.lat, position.lng], position.lat === 59.3293 && position.lng === 18.0686 ? 7 : 13);
    }
  }, [position]);

  function handleSelect(lat: number, lng: number) {
    setPosition({ lat, lng });
    if (mapRef.current) mapRef.current.setView([lat, lng], 13);
  }

  return (
    <div className="w-full h-full flex flex-col gap-4 p-4">
      <SearchBox onSelect={handleSelect} map={mapRef.current} />
      
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-sm">
        <p className="text-orange-900 font-medium mb-1">💡 Tips:</p>
        <p className="text-orange-800">Klicka på kartan eller dra den orange markören för att placera din skylt. Grå markörer visar befintliga skyltar.</p>
      </div>
      
      <div className="flex-1 min-h-[400px] rounded-2xl overflow-hidden shadow-lg">
        <MapContainer
          center={[position.lat, position.lng]}
          zoom={position.lat === 59.3293 && position.lng === 18.0686 ? 7 : 13}
          scrollWheelZoom={true}
          style={{ width: '100%', height: '100%' }}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Befintliga skyltar */}
          {!loading && billboards.map(billboard => (
            <Marker
              key={billboard.id}
              position={[billboard.latitude!, billboard.longitude!]}
              icon={grayIcon}
            >
              <Popup>
                <div className="min-w-[200px]">
                  {billboard.imageUrls?.[0] && (
                    <div className="relative w-full h-32 mb-2">
                      <Image
                        src={billboard.imageUrls[0]}
                        alt={billboard.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  )}
                  <h3 className="font-semibold text-gray-900">{billboard.title}</h3>
                  <p className="text-sm text-gray-600">{billboard.location}</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">{billboard.price.toLocaleString()} kr/vecka</p>
                </div>
              </Popup>
            </Marker>
          ))}
          
          {/* Ny skylt */}
          <DraggableMarker position={position} setPosition={setPosition} />
        </MapContainer>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Position: {position.lat.toFixed(4)}, {position.lng.toFixed(4)}
        </div>
        <button
          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
          onClick={() => onSelect(position.lat.toFixed(6), position.lng.toFixed(6))}
        >
          Använd denna position
        </button>
      </div>
    </div>
  );
} 