import type { OAuthConfig } from '../types/auth';

// Google OAuth Configuration
export const GOOGLE_OAUTH_CONFIG: OAuthConfig = {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || 'demo-client-id',
  redirectUri: import.meta.env.VITE_GOOGLE_REDIRECT_URI || 'http://localhost:5174/auth/callback',
  scope: [
    'openid',
    'profile',
    'email',
    'https://www.googleapis.com/auth/calendar.readonly',
    'https://www.googleapis.com/auth/calendar.events.readonly',
  ],
  authEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
};

// Check if we're in mock mode
export const USE_MOCK_AUTH = import.meta.env.VITE_USE_MOCK_AUTH === 'true' || true;

// MCP Configuration
export const MCP_CONFIG = {
  apiEndpoint: import.meta.env.VITE_MCP_API_ENDPOINT || 'mock',
  useMock: USE_MOCK_AUTH,
};
