export interface Attendee {
  name: string;
  email: string;
  status: 'accepted' | 'declined' | 'pending';
}

export interface Meeting {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  attendees: Attendee[];
  location?: string;
  isPast: boolean;
  aiSummary?: string;
}

export interface MCPResponse {
  success: boolean;
  data?: Meeting[];
  error?: string;
}
