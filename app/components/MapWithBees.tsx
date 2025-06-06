'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Billboard } from '../types/billboard';

// Skapa en custom bi-ikon
const beeIcon = new L.Icon({
  iconUrl: '/bi.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
  className: 'bee-marker',
});

const blackBeeIcon = new L.Icon({
  iconUrl: '/bi-black.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
  className: 'bee-marker',
});

interface MapWithBeesProps {
  billboards?: Billboard[];
  initialCenter?: [number, number];
  initialZoom?: number;
}

export default function MapWithBees({ 
  billboards = [], 
  initialCenter = [59.3325806, 18.0649031], // Drottninggatan 12, Stockholm
  initialZoom = 13 
}: MapWithBeesProps) {
  return (
    <MapContainer
      center={initialCenter}
      zoom={initialZoom}
      scrollWheelZoom={true}
      style={{ width: '100%', height: '100%', borderRadius: '1.5rem' }}
      className="leaflet-bee-map"
      dragging={true}
      doubleClickZoom={true}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      {billboards.map((b) =>
        b.lat && b.lng ? (
          <Marker key={b.id} position={[b.lat, b.lng]} icon={b.isOffice ? blackBeeIcon : beeIcon}>
            <Popup>
              <div className="min-w-[180px] p-2 flex flex-col items-center text-center">
                {b.imageUrls && b.imageUrls[0] && (
                  <div className="relative w-28 h-20 mb-2 flex-shrink-0">
                    <img
                      src={b.imageUrls[0]}
                      alt={b.title ?? ''}
                      className="object-cover rounded-lg border border-[#ff6b00]/30 w-full h-full"
                      style={{ maxHeight: 80, objectFit: 'cover' }}
                    />
                  </div>
                )}
                <div className="font-bold text-[#ff6b00] text-base mb-1 mt-1">{String(b.title ?? '')}</div>
                <div className="text-xs text-gray-600 mb-3">{String(b.location ?? '')}</div>
                <a
                  href={`/objekt/${b.id}`}
                  className="px-4 py-2 rounded-full bg-[#ff6b00] text-white text-xs font-semibold hover:bg-[#ff8c1a] transition-colors shadow"
                  style={{ color: '#fff', textDecoration: 'none', fontWeight: 700 }}
                >
                  Visa annons
                </a>
              </div>
            </Popup>
          </Marker>
        ) : null
      )}
    </MapContainer>
  );
} 