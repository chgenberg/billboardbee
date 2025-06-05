"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import Link from "next/link";

const BillboardMapWrapper = dynamic(() => import("@/app/components/BillboardMapWrapper"), { ssr: false });

interface Billboard {
  id: string;
  title: string;
  description: string;
  imageUrls: string[];
  location: string;
  price: number;
  status: string;
  size: string | null;
  type: string | null;
  traffic: number | null;
  region: string | null;
  latitude: number;
  longitude: number;
  address: string | null;
}

export default function BillboardPage() {
  const params = useParams();
  const [billboard, setBillboard] = useState<Billboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    const fetchBillboard = async () => {
      try {
        const response = await fetch('/api/billboards');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        const billboards = Array.isArray(data) ? data : data.billboards || [];
        const found = billboards.find((b: Billboard) => b.id === params.id);
        if (found) {
          setBillboard(found);
        }
      } catch (error) {
        console.error('Error fetching billboard:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBillboard();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
      </div>
    );
  }

  if (!billboard) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-gray-900 mb-4">Skylt hittades inte</h1>
          <Link href="/lediga-skyltar" className="text-gray-600 hover:text-gray-900">
            ← Tillbaka till alla skyltar
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/lediga-skyltar" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Tillbaka</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 cursor-zoom-in"
              onClick={() => setShowImageModal(true)}
            >
              <Image
                src={billboard.imageUrls[mainImage] || '/billboards/bb1.png'}
                alt={billboard.title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
            
            {billboard.imageUrls.length > 1 && (
              <div className="flex gap-3 mt-4">
                {billboard.imageUrls.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden transition-all ${
                      mainImage === index ? 'ring-2 ring-gray-900' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-light text-gray-900 mb-2">{billboard.title}</h1>
              <p className="text-gray-600">{billboard.location}</p>
            </div>

            {/* Price */}
            <div className="mb-8">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-light text-gray-900">{billboard.price.toLocaleString()}</span>
                <span className="text-lg text-gray-500">kr/månad</span>
              </div>
            </div>

            {/* Specs */}
            <div className="space-y-6 mb-8">
              {billboard.type && (
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Typ</span>
                  <span className="font-medium text-gray-900">{billboard.type}</span>
                </div>
              )}
              {billboard.size && (
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Storlek</span>
                  <span className="font-medium text-gray-900">{billboard.size}</span>
                </div>
              )}
              {billboard.traffic && (
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Trafik</span>
                  <span className="font-medium text-gray-900">{billboard.traffic.toLocaleString()} visningar/dag</span>
                </div>
              )}
              {billboard.region && (
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Region</span>
                  <span className="font-medium text-gray-900">{billboard.region}</span>
                </div>
              )}
            </div>

            {/* Description */}
            {billboard.description && (
              <div className="mb-8">
                <h2 className="text-lg font-medium text-gray-900 mb-3">Beskrivning</h2>
                <p className="text-gray-600 leading-relaxed">{billboard.description}</p>
              </div>
            )}

            {/* CTA */}
            <div className="space-y-3">
              <button className="w-full py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors duration-200 font-medium">
                Kontakta för bokning
              </button>
              <button className="w-full py-4 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-200 font-medium">
                Begär mer information
              </button>
            </div>
          </div>
        </div>

        {/* Map Section */}
        {billboard.latitude && billboard.longitude && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h2 className="text-2xl font-light text-gray-900 mb-6">Plats</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-96 rounded-2xl overflow-hidden bg-gray-100">
                  <BillboardMapWrapper focusBillboardId={billboard.id} height="h-full" />
                </div>
              </div>
              <div>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="font-medium text-gray-900 mb-4">Adress</h3>
                  <p className="text-gray-600">
                    {billboard.address || billboard.location}
                  </p>
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>GPS: {billboard.latitude.toFixed(4)}, {billboard.longitude.toFixed(4)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* Image Modal */}
      <AnimatePresence>
        {showImageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
            onClick={() => setShowImageModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <Image
                src={billboard.imageUrls[mainImage] || '/billboards/bb1.png'}
                alt={billboard.title}
                width={1200}
                height={800}
                className="rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 