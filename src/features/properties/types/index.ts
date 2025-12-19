export interface Property {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  price: number;
  type: 'APARTMENT' | 'HOUSE' | 'COMMERCIAL' | 'CONDO';
  listingType: 'BUY' | 'RENT';
  bedrooms: number;
  bathrooms: number;
  size: number;
  image: string;
  features: string[];
  status: 'AVAILABLE' | 'RENTED' | 'MAINTENANCE';
  agentId?: string;
  agent?: Agent;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: 'AGENT';
}

export interface BookingRequest {
  propertyId: string;
  leaseType: 'SHORT_TERM' | 'LONG_TERM';
  startDate: string;
  endDate?: string;
  notes?: string;
}
