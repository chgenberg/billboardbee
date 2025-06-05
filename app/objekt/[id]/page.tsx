"use client";

import Image from "next/image";
import { useState } from "react";
import { FaMapMarkerAlt, FaRulerCombined, FaStar, FaRegBookmark, FaShareAlt, FaTag, FaUsers, FaCalendarAlt, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import BillboardMapWrapper from "@/app/components/BillboardMapWrapper";

// Dummy data – byt ut mot fetch från din backend om du vill!
const product = {
  title: "LED-skylt vid E6 N – Löddeköpinge",
  coverImage: "/billboards/bb1.png",
  gallery: ["/billboards/bb1.png", "/billboards/bb2.png", "/billboards/bb3.png"],
  location: "Löddeköpinge, E6 N",
  region: "Skåne",
  address: "E6, 246 32 Löddeköpinge",
  price: 18900,
  traffic: 65000,
  size: "12x3 m",
  type: "LED",
  rating: 4.8,
  reviews: 12,
  specs: [
    { icon: <FaRulerCombined />, label: "Storlek", value: "12 x 3 m" },
    { icon: <FaUsers />, label: "Trafik", value: "65 000/dag" },
    { icon: <FaTag />, label: "Typ", value: "LED" },
    { icon: <FaMapMarkerAlt />, label: "Region", value: "Skåne" },
  ],
  summary: "Veckopris 18 900 kr, serviceavgift 5 %, lediga veckor: 28–31, 34–40",
  availableWeeks: [28,29,30,31,34,35,36,37,38,39,40],
};

export default function BillboardPage() {
  const [mainImage, setMainImage] = useState(product.coverImage);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-16">
      <div className="max-w-3xl mx-auto px-4 flex flex-col gap-16">
        {/* Titel & Dela */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl font-light text-gray-900 tracking-tight text-center" style={{letterSpacing: ".01em"}}>{product.title}</h1>
          <div className="flex items-center gap-2 text-gray-400 text-base mt-2">
            <FaMapMarkerAlt className="text-[#ff6b00]" />
            <span>{product.location}</span>
            <span className="mx-2">•</span>
            <FaStar className="text-yellow-400" />
            <span>{product.rating} ({product.reviews})</span>
          </div>
          <div className="flex gap-2 mt-4">
            <button className="rounded-xl px-3 py-1.5 flex items-center gap-2 text-gray-400 hover:bg-gray-100 text-sm transition">
              <FaRegBookmark /> Spara
            </button>
            <button className="rounded-xl px-3 py-1.5 flex items-center gap-2 text-gray-400 hover:bg-gray-100 text-sm transition">
              <FaShareAlt /> Dela
            </button>
          </div>
        </div>

        {/* Bildgalleri */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-6"
        >
          <div className="rounded-3xl overflow-hidden shadow-xl bg-white/80 group relative mx-auto w-full max-w-2xl">
            <div
              className="relative w-full aspect-[16/7] cursor-zoom-in transition-all"
              onClick={() => setShowModal(true)}
            >
              <Image
                src={mainImage}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                priority
              />
              <span className="absolute bottom-2 right-4 bg-white/80 text-xs text-gray-400 px-3 py-1 rounded-full shadow hidden md:block">Klicka för att förstora</span>
            </div>
            <div className="flex gap-2 mt-3 px-4 pb-4 justify-center">
              {product.gallery.map((img) => (
                <button
                  key={img}
                  onClick={() => setMainImage(img)}
                  className={`w-12 h-9 rounded-xl overflow-hidden transition-all ${mainImage === img ? "ring-2 ring-[#ff6b00] scale-105" : "opacity-60 hover:opacity-100"}`}
                  style={{border: "none", background: "none"}}
                >
                  <Image src={img} alt="" width={48} height={36} className="object-cover w-full h-full" />
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Pris, Boka, Lediga veckor */}
        <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1 flex flex-col items-center gap-4"
          >
            <span className="inline-block border border-[#ffb300] text-[#ff6b00] bg-white font-medium text-xl px-6 py-1.5 rounded-xl shadow-sm">
              {product.price.toLocaleString("sv-SE")} kr/mån
            </span>
            <button
              className="w-full rounded-xl border border-[#ffb300] text-[#ff6b00] bg-white font-medium text-base py-2 shadow-sm hover:bg-[#fff7e6] transition"
              style={{ letterSpacing: ".01em" }}
            >
              Boka / Intresseanmälan
            </button>
            <div className="text-xs text-gray-400 text-center">{product.summary}</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex-1 flex flex-col items-center gap-2"
          >
            <div className="flex items-center gap-2 text-[#ff6b00] font-medium mb-1">
              <FaCalendarAlt /> Lediga veckor
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {product.availableWeeks.map(week => (
                <span key={week} className="bg-[#ff6b00]/10 text-[#ff6b00] rounded-full px-3 py-1 text-xs font-semibold">
                  v.{week}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Specifikationer & Karta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="rounded-2xl shadow-xl bg-white/80 p-8">
            <h2 className="text-lg font-light text-gray-900 mb-6 flex items-center gap-2">
              <FaTag className="text-[#ffb300]" /> Specifikationer
            </h2>
            <div className="flex flex-col gap-4">
              {product.specs.map((spec, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3"
                  style={{ minHeight: "2.5rem" }}
                >
                  <span className="text-xl text-[#ffb300] flex-shrink-0">{spec.icon}</span>
                  <span className="text-gray-400 font-light w-24 text-sm">{spec.label}:</span>
                  <span className="text-gray-900 font-medium text-base whitespace-nowrap">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Adress & karta */}
          <div className="rounded-2xl shadow-xl bg-white/80 p-8 flex flex-col gap-2">
            <h2 className="text-lg font-light text-gray-900 mb-2 flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#ffb300]" /> Plats
            </h2>
            <div className="flex items-center gap-2 text-gray-700 mb-2">
              <FaMapMarkerAlt className="text-[#ff6b00]" />
              <span>{product.address}</span>
            </div>
            <div className="w-full h-44 rounded-2xl overflow-hidden shadow-inner">
              <BillboardMapWrapper focusBillboardId={"8c54de65-9c23-465e-89a9-8577bd4a4e6c"} height="h-full" />
            </div>
          </div>
        </motion.div>

        {/* Modal för förstoring av bild */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="relative bg-white rounded-3xl shadow-2xl p-2"
                onClick={e => e.stopPropagation()}
              >
                <button
                  className="absolute top-2 right-2 text-2xl text-gray-400 hover:text-[#ff6b00] bg-white/80 rounded-full p-1"
                  onClick={() => setShowModal(false)}
                >
                  <FaTimes />
                </button>
                <div className="relative w-[80vw] max-w-2xl h-[50vw] max-h-[70vh] rounded-2xl overflow-hidden">
                  <Image
                    src={mainImage}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain bg-black"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 