import React from 'react';

interface WealthStackVisualizationProps {
  wealth: number; // Wealth in Billions USD
}

// Constants for calculation (approximate)
const BILL_THICKNESS_MM = 0.10922; // Thickness of a US bill
const METERS_PER_MM = 0.001;

// Reference objects (heights in meters) - Add more as needed
const REFERENCE_OBJECTS = [
  { name: 'Eiffel Tower', height: 330 },
  { name: 'Statue of Liberty (incl. pedestal)', height: 93 },
  { name: 'Boeing 747 (length)', height: 76.3 }, // Using length as 'height' for comparison
  { name: 'Average Human', height: 1.7 },
];

export function WealthStackVisualization({ wealth }: WealthStackVisualizationProps) {
  // Calculate the height of the wealth stack in meters
  const totalBills = wealth * 1e9 / 100; // Total number of $100 bills
  const stackHeightMeters = totalBills * BILL_THICKNESS_MM * METERS_PER_MM;

  // Determine a suitable scale for visualization
  // This needs refinement - find the max height (stack or reference) and scale down
  const maxHeight = Math.max(stackHeightMeters, ...REFERENCE_OBJECTS.map(o => o.height));
  // Removed the first declaration of scaleFactor

  // Adjusted scale factor for potentially smaller height on mobile
  const scaleFactor = (window.innerWidth < 640 ? 250 : 300) / maxHeight; // Target max visual height (e.g., 250px mobile, 300px desktop)

  const visualStackHeight = stackHeightMeters * scaleFactor;

  return (
    // Adjusted padding
    <div className="p-3 rounded-lg shadow sm:p-4 bg-gray-50">
       {/* Adjusted text size and margin */}
      <h3 className="mb-3 text-base font-semibold text-gray-800 sm:mb-4 sm:text-lg">Wealth Stacked Up ($100 Bills)</h3>
       {/* Responsive height and gap */}
      <div className="flex items-end justify-around h-[250px] sm:h-[350px] border-b border-gray-300 pb-2 gap-2 sm:gap-4">
        {/* Wealth Stack */}
        <div className="flex flex-col items-center text-center">
           {/* Responsive width */}
           <div
             className="w-8 bg-green-600 border border-green-800 sm:w-12" // Simple rectangle for now
             style={{ height: `${Math.max(visualStackHeight, 2)}px` }} // Min height of 2px
             title={`Stack Height: ${stackHeightMeters.toLocaleString(undefined, {maximumFractionDigits: 0})} meters`}
           ></div>
            {/* Responsive text size */}
           <span className="mt-1 text-[10px] font-medium sm:text-xs">Your Stack</span>
           <span className="text-[10px] text-gray-600 sm:text-xs">({stackHeightMeters.toLocaleString(undefined, {maximumFractionDigits: 0})} m)</span>
        </div>

        {/* Reference Objects */}
        {REFERENCE_OBJECTS.map(obj => {
          const visualObjHeight = obj.height * scaleFactor;
          return (
            <div key={obj.name} className="flex flex-col items-center text-center">
               {/* Responsive width */}
              <div
                className="w-6 bg-gray-400 border border-gray-600 sm:w-8" // Simple rectangle
                style={{ height: `${Math.max(visualObjHeight, 2)}px` }}
                title={`${obj.name}: ${obj.height} meters`}
              ></div>
               {/* Responsive text size */}
              <span className="mt-1 text-[10px] font-medium sm:text-xs">{obj.name}</span>
               <span className="text-[10px] text-gray-600 sm:text-xs">({obj.height} m)</span>
            </div>
          );
        })}
      </div>
       {/* Responsive text size */}
      <p className="mt-2 text-[10px] italic text-gray-500 sm:text-xs">
        Note: Visualization is scaled for comparison. Stack represents ${wealth} Billion in $100 bills.
      </p>
    </div>
  );
}
