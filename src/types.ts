export interface Billionaire {
  id: string;
  name: string;
  netWorth: number; // in billions
  company: string;
  image: string;
  country: string;
}

export interface Company {
  id: string;
  name: string;
  marketCap: number; // in billions
  domain?: string; // Add domain for Icon Horse
  logo?: string; // Make logo optional as Icon Horse might fail
  color: string;
}

export interface PurchaseItem {
  id: string;
  name: string;
  price: number;
  image: string;
  comparison: string;
  category: 'luxury' | 'social' | 'absurd';
}
