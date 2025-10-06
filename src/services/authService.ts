import type { OAuthToken, GoogleUser } from '../types/auth';
import { GOOGLE_OAUTH_CONFIG, USE_MOCK_AUTH } from '../config/oauth';

// Generate a random state parameter for OAuth security
const generateState = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Build OAuth authorization URL
export const getGoogleAuthUrl = (): string => {
  const state = generateState();
  sessionStorage.setItem('oauth_state', state);

  const params = new URLSearchParams({
    client_id: GOOGLE_OAUTH_CONFIG.clientId,
    redirect_uri: GOOGLE_OAUTH_CONFIG.redirectUri,
    response_type: 'code',
    scope: GOOGLE_OAUTH_CONFIG.scope.join(' '),
    access_type: 'offline',
    prompt: 'consent',
    state: state,
  });

  return `${GOOGLE_OAUTH_CONFIG.authEndpoint}?${params.toString()}`;
};

// Mock OAuth flow for development
const mockGoogleOAuthFlow = async (): Promise<{ token: OAuthToken; user: GoogleUser }> => {
  // Simulate OAuth redirect and token exchange
  await new Promise(resolve => setTimeout(resolve, 1500));

  const mockToken: OAuthToken = {
    access_token: 'mock_access_token_' + Date.now(),
    token_type: 'Bearer',
    expires_in: 3600,
    scope: GOOGLE_OAUTH_CONFIG.scope.join(' '),
    refresh_token: 'mock_refresh_token_' + Date.now(),
    id_token: 'mock_id_token_' + Date.now(),
  };

  const mockUser: GoogleUser = {
    id: 'mock_user_' + Date.now(),
    email: 'demo@katalyst.com',
    name: 'Demo User',
    picture: 'https://ui-avatars.com/api/?name=Demo+User&background=3b82f6&color=fff&size=128',
    given_name: 'Demo',
    family_name: 'User',
  };

  return { token: mockToken, user: mockUser };
};

// Exchange authorization code for access token
export const exchangeCodeForToken = async (code: string): Promise<OAuthToken> => {
  if (USE_MOCK_AUTH) {
    const { token } = await mockGoogleOAuthFlow();
    return token;
  }

  // Real implementation would make a POST request to Google's token endpoint
  const response = await fetch(GOOGLE_OAUTH_CONFIG.tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      code,
      client_id: GOOGLE_OAUTH_CONFIG.clientId,
      redirect_uri: GOOGLE_OAUTH_CONFIG.redirectUri,
      grant_type: 'authorization_code',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to exchange code for token');
  }

  return await response.json();
};

// Get user info from Google
export const getUserInfo = async (accessToken: string): Promise<GoogleUser> => {
  if (USE_MOCK_AUTH) {
    const { user } = await mockGoogleOAuthFlow();
    return user;
  }

  // Real implementation
  const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get user info');
  }

  return await response.json();
};

// Initiate Google OAuth login
export const initiateGoogleLogin = (): void => {
  if (USE_MOCK_AUTH) {
    // In mock mode, simulate the OAuth flow without redirect
    console.log('Mock OAuth: Simulating Google login...');
    // We'll handle this in the Login component
    return;
  }

  // Real implementation: redirect to Google OAuth
  const authUrl = getGoogleAuthUrl();
  window.location.href = authUrl;
};

// Handle OAuth callback (parse URL parameters)
export const handleOAuthCallback = async (): Promise<{ token: OAuthToken; user: GoogleUser }> => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  const state = params.get('state');
  const error = params.get('error');

  if (error) {
    throw new Error(`OAuth error: ${error}`);
  }

  // Verify state parameter
  const savedState = sessionStorage.getItem('oauth_state');
  if (state !== savedState) {
    throw new Error('Invalid state parameter');
  }

  if (!code) {
    throw new Error('No authorization code received');
  }

  // Exchange code for token
  const token = await exchangeCodeForToken(code);

  // Get user info
  const user = await getUserInfo(token.access_token);

  // Clean up
  sessionStorage.removeItem('oauth_state');

  return { token, user };
};

// Mock OAuth login for demo
export const mockGoogleLogin = async (): Promise<{ token: OAuthToken; user: GoogleUser }> => {
  return await mockGoogleOAuthFlow();
};

// Refresh access token
export const refreshAccessToken = async (refreshToken: string): Promise<OAuthToken> => {
  if (USE_MOCK_AUTH) {
    // Return a new mock token
    return {
      access_token: 'mock_refreshed_token_' + Date.now(),
      token_type: 'Bearer',
      expires_in: 3600,
      scope: GOOGLE_OAUTH_CONFIG.scope.join(' '),
    };
  }

  const response = await fetch(GOOGLE_OAUTH_CONFIG.tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      refresh_token: refreshToken,
      client_id: GOOGLE_OAUTH_CONFIG.clientId,
      grant_type: 'refresh_token',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  return await response.json();
};

// Token storage utilities
export const saveAuthData = (token: OAuthToken, user: GoogleUser): void => {
  localStorage.setItem('oauth_token', JSON.stringify(token));
  localStorage.setItem('user_info', JSON.stringify(user));
  localStorage.setItem('token_expiry', String(Date.now() + token.expires_in * 1000));
};

export const getStoredAuthData = (): { token: OAuthToken; user: GoogleUser } | null => {
  const tokenStr = localStorage.getItem('oauth_token');
  const userStr = localStorage.getItem('user_info');
  const expiry = localStorage.getItem('token_expiry');

  if (!tokenStr || !userStr || !expiry) {
    return null;
  }

  // Check if token is expired
  if (Date.now() > parseInt(expiry)) {
    clearAuthData();
    return null;
  }

  return {
    token: JSON.parse(tokenStr),
    user: JSON.parse(userStr),
  };
};

export const clearAuthData = (): void => {
  localStorage.removeItem('oauth_token');
  localStorage.removeItem('user_info');
  localStorage.removeItem('token_expiry');
  sessionStorage.removeItem('oauth_state');
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const authData = getStoredAuthData();
  return authData !== null;
};
