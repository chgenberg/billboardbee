'use client';

import dynamic from 'next/dynamic';

const BillboardMap = dynamic(() => import('./BillboardMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] rounded-3xl shadow-2xl overflow-hidden border border-[#ff6b00]/20 relative">
      <div className="absolute inset-0 flex items-center justify-center bg-white/80">
        <div className="w-12 h-12 border-4 border-[#ff6b00] border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  ),
});

interface BillboardMapWrapperProps {
  focusBillboardId?: string;
  height?: string;
}

export default function BillboardMapWrapper({ focusBillboardId, height }: BillboardMapWrapperProps) {
  return <BillboardMap focusBillboardId={focusBillboardId} height={height} />;
} 