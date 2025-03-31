import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

// Data and Components
import { WealthCard } from '../components/WealthCard';
import { InfoCard } from '../components/InfoCard';
import allBillionaires from '../data/billionaires.json';
import { companies as initialCompanies } from '../data/companies';
import { Billionaire, Company } from '../types';
import {
  topWealthExample,
  absurdityCalculations,
  gdpComparisons,
  globalProblemCostComparisons
} from '../data/landingPageData';

 // Icons
 import { Landmark, Target, Shuffle } from 'lucide-react'; // Removed Clock, Zap, Coffee

 // Find the metric needed for the hero example stat
// const timeToSpendMetric = absurdityCalculations.find(m => m.name === 'Time to Spend ($1M/day)'); // No longer needed for static display

// Types from OldHome
interface RestCountryInfo {
    cca2: string;
    flags: { png: string; svg: string; alt?: string; };
}
type BillionaireWithFlag = Billionaire & { flagUrl?: string };

export function NewLandingPage() {
  const navigate = useNavigate();
  const [displayBillionaires, setDisplayBillionaires] = useState<BillionaireWithFlag[]>([]);
  const [displayCompanies] = useState<Company[]>(initialCompanies);
  const [hoveredInfo, setHoveredInfo] = useState<string | null>(null);
  const [animatedSubtitles, setAnimatedSubtitles] = useState<string[]>([]);
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);

  // Effect for preparing animated subtitles
  useEffect(() => {
    if (displayBillionaires.length > 0 && displayCompanies.length > 0) {
      const billionaireTexts = displayBillionaires.slice(0, 5).map(b => `${b.name}: $${b.netWorth} Billion`); // Limit for brevity
      const companyTexts = displayCompanies.slice(0, 3).map(c => `${c.name}: $${c.marketCap} Billion Market Cap`); // Limit for brevity
      const funnyLines = [
        "Enough to buy a small country... or a lot of coffee.",
        "Could fund NASA for decades!",
        "That's more zeros than my bank account has.",
        "Imagine the tax bill!",
        "Equivalent to ~10,000 Lamborghinis (give or take)."
      ];
      // Shuffle the combined list for variety
      const combined = [...billionaireTexts, ...companyTexts, ...funnyLines].sort(() => Math.random() - 0.5);
      setAnimatedSubtitles(combined);
    }
  }, [displayBillionaires, displayCompanies]);

  // Effect for cycling through subtitles
  useEffect(() => {
    if (animatedSubtitles.length > 0) {
      const intervalId = setInterval(() => {
        setCurrentSubtitleIndex(prevIndex => (prevIndex + 1) % animatedSubtitles.length);
      }, 4000); // Change every 4 seconds

      return () => clearInterval(intervalId); // Cleanup on unmount
    }
  }, [animatedSubtitles]);


  // Effect from OldHome (Flag fetching) - Keep this separate
  useEffect(() => {
    async function loadBillionaires() {
      const selectedBillionaires = allBillionaires.slice(0, 20);
      const flagMap = new Map<string, string>();
      try {
          const flagPromises = selectedBillionaires.map(b => axios.get<RestCountryInfo[]>(`https://restcountries.com/v3.1/name/${encodeURIComponent(b.country)}?fields=cca2,flags&fullText=true`));
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

  const handleSelect = (type: 'billionaire' | 'company', id: string) => { navigate(`/playground/${type}/${id}`); };

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

  // Card hover handlers - Restored implementation
  const handleMouseEnter = (name: string, value: number, type: 'billionaire' | 'company') => {
    const valueString = type === 'billionaire' ? `$${value} Billion` : `Market Cap $${value} Billion`;
    setHoveredInfo(`What does ${name}'s ${valueString} really mean?`);
  };
  const handleMouseLeave = () => { setHoveredInfo(null); };

  // Animation variants - Placeholder definitions
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };
  const cardItemCombinedVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    rest: { scale: 1, boxShadow: "0px 5px 10px rgba(0,0,0,0.1)", zIndex: 1 },
    hover: { scale: 1.03, boxShadow: "0px 8px 20px rgba(0,0,0,0.2)", zIndex: 10 }
  };

  // SEO Content
  const pageTitle = "Wealth Playground: Visualize Extreme Wealth";
  const pageDescription = "Explore the scale of billions & trillions! Choose a fortune and see how it compares to global issues, GDPs, and absurd metrics. What would you do?";
  const pageUrl = window.location.origin;
  const ogImageUrl = `${window.location.origin}/og-image.png`;

  return (
    <div className="overflow-x-hidden">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={ogImageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImageUrl} />
      </Helmet>

      {/* Hero Section: Chooser */}
      <section className="pt-16 pb-12 text-center bg-gradient-to-b from-indigo-50 via-gray-50 to-white md:pt-24 md:pb-16">
         <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="container px-4 mx-auto sm:px-6 lg:px-8">
           <h1 className="text-4xl font-bold tracking-tight text-indigo-800 sm:text-5xl md:text-6xl">Step Into Their World</h1>
           {/* Main Subtitle - shows hover info or default */}
           <div className="relative h-12 mt-4 overflow-hidden">
             <AnimatePresence mode="wait">
               <motion.p
                 key={hoveredInfo || "default"}
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 exit={{ y: -20, opacity: 0 }}
                 transition={{ duration: 0.3 }}
                 className="absolute inset-x-0 max-w-2xl mx-auto text-lg text-gray-700 sm:text-xl"
               >
                 {hoveredInfo || "Whose billions will you play with today?"}
               </motion.p>
             </AnimatePresence>
           </div>
            {/* Animated Subtitle Section - shows when not hovering */}
           <div className="relative h-6 mt-2 overflow-hidden"> {/* Adjusted height */}
             <AnimatePresence mode="wait">
               {!hoveredInfo && animatedSubtitles.length > 0 && (
                 <motion.div
                   key={currentSubtitleIndex} // Key change triggers animation
                   initial={{ y: 15, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   exit={{ y: -15, opacity: 0 }}
                   transition={{ duration: 0.4 }}
                   className="absolute inset-x-0 flex items-center justify-center gap-1 text-sm text-indigo-600"
                 >
                   {/* Optional: Add an icon based on content? */}
                   {/* <Zap className="w-4 h-4" /> */}
                   <span>{animatedSubtitles[currentSubtitleIndex]}</span>
                 </motion.div>
               )}
             </AnimatePresence>
           </div>
           <button onClick={handleFeelingLucky} className="inline-flex items-center gap-2 px-6 py-3 mt-6 text-base font-medium text-white transition-colors bg-purple-600 rounded-lg shadow hover:bg-purple-700"> <Shuffle className="w-5 h-5" /> I'm Feeling Lucky! </button>
         </motion.div>

        {/* Chooser Grid */}
        <motion.div className="container px-4 mx-auto mt-10 sm:px-6 lg:px-8" variants={gridContainerVariants} initial="hidden" animate="visible">
          <h2 className="mb-4 text-2xl font-semibold text-left text-gray-900 sm:text-3xl md:mb-6">Choose a Billionaire...</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
            {displayBillionaires.map((billionaire) => (
              <motion.div key={billionaire.id} variants={cardItemCombinedVariants} initial="hidden" animate="visible" whileHover="hover" onMouseEnter={() => handleMouseEnter(billionaire.name, billionaire.netWorth, 'billionaire')} onMouseLeave={handleMouseLeave}>
                <WealthCard name={billionaire.name} worth={billionaire.netWorth} image={billionaire.image} subtitle={billionaire.company} country={billionaire.country} flagUrl={billionaire.flagUrl} onClick={() => handleSelect('billionaire', billionaire.id)} />
              </motion.div>
            ))}
          </div>
          <h2 className="mt-12 mb-4 text-2xl font-semibold text-left text-gray-900 sm:text-3xl md:mt-16 md:mb-6">...or a Company</h2>
           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
            {displayCompanies.map((company) => (
               <motion.div key={company.id} variants={cardItemCombinedVariants} initial="hidden" animate="visible" whileHover="hover" onMouseEnter={() => handleMouseEnter(company.name, company.marketCap, 'company')} onMouseLeave={handleMouseLeave}>
                <WealthCard name={company.name} worth={company.marketCap} image={company.logo || ''} domain={company.domain} subtitle="Market Cap (USD)" color={company.color} onClick={() => handleSelect('company', company.id)} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Comparison Highlights Section */}
      <section className="py-12 bg-white sm:py-16">
         <div className="container px-4 mx-auto sm:px-6 lg:px-8"> <h2 className="mb-8 text-3xl font-bold text-center text-gray-900"> Putting it in Perspective... </h2> <motion.div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ staggerChildren: 0.1 }}> {gdpComparisons.slice(0, 1).map((item) => ( <InfoCard key={item.id} icon={Landmark} title={item.name} value={`$${item.value.toLocaleString()} ${item.unit.split(' ')[0]}`} description={`Compare this to top fortunes...`} source={item.source} sourceYear={item.year} /> ))} {globalProblemCostComparisons.slice(0, 1).map((item) => ( <InfoCard key={item.id} icon={Target} title={item.name} value={`~$${item.value.toLocaleString()} ${item.unit.split(' ')[0]}`} description={`How many times could $${topWealthExample.wealth}B cover this?`} source={item.source} sourceYear={item.year} /> ))} {absurdityCalculations.filter(m => m.name === '$100 Bills End-to-End').map((metric) => ( <InfoCard key={metric.name} icon={metric.icon} title={metric.name} value={metric.calculate(topWealthExample.wealth)} description={metric.description} /> ))} </motion.div> <p className="mt-6 text-xs text-center text-gray-500"> Note: Comparison data is illustrative. Explore the playground for specific comparisons. </p> </div>
      </section>

      {/* Optional Ad Slot */}
      {/* <div className="container mx-auto my-8 text-center">{/* AdSense Unit Slot Landing Mid * /}</div> */}

    </div>
  );
}
