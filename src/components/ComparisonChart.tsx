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

    if (comparableCountries.length === 0) {
        treemapData.children = [{ name: "No comparable countries found in this dataset.", value: 1 }];
        treemapData.value = 1;
    }

    const handleShareGDP = () => { /* ... share logic ... */
       const comparisonText = comparableCountries.length > 0 ? `fits the GDP of ${comparableCountries.length} countries like ${comparableCountries[0].country} inside it!` : "is larger than many national GDPs.";
       const text = `${entityName}'s fortune ($${wealth.toLocaleString()}B) ${comparisonText} #WealthPlayground ${window.location.href}`;
       navigator.clipboard.writeText(text).then(() => alert('Comparison copied!')).catch(err => console.error(err));
    }

    return (
      // Ensure parent div allows chart to take full height
      <div className="relative h-[450px] w-full bg-white p-1 rounded-lg shadow">
         {/* Titles outside the chart div */}
         <h4 className="pt-2 mb-0 text-sm font-semibold text-center">{entityName} (${wealth.toLocaleString()}B) vs. National GDPs</h4>
         <p className="mb-1 text-xs text-center text-gray-500">Countries whose entire GDP fits within the fortune:</p>
         {/* Chart container */}
         <div className="w-full h-[380px]"> {/* Give explicit height to inner container */}
            <ResponsiveTreeMap
              data={treemapData}
              identity="name"
              value="value"
              valueFormat={v => `$${v.toLocaleString()} B`} // Format value in tooltips
              // Adjust margin to prevent label cutoff
              margin={{ top: 2, right: 2, bottom: 2, left: 2 }}
              // Custom label component showing name and value
              label={( node ) => {
                 // Check if it's a child node (has countryName) and is large enough
                 if (!node.data.countryName || node.width < 50 || node.height < 25) return '';
                 return `${node.data.countryName} ($${(node.data.originalValue ?? 0).toLocaleString()}B)`;
              }}
              labelSkipSize={10} // Skip smaller labels
              labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }} // Darker labels
              enableParentLabel={true} // Enable parent label again
              parentLabelPosition="left"
              parentLabelSize={12}
              parentLabelPadding={4}
              parentLabelTextColor={{ from: 'color', modifiers: [ [ 'darker', 3 ] ] }}
              nodeOpacity={1}
              borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.3 ] ] }}
              borderWidth={0.5}
              tooltip={({ node }) => ( // Tooltip with flag
                 <div className="flex items-center gap-2 p-2 text-sm bg-white border rounded shadow">
                    {node.data.flagUrl && <img src={node.data.flagUrl} alt="" className="w-5 h-auto"/>}
                    <strong>{node.data.countryName || node.id}:</strong>
                    {node.data.originalValue != null && <span>${node.data.originalValue.toLocaleString()} Billion</span>}
                 </div>
              )}
              theme={{
                 tooltip: { container: { background: 'white', color: 'inherit', fontSize: '12px' } },
                 labels: { text: { fontSize: 9, fontWeight: 500, pointerEvents: 'none' } },
              }}
              colors={{ scheme: 'nivo' }} // Use a Nivo color scheme
              animate={true}
              motionConfig="gentle"
            />
         </div>
         <button
            onClick={handleShareGDP}
            className="absolute p-1 text-xs text-gray-400 rounded top-2 right-2 hover:bg-gray-100 hover:text-indigo-600"
            aria-label="Share this comparison"
          >
            <Share2 className="w-3 h-3" />
          </button>
      </div>
    );
  }

  // --- Problems Comparison Visualization ---
  if (type === 'problems' && indicatorData) {
     // ... (Problems section remains the same) ...
     const handleShareProblem = (problem: GlobalIndicatorData, multiple: number) => { const text = `Did you know ${entityName}'s fortune ($${wealth.toLocaleString()}B) could fund ${problem.name} ${multiple.toFixed(1)} times over? (Est. Cost: $${(problem.value ?? 0).toLocaleString()}B) #WealthPlayground ${window.location.href}`; navigator.clipboard.writeText(text).then(() => alert('Comparison copied!')).catch(err => console.error(err)); }
     return ( <div className="p-4 space-y-4 bg-white rounded-lg shadow"> <h4 className="mb-2 text-sm font-semibold text-center">How {entityName}'s Fortune (${wealth.toLocaleString()}B) Compares to Global Problem Costs</h4> {indicatorData.map(problem => { const problemCost = problem.value ?? 0; const multiple = problemCost > 0 ? wealth / problemCost : Infinity; const Icon = problemIcons[problem.name] || HeartHandshake; return ( <div key={problem.name} className="relative p-4 border rounded-lg bg-gray-50"> <div className="flex items-start gap-3"> <Icon className="flex-shrink-0 w-6 h-6 mt-1 text-emerald-600" /> <div className="flex-grow"> <p className="font-semibold">{problem.name}</p> <p className="text-xs text-gray-500"> Est. Cost: ~${problemCost.toLocaleString()} B ({problem.unit?.includes('Annual') ? 'Annual' : 'Total'}) <span className="ml-2">| Source: {problem.source} ({problem.year})</span> </p> {problemCost > 0 && ( <p className="mt-1 text-lg font-bold text-emerald-700"> Could fund {multiple.toFixed(1)} times over </p> )} </div> <button onClick={() => handleShareProblem(problem, multiple)} className="absolute p-1 text-xs text-gray-400 rounded top-2 right-2 hover:bg-gray-100 hover:text-indigo-600" aria-label="Share this comparison"> <Share2 className="w-3 h-3" /> </button> </div> </div> ) })} </div> )
  }

  return null;
}
