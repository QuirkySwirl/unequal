import React from 'react';
import { ResponsiveTreeMap } from '@nivo/treemap';
import { useCountryGDPs, useGlobalIndicators } from '../hooks/useComparisons';
import { GlobalIndicatorData } from '../lib/api';
import { Loader2, AlertTriangle, Share2, HeartHandshake, Droplets, Wheat } from 'lucide-react';

interface ComparisonChartProps {
  wealth: number;
  type: 'gdp' | 'problems';
  entityName?: string;
}

interface TreemapNode {
  name: string; // Unique ID for the node (Country Name + Value)
  value: number;
  // color prop removed - will use Nivo scheme
  children?: TreemapNode[];
  countryName?: string;
  originalValue?: number;
  unit?: string;
  flagUrl?: string;
}

const problemIcons: { [key: string]: React.ElementType } = {
  'Est. Annual Cost to End World Hunger': Wheat,
  'Est. Cost for Global Basic Water Access': Droplets,
  'Est. Annual Cost for Malaria Control': HeartHandshake,
};

export function ComparisonChart({ wealth, type, entityName = "Selected Fortune" }: ComparisonChartProps) {
  const { data: gdpData, error: gdpError, isLoading: gdpLoading } = useCountryGDPs();
  const { data: indicatorData, error: indicatorError, isLoading: indicatorLoading } = useGlobalIndicators();

  const isLoading = (type === 'gdp' && gdpLoading) || (type === 'problems' && indicatorLoading);
  const hasError = (type === 'gdp' && gdpError) || (type === 'problems' && indicatorError);

  if (isLoading) { /* ... loading spinner ... */
    return <div className="h-[400px] w-full flex items-center justify-center"><Loader2 className="w-8 h-8 text-indigo-600 animate-spin" /></div>;
  }
  if (hasError) { /* ... error message ... */
    return <div className="h-[400px] w-full flex items-center justify-center text-red-600"><AlertTriangle className="w-6 h-6 mr-2" /> Error loading comparison data</div>;
  }

  // --- GDP Treemap Visualization ---
  if (type === 'gdp' && gdpData) {
    const comparableCountries = gdpData.filter(country => typeof country.gdp === 'number' && country.gdp > 0 && country.gdp <= wealth);

    const treemapData: TreemapNode = {
      name: entityName, // Root node ID remains the entity name
      // No color needed for root if using scheme for children
      children: comparableCountries.map(country => ({
        name: `${country.country} (${(country.gdp ?? 0).toLocaleString()} B)`,
        countryName: country.country,
        value: country.gdp ?? 0,
        originalValue: country.gdp ?? 0,
        unit: 'Billion USD',
        flagUrl: country.flagUrl,
        // No color needed here if using scheme
      })),
      // Value can be arbitrary if children exist and value prop is set on component
      value: comparableCountries.length > 0 ? comparableCountries.reduce((sum, c) => sum + (c.gdp ?? 0), 0) : 1,
    };

    let totalComparableGdp = 0;
    if (comparableCountries.length > 0) {
        totalComparableGdp = comparableCountries.reduce((sum, c) => sum + (c.gdp ?? 0), 0);
    } else {
        treemapData.children = [{ name: "No comparable countries found in this dataset for this fortune.", value: 1, countryName: "N/A" }];
        treemapData.value = 1;
    }

    const remainingWealthAfterComparisons = wealth - totalComparableGdp;

    const handleShareGDP = () => {
       const numCountries = comparableCountries.length;
       let comparisonText = `is larger than many national GDPs.`;
       if (numCountries > 0) {
           const exampleCountry = comparableCountries[0].country;
           comparisonText = `fits the GDP of ${numCountries} countries (like ${exampleCountry}) inside it!`;
           if (remainingWealthAfterComparisons > 0 && numCountries > 0) {
               comparisonText += ` Still, $${remainingWealthAfterComparisons.toLocaleString(undefined, {maximumFractionDigits:1})}B would be left over.`;
           }
       }
       const text = `${entityName}'s fortune ($${wealth.toLocaleString()}B) ${comparisonText} #WealthPlayground ${window.location.href}`;
       navigator.clipboard.writeText(text).then(() => alert('Comparison copied!')).catch(err => console.error(err));
    }

    return (
      <div className="relative w-full bg-white p-2 rounded-lg shadow"> {/* Increased parent padding slightly */}
         <h4 className="pt-2 mb-0 text-base font-semibold text-center text-gray-800">{entityName} (${wealth.toLocaleString()}B) vs. National GDPs</h4>
         <p className="mb-1 text-xs text-center text-gray-600">Countries whose entire GDP fits within the fortune. Hover/tap for details.</p>

         <div className="w-full h-[400px]"> {/* Increased height for treemap slightly */}
            <ResponsiveTreeMap
              data={treemapData}
              identity="name" // This should be unique, like countryName
              value="value" // The GDP value
              valueFormat={v => `$${v.toLocaleString()} B`}
              margin={{ top: 5, right: 5, bottom: 5, left: 5 }} // Adjusted margins
              label={(node) => {
                 if (!node.data.countryName || node.data.countryName === "N/A" || node.width < 60 || node.height < 30) return '';
                 return `${node.data.countryName} ($${(node.data.originalValue ?? 0).toLocaleString()}B)`;
              }}
              labelSkipSize={14} // Increased skip size
              labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 2.5 ] ] }}
              parentLabel={(node) => node.id === entityName ? '' : node.id} // Hide root label if it's the entity name, or format it
              parentLabelPosition="left"
              parentLabelSize={14} // Increased parent label size
              parentLabelPadding={5}
              parentLabelTextColor={{ from: 'color', modifiers: [ [ 'darker', 3 ] ] }}
              nodeOpacity={0.85}
              borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.5 ] ] }}
              borderWidth={1} // Increased border width
              tooltip={({ node }) => {
                if (node.data.countryName === "N/A") {
                    return <div className="p-2 text-sm bg-white border rounded shadow">No comparable countries found for this fortune.</div>;
                }
                return (
                 <div className="flex items-center gap-2 p-2 text-sm bg-white border rounded-md shadow-lg">
                    {node.data.flagUrl && <img src={node.data.flagUrl} alt={`${node.data.countryName} flag`} className="w-6 h-auto border border-gray-300"/>}
                    <div className="flex flex-col">
                        <strong className="text-gray-800">{node.data.countryName || node.id}</strong>
                        {node.data.originalValue != null && <span className="text-gray-600">${node.data.originalValue.toLocaleString()} Billion (GDP {node.data.year || ''})</span>}
                    </div>
                 </div>
              )}}
              theme={{
                 tooltip: { container: { background: 'white', color: '#333', fontSize: '12px', borderRadius: '4px' } },
                 labels: { text: { fontSize: 10, fontWeight: 600, pointerEvents: 'none' } }, // Adjusted label font
              }}
              colors={{ scheme: 'blues' }} // Changed color scheme
              animate={true}
              motionConfig="stiff" // Changed motion config
            />
         </div>
         {comparableCountries.length > 0 && remainingWealthAfterComparisons > 1 && (
            <p className="mt-2 text-xs text-center text-gray-600">
                After fitting these {comparableCountries.length} countries, {entityName} would still have
                <span className="font-semibold text-indigo-700"> ${remainingWealthAfterComparisons.toLocaleString(undefined, {maximumFractionDigits:1})} Billion</span> remaining.
            </p>
         )}
         <button
            onClick={handleShareGDP}
            className="absolute p-1.5 text-xs text-gray-500 rounded-md top-2 right-2 hover:bg-gray-100 hover:text-indigo-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            aria-label="Share this comparison"
          >
            <Share2 className="w-4 h-4" /> {/* Slightly larger icon */}
          </button>
      </div>
    );
  }

  // --- Problems Comparison Visualization ---
  if (type === 'problems' && indicatorData) {
    const handleShareProblem = (problem: GlobalIndicatorData, multiple: number) => {
      const text = `Did you know ${entityName}'s fortune ($${wealth.toLocaleString()}B) could fund ${problem.name} ${multiple.toFixed(1)} times over? (Est. Cost: $${(problem.value ?? 0).toLocaleString()}B) #WealthPlayground ${window.location.href}`;
      navigator.clipboard.writeText(text).then(() => alert('Comparison copied!')).catch(err => console.error(err));
    };

    return (
      <div className="p-4 space-y-6 bg-white rounded-lg shadow"> {/* Increased space-y */}
        <h4 className="text-base font-semibold text-center text-gray-800">
          Global Problems {entityName}'s Fortune (${wealth.toLocaleString()}B) Could Solve
        </h4>
        {indicatorData.map((problem, index) => {
          const problemCost = problem.value ?? 0;
          const multiple = problemCost > 0 ? wealth / problemCost : Infinity;
          const Icon = problemIcons[problem.name] || HeartHandshake;

          // Calculate width percentage for the wealth bar relative to problem cost
          // Cap at 100% for visualization if wealth far exceeds problem cost
          let wealthBarPercentage = 0;
          if (problemCost > 0) {
            wealthBarPercentage = Math.min(100, (wealth / problemCost) * 100 / (Math.ceil(multiple > 0 ? multiple : 1)) ) ; // Show one full bar segment
            if (multiple > 1) wealthBarPercentage = Math.min(100, (wealth / (problemCost * Math.ceil(multiple)) ) * 100);

          }
          if (multiple === Infinity && problemCost === 0) wealthBarPercentage = 100; // Problem costs 0, can fund infinitely
          if (multiple < 1 && multiple > 0) wealthBarPercentage = (wealth/problemCost) * 100;


          return (
            <motion.div
              key={problem.name}
              className="p-4 border border-gray-200 rounded-lg bg-slate-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon className="flex-shrink-0 w-6 h-6 text-emerald-600" />
                  <p className="font-semibold text-gray-700">{problem.name}</p>
                </div>
                <button
                  onClick={() => handleShareProblem(problem, multiple)}
                  className="p-1.5 text-xs text-gray-500 rounded-md hover:bg-gray-100 hover:text-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  aria-label="Share this comparison"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
              <p className="mb-1 text-xs text-gray-500">
                Est. Cost: ~${problemCost.toLocaleString()} Billion ({problem.unit?.includes('Annual') ? 'Annual' : 'Total'})
                <span className="block sm:inline sm:ml-2">| Source: {problem.source} ({problem.year})</span>
              </p>

              {problemCost > 0 && (
                <div className="mt-2">
                  <div className="relative w-full h-6 mb-1 overflow-hidden bg-gray-200 rounded-full">
                    {/* Problem Cost Bar (always 100% of its own segment) */}
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-emerald-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${wealthBarPercentage}%` }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                  <p className="text-sm font-bold text-emerald-700">
                    Could fund {multiple === Infinity ? 'Infinitely (cost is $0)' : `${multiple.toFixed(1)} times over`}
                  </p>
                </div>
              )}
              {problemCost === 0 && (
                 <p className="mt-1 text-lg font-bold text-emerald-700">Cost is $0, can be funded infinitely!</p>
              )}
            </motion.div>
          );
        })}
      </div>
    );
  }

  return null;
}
