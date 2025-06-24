import React, { useState, useEffect } from 'react'; // Added useState, useEffect
import { useNavigate } from 'react-router-dom'; // Removed Link
import { motion } from 'framer-motion';
import axios from 'axios'; // Added axios
// Import Helmet for SEO later, e.g., import { Helmet } from 'react-helmet-async';

// Data and Components
import { WealthCard } from '../components/WealthCard'; // Added WealthCard
import { InfoCard } from '../components/InfoCard';
import allBillionaires from '../data/billionaires.json'; // Added data import
import { companies as initialCompanies } from '../data/companies'; // Added data import
import { Billionaire, Company } from '../types'; // Added types
import {
  topWealthExample,
  absurdityCalculations,
  gdpComparisons,
  // unBudgetComparisons, // Removed unused import
  globalProblemCostComparisons
} from '../data/landingPageData';

// Icons - Keep only used ones for now
import { Landmark, Target, Shuffle } from 'lucide-react';

// Types from OldHome
interface RestCountryInfo {
    cca2: string;
    flags: { png: string; svg: string; alt?: string; };
}
type BillionaireWithFlag = Billionaire & { flagUrl?: string };

export function NewLandingPage() {
  const navigate = useNavigate();
  // State from OldHome
  const [displayBillionaires, setDisplayBillionaires] = useState<BillionaireWithFlag[]>([]);
  const [displayCompanies] = useState<Company[]>(initialCompanies);
  // State for dynamic headline
  const [hoveredInfo, setHoveredInfo] = useState<string | null>(null);

  // Effect from OldHome (Flag fetching)
  useEffect(() => {
    async function loadBillionaires() {
      const selectedBillionaires = allBillionaires.slice(0, 20); // Keep top 20 for now
      const flagMap = new Map<string, string>();
      try {
          const flagPromises = selectedBillionaires.map(b =>
             axios.get<RestCountryInfo[]>(`https://restcountries.com/v3.1/name/${encodeURIComponent(b.country)}?fields=cca2,flags&fullText=true`)
          );
          const flagResponses = await Promise.allSettled(flagPromises);
          flagResponses.forEach((response, index) => {
            if (response.status === 'fulfilled' && response.value.data && response.value.data.length > 0) {
               const countryData = response.value.data[0];
               flagMap.set(selectedBillionaires[index].country, countryData.flags.svg || countryData.flags.png);
            } else { console.warn(`Could not fetch flag for ${selectedBillionaires[index].country}`); }
          });
        } catch (error) { console.warn(`Error fetching flags from REST Countries:`, error); }
      const billionairesWithFlags = selectedBillionaires.map(b => ({ ...b, flagUrl: flagMap.get(b.country) }));
      setDisplayBillionaires(billionairesWithFlags);
    }
    loadBillionaires();
  }, []);

  // Select handler from OldHome
  const handleSelect = (type: 'billionaire' | 'company', id: string) => {
    navigate(`/playground/${type}/${id}`);
  };

  // Feeling Lucky handler
  const handleFeelingLucky = () => {
    const allEntities = [
      ...displayBillionaires.map(b => ({ type: 'billionaire', id: b.id })),
      ...displayCompanies.map(c => ({ type: 'company', id: c.id }))
    ];
    if (allEntities.length > 0) {
      const randomIndex = Math.floor(Math.random() * allEntities.length);
      const randomEntity = allEntities[randomIndex];
      handleSelect(randomEntity.type as 'billionaire' | 'company', randomEntity.id);
    }
  };

  // Card hover handlers
  const handleMouseEnter = (name: string, value: number, type: 'billionaire' | 'company') => {
    const valueString = type === 'billionaire' ? `$${value} Billion` : `Market Cap $${value} Billion`;
    setHoveredInfo(`What does ${name}'s ${valueString} really mean?`);
  };
  const handleMouseLeave = () => {
    setHoveredInfo(null);
  };

  // Animation variants
  const gridContainerVariants = { // Applied to the grid container for staggering children
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 } // Stagger cards slightly
    }
  };
  // Combined variants for WealthCard items (entrance + hover)
   const cardItemCombinedVariants = {
    hidden: { y: 20, opacity: 0 }, // Entrance start
    visible: { y: 0, opacity: 1 }, // Entrance end
    rest: { scale: 1, boxShadow: "0px 5px 10px rgba(0,0,0,0.1)", zIndex: 1 }, // Default state (needed for initial/animate)
    hover: { scale: 1.03, boxShadow: "0px 8px 20px rgba(0,0,0,0.2)", zIndex: 10 } // Hover state
  };


  return (
    <div className="overflow-x-hidden">
      {/* <Helmet> ... SEO tags ... </Helmet> */}

      {/* Hero Section: Chooser */}
      <section className="pt-16 pb-12 text-center bg-gradient-to-b from-indigo-50 via-gray-50 to-white md:pt-24 md:pb-16">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="container px-4 mx-auto sm:px-6 lg:px-8"
        >
          <h1 className="text-4xl font-bold tracking-tight text-indigo-800 sm:text-5xl md:text-6xl">
            Step Into Their World
          </h1>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-700 sm:text-xl">
            {hoveredInfo || "Whose billions will you play with today?"}
          </p>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-700 sm:text-xl md:text-2xl">
            {hoveredInfo || "Whose billions will you play with today? Pick one below, or..."}
          </p>
          <motion.button
            onClick={handleFeelingLucky}
            className="inline-flex items-center gap-3 px-8 py-4 mt-8 text-lg font-semibold text-white transition-all transform bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            whileHover={{ scale: 1.05, rotate: [0, -2, 2, -2, 0] }} // Subtle wiggle on hover
            transition={{ type: "spring", stiffness: 400, damping:10 }}
          >
            <Shuffle className="w-6 h-6" />
            I'm Feeling Lucky!
          </motion.button>
        </motion.div>

        {/* Chooser Grid */}
        <motion.div
           className="container px-4 mx-auto mt-10 sm:px-6 lg:px-8"
           variants={gridContainerVariants} // Apply container variants for staggering
           initial="hidden"
           animate="visible"
        >
          {/* Billionaires Grid */}
          <h2 className="mb-4 text-2xl font-semibold text-left text-gray-900 sm:text-3xl md:mb-6">Choose a Billionaire...</h2>
          {/* The parent motion.div handles staggering based on gridContainerVariants */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
            {displayBillionaires.map((billionaire) => (
              // Apply combined variants for entrance and hover
              <motion.div
                key={billionaire.id}
                variants={cardItemCombinedVariants} // Use combined variants
                initial="hidden" // Start hidden
                animate="visible" // Animate to visible (entrance)
                whileHover="hover" // Trigger hover state on hover
                onMouseEnter={() => handleMouseEnter(billionaire.name, billionaire.netWorth, 'billionaire')}
                onMouseLeave={handleMouseLeave}
              >
                <WealthCard
                  name={billionaire.name}
                  worth={billionaire.netWorth}
                  image={billionaire.image}
                  subtitle={billionaire.company}
                  country={billionaire.country}
                  flagUrl={billionaire.flagUrl}
                  onClick={() => handleSelect('billionaire', billionaire.id)}
                />
              </motion.div>
            ))}
          </div>

          {/* Companies Grid */}
          <h2 className="mt-12 mb-4 text-2xl font-semibold text-left text-gray-900 sm:text-3xl md:mt-16 md:mb-6">...or a Company</h2>
           {/* The parent motion.div handles staggering based on gridContainerVariants */}
           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
            {displayCompanies.map((company) => (
               // Apply combined variants for entrance and hover
               <motion.div
                key={company.id}
                variants={cardItemCombinedVariants} // Use combined variants
                initial="hidden" // Start hidden
                animate="visible" // Animate to visible (entrance)
                whileHover="hover" // Trigger hover state on hover
                onMouseEnter={() => handleMouseEnter(company.name, company.marketCap, 'company')}
                onMouseLeave={handleMouseLeave}
              >
                <WealthCard
                  name={company.name}
                  worth={company.marketCap}
                  image={company.logo || ''}
                  domain={company.domain}
                  subtitle="Market Cap (USD)"
                  color={company.color}
                  onClick={() => handleSelect('company', company.id)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Comparison Highlights Section (Placeholder - To be enhanced visually) */}
      <section className="py-12 bg-white sm:py-16">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <h2 className="mb-8 text-3xl font-bold text-center text-gray-900">
            Putting it in Perspective...
          </h2>
          <motion.div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {/* Example Comparisons - TODO: Enhance with visuals */}
            {gdpComparisons.slice(0, 1).map((item) => (
              <InfoCard key={item.id} icon={Landmark} title={item.name} value={`$${item.value.toLocaleString()} ${item.unit.split(' ')[0]}`} description={`Compare this to top fortunes...`} source={item.source} sourceYear={item.year} />
            ))}
            {globalProblemCostComparisons.slice(0, 1).map((item) => (
              <InfoCard key={item.id} icon={Target} title={item.name} value={`~$${item.value.toLocaleString()} ${item.unit.split(' ')[0]}`} description={`How many times could $${topWealthExample.wealth}B cover this?`} source={item.source} sourceYear={item.year} />
            ))}
            {/* Find the correct icon for the end-to-end metric */}
            {absurdityCalculations.filter(m => m.name === '$100 Bills End-to-End').map((metric) => (
              <InfoCard key={metric.name} icon={metric.icon} title={metric.name} value={metric.calculate(topWealthExample.wealth)} description={metric.description} />
            ))}
          </motion.div>
           <p className="mt-6 text-xs text-center text-gray-500">
             Note: Comparison data is illustrative. Explore the playground for specific comparisons.
           </p>
        </div>
      </section>

      {/* Call to Action (Now primarily the chooser grid above) */}
      {/* Optional: Add a small secondary CTA or link to About page here if desired */}

    </div>
  );
}
