import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 bg-gray-100 border-t border-gray-200">
      <div className="container px-4 py-8 mx-auto text-center text-gray-600 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <Link to="/" className="text-sm hover:text-indigo-600">Home</Link>
          <Link to="/about" className="text-sm hover:text-indigo-600">About</Link>
          <Link to="/terms" className="text-sm hover:text-indigo-600">Terms of Service</Link>
          <Link to="/privacy" className="text-sm hover:text-indigo-600">Privacy Policy</Link>
          {/* Add link to GitHub repo later */}
          {/* <a href="[Link to Repo]" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-indigo-600">GitHub</a> */}
        </nav>
        <p className="mt-4 text-xs">
          &copy; {currentYear} Wealth Playground. All data is for illustrative purposes.
        </p>
        {/* Optional: Add link back to your site or name */}
        {/* <p className="text-xs">Created by [Your Name/Link]</p> */}
      </div>
    </footer>
  );
}
