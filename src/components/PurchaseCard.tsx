import React from 'react';
import { ShoppingCart, Info } from 'lucide-react';
import { PurchaseItem } from '../types';

interface PurchaseCardProps {
  item: PurchaseItem;
  onPurchase: () => void;
  disabled?: boolean;
}

export function PurchaseCard({ item, onPurchase, disabled }: PurchaseCardProps) {
  return (
    <div className="flex flex-col overflow-hidden transition-all bg-white shadow-lg rounded-xl hover:shadow-xl">
      {/* Responsive image height */}
      <div className="relative h-40 sm:h-48">
        <img
          src={item.image}
          alt={item.name}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {/* Adjusted padding */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
           {/* Responsive text size */}
          <h3 className="text-lg font-bold text-white sm:text-xl">{item.name}</h3>
           {/* Responsive text size */}
          <p className="font-mono text-sm text-white/90 sm:text-base">
            ${item.price.toLocaleString()} Billion
          </p>
        </div>
      </div>

      {/* Adjusted padding and spacing */}
      <div className="flex-grow p-3 space-y-3 sm:p-4 sm:space-y-4">
         {/* Responsive text size and icon size */}
        <div className="flex items-start gap-2 text-xs text-gray-600 sm:text-sm">
          <Info className="flex-shrink-0 w-4 h-4 text-indigo-500 sm:w-5 sm:h-5" />
          <p>{item.comparison}</p>
        </div>

        {/* Spacer to push button down */}
        <div className="flex-grow"></div>

        <button
          onClick={onPurchase}
          disabled={disabled}
          className={`
            w-full flex items-center justify-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg
            text-sm sm:text-base font-medium transition-colors
            ${disabled
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }
          `}
        >
           {/* Responsive icon size */}
          <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
          {disabled ? 'Not Enough Money' : 'Purchase'}
        </button>
      </div>
    </div>
  );
}
