'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

interface PayoutSettings {
  id: string;
  iban?: string;
  bankgiro?: string;
  payoutFrequency: 'weekly' | 'monthly';
  vatStatus: boolean;
  stripeAccountId?: string;
}

export default function PayoutSettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<PayoutSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/payout-settings?billboardId=YOUR_BILLBOARD_ID');
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      toast.error('Failed to fetch payout settings');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSettings = async (updates: Partial<PayoutSettings>) => {
    try {
      const response = await fetch('/api/payout-settings?billboardId=YOUR_BILLBOARD_ID', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (!response.ok) throw new Error('Failed to update settings');

      toast.success('Payout settings updated successfully');
      fetchSettings();
    } catch (error) {
      toast.error('Failed to update payout settings');
    }
  };

  const handleStripeConnect = async () => {
    // Implement Stripe Connect onboarding flow here
    toast.info('Stripe Connect integration coming soon');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-[#222]">Utbetalningsinställningar</h1>
      
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-[#222]">Bankinformation</h2>
            <div className="space-y-4">
              <Input
                placeholder="IBAN"
                value={settings?.iban || ''}
                onChange={(e) => handleUpdateSettings({ iban: e.target.value })}
              />
              <Input
                placeholder="Bankgiro"
                value={settings?.bankgiro || ''}
                onChange={(e) => handleUpdateSettings({ bankgiro: e.target.value })}
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 text-[#222]">Utbetalningsfrekvens</h2>
            <Select
              value={settings?.payoutFrequency || 'monthly'}
              onChange={(e) => handleUpdateSettings({ payoutFrequency: e.target.value as 'weekly' | 'monthly' })}
            >
              <option value="weekly">Varje vecka</option>
              <option value="monthly">Varje månad</option>
            </Select>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 text-[#222]">Momsregistrering</h2>
            <div className="flex items-center gap-2">
              <Switch
                checked={settings?.vatStatus || false}
                onCheckedChange={(checked) => handleUpdateSettings({ vatStatus: checked })}
              />
              <span className="text-[#222]">Registrerad för moms</span>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 text-[#222]">Stripe-integration</h2>
            {settings?.stripeAccountId ? (
              <div className="text-green-600">Ansluten till Stripe</div>
            ) : (
              <Button onClick={handleStripeConnect} className="bg-[#ff6b00] text-white whitespace-nowrap px-6 py-2 rounded-md font-bold hover:bg-[#a05c00] transition-colors disabled:bg-[#ff6b00] disabled:text-white disabled:opacity-60">Anslut med Stripe</Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
} 