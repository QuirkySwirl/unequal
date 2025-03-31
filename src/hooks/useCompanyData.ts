import { useState, useEffect } from 'react';
import axios from 'axios';

interface CompanyData {
  marketCap: number | null; // In Billions USD
  // Add other fields if needed, e.g., employeeCount: number | null;
}

// Removed unused AlphaVantageQuote interface
// interface AlphaVantageQuote { ... }

// Separate function for Overview data (includes Market Cap)
// Removed duplicate interface definition that was here
interface AlphaVantageOverview {
    'Symbol': string;
    'AssetType': string;
    'Name': string;
    'Description': string;
    'CIK': string;
    'Exchange': string;
    'Currency': string;
    'Country': string;
    'Sector': string;
    'Industry': string;
    'Address': string;
    'FiscalYearEnd': string;
    'LatestQuarter': string;
    'MarketCapitalization': string; // This is the key field
    'EBITDA': string;
    'PERatio': string;
    'PEGRatio': string;
    'BookValue': string;
    'DividendPerShare': string;
    'DividendYield': string;
    'EPS': string;
    'RevenuePerShareTTM': string;
    'ProfitMargin': string;
    'OperatingMarginTTM': string;
    'ReturnOnAssetsTTM': string;
    'ReturnOnEquityTTM': string;
    'RevenueTTM': string;
    'GrossProfitTTM': string;
    'DilutedEPSTTM': string;
    'QuarterlyEarningsGrowthYOY': string;
    'QuarterlyRevenueGrowthYOY': string;
    'AnalystTargetPrice': string;
    'TrailingPE': string;
    'ForwardPE': string;
    'PriceToSalesRatioTTM': string;
    'PriceToBookRatio': string;
    'EVToRevenue': string;
    'EVToEBITDA': string;
    'Beta': string;
    '52WeekHigh': string;
    '52WeekLow': string;
    '50DayMovingAverage': string;
    '200DayMovingAverage': string;
    'SharesOutstanding': string;
    'DividendDate': string;
    'ExDividendDate': string;
}


interface UseCompanyDataResult {
  data: CompanyData | null;
  loading: boolean;
  error: string | null;
}

const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;

export function useCompanyData(ticker: string | undefined): UseCompanyDataResult {
  const [data, setData] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ticker || !API_KEY) {
      // Don't fetch if ticker or API key is missing
      if (!API_KEY && ticker) {
        setError("Alpha Vantage API key is missing. Please set VITE_ALPHA_VANTAGE_API_KEY in your .env file.");
      }
      setData(null); // Reset data if ticker changes to undefined
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setData(null); // Clear previous data

      try {
        // Use the OVERVIEW endpoint to get Market Capitalization
        const overviewUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${API_KEY}`;
        const response = await axios.get<AlphaVantageOverview>(overviewUrl);

        if (response.data && response.data.MarketCapitalization && response.data.MarketCapitalization !== "None") {
          const marketCapStr = response.data.MarketCapitalization;
          const marketCapNum = parseFloat(marketCapStr);

          if (!isNaN(marketCapNum)) {
            const marketCapBillions = marketCapNum / 1e9; // Convert to billions
            setData({
              marketCap: marketCapBillions,
            });
          } else {
            setError(`Failed to parse market cap for ${ticker}: ${marketCapStr}`);
          }
        } else if (response.data && Object.keys(response.data).length === 0) {
             setError(`No data returned for ${ticker}. Check ticker symbol or API limits.`);
        } else if (response.data && (response.data as any)['Note']) { // Using 'any' here as the 'Note' structure isn't formally typed
             // Handle API limit note
             setError(`Alpha Vantage API call frequency limit reached. Please wait and try again. Note: ${(response.data as any)['Note']}`); // Using 'any' for pragmatic access to 'Note'
        }
         else {
          setError(`Market capitalization data not found for ${ticker}. Response: ${JSON.stringify(response.data)}`);
        }

      } catch (err) {
        console.error("Error fetching company data from Alpha Vantage:", err);
        if (axios.isAxiosError(err)) {
          setError(`API Error: ${err.response?.statusText || err.message}`);
        } else {
          setError(`An unexpected error occurred: ${String(err)}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function if needed
    // return () => { /* cancel fetch if component unmounts */ };

  }, [ticker]); // Re-run effect when ticker changes

  return { data, loading, error };
}
