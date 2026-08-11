'use client';

/**
 * Meetup Event Editing Page.
 * Responsible for fetching existing event details, displaying edit forms, and saving modifications.
 */
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { apiFetch } from '@/services/api.service';
import { IEvent } from '@/types';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { APP_CONSTANTS } from '@/constants';

export default function EditEventPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;


  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [category, setCategory] = useState<string>(APP_CONSTANTS.DEFAULT_CATEGORY);
  const [eventDate, setEventDate] = useState<string>('');
  const [maxCapacity, setMaxCapacity] = useState<number>(APP_CONSTANTS.DEFAULT_CAPACITY);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function loadEvent() {
      const res = await apiFetch<IEvent>(APP_CONSTANTS.ROUTES.EVENTS.BY_ID(id));
      if (res.success && res.data) {
        const ev = res.data;
        setTitle(ev.title);
        setDescription(ev.description);
        setLocation(ev.location);
        setCategory(ev.category);
        setMaxCapacity(ev.max_capacity);
        if (ev.event_date) {
          const dateObj = new Date(ev.event_date);
          const isoStr = new Date(dateObj.getTime() - dateObj.getTimezoneOffset() * 60000)
            .toISOString()
            .slice(0, 16);
          setEventDate(isoStr);
        }
      }
      setLoading(false);
    }
    if (id) loadEvent();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg(null);

    const res = await apiFetch<IEvent>(APP_CONSTANTS.ROUTES.EVENTS.BY_ID(id), {
      method: APP_CONSTANTS.HTTP.PUT,
      body: JSON.stringify({
        title,
        description,
        location,
        category,
        event_date: new Date(eventDate).toISOString(),
        max_capacity: Number(maxCapacity),
      }),
    });

    setSaving(false);

    if (res.success) {
      router.push(APP_CONSTANTS.ROUTES.EVENTS.BY_ID(id));
    } else {
      setErrorMsg(res.message || APP_CONSTANTS.MESSAGES.ERRORS.UPDATE_EVENT_FAILED);
    }
  };

  if (loading) {
    return <div className="max-w-2xl mx-auto py-12 glass-panel h-96 rounded-3xl animate-pulse" />;
  }

  return (
    <div className="max-w-2xl mx-auto py-6">
      <Link
        href={APP_CONSTANTS.ROUTES.EVENTS.BY_ID(id)}
        className={
          'inline-flex items-center gap-2 text-xs font-semibold text-gray-400 ' +
          'hover:text-white mb-6 transition-colors'
        }
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Cancel & Return to Event</span>
      </Link>

      <div className="glass-panel p-8 rounded-3xl space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Edit Event Details</h2>
          <p className="text-xs text-gray-400 mt-1">{APP_CONSTANTS.MESSAGES.DESCRIPTIONS.EDIT_EVENT_SUBTITLE}</p>
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
              className={
                'w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 ' +
                'text-white text-sm focus:outline-none focus:border-brand-500'
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
                className={
                  'w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 ' +
                  'text-white text-sm focus:outline-none focus:border-brand-500'
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
              className={
                'w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 ' +
                'text-white text-sm focus:outline-none focus:border-brand-500 resize-none'
              }
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className={
              'w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm ' +
              'font-semibold shadow-lg shadow-brand-600/30 transition-all hover:scale-[1.01]'
            }
          >
            {saving ? 'Saving Changes...' : 'Save & Update Event'}
          </button>
        </form>
      </div>
    </div>
  );
}
