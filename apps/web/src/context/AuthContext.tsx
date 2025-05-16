
"use client";
import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import type { Session } from "next-auth";

interface AuthContextType {
  user: Session["user"] | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (provider?: string, options?: Record<string, any>) => Promise<void>;
  logout: (options?: Record<string, any>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";
  const user = session?.user;

  const login = async (provider?: string, options?: Record<string, any>) => {
    await signIn(provider, options);
  };

  const logout = async (options?: Record<string, any>) => {
    await signOut(options);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
