# Katalyst Calendar Viewer

An AI-powered meeting dashboard built with React, TypeScript, Tailwind CSS, and React Big Calendar. This application displays past and upcoming Google Calendar meetings fetched through MCP (Model Context Protocol) integration with **Google OAuth 2.0 authentication**.

## ✨ Features

- 🔐 **Google OAuth Login** - Secure authentication with Google accounts
- 🔗 **MCP Integration** - Fetch calendar data through Model Context Protocol
- 📅 **Interactive Calendar** - Full-featured calendar with month/week/day/agenda views
- 📊 **Smart Dashboard** - Organized view of upcoming and past meetings
- 🤖 **AI Summaries** - AI-generated summaries for past meetings
- 👤 **User Profiles** - Display user info from Google account
- 🔄 **Token Management** - Automatic OAuth token handling and refresh
- 🎨 **Modern UI** - Clean, responsive design with Tailwind CSS
- ⚡ **Fast Performance** - Built with Vite for optimal speed
- 📱 **Fully Responsive** - Works seamlessly on all devices
- 🎯 **Production Ready** - Vercel-ready with environment configuration

## Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Calendar:** React Big Calendar
- **Date Utilities:** date-fns, moment
- **Deployment:** Vercel-ready

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd katalyst-calendar-viewer
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Configure Google OAuth:
   - For **demo mode**: No configuration needed! The app works out of the box.
   - For **real Google Calendar**: Follow the [OAuth Setup Guide](OAUTH_SETUP.md)

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5174`

6. Click "Sign in with Google" to access the dashboard

### Building for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub

2. Go to [Vercel](https://vercel.com) and import your repository

3. Add environment variables:
   - For demo mode: No variables needed!
   - For production: See [OAuth Setup Guide](OAUTH_SETUP.md)

4. Deploy!

**Alternative: Vercel CLI**
```bash
npm install -g vercel
vercel
```

### Environment Variables

Create a `.env` file (already configured for demo mode):

```env
# Demo Mode (default - works out of the box)
VITE_USE_MOCK_AUTH=true
VITE_GOOGLE_CLIENT_ID=demo-client-id
VITE_GOOGLE_REDIRECT_URI=http://localhost:5174/auth/callback

# For Real OAuth (see OAUTH_SETUP.md)
# VITE_USE_MOCK_AUTH=false
# VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
# VITE_GOOGLE_REDIRECT_URI=https://yourdomain.com/auth/callback
# VITE_MCP_API_ENDPOINT=https://your-mcp-server.com/api
```

## Project Structure

```
katalyst-calendar-viewer/
├── src/
│   ├── components/
│   │   ├── Login.tsx           # Google OAuth login screen
│   │   ├── Dashboard.tsx       # Main dashboard layout
│   │   ├── CalendarView.tsx    # React Big Calendar integration
│   │   ├── MeetingCard.tsx     # Individual meeting card
│   │   ├── LoadingState.tsx    # Loading state UI
│   │   └── ErrorState.tsx      # Error state UI
│   ├── services/
│   │   ├── authService.ts      # OAuth authentication service
│   │   └── mockMCP.ts          # MCP data service (mock & real)
│   ├── config/
│   │   └── oauth.ts            # OAuth configuration
│   ├── types/
│   │   ├── meeting.ts          # Meeting interfaces
│   │   └── auth.ts             # Auth interfaces
│   ├── App.tsx                 # Root component
│   ├── index.css               # Global styles + Tailwind
│   └── main.tsx                # Application entry point
├── public/                     # Static assets
├── .env.example                # Environment variable template
├── .env                        # Local environment (gitignored)
├── OAUTH_SETUP.md              # Complete OAuth setup guide
├── README.md                   # This file
├── tailwind.config.js          # Tailwind configuration
├── vite.config.ts              # Vite configuration
├── vercel.json                 # Vercel deployment config
└── package.json                # Project dependencies
```

## 📋 Features Overview

### Google OAuth Login
- Secure authentication with Google OAuth 2.0
- Beautiful "Sign in with Google" button with Google branding
- User profile picture and email display
- Automatic token management and refresh
- Works in demo mode without real credentials
- Production-ready for real Google OAuth

### Dashboard
- **Statistics Cards:** Display total, upcoming, and past meeting counts
- **Tab Navigation:** Switch between Calendar, Upcoming, and Past views
- **Calendar View:** Interactive calendar with all meetings
- **Meeting Cards:** Detailed cards showing:
  - Meeting title and description
  - Date, time, and duration
  - Attendee list with status indicators
  - Location information
  - AI-generated summaries (for past meetings)

### Data Management
- Mock MCP service simulates API calls with realistic delays
- Automatic loading and error states
- Retry functionality on errors

## Mock Data

The application uses mock meeting data that includes:
- 4 past meetings with AI summaries
- 6 upcoming meetings
- Realistic attendee information
- Various meeting types and durations

## Customization

### Modify Mock Data
Edit `src/services/mockMCP.ts` to customize meeting data:
- Add/remove meetings
- Change AI summary templates
- Adjust simulated API delay

### Styling
Tailwind CSS configuration can be customized in `tailwind.config.js`. Calendar styles are in `src/index.css`.

### Calendar Settings
Modify calendar behavior in `src/components/CalendarView.tsx`:
- Change default view (month, week, day, agenda)
- Customize event styling
- Adjust date/time formatting

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for your own purposes.

## Acknowledgments

- Built with [React](https://react.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Calendar powered by [React Big Calendar](https://jquense.github.io/react-big-calendar/)
- Bundled with [Vite](https://vitejs.dev/)
