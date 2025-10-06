import { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { getStoredAuthData, clearAuthData } from './services/authService';
import type { GoogleUser, OAuthToken } from './types/auth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [token, setToken] = useState<OAuthToken | null>(null);

  // Check for existing auth on mount
  useEffect(() => {
    const authData = getStoredAuthData();
    if (authData) {
      setUser(authData.user);
      setToken(authData.token);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (newUser: GoogleUser, newToken: OAuthToken) => {
    setUser(newUser);
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    clearAuthData();
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <>
      {isAuthenticated && user && token ? (
        <Dashboard user={user} token={token} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
