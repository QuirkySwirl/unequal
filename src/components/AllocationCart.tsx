import React from 'react';
import { PlaygroundChoice } from '../types';
import { X, BarChartHorizontal, Share2, Image as ImageIcon } from 'lucide-react';

interface AllocationCartProps {
  cartItemIds: string[];
  allChoices: PlaygroundChoice[];
  remainingWealth: number;
  initialWealth: number;
  onRemoveItem: (itemId: string) => void;
  entityName: string;
  onAnalyze: () => void; // Add prop for Analyze handler
}

export function AllocationCart({
  cartItemIds,
  allChoices,
  remainingWealth,
  initialWealth,
  onRemoveItem,
  entityName,
  onAnalyze // Destructure onAnalyze
}: AllocationCartProps) {

  const cartItems = cartItemIds.map(id => allChoices.find(choice => choice.id === id)).filter(Boolean) as PlaygroundChoice[];
  const totalAllocated = cartItems.reduce((sum, item) => sum + item.cost, 0);
  const allocationPercentage = initialWealth > 0 ? Math.min(100, (totalAllocated / initialWealth) * 100) : 0;

  return (
    <div className="sticky top-4 p-4 border border-gray-300 rounded-lg shadow-md bg-white max-h-[80vh] flex flex-col">
      <h2 className="pb-2 mb-4 text-xl font-semibold text-gray-800 border-b border-gray-200">
        Your Allocation
      </h2>

      {/* Stats */}
      <div className="mb-4 space-y-2 text-sm">
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-gradient-to-r from-green-400 to-blue-500 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${allocationPercentage}%` }}
            title={`${allocationPercentage.toFixed(1)}% Allocated`}
          ></div>
        </div>
         <div className="flex justify-between">
            <span className="text-gray-600">Percent Allocated:</span>
            <span className="font-mono font-semibold text-blue-600">
                {allocationPercentage.toFixed(1)}%
            </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Total Allocated:</span>
          <span className="font-mono font-semibold text-green-600">
            ${totalAllocated.toLocaleString(undefined, { maximumFractionDigits: 1 })} B
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Remaining Fortune:</span>
          <span className="font-mono font-semibold text-orange-600">
            ${remainingWealth.toLocaleString(undefined, { maximumFractionDigits: 1 })} B
          </span>
        </div>
      </div>

      {/* Cart Items List */}
      <div className="flex-grow pt-4 mb-4 overflow-y-auto border-t border-gray-200">
        {cartItems.length === 0 ? (
          <p className="text-sm text-center text-gray-500">Your allocation cart is empty.</p>
        ) : (
          <ul className="space-y-3">
            {cartItems.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-2 text-sm">
                {/* Thumbnail */}
                <div className="flex-shrink-0 w-8 h-8 mr-2 bg-gray-100 rounded">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt="" className="object-cover w-full h-full rounded" />
                  ) : (
                    <ImageIcon className="w-4 h-4 m-auto text-gray-400" />
                  )}
                </div>
                {/* Name and Cost */}
                <div className="flex-grow min-w-0">
                   <span className="block truncate" title={item.name}>{item.name}</span>
                   <span className="block font-mono text-xs text-gray-500">${item.cost.toLocaleString()} B</span>
                </div>
                {/* Remove Button */}
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="flex-shrink-0 p-1 text-gray-400 rounded hover:bg-red-100 hover:text-red-600"
                  aria-label={`Remove ${item.name}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-4 space-y-2 border-t border-gray-200">
         <button
            onClick={onAnalyze} // Connect the handler passed via props
            disabled={cartItems.length === 0}
            className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <BarChartHorizontal className="w-4 h-4" />
            Analyze My Spree
          </button>
           <button
            onClick={handleShareSpree}
            disabled={cartItems.length === 0}
            className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-lg hover:bg-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Share2 className="w-4 h-4" />
            Share My Spree!
          </button>
      </div>
    </div>
  );

  // --- Handler Functions ---
  function handleShareSpree() {
    const itemCount = cartItems.length;
    let summaryText = `I just allocated $${totalAllocated.toLocaleString()}B of ${entityName}'s $${initialWealth.toLocaleString()}B fortune! `;

    if (itemCount === 0) {
      summaryText += "Didn't spend a dime... yet! ";
    } else if (itemCount === 1) {
      summaryText += `My choice: ${cartItems[0].name}. `;
    } else if (itemCount <= 3) {
      const itemNames = cartItems.map(item => item.name).join(', ');
      summaryText += `My choices: ${itemNames}. `;
    } else {
       summaryText += `I made ${itemCount} choices, including ${cartItems[0].name}. `;
    }

    summaryText += `How would you spend it? #WealthPlayground ${window.location.href}`;

     navigator.clipboard.writeText(summaryText)
      .then(() => alert('Copied spree summary to clipboard!'))
      .catch(err => console.error('Failed to copy spree summary: ', err));
  }

  // Note: handleAnalyze is passed in as a prop (onAnalyze)
}
