"use client";
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';
import Image from 'next/image';

// Custom orange pin icon
const orangeIcon = new L.Icon({
  iconUrl: '/pinbi2.png',
  iconSize: [44, 54],
  iconAnchor: [22, 54],
  popupAnchor: [0, -54],
  shadowUrl: undefined,
});

interface Billboard {
  id: string;
  title: string;
  imageUrls: string[];
  latitude: number | null;
  longitude: number | null;
  price: number;
}

function MapAutoFit({ billboards, focusBillboardId }: { billboards: Billboard[]; focusBillboardId?: string }) {
  const map = useMap();
  useEffect(() => {
    const valid = billboards.filter(b => b.latitude && b.longitude);
    if (focusBillboardId) {
      const focus = valid.find(b => b.id === focusBillboardId);
      if (focus) {
        map.setView([focus.latitude!, focus.longitude!], 14, { animate: true });
        return;
      }
    }
    if (valid.length > 0) {
      const bounds = L.latLngBounds(valid.map(b => [b.latitude!, b.longitude!]));
      map.fitBounds(bounds, { padding: [60, 60] });
    }
  }, [billboards, map, focusBillboardId]);
  return null;
}

export default function BillboardMap({ focusBillboardId, height }: { focusBillboardId?: string; height?: string }) {
  const [billboards, setBillboards] = useState<Billboard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/billboards')
      .then(res => res.json())
      .then(data => setBillboards(data.filter((b: Billboard) => b.latitude !== null && b.longitude !== null)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={`w-full ${height || 'h-[500px]'} rounded-3xl shadow-2xl overflow-hidden border border-[#ff6b00]/20 relative`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
          <div className="w-12 h-12 border-4 border-[#ff6b00] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <MapContainer
        center={[59.3293, 18.0686]} // Stockholm default
        zoom={6}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
        style={{ minHeight: 200 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapAutoFit billboards={billboards} focusBillboardId={focusBillboardId} />
        {billboards.map(billboard => (
          <Marker
            key={billboard.id}
            position={[billboard.latitude!, billboard.longitude!]}
            icon={orangeIcon}
          >
            <Popup>
              <div className="flex flex-col items-center min-w-[180px]">
                <div className="relative w-32 h-20 mb-2">
                  <Image
                    src={billboard.imageUrls?.[0] || '/billboards/bb1.png'}
                    alt={billboard.title}
                    fill
                    className="object-cover rounded-xl border border-[#ff6b00]/30"
                    sizes="128px"
                    quality={75}
                    loading="lazy"
                  />
                </div>
                <div className="font-bold text-[#ff6b00] text-base mb-1 text-center">{billboard.title}</div>
                <div className="text-sm text-gray-700 mb-2">{billboard.price} kr/mån</div>
                <Link
                  href={`/objekt/${billboard.id}`}
                  className="px-3 py-1 rounded-full bg-[#ff6b00] text-white text-xs font-semibold hover:bg-[#ff8c1a] transition-colors"
                >
                  Visa annons
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
} 