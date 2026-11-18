import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('sm_admin_token'));
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('sm_admin_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verifyAuth() {
      if (token) {
        try {
          const res = await api.adminGetMe(token);
          if (res.success && res.user) {
            setUser(res.user);
          } else {
            logout();
          }
        } catch (err) {
          console.warn('Session expired or invalid, logging out.');
          logout();
        }
      }
      setLoading(false);
    }
    verifyAuth();
  }, [token]);

  const login = async (username, password) => {
    const res = await api.adminLogin({ username, password });
    if (res.success && res.token) {
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem('sm_admin_token', res.token);
      localStorage.setItem('sm_admin_user', JSON.stringify(res.user));
      return res;
    }
    throw new Error(res.error || 'Login failed');
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('sm_admin_token');
    localStorage.removeItem('sm_admin_user');
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token && !!user,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
