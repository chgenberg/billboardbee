'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

interface MaintenanceTicket {
  id: string;
  title: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  imageUrl?: string;
  assignedTo?: string;
  createdAt: string;
}

export default function MaintenancePage() {
  const router = useRouter();
  const [tickets, setTickets] = useState<MaintenanceTicket[]>([]);
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM' as const,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await fetch('/api/maintenance?billboardId=YOUR_BILLBOARD_ID');
      const data = await response.json();
      setTickets(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Misslyckades med att hämta ärenden');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTicket = async () => {
    try {
      const response = await fetch('/api/maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newTicket,
          billboardId: 'YOUR_BILLBOARD_ID',
        }),
      });

      if (!response.ok) throw new Error('Failed to create ticket');

      toast.success('Maintenance ticket created successfully');
      setNewTicket({ title: '', description: '', priority: 'MEDIUM' });
      fetchTickets();
    } catch (error) {
      toast.error('Failed to create maintenance ticket');
    }
  };

  const handleUpdateStatus = async (id: string, status: MaintenanceTicket['status']) => {
    try {
      const response = await fetch(`/api/maintenance?id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error('Failed to update ticket status');

      toast.success('Ticket status updated successfully');
      fetchTickets();
    } catch (error) {
      toast.error('Failed to update ticket status');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-[#222]">Underhåll & Incidenter</h1>
      
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-[#222]">Skapa nytt ärende</h2>
        <div className="space-y-4">
          <Input
            placeholder="Titel"
            value={newTicket.title}
            onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
          />
          <Textarea
            placeholder="Beskrivning"
            value={newTicket.description}
            onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
          />
          <Select
            value={newTicket.priority}
            onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value as MaintenanceTicket['priority'] })}
          >
            <option value="LOW">Låg</option>
            <option value="MEDIUM">Medel</option>
            <option value="HIGH">Hög</option>
            <option value="URGENT">Akut</option>
          </Select>
          <Button onClick={handleCreateTicket} className="bg-[#ff6b00] text-white whitespace-nowrap px-6 py-2 rounded-md font-bold hover:bg-[#a05c00] transition-colors">Skapa ärende</Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tickets.map((ticket) => (
          <Card key={ticket.id} className="p-4">
            <h3 className="font-medium mb-2">{ticket.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{ticket.description}</p>
            <div className="flex justify-between items-center">
              <span className={`px-2 py-1 rounded text-sm ${
                ticket.priority === 'URGENT' ? 'bg-red-100 text-red-800' :
                ticket.priority === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                ticket.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {ticket.priority === 'LOW' ? 'Låg' : ticket.priority === 'MEDIUM' ? 'Medel' : ticket.priority === 'HIGH' ? 'Hög' : 'Akut'}
              </span>
              <Select
                value={ticket.status}
                onChange={(e) => handleUpdateStatus(ticket.id, e.target.value as MaintenanceTicket['status'])}
              >
                <option value="OPEN">Öppen</option>
                <option value="IN_PROGRESS">Pågår</option>
                <option value="RESOLVED">Åtgärdad</option>
                <option value="CLOSED">Stängd</option>
              </Select>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 