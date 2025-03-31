import React from 'react';
import { Footer } from './Footer'; // Import the Footer component

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {children} {/* This is where the page content will be rendered */}
      </main>
      <Footer /> {/* Add the footer at the bottom */}
    </div>
  );
}
