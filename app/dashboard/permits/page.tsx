'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

interface BuildingPermit {
  id: string;
  documentUrl: string;
  status: 'PENDING' | 'APPROVED' | 'EXPIRED' | 'RENEWAL_NEEDED';
  expiryDate: string;
  createdAt: string;
}

export default function PermitsPage() {
  const { data: session } = useSession();
  const [permits, setPermits] = useState<BuildingPermit[]>([]);
  const [newPermit, setNewPermit] = useState({
    documentUrl: '',
    expiryDate: '',
    status: 'PENDING' as const,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPermits();
  }, []);

  const fetchPermits = async () => {
    try {
      const response = await fetch('/api/permits?billboardId=YOUR_BILLBOARD_ID');
      const data = await response.json();
      setPermits(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Misslyckades med att hämta bygglov');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePermit = async () => {
    try {
      const response = await fetch('/api/permits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newPermit,
          billboardId: 'YOUR_BILLBOARD_ID',
        }),
      });

      if (!response.ok) throw new Error('Failed to create permit');

      toast.success('Building permit created successfully');
      setNewPermit({ documentUrl: '', expiryDate: '', status: 'PENDING' });
      fetchPermits();
    } catch (error) {
      toast.error('Failed to create building permit');
    }
  };

  const handleUpdateStatus = async (id: string, status: BuildingPermit['status']) => {
    try {
      const response = await fetch(`/api/permits?id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error('Failed to update permit status');

      toast.success('Permit status updated successfully');
      fetchPermits();
    } catch (error) {
      toast.error('Failed to update permit status');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-[#222]">Bygglov & Dokument</h1>
      
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-[#222]">Ladda upp nytt tillstånd</h2>
        <div className="space-y-4">
          <Input
            type="file"
            accept=".pdf"
            onChange={(e) => {
              // Hantera filuppladdning här
              setNewPermit({ ...newPermit, documentUrl: 'dummy-url.pdf' });
            }}
          />
          <Input
            type="date"
            value={newPermit.expiryDate}
            onChange={(e) => setNewPermit({ ...newPermit, expiryDate: e.target.value })}
          />
          <Button onClick={handleCreatePermit} className="bg-[#ff6b00] text-white whitespace-nowrap px-6 py-2 rounded-md font-bold hover:bg-[#a05c00] transition-colors">Ladda upp tillstånd</Button>
        </div>
      </Card>

      <div className="space-y-4">
        {permits.map((permit) => (
          <Card key={permit.id} className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-[#222]">Bygglov</h3>
                <p className="text-sm text-gray-800">
                  Giltigt till: {new Date(permit.expiryDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-2 py-1 rounded text-sm ${
                  permit.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                  permit.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                  permit.status === 'EXPIRED' ? 'bg-red-100 text-red-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {permit.status === 'PENDING' ? 'Väntar' : permit.status === 'APPROVED' ? 'Godkänt' : permit.status === 'EXPIRED' ? 'Utgånget' : 'Behöver förnyas'}
                </span>
                <Select
                  value={permit.status}
                  onChange={(e) => handleUpdateStatus(permit.id, e.target.value as BuildingPermit['status'])}
                >
                  <option value="PENDING">Väntar</option>
                  <option value="APPROVED">Godkänt</option>
                  <option value="EXPIRED">Utgånget</option>
                  <option value="RENEWAL_NEEDED">Behöver förnyas</option>
                </Select>
                <Button variant="outline" onClick={() => window.open(permit.documentUrl, '_blank')}>
                  Visa dokument
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 