'use client';

/**
 * User Login Page.
 * Responsible for rendering authentication form, quick demo user selector, and password toggle.
 */
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { IUser } from '@/types';
import { LogIn, UserCheck, ShieldCheck, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { getAppConstants } from '@/constants';

export default function LoginPage() {
  const constants = getAppConstants();
  const router = useRouter();
  const { login, demoUsers } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const success = await login(email, password);
    setLoading(false);

    if (success) {
      router.push('/');
    } else {
      setErrorMsg(constants.MESSAGES.ERRORS.LOGIN_FAILED);
    }
  };

  const handleDemoSelect = async (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword(constants.AUTH.DEFAULT_PASSWORD);
    setLoading(true);
    const success = await login(demoEmail, constants.AUTH.DEFAULT_PASSWORD);
    setLoading(false);
    if (success) {
      router.push('/');
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <div className="glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
        <div className="text-center">
          <div
            className={
              'w-12 h-12 rounded-2xl bg-brand-600/20 border border-brand-500/30 ' +
              'flex items-center justify-center mx-auto mb-3 text-brand-400'
            }
          >
            <LogIn className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white">Login to Account</h2>
          <p className="text-xs text-gray-400 mt-1">{constants.MESSAGES.DESCRIPTIONS.LOGIN_SUBTITLE}</p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={constants.MESSAGES.PLACEHOLDERS.EMAIL}
                className={
                  'w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 ' +
                  'text-white placeholder-gray-500 text-sm focus:outline-none ' +
                  'focus:border-brand-500 transition-colors'
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={
                  'w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/5 border border-white/10 ' +
                  'text-white placeholder-gray-500 text-sm focus:outline-none ' +
                  'focus:border-brand-500 transition-colors'
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={
                  'absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 ' +
                  'hover:text-white transition-colors focus:outline-none'
                }
                title={
                  showPassword
                    ? constants.MESSAGES.TOOLTIPS.HIDE_PASSWORD
                    : constants.MESSAGES.TOOLTIPS.SHOW_PASSWORD
                }
              >
                {showPassword ? <EyeOff className="w-4 h-4 text-brand-400" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={
              'w-full py-3 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 ' +
              'hover:to-indigo-500 text-white text-sm font-bold shadow-lg shadow-brand-600/30 ' +
              'transition-all hover:scale-[1.01] cursor-pointer'
            }
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        {/* Register Footer Option */}
        <div className="pt-3 border-t border-white/10 text-center">
          <p className="text-xs text-gray-400">
            Don&apos;t have an account yet?{' '}
            <Link href="/register" className="text-brand-400 font-semibold hover:underline">
              Create Account (Sign Up)
            </Link>
          </p>
        </div>

        {/* Demo Users Section */}
        {demoUsers.length > 0 && (
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <UserCheck className="w-4 h-4 text-brand-400" />
              <span className="text-xs font-semibold text-gray-300">Quick Demo User Login:</span>
            </div>
            <div className="space-y-2">
              {demoUsers.map((u: IUser) => (
                <button
                  type="button"
                  key={u.id}
                  onClick={() => handleDemoSelect(u.email)}
                  className={
                    'w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 ' +
                    'flex items-center justify-between transition-colors text-left group cursor-pointer'
                  }
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={constants.AVATAR.getUrl(u.name, u.avatar_url)}
                      alt={u.name}
                      className="w-8 h-8 rounded-full bg-gray-800"
                    />
                    <div>
                      <p className="text-xs font-semibold text-white group-hover:text-brand-300">{u.name}</p>
                      <p className="text-[10px] text-gray-400">{u.email}</p>
                    </div>
                  </div>
                  <ShieldCheck className="w-4 h-4 text-emerald-400 opacity-80" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
