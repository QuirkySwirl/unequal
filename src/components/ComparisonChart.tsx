import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'; // Import Cell
import { useCountryGDPs, useGlobalIndicators } from '../hooks/useComparisons';
import { Loader2 } from 'lucide-react';

interface ComparisonChartProps {
  wealth: number;
  type: 'gdp' | 'problems';
}

export function ComparisonChart({ wealth, type }: ComparisonChartProps) {
  const { data: gdpData, error: gdpError } = useCountryGDPs();
  const { data: indicatorData, error: indicatorError } = useGlobalIndicators();

  if ((type === 'gdp' && !gdpData) || (type === 'problems' && !indicatorData)) {
    return (
      <div className="h-[400px] w-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if ((type === 'gdp' && gdpError) || (type === 'problems' && indicatorError)) {
    return (
      <div className="h-[400px] w-full flex items-center justify-center text-red-600">
        Error loading data
      </div>
    );
  }

  const chartData = type === 'gdp'
    ? [
        { name: 'Selected Wealth', value: wealth },
        ...(gdpData || []).map(country => ({
          name: country.country,
          value: country.gdp,
          population: country.population,
          flagUrl: country.flagUrl // Include flagUrl in chart data
        }))
      ]
    : [
        { name: 'Selected Wealth', value: wealth },
        ...(indicatorData || []).map(problem => ({
          name: problem.name,
          value: problem.value, // Use the actual indicator value
          unit: problem.unit,   // Pass unit and year for tooltip
          year: problem.year
        }))
      ];

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          layout="vertical"
        >
          <XAxis type="number" />
          {/* Use tick prop for custom rendering if it's the GDP chart */}
          <YAxis
            dataKey="name"
            type="category"
            width={type === 'gdp' ? 180 : 150} // Adjusted width: More for GDP (flags), slightly less for problems
            interval={0} // Ensure all ticks are rendered
            tick={type === 'gdp' ? <CustomYAxisTick /> : { fontSize: 10 }} // Apply custom tick for GDP, smaller font for problems
            tickLine={false} // Hide default tick line
            axisLine={false} // Hide axis line for cleaner look
          />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const item = payload[0].payload;
              const isGdp = !!item.population || item.name === 'Selected Wealth'; // Heuristic to check type

              return (
                <div className="p-3 text-sm bg-white border rounded-lg shadow-lg">
                  <p className="mb-1 font-semibold">{item.name}</p>
                  {isGdp ? (
                    <p className="font-mono">${(item.value ?? 0).toLocaleString()} Billion</p>
                  ) : (
                    <p className="font-mono">{(item.value ?? 0).toLocaleString()} <span className="text-xs">{item.unit}</span></p>
                  )}
                  {item.population && (
                    <p className="mt-1 text-xs text-gray-600">Population: {item.population}</p>
                  )}
                   {item.year && !isGdp && (
                    <p className="mt-1 text-xs text-gray-600">Year: {item.year}</p>
                  )}
                </div>
              );
            }}
          />
          <Bar dataKey="value">
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.name === 'Selected Wealth' ? '#4f46e5' : '#93c5fd'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Define type for the props passed to the custom tick component by Recharts
interface CustomTickProps {
  x?: number;
  y?: number;
  payload?: {
    value: string; // The dataKey value (country name)
    payload: { // The original data object for this tick
      name: string;
      value: number | null;
      population?: string | null;
      flagUrl?: string;
      unit?: string;
      year?: string;
    };
  };
}

// Custom component for rendering Y-axis ticks with flags
const CustomYAxisTick = (props: CustomTickProps) => {
  const { x = 0, y = 0, payload } = props; // Provide defaults for x, y
  // Ensure payload and its nested properties exist before destructuring
  const value = payload?.value ?? '';
  const flagUrl = payload?.payload?.flagUrl;

  // value here is the country name (dataKey="name")
  // flagUrl is the custom property we added

  return (
    <g transform={`translate(${x},${y})`}>
      {/* Increased height slightly, adjusted x offset */}
      <foreignObject x={-175} y={-12} width={170} height={24}>
        {/* Removed overflow-hidden and text-ellipsis to allow wrapping if needed, adjusted gap */}
        <div className="flex items-center gap-1.5 pr-1">
          {flagUrl && (
            <img
              src={flagUrl}
              alt={`${value} flag`}
              className="flex-shrink-0 object-contain w-5 h-4" // Fixed height for flags
              onError={(e) => (e.currentTarget.style.display = 'none')} // Hide if flag fails to load
            />
          )}
          {/* Allow text wrapping and slightly smaller font */}
          <span className="text-[11px] leading-tight text-gray-700" title={value}>
            {value}
          </span>
        </div>
      </foreignObject>
    </g>
  );
};
