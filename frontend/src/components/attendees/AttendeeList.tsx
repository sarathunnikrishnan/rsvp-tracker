'use client';

/**
 * Attendee List UI Component.
 * Responsible for rendering attendee grids with RSVP status indicators and user avatars.
 */
import React from 'react';
import { IAttendee } from '@/types';
import { Users, CheckCircle2, HelpCircle, XCircle } from 'lucide-react';
import { APP_CONSTANTS } from '@/constants';

interface AttendeeListProps {
  attendees: IAttendee[];
}

export const AttendeeList: React.FC<AttendeeListProps> = ({ attendees }) => {
  const going = attendees.filter((a) => a.status === APP_CONSTANTS.RSVP.GOING);
  const maybe = attendees.filter((a) => a.status === APP_CONSTANTS.RSVP.MAYBE);
  const declined = attendees.filter((a) => a.status === APP_CONSTANTS.RSVP.DECLINED);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case APP_CONSTANTS.RSVP.GOING:
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />;
      case APP_CONSTANTS.RSVP.MAYBE:
        return <HelpCircle className="w-3.5 h-3.5 text-amber-400" />;
      case APP_CONSTANTS.RSVP.DECLINED:
        return <XCircle className="w-3.5 h-3.5 text-rose-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="glass-panel p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-brand-400" />
          Attendees ({attendees.length})
        </h3>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-emerald-400">{going.length} Going</span>
          <span className="text-amber-400">{maybe.length} Maybe</span>
          <span className="text-rose-400">{declined.length} Declined</span>
        </div>
      </div>

      {attendees.length === 0 ? (
        <p className="text-sm text-gray-400 italic text-center py-4">No RSVPs yet. Be the first to RSVP!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {attendees.map((attendee) => (
            <div
              key={attendee.rsvp_id}
              className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10"
            >
              <div className="flex items-center gap-3">
                <img
                  src={APP_CONSTANTS.AVATAR.getUrl(attendee.user.name, attendee.user.avatar_url)}
                  alt={attendee.user.name}
                  className="w-9 h-9 rounded-full bg-gray-800"
                />
                <div>
                  <p className="text-sm font-semibold text-white leading-tight">{attendee.user.name}</p>
                  <p className="text-[10px] text-gray-400">{attendee.user.email}</p>
                </div>
              </div>

              <div
                className={
                  "flex items-center gap-1.5 px-2.5 py-1 rounded-full " +
                  "text-xs font-medium bg-black/30 border border-white/10 capitalize"
                }
              >
                {getStatusIcon(attendee.status)}
                <span className="text-gray-300">{attendee.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
