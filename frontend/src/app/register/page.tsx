'use client';

/**
 * Account Registration (Sign Up) Page.
 * Responsible for displaying sign up form, client-side validation, password encryption submission, and auth redirect.
 */
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { User, Mail, Lock, Sparkles, Loader2, UserPlus, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { getAppConstants } from '@/constants';

export default function RegisterPage() {
  const constants = getAppConstants();
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim() || !email.trim() || !password.trim()) {
      setErrorMsg(constants.MESSAGES.ERRORS.REGISTRATION_FAILED);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg(constants.MESSAGES.ERRORS.PASSWORDS_DONT_MATCH);
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);
    const success = await register(name, email, password);
    setIsSubmitting(false);

    if (success) {
      router.push('/');
    } else {
      setErrorMsg(constants.MESSAGES.ERRORS.REGISTRATION_FAILED);
    }
  };

  return (
    <div className="max-w-md mx-auto py-8 px-4">
      {/* Header Banner */}
      <div className="text-center mb-8">
        <div
          className={
            'inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 ' +
            'border border-brand-500/30 text-brand-300 text-xs font-semibold mb-3'
          }
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Join Dexqbit Community</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Create Account</h1>
        <p className="text-sm text-gray-400">{constants.MESSAGES.DESCRIPTIONS.REGISTER_SUBTITLE}</p>
      </div>

      {/* Sign Up Form Container */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name Field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sarah Connor"
                className={
                  'w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 ' +
                  'text-white placeholder-gray-400 text-sm focus:outline-none ' +
                  'focus:border-brand-500 transition-colors'
                }
              />
            </div>
          </div>

          {/* Email Address Field */}
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
                  'text-white placeholder-gray-400 text-sm focus:outline-none ' +
                  'focus:border-brand-500 transition-colors'
                }
              />
            </div>
          </div>

          {/* Password Field */}
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
                  'text-white placeholder-gray-400 text-sm focus:outline-none ' +
                  'focus:border-brand-500 transition-colors'
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={
                  'absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 ' +
                  'hover:text-white transition-colors'
                }
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className={
                  'w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 ' +
                  'text-white placeholder-gray-400 text-sm focus:outline-none ' +
                  'focus:border-brand-500 transition-colors'
                }
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={
              'w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 ' +
              'hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl ' +
              'shadow-brand-600/30 transition-all duration-200 hover:scale-[1.01] flex items-center ' +
              'justify-center gap-2 cursor-pointer'
            }
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Create Account</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Redirect Link */}
        <div className="pt-2 border-t border-white/10 text-center">
          <p className="text-xs text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="text-brand-400 font-semibold hover:underline">
              Sign In Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
