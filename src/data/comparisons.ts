export interface GlobalProblem {
  name: string;
  cost: number; // in billions USD
  impact: string;
  source: string;
}

export const globalProblems: GlobalProblem[] = [
  {
    name: 'Global Hunger',
    cost: 330,
    impact: 'Feed 690 million hungry people for a year',
    source: 'UN World Food Programme'
  },
  {
    name: 'Universal Basic Education',
    cost: 175,
    impact: 'Provide primary education to all children globally',
    source: 'UNESCO'
  },
  {
    name: 'Clean Water Access',
    cost: 150,
    impact: 'Provide clean water to 2.2 billion people',
    source: 'WHO/UNICEF'
  },
  {
    name: 'Climate Change Mitigation',
    cost: 300,
    impact: 'Fund renewable energy transition for developing nations',
    source: 'UN Climate Action'
  }
];

export interface AbsurdityMetric {
  name: string;
  calculate: (wealth: number) => string;
}

// Constants for calculations
const SECONDS_PER_YEAR = 31536000;
const US_MIN_WAGE_HOURLY = 7.25;
const HOURS_PER_YEAR = 2080; // 40 hours/week * 52 weeks
const AVG_US_SALARY_YEARLY = 60000; // Approximate average US salary
const AVG_CAREER_YEARS = 40;
const GOLD_PRICE_PER_KG_USD = 75000; // Approximate gold price (fluctuates!)
const DOLLAR_BILL_LENGTH_M = 0.156;
const EARTH_CIRCUMFERENCE_KM = 40075;

export const absurdityMetrics: AbsurdityMetric[] = [
  {
    name: 'Time to Spend',
    calculate: (wealth) => {
      const spendingRatePerDay = 1000000; // $1 Million per day
      const daysToSpend = (wealth * 1e9) / spendingRatePerDay;
      const years = Math.floor(daysToSpend / 365);
      const centuries = Math.floor(years / 100);
      if (centuries > 5) {
         return `If you spent $1 million *every single day*, it would take over ${centuries} centuries to burn through this cash. Better get started!`;
      }
      return `Spending a cool $1 million per day, you'd need ${years.toLocaleString()} years to empty the vault. Hope you have patience!`;
    }
  },
  {
    name: 'Time to Count',
    calculate: (wealth) => {
        const countRatePerSecond = 1; // $1 per second
        const secondsToCount = (wealth * 1e9) / countRatePerSecond;
        const years = Math.floor(secondsToCount / SECONDS_PER_YEAR);
        const millennia = Math.floor(years / 1000);
        if (millennia > 1) {
            return `Counting this wealth at $1 per second would take over ${millennia.toLocaleString()} millennia. Your ancestors would be proud... eventually.`;
        }
        return `Counting $1 per second, 24/7, would take ${years.toLocaleString()} years. Maybe hire some help?`;
    }
  },
  {
    name: 'Minimum Wage Years',
    calculate: (wealth) => {
        const minWageYearly = US_MIN_WAGE_HOURLY * HOURS_PER_YEAR;
        const equivalentYears = Math.round((wealth * 1e9) / minWageYearly);
        return `This is equivalent to ${equivalentYears.toLocaleString()} years of work at the US federal minimum wage. Feeling motivated?`;
    }
  },
  {
    name: 'Average Salary Comparison',
    calculate: (wealth) => {
      const avgLifetimeEarnings = AVG_US_SALARY_YEARLY * AVG_CAREER_YEARS;
      const lifetimes = Math.round((wealth * 1e9) / avgLifetimeEarnings);
      return `It would take ${lifetimes.toLocaleString()} average US working lifetimes (40 years each) to earn this much. Just a small head start!`;
    }
  },
  {
    name: 'Dollar Bills Length',
    calculate: (wealth) => {
      const totalBills = wealth * 1e9 / 100; // Assuming $100 bills
      const lengthInM = totalBills * DOLLAR_BILL_LENGTH_M;
      const lengthInKm = lengthInM / 1000;
      const timesAroundEarth = (lengthInKm / EARTH_CIRCUMFERENCE_KM).toFixed(1);
      return `Laid end-to-end ($100 bills), this fortune would wrap around the Earth ${timesAroundEarth} times. Hope you like walking!`;
    }
  },
  {
    name: 'Weight in Gold',
    calculate: (wealth) => {
      const goldWeightKg = (wealth * 1e9) / GOLD_PRICE_PER_KG_USD;
      const goldWeightTonnes = Math.round(goldWeightKg / 1000);
      const blueWhales = Math.round(goldWeightTonnes / 150); // Avg Blue Whale weight ~150 tonnes
      if (blueWhales > 0) {
          return `This could buy ${goldWeightTonnes.toLocaleString()} metric tons of solid gold, weighing more than ${blueWhales.toLocaleString()} blue whales!`;
      }
      return `This fortune could buy ${goldWeightTonnes.toLocaleString()} metric tons of solid gold. Shiny!`;
    }
  }
];
