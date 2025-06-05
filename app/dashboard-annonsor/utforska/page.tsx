"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Billboard {
  id: string;
  title: string;
  description: string;
  imageUrls: string[];
  location: string;
  price: number;
  status: string;
  size?: string | null;
  type?: string | null;
  traffic?: number | null;
  region?: string | null;
  ownerId: string;
}

export default function UtforskaPage() {
  const [billboards, setBillboards] = useState<Billboard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBillboards = async () => {
      try {
        const res = await fetch("/api/billboards");
        const data = await res.json();
        // Hämta Pärs användar-id från backend eller hårdkoda om du vet det
        const parEmail = "par@philipson.se";
        // Hämta Pärs id via separat API-anrop
        const userRes = await fetch("/api/user?email=" + parEmail);
        const parUser = await userRes.json();
        const parId = parUser.id;
        // Filtrera på lediga skyltar som ägs av Pär
        setBillboards(data.filter((b: Billboard) => b.status === "ledig" && b.ownerId === parId));
      } catch (err) {
        setBillboards([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBillboards();
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-[#ff6b00]">Utforska & bevaka skyltar</h1>
      {loading ? (
        <div className="text-[#ff6b00] text-lg">Laddar skyltar...</div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {billboards.length === 0 && <div className="col-span-full text-gray-500">Inga lediga skyltar från Pär just nu.</div>}
          {billboards.map((b) => (
            <div key={b.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="aspect-video bg-gray-200 relative">
                <Image
                  src={b.imageUrls?.[0] || "/placeholder-billboard.jpg"}
                  alt={b.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{b.title}</h3>
                <p className="text-gray-600 mb-2">{b.location}</p>
                <div className="flex justify-between items-center">
                  <span className="text-[#ff6b00] font-semibold">{b.price.toLocaleString()} kr/vecka</span>
                  <button className="px-4 py-2 bg-[#ff6b00] text-white rounded-lg hover:bg-[#e65c00]">
                    Boka
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
} 