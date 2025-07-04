'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Billboard } from '../types/billboard';

interface BillboardMapWrapperProps {
  billboards: Billboard[];
  selectedBillboard: Billboard | null;
  onSelectBillboard: (billboard: Billboard | null) => void;
  onClose: () => void;
}

export default function BillboardMapWrapper({ billboards, selectedBillboard, onSelectBillboard, onClose }: BillboardMapWrapperProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([62.0, 16.5], 5);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current);
    }

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    billboards.forEach(billboard => {
      // Använd lat/lng om de finns, annars latitude/longitude
      const lat = billboard.lat ?? billboard.latitude;
      const lng = billboard.lng ?? billboard.longitude;
      if (typeof lat === 'number' && typeof lng === 'number') {
        const marker = L.marker([lat, lng])
          .addTo(mapRef.current!)
          .bindPopup(`
            <div class="p-2">
              <h3 class="font-bold">${billboard.title}</h3>
              <p class="text-sm text-gray-600">${billboard.location}</p>
            </div>
          `);
        
        marker.on('click', () => {
          onSelectBillboard(billboard);
        });
        
        markersRef.current.push(marker);
      }
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [billboards, onSelectBillboard]);

  return <div id="map" className="w-full h-full" />;
} 