// Data and calculations for the new landing page
import { Scale, Clock, Globe, Coins, Timer, BadgeDollarSign, Weight, Calculator } from 'lucide-react'; // Import necessary icons

// --- Interfaces ---
interface ComparisonData {
  id: string;
  name: string;
  value: number; // e.g., GDP in Billions USD, Budget in Billions USD, Cost in Billions USD
  unit: string; // e.g., "Billion USD", "People", "Years"
  source?: string; // URL or description of the data source
  year?: number; // Year the data pertains to
}

export interface AbsurdityCalculation {
  name: string;
  icon: React.ElementType; // Use React.ElementType for Lucide icons
  calculate: (wealthInBillions: number) => string; // Function to return the formatted string
  description: string; // Brief explanation of the calculation
}

// --- Constants ---
const BILL_THICKNESS_MM = 0.10922;
const METERS_PER_MM = 0.001;
const KM_PER_METER = 0.001;
const EARTH_CIRCUMFERENCE_KM = 40075;
const SECONDS_PER_YEAR = 31536000; // Approximate
const AVG_US_MIN_WAGE_PER_HOUR = 7.25; // Federal minimum, adjust as needed
const HOURS_PER_YEAR = 2080; // 40 hours/week * 52 weeks
const GOLD_PRICE_PER_OZ = 2300; // TODO: Update with current price
const OZ_PER_KG = 35.274;
const GOLD_DENSITY_KG_PER_M3 = 19320;
const COUNTING_SPEED_BILLS_PER_SEC = 2; // Example counting speed

// --- Placeholder Data (Requires Research & Sourcing) ---

export const topWealthExample = { name: "Bernard Arnault & family", wealth: 233 }; // Example, update as needed

// TODO: Populate with actual data from reliable sources (World Bank, UN, etc.)
export const gdpComparisons: ComparisonData[] = [
  { id: 'gdp_pakistan', name: 'GDP of Pakistan', value: 375, unit: 'Billion USD', source: 'World Bank 2022', year: 2022 },
  { id: 'gdp_portugal', name: 'GDP of Portugal', value: 255, unit: 'Billion USD', source: 'World Bank 2022', year: 2022 },
  { id: 'gdp_nigeria', name: 'GDP of Nigeria', value: 477, unit: 'Billion USD', source: 'World Bank 2022', year: 2022 },
];

export const unBudgetComparisons: ComparisonData[] = [
  // TODO: Find more accurate/recent budget figures if possible
  { id: 'un_wfp', name: 'World Food Programme Budget', value: 14, unit: 'Billion USD', source: 'WFP 2022 (approx)', year: 2022 },
  { id: 'un_who', name: 'World Health Organization Budget', value: 6.7, unit: 'Billion USD', source: 'WHO 2022-2023', year: 2023 },
  { id: 'un_hcr', name: 'UN Refugee Agency Budget', value: 10.7, unit: 'Billion USD', source: 'UNHCR 2023', year: 2023 },
];

export const globalProblemCostComparisons: ComparisonData[] = [
  // TODO: Verify sources and update estimates
  { id: 'prob_hunger', name: 'Est. Annual Cost to End World Hunger', value: 40, unit: 'Billion USD', source: 'Estimates vary (e.g., Ceres 2030)', year: 2023 },
  { id: 'prob_water', name: 'Est. Cost for Global Basic Water Access', value: 114, unit: 'Billion USD/year goal', source: 'World Bank (by 2030)', year: 2030 },
  { id: 'prob_malaria', name: 'Est. Annual Cost for Malaria Control', value: 6.8, unit: 'Billion USD', source: 'WHO', year: 2021 },
];

// --- Absurdity Calculations ---

export const absurdityCalculations: AbsurdityCalculation[] = [
  {
    name: 'Time to Spend ($1M/day)',
    icon: Clock,
    calculate: (wealth) => {
      if (wealth <= 0) return '0 years';
      const daysToSpend = (wealth * 1e9) / 1e6;
      const yearsToSpend = daysToSpend / 365.25;
      return `${yearsToSpend.toLocaleString(undefined, { maximumFractionDigits: 0 })} years`;
    },
    description: "Years it would take to spend the entire fortune spending $1 million every single day."
  },
  {
    name: '$100 Bills End-to-End',
    icon: Globe,
    calculate: (wealth) => {
      if (wealth <= 0) return '0 times';
      const numBills = wealth * 1e9 / 100;
      const totalLengthMeters = numBills * 0.155956; // Length of a US bill in meters
      const totalLengthKm = totalLengthMeters * KM_PER_METER;
      const earthWraps = totalLengthKm / EARTH_CIRCUMFERENCE_KM;
      return `Wraps the Earth ${earthWraps.toLocaleString(undefined, { maximumFractionDigits: 1 })} times`;
    },
    description: "How many times the fortune, converted to $100 bills laid end-to-end, could circle the Earth."
  },
  {
    name: 'Minimum Wage Years',
    icon: BadgeDollarSign,
    calculate: (wealth) => {
      if (wealth <= 0) return '0 years';
      const totalWealth = wealth * 1e9;
      const annualMinWage = AVG_US_MIN_WAGE_PER_HOUR * HOURS_PER_YEAR;
      if (annualMinWage <= 0) return 'N/A';
      const yearsToEarn = totalWealth / annualMinWage;
      return yearsToEarn > 1e6
        ? `${yearsToEarn.toExponential(1)} years`
        : `${yearsToEarn.toLocaleString(undefined, { maximumFractionDigits: 0 })} years`;
    },
    description: `Years someone earning US federal minimum wage ($${AVG_US_MIN_WAGE_PER_HOUR}/hr) would need to work to earn this amount.`
  },
  {
    name: 'Weight in Gold',
    icon: Weight, // Using 'Weight' icon from lucide
    calculate: (wealth) => {
      if (wealth <= 0 || GOLD_PRICE_PER_OZ <= 0) return '0 kg';
      const totalValue = wealth * 1e9;
      const totalOzGold = totalValue / GOLD_PRICE_PER_OZ;
      const totalKgGold = totalOzGold / OZ_PER_KG;
      return `${totalKgGold.toLocaleString(undefined, { maximumFractionDigits: 0 })} kg`;
    },
    description: `The approximate weight of the fortune if converted entirely into pure gold (at $${GOLD_PRICE_PER_OZ}/oz).`
  },
   {
    name: 'Time to Count ($100 Bills)',
    icon: Timer,
    calculate: (wealth) => {
      if (wealth <= 0 || COUNTING_SPEED_BILLS_PER_SEC <= 0) return '0 years';
      const numBills = wealth * 1e9 / 100;
      const totalSeconds = numBills / COUNTING_SPEED_BILLS_PER_SEC;
      const totalYears = totalSeconds / SECONDS_PER_YEAR;
       return totalYears > 1000
        ? `${totalYears.toExponential(1)} years`
        : `${totalYears.toLocaleString(undefined, { maximumFractionDigits: 0 })} years`;
    },
    description: `Approximate time it would take to count the fortune in $100 bills at ${COUNTING_SPEED_BILLS_PER_SEC} bills/second, non-stop.`
  },
  // Add more calculations as needed
];

// --- Helper Functions (Optional) ---
// Could add functions here to fetch dynamic data if needed later
