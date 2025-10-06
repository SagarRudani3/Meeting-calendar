# Katalyst Calendar Viewer - Features Documentation

## 🔐 Google OAuth 2.0 Integration

### Authentication Flow

The app implements a complete OAuth 2.0 flow for Google authentication:

1. **Login Screen**: Users see a "Sign in with Google" button with official Google branding
2. **OAuth Redirect**: Clicking initiates OAuth flow (or simulates it in demo mode)
3. **Token Exchange**: Authorization code is exchanged for access token
4. **User Profile**: User info (name, email, picture) is fetched and displayed
5. **Token Storage**: Tokens are securely stored in localStorage
6. **Auto-Refresh**: Expired tokens are automatically refreshed

### Demo Mode vs Production

**Demo Mode** (Default - `VITE_USE_MOCK_AUTH=true`):
- No Google credentials required
- Simulates entire OAuth flow
- Returns mock user data and tokens
- Perfect for development and testing
- Logs OAuth actions to console

**Production Mode** (`VITE_USE_MOCK_AUTH=false`):
- Uses real Google OAuth
- Requires Google Cloud Project setup
- Fetches real calendar data
- Handles real access/refresh tokens
- Production-ready security

## 📡 MCP (Model Context Protocol) Integration

### Architecture

The app supports three data fetching modes:

1. **Mock MCP** (Demo Mode):
   - Returns simulated meeting data
   - No backend required
   - Logs mock API calls with OAuth tokens
   - Realistic delay simulation (1.5s)

2. **Custom MCP Server**:
   - Set `VITE_MCP_API_ENDPOINT` to your MCP server
   - Sends OAuth token in Authorization header
   - Expects standardized meeting data format
   - Production-ready integration

3. **Direct Google Calendar API**:
   - Function: `fetchMeetingsFromGoogleCalendar()`
   - Uses OAuth token directly with Google API
   - Transforms Google Calendar events to Meeting format
   - Adds AI summaries to past meetings

### Data Flow

```
User Login → OAuth Token → MCP Request → Meeting Data → Dashboard Display
```

**With Token**:
```typescript
Authorization: Bearer <access_token>
GET /calendar/events
```

**Response Format**:
```typescript
{
  success: true,
  data: Meeting[]
}
```

## 📅 React Big Calendar Implementation

### Features

- **Multiple Views**: Month, Week, Day, Agenda
- **Custom Styling**: Gradient events, custom colors
- **Event Differentiation**: Visual distinction between past/upcoming
- **Interactive**: Click events for details, select time slots
- **Responsive**: Mobile-optimized toolbar and layout
- **Tooltips**: Hover for quick meeting info
- **Legend**: Color-coded event status

### Customizations

1. **Event Styling**:
   - Past meetings: Gray gradient, 65% opacity
   - Upcoming meetings: Blue gradient, full opacity
   - Hover effects with transform animations
   - Shadow effects

2. **Calendar UI**:
   - Custom toolbar buttons
   - Gradient headers
   - Today highlighting
   - Rounded corners
   - Custom fonts and spacing

3. **Formats**:
   - Custom date/time display formats
   - Internationalized messages
   - 30-minute time slots
   - Multi-day event support

## 🤖 AI Meeting Summaries

### Implementation

**Current**: Mock AI summaries
- Randomly selected from templates
- Applied to all past meetings
- Demonstrates AI integration capability

**Future**: Real AI Integration
The architecture supports easy integration with:
- OpenAI GPT models
- Anthropic Claude
- Google Gemini
- Custom AI endpoints

**Integration Points**:
```typescript
// src/services/mockMCP.ts
const generateMockAISummary = (meeting: Meeting): string => {
  // Replace with real AI API call
  // return await callAIService(meeting);
}
```

## 👤 User Management

### User Profile Display

- **Avatar**: Profile picture from Google account
- **Name**: Full name display
- **Email**: User's Google email
- **Session**: Persists across browser refreshes
- **Logout**: Clears all auth data

### Token Management

- **Storage**: localStorage (consider more secure options for production)
- **Expiry Checking**: Automatic expiration validation
- **Refresh**: Support for refresh token flow
- **Security**: State parameter prevents CSRF attacks

## 🎨 UI/UX Features

### Design System

- **Color Palette**: Blue/Indigo gradients with accent colors
- **Typography**: Inter font family, clear hierarchy
- **Spacing**: Consistent 4px/8px grid
- **Shadows**: Layered shadow system
- **Animations**: Smooth transitions and transforms

### Components

1. **Login Screen**:
   - Centered card layout
   - Google OAuth button
   - Demo mode notice
   - Feature list
   - Animated loading states

2. **Dashboard**:
   - Sticky header with user profile
   - Statistics cards
   - Tab navigation
   - Filterable meeting views
   - Modal for event details

3. **Calendar View**:
   - Full-height calendar
   - Responsive controls
   - Legend for event types
   - Interactive event selection

4. **Meeting Cards**:
   - Title and description
   - Date/time/duration
   - Attendee list with status badges
   - Location display
   - AI summary (past meetings)

### Responsive Design

- **Mobile**: Single-column layout, stacked components
- **Tablet**: Two-column grid for meeting cards
- **Desktop**: Full multi-column layout
- **Breakpoints**: Tailwind's responsive utilities

## 🔧 Technical Implementation

### State Management

- React hooks (useState, useEffect, useCallback, useMemo)
- No external state library needed
- Prop drilling for auth context
- Local component state for UI

### Type Safety

- Full TypeScript coverage
- Strict type checking
- Interface definitions for all data structures
- Type-safe API responses

### Performance Optimizations

- **Memoization**: useCallback and useMemo
- **Code Splitting**: Dynamic imports ready
- **Lazy Loading**: Component-level optimization
- **Build Optimization**: Vite's automatic optimizations

### Error Handling

- **Loading States**: Animated spinners
- **Error States**: User-friendly error messages
- **Retry Functionality**: Easy error recovery
- **Fallbacks**: Graceful degradation

## 🚀 Production Features

### Deployment Ready

- Environment variable configuration
- Build optimization
- Vercel-optimized setup
- Static file caching

### Security

- OAuth 2.0 best practices
- CSRF protection (state parameter)
- Token expiry validation
- Secure token storage
- No sensitive data in frontend code

### Monitoring

- Console logging for OAuth flow (demo mode)
- API call tracking
- Error logging
- Token refresh tracking

## 📊 Data Structures

### Meeting Interface
```typescript
interface Meeting {
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
```

### OAuth Token
```typescript
interface OAuthToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  refresh_token?: string;
  id_token?: string;
}
```

### User Profile
```typescript
interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
}
```

## 🔄 Future Enhancements

Potential additions:
- [ ] Real-time calendar sync
- [ ] Meeting creation/editing
- [ ] Calendar sharing
- [ ] Advanced AI features
- [ ] Export meetings
- [ ] Search and filtering
- [ ] Calendar integrations (Outlook, etc.)
- [ ] Mobile native apps
- [ ] Desktop notifications
- [ ] Calendar insights and analytics
