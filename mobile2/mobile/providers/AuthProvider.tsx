import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';import { AuthState, signIn, signOut, getAuthState } from '../lib/auth';

const AuthContext = createContext<{ auth: AuthState; signIn: (email: string, pw: string) => Promise<void>; signOut: () => Promise<void> } | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({ token: null, userId: null, isLoading: true });

  useEffect(() => {
    getAuthState().then(setAuth);
  }, []);

  const handleSignIn = async (email: string, pw: string) => {
    const newState = await signIn(email, pw);
    setAuth(newState);
  };

  const handleSignOut = async () => {
    await signOut();
    setAuth({ token: null, userId: null, isLoading: false });
  };

  return (
    <AuthContext.Provider value={{ auth, signIn: handleSignIn, signOut: handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be in AuthProvider');
  return context;
};