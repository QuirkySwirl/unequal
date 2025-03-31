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

/**
 * Fetches and processes the latest GDP and Population data for top countries.
 */
export async function fetchCountryGDPs(): Promise<CountryGDPData[]> {
  const indicators = ['NY.GDP.MKTP.CD', 'SP.POP.TOTL']; // GDP (Current US$), Population (Total)
  const rawData = await fetchWorldBankData(indicators, 'all', '2018:2023'); // Fetch for all countries, recent years

  if (!rawData) {
    console.warn('Failed to fetch GDP/Population data from World Bank. Returning empty array.');
    return []; // Return empty array on failure
  }

  // Find the latest data point for each country for GDP and Population
  const latestDataMap = getLatestDataPerCountry(rawData);

  const processedData: CountryGDPData[] = [];
  // Need country names - fetch them separately or map from the raw data if available
  // For simplicity, let's try to get names from the raw data points themselves
  const countryNameMap = new Map<string, string>();
  rawData.forEach((p: WorldBankIndicatorDataPoint) => {
    if (p.countryiso3code && !countryNameMap.has(p.countryiso3code)) {
      countryNameMap.set(p.countryiso3code, p.country.value);
    }
  });


  latestDataMap.forEach((indicatorData, iso3code) => {
    const gdpData = indicatorData['NY.GDP.MKTP.CD'];
    const popData = indicatorData['SP.POP.TOTL'];
    const countryName = countryNameMap.get(iso3code) || iso3code; // Fallback to code if name not found

    // Only include countries with valid GDP data
    if (gdpData && gdpData.value > 0) {
      processedData.push({
        country: countryName,
        iso3code: iso3code,
        gdp: Math.round(gdpData.value / 1e9), // Convert GDP to billions
        population: popData ? (popData.value / 1e6).toFixed(1) + 'M' : null, // Format population
        year: gdpData.year, // Use the year from the GDP data point
      });
    }
  });

  // Filter out aggregates (heuristic: check for 3-letter ISO code and exclude known aggregate names)
  const filteredCountries = processedData.filter(
    (c) => c.iso3code.length === 3 && !['WLD', 'OED', 'IBD', 'IDB', 'IDX', 'MIC', 'LIC', 'LMC', 'UMC', 'HIC', 'NOC', 'OEC', 'EUU', 'EMU', 'ECS', 'EAS', 'NAC', 'LCN', 'SAS', 'SSF', 'MEA', 'TSA', 'IDA', 'IBT', 'IDN', 'LTE', 'PRE', 'PST', 'SSA', 'SST', 'TEA', 'TEC', 'TLA', 'TMN'].includes(c.iso3code) && !c.country.includes('income') && !c.country.includes('dividend') && !c.country.includes('aggregate') && !c.country.includes('members') && !c.country.includes('blend')
  );

  // Sort by GDP descending
  filteredCountries.sort((a, b) => (b.gdp ?? 0) - (a.gdp ?? 0));
  const topCountries = filteredCountries.slice(0, 20); // Take top 20 actual countries

  // --- Fetch Flags from REST Countries ---
  const countryCodes = topCountries.map(c => c.iso3code).join(',');
  const flagMap = new Map<string, string>();

  if (countryCodes) {
      try {
          const flagResponse = await axios.get<RestCountryInfo[]>(`https://restcountries.com/v3.1/alpha?codes=${countryCodes}&fields=cca3,flags`);
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
          console.warn(`Error fetching flags from REST Countries: ${errorMessage}`);
          // Proceed without flags if fetching fails
      }
  }

  // Add flag URLs to the data
  const finalData = topCountries.map(country => ({
      ...country,
      flagUrl: flagMap.get(country.iso3code),
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
