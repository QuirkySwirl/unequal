import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Coins, ShoppingBag, BarChart, Sparkles, AlertTriangle } from 'lucide-react';
import billionaires from '../data/billionaires.json';
import { companies as staticCompanies } from '../data/companies';
import { billionaireChoices, companyChoices } from '../data/playgroundChoices';
import { Billionaire, Company, PlaygroundChoice } from '../types';
import { PurchaseCard } from '../components/PurchaseCard';
import { AllocationCart } from '../components/AllocationCart';
import { AllocationSummaryModal } from '../components/AllocationSummaryModal';
import { ComparisonChart } from '../components/ComparisonChart';
import { AbsurdityMetrics } from '../components/AbsurdityMetrics';
import { WealthStackVisualization } from '../components/WealthStackVisualization';

export function Playground() {
  const { type, id } = useParams<{ type: string; id: string }>();
  const [allocationCartIds, setAllocationCartIds] = useState<string[]>([]);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  const staticEntity = useMemo(() => {
    if (type === 'billionaire') {
      return billionaires.find(b => b.id === id);
    }
    return staticCompanies.find(c => c.id === id);
  }, [type, id]);

  const initialWealth = useMemo(() => {
    if (!staticEntity) return 0;
    if (type === 'billionaire') {
      return (staticEntity as Billionaire).netWorth;
    } else {
      return (staticEntity as Company)?.marketCap ?? 0;
    }
  }, [staticEntity, type]);

  const availableChoices = useMemo(() => {
    return type === 'billionaire' ? billionaireChoices : companyChoices;
  }, [type]);

  const cartItems = useMemo(() => {
     return allocationCartIds
       .map(id => availableChoices.find(choice => choice.id === id))
       .filter(Boolean) as PlaygroundChoice[];
  }, [allocationCartIds, availableChoices]);

  const remainingWealth = useMemo(() => {
    const currentInitialWealth = typeof initialWealth === 'number' ? initialWealth : 0;
    const spentAmount = cartItems.reduce((total, choice) => total + (choice?.cost || 0), 0);
    return Math.max(0, currentInitialWealth - spentAmount);
  }, [initialWealth, cartItems]);

  const handleAddToCart = (choiceId: string) => { setAllocationCartIds(prev => [...prev, choiceId]); };
  const handleRemoveFromCart = (choiceId: string) => { setAllocationCartIds(prev => prev.filter(id => id !== choiceId)); };
  const handleAnalyze = () => { setIsSummaryOpen(true); };
  const handleCloseSummary = () => { setIsSummaryOpen(false); };

  const getEntityImageSrc = (entity: Billionaire | Company | undefined) => {
    if (!entity) return '';
    if (type === 'billionaire') { return (entity as Billionaire).image; }
    else { const company = entity as Company; return company.domain ? `https://logo.clearbit.com/${company.domain}` : (company.logo || ''); }
  };

  if (!staticEntity) {
     return ( <div className="flex items-center justify-center min-h-screen text-center"> <div> <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-red-500" /> <h1 className="mb-4 text-2xl font-bold text-gray-900">Entity Not Found</h1> <p className="mb-4 text-gray-600">Could not find the requested billionaire or company.</p> <Link to="/" className="text-indigo-600 hover:text-indigo-700"> Return Home </Link> </div> </div> );
  }

  const wealthValue = typeof initialWealth === 'number' ? initialWealth : 0;
  const entityDisplayName = staticEntity?.name || 'Selected Entity';

  const pageTitle = `${entityDisplayName} | Wealth Playground`;
  const pageDescription = `What would you do with ${entityDisplayName}'s $${initialWealth.toLocaleString()}B fortune? Explore absurd choices and real-world impacts.`;
  const pageUrl = window.location.href;
  const ogImageUrl = `${window.location.origin}/og-image.png`;

  return (
    <div className="min-h-screen overflow-x-hidden">
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

      <div className="container px-4 py-6 mx-auto sm:px-6 lg:px-8 lg:py-10">
        <div className="flex items-center gap-4 mb-6 md:mb-8">
          <Link to="/" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 sm:text-base">
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" /> Back to Selection
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            <div className="p-4 mb-6 bg-white shadow-lg sm:p-6 rounded-xl md:mb-10">
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
                        <p className="font-mono text-base font-bold sm:text-lg">${initialWealth.toLocaleString(undefined, { maximumFractionDigits: 1 })} B</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <h2 className="flex items-center gap-2 mb-4 text-xl font-semibold text-gray-900 sm:text-2xl md:mb-6">
              <ShoppingBag className="w-5 h-5 text-indigo-600 sm:w-6 sm:h-6" /> What Will You Do With The Money?
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

          <div className="lg:col-span-1">
            <AllocationCart
              cartItemIds={allocationCartIds}
              allChoices={availableChoices}
              remainingWealth={remainingWealth}
              initialWealth={wealthValue}
              onRemoveItem={handleRemoveFromCart}
              entityName={entityDisplayName}
              onAnalyze={handleAnalyze}
            />
          </div>
        </div>

        {/* Optional Ad Slot */}
        {/* <div className="my-8 text-center">{/* AdSense Unit Slot Playground Mid * /}</div> */}

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

      <AllocationSummaryModal
        isOpen={isSummaryOpen}
        onClose={handleCloseSummary}
        cartItems={cartItems}
        initialWealth={wealthValue}
        entityName={entityDisplayName}
      />
    </div>
  );
}
