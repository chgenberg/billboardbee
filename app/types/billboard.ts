export interface Billboard {
  id: string;
  title: string;
  location: string;
  latitude: number;
  longitude: number;
  lat?: number;
  lng?: number;
  isOffice?: boolean;
  description?: string;
  imageUrls?: string[];
  price?: number;
  status?: string;
  size?: string | null;
  type?: string | null;
  traffic?: number | null;
  region?: string | null;
} 