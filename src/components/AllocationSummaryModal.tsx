import React, { useState } from 'react'; // Added useState
import { motion, AnimatePresence } from 'framer-motion';
import { X, BarChartHorizontal, Lightbulb, Share2, Link as LinkIcon, Copy, Twitter, Facebook, MessageSquare } from 'lucide-react'; // Added Share2, LinkIcon, Copy, Twitter, Facebook, MessageSquare (for Reddit-like)
import { PlaygroundChoice } from '../types';
import { billionaireChoices, companyChoices } from '../data/playgroundChoices'; // Import choices for comparison

interface AllocationSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: PlaygroundChoice[];
  initialWealth: number;
  entityName: string;
}

export function AllocationSummaryModal({
  isOpen,
  onClose,
  cartItems,
  initialWealth,
  entityName
}: AllocationSummaryModalProps) {

  const totalAllocated = cartItems.reduce((sum, item) => sum + item.cost, 0);
  const remaining = initialWealth - totalAllocated;

  // Generate more meaningful insights based on cart contents
  const generateInsights = () => {
    const insights = [];
    const luxuryItems = cartItems.filter(item => item.category === 'luxuryAbsurd');
    const socialGoodItems = cartItems.filter(item => item.category === 'socialGood');
    const allPossibleChoices = cartItems[0]?.scale === 'billionaire' ? billionaireChoices : companyChoices;

    const totalLuxuryCost = luxuryItems.reduce((sum, item) => sum + item.cost, 0);
    const totalSocialGoodCost = socialGoodItems.reduce((sum, item) => sum + item.cost, 0);

    // Insight 1: Basic Summary
    if (cartItems.length === 0) {
         insights.push(`You didn't allocate any of ${entityName}'s $${initialWealth.toLocaleString()}B!`);
     } else {
         insights.push(`You allocated $${totalAllocated.toLocaleString()}B, leaving $${remaining.toLocaleString()}B unspent.`);
     }

    // Insight 2: Luxury vs. Social Good Spending
    if (totalLuxuryCost > 0 && totalSocialGoodCost > 0) {
      insights.push(`You spent $${totalLuxuryCost.toLocaleString()}B on luxury/absurd items and $${totalSocialGoodCost.toLocaleString()}B on social good.`);
    } else if (totalLuxuryCost > 0) {
      insights.push(`Your entire allocation of $${totalLuxuryCost.toLocaleString()}B went towards luxury/absurd choices.`);
    } else if (totalSocialGoodCost > 0) {
       insights.push(`Your entire allocation of $${totalSocialGoodCost.toLocaleString()}B went towards social good initiatives.`);
    }

    // Insight 3: Opportunity Cost (Luxury vs. Unchosen Social Good)
    if (totalLuxuryCost > 0) {
      // Find a significant social good item *not* in the cart that *could* have been afforded with the luxury spend
      const potentialAlternative = allPossibleChoices.find(choice =>
        choice.category === 'socialGood' &&
        choice.cost <= totalLuxuryCost &&
        !cartItems.some(cartItem => cartItem.id === choice.id) // Ensure it wasn't already chosen
      );
      if (potentialAlternative) {
        insights.push(`The $${totalLuxuryCost.toLocaleString()}B spent on luxury could have instead funded: "${potentialAlternative.name}" (Cost: $${potentialAlternative.cost.toLocaleString()}B).`);
      } else {
         // Find one that might have been affordable with the *initial* wealth if luxury wasn't bought
         const initialAlternative = allPossibleChoices.find(choice =>
            choice.category === 'socialGood' &&
            choice.cost <= initialWealth &&
             !cartItems.some(cartItem => cartItem.id === choice.id)
         );
          if (initialAlternative) {
             insights.push(`Choosing luxury items meant missing out on funding things like "${initialAlternative.name}" (Cost: $${initialAlternative.cost.toLocaleString()}B).`);
          }
      }
    }

     // Insight 4: What else could the *remaining* money do?
     if (remaining > 0 && cartItems.length > 0) {
         const potentialRemaining = allPossibleChoices.find(choice =>
            choice.category === 'socialGood' &&
            choice.cost <= remaining &&
             !cartItems.some(cartItem => cartItem.id === choice.id)
         );
          if (potentialRemaining) {
             insights.push(`With the remaining $${remaining.toLocaleString()}B, you could *still* fund "${potentialRemaining.name}" (Cost: $${potentialRemaining.cost.toLocaleString()}B).`);
          }
     }


    return insights;
  };

  const insights = generateInsights();
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const handleCopyLink = () => {
    // For now, copies the current page URL. Could be enhanced later.
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      })
      .catch(err => console.error('Failed to copy link: ', err));
  };

  const handleCopySummary = () => {
    const summaryText = [
      `My Wealth Playground Spree with ${entityName}:`,
      `Initial Fortune: $${initialWealth.toLocaleString()} B`,
      `Total Allocated: $${totalAllocated.toLocaleString()} B`,
      `Remaining: $${remaining.toLocaleString()} B`,
      `--- Key Allocations ---`,
      ...cartItems.map(item => `- ${item.name}: $${item.cost.toLocaleString()} B`),
      `--- Insights ---`,
      ...insights,
    ].join('\n');

    navigator.clipboard.writeText(summaryText)
      .then(() => {
        setCopiedSummary(true);
        setTimeout(() => setCopiedSummary(false), 2000);
      })
      .catch(err => console.error('Failed to copy summary: ', err));
  };

  // Basic social share handlers (open new tab with share URL)
  // These can be made more specific with pre-filled text later
  const shareOnTwitter = () => {
    const text = encodeURIComponent(`Check out my spending spree with ${entityName}'s fortune on Wealth Playground! Initial: $${initialWealth}B. I spent $${totalAllocated}B. #WealthPlayground`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const shareOnReddit = () => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(`My Wealth Playground Spree with ${entityName}`);
    window.open(`https://www.reddit.com/submit?url=${url}&title=${title}`, '_blank');
  };


  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative w-full max-w-2xl p-6 bg-white rounded-lg shadow-xl max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-200">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800">
                <BarChartHorizontal className="w-6 h-6 text-blue-600" />
                Your Allocation Analysis
              </h2>
              <button onClick={onClose} className="p-1 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-600" aria-label="Close modal">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Summary Stats */}
            <div className="mb-4 text-sm">
              <p><span className="font-semibold">{entityName}'s Initial Fortune:</span> ${initialWealth.toLocaleString()} B</p>
              <p><span className="font-semibold">Total Allocated:</span> ${totalAllocated.toLocaleString()} B</p>
              <p><span className="font-semibold">Remaining:</span> ${remaining.toLocaleString()} B</p> {/* Use calculated remaining */}
            </div>

            {/* Insights Section */}
            <div className="flex-grow pr-2 space-y-3 overflow-y-auto">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-700">
                 <Lightbulb className="w-5 h-5 text-yellow-500" />
                 Insights & Opportunity Costs:
              </h3>
              {insights.length > 0 ? (
                insights.map((insight, index) => (
                  <p key={index} className="p-3 text-sm text-indigo-800 border border-indigo-100 rounded-md bg-indigo-50">
                    {insight}
                  </p>
                ))
              ) : (
                 <p className="p-3 text-sm text-gray-500 rounded-md bg-gray-50">No specific insights generated yet.</p>
              )}
               <p className="mt-4 text-xs italic text-gray-500">
                 Note: Comparisons are illustrative. Real-world impact involves complex factors beyond cost.
               </p>
            </div>

            {/* Share Section */}
            <div className="pt-4 mt-6 border-t border-gray-200">
              <h3 className="flex items-center gap-2 mb-3 text-md font-semibold text-gray-700">
                <Share2 className="w-5 h-5 text-green-600" />
                Share Your Spree!
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <button
                  onClick={shareOnTwitter}
                  className="flex items-center justify-center w-full gap-2 px-3 py-2 text-sm font-medium text-white bg-[#1DA1F2] rounded-md hover:bg-[#0c85d0] transition-colors"
                >
                  <Twitter className="w-4 h-4" /> Twitter
                </button>
                <button
                  onClick={shareOnFacebook}
                  className="flex items-center justify-center w-full gap-2 px-3 py-2 text-sm font-medium text-white bg-[#1877F2] rounded-md hover:bg-[#1056ad] transition-colors"
                >
                  <Facebook className="w-4 h-4" /> Facebook
                </button>
                <button
                  onClick={shareOnReddit}
                  className="flex items-center justify-center w-full gap-2 px-3 py-2 text-sm font-medium text-white bg-[#FF4500] rounded-md hover:bg-[#cc3700] transition-colors"
                >
                  <MessageSquare className="w-4 h-4" /> Reddit
                </button>
                <button
                  onClick={handleCopyLink}
                  className="flex items-center justify-center w-full gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                >
                  <LinkIcon className="w-4 h-4" /> {copiedLink ? 'Copied!' : 'Copy Link'}
                </button>
                <button
                  onClick={handleCopySummary}
                  className="flex items-center justify-center w-full col-span-2 gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md sm:col-span-1 hover:bg-gray-300 transition-colors"
                >
                  <Copy className="w-4 h-4" /> {copiedSummary ? 'Copied!' : 'Copy Summary'}
                </button>
              </div>
            </div>


             {/* Ad Placeholder */}
            <div className="pt-3 mt-4 border-t border-gray-200">
              <div className="py-3 text-xs text-center text-gray-400 bg-gray-100 rounded-md h-14">
                [Modal Ad Placeholder - e.g., 300x50 or 320x50 banner]
              </div>
            </div>

             {/* Footer / Close Button */}
             <div className="pt-4 mt-4 "> {/* Removed border-t as ad placeholder has one */}
                <button onClick={onClose} className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
                    Close Analysis
                </button>
             </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
