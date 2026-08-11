'use client';

/**
 * Meetup Event Creation Page.
 * Responsible for displaying event creation forms and submitting new meetups to the API.
 */
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { apiFetch } from '@/services/api.service';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { APP_CONSTANTS } from '@/constants';

export default function CreateEventPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [category, setCategory] = useState<string>(APP_CONSTANTS.DEFAULT_CATEGORY);
  const [eventDate, setEventDate] = useState<string>('');
  const [maxCapacity, setMaxCapacity] = useState<number>(APP_CONSTANTS.DEFAULT_CAPACITY);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-12 glass-panel p-8 rounded-3xl text-center">
        <h2 className="text-xl font-bold text-white mb-2">Authentication Required</h2>
        <p className="text-sm text-gray-400 mb-6">Please log in to host a local meetup event.</p>
        <Link
          href="/login"
          className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs shadow-lg"
        >
          Login
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const res = await apiFetch<{ id: number }>(APP_CONSTANTS.ROUTES.EVENTS.CREATE, {
      method: APP_CONSTANTS.HTTP.POST,
      body: JSON.stringify({
        title,
        description,
        location,
        category,
        event_date: new Date(eventDate).toISOString(),
        max_capacity: Number(maxCapacity),
      }),
    });

    setLoading(false);

    if (res.success && res.data) {
      router.push(APP_CONSTANTS.ROUTES.EVENTS.BY_ID(res.data.id));
    } else {
      setErrorMsg(res.message || APP_CONSTANTS.MESSAGES.ERRORS.CREATE_EVENT_FAILED);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-6">
      <Link
        href="/"
        className={
          "inline-flex items-center gap-2 text-xs font-semibold " +
          "text-gray-400 hover:text-white mb-6 transition-colors"
        }
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Events</span>
      </Link>

      <div className="glass-panel p-8 rounded-3xl space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Create Local Meetup Event</h2>
          <p className="text-xs text-gray-400 mt-1">
            {APP_CONSTANTS.MESSAGES.DESCRIPTIONS.CREATE_EVENT_SUBTITLE}
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">Event Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={APP_CONSTANTS.MESSAGES.PLACEHOLDERS.EVENT_TITLE}
              className={
                'w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 ' +
                'text-white placeholder-gray-500 text-sm focus:outline-none ' +
                'focus:border-brand-500 transition-colors'
              }
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={
                  'w-full px-4 py-2.5 rounded-xl bg-[#111827] border border-white/10 ' +
                  'text-white text-sm focus:outline-none focus:border-brand-500'
                }
              >
                <option value="Tech">Tech</option>
                <option value="Workshop">Workshop</option>
                <option value="Networking">Networking</option>
                <option value="Social">Social</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Max Capacity</label>
              <input
                type="number"
                min="1"
                required
                value={maxCapacity}
                onChange={(e) => setMaxCapacity(parseInt(e.target.value, 10))}
                className={
                  'w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 ' +
                  'text-white text-sm focus:outline-none focus:border-brand-500'
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Location</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={APP_CONSTANTS.MESSAGES.PLACEHOLDERS.EVENT_LOCATION}
                className={
                  'w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 ' +
                  'text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-500'
                }
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Date & Time</label>
              <input
                type="datetime-local"
                required
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className={
                  'w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 ' +
                  'text-white text-sm focus:outline-none focus:border-brand-500'
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">Description</label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={APP_CONSTANTS.MESSAGES.PLACEHOLDERS.EVENT_DESCRIPTION}
              className={
                'w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 ' +
                'text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-500 resize-none'
              }
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={
              'w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm ' +
              'font-semibold shadow-lg shadow-brand-600/30 transition-all hover:scale-[1.01]'
            }
          >
            {loading ? 'Creating Meetup...' : 'Publish Meetup Event'}
          </button>
        </form>
      </div>
    </div>
  );
}
