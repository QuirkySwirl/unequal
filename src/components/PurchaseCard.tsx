import React, { useState } from 'react'; // Import useState
import { ShoppingCart, ThumbsUp, ThumbsDown } from 'lucide-react'; // Added ThumbsUp, ThumbsDown
import { PlaygroundChoice } from '../types'; // Import the new type

interface PurchaseCardProps {
  // Replace 'item' prop with 'choice' prop
  // item: PurchaseItem;
  choice: PlaygroundChoice;
  onPurchase: () => void;
  disabled?: boolean;
}

// Destructure 'choice' instead of 'item'
export function PurchaseCard({ choice, onPurchase, disabled }: PurchaseCardProps) {
  // Removed unused 'id' from destructuring
  const { name, cost, description, icon: Icon, sourceHint, category } = choice;

  // State for like/dislike counts (visual only, resets on refresh)
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userAction, setUserAction] = useState<'like' | 'dislike' | null>(null);

  // Determine card styling based on category
  const cardStyle = category === 'socialGood'
    ? 'bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-300'
    : 'bg-gradient-to-br from-amber-50 to-red-100 border-amber-300';
  const buttonStyle = category === 'socialGood'
    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
    : 'bg-amber-600 text-white hover:bg-amber-700';
  const disabledButtonStyle = 'bg-gray-100 text-gray-400 cursor-not-allowed';

  return (
    <div className={`flex flex-col overflow-hidden transition-all border shadow-lg rounded-xl hover:shadow-xl ${cardStyle}`}>
      {/* Optional: Add an area for an image or keep it text-focused */}
      {/* <div className="relative h-40 sm:h-48"> ... Image logic ... </div> */}

      {/* Content Area */}
      <div className="flex flex-col flex-grow p-4 space-y-3">
        {/* Icon and Name */}
        <div className="flex items-center gap-2">
          {Icon && <Icon className="flex-shrink-0 w-5 h-5 text-indigo-700" />}
          <h3 className="text-base font-semibold text-gray-900 sm:text-lg">{name}</h3>
        </div>

        {/* Cost */}
        <p className="font-mono text-xl font-bold text-gray-800 sm:text-2xl">
          ${cost.toLocaleString()} Billion
        </p>

        {/* Description (Contrast Text) */}
        <p className="flex-grow text-sm text-gray-700">
          {description}
        </p>

        {/* Source Hint */}
        <p className="text-xs italic text-gray-500">
          {sourceHint}
        </p>

        {/* Like/Dislike Buttons */}
        <div className="flex items-center justify-center gap-4 mt-2">
          <button
            onClick={() => {
              if (userAction !== 'like') {
                setLikes(prev => prev + 1);
                if (userAction === 'dislike') setDislikes(prev => prev - 1);
                setUserAction('like');
              } else {
                setLikes(prev => prev - 1);
                setUserAction(null);
              }
              // TODO: Add funny animation/feedback
            }}
            className={`p-1 rounded-full transition-colors ${userAction === 'like' ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:text-green-500'}`}
            aria-label="Like this choice"
          >
            <ThumbsUp className="w-4 h-4" />
          </button>
          <span className="text-xs font-medium text-gray-600 min-w-[1rem] text-center">{likes > 0 ? likes : ''}</span>
          <button
             onClick={() => {
              if (userAction !== 'dislike') {
                setDislikes(prev => prev + 1);
                 if (userAction === 'like') setLikes(prev => prev - 1);
                setUserAction('dislike');
              } else {
                 setDislikes(prev => prev - 1);
                 setUserAction(null);
              }
               // TODO: Add funny animation/feedback
            }}
            className={`p-1 rounded-full transition-colors ${userAction === 'dislike' ? 'bg-red-100 text-red-600' : 'text-gray-400 hover:text-red-500'}`}
            aria-label="Dislike this choice"
          >
            <ThumbsDown className="w-4 h-4" />
          </button>
           <span className="text-xs font-medium text-gray-600 min-w-[1rem] text-center">{dislikes > 0 ? dislikes : ''}</span>
        </div>

        {/* Purchase Button */}
        <button
          onClick={onPurchase}
          disabled={disabled}
          className={`
            w-full flex items-center justify-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg
            text-sm sm:text-base font-medium transition-colors mt-auto
            ${disabled ? disabledButtonStyle : buttonStyle}
          `}
        >
          <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
          {disabled ? 'Cannot Afford' : 'Make This Choice'}
        </button>
      </div>
    </div>
  );
}
