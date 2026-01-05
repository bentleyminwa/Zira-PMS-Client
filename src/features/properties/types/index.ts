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
  createdAt?: string;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: 'AGENT';
}

export interface Tenant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  idNumber?: string;
}

export interface TenantRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  idNumber?: string;
}

export interface BookingRequest {
  propertyId: string;
  tenantId?: string; // Optional if we are creating tenant concurrently
  startDate: string;
  endDate?: string;
  type: 'SHORT_TERM' | 'LONG_TERM';
  status?:
    | 'PENDING'
    | 'CONFIRMED'
    | 'ACTIVE'
    | 'CANCELLED'
    | 'COMPLETED'
    | 'TERMINATED';
  notes?: string;
  totalPrice: number;
  depositAmount?: number;
}

export interface CheckoutData {
  tenant: TenantRequest;
  booking: {
    startDate: string;
    endDate?: string;
    type: 'SHORT_TERM' | 'LONG_TERM';
    notes?: string;
  };
  payment: {
    method: 'CASH' | 'CARD' | 'BANK_TRANSFER';
    amount: number;
  };
}

export type SortOption = 'newest' | 'price-low' | 'price-high';

export interface FilterState {
  type: string;
  location: string;
  minPrice: number;
  maxPrice: number;
}
