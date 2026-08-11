'use client';

/**
 * Event Detail View Page.
 * Responsible for rendering single event information, RSVP management buttons, and attendee lists.
 */
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { IEvent, IAttendee } from '@/types';
import { apiFetch } from '@/services/api.service';
import { useAuth } from '@/context/AuthContext';
import { RsvpButton } from '@/components/events/RsvpButton';
import { AttendeeList } from '@/components/attendees/AttendeeList';
import { Calendar, MapPin, Tag, Users, ArrowLeft, Edit3, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { APP_CONSTANTS } from '@/constants';

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { user } = useAuth();

  const [event, setEvent] = useState<IEvent | null>(null);
  const [attendees, setAttendees] = useState<IAttendee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleting, setDeleting] = useState<boolean>(false);

  const fetchEventData = async (isInitial = false) => {
    if (isInitial) {
      setLoading(true);
    }
    const [eventRes, attendeesRes] = await Promise.all([
      apiFetch<IEvent>(APP_CONSTANTS.ROUTES.EVENTS.BY_ID(id)),
      apiFetch<IAttendee[]>(APP_CONSTANTS.ROUTES.RSVPS.ATTENDEES(id)),
    ]);

    if (eventRes.success && eventRes.data) {
      setEvent(eventRes.data);
    }
    if (attendeesRes.success && attendeesRes.data) {
      setAttendees(attendeesRes.data);
    }
    if (isInitial) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchEventData(true);
    }
  }, [id, user]);

  const handleDelete = async () => {
    if (!confirm(APP_CONSTANTS.MESSAGES.CONFIRMATIONS.DELETE_EVENT)) {
      return;
    }
    setDeleting(true);
    const res = await apiFetch(APP_CONSTANTS.ROUTES.EVENTS.BY_ID(id), {
      method: APP_CONSTANTS.HTTP.DELETE,
    });
    setDeleting(false);

    if (res.success) {
      router.push('/');
    } else {
      alert(res.message || APP_CONSTANTS.MESSAGES.ERRORS.DELETE_EVENT_FAILED);
    }
  };

  if (loading) {
    return <div className="glass-panel h-96 rounded-3xl animate-pulse" />;
  }

  if (!event) {
    return (
      <div className="glass-panel p-12 rounded-3xl text-center max-w-md mx-auto">
        <h3 className="text-lg font-bold text-white mb-2">Event Not Found</h3>
        <Link href="/" className="text-xs text-brand-400 hover:underline">
          Return to Home Feed
        </Link>
      </div>
    );
  }

  const isCreator = user && user.id === event.created_by;
  const dateStr = new Date(event.event_date).toLocaleString(
    APP_CONSTANTS.DATE.LOCALE,
    APP_CONSTANTS.DATE.FULL_OPTIONS
  );

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Events Feed</span>
      </Link>

      {/* Main Detail Header */}
      <div className="glass-panel p-8 rounded-3xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span
            className={
              'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs ' +
              'font-semibold bg-brand-500/20 text-brand-300 border border-brand-500/30'
            }
          >
            <Tag className="w-3.5 h-3.5" />
            {event.category}
          </span>

          {/* Owner Action Controls */}
          {isCreator && (
            <div className="flex items-center gap-2">
              <Link
                href={`/events/${id}/edit`}
                className={
                  'flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 ' +
                  'hover:bg-white/20 text-xs font-medium text-white transition-colors'
                }
              >
                <Edit3 className="w-3.5 h-3.5 text-brand-400" />
                <span>Edit Event</span>
              </Link>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className={
                  'flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-500/10 ' +
                  'hover:bg-rose-500/20 border border-rose-500/30 text-xs font-medium text-rose-400 transition-colors'
                }
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{deleting ? 'Deleting...' : 'Delete'}</span>
              </button>
            </div>
          )}
        </div>

        <h1 className="text-3xl font-extrabold text-white">{event.title}</h1>

        <div
          className={
            'grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-300 ' +
            'pt-4 border-t border-white/10'
          }
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-brand-400 shrink-0" />
            <span>{dateStr}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{event.location}</span>
          </div>
        </div>

        {/* Creator Attribution */}
        {event.creator && (
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 w-fit">
            <img
              src={APP_CONSTANTS.AVATAR.getUrl(event.creator.name, event.creator.avatar_url)}
              alt={event.creator.name}
              className="w-8 h-8 rounded-full bg-gray-800"
            />
            <div>
              <p className="text-xs font-semibold text-white">Hosted by {event.creator.name}</p>
              <p className="text-[10px] text-gray-400">{event.creator.email}</p>
            </div>
          </div>
        )}

        <div>
          <h3 className="text-sm font-bold text-white mb-2">About this Meetup</h3>
          <p className="text-sm text-gray-300 whitespace-pre-line leading-relaxed">
            {event.description}
          </p>
        </div>
      </div>

      {/* RSVP Controls & Attendee List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <RsvpButton
            eventId={event.id}
            currentStatus={event.user_rsvp_status || null}
            onRsvpChange={() => fetchEventData(false)}
          />
        </div>

        <div className="lg:col-span-2">
          <AttendeeList attendees={attendees} />
        </div>
      </div>
    </div>
  );
}
