import React from 'react';
import { motion } from 'framer-motion';
import { Share2, User, Scale as ScaleIcon, Weight as WeightIcon } from 'lucide-react';
import { absurdityCalculations, AbsurdityCalculation } from '../data/landingPageData';
import { InfoCard } from './InfoCard';

interface AbsurdityMetricsProps {
  wealth: number;
  entityName?: string;
}

// --- Visualization Components ---

// Time to Spend Visualization (Animated Counter) - No looping
const TimeToSpendViz: React.FC<{ metric: AbsurdityCalculation; wealth: number; entityName?: string }> = ({ metric, wealth, entityName }) => {
  const years = metric.calculate(wealth);
  const numericYears = parseFloat(years.split(' ')[0].replace(/,/g, ''));
  const [displayYears, setDisplayYears] = React.useState(0);
  React.useEffect(() => { const end = isNaN(numericYears) ? 0 : numericYears; if (end === 0) { setDisplayYears(0); return; } const duration = 1500; const startTime = Date.now(); const frame = () => { const now = Date.now(); const elapsed = now - startTime; const progress = Math.min(1, elapsed / duration); setDisplayYears(Math.floor(progress * end)); if (progress < 1) { requestAnimationFrame(frame); } else { setDisplayYears(end); } }; requestAnimationFrame(frame); }, [numericYears]);
  const handleShare = () => { const textToShare = `${metric.name} for ${entityName || 'this fortune'} (${wealth}B): ${years}! ${metric.description} #WealthPlayground ${window.location.href}`; navigator.clipboard.writeText(textToShare).then(() => alert('Copied fact to clipboard!')).catch(err => console.error('Failed to copy text: ', err)); };
  return ( <div className="p-4 overflow-hidden text-center bg-white border border-gray-200 shadow-md sm:p-6 rounded-xl"> <div className="flex items-center justify-center gap-2 mb-2 sm:gap-3 sm:mb-3"> <metric.icon className="flex-shrink-0 w-5 h-5 text-indigo-600 sm:w-6 sm:h-6" /> <h3 className="text-base font-semibold text-gray-800 sm:text-lg">{metric.name}</h3> </div> <p className="mb-2 font-mono text-3xl font-bold text-indigo-700 sm:text-4xl">{displayYears.toLocaleString()} years</p> <p className="mb-3 text-sm text-gray-600 sm:text-base">{metric.description}</p> <button onClick={handleShare} className="p-1 text-xs text-gray-400 rounded hover:bg-gray-100 hover:text-indigo-600" aria-label="Share this fact"> <Share2 className="inline w-3 h-3 mr-1" /> Share Fact </button> </div> );
};

// Minimum Wage Visualization (Stick Figure vs Growing Bar)
const MinWageViz: React.FC<{ metric: AbsurdityCalculation; wealth: number; entityName?: string }> = ({ metric, wealth, entityName }) => {
   const yearsString = metric.calculate(wealth);
   const numericYears = parseFloat(yearsString.split(' ')[0].replace(/,/g, ''));
   const scalePercent = isNaN(numericYears) ? 0 : Math.min(100, (numericYears / 1000000) * 100);
   const handleShare = () => { const textToShare = `${metric.name} for ${entityName || 'this fortune'} (${wealth}B): ${yearsString}! ${metric.description} #WealthPlayground ${window.location.href}`; navigator.clipboard.writeText(textToShare).then(() => alert('Copied fact to clipboard!')).catch(err => console.error('Failed to copy text: ', err)); };
   return (
     <div className="p-4 overflow-hidden text-center bg-white border border-gray-200 shadow-md sm:p-6 rounded-xl">
       <div className="flex items-center justify-center gap-2 mb-2 sm:gap-3 sm:mb-3"> <metric.icon className="flex-shrink-0 w-5 h-5 text-indigo-600 sm:w-6 sm:h-6" /> <h3 className="text-base font-semibold text-gray-800 sm:text-lg">{metric.name}</h3> </div>
       <p className="mb-2 font-mono text-3xl font-bold text-indigo-700 sm:text-4xl">{yearsString}</p>
       <div className="relative flex items-end justify-center w-full h-24 mt-2 mb-4 bg-gray-100 rounded">
          <div className="absolute bottom-0 left-1/4"><User className="w-3 h-6 text-gray-600" /></div>
          <motion.div
             className="absolute bottom-0 w-4 rounded-t bg-gradient-to-t from-red-400 to-red-600"
             initial={{ height: 0 }}
             whileInView={{ height: [`0%`, `${scalePercent}%`] }} // Animate from 0 to target
             viewport={{ amount: 0.8 }}
             transition={{
                duration: 2,
                ease: 'easeOut',
                repeat: Infinity, // Loop animation
                repeatType: 'reverse', // Go up and down
                repeatDelay: 1 // Pause between loops
             }}
          />
          {scalePercent >= 100 && (<span className="absolute text-xs text-red-700 -top-4 right-1/4 animate-pulse">...keeps going!</span>)}
       </div>
       <p className="mb-3 text-sm text-gray-600 sm:text-base">{metric.description}</p>
       <button onClick={handleShare} className="p-1 text-xs text-gray-400 rounded hover:bg-gray-100 hover:text-indigo-600" aria-label="Share this fact"> <Share2 className="inline w-3 h-3 mr-1" /> Share Fact </button>
     </div>
   );
};

// Dollar Bills End-to-End Visualization (Globe Wrap)
const DollarBillViz: React.FC<{ metric: AbsurdityCalculation; wealth: number; entityName?: string }> = ({ metric, wealth, entityName }) => {
  const wrapString = metric.calculate(wealth);
  const wrapCount = parseFloat(wrapString.split(' ')[3]);
  const handleShare = () => { const textToShare = `${metric.name} for ${entityName || 'this fortune'} (${wealth}B): ${wrapString}! ${metric.description} #WealthPlayground ${window.location.href}`; navigator.clipboard.writeText(textToShare).then(() => alert('Copied fact to clipboard!')).catch(err => console.error('Failed to copy text: ', err)); };
  return (
    <div className="p-4 overflow-hidden text-center bg-white border border-gray-200 shadow-md sm:p-6 rounded-xl">
      <div className="flex items-center justify-center gap-2 mb-2 sm:gap-3 sm:mb-3"> <metric.icon className="flex-shrink-0 w-5 h-5 text-indigo-600 sm:w-6 sm:h-6" /> <h3 className="text-base font-semibold text-gray-800 sm:text-lg">{metric.name}</h3> </div>
      <p className="mb-2 font-mono text-3xl font-bold text-indigo-700 sm:text-4xl">{wrapString}</p>
      <div className="flex items-center justify-center w-full h-24 mt-2 mb-4">
         <motion.svg viewBox="0 0 100 100" className="w-20 h-20 overflow-visible">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#9ca3af" strokeWidth="2" />
            <path d="M50 10 C 70 25, 80 45, 75 60 S 60 85, 50 90 C 40 85, 25 75, 25 60 S 30 25, 50 10 Z" fill="#a7f3d0" opacity="0.5"/>
            {/* Animated Wrapping Line - Loop this one */}
            <motion.path
               d="M10,50 a40,40 0 1,1 0,0.0001"
               fill="none" stroke="#4f46e5" strokeWidth="3" strokeLinecap="round"
               initial={{ pathLength: 0, rotate: -90, originX: "50px", originY: "50px" }}
               animate={{ pathLength: [0, 1, 0] }} // Animate draw and erase
               transition={{
                  duration: 2.5, // Slower duration for draw/erase
                  ease: "easeInOut",
                  repeat: Infinity, // Loop the drawing
                  repeatType: "loop",
                  repeatDelay: 0.5
               }}
            />
             {/* Static lines for additional wraps */}
             {wrapCount > 1 && <path d="M10,50 a40,40 0 1,1 0,0.0001" fill="none" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" style={{ transformOrigin: '50px 50px', transform: 'rotate(-90deg)' }} />}
             {wrapCount > 2 && <path d="M10,50 a40,40 0 1,1 0,0.0001" fill="none" stroke="#A5B4FC" strokeWidth="1" strokeLinecap="round" style={{ transformOrigin: '50px 50px', transform: 'rotate(-90deg)' }} />}
         </motion.svg>
      </div>
      <p className="mb-3 text-sm text-gray-600 sm:text-base">{metric.description}</p>
      <button onClick={handleShare} className="p-1 text-xs text-gray-400 rounded hover:bg-gray-100 hover:text-indigo-600" aria-label="Share this fact"> <Share2 className="inline w-3 h-3 mr-1" /> Share Fact </button>
    </div>
  );
};

// Weight in Gold Visualization (Balance Scale)
const GoldWeightViz: React.FC<{ metric: AbsurdityCalculation; wealth: number; entityName?: string }> = ({ metric, wealth, entityName }) => {
  const weightString = metric.calculate(wealth);
  const weightKg = parseFloat(weightString.split(' ')[0].replace(/,/g, ''));
  const blueWhaleWeight = 150000; const boeing747Weight = 180000;
  let comparisonObject = ''; let comparisonCount = 0;
  if (!isNaN(weightKg) && weightKg > 0) { if (weightKg > boeing747Weight) { comparisonObject = 'Boeing 747s'; comparisonCount = Math.floor(weightKg / boeing747Weight); } else if (weightKg > blueWhaleWeight) { comparisonObject = 'Blue Whales'; comparisonCount = Math.floor(weightKg / blueWhaleWeight); } }
  const handleShare = () => { const comparisonText = comparisonCount > 0 ? ` That's heavier than ${comparisonCount.toLocaleString()} ${comparisonObject}!` : ''; const textToShare = `${metric.name} for ${entityName || 'this fortune'} (${wealth}B): ${weightString}!${comparisonText} ${metric.description} #WealthPlayground ${window.location.href}`; navigator.clipboard.writeText(textToShare).then(() => alert('Copied fact to clipboard!')).catch(err => console.error('Failed to copy text: ', err)); };
  const scaleTilt = comparisonCount > 0 ? -5 : 0;
  return (
    <div className="p-4 overflow-hidden text-center bg-white border border-gray-200 shadow-md sm:p-6 rounded-xl">
      <div className="flex items-center justify-center gap-2 mb-2 sm:gap-3 sm:mb-3"> <metric.icon className="flex-shrink-0 w-5 h-5 text-indigo-600 sm:w-6 sm:h-6" /> <h3 className="text-base font-semibold text-gray-800 sm:text-lg">{metric.name}</h3> </div>
      <p className="mb-2 font-mono text-3xl font-bold text-indigo-700 sm:text-4xl">{weightString}</p>
      <div className="flex items-center justify-center w-full h-24 mt-2 mb-4">
        <motion.svg viewBox="-50 -10 100 60" className="w-32 h-auto overflow-visible">
          <path d="M -10 40 L 10 40 L 0 30 Z" fill="#6b7280" /> <rect x="-2" y="0" width="4" height="30" fill="#6b7280" />
          {/* Make scale animation loop */}
          <motion.g
             initial={{ rotate: 0 }}
             animate={{ rotate: [0, scaleTilt, 0] }} // Animate tilt and back
             transition={{ duration: 1.5, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse', repeatDelay: 1 }} // Loop back and forth
          >
            <rect x="-40" y="-5" width="80" height="10" fill="#9ca3af" rx="2" />
            <path d="M -45 -5 a 10 10 0 0 0 20 0 Z" fill="#facc15" /> <line x1="-35" y1="5" x2="-35" y2="-5" stroke="#6b7280" strokeWidth="1" /> <WeightIcon x="-42" y="-18" size={16} className="text-yellow-700" />
            <path d="M 25 -5 a 10 10 0 0 0 20 0 Z" fill="#d1d5db" /> <line x1="35" y1="5" x2="35" y2="-5" stroke="#6b7280" strokeWidth="1" /> {comparisonCount > 0 && <ScaleIcon x="28" y="-18" size={16} className="text-gray-700" />}
          </motion.g>
        </motion.svg>
      </div>
      {comparisonCount > 0 && (<p className="mb-1 text-sm font-semibold text-gray-700">Heavier than {comparisonCount.toLocaleString()} {comparisonObject}!</p>)}
      <p className="mb-3 text-sm text-gray-600 sm:text-base">{metric.description}</p>
      <button onClick={handleShare} className="p-1 text-xs text-gray-400 rounded hover:bg-gray-100 hover:text-indigo-600" aria-label="Share this fact"> <Share2 className="inline w-3 h-3 mr-1" /> Share Fact </button>
    </div>
  );
};

// Time to Spend Visualization (Animated Counter) - No looping
const TimeToSpendViz: React.FC<{ metric: AbsurdityCalculation; wealth: number; entityName?: string }> = ({ metric, wealth, entityName }) => {
  const years = metric.calculate(wealth);
  // Extract the numeric part for animation, supporting "X.Ye+Z" format
  const numericPartMatch = years.match(/([\d\.,]+)/);
  const numericValue = numericPartMatch ? parseFloat(numericPartMatch[0].replace(/,/g, '')) : 0;
  const isExponential = years.toLowerCase().includes('e+');
  const exponentialSuffix = isExponential ? ` ${years.substring(years.toLowerCase().indexOf('e+'))}` : ' years';


  const [displayValue, setDisplayValue] = React.useState(0);
  React.useEffect(() => {
    const end = isNaN(numericValue) ? 0 : numericValue;
    if (end === 0) { setDisplayValue(0); return; }
    const duration = 1500; const startTime = Date.now();
    const frame = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      setDisplayValue(Math.floor(progress * end));
      if (progress < 1) { requestAnimationFrame(frame); }
      else { setDisplayValue(end); }
    };
    requestAnimationFrame(frame);
  }, [numericValue]);

  const displayString = isExponential ? `${displayValue.toExponential(1)}` : displayValue.toLocaleString();

  const handleShare = () => { const textToShare = `${metric.name} for ${entityName || 'this fortune'} (${wealth}B): ${years}! ${metric.description} #WealthPlayground ${window.location.href}`; navigator.clipboard.writeText(textToShare).then(() => alert('Copied fact to clipboard!')).catch(err => console.error('Failed to copy text: ', err)); };
  return ( <div className="p-4 overflow-hidden text-center bg-white border border-gray-200 shadow-md sm:p-6 rounded-xl"> <div className="flex items-center justify-center gap-2 mb-2 sm:gap-3 sm:mb-3"> <metric.icon className="flex-shrink-0 w-5 h-5 text-indigo-600 sm:w-6 sm:h-6" /> <h3 className="text-base font-semibold text-gray-800 sm:text-lg">{metric.name}</h3> </div> <p className="mb-2 font-mono text-3xl font-bold text-indigo-700 sm:text-4xl">{displayString}{isExponential ? '' : exponentialSuffix}</p> <p className="mb-3 text-sm text-gray-600 sm:text-base">{metric.description}</p> <button onClick={handleShare} className="p-1.5 text-xs text-gray-500 rounded-md hover:bg-gray-100 hover:text-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-500" aria-label="Share this fact"> <Share2 className="inline w-4 h-4 mr-1" /> Share Fact </button> </div> );
};

// Minimum Wage Visualization (Stick Figure vs Growing Bar)
const MinWageViz: React.FC<{ metric: AbsurdityCalculation; wealth: number; entityName?: string }> = ({ metric, wealth, entityName }) => {
   const yearsString = metric.calculate(wealth);
   const numericYears = parseFloat(yearsString.split(' ')[0].replace(/,/g, ''));
   // Adjust scale for better visualization. If it's millions, it will always be 100%.
   // Let's assume max visual scale represents 1 million years for this bar.
   const maxVisualYears = 1000000;
   const scalePercent = isNaN(numericYears) ? 0 : Math.min(100, (numericYears / maxVisualYears) * 100);
   const handleShare = () => { const textToShare = `${metric.name} for ${entityName || 'this fortune'} (${wealth}B): ${yearsString}! ${metric.description} #WealthPlayground ${window.location.href}`; navigator.clipboard.writeText(textToShare).then(() => alert('Copied fact to clipboard!')).catch(err => console.error('Failed to copy text: ', err)); };
   return (
     <div className="p-4 overflow-hidden text-center bg-white border border-gray-200 shadow-md sm:p-6 rounded-xl">
       <div className="flex items-center justify-center gap-2 mb-2 sm:gap-3 sm:mb-3"> <metric.icon className="flex-shrink-0 w-5 h-5 text-indigo-600 sm:w-6 sm:h-6" /> <h3 className="text-base font-semibold text-gray-800 sm:text-lg">{metric.name}</h3> </div>
       <p className="mb-2 font-mono text-3xl font-bold text-indigo-700 sm:text-4xl">{yearsString}</p>
       <div className="relative flex items-end justify-center w-full h-24 mt-2 mb-4 bg-gray-100 rounded">
          <div className="absolute bottom-0 transform -translate-x-1/2 left-1/2"><User className="w-4 h-8 text-indigo-700" /></div>
          <motion.div
             className="absolute bottom-0 w-4 rounded-t bg-gradient-to-t from-indigo-500 to-purple-600"
             initial={{ height: '0%' }}
             whileInView={{ height: `${scalePercent}%` }}
             viewport={{ once: true, amount: 0.5 }}
             transition={{ duration: 1.5, ease: 'easeOut' }}
          />
          {numericYears > maxVisualYears && (<span className="absolute text-xs text-purple-700 top-0 right-2">...off the charts!</span>)}
       </div>
       <p className="mb-3 text-sm text-gray-600 sm:text-base">{metric.description}</p>
       <button onClick={handleShare} className="p-1.5 text-xs text-gray-500 rounded-md hover:bg-gray-100 hover:text-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-500" aria-label="Share this fact"> <Share2 className="inline w-4 h-4 mr-1" /> Share Fact </button>
     </div>
   );
};

// Dollar Bills End-to-End Visualization (Globe Wrap)
const DollarBillViz: React.FC<{ metric: AbsurdityCalculation; wealth: number; entityName?: string }> = ({ metric, wealth, entityName }) => {
  const wrapString = metric.calculate(wealth);
  const wrapCountMatch = wrapString.match(/([\d\.]+)\s*times/);
  const wrapCount = wrapCountMatch ? parseFloat(wrapCountMatch[1]) : 0;

  const handleShare = () => { const textToShare = `${metric.name} for ${entityName || 'this fortune'} (${wealth}B): ${wrapString}! ${metric.description} #WealthPlayground ${window.location.href}`; navigator.clipboard.writeText(textToShare).then(() => alert('Copied fact to clipboard!')).catch(err => console.error('Failed to copy text: ', err)); };
  return (
    <div className="p-4 overflow-hidden text-center bg-white border border-gray-200 shadow-md sm:p-6 rounded-xl">
      <div className="flex items-center justify-center gap-2 mb-2 sm:gap-3 sm:mb-3"> <metric.icon className="flex-shrink-0 w-5 h-5 text-indigo-600 sm:w-6 sm:h-6" /> <h3 className="text-base font-semibold text-gray-800 sm:text-lg">{metric.name}</h3> </div>
      <p className="mb-2 font-mono text-3xl font-bold text-indigo-700 sm:text-4xl">{wrapString}</p>
      <div className="flex items-center justify-center w-full h-24 mt-2 mb-4">
         <motion.svg viewBox="0 0 100 100" className="w-20 h-20 overflow-visible">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#d1d5db" strokeWidth="2" /> {/* Lighter globe outline */}
            <path d="M50 10 C 70 25, 80 45, 75 60 S 60 85, 50 90 C 40 85, 25 75, 25 60 S 30 25, 50 10 Z" fill="#bfdbfe" opacity="0.7"/> {/* Lighter blue continent */}
            <motion.path
               d="M10,50 a40,40 0 1,1 0,0.0001" // Path for circle
               fill="none" stroke="#4f46e5" strokeWidth="3" strokeLinecap="round"
               initial={{ pathLength: 0, rotate: -90, originX: "50px", originY: "50px" }}
               animate={{ pathLength: [0, 1, 0] }}
               transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                  repeatDelay: 1
               }}
            />
             {wrapCount > 1 && <path d="M10,50 a40,40 0 1,1 0,0.0001" fill="none" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="5 5" style={{ transformOrigin: '50px 50px', transform: 'rotate(-75deg)' }} />}
             {wrapCount > 5 && <path d="M10,50 a40,40 0 1,1 0,0.0001" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 7" style={{ transformOrigin: '50px 50px', transform: 'rotate(-60deg)' }} />}
         </motion.svg>
      </div>
      <p className="mb-3 text-sm text-gray-600 sm:text-base">{metric.description}</p>
      <button onClick={handleShare} className="p-1.5 text-xs text-gray-500 rounded-md hover:bg-gray-100 hover:text-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-500" aria-label="Share this fact"> <Share2 className="inline w-4 h-4 mr-1" /> Share Fact </button>
    </div>
  );
};

// Weight in Gold Visualization (Balance Scale)
const GoldWeightViz: React.FC<{ metric: AbsurdityCalculation; wealth: number; entityName?: string }> = ({ metric, wealth, entityName }) => {
  const weightString = metric.calculate(wealth);
  const weightKg = parseFloat(weightString.split(' ')[0].replace(/,/g, ''));
  const blueWhaleWeight = 150000; const boeing747Weight = 180000; // kg
  let comparisonObject = ''; let comparisonCount = 0;
  if (!isNaN(weightKg) && weightKg > 0) { if (weightKg > boeing747Weight * 0.8 ) { comparisonObject = 'Boeing 747s'; comparisonCount = Math.floor(weightKg / boeing747Weight); } else if (weightKg > blueWhaleWeight * 0.8) { comparisonObject = 'Blue Whales'; comparisonCount = Math.floor(weightKg / blueWhaleWeight); } }
  const handleShare = () => { const comparisonText = comparisonCount > 0 ? ` That's like ${comparisonCount.toLocaleString()} ${comparisonObject}!` : ''; const textToShare = `${metric.name} for ${entityName || 'this fortune'} (${wealth}B): ${weightString}!${comparisonText} ${metric.description} #WealthPlayground ${window.location.href}`; navigator.clipboard.writeText(textToShare).then(() => alert('Copied fact to clipboard!')).catch(err => console.error('Failed to copy text: ', err)); };
  const scaleTilt = comparisonCount > 0 ? -3 : (weightKg > 1000 ? -1 : 0); // More subtle tilt
  return (
    <div className="p-4 overflow-hidden text-center bg-white border border-gray-200 shadow-md sm:p-6 rounded-xl">
      <div className="flex items-center justify-center gap-2 mb-2 sm:gap-3 sm:mb-3"> <metric.icon className="flex-shrink-0 w-5 h-5 text-indigo-600 sm:w-6 sm:h-6" /> <h3 className="text-base font-semibold text-gray-800 sm:text-lg">{metric.name}</h3> </div>
      <p className="mb-2 font-mono text-3xl font-bold text-indigo-700 sm:text-4xl">{weightString}</p>
      <div className="flex items-center justify-center w-full h-24 mt-2 mb-4">
        <motion.svg viewBox="-50 -15 100 60" className="w-32 h-auto overflow-visible"> {/* Adjusted viewBox */}
          <path d="M -10 40 L 10 40 L 0 30 Z" fill="#9ca3af" /> <rect x="-2" y="0" width="4" height="30" fill="#9ca3af" />
          <motion.g
             initial={{ rotate: 0 }}
             animate={{ rotate: [0, scaleTilt, 0, -scaleTilt/2, 0] }}
             transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror', repeatDelay: 0.5 }}
          >
            <rect x="-40" y="-5" width="80" height="10" fill="#cbd5e1" rx="2" /> {/* Lighter scale beam */}
            <path d="M -45 -5 a 10 10 0 0 0 20 0 Z" fill="#f59e0b" /> <line x1="-35" y1="5" x2="-35" y2="-5" stroke="#9ca3af" strokeWidth="1" /> <WeightIcon x="-42" y="-18" size={16} className="text-amber-600" />
            <path d="M 25 -5 a 10 10 0 0 0 20 0 Z" fill="#e5e7eb" /> <line x1="35" y1="5" x2="35" y2="-5" stroke="#9ca3af" strokeWidth="1" /> {comparisonCount > 0 && <ScaleIcon x="28" y="-18" size={16} className="text-slate-600" />}
          </motion.g>
        </motion.svg>
      </div>
      {comparisonCount > 0 && (<p className="mb-1 text-sm font-semibold text-gray-700">Like {comparisonCount.toLocaleString()} {comparisonObject}!</p>)}
      <p className="mb-3 text-sm text-gray-600 sm:text-base">{metric.description}</p>
      <button onClick={handleShare} className="p-1.5 text-xs text-gray-500 rounded-md hover:bg-gray-100 hover:text-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-500" aria-label="Share this fact"> <Share2 className="inline w-4 h-4 mr-1" /> Share Fact </button>
    </div>
  );
};

// Time to Count Visualization (Animated Counter)
const TimeToCountViz: React.FC<{ metric: AbsurdityCalculation; wealth: number; entityName?: string }> = ({ metric, wealth, entityName }) => {
  const timeString = metric.calculate(wealth);
  const numericPartMatch = timeString.match(/([\d\.,]+)/);
  const numericValue = numericPartMatch ? parseFloat(numericPartMatch[0].replace(/,/g, '')) : 0;
  const isExponential = timeString.toLowerCase().includes('e+');
  const exponentialSuffix = isExponential ? ` ${timeString.substring(timeString.toLowerCase().indexOf('e+'))}` : ' years';

  const [displayValue, setDisplayValue] = React.useState(0);
   React.useEffect(() => {
    const end = isNaN(numericValue) ? 0 : numericValue;
    if (end === 0) { setDisplayValue(0); return; }
    const duration = 1800; // Slightly longer for counting
    const startTime = Date.now();
    const frame = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      setDisplayValue(Math.floor(progress * end));
      if (progress < 1) { requestAnimationFrame(frame); }
      else { setDisplayValue(end); }
    };
    requestAnimationFrame(frame);
  }, [numericValue]);

  const displayCountString = isExponential ? `${displayValue.toExponential(1)}` : displayValue.toLocaleString();

  const handleShare = () => { const textToShare = `${metric.name} for ${entityName || 'this fortune'} (${wealth}B): ${timeString}! ${metric.description} #WealthPlayground ${window.location.href}`; navigator.clipboard.writeText(textToShare).then(() => alert('Copied fact to clipboard!')).catch(err => console.error('Failed to copy text: ', err)); };
  return (
    <div className="p-4 overflow-hidden text-center bg-white border border-gray-200 shadow-md sm:p-6 rounded-xl">
      <div className="flex items-center justify-center gap-2 mb-2 sm:gap-3 sm:mb-3"> <metric.icon className="flex-shrink-0 w-5 h-5 text-indigo-600 sm:w-6 sm:h-6" /> <h3 className="text-base font-semibold text-gray-800 sm:text-lg">{metric.name}</h3> </div>
      <p className="mb-2 font-mono text-3xl font-bold text-indigo-700 sm:text-4xl">{displayCountString}{isExponential ? '' : exponentialSuffix}</p>
      {/* Optional: Simple visual like flipping calendar pages or fast clock */}
      <div className="flex items-center justify-center w-full h-16 mt-2 mb-4">
        <metric.icon className="w-12 h-12 text-indigo-300 opacity-50" />
      </div>
      <p className="mb-3 text-sm text-gray-600 sm:text-base">{metric.description}</p>
      <button onClick={handleShare} className="p-1.5 text-xs text-gray-500 rounded-md hover:bg-gray-100 hover:text-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-500" aria-label="Share this fact"> <Share2 className="inline w-4 h-4 mr-1" /> Share Fact </button>
    </div>
  );
};

// Average Salary Lifetimes Visualization
const AvgSalaryLifetimeViz: React.FC<{ metric: AbsurdityCalculation; wealth: number; entityName?: string }> = ({ metric, wealth, entityName }) => {
  const lifetimeString = metric.calculate(wealth);
  const numericLifetimes = parseInt(lifetimeString.split(' ')[0].replace(/,/g, ''), 10);
  const displayLifetimes = isNaN(numericLifetimes) ? 0 : numericLifetimes;

  const handleShare = () => { const textToShare = `${metric.name} for ${entityName || 'this fortune'} (${wealth}B): ${lifetimeString}! ${metric.description} #WealthPlayground ${window.location.href}`; navigator.clipboard.writeText(textToShare).then(() => alert('Copied fact to clipboard!')).catch(err => console.error('Failed to copy text: ', err)); };

  const maxIcons = 5; // Max stick figures to show
  const iconsToShow = Math.min(maxIcons, Math.max(1, Math.ceil(displayLifetimes / (displayLifetimes > 1000 ? 1000 : displayLifetimes > 100 ? 100 : 10 )  ))); // Scale icons

  return (
    <div className="p-4 overflow-hidden text-center bg-white border border-gray-200 shadow-md sm:p-6 rounded-xl">
      <div className="flex items-center justify-center gap-2 mb-2 sm:gap-3 sm:mb-3"> <metric.icon className="flex-shrink-0 w-5 h-5 text-indigo-600 sm:w-6 sm:h-6" /> <h3 className="text-base font-semibold text-gray-800 sm:text-lg">{metric.name}</h3> </div>
      <p className="mb-2 font-mono text-3xl font-bold text-indigo-700 sm:text-4xl">{lifetimeString}</p>
      <div className="flex items-center justify-center w-full h-16 mt-2 mb-4 space-x-1">
        {Array.from({ length: iconsToShow }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity:0, y:10 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay: i * 0.15, duration: 0.5}}
          >
            <User className="w-6 h-10 text-indigo-500" /> {/* User icon for lifetimes */}
          </motion.div>
        ))}
        {displayLifetimes > maxIcons && <span className="text-xl font-semibold text-indigo-500">... & more</span>}
      </div>
      <p className="mb-3 text-sm text-gray-600 sm:text-base">{metric.description}</p>
      <button onClick={handleShare} className="p-1.5 text-xs text-gray-500 rounded-md hover:bg-gray-100 hover:text-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-500" aria-label="Share this fact"> <Share2 className="inline w-4 h-4 mr-1" /> Share Fact </button>
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
        if (metric.name === 'Average Salary Lifetimes') {
            return <AvgSalaryLifetimeViz key={metric.name} metric={metric} wealth={wealth} entityName={entityName} />;
        }

        // Fallback to InfoCard for other metrics (should ideally be none now, or add specific viz)
        // For now, ensure InfoCard can take a share handler or text
        return (
          <InfoCard
            key={metric.name}
            icon={metric.icon}
            title={metric.name}
            value={metric.calculate(wealth)}
            description={metric.description}
            // TODO: Pass share functionality to InfoCard if it's to be kept as a fallback with sharing
            // For now, InfoCard doesn't have a share button by default.
          />
        );
      })}
    </div>
  );
}
