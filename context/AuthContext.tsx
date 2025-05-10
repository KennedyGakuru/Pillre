import React, { createContext, useState, useEffect, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// --- Define types ---
export type User = {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isSignedIn: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (userData: Partial<User>) => Promise<void>;
};

// --- Create context ---
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- Mock API ---
const mockSignIn = async (email: string, password: string): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (email === 'user@example.com' && password === 'password') {
    return { id: '1', name: 'John Doe', email, phoneNumber: '555-123-4567' };
  }
  throw new Error('Invalid credentials');
};

const mockSignUp = async (name: string, email: string, password: string): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { id: '2', name, email };
};

// --- Provider ---
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await getStoredUser();
        if (userData) setUser(userData);
      } catch (e) {
        console.error('Load user error:', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const storeUser = async (userData: User) => {
    const userString = JSON.stringify(userData);
    if (Platform.OS === 'web') {
      localStorage.setItem('user', userString);
    } else {
      await SecureStore.setItemAsync('user', userString);
    }
  };

  const getStoredUser = async (): Promise<User | null> => {
    if (Platform.OS === 'web') {
      const userString = localStorage.getItem('user');
      return userString ? JSON.parse(userString) : null;
    } else {
      const userString = await SecureStore.getItemAsync('user');
      return userString ? JSON.parse(userString) : null;
    }
  };

  const clearStoredUser = async () => {
    if (Platform.OS === 'web') {
      localStorage.removeItem('user');
    } else {
      await SecureStore.deleteItemAsync('user');
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const userData = await mockSignIn(email, password);
      setUser(userData);
      await storeUser(userData);
    } catch (e) {
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const userData = await mockSignUp(name, email, password);
      setUser(userData);
      await storeUser(userData);
    } catch (e) {
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await clearStoredUser();
      setUser(null);
    } catch (e) {
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (userData: Partial<User>) => {
    setIsLoading(true);
    try {
      if (!user) throw new Error('Not signed in');
      const updated = { ...user, ...userData };
      setUser(updated);
      await storeUser(updated);
    } catch (e) {
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isSignedIn: !!user, signIn, signUp, signOut, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

// --- Hook ---
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
