'use client';
import dynamic from 'next/dynamic';
const AnnonsorDashboardClient = dynamic(() => import('./AnnonsorDashboardClient'), { ssr: false });
export default function AnnonsorDashboardWrapper() {
  return <AnnonsorDashboardClient />;
} 