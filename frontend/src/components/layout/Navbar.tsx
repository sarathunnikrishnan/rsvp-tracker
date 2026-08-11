'use client';

/**
 * Navbar UI Component.
 * Responsible for displaying top site header, branding logo, quick demo user login buttons, and auth actions.
 */
import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { Calendar, PlusCircle, LogIn, LogOut, UserCheck, UserPlus } from 'lucide-react';
import { getAppConstants } from '@/constants';
import { IUser } from '@/types';

export const Navbar: React.FC = () => {
  const constants = getAppConstants();
  const { user, logout, demoUsers, login } = useAuth();

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3 group">
            <div
              className={
                'w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-400 ' +
                'flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform'
              }
            >
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <span
                className={
                  'text-xl font-bold bg-clip-text text-transparent ' +
                  'bg-gradient-to-r from-white to-gray-400'
                }
              >
                MeetupPulse
              </span>
              <span
                className={
                  'hidden sm:inline-block ml-2 text-xs px-2 py-0.5 rounded-full ' +
                  'bg-brand-500/20 text-brand-400 font-medium'
                }
              >
                Dexqbit
              </span>
            </div>
          </Link>

          {/* Quick Demo Switcher, Theme Toggle & Auth Navigation */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            {user ? (
              <>
                <Link
                  href="/events/create"
                  className={
                    'flex items-center space-x-2 px-4 py-2 rounded-xl bg-brand-600 ' +
                    'hover:bg-brand-500 text-white font-medium text-sm transition-all ' +
                    'shadow-lg shadow-brand-600/30'
                  }
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Create Event</span>
                </Link>

                <div className="flex items-center space-x-3 pl-2 border-l border-white/10">
                  <img
                    src={constants.AVATAR.getUrl(user.name, user.avatar_url)}
                    alt={user.name}
                    className="w-8 h-8 rounded-full bg-gray-800 ring-2 ring-brand-500/50"
                  />
                  <div className="hidden md:block">
                    <p className="text-xs font-semibold text-white leading-tight">{user.name}</p>
                    <p className="text-[10px] text-gray-400">{user.email}</p>
                  </div>

                  <button
                    onClick={logout}
                    title="Logout"
                    className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2 sm:space-x-3">
                {/* Demo User Selector */}
                {demoUsers.length > 0 && (
                  <div
                    className={
                      'hidden lg:flex items-center space-x-2 bg-white/5 p-1 ' +
                      'rounded-xl border border-white/10'
                    }
                  >
                    <UserCheck className="w-4 h-4 text-brand-400 ml-2" />
                    <span className="text-xs text-gray-400">Demo Login:</span>
                    {demoUsers.map((u: IUser) => (
                      <button
                        key={u.id}
                        onClick={() => login(u.email)}
                        className={
                          'px-2.5 py-1 rounded-lg text-xs font-medium bg-white/10 ' +
                          'hover:bg-brand-600 hover:text-white text-gray-300 ' +
                          'transition-colors cursor-pointer'
                        }
                      >
                        {u.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                )}

                <Link
                  href="/login"
                  className={
                    'flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-xl bg-white/10 ' +
                    'hover:bg-white/20 text-white font-medium text-sm transition-all'
                  }
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>

                <Link
                  href="/register"
                  className={
                    'flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-xl bg-brand-600 ' +
                    'hover:bg-brand-500 text-white font-medium text-sm transition-all shadow-lg ' +
                    'shadow-brand-600/30'
                  }
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
