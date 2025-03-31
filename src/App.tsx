import React, { useState, useEffect } from 'react'; // Import useState, useEffect
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Coins } from 'lucide-react';
import axios from 'axios'; // Import axios
import { WealthCard } from './components/WealthCard';
import { Playground } from './pages/Playground';
import { AboutPage } from './pages/AboutPage'; // Import AboutPage
import { TermsOfServicePage } from './pages/TermsOfServicePage'; // Import TermsOfServicePage
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage'; // Import PrivacyPolicyPage
import { NewLandingPage } from './pages/NewLandingPage'; // Import NewLandingPage
import { Layout } from './components/Layout'; // Import Layout
import allBillionaires from './data/billionaires.json'; // Import full list from JSON
import { companies as initialCompanies } from './data/companies'; // Rename import
import { Billionaire, Company } from './types'; // Import types

// Type for REST Countries API response for flags
interface RestCountryInfo {
    cca2: string; // Use cca2 which often matches billionaire country field
    flags: {
        png: string;
        svg: string;
        alt?: string;
    };
}

// Type for billionaire with optional flag
type BillionaireWithFlag = Billionaire & { flagUrl?: string };


// Renamed the original Home component to preserve its logic
function OldHome() {
  const navigate = useNavigate();
  const [displayBillionaires, setDisplayBillionaires] = useState<BillionaireWithFlag[]>([]);
  const [displayCompanies] = useState<Company[]>(initialCompanies); // Companies don't need shuffling/flags for now

  useEffect(() => {
    async function loadBillionaires() {
      // Select top 20 billionaires (assuming the JSON is sorted)
      const selectedBillionaires = allBillionaires.slice(0, 20);

      // Fetch flags - Use country names for lookup (might be less reliable than codes)
      const flagMap = new Map<string, string>(); // Use const

      try {
        // Use the 'name' endpoint, might need adjustments if names don't match exactly
        // This is less ideal than using codes, but billionaire data lacks codes
          const flagPromises = selectedBillionaires.map(b =>
             axios.get<RestCountryInfo[]>(`https://restcountries.com/v3.1/name/${encodeURIComponent(b.country)}?fields=cca2,flags&fullText=true`)
          );
          const flagResponses = await Promise.allSettled(flagPromises);

          flagResponses.forEach((response, index) => {
            if (response.status === 'fulfilled' && response.value.data && response.value.data.length > 0) {
               // Find the best match (sometimes returns multiple) - simple match for now
               const countryData = response.value.data[0];
               flagMap.set(selectedBillionaires[index].country, countryData.flags.svg || countryData.flags.png);
            } else {
               console.warn(`Could not fetch flag for ${selectedBillionaires[index].country}`);
            }
          });

        } catch (error) {
          console.warn(`Error fetching flags from REST Countries:`, error);
        }

      // Add flags to the selected billionaires
      const billionairesWithFlags = selectedBillionaires.map(b => ({
        ...b,
        flagUrl: flagMap.get(b.country),
      }));

      setDisplayBillionaires(billionairesWithFlags);
    }

    loadBillionaires();
  }, []); // Run only once on mount


  const handleSelect = (type: 'billionaire' | 'company', id: string) => {
    navigate(`/playground/${type}/${id}`);
  };

  return (
    // Added overflow-x-hidden to prevent horizontal scroll on small screens
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      {/* Adjusted padding for different screen sizes */}
      <div className="container px-4 py-8 mx-auto sm:px-6 lg:px-8 lg:py-12">
        {/* Adjusted margin bottom */}
        <div className="mb-10 text-center md:mb-16">
          {/* Adjusted icon size and gap for mobile */}
          <div className="flex items-center justify-center gap-2 mb-3 sm:gap-3 sm:mb-4">
            <Coins className="w-10 h-10 text-indigo-600 sm:w-12 sm:h-12" />
            {/* Adjusted text size for mobile */}
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Global Wealth Playground
            </h1>
          </div>
          {/* Adjusted text size for mobile */}
          <p className="max-w-3xl mx-auto text-lg text-gray-600 sm:text-xl">
            Experience the scale of extreme wealth through an interactive journey.
            Choose a billionaire or company to begin your adventure.
          </p>
        </div>

        {/* Adjusted spacing between sections */}
        <div className="space-y-12 md:space-y-16">
          {/* Billionaires Section */}
          <section>
             {/* Adjusted text size and margin */}
            <h2 className="mb-4 text-xl font-semibold text-gray-900 sm:text-2xl md:mb-6">
              Meet the Top 20 Billionaires...
            </h2>
            {/* Adjusted grid columns and gap */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
              {displayBillionaires.map((billionaire) => (
                <WealthCard
                  key={billionaire.id}
                  name={billionaire.name}
                  worth={billionaire.netWorth}
                  image={billionaire.image}
                  subtitle={billionaire.company}
                  country={billionaire.country}
                  flagUrl={billionaire.flagUrl} // Pass flagUrl
                  onClick={() => handleSelect('billionaire', billionaire.id)}
                />
              ))}
            </div>
          </section>

          {/* Companies Section */}
          <section>
             {/* Adjusted text size and margin */}
            <h2 className="mb-4 text-xl font-semibold text-gray-900 sm:text-2xl md:mb-6">
              ...and some Companies
            </h2>
             {/* Adjusted grid columns and gap */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
              {displayCompanies.map((company) => (
                <WealthCard
                  key={company.id}
                  name={company.name}
                  worth={company.marketCap}
                  image={company.logo || ''} // Pass original logo as fallback or empty string
                  domain={company.domain} // Pass domain for Clearbit
                  subtitle="Market Cap (USD)"
                  color={company.color}
                  onClick={() => handleSelect('company', company.id)}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* Point root path to the new landing page */}
      <Route path="/" element={<Layout><NewLandingPage /></Layout>} />
      {/* Add a route for the old home page, e.g., /select */}
      <Route path="/select" element={<Layout><OldHome /></Layout>} />
      <Route path="/playground/:type/:id" element={<Layout><Playground /></Layout>} />
      <Route path="/about" element={<Layout><AboutPage /></Layout>} />
      <Route path="/terms" element={<Layout><TermsOfServicePage /></Layout>} />
      <Route path="/privacy" element={<Layout><PrivacyPolicyPage /></Layout>} />
    </Routes>
  );
}

export default App;
