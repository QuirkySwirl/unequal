import { Company } from '../types';

// Top ~20 Companies by Market Cap (as of March 2025 list provided)
// MarketCap values here are placeholders; they will be fetched dynamically.
// Domains are guessed for logo fetching. Colors are placeholders.
export const companies: Company[] = [
  {
    id: 'apple',
    name: 'Apple Inc.',
    marketCap: 3630, // Placeholder
    ticker: 'AAPL',
    domain: 'apple.com',
    color: '#000000'
  },
  {
    id: 'nvidia',
    name: 'Nvidia Corporation',
    marketCap: 3050, // Placeholder
    ticker: 'NVDA',
    domain: 'nvidia.com',
    color: '#76B900'
  },
  {
    id: 'microsoft',
    name: 'Microsoft Corporation',
    marketCap: 2950, // Placeholder
    ticker: 'MSFT',
    domain: 'microsoft.com',
    color: '#00A4EF'
  },
  {
    id: 'amazon',
    name: 'Amazon.com, Inc.',
    marketCap: 2250, // Placeholder
    ticker: 'AMZN',
    domain: 'amazon.com',
    color: '#FF9900'
  },
  {
    id: 'alphabet', // Using GOOGL as primary
    name: 'Alphabet Inc.',
    marketCap: 2100, // Placeholder (using GOOGL value)
    ticker: 'GOOGL', // or GOOG
    domain: 'abc.xyz', // Alphabet's domain
    color: '#4285F4' // Google Blue
  },
  {
    id: 'tesla',
    name: 'Tesla, Inc.',
    marketCap: 1790, // Placeholder
    ticker: 'TSLA',
    domain: 'tesla.com',
    color: '#CC0000'
  },
  {
    id: 'meta',
    name: 'Meta Platforms, Inc.',
    marketCap: 1150, // Placeholder
    ticker: 'META',
    domain: 'meta.com',
    color: '#1877F2' // Facebook Blue
  },
  {
    id: 'jpmorgan',
    name: 'JPMorgan Chase & Co.',
    marketCap: 672, // Placeholder
    ticker: 'JPM',
    domain: 'jpmorganchase.com',
    color: '#005EB8'
  },
  {
    id: 'unitedhealth',
    name: 'UnitedHealth Group Inc.',
    marketCap: 472, // Placeholder
    ticker: 'UNH',
    domain: 'unitedhealthgroup.com',
    color: '#003C71'
  },
  {
    id: 'mastercard',
    name: 'Mastercard Incorporated',
    marketCap: 450, // Placeholder
    ticker: 'MA',
    domain: 'mastercard.com',
    color: '#EB001B' // Red part of logo
  },
  {
    id: 'visa',
    name: 'Visa Inc.',
    marketCap: 430, // Placeholder
    ticker: 'V',
    domain: 'visa.com',
    color: '#1A1F71' // Visa Blue
  },
   {
    id: 'oracle', // Added Oracle from list
    name: 'Oracle Corporation',
    marketCap: 395, // Placeholder
    ticker: 'ORCL',
    domain: 'oracle.com',
    color: '#F80000'
  },
  {
    id: 'proctergamble',
    name: 'Procter & Gamble Co.',
    marketCap: 395, // Placeholder
    ticker: 'PG',
    domain: 'pg.com',
    color: '#003DA5'
  },
  {
    id: 'jnj',
    name: 'Johnson & Johnson',
    marketCap: 380, // Placeholder
    ticker: 'JNJ',
    domain: 'jnj.com',
    color: '#D01F3C'
  },
  {
    id: 'homedepot',
    name: 'The Home Depot, Inc.',
    marketCap: 370, // Placeholder
    ticker: 'HD',
    domain: 'homedepot.com',
    color: '#F96302'
  },
  {
    id: 'bankofamerica',
    name: 'Bank of America Corp.',
    marketCap: 360, // Placeholder
    ticker: 'BAC',
    domain: 'bankofamerica.com',
    color: '#E31837'
  },
  {
    id: 'berkshire', // Using BRK.B
    name: 'Berkshire Hathaway Inc.',
    marketCap: 350, // Placeholder (using BRK.B value)
    ticker: 'BRK-B', // Ticker might need adjustment for API
    domain: 'berkshirehathaway.com',
    color: '#808080' // Gray
  },
  {
    id: 'booking',
    name: 'Booking Holdings Inc.',
    marketCap: 152, // Placeholder
    ticker: 'BKNG',
    domain: 'bookingholdings.com',
    color: '#003580' // Booking.com blue
  }
  // Note: Combined GOOGL/GOOG and BRK.A/BRK.B. Omitted international ones for now.
];
