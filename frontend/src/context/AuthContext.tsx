'use client';

/**
 * Authentication Context & Provider.
 * Responsible for managing user session state, JWT token persistence, and demo login handlers.
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { IUser } from '@/types';
import { apiFetch } from '@/services/api.service';
import { getAppConstants } from '@/constants';

interface AuthContextType {
  user: IUser | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  demoUsers: IUser[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const constants = getAppConstants();
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [demoUsers, setDemoUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const storedToken = localStorage.getItem(constants.AUTH.STORAGE_KEYS.TOKEN);
    const storedUser = localStorage.getItem(constants.AUTH.STORAGE_KEYS.USER);

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    fetchDemoUsers();
    setIsLoading(false);
  }, []);

  const fetchDemoUsers = async () => {
    const res = await apiFetch<IUser[]>(constants.ROUTES.AUTH.DEMO_USERS);
    if (res.success && res.data) {
      setDemoUsers(res.data);
    }
  };

  const login = async (
    email: string,
    password: string = constants.AUTH.DEFAULT_PASSWORD
  ): Promise<boolean> => {
    const res = await apiFetch<{ token: string; user: IUser }>(constants.ROUTES.AUTH.LOGIN, {
      method: constants.HTTP.POST,
      body: JSON.stringify({ email, password }),
    });

    if (res.success && res.data) {
      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem(constants.AUTH.STORAGE_KEYS.TOKEN, res.data.token);
      localStorage.setItem(constants.AUTH.STORAGE_KEYS.USER, JSON.stringify(res.data.user));
      return true;
    }
    return false;
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    const res = await apiFetch<{ token: string; user: IUser }>(
      constants.ROUTES.AUTH.REGISTER,
      {
        method: constants.HTTP.POST,
        body: JSON.stringify({ name, email, password }),
      }
    );

    if (res.success && res.data) {
      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem(constants.AUTH.STORAGE_KEYS.TOKEN, res.data.token);
      localStorage.setItem(constants.AUTH.STORAGE_KEYS.USER, JSON.stringify(res.data.user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(constants.AUTH.STORAGE_KEYS.TOKEN);
    localStorage.removeItem(constants.AUTH.STORAGE_KEYS.USER);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, login, register, logout, demoUsers }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const constants = getAppConstants();
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(constants.MESSAGES.ERRORS.AUTH_PROVIDER_REQUIRED);
  }
  return context;
};
