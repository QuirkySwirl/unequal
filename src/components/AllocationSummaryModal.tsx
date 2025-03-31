import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BarChartHorizontal, Lightbulb } from 'lucide-react';
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

             {/* Footer / Close Button */}
             <div className="pt-4 mt-4 border-t border-gray-200">
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
