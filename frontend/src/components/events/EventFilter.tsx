'use client';

/**
 * Event Filter UI Component.
 * Responsible for rendering search input box and category pill selection filters.
 */
import React from 'react';
import { Search, Filter } from 'lucide-react';

interface EventFilterProps {
  search: string;
  category: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  categories: string[];
}

export const EventFilter: React.FC<EventFilterProps> = ({
  search,
  category,
  onSearchChange,
  onCategoryChange,
  categories,
}) => {
  return (
    <div className="glass-panel p-4 rounded-2xl mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
      {/* Search Input */}
      <div className="relative w-full md:w-96">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by title, description, or location..."
          className={
            'w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 ' +
            'text-white placeholder-gray-400 text-sm focus:outline-none focus:border-brand-500 transition-colors'
          }
        />
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
        <Filter className="w-4 h-4 text-gray-400 hidden sm:block shrink-0" />
        <button
          onClick={() => onCategoryChange('')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            category === ''
              ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30'
              : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
          }`}
        >
          All Events
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              category === cat
                ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};
