/**
 * Footer UI Component.
 * Responsible for rendering bottom page copyright notice, technology stack tags, and architecture badge.
 */
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 py-8 mt-16 glass-panel">
      <div
        className={
          'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col ' +
          'sm:flex-row justify-between items-center gap-4'
        }
      >
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Dexqbit Technical Assignment. Built with Next.js, Express & MySQL.
        </p>
        <div className="flex items-center space-x-4 text-xs text-gray-400">
          <span>Docker Orchestrated</span>
          <span>•</span>
          <span>JWT Protected</span>
          <span>•</span>
          <span>TypeScript Standardized</span>
        </div>
      </div>
    </footer>
  );
};
