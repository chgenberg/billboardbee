'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import type { ChartOptions } from 'chart.js';

// Dynamically import Chart.js to avoid SSR issues
const Chart = dynamic(() => import('react-chartjs-2').then(mod => mod.Line), {
  ssr: false,
  loading: () => <div className="h-[300px] flex items-center justify-center">Laddar graf...</div>
});

// Import Chart.js dependencies
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Dummy data for revenue
const dummyRevenue = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Intäkter 2024',
      data: [0, 0, 0, 12000, 18900, 18000, 0, 0, 0, 0, 0, 0],
      borderColor: '#bf7100',
      backgroundColor: '#bf7100',
      tension: 0.4,
    },
  ],
};

const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function(value) {
          return `${value.toLocaleString('sv-SE')} kr`;
        },
      },
    },
  },
};

// Dummy data for payouts
const dummyPayouts = [
  {
    id: 1,
    date: '2024-04-01',
    amount: 12000,
    status: 'completed',
  },
  {
    id: 2,
    date: '2024-05-01',
    amount: 18900,
    status: 'pending',
  },
];

export default function RevenuePage() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState('year');

  // Exportera rapport som CSV
  const handleExportReport = () => {
    const rows = [
      ['Månad', 'Intäkt (kr)'],
      ...dummyRevenue.labels.map((label, i) => [label, dummyRevenue.datasets[0].data[i]])
    ];
    const csvContent = rows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'intaktsrapport.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#f6f5f3]">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold tracking-tight text-[#ff6b00]">Intäktsöversikt</h1>
            <button
              onClick={() => router.push('/dashboard')}
              className="px-4 py-2 text-sm rounded-lg bg-[#f6f5f3] text-[#ff6b00] border border-[#ff6b00]/30 hover:bg-[#fff] transition"
            >
              Tillbaka till dashboard
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-[#222]">Intäkter över tid</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setTimeRange('month')}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    timeRange === 'month'
                      ? 'bg-[#ff6b00] text-white'
                      : 'bg-[#f6f5f3] text-[#ff6b00] border border-[#ff6b00]/30'
                  }`}
                >
                  Månad
                </button>
                <button
                  onClick={() => setTimeRange('year')}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    timeRange === 'year'
                      ? 'bg-[#ff6b00] text-white'
                      : 'bg-[#f6f5f3] text-[#ff6b00] border border-[#ff6b00]/30'
                  }`}
                >
                  År
                </button>
              </div>
            </div>
            <div className="h-[300px]">
              <Chart options={chartOptions} data={dummyRevenue} />
            </div>
          </div>

          {/* Payout info */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold text-[#222] mb-6">Utbetalningar</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tillgängligt saldo</span>
                <span className="text-xl font-bold text-[#ff6b00]">18 900 kr</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Nästa utbetalning</span>
                <span className="text-gray-900">1 maj 2024</span>
              </div>
              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium text-gray-600 mb-3">Senaste utbetalningar</h3>
                <div className="space-y-3">
                  {dummyPayouts.map(payout => (
                    <div key={payout.id} className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-gray-900">
                          {new Date(payout.date).toLocaleDateString('sv-SE')}
                        </div>
                        <div className="text-xs text-gray-500">
                          {payout.status === 'completed' ? 'Utbetald' : 'Väntar'}
                        </div>
                      </div>
                      <span className="text-[#ff6b00] font-medium">
                        {payout.amount.toLocaleString('sv-SE')} kr
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                className="w-full mt-4 px-4 py-2 bg-[#ff6b00] text-white rounded-lg hover:bg-[#a05c00] transition"
                onClick={handleExportReport}
              >
                Exportera rapport
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 