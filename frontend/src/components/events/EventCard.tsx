'use client';

/**
 * Event Card UI Component.
 * Responsible for displaying individual meetup cards with category tags, date, capacity bar, and host avatar.
 */
import React from 'react';
import Link from 'next/link';
import { IEvent } from '@/types';
import { MapPin, Calendar, Users, Tag, ChevronRight } from 'lucide-react';
import { APP_CONSTANTS } from '@/constants';

interface EventCardProps {
  event: IEvent;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const dateStr = new Date(event.event_date).toLocaleDateString(
    APP_CONSTANTS.DATE.LOCALE,
    APP_CONSTANTS.DATE.CARD_OPTIONS
  );

  const goingCount = event.rsvp_summary?.going || 0;
  const capacityPercent = Math.min(Math.round((goingCount / event.max_capacity) * 100), 100);

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between h-full group">
      <div>
        {/* Category & Date Header */}
        <div className="flex items-center justify-between mb-4">
          <span
            className={
              "inline-flex items-center gap-1 px-3 py-1 rounded-full " +
              "text-xs font-semibold bg-brand-500/20 text-brand-300 border border-brand-500/30"
            }
          >
            <Tag className="w-3 h-3" />
            {event.category}
          </span>
          <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            {dateStr}
          </span>
        </div>

        {/* Title & Description */}
        <Link href={`/events/${event.id}`}>
          <h3
            className="text-xl font-bold text-white group-hover:text-brand-400 transition-colors line-clamp-1 mb-2"
          >
            {event.title}
          </h3>
        </Link>

        <p className="text-sm text-gray-300 line-clamp-2 mb-4">
          {event.description}
        </p>
      </div>

      <div>
        {/* Location */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
          <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
          <span className="truncate">{event.location}</span>
        </div>

        {/* Capacity Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs font-medium mb-1">
            <span className="text-gray-400 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              {goingCount} / {event.max_capacity} Attending
            </span>
            <span className="text-emerald-400">{capacityPercent}% full</span>
          </div>
          <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
              style={{ width: `${capacityPercent}%` }}
            />
          </div>
        </div>

        {/* Creator & CTA */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          {event.creator && (
            <div className="flex items-center gap-2">
              <img
                src={APP_CONSTANTS.AVATAR.getUrl(event.creator.name, event.creator.avatar_url)}
                alt={event.creator.name}
                className="w-6 h-6 rounded-full bg-gray-800"
              />
              <span className="text-xs text-gray-400">By {event.creator.name.split(' ')[0]}</span>
            </div>
          )}

          <Link
            href={`/events/${event.id}`}
            className={
              "flex items-center gap-1 text-xs font-semibold " +
              "text-brand-400 hover:text-brand-300 transition-colors"
            }
          >
            <span>View Details</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
