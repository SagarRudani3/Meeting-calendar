import type { Meeting } from '../types/meeting';
import { format } from 'date-fns';

interface MeetingCardProps {
  meeting: Meeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const duration = Math.round((meeting.end.getTime() - meeting.start.getTime()) / (1000 * 60));
  const acceptedAttendees = meeting.attendees.filter(a => a.status === 'accepted').length;
  const totalAttendees = meeting.attendees.length;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{meeting.title}</h3>
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{format(meeting.start, 'MMM d, yyyy • h:mm a')}</span>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          meeting.isPast
            ? 'bg-gray-100 text-gray-700'
            : 'bg-green-100 text-green-700'
        }`}>
          {meeting.isPast ? 'Past' : 'Upcoming'}
        </div>
      </div>

      {/* Time Details */}
      <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
        <div>
          <p className="text-xs text-gray-500 mb-1">Duration</p>
          <p className="text-sm font-medium text-gray-900">{duration} minutes</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Time</p>
          <p className="text-sm font-medium text-gray-900">
            {format(meeting.start, 'h:mm a')} - {format(meeting.end, 'h:mm a')}
          </p>
        </div>
      </div>

      {/* Location */}
      {meeting.location && (
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>{meeting.location}</span>
        </div>
      )}

      {/* Description */}
      {meeting.description && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{meeting.description}</p>
      )}

      {/* Attendees */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-medium text-gray-700">
            Attendees ({acceptedAttendees}/{totalAttendees} accepted)
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {meeting.attendees.slice(0, 3).map((attendee, index) => (
            <div
              key={index}
              className={`flex items-center px-3 py-1 rounded-full text-xs ${
                attendee.status === 'accepted'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : attendee.status === 'declined'
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-gray-50 text-gray-700 border border-gray-200'
              }`}
            >
              <div className="w-2 h-2 rounded-full mr-2 bg-current"></div>
              <span>{attendee.name}</span>
            </div>
          ))}
          {meeting.attendees.length > 3 && (
            <div className="flex items-center px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-600 border border-gray-200">
              +{meeting.attendees.length - 3} more
            </div>
          )}
        </div>
      </div>

      {/* AI Summary for Past Meetings */}
      {meeting.isPast && meeting.aiSummary && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-2">
              <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-md flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-purple-700 mb-1">AI Summary</p>
              <p className="text-sm text-gray-700 leading-relaxed">{meeting.aiSummary}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
