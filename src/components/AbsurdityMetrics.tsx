import React from 'react';
import { motion } from 'framer-motion';
import { Share2, User, Scale as ScaleIcon, Weight as WeightIcon } from 'lucide-react'; // Removed Timer
// Import the new data source and types
import { absurdityCalculations, AbsurdityCalculation } from '../data/landingPageData';
import { InfoCard } from './InfoCard'; // Use InfoCard as fallback/base

interface AbsurdityMetricsProps {
  wealth: number;
  entityName?: string; // Optional: For share text
}

// --- Visualization Components ---

// Time to Spend Visualization (Animated Counter)
const TimeToSpendViz: React.FC<{ metric: AbsurdityCalculation; wealth: number; entityName?: string }> = ({ metric, wealth, entityName }) => {
  // ... (existing code) ...
  const years = metric.calculate(wealth);
  const numericYears = parseFloat(years.split(' ')[0].replace(/,/g, ''));
  const [displayYears, setDisplayYears] = React.useState(0);
  React.useEffect(() => { const end = isNaN(numericYears) ? 0 : numericYears; if (end === 0) { setDisplayYears(0); return; } const duration = 1500; const startTime = Date.now(); const frame = () => { const now = Date.now(); const elapsed = now - startTime; const progress = Math.min(1, elapsed / duration); setDisplayYears(Math.floor(progress * end)); if (progress < 1) { requestAnimationFrame(frame); } else { setDisplayYears(end); } }; requestAnimationFrame(frame); }, [numericYears]);
  const handleShare = () => { const textToShare = `${metric.name} for ${entityName || 'this fortune'} (${wealth}B): ${years}! ${metric.description} #WealthPlayground ${window.location.href}`; navigator.clipboard.writeText(textToShare).then(() => alert('Copied fact to clipboard!')).catch(err => console.error('Failed to copy text: ', err)); };
  return ( <div className="p-4 overflow-hidden text-center bg-white border border-gray-200 shadow-md sm:p-6 rounded-xl"> <div className="flex items-center justify-center gap-2 mb-2 sm:gap-3 sm:mb-3"> <metric.icon className="flex-shrink-0 w-5 h-5 text-indigo-600 sm:w-6 sm:h-6" /> <h3 className="text-base font-semibold text-gray-800 sm:text-lg">{metric.name}</h3> </div> <p className="mb-2 font-mono text-3xl font-bold text-indigo-700 sm:text-4xl">{displayYears.toLocaleString()} years</p> <p className="mb-3 text-sm text-gray-600 sm:text-base">{metric.description}</p> <button onClick={handleShare} className="p-1 text-xs text-gray-400 rounded hover:bg-gray-100 hover:text-indigo-600" aria-label="Share this fact"> <Share2 className="inline w-3 h-3 mr-1" /> Share Fact </button> </div> );
};

// Minimum Wage Visualization (Stick Figure vs Growing Bar)
const MinWageViz: React.FC<{ metric: AbsurdityCalculation; wealth: number; entityName?: string }> = ({ metric, wealth, entityName }) => {
   // ... (existing code) ...
   const yearsString = metric.calculate(wealth);
   const numericYears = parseFloat(yearsString.split(' ')[0].replace(/,/g, ''));
   const scalePercent = isNaN(numericYears) ? 0 : Math.min(100, (numericYears / 1000000) * 100);
   const handleShare = () => { const textToShare = `${metric.name} for ${entityName || 'this fortune'} (${wealth}B): ${yearsString}! ${metric.description} #WealthPlayground ${window.location.href}`; navigator.clipboard.writeText(textToShare).then(() => alert('Copied fact to clipboard!')).catch(err => console.error('Failed to copy text: ', err)); };
   return ( <div className="p-4 overflow-hidden text-center bg-white border border-gray-200 shadow-md sm:p-6 rounded-xl"> <div className="flex items-center justify-center gap-2 mb-2 sm:gap-3 sm:mb-3"> <metric.icon className="flex-shrink-0 w-5 h-5 text-indigo-600 sm:w-6 sm:h-6" /> <h3 className="text-base font-semibold text-gray-800 sm:text-lg">{metric.name}</h3> </div> <p className="mb-2 font-mono text-3xl font-bold text-indigo-700 sm:text-4xl">{yearsString}</p> <div className="relative flex items-end justify-center w-full h-24 mt-2 mb-4 bg-gray-100 rounded"> <div className="absolute bottom-0 left-1/4"><User className="w-3 h-6 text-gray-600" /></div> <motion.div className="absolute bottom-0 w-4 rounded-t bg-gradient-to-t from-red-400 to-red-600" initial={{ height: 0 }} whileInView={{ height: `${scalePercent}%` }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 2, ease: 'easeOut' }}/> {scalePercent >= 100 && (<span className="absolute text-xs text-red-700 -top-4 right-1/4 animate-pulse">...keeps going!</span>)} </div> <p className="mb-3 text-sm text-gray-600 sm:text-base">{metric.description}</p> <button onClick={handleShare} className="p-1 text-xs text-gray-400 rounded hover:bg-gray-100 hover:text-indigo-600" aria-label="Share this fact"> <Share2 className="inline w-3 h-3 mr-1" /> Share Fact </button> </div> );
};

// Dollar Bills End-to-End Visualization (Globe Wrap)
const DollarBillViz: React.FC<{ metric: AbsurdityCalculation; wealth: number; entityName?: string }> = ({ metric, wealth, entityName }) => {
  // ... (existing code) ...
  const wrapString = metric.calculate(wealth);
  const wrapCount = parseFloat(wrapString.split(' ')[3]);
  const handleShare = () => { const textToShare = `${metric.name} for ${entityName || 'this fortune'} (${wealth}B): ${wrapString}! ${metric.description} #WealthPlayground ${window.location.href}`; navigator.clipboard.writeText(textToShare).then(() => alert('Copied fact to clipboard!')).catch(err => console.error('Failed to copy text: ', err)); };
  return ( <div className="p-4 overflow-hidden text-center bg-white border border-gray-200 shadow-md sm:p-6 rounded-xl"> <div className="flex items-center justify-center gap-2 mb-2 sm:gap-3 sm:mb-3"> <metric.icon className="flex-shrink-0 w-5 h-5 text-indigo-600 sm:w-6 sm:h-6" /> <h3 className="text-base font-semibold text-gray-800 sm:text-lg">{metric.name}</h3> </div> <p className="mb-2 font-mono text-3xl font-bold text-indigo-700 sm:text-4xl">{wrapString}</p> <div className="flex items-center justify-center w-full h-24 mt-2 mb-4"> <motion.svg viewBox="0 0 100 100" className="w-20 h-20 overflow-visible"> <circle cx="50" cy="50" r="40" fill="none" stroke="#9ca3af" strokeWidth="2" /> <path d="M50 10 C 70 25, 80 45, 75 60 S 60 85, 50 90 C 40 85, 25 75, 25 60 S 30 25, 50 10 Z" fill="#a7f3d0" opacity="0.5"/> <motion.path d="M10,50 a40,40 0 1,1 0,0.0001" fill="none" stroke="#4f46e5" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0, rotate: -90, originX: "50px", originY: "50px" }} whileInView={{ pathLength: Math.min(1, wrapCount / 2) }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 1.5, ease: "easeInOut" }} /> {wrapCount > 2 && <motion.path d="M10,50 a40,40 0 1,1 0,0.0001" fill="none" stroke="#4f46e5" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0, rotate: -90, originX: "50px", originY: "50px" }} whileInView={{ pathLength: Math.min(1, (wrapCount - 2) / 2) }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 1.5, delay: 1.5, ease: "easeInOut" }}/>} </motion.svg> </div> <p className="mb-3 text-sm text-gray-600 sm:text-base">{metric.description}</p> <button onClick={handleShare} className="p-1 text-xs text-gray-400 rounded hover:bg-gray-100 hover:text-indigo-600" aria-label="Share this fact"> <Share2 className="inline w-3 h-3 mr-1" /> Share Fact </button> </div> );
};

// Weight in Gold Visualization (Balance Scale)
const GoldWeightViz: React.FC<{ metric: AbsurdityCalculation; wealth: number; entityName?: string }> = ({ metric, wealth, entityName }) => {
  // ... (existing code) ...
  const weightString = metric.calculate(wealth);
  const weightKg = parseFloat(weightString.split(' ')[0].replace(/,/g, ''));
  const blueWhaleWeight = 150000; const boeing747Weight = 180000;
  let comparisonObject = ''; let comparisonCount = 0;
  if (!isNaN(weightKg) && weightKg > 0) { if (weightKg > boeing747Weight) { comparisonObject = 'Boeing 747s'; comparisonCount = Math.floor(weightKg / boeing747Weight); } else if (weightKg > blueWhaleWeight) { comparisonObject = 'Blue Whales'; comparisonCount = Math.floor(weightKg / blueWhaleWeight); } }
  const handleShare = () => { const comparisonText = comparisonCount > 0 ? ` That's heavier than ${comparisonCount.toLocaleString()} ${comparisonObject}!` : ''; const textToShare = `${metric.name} for ${entityName || 'this fortune'} (${wealth}B): ${weightString}!${comparisonText} ${metric.description} #WealthPlayground ${window.location.href}`; navigator.clipboard.writeText(textToShare).then(() => alert('Copied fact to clipboard!')).catch(err => console.error('Failed to copy text: ', err)); };
  const scaleTilt = comparisonCount > 0 ? -5 : 0;
  return ( <div className="p-4 overflow-hidden text-center bg-white border border-gray-200 shadow-md sm:p-6 rounded-xl"> <div className="flex items-center justify-center gap-2 mb-2 sm:gap-3 sm:mb-3"> <metric.icon className="flex-shrink-0 w-5 h-5 text-indigo-600 sm:w-6 sm:h-6" /> <h3 className="text-base font-semibold text-gray-800 sm:text-lg">{metric.name}</h3> </div> <p className="mb-2 font-mono text-3xl font-bold text-indigo-700 sm:text-4xl">{weightString}</p> <div className="flex items-center justify-center w-full h-24 mt-2 mb-4"> <motion.svg viewBox="-50 -10 100 60" className="w-32 h-auto overflow-visible"> <path d="M -10 40 L 10 40 L 0 30 Z" fill="#6b7280" /> <rect x="-2" y="0" width="4" height="30" fill="#6b7280" /> <motion.g initial={{ rotate: 0 }} animate={{ rotate: scaleTilt }} transition={{ type: 'spring', stiffness: 50, damping: 10 }}> <rect x="-40" y="-5" width="80" height="10" fill="#9ca3af" rx="2" /> <path d="M -45 -5 a 10 10 0 0 0 20 0 Z" fill="#facc15" /> <line x1="-35" y1="5" x2="-35" y2="-5" stroke="#6b7280" strokeWidth="1" /> <WeightIcon x="-42" y="-18" size={16} className="text-yellow-700" /> <path d="M 25 -5 a 10 10 0 0 0 20 0 Z" fill="#d1d5db" /> <line x1="35" y1="5" x2="35" y2="-5" stroke="#6b7280" strokeWidth="1" /> {comparisonCount > 0 && <ScaleIcon x="28" y="-18" size={16} className="text-gray-700" />} </motion.g> </motion.svg> </div> {comparisonCount > 0 && (<p className="mb-1 text-sm font-semibold text-gray-700">Heavier than {comparisonCount.toLocaleString()} {comparisonObject}!</p>)} <p className="mb-3 text-sm text-gray-600 sm:text-base">{metric.description}</p> <button onClick={handleShare} className="p-1 text-xs text-gray-400 rounded hover:bg-gray-100 hover:text-indigo-600" aria-label="Share this fact"> <Share2 className="inline w-3 h-3 mr-1" /> Share Fact </button> </div> );
};

// Time to Count Visualization (Animated Clock/Counter)
const TimeToCountViz: React.FC<{ metric: AbsurdityCalculation; wealth: number; entityName?: string }> = ({ metric, wealth, entityName }) => {
  const timeString = metric.calculate(wealth); // e.g., "1.2e+4 years" or "500 years"
  // Basic visualization: Just display the text prominently for now
  // TODO: Implement a more visual clock/calendar animation later

  const handleShare = () => {
    const textToShare = `${metric.name} for ${entityName || 'this fortune'} (${wealth}B): ${timeString}! ${metric.description} #WealthPlayground ${window.location.href}`;
    navigator.clipboard.writeText(textToShare)
      .then(() => alert('Copied fact to clipboard!'))
      .catch(err => console.error('Failed to copy text: ', err));
  };

  return (
    <div className="p-4 overflow-hidden text-center bg-white border border-gray-200 shadow-md sm:p-6 rounded-xl">
      <div className="flex items-center justify-center gap-2 mb-2 sm:gap-3 sm:mb-3">
        <metric.icon className="flex-shrink-0 w-5 h-5 text-indigo-600 sm:w-6 sm:h-6" />
        <h3 className="text-base font-semibold text-gray-800 sm:text-lg">{metric.name}</h3>
      </div>
      <p className="mb-2 font-mono text-3xl font-bold text-indigo-700 sm:text-4xl">
        {timeString}
      </p>
      {/* Placeholder for visual */}
      <div className="h-10 my-2 text-xs text-center text-gray-400">[Clock/Calendar Viz Placeholder]</div>
      <p className="mb-3 text-sm text-gray-600 sm:text-base">{metric.description}</p>
      <button
        onClick={handleShare}
        className="p-1 text-xs text-gray-400 rounded hover:bg-gray-100 hover:text-indigo-600"
        aria-label="Share this fact"
      >
        <Share2 className="inline w-3 h-3 mr-1" /> Share Fact
      </button>
    </div>
  );
};


// --- Main Component ---

export function AbsurdityMetrics({ wealth, entityName }: AbsurdityMetricsProps) {
  const metricsToDisplay = absurdityCalculations;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 sm:gap-6">
      {metricsToDisplay.map((metric) => {
        // Conditionally render specific visualizations
        if (metric.name === 'Time to Spend ($1M/day)') {
          return <TimeToSpendViz key={metric.name} metric={metric} wealth={wealth} entityName={entityName} />;
        }
        if (metric.name === 'Minimum Wage Years') {
           return <MinWageViz key={metric.name} metric={metric} wealth={wealth} entityName={entityName} />;
        }
        if (metric.name === '$100 Bills End-to-End') {
           return <DollarBillViz key={metric.name} metric={metric} wealth={wealth} entityName={entityName} />;
        }
         if (metric.name === 'Weight in Gold') {
           return <GoldWeightViz key={metric.name} metric={metric} wealth={wealth} entityName={entityName} />;
        }
         if (metric.name === 'Time to Count ($100 Bills)') {
           return <TimeToCountViz key={metric.name} metric={metric} wealth={wealth} entityName={entityName} />;
        }

        // Fallback to InfoCard for other metrics
        return (
          <InfoCard
            key={metric.name}
            icon={metric.icon}
            title={metric.name}
            value={metric.calculate(wealth)}
            description={metric.description}
            // TODO: Add share button to InfoCard
          />
        );
      })}
    </div>
  );
}
