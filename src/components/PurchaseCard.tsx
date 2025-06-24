import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Import motion
import { ShoppingCart, Share2, Check } from 'lucide-react';
import { PlaygroundChoice } from '../types';
// import { getCounts, updateCount } from '../lib/likeUtils';

interface PurchaseCardProps {
  choice: PlaygroundChoice;
  onAdd: () => void;
  disabled?: boolean;
  entityName: string;
  initialWealth: number;
}

export function PurchaseCard({ choice, onAdd, disabled, entityName, initialWealth }: PurchaseCardProps) {
  const { name, cost, description, icon: Icon, sourceHint, category, imageUrl, shareText } = choice;
  const [isAdded, setIsAdded] = useState(false); // State for 'Added' feedback

  // Simplified card styling
  let cardStyle = 'bg-white border border-gray-200';
  let buttonStyle = category === 'socialGood'
    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
    : 'bg-amber-600 text-white hover:bg-amber-700';

  if (category === 'sponsored') {
    cardStyle = 'bg-white border border-purple-400 shadow-purple-100'; // Distinct border for sponsored
    buttonStyle = 'bg-purple-600 text-white hover:bg-purple-700'; // Sponsored button color
  }

  const disabledButtonStyle = 'bg-gray-200 text-gray-500 cursor-not-allowed';
  const addedButtonStyle = 'bg-gray-400 text-white cursor-default'; // Style for 'Added' state

  const handleAddToCart = () => {
    if (!disabled && !isAdded) {
      onAdd();
      setIsAdded(true);
      // Optional: Reset 'Added' state after a delay
      setTimeout(() => setIsAdded(false), 1500);
    }
  };

  const handleShare = () => {
    const textToShare = shareText
      .replace(/\[NAME\]/g, entityName || 'Selected Entity')
      .replace(/\[FORTUNE\]/g, initialWealth ? initialWealth.toLocaleString(undefined, {maximumFractionDigits: 0}) : '???')
      .replace('[Link]', window.location.href);

    navigator.clipboard.writeText(textToShare)
      .then(() => alert('Copied share text to clipboard!'))
      .catch(err => console.error('Failed to copy text: ', err));
  };

  return (
    <div className={`flex flex-col overflow-hidden transition-all border shadow-md rounded-xl hover:shadow-lg ${cardStyle}`}>
      {/* Image Area */}
      <div className="relative w-full aspect-[16/9] bg-gray-200">
        {category === 'sponsored' && (
          <div className="absolute top-2 right-2 z-10 bg-purple-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow">
            Sponsored
          </div>
        )}
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="absolute inset-0 object-cover w-full h-full" />
        ) : (
          // Fallback if no image URL
          <div className="flex items-center justify-center w-full h-full">
            {Icon ? <Icon className="w-12 h-12 text-gray-400" /> : <span className="text-gray-400">?</span>}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-grow p-4 space-y-2">
        {/* Name */}
        <h3 className="text-base font-semibold text-gray-900 sm:text-lg">{name}</h3>
        {/* Cost */}
        <p className="font-mono text-lg font-bold text-gray-800 sm:text-xl">
          ${cost.toLocaleString()} Billion
        </p>
        {/* Description */}
        <p className="flex-grow text-sm text-gray-700">{description}</p>
        {/* Source Hint */}
        <p className="text-xs italic text-gray-500">{sourceHint}</p>

        {/* Removed Like/Dislike Buttons */}

         {/* Action Buttons Row */}
         <div className="flex items-center gap-2 pt-2 mt-auto">
            {/* Add to Cart Button */}
            <motion.button
              onClick={handleAddToCart}
              disabled={disabled || isAdded}
              className={`
                flex-grow flex items-center justify-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg
                text-sm sm:text-base font-medium transition-colors
                ${disabled ? disabledButtonStyle : (isAdded ? addedButtonStyle : buttonStyle)}
              `}
              // Add animation for the 'Added' state
              animate={isAdded ? { scale: [1, 1.1, 1], transition: { duration: 0.3 } } : {}}
            >
              {isAdded ? (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5" /> Added
                </motion.span>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                  {disabled ? 'Cannot Afford' : 'Add to Cart'}
                </>
              )}
            </motion.button>

             {/* Share Button */}
             <button
                onClick={handleShare}
                className="p-2 text-gray-500 transition-colors rounded-lg hover:bg-gray-100 hover:text-indigo-600"
                aria-label="Share this choice"
             >
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
             </button>
         </div>
      </div>
    </div>
  );
}
