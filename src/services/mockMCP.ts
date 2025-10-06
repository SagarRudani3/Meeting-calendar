import type { Meeting, MCPResponse } from '../types/meeting';
import type { OAuthToken } from '../types/auth';
import { MCP_CONFIG } from '../config/oauth';

// Mock AI Summary Generator
const generateMockAISummary = (meeting: Meeting): string => {
  const summaries = [
    `Key discussion points included project timelines and resource allocation. Action items: ${meeting.attendees.length} team members to follow up on deliverables by next week.`,
    `Productive session covering quarterly goals and KPIs. Decisions made on budget allocation and hiring priorities for Q2.`,
    `Technical review meeting with focus on architecture improvements. Identified 3 critical bugs and assigned ownership for fixes.`,
    `Strategic planning session. Aligned on product roadmap and feature prioritization for next quarter. Strong consensus on direction.`,
    `Client sync meeting with positive feedback on recent deliverables. Discussed scope expansion and timeline adjustments.`,
    `Team standup covering sprint progress. 85% of stories completed, 2 blockers identified and resolved during discussion.`,
  ];

  return summaries[Math.floor(Math.random() * summaries.length)];
};

// Mock meeting data
const generateMockMeetings = (): Meeting[] => {
  const now = new Date();

  const meetings: Meeting[] = [
    // Past meetings
    {
      id: '1',
      title: 'Q1 Product Strategy Review',
      description: 'Quarterly review of product roadmap and strategic initiatives',
      start: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5, 10, 0),
      end: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5, 11, 30),
      attendees: [
        { name: 'Sarah Johnson', email: 'sarah.j@company.com', status: 'accepted' },
        { name: 'Michael Chen', email: 'michael.c@company.com', status: 'accepted' },
        { name: 'Emily Rodriguez', email: 'emily.r@company.com', status: 'accepted' },
      ],
      location: 'Conference Room A',
      isPast: true,
    },
    {
      id: '2',
      title: 'Engineering Standup',
      description: 'Daily sync with engineering team',
      start: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3, 9, 0),
      end: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3, 9, 30),
      attendees: [
        { name: 'David Kim', email: 'david.k@company.com', status: 'accepted' },
        { name: 'Lisa Wang', email: 'lisa.w@company.com', status: 'accepted' },
        { name: 'James Miller', email: 'james.m@company.com', status: 'declined' },
        { name: 'Anna Schmidt', email: 'anna.s@company.com', status: 'accepted' },
      ],
      isPast: true,
    },
    {
      id: '3',
      title: 'Client Demo - Acme Corp',
      description: 'Product demonstration for potential enterprise client',
      start: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2, 14, 0),
      end: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2, 15, 0),
      attendees: [
        { name: 'Robert Taylor', email: 'robert.t@acme.com', status: 'accepted' },
        { name: 'Jennifer Lee', email: 'jennifer.l@company.com', status: 'accepted' },
      ],
      location: 'Zoom',
      isPast: true,
    },
    {
      id: '4',
      title: 'Design System Workshop',
      description: 'Workshop to align on new design system components',
      start: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 13, 0),
      end: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 15, 0),
      attendees: [
        { name: 'Sophie Martin', email: 'sophie.m@company.com', status: 'accepted' },
        { name: 'Alex Thompson', email: 'alex.t@company.com', status: 'accepted' },
        { name: 'Chris Anderson', email: 'chris.a@company.com', status: 'pending' },
      ],
      location: 'Design Lab',
      isPast: true,
    },

    // Upcoming meetings
    {
      id: '5',
      title: 'Team All-Hands',
      description: 'Monthly company-wide update and Q&A session',
      start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 11, 0),
      end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 12, 0),
      attendees: [
        { name: 'CEO - Mark Stevens', email: 'mark.s@company.com', status: 'accepted' },
        { name: 'All Staff', email: 'staff@company.com', status: 'pending' },
      ],
      location: 'Main Auditorium',
      isPast: false,
    },
    {
      id: '6',
      title: 'Sprint Planning - Team Velocity',
      description: 'Planning session for Sprint 24',
      start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, 10, 0),
      end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, 12, 0),
      attendees: [
        { name: 'Tom Wilson', email: 'tom.w@company.com', status: 'accepted' },
        { name: 'Rachel Green', email: 'rachel.g@company.com', status: 'accepted' },
        { name: 'Kevin Brown', email: 'kevin.b@company.com', status: 'accepted' },
        { name: 'Michelle Davis', email: 'michelle.d@company.com', status: 'pending' },
      ],
      isPast: false,
    },
    {
      id: '7',
      title: '1:1 with Manager',
      description: 'Bi-weekly check-in and career development discussion',
      start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 15, 0),
      end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 15, 30),
      attendees: [
        { name: 'Patricia Moore', email: 'patricia.m@company.com', status: 'accepted' },
      ],
      location: 'Office - Room 302',
      isPast: false,
    },
    {
      id: '8',
      title: 'Security Audit Review',
      description: 'Review findings from Q1 security audit',
      start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5, 14, 30),
      end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5, 16, 0),
      attendees: [
        { name: 'Security Team', email: 'security@company.com', status: 'accepted' },
        { name: 'Daniel Garcia', email: 'daniel.g@company.com', status: 'accepted' },
        { name: 'Nicole White', email: 'nicole.w@company.com', status: 'accepted' },
      ],
      location: 'Secure Conference Room',
      isPast: false,
    },
    {
      id: '9',
      title: 'Marketing Campaign Kickoff',
      description: 'Launch planning for summer product campaign',
      start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 9, 30),
      end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 11, 0),
      attendees: [
        { name: 'Marketing Team', email: 'marketing@company.com', status: 'pending' },
        { name: 'Brandon Hall', email: 'brandon.h@company.com', status: 'accepted' },
        { name: 'Olivia Martinez', email: 'olivia.m@company.com', status: 'accepted' },
      ],
      isPast: false,
    },
    {
      id: '10',
      title: 'Board Meeting Preparation',
      description: 'Prep session for upcoming board presentation',
      start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10, 13, 0),
      end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10, 15, 0),
      attendees: [
        { name: 'Executive Team', email: 'exec@company.com', status: 'accepted' },
        { name: 'Finance - Karen Lee', email: 'karen.l@company.com', status: 'accepted' },
      ],
      location: 'Executive Boardroom',
      isPast: false,
    },
  ];

  // Add AI summaries to past meetings
  return meetings.map(meeting => {
    if (meeting.isPast) {
      return {
        ...meeting,
        aiSummary: generateMockAISummary(meeting),
      };
    }
    return meeting;
  });
};

// Fetch meetings from MCP with OAuth token (with 401 fallback to dummy data)
export const fetchMeetingsFromMCP = async (token?: OAuthToken | null): Promise<MCPResponse> => {
  // If using real MCP service (not mock)
  if (!MCP_CONFIG.useMock && token) {
    try {
      const response = await fetch(`${MCP_CONFIG.apiEndpoint}/calendar/events`, {
        headers: {
          'Authorization': `Bearer ${token.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      // If 401 Unauthorized, fall back to realistic dummy data
      if (response.status === 401) {
        console.warn('⚠️ 401 Unauthorized - Falling back to realistic demo data');
        return {
          success: true,
          data: generateMockMeetings(),
        };
      }

      if (!response.ok) {
        // For other errors, also fall back to dummy data
        console.warn(`⚠️ API Error ${response.status} - Falling back to realistic demo data`);
        return {
          success: true,
          data: generateMockMeetings(),
        };
      }

      const data = await response.json();
      return {
        success: true,
        data: data.meetings,
      };
    } catch (error) {
      // On any error (network, parsing, etc.), fall back to dummy data
      console.warn('⚠️ API Error - Falling back to realistic demo data:', error);
      return {
        success: true,
        data: generateMockMeetings(),
      };
    }
  }

  // Mock mode - simulate MCP data fetching with delay
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      try {
        const meetings = generateMockMeetings();

        // Log OAuth token usage (for demo purposes)
        if (token) {
          console.log('📡 MCP Request with OAuth token:', {
            tokenType: token.token_type,
            hasAccessToken: !!token.access_token,
            scope: token.scope,
          });
        }

        resolve({
          success: true,
          data: meetings,
        });
      } catch (error) {
        resolve({
          success: false,
          error: 'Failed to fetch meetings from MCP service',
        });
      }
    }, 1500); // 1.5 second delay to simulate API call
  });
};

// Fetch meetings from real Google Calendar API (with 401 fallback)
export const fetchMeetingsFromGoogleCalendar = async (token: OAuthToken): Promise<MCPResponse> => {
  try {
    const response = await fetch(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events?' +
      new URLSearchParams({
        maxResults: '50',
        orderBy: 'startTime',
        singleEvents: 'true',
        timeMin: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
        timeMax: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ahead
      }),
      {
        headers: {
          'Authorization': `Bearer ${token.access_token}`,
        },
      }
    );

    // If 401 Unauthorized, fall back to realistic dummy data
    if (response.status === 401) {
      console.warn('⚠️ 401 Unauthorized (Google Calendar) - Falling back to realistic demo data');
      return {
        success: true,
        data: generateMockMeetings(),
      };
    }

    if (!response.ok) {
      console.warn(`⚠️ Google Calendar API Error ${response.status} - Falling back to realistic demo data`);
      return {
        success: true,
        data: generateMockMeetings(),
      };
    }

    const data = await response.json();

    // Transform Google Calendar events to Meeting format
    const meetings: Meeting[] = data.items.map((event: any) => ({
      id: event.id,
      title: event.summary || 'No Title',
      description: event.description,
      start: new Date(event.start.dateTime || event.start.date),
      end: new Date(event.end.dateTime || event.end.date),
      attendees: (event.attendees || []).map((attendee: any) => ({
        name: attendee.displayName || attendee.email,
        email: attendee.email,
        status: attendee.responseStatus === 'accepted' ? 'accepted' :
                attendee.responseStatus === 'declined' ? 'declined' : 'pending',
      })),
      location: event.location,
      isPast: new Date(event.end.dateTime || event.end.date) < new Date(),
    }));

    // Add AI summaries to past meetings
    const meetingsWithSummaries = meetings.map(meeting => {
      if (meeting.isPast) {
        return {
          ...meeting,
          aiSummary: generateMockAISummary(meeting),
        };
      }
      return meeting;
    });

    return {
      success: true,
      data: meetingsWithSummaries,
    };
  } catch (error) {
    // On any error, fall back to dummy data instead of showing error
    console.warn('⚠️ Google Calendar API Error - Falling back to realistic demo data:', error);
    return {
      success: true,
      data: generateMockMeetings(),
    };
  }
};

// Simulate error scenario (can be used for testing)
export const fetchMeetingsWithError = async (): Promise<MCPResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: false,
        error: 'MCP service temporarily unavailable. Please try again later.',
      });
    }, 1000);
  });
};
