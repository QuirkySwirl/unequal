import React from 'react';
import { DollarSign, MapPin } from 'lucide-react';

interface WealthCardProps {
  name: string;
  worth: number;
  image: string;
  subtitle: string;
  onClick: () => void;
  country?: string;
  color?: string;
  flagUrl?: string; // Add optional flagUrl prop
  domain?: string; // Add optional domain prop
}

export function WealthCard({
  name,
  worth,
  image,
  subtitle,
  onClick,
  country,
  color,
  flagUrl, // Destructure the new prop
  domain // Destructure domain prop
}: WealthCardProps) {
  return (
    <div
      onClick={onClick}
      // Responsive adjustments: flex-col default, sm:flex-row, adjusted padding/gap
      className="flex flex-col items-start gap-3 p-4 transition-all bg-white shadow-md cursor-pointer group rounded-xl hover:shadow-lg hover:ring-2 hover:ring-indigo-300 sm:flex-row sm:items-center sm:gap-5 sm:p-5"
    >
      {/* Image container - slightly smaller on mobile? Keep fixed for now */}
      <div
        className={`relative flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ${color ? '' : 'border-2 border-gray-100'}`}
        style={color ? { backgroundColor: color } : {}}
      >
        <img
          // Use Clearbit for companies (if domain exists), otherwise use original image (for billionaires)
          src={domain ? `https://logo.clearbit.com/${domain}` : image}
          alt={name}
          // Ensure image fits well, especially if logo has transparency
          className={`object-contain w-12 h-12 ${color ? '' : 'rounded-full object-cover w-full h-full'}`} // Use contain for logos, cover for photos
          // Hide image on error (e.g., Clearbit 404)
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
        {/* Display flag instead of MapPin if flagUrl exists */}
        {flagUrl ? (
           <img
              src={flagUrl}
              alt={`${country} flag`}
              // Ensure square aspect ratio and cover for circular flags
              className="absolute bottom-0 right-0 object-cover w-5 h-5 border border-gray-200 rounded-full shadow"
              onError={(e) => (e.currentTarget.style.display = 'none')} // Hide if flag fails to load
            />
        ) : country && (
          // Fallback to MapPin if no flag
          <div className="absolute bottom-0 right-0 bg-white rounded-full p-0.5 shadow">
            <MapPin className="w-3.5 h-3.5 text-gray-500" />
          </div>
        )}
      </div>

      {/* Text content container */}
      <div className="flex-grow min-w-0">
        {/* Name and Country */}
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0"> {/* Allow wrapping */}
          {/* Slightly smaller text on mobile */}
          <h3 className="text-sm font-semibold text-gray-900 truncate sm:text-base">{name}</h3>
          {country && (
            <span className="flex-shrink-0 text-xs text-gray-500">({country})</span>
          )}
        </div>
         {/* Subtitle - slightly smaller text on mobile */}
        <p className="text-xs text-gray-500 mb-1 sm:mb-1.5">{subtitle}</p>
         {/* Worth - slightly smaller text/icon on mobile */}
        <div className="flex items-center gap-1 font-mono text-xs">
          <DollarSign className="w-3 h-3 text-green-600 sm:w-3.5 sm:h-3.5" />
          <span className="font-semibold text-gray-800">
            ${worth.toLocaleString()} B
          </span> {/* Correct JSX comment syntax */}
        </div>
      </div>
    </div>
  );
}
