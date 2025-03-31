import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Coins, ShoppingBag, BarChart, Sparkles, Loader2, AlertTriangle } from 'lucide-react';
import billionaires from '../data/billionaires.json';
import { companies as staticCompanies } from '../data/companies';
import { billionaireChoices, companyChoices } from '../data/playgroundChoices';
import { Billionaire, Company, PlaygroundChoice } from '../types'; // Import PlaygroundChoice again
import { useCompanyData } from '../hooks/useCompanyData';
import { PurchaseCard } from '../components/PurchaseCard';
import { AllocationCart } from '../components/AllocationCart';
import { AllocationSummaryModal } from '../components/AllocationSummaryModal'; // Import the modal
import { ComparisonChart } from '../components/ComparisonChart';
import { AbsurdityMetrics } from '../components/AbsurdityMetrics';
import { WealthStackVisualization } from '../components/WealthStackVisualization';

export function Playground() {
  const { type, id } = useParams<{ type: string; id: string }>();
  const [allocationCartIds, setAllocationCartIds] = useState<string[]>([]);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false); // State for modal visibility

  // Find the base entity data (static)
  const staticEntity = useMemo(() => {
    if (type === 'billionaire') {
      return billionaires.find(b => b.id === id);
    }
    return staticCompanies.find(c => c.id === id);
  }, [type, id]);

  // Fetch dynamic data if it's a company
  const companyTicker = type === 'company' ? (staticEntity as Company)?.ticker : undefined;
  const { data: dynamicCompanyData, loading: companyLoading, error: companyError } = useCompanyData(companyTicker);

  // Determine the wealth to use
  const initialWealth = useMemo(() => {
    if (!staticEntity) return 0;
    if (type === 'billionaire') {
      return (staticEntity as Billionaire).netWorth;
    } else {
      return dynamicCompanyData?.marketCap ?? (staticEntity as Company)?.marketCap ?? 0;
    }
  }, [staticEntity, type, dynamicCompanyData]);

  // Select the appropriate choices based on type
  const availableChoices = useMemo(() => {
    return type === 'billionaire' ? billionaireChoices : companyChoices;
  }, [type]);

  // Get full choice objects for items in cart (needed for modal)
  const cartItems = useMemo(() => {
     return allocationCartIds
       .map(id => availableChoices.find(choice => choice.id === id))
       .filter(Boolean) as PlaygroundChoice[];
  }, [allocationCartIds, availableChoices]);


  // Calculate remaining wealth based on selected choices' costs
  const remainingWealth = useMemo(() => {
    const currentInitialWealth = typeof initialWealth === 'number' ? initialWealth : 0;
    const spentAmount = cartItems.reduce((total, choice) => total + (choice?.cost || 0), 0); // Use cartItems
    return Math.max(0, currentInitialWealth - spentAmount);
  }, [initialWealth, cartItems]); // Depend on cartItems

  // Handler to add item to cart
  const handleAddToCart = (choiceId: string) => {
       setAllocationCartIds(prev => [...prev, choiceId]);
  };

  // Handler to remove item from cart
  const handleRemoveFromCart = (choiceId: string) => {
    setAllocationCartIds(prev => prev.filter(id => id !== choiceId));
  };

  // Handler to open the summary modal
  const handleAnalyze = () => {
    setIsSummaryOpen(true);
  };

  // Handler to close the summary modal
  const handleCloseSummary = () => {
    setIsSummaryOpen(false);
  };


  // Helper function to get logo/image source using static data
  const getEntityImageSrc = (entity: Billionaire | Company | undefined) => {
    // ... (keep existing implementation)
    if (!entity) return '';
    if (type === 'billionaire') {
      return (entity as Billionaire).image;
    } else {
      const company = entity as Company;
      return company.domain ? `https://logo.clearbit.com/${company.domain}` : (company.logo || '');
    }
  };

  // --- Loading and Error States ---
  if (!staticEntity) {
    // ... (Error handling for entity not found)
    return (
      <div className="flex items-center justify-center min-h-screen text-center">
        <div>
          <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-red-500" />
          <h1 className="mb-4 text-2xl font-bold text-gray-900">Entity Not Found</h1>
          <p className="mb-4 text-gray-600">Could not find the requested billionaire or company.</p>
          <Link to="/" className="text-indigo-600 hover:text-indigo-700">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  if (type === 'company' && companyLoading) {
    // ... (Loading state)
     return (
      <div className="flex items-center justify-center min-h-screen text-center">
        <div>
          <Loader2 className="w-12 h-12 mx-auto mb-4 text-indigo-600 animate-spin" />
          <h1 className="text-xl font-semibold text-gray-700">Loading Company Data...</h1>
          <p className="text-gray-500">Fetching latest market cap for {staticEntity.name}</p>
        </div>
      </div>
    );
  }

  // Ensure we have valid numbers before rendering comparison components
  const wealthValue = typeof initialWealth === 'number' ? initialWealth : 0;
  const entityDisplayName = staticEntity?.name || 'Selected Entity';


  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="container px-4 py-6 mx-auto sm:px-6 lg:px-8 lg:py-10">
        {/* Header Navigation */}
        <div className="flex items-center gap-4 mb-6 md:mb-8">
          <Link to="/" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 sm:text-base">
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            Back to Selection
          </Link>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">

          {/* Left Column: Purchase Options */}
          <div className="lg:col-span-2">
            {/* Entity Info Card */}
            <div className="p-4 mb-6 bg-white shadow-lg sm:p-6 rounded-xl md:mb-10">
              {/* ... (Entity Info content remains the same) ... */}
               {staticEntity && (
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
                  <div className="flex items-center flex-shrink-0 gap-3 sm:gap-4">
                    <img src={getEntityImageSrc(staticEntity)} alt={staticEntity.name} className="object-cover w-12 h-12 rounded-full sm:w-16 sm:h-16" onError={(e) => (e.currentTarget.style.display = 'none')}/>
                    <div className="min-w-0">
                      <h1 className="text-xl font-bold text-gray-900 truncate sm:text-2xl">{staticEntity.name}</h1>
                      <p className="text-sm text-gray-600 truncate sm:text-base">{type === 'billionaire' ? (staticEntity as Billionaire).company : 'Market Cap (USD)'}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-start flex-shrink-0 gap-4 pt-4 border-t border-gray-200 md:pt-0 md:border-t-0 md:justify-end sm:gap-6">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Coins className="w-5 h-5 text-indigo-600 sm:w-6 sm:h-6" />
                      <div>
                        <p className="text-xs text-gray-600 sm:text-sm">{type === 'company' ? 'Market Cap' : 'Net Worth'} (Approx)</p>
                        {type === 'company' && companyLoading ? (<Loader2 className="w-5 h-5 mt-1 text-indigo-500 animate-spin" />)
                         : type === 'company' && companyError ? (<span className="text-xs text-red-600" title={companyError}>Error loading</span>)
                         : (<p className="font-mono text-base font-bold sm:text-lg">${initialWealth.toLocaleString(undefined, { maximumFractionDigits: 1 })} B</p>)}
                         {type === 'billionaire' && (<p className="font-mono text-base font-bold sm:text-lg">${initialWealth.toLocaleString(undefined, { maximumFractionDigits: 1 })} B</p>)}
                      </div>
                    </div>
                  </div>
                </div>
              )}
               {type === 'company' && companyError && ( <div className="p-3 mt-4 text-sm text-red-700 bg-red-100 border border-red-300 rounded-md"><p><span className="font-semibold">Data Error:</span> {companyError}</p></div>)}
            </div>

            {/* Purchase Items Grid */}
            <h2 className="flex items-center gap-2 mb-4 text-xl font-semibold text-gray-900 sm:text-2xl md:mb-6">
              <ShoppingBag className="w-5 h-5 text-indigo-600 sm:w-6 sm:h-6" />
              What Will You Do With The Money?
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 sm:gap-6">
              {availableChoices.map((choice) => (
                <PurchaseCard
                  key={choice.id}
                  choice={choice}
                  onAdd={() => handleAddToCart(choice.id)}
                  disabled={choice.cost > remainingWealth}
                  entityName={entityDisplayName}
                  initialWealth={wealthValue}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Allocation Cart Sidebar */}
          <div className="lg:col-span-1">
            <AllocationCart
              cartItemIds={allocationCartIds}
              allChoices={availableChoices}
              remainingWealth={remainingWealth}
              initialWealth={wealthValue}
              onRemoveItem={handleRemoveFromCart}
              entityName={entityDisplayName}
              onAnalyze={handleAnalyze} // Pass the handler
            />
          </div>

        </div>

        {/* Wealth Comparisons & Visualizations (Keep below for now) */}
        <div className="mt-12 space-y-10 md:mt-16 md:space-y-14">
           <section>
            <h2 className="flex items-center gap-2 mb-4 text-xl font-semibold text-gray-900 sm:text-2xl md:mb-6"><BarChart className="w-5 h-5 text-indigo-600 sm:w-6 sm:h-6" /> Compare to Country GDPs</h2>
            <ComparisonChart wealth={wealthValue} type="gdp" entityName={entityDisplayName}/>
          </section>
           <section>
            <h2 className="flex items-center gap-2 mb-4 text-xl font-semibold text-gray-900 sm:text-2xl md:mb-6"><BarChart className="w-5 h-5 text-indigo-600 sm:w-6 sm:h-6" /> Global Problems This Could Solve</h2>
            <ComparisonChart wealth={wealthValue} type="problems" entityName={entityDisplayName}/>
          </section>
           <section>
            <h2 className="flex items-center gap-2 mb-4 text-xl font-semibold text-gray-900 sm:text-2xl md:mb-6"><Sparkles className="w-5 h-5 text-indigo-600 sm:w-6 sm:h-6" /> The Absurdity of This Wealth</h2>
            <AbsurdityMetrics wealth={wealthValue} entityName={entityDisplayName}/>
          </section>
           <section>
             <h2 className="flex items-center gap-2 mb-4 text-xl font-semibold text-gray-900 sm:text-2xl md:mb-6"><Coins className="w-5 h-5 text-indigo-600 sm:w-6 sm:h-6" /> Wealth Stacked Up</h2>
            <WealthStackVisualization wealth={wealthValue} />
          </section>
        </div>
      </div>

      {/* Render the Modal */}
      <AllocationSummaryModal
        isOpen={isSummaryOpen}
        onClose={handleCloseSummary}
        cartItems={cartItems} // Pass the calculated cart items
        initialWealth={wealthValue}
        entityName={entityDisplayName}
      />
    </div>
  );
}
