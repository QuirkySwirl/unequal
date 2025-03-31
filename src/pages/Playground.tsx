import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Coins, ShoppingBag, BarChart, Sparkles } from 'lucide-react';
import billionaires from '../data/billionaires.json'; // Corrected import
import { companies } from '../data/companies';
import { purchaseItems } from '../data/purchaseItems';
import { Billionaire, Company } from '../types'; // Import the types
import { PurchaseCard } from '../components/PurchaseCard';
import { ComparisonChart } from '../components/ComparisonChart';
import { AbsurdityMetrics } from '../components/AbsurdityMetrics';
import { WealthStackVisualization } from '../components/WealthStackVisualization'; // Import the new component

export function Playground() {
  const { type, id } = useParams<{ type: string; id: string }>();
  const [purchases, setPurchases] = useState<string[]>([]);

  const entity = useMemo(() => {
    if (type === 'billionaire') {
      return billionaires.find(b => b.id === id);
    }
    return companies.find(c => c.id === id);
   }, [type, id]);

  // Type-safe access to wealth property
  const initialWealth = useMemo(() => {
    if (!entity) return 0;
    // Use type assertion based on the 'type' parameter
    if (type === 'billionaire') {
      return (entity as Billionaire).netWorth;
    } else {
      return (entity as Company).marketCap;
    }
  }, [entity, type]);

  const remainingWealth = useMemo(() => {
    return initialWealth - purchases.reduce((total, itemId) => {
      const item = purchaseItems.find(i => i.id === itemId);
      return total + (item?.price || 0);
    }, 0);
  }, [initialWealth, purchases]);

  const handlePurchase = (itemId: string) => {
    setPurchases(prev => [...prev, itemId]);
  };

  if (!entity) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">Entity not found</h1>
          <Link to="/" className="text-indigo-600 hover:text-indigo-700">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  // Helper function to get logo/image source
  const getEntityImageSrc = () => {
    if (!entity) return '';
    if (type === 'billionaire') {
      return (entity as Billionaire).image;
    } else {
      // Use Clearbit logo if domain exists, otherwise fallback (or empty string)
      const company = entity as Company;
      return company.domain ? `https://logo.clearbit.com/${company.domain}` : (company.logo || '');
    }
  };


  return (
    // Added overflow-x-hidden
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      {/* Adjusted padding */}
      <div className="container px-4 py-6 mx-auto sm:px-6 lg:px-8 lg:py-10">
        {/* Header Navigation */}
        <div className="flex items-center gap-4 mb-6 md:mb-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            Back
          </Link>
        </div>

        {/* Entity Info and Stats Card */}
        <div className="p-4 mb-6 bg-white shadow-lg sm:p-6 rounded-xl md:mb-10">
          {entity && (
            // Flex container for image+info and stats, responsive direction
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
              {/* Image and Name/Subtitle */}
              <div className="flex items-center flex-shrink-0 gap-3 sm:gap-4">
                <img
                  src={getEntityImageSrc()}
                  alt={entity.name}
                  className="object-cover w-12 h-12 rounded-full sm:w-16 sm:h-16"
                  // Hide image on error
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
                <div className="min-w-0">
                  <h1 className="text-xl font-bold text-gray-900 truncate sm:text-2xl">{entity.name}</h1>
                  <p className="text-sm text-gray-600 truncate sm:text-base">
                    {type === 'billionaire' ? (entity as Billionaire).company : 'Market Cap (USD)'}
                  </p>
                </div>
              </div>

              {/* Wealth and Purchase Stats */}
              {/* Adjusted gap and flex direction for responsiveness */}
              <div className="flex items-center justify-start flex-shrink-0 gap-4 pt-4 border-t border-gray-200 md:pt-0 md:border-t-0 md:justify-end sm:gap-6">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Coins className="w-5 h-5 text-indigo-600 sm:w-6 sm:h-6" />
                  <div>
                    <p className="text-xs text-gray-600 sm:text-sm">Remaining Wealth</p>
                    <p className="font-mono text-base font-bold sm:text-lg">
                      ${remainingWealth.toLocaleString()} B
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  <ShoppingBag className="w-5 h-5 text-indigo-600 sm:w-6 sm:h-6" />
                  <div>
                    <p className="text-xs text-gray-600 sm:text-sm">Items Purchased</p>
                    <p className="font-mono text-base font-bold sm:text-lg">{purchases.length}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Purchase Items Grid */}
         {/* Adjusted heading size and margin */}
        <h2 className="flex items-center gap-2 mb-4 text-xl font-semibold text-gray-900 sm:text-2xl md:mb-6">
          <ShoppingBag className="w-5 h-5 text-indigo-600 sm:w-6 sm:h-6" />
          Available Purchases
        </h2>
         {/* Adjusted grid columns and gap */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
          {purchaseItems.map((item) => (
            <PurchaseCard
              key={item.id}
              item={item}
              onPurchase={() => handlePurchase(item.id)}
              disabled={item.price > remainingWealth}
            />
          ))}
        </div>

        {/* Wealth Comparisons & Visualizations */}
         {/* Adjusted top margin and spacing */}
        <div className="mt-12 space-y-10 md:mt-16 md:space-y-14">
          <section>
             {/* Adjusted heading size and margin */}
            <h2 className="flex items-center gap-2 mb-4 text-xl font-semibold text-gray-900 sm:text-2xl md:mb-6">
              <BarChart className="w-5 h-5 text-indigo-600 sm:w-6 sm:h-6" />
              Compare to Country GDPs
            </h2>
            <ComparisonChart wealth={initialWealth} type="gdp" />
          </section>

          <section>
             {/* Adjusted heading size and margin */}
            <h2 className="flex items-center gap-2 mb-4 text-xl font-semibold text-gray-900 sm:text-2xl md:mb-6">
              <BarChart className="w-5 h-5 text-indigo-600 sm:w-6 sm:h-6" />
              Global Problems This Could Solve
            </h2>
            <ComparisonChart wealth={initialWealth} type="problems" />
          </section>

          <section>
             {/* Adjusted heading size and margin */}
            <h2 className="flex items-center gap-2 mb-4 text-xl font-semibold text-gray-900 sm:text-2xl md:mb-6">
              <Sparkles className="w-5 h-5 text-indigo-600 sm:w-6 sm:h-6" />
              The Absurdity of This Wealth
            </h2>
            <AbsurdityMetrics wealth={initialWealth} />
          </section>

          {/* Wealth Stack Visualization Section */}
          <section>
              {/* Adjusted heading size and margin */}
             <h2 className="flex items-center gap-2 mb-4 text-xl font-semibold text-gray-900 sm:text-2xl md:mb-6">
              <Coins className="w-5 h-5 text-indigo-600 sm:w-6 sm:h-6" /> {/* Reusing Coins icon */}
              Wealth Stacked Up
            </h2>
            <WealthStackVisualization wealth={initialWealth} />
          </section>
        </div>
      </div>
    </div>
  );
}
