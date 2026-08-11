'use client';

/**
 * Theme Context & Provider.
 * Responsible for managing global Dark/Light mode theme state and HTML data-theme attribute persistence.
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAppConstants, ThemeModeType } from '@/constants';

interface ThemeContextType {
  theme: ThemeModeType;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const constants = getAppConstants();
  const [theme, setTheme] = useState<ThemeModeType>(constants.THEME.DARK);

  useEffect(() => {
    const storedTheme = localStorage.getItem(constants.THEME_STORAGE_KEY) as ThemeModeType | null;
    if (storedTheme === constants.THEME.LIGHT || storedTheme === constants.THEME.DARK) {
      setTheme(storedTheme);
      document.documentElement.setAttribute('data-theme', storedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', constants.THEME.DARK);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme =
      theme === constants.THEME.DARK ? constants.THEME.LIGHT : constants.THEME.DARK;
    setTheme(nextTheme);
    localStorage.setItem(constants.THEME_STORAGE_KEY, nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const constants = getAppConstants();
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(constants.MESSAGES.ERRORS.THEME_PROVIDER_REQUIRED);
  }
  return context;
};
