'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AnnonsorDashboardRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/dashboard-annonsor');
  }, [router]);
  return null;
} 