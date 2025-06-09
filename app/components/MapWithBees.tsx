'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Billboard } from '../types/billboard';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

// Skapa en custom bi-ikon
const beeIcon = new L.Icon({
  iconUrl: '/bi.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
  className: 'bee-marker',
});

// Kontorsikon: svart bi
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
  onClose?: () => void;
  showCloseButton?: boolean;
}

export default function MapWithBees({ 
  billboards = [], 
  initialCenter = [59.3325806, 18.0649031], // Drottninggatan 12, Stockholm
  initialZoom = 13,
  onClose,
  showCloseButton = false
}: MapWithBeesProps) {
  return (
    <div className="relative w-full h-full">
      {showCloseButton && onClose && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-4 right-4 z-[1000] p-2 sm:p-3 bg-black text-white rounded-full shadow-2xl border-2 border-white hover:bg-gray-900 transition-colors"
          style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.25)' }}
        >
          <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>
      )}
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
                  <div className="text-xs text-gray-600 mb-1">{String(b.location ?? '')}</div>
                  {b.traffic && (
                    <div className="text-xs text-gray-600 mb-1">
                      Synlig för {b.traffic.toLocaleString()} bilar/dygn
                    </div>
                  )}
                  <div className="text-sm font-bold text-gray-900 mb-3">
                    {b.price.toLocaleString()} kr/månad
                  </div>
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
    </div>
  );
} 