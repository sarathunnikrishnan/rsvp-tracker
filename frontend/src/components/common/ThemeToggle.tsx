'use client';

/**
 * Theme Toggle Button Component.
 * Responsible for rendering Sun/Moon icon toggle button to switch between Dark and Light mode.
 */
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { APP_CONSTANTS } from '@/constants';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === APP_CONSTANTS.THEME.DARK;

  return (
    <button
      onClick={toggleTheme}
      type="button"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={
        'p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 ' +
        'hover:text-white transition-all duration-200 focus:outline-none'
      }
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400" />
      ) : (
        <Moon className="w-4 h-4 text-indigo-400" />
      )}
    </button>
  );
};
