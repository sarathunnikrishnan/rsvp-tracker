'use client';

/**
 * RSVP Action Button Component.
 * Responsible for displaying interactive Going, Maybe, and Declined RSVP buttons and submitting status updates.
 */
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { apiFetch } from '@/services/api.service';
import { CheckCircle2, HelpCircle, XCircle, LogIn, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { APP_CONSTANTS, RsvpStatusType } from '@/constants';

interface RsvpButtonProps {
  eventId: number;
  currentStatus: string | null;
  onRsvpChange: (newStatus: string) => void;
}

export const RsvpButton: React.FC<RsvpButtonProps> = ({ eventId, currentStatus, onRsvpChange }) => {
  const { user } = useAuth();
  const [loadingStatus, setLoadingStatus] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!user) {
    return (
      <div className="glass-panel p-5 rounded-2xl text-center border border-white/10 shadow-xl">
        <p className="text-sm font-medium text-gray-300 mb-3">
          {APP_CONSTANTS.MESSAGES.DESCRIPTIONS.LOGIN_REQUIRED_RSVP}
        </p>
        <Link
          href="/login"
          className={
            'inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r ' +
            'from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white ' +
            'text-xs font-semibold shadow-lg shadow-brand-600/30 transition-all duration-200 hover:scale-[1.02]'
          }
        >
          <LogIn className="w-4 h-4" />
          <span>Login to Account</span>
        </Link>
      </div>
    );
  }

  const handleRsvp = async (status: RsvpStatusType) => {
    setLoadingStatus(status);
    setErrorMsg(null);

    const res = await apiFetch<{ status: string }>(APP_CONSTANTS.ROUTES.RSVPS.UPSERT(eventId), {
      method: APP_CONSTANTS.HTTP.POST,
      body: JSON.stringify({ status }),
    });

    setLoadingStatus(null);

    if (res.success && res.data) {
      onRsvpChange(res.data.status);
    } else {
      setErrorMsg(res.message || APP_CONSTANTS.MESSAGES.ERRORS.RSVP_FAILED);
    }
  };

  return (
    <div className="glass-panel p-5 rounded-2xl border border-white/10 shadow-xl space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs uppercase tracking-wider font-bold text-gray-400">Your RSVP Status</h4>
        {currentStatus && (
          <span
            className={
              'text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ' +
              'bg-white/10 text-gray-300 border border-white/10'
            }
          >
            Selected: {currentStatus}
          </span>
        )}
      </div>

      {errorMsg && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-3 gap-2.5">
        {/* Going Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleRsvp(APP_CONSTANTS.RSVP.GOING);
          }}
          disabled={loadingStatus !== null}
          className={
            'relative flex items-center justify-center gap-2 py-3 px-3 rounded-xl ' +
            `text-xs font-bold border transition-all duration-200 cursor-pointer ${
              currentStatus === APP_CONSTANTS.RSVP.GOING
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 ' +
                  'shadow-lg shadow-emerald-500/20 ring-2 ring-emerald-500/50 scale-[1.02]'
                : 'bg-white/5 border-white/10 text-emerald-400 ' +
                  'hover:bg-emerald-500/10 hover:border-emerald-500/30'
            }`
          }
        >
          {loadingStatus === APP_CONSTANTS.RSVP.GOING ? (
            <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
          ) : (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          )}
          <span>Going</span>
        </button>

        {/* Maybe Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleRsvp(APP_CONSTANTS.RSVP.MAYBE);
          }}
          disabled={loadingStatus !== null}
          className={
            'relative flex items-center justify-center gap-2 py-3 px-3 rounded-xl ' +
            `text-xs font-bold border transition-all duration-200 cursor-pointer ${
              currentStatus === APP_CONSTANTS.RSVP.MAYBE
                ? 'bg-amber-500/20 border-amber-500 text-amber-400 ' +
                  'shadow-lg shadow-amber-500/20 ring-2 ring-amber-500/50 scale-[1.02]'
                : 'bg-white/5 border-white/10 text-amber-400 ' +
                  'hover:bg-amber-500/10 hover:border-amber-500/30'
            }`
          }
        >
          {loadingStatus === APP_CONSTANTS.RSVP.MAYBE ? (
            <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
          ) : (
            <HelpCircle className="w-4 h-4 shrink-0 text-amber-400" />
          )}
          <span>Maybe</span>
        </button>

        {/* Declined Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleRsvp(APP_CONSTANTS.RSVP.DECLINED);
          }}
          disabled={loadingStatus !== null}
          className={
            'relative flex items-center justify-center gap-2 py-3 px-3 rounded-xl ' +
            `text-xs font-bold border transition-all duration-200 cursor-pointer ${
              currentStatus === APP_CONSTANTS.RSVP.DECLINED
                ? 'bg-rose-500/20 border-rose-500 text-rose-400 ' +
                  'shadow-lg shadow-rose-500/20 ring-2 ring-rose-500/50 scale-[1.02]'
                : 'bg-white/5 border-white/10 text-rose-400 ' +
                  'hover:bg-rose-500/10 hover:border-rose-500/30'
            }`
          }
        >
          {loadingStatus === APP_CONSTANTS.RSVP.DECLINED ? (
            <Loader2 className="w-4 h-4 animate-spin text-rose-400" />
          ) : (
            <XCircle className="w-4 h-4 shrink-0 text-rose-400" />
          )}
          <span>Declined</span>
        </button>
      </div>
    </div>
  );
};
