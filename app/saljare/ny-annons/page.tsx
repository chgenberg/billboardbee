'use client';
import SellerBillboardForm from '../../components/seller/SellerBillboardForm';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function NewBillboardPage() {
  const router = useRouter();
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-4 py-12 pt-20 bg-[#f6f5f3] overflow-x-hidden">
      {/* Subtle background image/gradient */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/bakgrunden2.png"
          alt="Bakgrund"
          fill
          className="object-cover opacity-40 blur-sm select-none pointer-events-none"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-[#f6f5f3]/90" />
      </div>
      <div className="w-full max-w-2xl mx-auto bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20 flex flex-col gap-8 animate-fade-in">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-extrabold text-[#ff6b00] text-center w-full tracking-tight">Ny annons</h1>
        </div>
        <SellerBillboardForm />
        <button
          onClick={() => router.push('/dashboard')}
          className="mt-2 w-full py-2 rounded-xl bg-[#f6f5f3] text-[#bf7100] font-semibold border border-[#bf7100]/20 hover:bg-white hover:shadow transition-all"
        >
          Tillbaka till dashboard
        </button>
      </div>
    </div>
  );
} 