'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Skapa en custom bi-ikon
const beeIcon = new L.Icon({
  iconUrl: '/bi.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
  className: 'bee-marker',
});

export default function MapWithBees({ billboards = [] }: { billboards?: any[] }) {
  // Default center över Sverige
  const center: [number, number] = [62.0, 16.5];
  return (
    <MapContainer
      center={center}
      zoom={5}
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
          <Marker key={b.id} position={[b.lat, b.lng]} icon={beeIcon}>
            <Tooltip direction="top" offset={[0, -30]} opacity={1} permanent={false} className="bee-tooltip">
              <div className="font-bold text-[#222] text-sm">{b.title}</div>
              <div className="text-xs text-gray-600">{b.location}</div>
            </Tooltip>
          </Marker>
        ) : null
      )}
    </MapContainer>
  );
} 