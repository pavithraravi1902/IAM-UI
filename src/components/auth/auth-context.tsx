import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
  loginSession: string | null;
  setLoginSession: (value: string | null) => void;
  logoutTimeout: NodeJS.Timeout | null;
  setLogoutTimeout: (value: NodeJS.Timeout | null) => void;
}

const defaultAuthContext: AuthContextType = {
  loginSession: null,
  setLoginSession: () => {},
  logoutTimeout: null,
  setLogoutTimeout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loginSession, setLoginSession] = useState<string | null>(localStorage.getItem('isLoggedIn'));
  const [logoutTimeout, setLogoutTimeout] = useState<NodeJS.Timeout | null>(null);

  return (
    <AuthContext.Provider value={{ loginSession, setLoginSession, logoutTimeout, setLogoutTimeout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
