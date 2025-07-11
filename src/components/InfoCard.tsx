import React from 'react';
import { motion } from 'framer-motion';
import { Share2 } from 'lucide-react'; // Import Share2 icon

interface InfoCardProps {
  icon: React.ElementType;
  title: string;
  value: string; // The main calculated value or comparison point
  description?: string; // Optional description or context
  source?: string; // Optional source link or text
  sourceYear?: number; // Optional year for the source data
  onShare?: () => void; // Optional share handler
  shareText?: string; // Optional text for the share button tooltip or action
}

export function InfoCard({ icon: Icon, title, value, description, source, sourceYear, onShare, shareText = "Share this fact" }: InfoCardProps) {
  // Animation variants for staggering children
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants} // Use variants for potential staggering in parent
      className="p-4 bg-white border border-gray-200 shadow-md sm:p-6 rounded-xl"
    >
      <div className="flex items-center gap-2 mb-2 sm:gap-3 sm:mb-3">
        {Icon && <Icon className="flex-shrink-0 w-5 h-5 text-indigo-600 sm:w-6 sm:h-6" />}
        <h3 className="text-base font-semibold text-gray-800 sm:text-lg">
          {title}
        </h3>
      </div>
      <p className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
        {value}
      </p>
      {description && (
        <p className="mb-3 text-sm text-gray-600 sm:text-base">
          {description}
        </p>
      )}
      {source && (
        <p className="text-xs text-gray-500">
          Source: {source} {sourceYear && `(${sourceYear})`}
        </p>
      )}
      {onShare && (
        <div className="mt-3 text-right">
          <button
            onClick={onShare}
            className="p-1.5 text-xs text-gray-500 rounded-md hover:bg-gray-100 hover:text-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            aria-label={shareText}
          >
            <Share2 className="inline w-4 h-4 mr-1" /> {shareText}
          </button>
        </div>
      )}
    </motion.div>
  );
}
