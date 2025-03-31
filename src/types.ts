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
  marketCap: number; // in billions - will be fetched dynamically
  ticker: string; // Stock ticker symbol for API calls
  domain?: string; // Domain for logo fetching (e.g., Clearbit)
  logo?: string; // Optional fallback logo URL
  color: string; // Placeholder color
}

export interface PurchaseItem {
  id: string;
  name: string;
  price: number;
  image: string;
  comparison: string;
  category: 'luxury' | 'social' | 'absurd';
}

// Interface for the new Playground purchase options
export interface PlaygroundChoice {
  id: string; // e.g., 'feed_world_1y'
  name: string; // e.g., "Feed the World (for 1 Year) 🌍"
  scale: 'billionaire' | 'company'; // Which scale this choice applies to
  category: 'socialGood' | 'luxuryAbsurd'; // Category for potential filtering/styling
  cost: number; // Estimated cost in Billions USD
  description: string; // The engaging description/contrast text
  sourceHint: string; // e.g., "(Source Hint: Based on UN WFP...)"
  icon?: React.ElementType; // Optional Lucide icon (import React from 'react'; needed)
}
