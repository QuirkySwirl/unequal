import React from 'react';
import { motion } from 'framer-motion';
import { Coins } from 'lucide-react';
// Removed unused icons: Building2, LandmarkIcon, Ship, User

interface WealthStackVisualizationProps {
  wealth: number; // Wealth in Billions USD
}

// Constants
const BILL_THICKNESS_M = 0.00010922;
const EARTH_RADIUS_KM = 6371;
const MOON_DISTANCE_KM = 384400;

// Removed unused REFERENCE_OBJECTS constant
// const REFERENCE_OBJECTS = [ ... ];

export function WealthStackVisualization({ wealth }: WealthStackVisualizationProps) {
  const totalBills = wealth * 1e9 / 100;
  const stackHeightMeters = totalBills * BILL_THICKNESS_M;
  const stackHeightKm = stackHeightMeters / 1000;

  let comparisonText = '';
  if (stackHeightKm > MOON_DISTANCE_KM) { comparisonText = `Reaches past the Moon (${(stackHeightKm / MOON_DISTANCE_KM).toFixed(1)}x)!`; }
  else if (stackHeightKm > EARTH_RADIUS_KM * 2) { comparisonText = `Taller than Earth's diameter! (${stackHeightKm.toLocaleString(undefined, {maximumFractionDigits: 0})} km)`; }
  else if (stackHeightKm > 1000) { comparisonText = `Extends deep into space (${stackHeightKm.toLocaleString(undefined, {maximumFractionDigits: 0})} km)`; }
  else if (stackHeightKm > 1) { comparisonText = `That's ${stackHeightKm.toFixed(1)} km high!`; }
  else { comparisonText = `That's ${stackHeightMeters.toFixed(0)} meters high!`; }

  // Removed unused visualStackHeight and scaleFactor as they aren't needed for this animation approach

  // Animation Variants with Looping
  const containerVariants = {
    initial: { scale: 1, y: 0 },
    animate: { scale: [1, 0.05, 1], y: ["0%", "-40%", "0%"] }, // Zoom out and back in
    transition: { duration: 5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 } // Loop the zoom
  };

  // Simple opacity pulse for the stack
  const stackVariants = {
    initial: { opacity: 0.5 },
    animate: { opacity: [0.5, 1, 0.5] }, // Pulse opacity
    transition: { duration: 2, ease: "easeInOut", repeat: Infinity } // Loop pulse
  };

  const textVariants = {
     initial: { opacity: 0, y: 10 },
     animate: { opacity: [0, 1, 1, 1, 0.5, 1] },
     transition: { duration: 5, repeat: Infinity, repeatDelay: 1, times: [0, 0.1, 0.8, 0.9, 0.95, 1] }
  }

  return (
    <div className="p-4 overflow-hidden rounded-lg shadow bg-gradient-to-b from-blue-50 to-indigo-100">
      <h3 className="mb-4 text-base font-semibold text-center text-gray-800 sm:text-lg">
         <Coins className="inline w-5 h-5 mr-2 text-indigo-600" />
         Wealth Stacked Up ($100 Bills)
      </h3>
      <div className="relative flex items-center justify-center w-full overflow-hidden h-80">
         {/* Background */}
         <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-purple-900 to-black"></div>
         <div className="absolute w-1 h-1 bg-white rounded-full top-1/4 left-1/4 opacity-80 animate-pulse"></div>
         <div className="absolute w-1 h-1 delay-500 bg-white rounded-full top-1/2 left-3/4 opacity-60 animate-pulse"></div>
         <div className="absolute w-1 h-1 delay-1000 bg-white rounded-full bottom-1/4 left-1/2 opacity-70 animate-pulse"></div>

        {/* Animated container for zoom effect */}
        <motion.div
          className="relative w-48 h-48"
          variants={containerVariants}
          initial="initial"
          animate="animate"
          transition={containerVariants.transition}
        >
          {/* Earth */}
          <div className="absolute bottom-0 w-full transform -translate-x-1/2 rounded-t-full left-1/2 h-1/2 bg-gradient-to-t from-blue-600 to-blue-400">
             <div className="absolute inset-0 bg-black rounded-t-full opacity-20"></div>
          </div>
          {/* Stack - Now uses opacity pulse, height is visually very large */}
          <motion.div
            className="absolute bottom-[50%] left-1/2 transform -translate-x-1/2 w-2 bg-green-400"
            variants={stackVariants}
            initial="initial"
            animate="animate"
            transition={stackVariants.transition}
            style={{ height: '2000%' }} // Make it visually extend far beyond container
            title={`Stack Height: ${stackHeightKm > 1 ? stackHeightKm.toFixed(1) + ' km' : stackHeightMeters.toFixed(0) + ' m'}`}
          />
        </motion.div>

         {/* Text overlay */}
         <motion.div
            className="absolute inset-x-0 p-2 text-center bottom-4"
            variants={textVariants}
            initial="initial"
            animate="animate"
            transition={textVariants.transition}
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
