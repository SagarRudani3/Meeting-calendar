export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
}

export interface OAuthToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  refresh_token?: string;
  id_token?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: GoogleUser | null;
  token: OAuthToken | null;
  error: string | null;
}

export interface OAuthConfig {
  clientId: string;
  redirectUri: string;
  scope: string[];
  authEndpoint: string;
  tokenEndpoint: string;
}
