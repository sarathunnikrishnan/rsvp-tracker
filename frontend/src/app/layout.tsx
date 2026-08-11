/**
 * Root Layout Component.
 * Responsible for wrapping all Next.js pages with global styles, AuthProvider, Navbar, and Footer.
 */
import React from 'react';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { appMetadata } from '@/config/metadata.config';

export const metadata = appMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body className="antialiased min-h-screen flex flex-col justify-between transition-colors duration-300">
        <ThemeProvider>
          <AuthProvider>
            <div>
              <Navbar />
              <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
            </div>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
