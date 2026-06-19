import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Mock login
    setUser({ email, name: email.split('@')[0], role: 'donor', id: 'D-' + Math.random().toString(36).substr(2,6).toUpperCase() });
    return true;
  };

  const signup = (data) => {
    setUser({ ...data, id: 'D-' + Math.random().toString(36).substr(2,6).toUpperCase() });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
