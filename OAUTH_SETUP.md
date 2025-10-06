# Google OAuth Setup Guide

This guide explains how to set up Google OAuth authentication for the Katalyst Calendar Viewer to access real Google Calendar data.

## Current Status: Demo Mode

The application currently runs in **DEMO MODE** with simulated OAuth. No real Google credentials are required to test the app.

## Setting Up Real Google OAuth

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note your Project ID

### Step 2: Enable Google Calendar API

1. In your Google Cloud Console, go to **APIs & Services > Library**
2. Search for "Google Calendar API"
3. Click on it and press **Enable**

### Step 3: Configure OAuth Consent Screen

1. Go to **APIs & Services > OAuth consent screen**
2. Choose **External** user type (or Internal if using Google Workspace)
3. Fill in the required information:
   - App name: `Katalyst Calendar Viewer`
   - User support email: Your email
   - Developer contact: Your email
4. Add the following scopes:
   - `openid`
   - `profile`
   - `email`
   - `https://www.googleapis.com/auth/calendar.readonly`
   - `https://www.googleapis.com/auth/calendar.events.readonly`
5. Add test users (your Google account email)
6. Save and continue

### Step 4: Create OAuth 2.0 Credentials

1. Go to **APIs & Services > Credentials**
2. Click **+ CREATE CREDENTIALS > OAuth client ID**
3. Choose **Web application**
4. Configure:
   - Name: `Katalyst Calendar Web Client`
   - Authorized JavaScript origins:
     - `http://localhost:5174` (for development)
     - Your production domain (e.g., `https://yourdomain.com`)
   - Authorized redirect URIs:
     - `http://localhost:5174/auth/callback` (for development)
     - `https://yourdomain.com/auth/callback` (for production)
5. Click **CREATE**
6. **Important**: Copy your Client ID and Client Secret

### Step 5: Update Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and update with your credentials:
   ```env
   # Google OAuth Configuration
   VITE_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE.apps.googleusercontent.com
   VITE_GOOGLE_REDIRECT_URI=http://localhost:5174/auth/callback

   # MCP Configuration (optional)
   VITE_MCP_API_ENDPOINT=https://your-mcp-server.com/api

   # Set to false to use real OAuth
   VITE_USE_MOCK_AUTH=false
   ```

3. **Never commit `.env` to version control!** It's already in `.gitignore`.

### Step 6: Update Code for Production

The app is already configured to work with real OAuth. When `VITE_USE_MOCK_AUTH=false`:

- **Login**: Uses real Google OAuth redirect
- **API Calls**: Uses real Google Calendar API or MCP endpoint
- **Token Management**: Handles real access tokens and refresh tokens

### Step 7: Deploy to Production

#### Option A: Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard:
   - `VITE_GOOGLE_CLIENT_ID`
   - `VITE_GOOGLE_REDIRECT_URI` (use your Vercel domain)
   - `VITE_USE_MOCK_AUTH=false`
5. Deploy!

#### Option B: Other Platforms

For other platforms (Netlify, AWS, etc.), add the same environment variables in their respective dashboards.

## MCP Integration

### Using Custom MCP Server

If you have your own MCP server for fetching calendar data:

1. Set `VITE_MCP_API_ENDPOINT` to your MCP server URL
2. Ensure your MCP server accepts OAuth Bearer tokens in the format:
   ```
   Authorization: Bearer <access_token>
   ```
3. The app will automatically use MCP instead of direct Google Calendar API

### Using Direct Google Calendar API

The app includes built-in support for Google Calendar API:

- Function: `fetchMeetingsFromGoogleCalendar()` in `src/services/mockMCP.ts`
- No MCP server required
- Uses OAuth token directly with Google's API

## Security Notes

- ⚠️ **Never expose your Client Secret** in frontend code
- ✅ Tokens are stored in `localStorage` (consider more secure options for production)
- ✅ State parameter prevents CSRF attacks
- ✅ Token expiry is checked automatically
- ✅ Supports refresh tokens (when available)

## Testing OAuth Flow

1. Set `VITE_USE_MOCK_AUTH=false`
2. Restart dev server: `npm run dev`
3. Click "Sign in with Google"
4. You'll be redirected to Google's consent screen
5. After approval, you'll be redirected back with an authorization code
6. The app exchanges the code for an access token
7. Meetings are fetched using the real token

## Troubleshooting

### Redirect URI Mismatch

**Error**: `redirect_uri_mismatch`

**Solution**: Ensure the redirect URI in your code matches exactly what's configured in Google Cloud Console (including `http://` vs `https://` and port number).

### Invalid Client

**Error**: `invalid_client`

**Solution**: Double-check your Client ID is correct in `.env`.

### Access Denied

**Error**: User sees "This app isn't verified"

**Solution**:
- Add your email as a test user in OAuth consent screen
- Or submit your app for verification (required for production)

### Token Expired

**Solution**: The app automatically handles token refresh if you have a refresh token. Clear `localStorage` and re-authenticate if issues persist.

## Production Checklist

- [ ] Google Cloud Project created
- [ ] Calendar API enabled
- [ ] OAuth consent screen configured
- [ ] OAuth credentials created
- [ ] Environment variables set in deployment platform
- [ ] Redirect URI updated for production domain
- [ ] SSL/HTTPS enabled (required for production OAuth)
- [ ] Privacy policy page created (required by Google)
- [ ] Terms of service page created (recommended)
- [ ] App submitted for verification (for public use)

## Further Reading

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Calendar API Reference](https://developers.google.com/calendar/api/v3/reference)
- [OAuth 2.0 Security Best Practices](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics)
