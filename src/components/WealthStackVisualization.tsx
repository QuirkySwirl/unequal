import React from 'react';
import { motion } from 'framer-motion';
import { Coins } from 'lucide-react'; // Removed Orbit import

interface WealthStackVisualizationProps {
  wealth: number; // Wealth in Billions USD
}

// Constants
const BILL_THICKNESS_M = 0.00010922; // Thickness in meters
const EARTH_RADIUS_KM = 6371;
const MOON_DISTANCE_KM = 384400;

export function WealthStackVisualization({ wealth }: WealthStackVisualizationProps) {
  // Calculate stack height
  const totalBills = wealth * 1e9 / 100;
  const stackHeightMeters = totalBills * BILL_THICKNESS_M;
  const stackHeightKm = stackHeightMeters / 1000;

  // Determine comparison text
  let comparisonText = '';
  if (stackHeightKm > MOON_DISTANCE_KM) {
    comparisonText = `Reaches past the Moon (${(stackHeightKm / MOON_DISTANCE_KM).toFixed(1)}x)!`;
  } else if (stackHeightKm > EARTH_RADIUS_KM * 2) {
    comparisonText = `Taller than Earth's diameter! (${stackHeightKm.toLocaleString(undefined, {maximumFractionDigits: 0})} km)`;
  } else if (stackHeightKm > 1000) { // Arbitrary threshold for "into space"
     comparisonText = `Extends deep into space (${stackHeightKm.toLocaleString(undefined, {maximumFractionDigits: 0})} km)`;
  } else if (stackHeightKm > 1) {
     comparisonText = `That's ${stackHeightKm.toFixed(1)} km high!`;
  } else {
     comparisonText = `That's ${stackHeightMeters.toFixed(0)} meters high!`;
  }

  // Animation Variants
  const containerVariants = {
    initial: { scale: 1, y: 0 },
    animate: { scale: 0.05, y: "-40%", transition: { duration: 2.5, delay: 0.5, ease: "easeInOut" } }, // Zoom out effect
  };

  const stackVariants = {
    initial: { scaleY: 0, originY: 1 }, // Start scaled down from bottom
    animate: { scaleY: 1, transition: { duration: 1.5, delay: 0.5, ease: "easeOut" } }, // Grow up
  };

  const textVariants = {
     initial: { opacity: 0, y: 10 },
     animate: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 2.5 } }, // Fade in after zoom/grow
  }

  return (
    <div className="p-4 overflow-hidden rounded-lg shadow bg-gradient-to-b from-blue-50 to-indigo-100">
      <h3 className="mb-4 text-base font-semibold text-center text-gray-800 sm:text-lg">
         <Coins className="inline w-5 h-5 mr-2 text-indigo-600" />
         Wealth Stacked Up ($100 Bills)
      </h3>
      {/* Outer container to manage perspective/overflow */}
      <div className="relative flex items-center justify-center w-full overflow-hidden h-80">
        {/* Background representing space */}
         <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-purple-900 to-black"></div>
         {/* Simple stars */}
         <div className="absolute w-1 h-1 bg-white rounded-full top-1/4 left-1/4 opacity-80 animate-pulse"></div>
         <div className="absolute w-1 h-1 delay-500 bg-white rounded-full top-1/2 left-3/4 opacity-60 animate-pulse"></div>
         <div className="absolute w-1 h-1 delay-1000 bg-white rounded-full bottom-1/4 left-1/2 opacity-70 animate-pulse"></div>


        {/* Animated container for zoom effect */}
        <motion.div
          className="relative w-48 h-48" // Initial size container
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {/* Earth representation */}
          <div className="absolute bottom-0 w-full transform -translate-x-1/2 rounded-t-full left-1/2 h-1/2 bg-gradient-to-t from-blue-600 to-blue-400">
             <div className="absolute inset-0 bg-black rounded-t-full opacity-20"></div> {/* Simple shadow */}
          </div>

          {/* The Stack - positioned relative to Earth */}
          <motion.div
            className="absolute bottom-[50%] left-1/2 transform -translate-x-1/2 w-2 bg-green-400"
            variants={stackVariants}
            style={{ height: '200%' }} // Make it visually very tall relative to initial container
            title={`Stack Height: ${stackHeightKm > 1 ? stackHeightKm.toFixed(1) + ' km' : stackHeightMeters.toFixed(0) + ' m'}`}
          />
        </motion.div>

         {/* Text overlay - appears after animation */}
         <motion.div
            className="absolute inset-x-0 p-2 text-center bottom-4"
            variants={textVariants}
            initial="initial"
            animate="animate"
         >
            <p className="inline-block px-2 py-1 text-sm font-semibold text-white bg-black bg-opacity-50 rounded shadow-lg">
               {comparisonText}
            </p>
         </motion.div>

      </div>
       <p className="mt-4 text-xs italic text-center text-gray-500">
        Note: Animation shows relative scale. Stack represents ${wealth} Billion in $100 bills.
      </p>
    </div>
  );
}
