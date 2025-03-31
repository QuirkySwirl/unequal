import React from 'react';
import { Scale, Clock, Globe, Coins, Timer, BadgeDollarSign } from 'lucide-react'; // Added Timer, BadgeDollarSign
import { absurdityMetrics } from '../data/comparisons';

interface AbsurdityMetricsProps {
  wealth: number;
}

const icons = {
  'Time to Spend': Clock,
  'Time to Count': Timer, // Added icon for Time to Count
  'Minimum Wage Years': BadgeDollarSign, // Added icon for Minimum Wage Years
  'Average Salary Comparison': Coins,
  'Dollar Bills Length': Globe,
  'Weight in Gold': Scale,
};

export function AbsurdityMetrics({ wealth }: AbsurdityMetricsProps) {
  return (
    // Adjusted gap for responsiveness
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 sm:gap-6">
      {absurdityMetrics.map((metric) => {
        const Icon = icons[metric.name as keyof typeof icons];
        return (
          <div
            key={metric.name}
            // Adjusted padding for responsiveness
            className="p-4 transition-shadow bg-white shadow-lg sm:p-6 rounded-xl hover:shadow-xl"
          >
            {/* Adjusted gap and margin */}
            <div className="flex items-center gap-2 mb-2 sm:gap-3 sm:mb-3">
               {/* Adjusted icon size */}
              <Icon className="w-5 h-5 text-indigo-600 sm:w-6 sm:h-6" />
               {/* Adjusted text size */}
              <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
                {metric.name}
              </h3>
            </div>
             {/* Adjusted text size */}
            <p className="text-sm text-gray-600 sm:text-base">
              {metric.calculate(wealth)}
            </p>
          </div>
        );
      })}
    </div>
  );
}
