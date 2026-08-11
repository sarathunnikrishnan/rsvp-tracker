'use client';

/**
 * Meetup Events Home Feed Page.
 * Responsible for displaying hero banner, category filters, and rendering event card grids.
 */
import React, { useEffect, useState } from 'react';
import { IEvent } from '@/types';
import { apiFetch } from '@/services/api.service';
import { EventCard } from '@/components/events/EventCard';
import { EventFilter } from '@/components/events/EventFilter';
import { Sparkles, Calendar, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { APP_CONSTANTS, getAppConstants, getConstantValues } from '@/constants';

export default function HomePage() {
  const constants = getAppConstants();
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  const fetchEvents = async () => {
    setLoading(true);
    const query = new URLSearchParams();
    if (category) query.set(constants.QUERY.CATEGORY, category);
    if (search) query.set(constants.QUERY.SEARCH, search);

    const res = await apiFetch<IEvent[]>(constants.ROUTES.EVENTS.LIST(query.toString()));
    if (res.success && res.data) {
      setEvents(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEvents();
    }, 300);
    return () => clearTimeout(timer);
  }, [search, category]);

  const categories = Array.from(new Set(events.map((e) => e.category))).filter(Boolean);

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="relative glass-panel rounded-3xl p-8 sm:p-12 overflow-hidden border border-brand-500/20">
        <div
          className="absolute -top-24 -right-24 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl pointer-events-none"
        />
        <div className="relative z-10 max-w-2xl">
          <div
            className={
              'inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 ' +
              'border border-brand-500/30 text-brand-300 text-xs font-semibold mb-4'
            }
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dexqbit Full Stack Engineering Challenge</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Discover & Host{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-400 to-indigo-300">
              Local Tech Meetups
            </span>
          </h1>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
            Track RSVPs, manage community events, and connect with developers in real time.
          </p>
          <Link
            href="/events/create"
            className={
              'inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-600 ' +
              'hover:bg-brand-500 text-white font-semibold text-sm shadow-xl shadow-brand-600/30 ' +
              'transition-all hover:scale-[1.02]'
            }
          >
            <PlusCircle className="w-5 h-5" />
            <span>Host New Meetup</span>
          </Link>
        </div>
      </div>

      {/* Filter Component */}
      <EventFilter
        search={search}
        category={category}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        categories={[...getConstantValues(constants.CATEGORIES), ...categories].filter(
          (v, i, a) => a.indexOf(v) === i
        )}
      />

      {/* Event Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-panel h-64 rounded-2xl animate-pulse p-6" />
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="glass-panel rounded-3xl p-12 text-center max-w-md mx-auto">
          <Calendar className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">No Meetups Found</h3>
          <p className="text-sm text-gray-400 mb-6">
            Try adjusting your search filters or create the first event for this topic.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setCategory('');
            }}
            className={
              'px-4 py-2 rounded-xl bg-white/10 text-white text-xs ' +
              'font-semibold hover:bg-white/20 transition-colors'
            }
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
