import React from 'react';
import { Footer } from './Footer'; // Import the Footer component

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    // Apply the main app background and flex structure
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      {/* flex-grow ensures main content pushes footer down */}
      <main className="flex-grow">
        {/* Apply standard container padding - pages can override or add within this */}
        <div className="container px-4 py-8 mx-auto sm:px-6 lg:px-8 lg:py-12">
           {children} {/* This is where the page content will be rendered */}
        </div>
      </main>
      <Footer /> {/* Add the footer at the bottom */}
    </div>
  );
}
