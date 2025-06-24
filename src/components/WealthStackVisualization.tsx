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

import { Mountain, Rocket as RocketIcon, Globe2 } from 'lucide-react'; // Added Mountain, RocketIcon, Globe2 for reference points

interface WealthStackVisualizationProps {
  wealth: number; // Wealth in Billions USD
}

// Constants
const BILL_THICKNESS_M = 0.00010922;
const EARTH_RADIUS_KM = 6371;
const MOON_DISTANCE_KM = 384400;
const BURJ_KHALIFA_KM = 0.828; // Approx height
const MT_EVEREST_KM = 8.849;
const KARMAN_LINE_KM = 100; // Edge of space

const REFERENCE_POINTS = [
  { name: "Burj Khalifa", heightKm: BURJ_KHALIFA_KM, icon: Globe2 , note: "~0.8km"}, // Using Globe2 as placeholder, ideally a building icon
  { name: "Mt. Everest", heightKm: MT_EVEREST_KM, icon: Mountain, note: "~8.8km" },
  { name: "Karman Line (Space)", heightKm: KARMAN_LINE_KM, icon: RocketIcon, note: "~100km" },
];


export function WealthStackVisualization({ wealth }: WealthStackVisualizationProps) {
  const totalBills = wealth * 1e9 / 100;
  const stackHeightMeters = totalBills * BILL_THICKNESS_M;
  const stackHeightKm = stackHeightMeters / 1000;

  let comparisonText = '';
  if (stackHeightKm > MOON_DISTANCE_KM * 0.8) { // Adjusted for earlier trigger
    comparisonText = `Reaches ${(stackHeightKm / MOON_DISTANCE_KM).toFixed(1)}x the way to the Moon!`;
    if (stackHeightKm > MOON_DISTANCE_KM) comparisonText = `Reaches PAST the Moon (${(stackHeightKm / MOON_DISTANCE_KM).toFixed(1)}x)!`;
  } else if (stackHeightKm > EARTH_RADIUS_KM * 1.5) { // Adjusted
    comparisonText = `Taller than Earth's diameter! (${stackHeightKm.toLocaleString(undefined, {maximumFractionDigits: 0})} km)`;
  } else if (stackHeightKm > KARMAN_LINE_KM * 5) { // Significantly into space
    comparisonText = `Extends very deep into space (${stackHeightKm.toLocaleString(undefined, {maximumFractionDigits: 0})} km)`;
  } else if (stackHeightKm > KARMAN_LINE_KM) {
    comparisonText = `Reaches into Space! (${stackHeightKm.toLocaleString(undefined, {maximumFractionDigits: 0})} km)`;
  } else if (stackHeightKm > MT_EVEREST_KM * 2) {
     comparisonText = `Many times taller than Mt. Everest! (${stackHeightKm.toFixed(1)} km)`;
  } else if (stackHeightKm > 1) {
    comparisonText = `That's ${stackHeightKm.toFixed(1)} km high!`;
  } else {
    comparisonText = `That's ${stackHeightMeters.toFixed(0)} meters high!`;
  }

  // Determine a visual scale for the stack animation within the container
  // Let the container height (e.g., 320px) represent a certain max visual height (e.g., Karman line or more)
  const maxVisualHeightKm = KARMAN_LINE_KM * 1.5; // Max height the animation visually tries to represent
  const visualStackPercentage = Math.min(100, (stackHeightKm / maxVisualHeightKm) * 100);

  const stackVariants = {
    initial: { height: '0%', opacity: 0.7 },
    animate: {
      height: `${visualStackPercentage}%`,
      opacity: 1,
      transition: { duration: 2.5, ease: "easeOut", delay: 0.5 }
    }
  };

  const textVariants = {
     initial: { opacity: 0, y: 20 },
     animate: {
       opacity: 1,
       y: 0,
       transition: { duration: 0.8, ease: "easeOut", delay: 1.5 }
      },
  };

  return (
    <div className="p-4 overflow-hidden rounded-lg shadow bg-gradient-to-br from-indigo-700 via-purple-800 to-black">
      <h3 className="mb-4 text-base font-semibold text-center text-white sm:text-lg">
         <Coins className="inline w-5 h-5 mr-2 text-yellow-400" />
         Wealth Stacked Up ($100 Bills)
      </h3>
      <div className="relative flex flex-col items-center justify-end w-full mx-auto overflow-hidden h-96 max-w-xs"> {/* Taller container, items-end */}
         {/* Starry Background Elements */}
         <div className="absolute w-0.5 h-0.5 bg-gray-400 rounded-full top-[10%] left-[20%] animate-pulse delay-100"></div>
         <div className="absolute w-1 h-1 bg-gray-300 rounded-full top-[20%] left-[80%] animate-pulse delay-300"></div>
         <div className="absolute w-0.5 h-0.5 bg-gray-400 rounded-full top-[50%] left-[10%] animate-pulse delay-500"></div>
         <div className="absolute w-1 h-1 bg-gray-300 rounded-full top-[70%] left-[90%] animate-pulse delay-200"></div>
         <div className="absolute w-0.5 h-0.5 bg-gray-400 rounded-full top-[85%] left-[40%] animate-pulse delay-400"></div>

        {/* Reference Points - dynamically positioned based on visualStackPercentage */}
        {REFERENCE_POINTS.map(ref => {
          const refPercentage = (ref.heightKm / maxVisualHeightKm) * 100;
          if (refPercentage < 95 && visualStackPercentage > refPercentage * 0.8) { // Only show if stack is close or past it & within bounds
            return (
              <motion.div
                key={ref.name}
                className="absolute left-full ml-2 flex items-center gap-1 text-xs text-gray-300 whitespace-nowrap"
                style={{ bottom: `${refPercentage}%`}}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + refPercentage * 0.02, duration: 0.5 }}
              >
                <ref.icon className="w-3 h-3" /> {ref.name} ({ref.note})
              </motion.div>
            );
          }
          return null;
        })}

        {/* Earth - smaller and at the very bottom */}
        <div className="relative z-10 w-24 h-12 mb-[-1.5rem]"> {/* Negative margin to let stack start "from" earth */}
          <div
            className="w-full h-full rounded-t-full bg-gradient-to-t from-blue-600 via-blue-400 to-cyan-300 shadow-2xl"
            style={{
              backgroundImage: 'radial-gradient(ellipse at center bottom, #2c5282 0%, #3182ce 40%, #63b3ed 70%, #90cdf4 100%)',
            }}
          >
            <div className="absolute inset-0 opacity-25 rounded-t-full bg-black"></div> {/* Shadow effect */}
          </div>
        </div>

        {/* Stack - Animates height */}
        <motion.div
          className="relative z-0 w-3 bg-gradient-to-t from-green-400 to-lime-300 rounded-t-sm shadow-lg" // More currency like
          variants={stackVariants}
          initial="initial"
          animate="animate"
          title={`Actual Stack Height: ${stackHeightKm > 1 ? stackHeightKm.toFixed(1) + ' km' : stackHeightMeters.toFixed(0) + ' m'}`}
        />

        {/* Text overlay - positioned above the earth, appears after stack animation */}
         <motion.div
            className="absolute inset-x-0 p-3 text-center top-4" // Positioned at the top
            variants={textVariants}
            initial="initial"
            animate="animate"
         >
            <p className="inline-block px-3 py-1.5 text-sm font-semibold text-white bg-black bg-opacity-60 rounded-lg shadow-xl md:text-base">
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
