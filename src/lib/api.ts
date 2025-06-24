 import axios from 'axios';

const WORLD_BANK_API_BASE = 'https://api.worldbank.org/v2';

// --- Interfaces for World Bank API Responses ---

interface WorldBankIndicatorDataPoint {
  indicator: { id: string; value: string };
  country: { id: string; value: string };
  countryiso3code: string;
  date: string; // Year as a string
  value: number | null;
  unit: string;
  obs_status: string;
  decimal: number;
}

// The actual response is an array where the first element is metadata, second is data array
type WorldBankApiResponse = [unknown, WorldBankIndicatorDataPoint[] | null];

// --- Helper Functions ---

/**
 * Fetches data for given indicators and countries from the World Bank API.
 * @param indicators - Array of indicator codes (e.g., ['NY.GDP.MKTP.CD', 'SP.POP.TOTL'])
 * @param countries - Country code (e.g., 'all', 'WLD', 'USA;BRA')
 * @param dateRange - Date range string (e.g., '2018:2023')
 * @returns Promise resolving to the data points array or null on error.
 */
async function fetchWorldBankData(
  indicators: string[],
  countries: string = 'all',
  dateRange: string = '2018:2023' // Fetch recent years to find latest
): Promise<WorldBankIndicatorDataPoint[] | null> {
  const indicatorString = indicators.join(';');
  const url = `${WORLD_BANK_API_BASE}/country/${countries}/indicator/${indicatorString}`;

  try {
    const response = await axios.get<WorldBankApiResponse>(url, {
      params: {
        source: 2, // World Development Indicators
        date: dateRange,
        format: 'json',
        per_page: 20000, // Try to get all data in one go
      },
    });

    // Basic validation of response structure
    if (
      !Array.isArray(response.data) ||
      response.data.length < 2 ||
      !response.data[1] // Check if data array exists (can be null if no data found)
    ) {
      // Handle cases where the API returns metadata but no data array (e.g., invalid indicator/country)
      console.warn(
        `World Bank API returned no data or unexpected format for indicators: ${indicatorString}, countries: ${countries}`
      );
      return null;
    }

    // Filter out entries with null values, as they don't represent actual data points
    return response.data[1].filter((point) => point.value !== null);

  } catch (error: unknown) {
    let errorMessage = 'An unknown error occurred';
    if (axios.isAxiosError(error)) {
      errorMessage = JSON.stringify(error.response?.data) || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error(
      `Error fetching World Bank data for indicators ${indicatorString}, countries ${countries}:`,
      errorMessage
    );
    return null; // Return null to indicate failure
  }
}

/**
 * Processes raw World Bank data to find the latest non-null value for each country/indicator pair.
 * @param data - Array of raw data points from fetchWorldBankData.
 * @returns A Map where keys are country ISO3 codes and values are objects containing the latest data for each indicator.
 *          Example: Map { 'USA' => { 'NY.GDP.MKTP.CD': { value: 25T, year: '2022' }, ... } }
 */
function getLatestDataPerCountry(data: WorldBankIndicatorDataPoint[]): Map<string, Record<string, { value: number; year: string }>> {
  const latestData = new Map<string, Record<string, { value: number; year: string }>>();

  // Sort data by year descending to process latest years first
  data.sort((a, b) => parseInt(b.date, 10) - parseInt(a.date, 10));

  for (const point of data) {
    if (point.value === null || !point.countryiso3code) continue; // Skip null values and entries without ISO code

    const countryCode = point.countryiso3code;
    const indicatorId = point.indicator.id;

    if (!latestData.has(countryCode)) {
      latestData.set(countryCode, {});
    }

    const countryData = latestData.get(countryCode)!;

    // If we haven't recorded data for this indicator for this country yet, add it (since we sorted by year)
    if (!countryData[indicatorId]) {
      countryData[indicatorId] = { value: point.value, year: point.date };
    }
  }

  return latestData;
}


// --- Public API Functions ---

export interface CountryGDPData {
  country: string; // Country Name
  iso3code: string; // ISO3 Code
  gdp: number | null; // GDP in Billions USD
  population: string | null; // Population formatted string (e.g., '331.9M')
  year: string | null; // Year of data
  flagUrl?: string; // URL for the country's flag
}

interface RestCountryInfo {
    cca3: string;
    flags: {
        png: string;
        svg: string;
        alt?: string;
    };
    // Add other fields if needed later
}

import localGdpDataJson from '../data/gdpData.json'; // Import the local JSON data

/**
 * Fetches and processes the latest GDP and Population data.
 * Now uses local gdpData.json for GDP and fetches flags. Population is currently set to null.
 */
export async function fetchCountryGDPs(): Promise<CountryGDPData[]> {
  // Type assertion for the imported JSON
  const localGdpData = localGdpDataJson as Array<{
    country: string;
    countryCode: string;
    gdp: number;
    year: number;
  }>;

  const countriesWithGdp: CountryGDPData[] = localGdpData.map(item => ({
    country: item.country,
    iso3code: item.countryCode,
    gdp: item.gdp, // Already in billions
    population: null, // Population data not in gdpData.json, set to null
    year: String(item.year), // Ensure year is a string
    flagUrl: undefined // Will be fetched next
  }));

  // The gdpData.json is already sorted by GDP descending and curated.
  // We will use all countries from this JSON.
  const countriesToProcess = countriesWithGdp;

  // --- Fetch Flags from REST Countries ---
  // Using iso3code (which we mapped from countryCode)
  const countryCodesForFlags = countriesToProcess.map(c => c.iso3code).filter(Boolean).join(',');
  const flagMap = new Map<string, string>();

  if (countryCodesForFlags) {
      try {
          // Fetching flags for all countries in our JSON.
          // REST Countries API might have a limit on URL length for many codes.
          // A more robust solution might batch these requests if there are too many countries.
          // For ~60-70 countries, a single request should be fine.
          const flagResponse = await axios.get<RestCountryInfo[]>(`https://restcountries.com/v3.1/alpha?codes=${countryCodesForFlags}&fields=cca3,flags`);
          if (flagResponse.data) {
              flagResponse.data.forEach(countryInfo => {
                  flagMap.set(countryInfo.cca3, countryInfo.flags.svg || countryInfo.flags.png); // Prefer SVG
              });
          }
      } catch (error: unknown) {
          let errorMessage = 'An unknown error occurred fetching flags';
          if (axios.isAxiosError(error)) {
            errorMessage = JSON.stringify(error.response?.data) || error.message;
          } else if (error instanceof Error) {
            errorMessage = error.message;
          }
          console.warn(`Error fetching flags from REST Countries: ${errorMessage}. Proceeding without flags for some countries.`);
      }
  }

  // Add flag URLs to the data
  const finalData = countriesToProcess.map(country => ({
      ...country,
      flagUrl: flagMap.get(country.iso3code), // Will be undefined if flag not found
  }));

  return finalData;
}


export interface GlobalIndicatorData {
    name: string; // Human-readable name
    indicatorCode: string;
    value: number | null;
    unit: string; // e.g., '% of population'
    year: string | null;
    source: string;
}

/**
 * Fetches latest values for key global indicators (World aggregate).
 */
export async function fetchGlobalIndicators(): Promise<GlobalIndicatorData[]> {
    // Define indicators and their human-readable names/units
    const indicatorsToFetch = [
        { code: 'SI.POV.DDAY', name: 'Poverty Headcount ($2.15/day)', unit: '% of population' },
        { code: 'SH.H2O.BASW.ZS', name: 'Basic Drinking Water Access', unit: '% of population' },
        { code: 'SE.ADT.LITR.ZS', name: 'Adult Literacy Rate', unit: '% of people ages 15+' },
        // Add more indicators as needed
    ];
    const indicatorCodes = indicatorsToFetch.map(i => i.code);

    // Fetch data for the 'World' aggregate
    const rawData = await fetchWorldBankData(indicatorCodes, 'WLD', '2018:2023');

    if (!rawData) {
        console.warn('Failed to fetch Global Indicators from World Bank. Returning empty array.');
        return [];
    }

    // Process to find the latest value for each indicator
    const latestIndicatorValues: Record<string, { value: number; year: string }> = {};
    rawData.sort((a, b) => parseInt(b.date, 10) - parseInt(a.date, 10)); // Sort by year descending

    for (const point of rawData) {
        if (point.value !== null && !latestIndicatorValues[point.indicator.id]) {
            latestIndicatorValues[point.indicator.id] = { value: point.value, year: point.date };
        }
    }

    // Map to the desired output format
    const results: GlobalIndicatorData[] = indicatorsToFetch.map(indicatorInfo => {
        const latestData = latestIndicatorValues[indicatorInfo.code];
        return {
            name: indicatorInfo.name,
            indicatorCode: indicatorInfo.code,
            value: latestData ? latestData.value : null,
            unit: indicatorInfo.unit,
            year: latestData ? latestData.year : null,
            source: 'World Bank (WDI)',
        };
    });

    return results;
}
